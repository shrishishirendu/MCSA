import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/api-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const unauthorized = requireAdminApi();
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const allowed = ["submitted", "under_review", "approved", "waitlisted", "rejected", "withdrawn"];
  if (!allowed.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }
  const { data, error } = await createServerSupabaseClient()
    .from("mahotsav_eoi")
    .update({
      status: body.status,
      admin_notes: body.adminNotes?.trim() || null,
      updated_at: new Date().toISOString()
    })
    .eq("id", params.id)
    .select("*")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ eoi: data });
}
