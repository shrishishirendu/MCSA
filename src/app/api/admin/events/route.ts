import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/api-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const unauthorized = requireAdminApi();
  if (unauthorized) return unauthorized;
  const body = await request.json();

  if (!body.title?.trim() || !body.date || !body.venue?.trim() || !body.summary?.trim()) {
    return NextResponse.json(
      { error: "Title, date, venue and summary are required." },
      { status: 400 }
    );
  }

  const { data, error } = await createServerSupabaseClient()
    .from("events")
    .insert({
      title: body.title.trim(),
      date: body.date,
      time: body.time?.trim() || "",
      venue: body.venue.trim(),
      city: body.city?.trim() || "Australia",
      summary: body.summary.trim(),
      ticketing_url: body.ticketingUrl?.trim() || "",
      price_label: body.priceLabel?.trim() || "See event details",
      audience: body.audience?.trim() || "Members, families and guests",
      status: body.publish ? "published" : "draft",
      image_url: body.imageUrl || null
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/");
  revalidatePath("/events");
  return NextResponse.json({ event: data }, { status: 201 });
}
