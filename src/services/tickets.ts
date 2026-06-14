import type { EventSummary } from "@/types/content";

export type TicketOrderDraft = {
  event: EventSummary;
  quantity: number;
};

export function createTicketOrderDraft(
  event: EventSummary,
  quantity: number
): TicketOrderDraft {
  return {
    event,
    quantity
  };
}
