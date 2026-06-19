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
    excerpt?: string;
    article?: string;
    imageUrls?: string[];
    publish?: boolean;
  };
  if (!body.title?.trim() || !body.excerpt?.trim() || !body.article?.trim()) {
    return NextResponse.json(
      { error: "Title, summary and article are required." },
      { status: 400 }
    );
  }

  const { data, error } = await createServerSupabaseClient()
    .from("blog_posts")
    .update({
      title: body.title.trim(),
      excerpt: body.excerpt.trim(),
      body: body.article.trim(),
      image_urls: body.imageUrls ?? [],
      status: body.publish ? "published" : "draft",
      published_at: body.publish ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    })
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ post: data });
}
