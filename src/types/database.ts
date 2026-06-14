export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      members: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          membership_status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          membership_status?: string;
          created_at?: string;
        };
        Update: {
          full_name?: string;
          email?: string;
          membership_status?: string;
        };
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
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
