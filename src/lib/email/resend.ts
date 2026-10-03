import { dandiyaSession, durgaPuja } from "@/data/durga-puja-2026";
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
  attachments?: Array<{ filename: string; content: string }>;
};

type ContactEmailDetails = {
  name: string;
  email: string;
  phone: string;
  comment: string;
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
        reply_to: input.replyTo,
        attachments: input.attachments
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

export async function sendContactEmail(details: ContactEmailDetails) {
  const adminHtml = `
    <h1>New website contact query</h1>
    <p><strong>Name:</strong> ${escapeHtml(details.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(details.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(details.phone || "Not supplied")}</p>
    <p><strong>Comment:</strong><br>${escapeHtml(details.comment).replaceAll("\n", "<br>")}</p>
    <p>Submitted via the Mithila Cultural Society Australia Contact Us page.</p>
  `;

  const result = await sendEmail({
    to: env.contactNotificationEmail,
    subject: `Website contact query - ${details.name}`,
    html: adminHtml,
    replyTo: details.email,
    idempotencyKey: `contact-${Date.now()}-${details.email}`
  });

  return {
    configured: Boolean(env.resendApiKey && env.eoiFromEmail),
    sent: result.sent
  };
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

type InvitationEmailDetails = {
  name: string;
  email: string;
  reference: string;
  fileName: string;
  pdf: Buffer;
};

export async function sendDurgaPujaInvitationEmail(details: InvitationEmailDetails) {
  const html = `
    <p>Dear ${escapeHtml(details.name)},</p>
    <p>With the blessings of Maa Bhagwati, Mithila Cultural Society Australia warmly invites you and your family to <strong>Durga Puja 2026</strong>, ${durgaPuja.dates} at ${durgaPuja.venue}, ${durgaPuja.address}.</p>
    <p>Your invitation letter with the full programme is attached.</p>
    <p><strong>Help bring this celebration to life:</strong> your offering supports the Puja, Bhog, venue and community arrangements.<br>
      Donate via GoFundMe: <a href="${durgaPuja.donationUrl}">${durgaPuja.donationUrl}</a><br>
      Seva packages: <a href="${durgaPuja.sevaUrl}">${durgaPuja.sevaUrl}</a></p>
    <p>Programme and updates: <a href="${durgaPuja.url}">${durgaPuja.url.replace("https://www.", "")}</a></p>
    <p>Reference: ${escapeHtml(details.reference)}</p>
    <p>With warm regards,<br>Invited by: Mithila Cultural Society Australia</p>
  `;

  const result = await sendEmail({
    to: details.email,
    subject: "Your invitation to Durga Puja 2026 · Mithila Cultural Society Australia",
    html,
    replyTo: env.eoiNotificationEmail,
    // One email per address per day, so repeated downloads do not flood an inbox.
    idempotencyKey: `dp2026-invitation-${details.email}-${new Date().toISOString().slice(0, 10)}`,
    attachments: [{ filename: details.fileName, content: details.pdf.toString("base64") }]
  });

  return { configured: Boolean(env.resendApiKey && env.eoiFromEmail), sent: result.sent };
}

type InvitationNotificationDetails = {
  name: string;
  email: string;
  phone: string;
  reference: string;
  paidStatus: "paid" | "not_paid";
  wantsToContribute: boolean | null;
};

export async function sendDurgaPujaInvitationNotification(details: InvitationNotificationDetails) {
  const contribute = details.wantsToContribute === null ? "Not asked (said already paid)" : details.wantsToContribute ? "Yes, opened GoFundMe" : "Not now";
  const html = `
    <h1>Durga Puja 2026 invitation letter requested</h1>
    <p><strong>Reference:</strong> ${escapeHtml(details.reference)}</p>
    <p><strong>Name:</strong> ${escapeHtml(details.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(details.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(details.phone)}</p>
    <p><strong>Already paid (self-reported):</strong> ${details.paidStatus === "paid" ? "Yes" : "No"}</p>
    <p><strong>Contribute to Maa Bhagwati now:</strong> ${contribute}</p>
    <p>The guest agreed to be contacted about Durga Puja 2026.</p>
  `;

  return sendEmail({
    to: env.eoiNotificationEmail,
    subject: `Durga Puja 2026 invitation - ${details.name}`,
    html,
    replyTo: details.email,
    idempotencyKey: `dp2026-invitation-${details.reference}-admin`
  });
}

type DandiyaBookingDetails = {
  name: string;
  email: string;
  phone: string;
  ticketCount: number;
  bookingReference: string;
  submissionId: string;
};

export async function sendDandiyaBookingEmails(details: DandiyaBookingDetails) {
  const reference = details.bookingReference ? escapeHtml(details.bookingReference) : "Not supplied";
  const adminHtml = `
    <h1>Dandiya Utsav 2026 – booking details shared</h1>
    <p><strong>Name:</strong> ${escapeHtml(details.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(details.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(details.phone)}</p>
    <p><strong>Tickets booked (self-reported):</strong> ${details.ticketCount}</p>
    <p><strong>Order number / payment reference:</strong> ${reference}</p>
    <p>Please check this against the Humanitix orders for Dandiya Nights if needed.</p>
  `;

  const guestHtml = `
    <p>Dear ${escapeHtml(details.name)},</p>
    <p>Thank you for booking Dandiya Utsav at Durga Puja 2026. We have shared your booking details with the organising team.</p>
    <p><strong>Tickets:</strong> ${details.ticketCount}<br><strong>Order number / payment reference:</strong> ${reference}</p>
    <p><strong>When:</strong> ${dandiyaSession().date}, ${dandiyaSession().time}<br><strong>Where:</strong> ${durgaPuja.venue}, ${durgaPuja.address}</p>
    <p>Please bring your Humanitix ticket (on your phone or printed) for entry. Bring your dandiya sticks and festive spirit!</p>
    <p>Programme and updates: <a href="${durgaPuja.url}">${durgaPuja.url.replace("https://www.", "")}</a></p>
    <p>With warm regards,<br>Mithila Cultural Society Australia</p>
  `;

  const [admin, guest] = await Promise.all([
    sendEmail({
      to: env.eoiNotificationEmail,
      subject: `Dandiya 2026 booking - ${details.name} (${details.ticketCount} ticket${details.ticketCount === 1 ? "" : "s"})`,
      html: adminHtml,
      replyTo: details.email,
      idempotencyKey: `dandiya2026-${details.submissionId}-admin`
    }),
    sendEmail({
      to: details.email,
      subject: "Dandiya Utsav 2026 · Your booking details",
      html: guestHtml,
      replyTo: env.eoiNotificationEmail,
      idempotencyKey: `dandiya2026-${details.submissionId}-guest`
    })
  ]);

  return { adminSent: admin.sent, guestSent: guest.sent };
}
