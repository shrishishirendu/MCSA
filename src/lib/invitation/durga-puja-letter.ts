import { jsPDF } from "jspdf";
import { durgaPuja, festivalDays } from "@/data/durga-puja-2026";
import { invitationImages } from "@/lib/invitation/images";

export type InvitationLetterDetails = {
  name: string;
  email: string;
  reference: string;
  issuedAt: Date;
};

const maroon: [number, number, number] = [118, 28, 37];
const gold: [number, number, number] = [197, 149, 61];
const ink: [number, number, number] = [52, 40, 32];
const muted: [number, number, number] = [114, 94, 75];
const cream: [number, number, number] = [255, 249, 236];

export function invitationFileName(name: string) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "guest";
  return `durga-puja-2026-invitation-${slug}.pdf`;
}

export function buildInvitationLetter(details: InvitationLetterDetails) {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const left = 18;
  const right = width - 18;
  const contentWidth = right - left;

  doc.setProperties({ title: `Durga Puja 2026 invitation · ${details.name}`, author: "Mithila Cultural Society Australia" });

  // Frame
  doc.setFillColor(...cream);
  doc.rect(0, 0, width, height, "F");
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.8);
  doc.rect(7, 7, width - 14, height - 14);
  doc.setLineWidth(0.25);
  doc.rect(9, 9, width - 18, height - 18);

  // Letterhead
  doc.addImage(invitationImages.logo, "JPEG", left, 14, 22, 22);
  doc.addImage(invitationImages.durga, "JPEG", right - 30, 13, 30, 26);
  doc.setTextColor(...maroon);
  doc.setFont("times", "bold");
  doc.setFontSize(17);
  doc.text("Mithila Cultural Society Australia", left + 26, 22);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...muted);
  doc.text("Jai Mata Di · Jai Mithila · Jai Maithili", left + 26, 28);
  doc.text(`${durgaPuja.email} · ${durgaPuja.contacts.map(contact => `${contact.name} ${contact.phone}`).join(" · ")}`, left + 26, 33);

  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.line(left, 42, right, 42);

  // Title
  let y = 53;
  doc.setTextColor(...maroon);
  doc.setFont("times", "bold");
  doc.setFontSize(24);
  doc.text("Durga Puja 2026", width / 2, y, { align: "center" });
  y += 7;
  doc.setFont("times", "italic");
  doc.setFontSize(12);
  doc.setTextColor(...muted);
  doc.text("Mithila welcomes Mahashakti", width / 2, y, { align: "center" });

  // Reference and greeting
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`Reference: ${details.reference}`, right, y, { align: "right" });
  doc.text(`Issued: ${details.issuedAt.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "Australia/Sydney" })}`, right, y + 4.5, { align: "right" });

  doc.setTextColor(...ink);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`Dear ${details.name},`, left, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...muted);
  doc.text(details.email, left, y + 4.5);

  y += 13;
  doc.setTextColor(...ink);
  doc.setFontSize(10);
  const body = doc.splitTextToSize(
    "With the blessings of Maa Bhagwati, Mithila Cultural Society Australia warmly invites you and your family to Durga Puja 2026: three days of devotion, culture and togetherness in Sydney. Join us to welcome Maa Durga, offer your prayers, celebrate the living traditions of Mithila, and share Bhog and Prasad with the community.",
    contentWidth
  );
  doc.text(body, left, y, { lineHeightFactor: 1.45 });
  y += body.length * 5.1 + 3;

  // Event details
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...gold);
  doc.roundedRect(left, y, contentWidth, 15, 2, 2, "FD");
  const facts = [
    ["When", `${durgaPuja.dates} (Sat–Mon)`],
    ["Where", durgaPuja.venue],
    ["Address", durgaPuja.address]
  ];
  const factWidth = contentWidth / facts.length;
  facts.forEach(([label, value], index) => {
    const x = left + 4 + index * factWidth;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...gold);
    doc.text(label.toUpperCase(), x, y + 5.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...ink);
    doc.text(doc.splitTextToSize(value, factWidth - 6)[0], x, y + 10.5);
  });
  y += 23;

  // Programme
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...maroon);
  doc.text("Programme", left, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  doc.text("All times are Sydney local time (AEDT) · * Ticketed event", right, y, { align: "right" });
  y += 5;

  const gap = 4;
  const columnWidth = (contentWidth - gap * 2) / 3;
  let programmeBottom = y;
  festivalDays.forEach((day, index) => {
    const x = left + index * (columnWidth + gap);
    let rowY = y;
    doc.setFillColor(...maroon);
    doc.roundedRect(x, rowY, columnWidth, 9, 1.5, 1.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`${day.day} ${day.date}`, x + 3, rowY + 5.9);
    rowY += 13;
    day.items.forEach(item => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...gold);
      doc.text(item.time, x + 1, rowY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...ink);
      const title = doc.splitTextToSize(`${item.title}${"ticketed" in item && item.ticketed ? " *" : ""}`, columnWidth - 2);
      doc.text(title, x + 1, rowY + 3.6);
      rowY += 3.6 + title.length * 3.4 + 1.6;
    });
    programmeBottom = Math.max(programmeBottom, rowY);
  });
  y = programmeBottom + 2;

  // Support
  doc.setDrawColor(...gold);
  doc.line(left, y, right, y);
  y += 7;
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...maroon);
  doc.text("Help bring this celebration to life", left, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...ink);
  const support = doc.splitTextToSize(
    "Your offering to Maa Bhagwati supports the Puja, Bhog, venue and community arrangements. Scan a code or use the links below.",
    contentWidth - 62
  );
  doc.text(support, left, y + 5.5, { lineHeightFactor: 1.4 });

  const qrSize = 24;
  const qrY = y - 4;
  [
    { image: invitationImages.gofundmeQr, label: "Donate · GoFundMe", url: durgaPuja.donationUrl, x: right - qrSize * 2 - 6 },
    { image: invitationImages.sevaQr, label: "Seva packages", url: durgaPuja.sevaUrl, x: right - qrSize }
  ].forEach(code => {
    doc.addImage(code.image, "PNG", code.x, qrY, qrSize, qrSize);
    doc.link(code.x, qrY, qrSize, qrSize, { url: code.url });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...maroon);
    doc.text(code.label, code.x + qrSize / 2, qrY + qrSize + 3.5, { align: "center" });
  });

  let linkY = y + 5.5 + support.length * 4.4 + 1.5;
  doc.setFontSize(8.5);
  [
    ["Donate:", durgaPuja.donationUrl],
    ["Seva:", durgaPuja.sevaUrl]
  ].forEach(([label, url]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...ink);
    doc.text(label, left, linkY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...maroon);
    doc.textWithLink(url, left + 14, linkY, { url });
    linkY += 4.6;
  });
  y = Math.max(linkY, qrY + qrSize + 6) + 6;

  // Sign-off
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...ink);
  doc.text("We look forward to celebrating with you.", left, y);
  y += 5.5;
  doc.text("With warm regards and the blessings of Maa Bhagwati,", left, y);
  y += 8;
  doc.setFont("times", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...maroon);
  doc.text("Invited by: Mithila Cultural Society Australia", left, y);

  // Footer note
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  const note = doc.splitTextToSize(
    "This letter is a personal invitation and is not an entry ticket or proof of payment. Ticketed events (Mithila Mahotsav and Dandiya Utsav) and Seva packages are booked separately. Programme details may change; please check the website before your visit.",
    contentWidth
  );
  doc.text(note, width / 2, height - 22, { align: "center", lineHeightFactor: 1.35 });
  doc.setTextColor(...maroon);
  doc.textWithLink(durgaPuja.url.replace("https://", ""), width / 2, height - 13, { align: "center", url: durgaPuja.url });

  return Buffer.from(doc.output("arraybuffer"));
}
