import { NextResponse } from "next/server";
import { sendPujaItemReservationEmails } from "@/lib/email/resend";
import { PUJA_ITEM_HOLD_MINUTES, formatAud, validateBuyer } from "@/lib/puja-items";
import { isPujaItemsConfigured } from "@/lib/puja-items-server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Reserve an item for a devotee and hand back its Tyro payment link.
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

  // The hold is a single conditional UPDATE in the database: only one devotee can win it.
  const { data: held, error } = await createServerSupabaseClient().rpc("hold_puja_item", {
    p_item_id: params.id,
    p_name: buyer.name,
    p_email: buyer.email,
    p_phone: buyer.phone,
    p_minutes: PUJA_ITEM_HOLD_MINUTES
  });
  if (error) {
    console.error("Bhagwati Ashirwaad item hold failed:", error);
    return NextResponse.json({ error: "Online purchases are unavailable right now." }, { status: 503 });
  }
  const item = held?.[0];
  if (!item?.payment_url) {
    return NextResponse.json({ error: "Sorry, someone just bought or reserved this item." }, { status: 409 });
  }

  // Emails are best-effort: the devotee still goes straight to the payment page.
  try {
    await sendPujaItemReservationEmails({
      itemId: item.id,
      itemName: item.name,
      amount: formatAud(item.price_cents),
      paymentUrl: item.payment_url,
      reservedUntil: new Date(item.held_until ?? Date.now()).toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short", timeZone: "Australia/Sydney" }),
      buyerName: buyer.name,
      buyerEmail: buyer.email,
      buyerPhone: buyer.phone
    });
  } catch (emailError) {
    console.error("Bhagwati Ashirwaad reservation emails failed:", emailError);
  }

  return NextResponse.json({ url: item.payment_url }, { status: 201 });
}
