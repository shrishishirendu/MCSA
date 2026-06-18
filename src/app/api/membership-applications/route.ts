import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      email?: string;
      phone?: string;
      membershipType?: string;
      notes?: string;
    };

    if (!body.fullName?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

    const { error } = await createServerSupabaseClient().from("members").insert({
      full_name: body.fullName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      membership_type: body.membershipType?.trim() || "annual",
      notes: body.notes?.trim() || null,
      membership_status: "pending"
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "An application already exists for this email." },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Membership applications are not configured yet." },
      { status: 503 }
    );
  }
}
