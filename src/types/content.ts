export type EventSummary = {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "draft" | "published" | "completed";
};

export type ManagedEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  summary: string;
  ticketingUrl: string;
  priceLabel: string;
  audience: string;
  status: "draft" | "published";
  imageUrl?: string | null;
  createdAt: string;
};

export type BlogPostSummary = {
  id: string;
  title: string;
  slug?: string;
  excerpt: string;
  body?: string;
  imageUrls?: string[];
  status?: "draft" | "published";
  publishedAt: string;
};

export type Announcement = {
  id: string;
  title: string;
  body?: string;
  imageUrl?: string | null;
  audience: "members" | "public" | "admin";
  isPublished?: boolean;
  publishedAt: string;
};

export type MembershipStatus =
  | "active"
  | "pending"
  | "approved"
  | "rejected"
  | "expired";

export type MemberSummary = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  membershipType?: string;
  paymentConfirmed?: boolean;
  notes?: string | null;
  membershipStatus: MembershipStatus;
  joinedAt?: string | null;
  createdAt?: string;
};

export type DonationSummary = {
  id: string;
  donorName: string;
  amountAud: number;
  receivedAt: string;
};
