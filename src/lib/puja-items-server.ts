import { env } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { pujaItemLimits, pujaItemState, type AdminPujaItem, type PublicPujaItem } from "@/lib/puja-items";
import type { PujaItemRow } from "@/types/database";

export function isPujaItemsConfigured() {
  return Boolean(env.supabaseUrl && env.supabaseServiceRoleKey);
}

export function toPublicPujaItem(row: PujaItemRow): PublicPujaItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    priceCents: row.price_cents,
    imageUrl: row.image_url,
    state: pujaItemState(row)
  };
}

export function toAdminPujaItem(row: PujaItemRow): AdminPujaItem {
  return {
    ...toPublicPujaItem(row),
    status: row.status,
    sortOrder: row.sort_order,
    active: row.active,
    heldUntil: row.held_until,
    claimantName: row.claimant_name,
    claimantEmail: row.claimant_email,
    claimantPhone: row.claimant_phone,
    paymentUrl: row.payment_url,
    claimedAt: row.claimed_at,
    // Holds always record the claimant, and releasing a hold keeps them.
    everHeld: Boolean(row.claimant_email) || row.status !== "available"
  };
}

async function selectItems(activeOnly: boolean) {
  let query = createServerSupabaseClient()
    .from("puja_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  // Items without a payment link cannot be bought, so they stay off the public page.
  if (activeOnly) query = query.eq("active", true).not("payment_url", "is", null);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Returns null when the database is not configured or cannot be reached.
export async function getPublicPujaItems(): Promise<PublicPujaItem[] | null> {
  if (!isPujaItemsConfigured()) return null;
  try {
    return (await selectItems(true)).map(toPublicPujaItem);
  } catch (error) {
    console.error("Bhagwati Ashirwaad Items could not be loaded:", error);
    return null;
  }
}

export async function getAdminPujaItems(): Promise<AdminPujaItem[] | null> {
  if (!isPujaItemsConfigured()) return null;
  try {
    return (await selectItems(false)).map(toAdminPujaItem);
  } catch (error) {
    console.error("Bhagwati Ashirwaad Items could not be loaded:", error);
    return null;
  }
}

// Shared by create and edit: returns clean column values or an error message.
export function readPujaItemFields(body: Record<string, unknown>) {
  const name = String(body.name ?? "").trim();
  const description = String(body.description ?? "").trim();
  const priceDollars = Number(body.priceDollars);
  const priceCents = Math.round(priceDollars * 100);
  const sortOrder = Number(body.sortOrder ?? 0);
  const imageUrl = typeof body.imageUrl === "string" && body.imageUrl.trim() ? body.imageUrl.trim() : null;
  const paymentUrl = typeof body.paymentUrl === "string" && body.paymentUrl.trim() ? body.paymentUrl.trim() : null;
  const active = body.active !== false;

  if (!name || name.length > pujaItemLimits.itemName) return { error: `Enter an item name (up to ${pujaItemLimits.itemName} characters).` } as const;
  if (description.length > pujaItemLimits.itemDescription) return { error: `Keep the description to ${pujaItemLimits.itemDescription} characters.` } as const;
  if (!Number.isFinite(priceDollars) || priceCents < 1 || priceCents > 10_000_000) return { error: "Enter a price in AUD greater than $0." } as const;
  if (!Number.isInteger(sortOrder)) return { error: "Sort order must be a whole number." } as const;
  if (imageUrl && !/^https?:\/\//.test(imageUrl)) return { error: "Upload the image again." } as const;
  if (paymentUrl && (!/^https:\/\/\S+$/.test(paymentUrl) || paymentUrl.length > pujaItemLimits.paymentUrl)) return { error: "Paste the full Tyro payment link, starting with https://" } as const;
  if (active && !paymentUrl) return { error: "Add the Tyro payment link before showing the item on the public page." } as const;

  return {
    fields: { name, description, price_cents: priceCents, image_url: imageUrl, payment_url: paymentUrl, sort_order: sortOrder, active }
  } as const;
}
