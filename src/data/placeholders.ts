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

export type EventGroupId =
  | "national"
  | "sydney"
  | "melbourne"
  | "brisbane"
  | "perth"
  | "adelaide";

export type EventRoleId =
  | "super-admin"
  | "sydney-admin"
  | "melbourne-admin"
  | "member";

export type EventStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "published"
  | "completed";

export const eventGroups: Array<{
  id: EventGroupId;
  name: string;
  city: string;
  admin: string;
  paymentAccount: string;
  description: string;
}> = [
  {
    id: "national",
    name: "National committee",
    city: "Australia wide",
    admin: "Central admin",
    paymentAccount: "National Stripe account",
    description: "Oversight, approvals, reporting and cross-city events."
  },
  {
    id: "sydney",
    name: "Sydney events group",
    city: "Sydney",
    admin: "Sydney admin",
    paymentAccount: "Sydney event collection",
    description: "Creates and manages events for NSW members and guests."
  },
  {
    id: "melbourne",
    name: "Melbourne events group",
    city: "Melbourne",
    admin: "Melbourne admin",
    paymentAccount: "Melbourne event collection",
    description: "Creates and manages events for VIC members and guests."
  },
  {
    id: "brisbane",
    name: "Brisbane events group",
    city: "Brisbane",
    admin: "Brisbane admin",
    paymentAccount: "Brisbane event collection",
    description: "Future local event group for Queensland activities."
  },
  {
    id: "perth",
    name: "Perth events group",
    city: "Perth",
    admin: "Perth admin",
    paymentAccount: "Perth event collection",
    description: "Future local event group for Western Australia activities."
  },
  {
    id: "adelaide",
    name: "Adelaide events group",
    city: "Adelaide",
    admin: "Adelaide admin",
    paymentAccount: "Adelaide event collection",
    description: "Future local event group for South Australia activities."
  }
];

export const eventRoles: Array<{
  id: EventRoleId;
  label: string;
  groupId: EventGroupId | "all";
  description: string;
}> = [
  {
    id: "super-admin",
    label: "Super admin",
    groupId: "all",
    description: "Can approve events, see all groups, payments and reports."
  },
  {
    id: "sydney-admin",
    label: "Sydney admin",
    groupId: "sydney",
    description: "Can manage Sydney events, invites, attendees and payments."
  },
  {
    id: "melbourne-admin",
    label: "Melbourne admin",
    groupId: "melbourne",
    description: "Can manage Melbourne events, invites, attendees and payments."
  },
  {
    id: "member",
    label: "Member",
    groupId: "all",
    description: "Can view published events, register and pay for own tickets."
  }
];

export const externalEventPlatforms = [
  {
    name: "Humanitix",
    url: "https://www.humanitix.com/au",
    fit: "Recommended for MCSA community events",
    description:
      "Australian not-for-profit ticketing platform with registrations, paid tickets, attendee exports, QR check-in and event emails."
  },
  {
    name: "TryBooking",
    url: "https://www.trybooking.com/au",
    fit: "Strong Australian community option",
    description:
      "Australian ticketing platform used by community, school and cultural organisations for bookings, payments and check-in."
  },
  {
    name: "Eventbrite",
    url: "https://www.eventbrite.com.au",
    fit: "Good for public event discovery",
    description:
      "Large event marketplace with event pages, ticketing, promotion tools and attendee management."
  }
];

export const publicEventListings: Array<{
  id: string;
  groupId: EventGroupId;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  status: "approved" | "draft" | "needs-ticket-link";
  ticketingPlatform: "Humanitix" | "TryBooking" | "Eventbrite" | "To be selected";
  ticketingUrl: string;
  priceLabel: string;
  audience: string;
  summary: string;
}> = [
  {
    id: "dandiya-nights",
    groupId: "national",
    title: "Dandiya Nights",
    date: "See Humanitix page",
    time: "See ticketing page",
    venue: "See Humanitix page",
    city: "Official event",
    status: "approved",
    ticketingPlatform: "Humanitix",
    ticketingUrl: "https://events.humanitix.com/dandiya-nights",
    priceLabel: "Tickets via Humanitix",
    audience: "Members, families and guests",
    summary:
      "Register and pay through Humanitix. MCSA will use the external event page for ticketing, attendee management and event updates."
  },
  {
    id: "durga-puja",
    groupId: "national",
    title: "Durga Puja",
    date: "See Humanitix page",
    time: "See ticketing page",
    venue: "See Humanitix page",
    city: "Official event",
    status: "approved",
    ticketingPlatform: "Humanitix",
    ticketingUrl: "https://events.humanitix.com/durga-puja",
    priceLabel: "Tickets via Humanitix",
    audience: "Members, families and guests",
    summary:
      "Register and pay through Humanitix. MCSA will use the external event page for ticketing, attendee management and event updates."
  },
  {
    id: "sydney-mithila-cultural-festival",
    groupId: "sydney",
    title: "Sydney Mithila Cultural Festival",
    date: "12 September 2026",
    time: "5:30 PM",
    venue: "Parramatta, NSW",
    city: "Sydney",
    status: "needs-ticket-link",
    ticketingPlatform: "Humanitix",
    ticketingUrl: "https://www.humanitix.com/au",
    priceLabel: "Paid tickets",
    audience: "Members, families and guests",
    summary:
      "A public cultural evening with Mithila food, music, performances, Madhubani art and community recognition."
  },
  {
    id: "melbourne-madhubani-workshop",
    groupId: "melbourne",
    title: "Melbourne Madhubani Art Workshop",
    date: "18 October 2026",
    time: "11:00 AM",
    venue: "Docklands, VIC",
    city: "Melbourne",
    status: "needs-ticket-link",
    ticketingPlatform: "TryBooking",
    ticketingUrl: "https://www.trybooking.com/au",
    priceLabel: "Member and family tickets",
    audience: "Members, youth and families",
    summary:
      "A small-format workshop for families and young members to learn Madhubani art and Mithila cultural expression."
  },
  {
    id: "brisbane-community-meetup",
    groupId: "brisbane",
    title: "Brisbane Mithila Community Meetup",
    date: "To be confirmed",
    time: "TBC",
    venue: "Brisbane, QLD",
    city: "Brisbane",
    status: "draft",
    ticketingPlatform: "To be selected",
    ticketingUrl: "https://www.humanitix.com/au",
    priceLabel: "Free or donation-based",
    audience: "Local members and volunteers",
    summary:
      "A local planning meetup for future cultural events, volunteer coordination and community introductions."
  }
];

export const managedEvents: Array<{
  id: string;
  groupId: EventGroupId;
  title: string;
  date: string;
  time: string;
  venue: string;
  status: EventStatus;
  visibility: "public" | "members" | "invite-only";
  capacity: number;
  registrations: number;
  ticketPriceAud: number;
  revenueAud: number;
  owner: string;
  summary: string;
  needsApproval: boolean;
}> = [
  {
    id: "sydney-mithila-festival",
    groupId: "sydney",
    title: "Sydney Mithila Cultural Festival",
    date: "2026-09-12",
    time: "5:30 PM",
    venue: "Parramatta Town Hall, NSW",
    status: "published",
    visibility: "public",
    capacity: 220,
    registrations: 146,
    ticketPriceAud: 45,
    revenueAud: 6570,
    owner: "Sydney events group",
    summary: "Music, food, Madhubani art, family performances and community awards.",
    needsApproval: false
  },
  {
    id: "melbourne-madhubani-workshop",
    groupId: "melbourne",
    title: "Melbourne Madhubani Art Workshop",
    date: "2026-10-18",
    time: "11:00 AM",
    venue: "Docklands Community Hub, VIC",
    status: "approved",
    visibility: "members",
    capacity: 80,
    registrations: 44,
    ticketPriceAud: 25,
    revenueAud: 1100,
    owner: "Melbourne events group",
    summary: "Hands-on workshop for families, youth and new members.",
    needsApproval: false
  },
  {
    id: "brisbane-chhath-planning",
    groupId: "brisbane",
    title: "Brisbane Chhath Planning Meetup",
    date: "2026-08-16",
    time: "3:00 PM",
    venue: "South Bank meeting room, QLD",
    status: "submitted",
    visibility: "members",
    capacity: 60,
    registrations: 0,
    ticketPriceAud: 0,
    revenueAud: 0,
    owner: "Brisbane events group",
    summary: "Volunteer planning, venue shortlist and safety requirements.",
    needsApproval: true
  },
  {
    id: "perth-maithili-evening",
    groupId: "perth",
    title: "Perth Maithili Stories Evening",
    date: "2026-11-07",
    time: "6:00 PM",
    venue: "Perth cultural centre, WA",
    status: "draft",
    visibility: "invite-only",
    capacity: 50,
    registrations: 0,
    ticketPriceAud: 15,
    revenueAud: 0,
    owner: "Perth events group",
    summary: "Small-format gathering for language, stories and community introduction.",
    needsApproval: false
  }
];

export const eventInvitationCampaigns = [
  {
    id: "campaign-sydney-annual",
    eventId: "sydney-mithila-festival",
    groupId: "sydney" as EventGroupId,
    audience: "Sydney annual members and supporters",
    sent: 180,
    opened: 132,
    accepted: 98,
    pending: 48,
    declined: 34
  },
  {
    id: "campaign-melbourne-members",
    eventId: "melbourne-madhubani-workshop",
    groupId: "melbourne" as EventGroupId,
    audience: "Melbourne members and youth families",
    sent: 74,
    opened: 52,
    accepted: 31,
    pending: 18,
    declined: 5
  },
  {
    id: "campaign-brisbane-volunteers",
    eventId: "brisbane-chhath-planning",
    groupId: "brisbane" as EventGroupId,
    audience: "Brisbane volunteers",
    sent: 28,
    opened: 19,
    accepted: 12,
    pending: 14,
    declined: 2
  }
];

export const eventPaymentRecords = [
  {
    id: "payment-001",
    eventId: "sydney-mithila-festival",
    groupId: "sydney" as EventGroupId,
    payer: "Anita Jha",
    ticketType: "Family ticket",
    amountAud: 120,
    status: "paid",
    method: "Stripe ready",
    reference: "EVT-SYD-1001"
  },
  {
    id: "payment-002",
    eventId: "sydney-mithila-festival",
    groupId: "sydney" as EventGroupId,
    payer: "Community Supporter",
    ticketType: "General ticket",
    amountAud: 45,
    status: "paid",
    method: "Stripe ready",
    reference: "EVT-SYD-1002"
  },
  {
    id: "payment-003",
    eventId: "melbourne-madhubani-workshop",
    groupId: "melbourne" as EventGroupId,
    payer: "Ramesh Mishra",
    ticketType: "Member ticket",
    amountAud: 25,
    status: "pending",
    method: "Manual review",
    reference: "EVT-MEL-1001"
  }
];

export const eventAttendeeRecords = [
  {
    id: "attendee-001",
    eventId: "sydney-mithila-festival",
    groupId: "sydney" as EventGroupId,
    name: "Anita Jha",
    membership: "Annual member",
    tickets: 4,
    checkIn: "ready",
    paymentStatus: "paid"
  },
  {
    id: "attendee-002",
    eventId: "melbourne-madhubani-workshop",
    groupId: "melbourne" as EventGroupId,
    name: "Ramesh Mishra",
    membership: "Lifetime member",
    tickets: 1,
    checkIn: "pending payment",
    paymentStatus: "pending"
  },
  {
    id: "attendee-003",
    eventId: "sydney-mithila-festival",
    groupId: "sydney" as EventGroupId,
    name: "Community Supporter",
    membership: "Guest",
    tickets: 1,
    checkIn: "ready",
    paymentStatus: "paid"
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
