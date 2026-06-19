import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const { data, error } = await createServerSupabaseClient()
      .from("blog_posts")
      .select("id,title,slug,status,published_at,created_at,updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { ok: false, code: error.code, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, posts: data });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
