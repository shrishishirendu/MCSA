import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { sendPujaItemPurchaseEmails, sendPujaItemRefundAlert } from "@/lib/email/resend";
import { env } from "@/lib/env";
import { createStripeClient } from "@/lib/payments/stripe";
import { formatAud } from "@/lib/puja-items";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Emails are best-effort: a failed email must never make Stripe retry a handled event.
async function quietly(task: () => Promise<unknown>) {
  try {
    await task();
  } catch (error) {
    console.error("Bhagwati Ashirwaad email failed:", error);
  }
}

async function handleCompleted(session: Stripe.Checkout.Session) {
  const itemId = session.metadata?.puja_item_id;
  if (!itemId || session.payment_status !== "paid") return;

  const supabase = createServerSupabaseClient();
  const paymentIntent = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null;
  const amount = formatAud(session.amount_total ?? 0);

  // Idempotent: only a hold that still belongs to this session becomes Sold.
  const { data: claimed, error } = await supabase
    .from("puja_items")
    .update({ status: "claimed", claimed_at: new Date().toISOString(), held_until: null, stripe_payment_intent: paymentIntent, updated_at: new Date().toISOString() })
    .eq("id", itemId)
    .eq("stripe_session_id", session.id)
    .eq("status", "held")
    .select("*");
  if (error) throw error;

  const item = claimed?.[0];
  if (item) {
    await quietly(() => sendPujaItemPurchaseEmails({
      itemId: item.id,
      itemName: item.name,
      amount,
      buyerName: item.claimant_name ?? session.customer_details?.name ?? "Devotee",
      buyerEmail: item.claimant_email ?? session.customer_details?.email ?? "",
      buyerPhone: item.claimant_phone ?? "",
      stripeSessionId: session.id
    }));
    return;
  }

  // Not claimed by this call: either a repeat delivery of an event already handled, or the
  // item no longer belongs to this session. Never overwrite someone else's purchase.
  const { data: current, error: readError } = await supabase.from("puja_items").select("*").eq("id", itemId).maybeSingle();
  if (readError) throw readError;
  if (current?.status === "claimed" && current.stripe_session_id === session.id) return;

  const reason = !current
    ? "The item no longer exists."
    : current.status === "claimed"
      ? "The item had already been sold to another buyer."
      : "The item's reservation had been released or taken by another checkout.";
  console.error("Bhagwati Ashirwaad payment does not match its item; manual refund needed.", { itemId, sessionId: session.id, reason });
  await quietly(() => sendPujaItemRefundAlert({
    itemId,
    stripeSessionId: session.id,
    amount,
    buyerEmail: session.customer_details?.email ?? session.customer_email ?? "",
    reason
  }));
}

async function handleExpired(session: Stripe.Checkout.Session) {
  const itemId = session.metadata?.puja_item_id;
  if (!itemId) return;
  const { error } = await createServerSupabaseClient().rpc("release_puja_item", { p_item_id: itemId, p_session_id: session.id });
  if (error) throw error;
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!env.stripeWebhookSecret || !signature) {
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const payload = await request.text();
    event = createStripeClient().webhooks.constructEvent(payload, signature, env.stripeWebhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") await handleCompleted(event.data.object);
    if (event.type === "checkout.session.expired") await handleExpired(event.data.object);
  } catch (error) {
    // A 500 makes Stripe retry the event later.
    console.error(`Stripe webhook ${event.type} could not be handled:`, error);
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
