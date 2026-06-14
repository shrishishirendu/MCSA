export type DonationDraft = {
  donorName: string;
  amountAud: number;
  message?: string;
};

export function createDonationDraft(draft: DonationDraft): DonationDraft {
  return draft;
}
