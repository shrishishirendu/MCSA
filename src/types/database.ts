export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type MemberRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  membership_type: string;
  notes: string | null;
  membership_status: "pending" | "approved" | "rejected";
  joined_at: string | null;
  reviewed_at: string | null;
  created_at: string;
};

type BlogPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  image_urls: string[];
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type AnnouncementRow = {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  audience: "public" | "members";
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      members: {
        Row: MemberRow;
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          membership_type?: string;
          notes?: string | null;
          membership_status?: MemberRow["membership_status"];
          joined_at?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
        };
        Update: Partial<Omit<MemberRow, "id" | "created_at">>;
        Relationships: [];
      };
      blog_posts: {
        Row: BlogPostRow;
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          body: string;
          image_urls?: string[];
          status?: BlogPostRow["status"];
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<BlogPostRow, "id" | "created_at">>;
        Relationships: [];
      };
      announcements: {
        Row: AnnouncementRow;
        Insert: {
          id?: string;
          title: string;
          body: string;
          image_url?: string | null;
          audience?: AnnouncementRow["audience"];
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<AnnouncementRow, "id" | "created_at">>;
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          title: string;
          date: string;
          location: string;
          status: string;
        };
        Insert: {
          id?: string;
          title: string;
          date: string;
          location: string;
          status?: string;
        };
        Update: {
          title?: string;
          date?: string;
          location?: string;
          status?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
