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
    status?: "approved" | "rejected";
  };
  if (!body.status || !["approved", "rejected"].includes(body.status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const now = new Date().toISOString();
  const { data, error } = await createServerSupabaseClient()
    .from("members")
    .update({
      membership_status: body.status,
      reviewed_at: now,
      joined_at: body.status === "approved" ? now : null
    })
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ member: data });
}
