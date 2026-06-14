export type PaymentStatus =
  | "draft"
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export type PaymentRecord = {
  id: string;
  memberId?: string;
  stripeCheckoutSessionId?: string;
  amountAud: number;
  status: PaymentStatus;
  purpose: "membership" | "event-ticket" | "donation";
  createdAt: string;
};
