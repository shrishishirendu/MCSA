import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "@/types/database";

export function createBrowserSupabaseClient() {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error("Supabase browser environment variables are not configured.");
  }

  return createClient<Database>(env.supabaseUrl, env.supabaseAnonKey);
}
