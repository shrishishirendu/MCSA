import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/api-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const unauthorized = requireAdminApi();
  if (unauthorized) return unauthorized;

  const body = (await request.json()) as {
    title?: string;
    details?: string;
    imageUrl?: string | null;
  };
  if (!body.title?.trim() || !body.details?.trim()) {
    return NextResponse.json(
      { error: "Title and details are required." },
      { status: 400 }
    );
  }

  const { data, error } = await createServerSupabaseClient()
    .from("announcements")
    .update({
      title: body.title.trim(),
      body: body.details.trim(),
      image_url: body.imageUrl || null,
      audience: "public",
      is_published: true,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ announcement: data });
}
