import type {
  Announcement,
  BlogPostSummary,
  DonationSummary,
  EventSummary,
  MemberSummary
} from "@/types/content";

export const featuredEvents: EventSummary[] = [
  {
    id: "mithila-festival-2026",
    title: "Mithila Cultural Festival",
    date: "2026-09-12",
    location: "Sydney, NSW",
    status: "published"
  },
  {
    id: "madhubani-workshop",
    title: "Madhubani Art Workshop",
    date: "2026-10-18",
    location: "Melbourne, VIC",
    status: "published"
  }
];

export const eventRequests = [
  {
    id: "event-request-001",
    title: "Maithili Language Meetup",
    submittedBy: "Member volunteer",
    proposedDate: "2026-08-16",
    status: "pending admin approval",
    nextStep: "Admin review, venue confirmation and publish decision"
  },
  {
    id: "event-request-002",
    title: "Community Paan and Cultural Stories Evening",
    submittedBy: "Cultural subcommittee",
    proposedDate: "2026-11-07",
    status: "draft",
    nextStep: "Complete budget, ticket price and volunteer plan"
  }
];

export const eventPaymentOptions = [
  {
    title: "General ticket",
    description: "Standard event ticket payment, ready for future Stripe checkout."
  },
  {
    title: "Member ticket",
    description: "Discounted or member-only ticket option after member login."
  },
  {
    title: "Family ticket",
    description: "Grouped ticket option for family and community events."
  }
];

export const eventDashboardStats = [
  { label: "Published events", value: "2" },
  { label: "Pending approval", value: "1" },
  { label: "Invitations sent", value: "86" },
  { label: "Payments received", value: "AUD 1,420" }
];

export const eventInvitations = [
  {
    id: "invite-001",
    eventTitle: "Mithila Cultural Festival",
    audience: "Annual members",
    sent: 48,
    accepted: 31,
    pending: 17
  },
  {
    id: "invite-002",
    eventTitle: "Madhubani Art Workshop",
    audience: "Members and volunteers",
    sent: 38,
    accepted: 22,
    pending: 16
  }
];

export const eventAttendees = [
  {
    id: "attendee-001",
    name: "Anita Jha",
    eventTitle: "Mithila Cultural Festival",
    ticketType: "Family ticket",
    paymentStatus: "paid",
    amountAud: 120
  },
  {
    id: "attendee-002",
    name: "Ramesh Mishra",
    eventTitle: "Madhubani Art Workshop",
    ticketType: "Member ticket",
    paymentStatus: "pending",
    amountAud: 35
  },
  {
    id: "attendee-003",
    name: "Community Supporter",
    eventTitle: "Mithila Cultural Festival",
    ticketType: "General ticket",
    paymentStatus: "paid",
    amountAud: 50
  }
];

export const eventAdminTasks = [
  "Review submitted event details",
  "Approve or request changes",
  "Set ticket types and prices",
  "Invite members and selected audiences",
  "Track payments and registrations",
  "Publish attendee list for check-in",
  "Close event and prepare event report"
];

export const membershipOptions = [
  {
    title: "Annual membership",
    description: "Join as an annual member and renew each year.",
    action: "Apply for annual membership"
  },
  {
    title: "Membership renewal",
    description: "Renew an existing membership and keep member status active.",
    action: "Renew membership"
  },
  {
    title: "Lifetime membership",
    description: "Support the society through a one-time lifetime membership.",
    action: "Request lifetime membership"
  },
  {
    title: "Donation",
    description: "Make a one-time donation for cultural programs and events.",
    action: "Donate"
  }
];

export const blogPosts: BlogPostSummary[] = [
  {
    id: "preserving-mithila-heritage",
    title: "Preserving Mithila Heritage in Australia",
    excerpt:
      "Community stories, language, arts and cultural traditions that connect generations.",
    publishedAt: "2026-06-01"
  },
  {
    id: "madhubani-art-community",
    title: "Madhubani Art as a Community Practice",
    excerpt:
      "How workshops and exhibitions can introduce Mithila visual traditions to wider audiences.",
    publishedAt: "2026-06-08"
  }
];

export const announcements: Announcement[] = [
  {
    id: "membership-open",
    title: "Membership applications are open",
    audience: "members",
    publishedAt: "2026-06-10"
  },
  {
    id: "volunteer-callout",
    title: "Volunteer callout for upcoming community events",
    audience: "public",
    publishedAt: "2026-06-11"
  }
];

export const members: MemberSummary[] = [
  {
    id: "member-001",
    name: "Anita Jha",
    email: "anita@example.com",
    membershipStatus: "active"
  },
  {
    id: "member-002",
    name: "Ramesh Mishra",
    email: "ramesh@example.com",
    membershipStatus: "pending"
  }
];

export const donations: DonationSummary[] = [
  {
    id: "donation-001",
    donorName: "Community Supporter",
    amountAud: 150,
    receivedAt: "2026-06-05"
  }
];

export const coreCommittee = [
  {
    name: "Shishirendu Jha",
    role: "Public Officer",
    phone: "0426399461",
    focus: "Official society representation and governance"
  },
  {
    name: "Deepak Thakur",
    role: "Elected Member",
    phone: "0411891607",
    focus: "Community engagement and member support"
  },
  {
    name: "Amitesh Jha",
    role: "Elected Member",
    phone: "0423504769",
    focus: "Membership, events and society operations"
  },
  {
    name: "Chandra Shekhar",
    role: "Elected Member",
    phone: "0416476725",
    focus: "Cultural programs and event coordination"
  },
  {
    name: "Navneet Jha",
    role: "Elected Member",
    phone: "0431516376",
    focus: "Member communication and community activities"
  },
  {
    name: "Avinash Kumar",
    role: "Elected Member",
    phone: "0450682916",
    focus: "Volunteering, partnerships and community outreach"
  }
];

export const advisors = [
  {
    name: "Sri Amit Das Ji",
    role: "Advisor",
    focus: "Guidance on community leadership, governance and long-term direction"
  },
  {
    name: "Smt. Rolee Satyam Ji",
    role: "Advisor",
    focus: "Guidance on culture, inclusion, community engagement and representation"
  },
  {
    name: "Sri Pushkar Ji",
    role: "Advisor",
    focus: "Guidance on partnerships, operations and community growth"
  },
  {
    name: "Dr. Bhaskar Ji",
    role: "Advisor",
    focus: "Guidance on strategy, programs and sustainable organisational development"
  }
];

export const culturalHighlights = [
  "Madhubani art",
  "Mithila language",
  "Community events",
  "Festivals",
  "Food and music",
  "Youth programs",
  "Family connection",
  "Australian Mithila identity"
];

export const culturalImages = [
  {
    src: "/images/madhubani-mithila-stamp-india-2000.jpeg",
    alt: "Madhubani Mithila paintings on a 2000 India postage stamp",
    title: "Madhubani Mithila Paintings stamp",
    credit:
      "Post of India, Government Open Data License - India, via Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Stamp_of_India_-_2000_-_Colnect_307681_-_Madhubani_Mithila_Paintings_-_se_tenant_pair.jpeg",
    licenseUrl: "https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf"
  },
  {
    src: "/images/madhubani-mahavidyas.jpg",
    alt: "Mithila painting with the Ten Mahavidyas, Shiva and Shakti",
    title: "Madhubani Mahavidyas",
    credit: "Toyin Adepoju, CC BY-SA 3.0, via Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Madhubani_Mahavidyas.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/"
  }
];
