import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/api-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
}

export async function POST(request: Request) {
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

  const baseSlug = slugify(body.title) || "article";
  const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;
  const publishedAt = body.publish ? new Date().toISOString() : null;
  const { data, error } = await createServerSupabaseClient()
    .from("blog_posts")
    .insert({
      title: body.title.trim(),
      slug,
      excerpt: body.excerpt.trim(),
      body: body.article.trim(),
      image_urls: body.imageUrls ?? [],
      status: body.publish ? "published" : "draft",
      published_at: publishedAt
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post: data }, { status: 201 });
}
