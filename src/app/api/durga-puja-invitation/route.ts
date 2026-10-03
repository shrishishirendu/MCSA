import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { sendDurgaPujaInvitationEmail, sendDurgaPujaInvitationNotification } from "@/lib/email/resend";
import { buildInvitationLetter, invitationFileName } from "@/lib/invitation/durga-puja-letter";

export const runtime = "nodejs";

// The PDF uses standard fonts, which cover English letters and Western European accents only.
const namePattern = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ .'-]{1,79}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[\d\s()-]{8,20}$/;
const referenceAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function createReference() {
  return `MCSA-DP26-${Array.from({ length: 6 }, () => referenceAlphabet[randomInt(referenceAlphabet.length)]).join("")}`;
}

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
  const paidStatus = body.paidStatus === "paid" ? "paid" : "not_paid";
  const wantsToContribute = typeof body.wantsToContribute === "boolean" ? body.wantsToContribute : null;

  if (!namePattern.test(name)) {
    return NextResponse.json({ error: "Please enter your full name in English letters." }, { status: 400 });
  }
  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!phonePattern.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: "Please agree to be contacted about Durga Puja 2026." }, { status: 400 });
  }

  const reference = createReference();
  const fileName = invitationFileName(name);
  const pdf = buildInvitationLetter({ name, email, reference, issuedAt: new Date() });

  // Emailing is best-effort: the guest always receives their letter as a download.
  const [guestEmail] = await Promise.all([
    sendDurgaPujaInvitationEmail({ name, email, reference, fileName, pdf }),
    sendDurgaPujaInvitationNotification({ name, email, phone, reference, paidStatus, wantsToContribute })
  ]);

  return NextResponse.json({ ok: true, reference, fileName, pdf: pdf.toString("base64"), emailed: guestEmail.sent }, { status: 201 });
}
