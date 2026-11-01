// Shared (client-safe) types and helpers for Bhagwati Ashirwaad Items.
import { durgaPuja } from "@/data/durga-puja-2026";

export type PujaItemState = "available" | "reserved" | "sold";

// What the public page may see: never any buyer details.
export type PublicPujaItem = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string | null;
  state: PujaItemState;
};

export type AdminPujaItem = PublicPujaItem & {
  status: "available" | "held" | "claimed";
  sortOrder: number;
  active: boolean;
  heldUntil: string | null;
  claimantName: string | null;
  claimantEmail: string | null;
  claimantPhone: string | null;
  stripeSessionId: string | null;
  claimedAt: string | null;
  everHeld: boolean;
};

// The database hold always outlasts the Stripe Checkout session (Stripe's minimum is 30 minutes),
// so a session can never be paid after its hold has lapsed.
export const PUJA_ITEM_HOLD_MINUTES = 36;
export const PUJA_ITEM_SESSION_MINUTES = 31;

export const pujaItemsPath = durgaPuja.pujaItemsPath;

export const pujaItemLimits = { name: 120, email: 254, phone: 20, itemName: 120, itemDescription: 300 };

export function formatAud(cents: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: cents % 100 ? 2 : 0 }).format(cents / 100);
}

export function pujaItemState(row: { status: string; held_until: string | null }, now = Date.now()): PujaItemState {
  if (row.status === "claimed") return "sold";
  if (row.status === "held" && row.held_until && new Date(row.held_until).getTime() > now) return "reserved";
  return "available";
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[\d\s()-]{8,20}$/;

export function validateBuyer(input: { name?: unknown; email?: unknown; phone?: unknown }) {
  const name = String(input.name ?? "").trim().replace(/\s+/g, " ");
  const email = String(input.email ?? "").trim().toLowerCase();
  const phone = String(input.phone ?? "").trim();
  if (name.length < 2 || name.length > pujaItemLimits.name) return { error: "Please enter your full name." } as const;
  if (!emailPattern.test(email) || email.length > pujaItemLimits.email) return { error: "Please enter a valid email address." } as const;
  if (!phonePattern.test(phone)) return { error: "Please enter a valid phone number." } as const;
  return { buyer: { name, email, phone } } as const;
}
