import type { NavigationItem } from "@/types/navigation";

export const publicNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Announcements", href: "/announcements" },
  { label: "Admin Portal", href: "/admin" }
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
  { label: "Tickets", href: "/admin/tickets" },
  { label: "Donations", href: "/admin/donations" },
  { label: "Blog Posts", href: "/admin/blog-posts" },
  { label: "Announcements", href: "/admin/announcements" },
  { label: "Reports", href: "/admin/reports" }
];
