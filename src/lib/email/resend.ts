import { env } from "@/lib/env";

type EoiEmailDetails = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  contributions: string[];
  preferredDays: string[];
  description: string;
  meetingRequested: boolean;
  meetingPurpose?: string;
  meetingPreferences: string[];
};

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  idempotencyKey: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function list(items: string[]) {
  return items.length ? items.map(escapeHtml).join(", ") : "Not specified";
}

async function sendEmail(input: SendEmailInput) {
  if (!env.resendApiKey || !env.eoiFromEmail) {
    return { sent: false, reason: "not_configured" as const };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.resendApiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": input.idempotencyKey
      },
      body: JSON.stringify({
        from: env.eoiFromEmail,
        to: [input.to],
        subject: input.subject,
        html: input.html,
        reply_to: input.replyTo
      }),
      cache: "no-store"
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend email failed:", response.status, error);
      return { sent: false, reason: "provider_error" as const };
    }

    return { sent: true as const };
  } catch (error) {
    console.error("Resend email request failed:", error);
    return { sent: false, reason: "provider_error" as const };
  }
}

export async function sendMahotsavEoiEmails(details: EoiEmailDetails) {
  const meeting = details.meetingRequested
    ? `<p><strong>Committee meeting:</strong> Requested (${escapeHtml(
        details.meetingPurpose || "Purpose not supplied"
      )})</p><p><strong>Preferred times:</strong> ${list(
        details.meetingPreferences
      )}</p>`
    : "<p><strong>Committee meeting:</strong> Not requested</p>";

  const adminHtml = `
    <h1>New Mithila Mahotsav 2026 EOI</h1>
    <p><strong>Reference:</strong> ${escapeHtml(details.id)}</p>
    <p><strong>Name:</strong> ${escapeHtml(details.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(details.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(details.phone)}</p>
    <p><strong>City:</strong> ${escapeHtml(details.city)}</p>
    <p><strong>Contributions:</strong> ${list(details.contributions)}</p>
    <p><strong>Preferred days:</strong> ${list(details.preferredDays)}</p>
    <p><strong>Proposal:</strong><br>${escapeHtml(details.description).replaceAll("\n", "<br>")}</p>
    ${meeting}
    <p>Review this submission in Admin Portal &gt; MM2026 EOI.</p>
  `;

  const applicantHtml = `
    <h1>Thank you for your MM2026 Expression of Interest</h1>
    <p>Dear ${escapeHtml(details.fullName)},</p>
    <p>We have received your Expression of Interest for Mithila Mahotsav 2026.</p>
    <p><strong>Reference:</strong> ${escapeHtml(details.id)}</p>
    <p><strong>Selected contributions:</strong> ${list(details.contributions)}</p>
    <p><strong>Preferred days:</strong> ${list(details.preferredDays)}</p>
    ${
      details.meetingRequested
        ? "<p>Your optional 30-minute online meeting request has also been received. The Core Committee will contact you after review.</p>"
        : ""
    }
    <p>The committee will review your submission and contact you with the next steps. EOI submissions cannot be edited after submission.</p>
    <p>Regards,<br>Mithila Cultural Society Australia</p>
  `;

  const [admin, applicant] = await Promise.all([
    sendEmail({
      to: env.eoiNotificationEmail,
      subject: `New MM2026 EOI - ${details.fullName}`,
      html: adminHtml,
      replyTo: details.email,
      idempotencyKey: `mm2026-${details.id}-admin`
    }),
    sendEmail({
      to: details.email,
      subject: "MM2026 Expression of Interest received",
      html: applicantHtml,
      replyTo: env.eoiNotificationEmail,
      idempotencyKey: `mm2026-${details.id}-applicant`
    })
  ]);

  return {
    configured: Boolean(env.resendApiKey && env.eoiFromEmail),
    adminSent: admin.sent,
    applicantSent: applicant.sent
  };
}
