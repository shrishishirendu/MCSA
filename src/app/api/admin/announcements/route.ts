import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/api-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const unauthorized = requireAdminApi();
    if (unauthorized) return unauthorized;

    const body = (await request.json()) as {
    title?: string;
    details?: string;
    imageUrl?: string;
    audience?: "public" | "members";
    publish?: boolean;
    };

    if (!body.title?.trim() || !body.details?.trim()) {
      return NextResponse.json(
        { error: "Title and announcement details are required." },
        { status: 400 }
      );
    }

    const publishedAt = body.publish ? new Date().toISOString() : null;
    const { data, error } = await createServerSupabaseClient()
      .from("announcements")
      .insert({
        title: body.title.trim(),
        body: body.details.trim(),
        image_url: body.imageUrl || null,
        audience: body.audience ?? "public",
        is_published: Boolean(body.publish),
        published_at: publishedAt
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ announcement: data }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error:
          "Announcements are not configured. Add the Supabase environment variables and run the database migration."
      },
      { status: 503 }
    );
  }
}
