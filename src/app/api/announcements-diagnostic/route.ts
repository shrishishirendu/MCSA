import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const { data, error } = await createServerSupabaseClient()
      .from("announcements")
      .select(
        "id,title,audience,is_published,published_at,created_at,image_url"
      );

    if (error) {
      return NextResponse.json(
        { ok: false, code: error.code, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      count: data.length,
      announcements: data
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
