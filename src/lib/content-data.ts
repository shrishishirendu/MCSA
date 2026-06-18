import {
  announcements as fallbackAnnouncements,
  blogPosts as fallbackBlogPosts,
  members as fallbackMembers
} from "@/data/placeholders";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  Announcement,
  BlogPostSummary,
  MemberSummary
} from "@/types/content";

function canUseSupabase() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

function isAnnouncementPublished(announcement: {
  is_published: unknown;
  published_at: string | null;
}) {
  const flag = String(announcement.is_published).trim().toLowerCase();
  return (
    Boolean(announcement.published_at) ||
    ["true", "t", "1", "published"].includes(flag)
  );
}

function announcementAudience(value: unknown): "public" | "members" {
  const audience = String(value).trim().toLowerCase();
  return audience.includes("member") ? "members" : "public";
}

function mapMember(row: {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  membership_type: string;
  payment_confirmed: boolean;
  notes: string | null;
  membership_status: "pending" | "approved" | "rejected";
  joined_at: string | null;
  created_at: string;
}): MemberSummary {
  return {
    id: row.id,
    name: row.full_name,
    email: row.email,
    phone: row.phone,
    membershipType: row.membership_type,
    paymentConfirmed: row.payment_confirmed,
    notes: row.notes,
    membershipStatus: row.membership_status,
    joinedAt: row.joined_at,
    createdAt: row.created_at
  };
}

export async function getMembers(): Promise<MemberSummary[]> {
  if (!canUseSupabase()) {
    return fallbackMembers;
  }

  try {
    const { data, error } = await createServerSupabaseClient()
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data.map(mapMember);
  } catch {
    return fallbackMembers;
  }
}

export async function getApprovedMembers(): Promise<MemberSummary[]> {
  const members = await getMembers();
  return members.filter((member) =>
    ["active", "approved"].includes(member.membershipStatus)
  );
}

export async function getBlogPosts(options?: {
  includeDrafts?: boolean;
}): Promise<BlogPostSummary[]> {
  if (!canUseSupabase()) {
    return fallbackBlogPosts;
  }

  try {
    const { data, error } = await createServerSupabaseClient()
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) throw error;

    return data
      .filter(
        (post) =>
          options?.includeDrafts ||
          post.status.trim().toLowerCase() === "published"
      )
      .map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        imageUrls: post.image_urls,
        status: post.status,
        publishedAt: post.published_at ?? post.created_at
      }));
  } catch {
    return fallbackBlogPosts;
  }
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostSummary | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug || post.id === slug) ?? null;
}

export async function getAnnouncements(options?: {
  includeUnpublished?: boolean;
  audience?: "public" | "members";
}): Promise<Announcement[]> {
  if (!canUseSupabase()) {
    return fallbackAnnouncements.filter(
      (announcement) =>
        !options?.audience || announcement.audience === options.audience
    );
  }

  try {
    const { data, error } = await createServerSupabaseClient()
      .from("announcements")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) throw error;

    return data
      .filter(
        (announcement) => {
          const audience = announcementAudience(announcement.audience);
          const published = isAnnouncementPublished(announcement);

          return (
            (!options?.audience ||
              options.audience === "public" ||
              audience === options.audience) &&
            (options?.includeUnpublished ||
              published ||
              options?.audience === "public")
          );
        }
      )
      .map((announcement) => {
        const audience = announcementAudience(announcement.audience);
        const published = isAnnouncementPublished(announcement);

        return {
          id: announcement.id,
          title: announcement.title,
          body: announcement.body,
          imageUrl: announcement.image_url,
          audience,
          isPublished: published,
          publishedAt: announcement.published_at ?? announcement.created_at
        };
      });
  } catch {
    return fallbackAnnouncements.filter(
      (announcement) =>
        !options?.audience || announcement.audience === options.audience
    );
  }
}
