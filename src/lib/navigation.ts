import type { NavigationItem } from "@/types/navigation";

export const publicNavigation: NavigationItem[] = [
  { label: "About Us", href: "/" },
  { label: "Who are we?", href: "/who-are-we" },
  { label: "Membership", href: "/membership" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Admin Portal", href: "/admin" }
];

export const footerNavigation: NavigationItem[] = [
  ...publicNavigation,
  { label: "Announcements", href: "/announcements" }
];

export const memberNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/member" },
  { label: "My Profile", href: "/member/profile" },
  { label: "My Membership", href: "/member/membership" },
  { label: "My Tickets", href: "/member/tickets" },
  { label: "My Donations", href: "/member/donations" },
  { label: "Announcements", href: "/member/announcements" }
];

export const adminNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Members", href: "/admin/members" },
  { label: "Events", href: "/admin/events" },
  { label: "MM2026 EOI", href: "/admin/mahotsav-eoi" },
  { label: "Tickets", href: "/admin/tickets" },
  { label: "Donations", href: "/admin/donations" },
  { label: "Blog Posts", href: "/admin/blog-posts" },
  { label: "Announcements", href: "/admin/announcements" },
  { label: "Reports", href: "/admin/reports" }
];
