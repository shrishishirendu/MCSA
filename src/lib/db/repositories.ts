import type {
  Announcement,
  BlogPostSummary,
  DonationSummary,
  EventSummary,
  MemberSummary
} from "@/types/content";

export type MemberRepository = {
  listMembers(): Promise<MemberSummary[]>;
  getMemberById(id: string): Promise<MemberSummary | null>;
};

export type EventRepository = {
  listEvents(): Promise<EventSummary[]>;
  getEventById(id: string): Promise<EventSummary | null>;
};

export type DonationRepository = {
  listDonationsForMember(memberId: string): Promise<DonationSummary[]>;
};

export type ContentRepository = {
  listBlogPosts(): Promise<BlogPostSummary[]>;
  listAnnouncements(): Promise<Announcement[]>;
};
