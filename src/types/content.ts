export type EventSummary = {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "draft" | "published" | "completed";
};

export type BlogPostSummary = {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
};

export type Announcement = {
  id: string;
  title: string;
  audience: "members" | "public" | "admin";
  publishedAt: string;
};

export type MembershipStatus = "active" | "pending" | "expired";

export type MemberSummary = {
  id: string;
  name: string;
  email: string;
  membershipStatus: MembershipStatus;
};

export type DonationSummary = {
  id: string;
  donorName: string;
  amountAud: number;
  receivedAt: string;
};
