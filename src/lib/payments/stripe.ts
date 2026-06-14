import Stripe from "stripe";
import { env } from "@/lib/env";

export function createStripeClient() {
  if (!env.stripeSecretKey) {
    throw new Error("Stripe secret key is not configured.");
  }

  return new Stripe(env.stripeSecretKey, {
    apiVersion: "2024-06-20"
  });
}

export type CheckoutPurpose = "membership" | "event-ticket" | "donation";

export type CheckoutSessionDraft = {
  purpose: CheckoutPurpose;
  amountAud: number;
  referenceId: string;
};
