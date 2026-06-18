import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/api-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxBytes = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const unauthorized = requireAdminApi();
    if (unauthorized) return unauthorized;

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Select an image." }, { status: 400 });
    }
    if (!allowedTypes.has(file.type) || file.size > maxBytes) {
      return NextResponse.json(
        { error: "Use a JPG, PNG or WebP image up to 5 MB." },
        { status: 400 }
      );
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${new Date().getUTCFullYear()}/${randomUUID()}.${extension}`;
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.storage
      .from("content-images")
      .upload(path, await file.arrayBuffer(), {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from("content-images").getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error:
          "Image storage is not configured. Add the Supabase environment variables and run the database migration."
      },
      { status: 503 }
    );
  }
}
