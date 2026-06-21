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
  payment_confirmed: boolean;
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

type EventRow = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  summary: string;
  ticketing_url: string;
  price_label: string;
  audience: string;
  status: "draft" | "published";
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

type MahotsavEoiRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  age_group: string;
  city: string;
  contributions: string[];
  preferred_days: string[];
  participation_format: string;
  group_name: string | null;
  participant_details: string | null;
  performance_duration: string | null;
  music_link: string | null;
  description: string;
  requirements: string | null;
  guardian_name: string | null;
  guardian_phone: string | null;
  meeting_requested: boolean;
  meeting_purpose: string | null;
  meeting_preference_1: string | null;
  meeting_preference_2: string | null;
  meeting_preference_3: string | null;
  status: "submitted" | "under_review" | "approved" | "waitlisted" | "rejected" | "withdrawn";
  admin_notes: string | null;
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
          payment_confirmed?: boolean;
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
        Row: EventRow;
        Insert: {
          id?: string;
          title: string;
          date: string;
          time?: string;
          venue: string;
          city?: string;
          summary: string;
          ticketing_url?: string;
          price_label?: string;
          audience?: string;
          status?: EventRow["status"];
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<EventRow, "id" | "created_at">>;
        Relationships: [];
      };
      mahotsav_eoi: {
        Row: MahotsavEoiRow;
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          age_group: string;
          city: string;
          contributions: string[];
          preferred_days: string[];
          participation_format: string;
          group_name?: string | null;
          participant_details?: string | null;
          performance_duration?: string | null;
          music_link?: string | null;
          description: string;
          requirements?: string | null;
          guardian_name?: string | null;
          guardian_phone?: string | null;
          meeting_requested?: boolean;
          meeting_purpose?: string | null;
          meeting_preference_1?: string | null;
          meeting_preference_2?: string | null;
          meeting_preference_3?: string | null;
          status?: MahotsavEoiRow["status"];
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<MahotsavEoiRow, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
