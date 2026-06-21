import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (
      !body.fullName?.trim() ||
      !body.email?.trim() ||
      !body.phone?.trim() ||
      !body.ageGroup ||
      !body.city?.trim() ||
      !body.description?.trim() ||
      !Array.isArray(body.contributions) ||
      !body.contributions.length
    ) {
      return NextResponse.json({ error: "Complete all required fields and select at least one contribution." }, { status: 400 });
    }
    if (body.ageGroup === "under-18" && (!body.guardianName?.trim() || !body.guardianPhone?.trim())) {
      return NextResponse.json({ error: "Parent or guardian details are required for participants under 18." }, { status: 400 });
    }
    if (body.meetingRequested && (!body.meetingPurpose || !body.meetingPreference1 || !body.meetingPreference2)) {
      return NextResponse.json({ error: "Meeting purpose and at least two preferred times are required." }, { status: 400 });
    }

    const { data, error } = await createServerSupabaseClient()
      .from("mahotsav_eoi")
      .insert({
        full_name: body.fullName.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        age_group: body.ageGroup,
        city: body.city.trim(),
        contributions: body.contributions,
        preferred_days: body.preferredDays ?? [],
        participation_format: body.participationFormat ?? "individual",
        group_name: body.groupName?.trim() || null,
        participant_details: body.participantDetails?.trim() || null,
        performance_duration: body.performanceDuration?.trim() || null,
        music_link: body.musicLink?.trim() || null,
        description: body.description.trim(),
        requirements: body.requirements?.trim() || null,
        guardian_name: body.guardianName?.trim() || null,
        guardian_phone: body.guardianPhone?.trim() || null,
        meeting_requested: Boolean(body.meetingRequested),
        meeting_purpose: body.meetingPurpose || null,
        meeting_preference_1: body.meetingPreference1 || null,
        meeting_preference_2: body.meetingPreference2 || null,
        meeting_preference_3: body.meetingPreference3 || null
      })
      .select("id")
      .single();

    if (error) throw error;
    return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "The EOI database is not configured yet." }, { status: 503 });
  }
}
