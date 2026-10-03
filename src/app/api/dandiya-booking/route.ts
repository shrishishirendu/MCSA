import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { sendDandiyaBookingEmails } from "@/lib/email/resend";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[\d\s()-]{8,20}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().replace(/\s+/g, " ");
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const ticketCount = Number(body.ticketCount);
  const bookingReference = String(body.bookingReference ?? "").trim().slice(0, 200);

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!phonePattern.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }
  if (!Number.isInteger(ticketCount) || ticketCount < 1 || ticketCount > 50) {
    return NextResponse.json({ error: "Please enter how many tickets you booked." }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: "Please agree to share these details with the organising team." }, { status: 400 });
  }

  const result = await sendDandiyaBookingEmails({ name, email, phone, ticketCount, bookingReference, submissionId: randomUUID() });
  if (!result.adminSent) {
    return NextResponse.json({ error: "Your details could not be sent to the team." }, { status: 503 });
  }
  return NextResponse.json({ ok: true, emailed: result.guestSent }, { status: 201 });
}
