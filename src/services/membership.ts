import type { MemberSummary } from "@/types/content";

export type MembershipRenewalDraft = {
  member: MemberSummary;
  tier: "individual" | "family" | "student";
};

export function createMembershipRenewalDraft(
  member: MemberSummary,
  tier: MembershipRenewalDraft["tier"]
): MembershipRenewalDraft {
  return {
    member,
    tier
  };
}
