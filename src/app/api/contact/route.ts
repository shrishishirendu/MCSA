import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email/resend";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const comment = String(body.comment ?? "").trim();

    if (!name || !email || !comment) {
      return NextResponse.json(
        { error: "Please provide your name, email address and comment." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const emailResult = await sendContactEmail({
      name,
      email,
      phone,
      comment
    });

    if (!emailResult.configured || !emailResult.sent) {
      return NextResponse.json(
        {
          error:
            "The message could not be sent right now. Please email mithilaculturalsoc@gmail.com directly."
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error:
          "The message could not be sent right now. Please email mithilaculturalsoc@gmail.com directly."
      },
      { status: 503 }
    );
  }
}
