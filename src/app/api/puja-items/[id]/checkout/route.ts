import { NextResponse } from "next/server";
import { createStripeClient } from "@/lib/payments/stripe";
import { PUJA_ITEM_HOLD_MINUTES, PUJA_ITEM_SESSION_MINUTES, pujaItemsPath, validateBuyer } from "@/lib/puja-items";
import { isPujaItemsConfigured } from "@/lib/puja-items-server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: Request, { params }: { params: { id: string } }) {
  if (!uuidPattern.test(params.id)) {
    return NextResponse.json({ error: "Item not found." }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const validated = validateBuyer(body);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }
  const { buyer } = validated;

  if (!isPujaItemsConfigured()) {
    return NextResponse.json({ error: "Online purchases are unavailable right now." }, { status: 503 });
  }

  const supabase = createServerSupabaseClient();

  // The hold is a single conditional UPDATE in the database: only one devotee can win it.
  const { data: held, error: holdError } = await supabase.rpc("hold_puja_item", {
    p_item_id: params.id,
    p_name: buyer.name,
    p_email: buyer.email,
    p_phone: buyer.phone,
    p_minutes: PUJA_ITEM_HOLD_MINUTES
  });
  if (holdError) {
    console.error("Bhagwati Ashirwaad item hold failed:", holdError);
    return NextResponse.json({ error: "Online purchases are unavailable right now." }, { status: 503 });
  }
  const item = held?.[0];
  if (!item) {
    return NextResponse.json({ error: "Sorry, someone just bought or reserved this item." }, { status: 409 });
  }

  const origin = new URL(request.url).origin;
  try {
    const stripe = createStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: buyer.email,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "aud",
          unit_amount: item.price_cents,
          product_data: {
            name: item.name,
            ...(item.description ? { description: item.description } : {}),
            ...(item.image_url?.startsWith("https://") ? { images: [item.image_url] } : {})
          }
        }
      }],
      metadata: { puja_item_id: item.id },
      payment_intent_data: { metadata: { puja_item_id: item.id } },
      expires_at: Math.floor(Date.now() / 1000) + PUJA_ITEM_SESSION_MINUTES * 60,
      success_url: `${origin}${pujaItemsPath}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${pujaItemsPath}?cancelled=1`
    });

    const { error: saveError } = await supabase
      .from("puja_items")
      .update({ stripe_session_id: session.id, updated_at: new Date().toISOString() })
      .eq("id", item.id)
      .eq("status", "held");
    if (saveError) {
      // Without the session id the webhook cannot match the payment, so do not let the buyer pay.
      await stripe.checkout.sessions.expire(session.id).catch(() => undefined);
      throw saveError;
    }

    return NextResponse.json({ url: session.url }, { status: 201 });
  } catch (error) {
    console.error("Bhagwati Ashirwaad checkout could not be started:", error);
    await supabase.rpc("release_puja_item", { p_item_id: item.id, p_session_id: null });
    return NextResponse.json({ error: "We could not start the payment. Please try again in a moment." }, { status: 502 });
  }
}
