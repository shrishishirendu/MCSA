import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/api-auth";
import { pujaItemsPath } from "@/lib/puja-items";
import { getAdminPujaItems, readPujaItemFields, toAdminPujaItem } from "@/lib/puja-items-server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = requireAdminApi();
  if (unauthorized) return unauthorized;
  const items = await getAdminPujaItems();
  if (!items) return NextResponse.json({ error: "The database is not configured." }, { status: 503 });
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const unauthorized = requireAdminApi();
  if (unauthorized) return unauthorized;

  const read = readPujaItemFields(await request.json().catch(() => ({})));
  if ("error" in read) return NextResponse.json({ error: read.error }, { status: 400 });

  try {
    const { data, error } = await createServerSupabaseClient().from("puja_items").insert(read.fields).select("*").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePath(pujaItemsPath);
    return NextResponse.json({ item: toAdminPujaItem(data) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "The database is not configured." }, { status: 503 });
  }
}
