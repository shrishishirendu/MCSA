import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/api-auth";
import { sendPujaItemSoldEmail } from "@/lib/email/resend";
import { formatAud, pujaItemLimits, pujaItemState, pujaItemsPath } from "@/lib/puja-items";
import { readPujaItemFields, toAdminPujaItem } from "@/lib/puja-items-server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

async function loadItem(id: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("puja_items").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return { supabase, item: data };
}

function done(item: Parameters<typeof toAdminPujaItem>[0], status = 200) {
  revalidatePath(pujaItemsPath);
  return NextResponse.json({ item: toAdminPujaItem(item) }, { status });
}

const unavailable = () => NextResponse.json({ error: "The database is not configured." }, { status: 503 });

// Edit an item. Price changes are blocked while a devotee is paying or after it is sold.
export async function PATCH(request: Request, { params }: Params) {
  const unauthorized = requireAdminApi();
  if (unauthorized) return unauthorized;

  const read = readPujaItemFields(await request.json().catch(() => ({})));
  if ("error" in read) return NextResponse.json({ error: read.error }, { status: 400 });

  try {
    const { supabase, item } = await loadItem(params.id);
    if (!item) return NextResponse.json({ error: "Item not found." }, { status: 404 });
    if (read.fields.price_cents !== item.price_cents && pujaItemState(item) !== "available") {
      return NextResponse.json({ error: "The price cannot be changed while the item is being reserved or after it is sold." }, { status: 409 });
    }
    const { data, error } = await supabase
      .from("puja_items")
      .update({ ...read.fields, updated_at: new Date().toISOString() })
      .eq("id", item.id)
      .select("*")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return done(data);
  } catch {
    return unavailable();
  }
}

// Delete is only allowed for items that have never been reserved or sold.
export async function DELETE(_request: Request, { params }: Params) {
  const unauthorized = requireAdminApi();
  if (unauthorized) return unauthorized;

  try {
    const { supabase, item } = await loadItem(params.id);
    if (!item) return NextResponse.json({ error: "Item not found." }, { status: 404 });
    if (toAdminPujaItem(item).everHeld) {
      return NextResponse.json({ error: "This item has been reserved or sold, so it cannot be deleted. Make it inactive to hide it instead." }, { status: 409 });
    }
    const { error } = await supabase.from("puja_items").delete().eq("id", item.id).eq("status", "available").is("claimant_email", null);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePath(pujaItemsPath);
    return NextResponse.json({ ok: true });
  } catch {
    return unavailable();
  }
}

// Actions: { action: "release" } or { action: "mark-sold", buyerName, buyerEmail?, buyerPhone? }
export async function POST(request: Request, { params }: Params) {
  const unauthorized = requireAdminApi();
  if (unauthorized) return unauthorized;
  const body = await request.json().catch(() => ({}));

  try {
    const { supabase, item } = await loadItem(params.id);
    if (!item) return NextResponse.json({ error: "Item not found." }, { status: 404 });

    if (body.action === "release") {
      if (item.status !== "held") return NextResponse.json({ error: "This item is not being reserved." }, { status: 409 });
      const { data, error } = await supabase.rpc("release_puja_item", { p_item_id: item.id });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      if (!data?.[0]) return NextResponse.json({ error: "The item changed in the meantime. Refresh and try again." }, { status: 409 });
      return done(data[0]);
    }

    // Used once the payment shows in Tyro, or for a cash or bank transfer sale.
    if (body.action === "mark-sold") {
      if (item.status === "claimed") return NextResponse.json({ error: "This item is already sold." }, { status: 409 });
      const buyerName = String(body.buyerName ?? "").trim();
      const buyerEmail = String(body.buyerEmail ?? "").trim().toLowerCase();
      const buyerPhone = String(body.buyerPhone ?? "").trim();
      if (!buyerName || buyerName.length > pujaItemLimits.name) return NextResponse.json({ error: "Enter the buyer's name." }, { status: 400 });
      if (buyerEmail.length > pujaItemLimits.email || buyerPhone.length > pujaItemLimits.phone) return NextResponse.json({ error: "Buyer email or phone is too long." }, { status: 400 });

      const now = new Date().toISOString();
      let update = supabase
        .from("puja_items")
        .update({
          status: "claimed",
          claimant_name: buyerName,
          claimant_email: buyerEmail || null,
          claimant_phone: buyerPhone || null,
          claimed_at: now,
          held_until: null,
          updated_at: now
        })
        .eq("id", item.id)
        .eq("status", item.status);
      // Only confirm the reservation the admin was looking at, not one made since.
      if (item.status === "held") update = item.claimant_email ? update.eq("claimant_email", item.claimant_email) : update.is("claimant_email", null);
      const { data, error } = await update.select("*");
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      if (!data?.[0]) return NextResponse.json({ error: "The item changed in the meantime. Refresh and try again." }, { status: 409 });

      if (buyerEmail && body.sendEmail !== false) {
        try {
          await sendPujaItemSoldEmail({ itemId: item.id, itemName: item.name, amount: formatAud(item.price_cents), buyerName, buyerEmail });
        } catch (emailError) {
          console.error("Bhagwati Ashirwaad sold email failed:", emailError);
        }
      }
      return done(data[0]);
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch {
    return unavailable();
  }
}
