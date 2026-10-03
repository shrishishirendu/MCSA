"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { dandiyaSession, durgaPuja } from "@/data/durga-puja-2026";
import { FieldGroup, Label, TextInput, TextArea } from "@/components/ui/Form";
import { StepQuestion, stepButton } from "@/components/events/StepQuestion";
import { readJsonResponse } from "@/lib/response";

type Step = "booked" | "details" | "shared" | "buy" | "bought" | "later";

const { primary, secondary, back } = stepButton;
const session = dandiyaSession();

export function DandiyaBookingFlow() {
  const [step, setStep] = useState<Step>("booked");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState("");
  const [guest, setGuest] = useState({ name: "", email: "", ticketCount: 1, emailed: false });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const data = new FormData(event.currentTarget);
    const details = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      ticketCount: Number(data.get("ticketCount")),
      bookingReference: String(data.get("bookingReference") ?? "").trim(),
      consent: data.get("consent") === "on"
    };
    setFallback(`mailto:${durgaPuja.email}?subject=${encodeURIComponent(`Dandiya 2026 booking - ${details.name}`)}&body=${encodeURIComponent(`Name: ${details.name}\nEmail: ${details.email}\nPhone: ${details.phone}\nTickets booked: ${details.ticketCount}\nOrder number / payment reference: ${details.bookingReference || "Not supplied"}`)}`);
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/dandiya-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details)
      });
      const result = await readJsonResponse<{ ok?: boolean; emailed?: boolean }>(response);
      if (!response.ok || !result.ok) {
        setError(result.error ?? "Your details could not be sent.");
        return;
      }
      setGuest({ name: details.name, email: details.email, ticketCount: details.ticketCount, emailed: Boolean(result.emailed) });
      setStep("shared");
    } catch {
      setError("Your details could not be sent. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "booked") return <StepQuestion step="Step 1 of 2" title="Have you booked your Dandiya tickets?">
    <p className="mt-3 leading-7 text-[#725e4b]">Dandiya Utsav is a ticketed event, booked through Humanitix as “Dandiya Nights”.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <button type="button" className={primary} onClick={() => setStep("details")}>Yes, I have booked</button>
      <button type="button" className={secondary} onClick={() => setStep("buy")}>No, not yet</button>
    </div>
  </StepQuestion>;

  if (step === "details") return <StepQuestion step="Step 2 of 2" title="Share your booking details">
    <p className="mt-3 leading-7 text-[#725e4b]">This helps the organising team plan for everyone and find your booking if there is a question at entry.</p>
    <form onSubmit={submit} className="mt-6 grid gap-5" aria-label="Dandiya booking details">
      <fieldset disabled={submitting} className="grid min-w-0 gap-5 disabled:opacity-70">
        <FieldGroup><Label htmlFor="dandiya-name">Name on the booking *</Label><TextInput id="dandiya-name" name="name" autoComplete="name" maxLength={120} required defaultValue={guest.name} /></FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldGroup><Label htmlFor="dandiya-email">Email *</Label><TextInput id="dandiya-email" name="email" type="email" autoComplete="email" maxLength={254} required defaultValue={guest.email} /></FieldGroup>
          <FieldGroup><Label htmlFor="dandiya-phone">Phone *</Label><TextInput id="dandiya-phone" name="phone" type="tel" autoComplete="tel" maxLength={20} required /></FieldGroup>
        </div>
        <FieldGroup><Label htmlFor="dandiya-tickets">How many tickets did you book? *</Label><TextInput id="dandiya-tickets" name="ticketCount" type="number" min={1} max={50} step={1} required defaultValue={guest.ticketCount} className="max-w-32" /></FieldGroup>
        <FieldGroup>
          <Label htmlFor="dandiya-reference">Humanitix order number or payment reference (optional)</Label>
          <TextArea id="dandiya-reference" name="bookingReference" maxLength={200} className="min-h-20" placeholder="You can find the order number in your Humanitix confirmation email." />
        </FieldGroup>
        <label className="flex items-start gap-3 text-sm leading-6"><input name="consent" type="checkbox" required className="mt-1 size-4 shrink-0" /><span>I agree to share these details with Mithila Cultural Society Australia and to be contacted about my Dandiya booking.</span></label>
        {error && <div role="alert" className="rounded-md border border-[#c5953d]/50 bg-[#fff9ec] p-4 text-sm leading-6"><p>{error}</p>{fallback && <a href={fallback} className="mt-3 inline-block font-semibold text-[#761c25] underline">Send these details by email instead</a>}</div>}
        <button type="submit" className={primary}>{submitting ? "Sending…" : "Share booking details"}</button>
      </fieldset>
    </form>
    <button type="button" className={back} onClick={() => setStep("booked")}>← Back</button>
  </StepQuestion>;

  if (step === "shared") return <StepQuestion step="All set" title={`See you on the dance floor, ${guest.name.split(" ")[0]}!`}>
    <p className="mt-3 leading-7 text-[#725e4b]">Thank you. Your booking details for {guest.ticketCount} ticket{guest.ticketCount === 1 ? "" : "s"} have been shared with the organising team.</p>
    <EventDetails />
    <p role="status" className="mt-4 text-sm leading-6 text-[#725e4b]">{guest.emailed ? <>A confirmation has been emailed to <strong>{guest.email}</strong>.</> : "Please keep your Humanitix confirmation email handy."} Please bring your Humanitix ticket, on your phone or printed, for entry.</p>
    <Link href={durgaPuja.path} className={`${secondary} mt-6`}>Explore the full Durga Puja programme</Link>
  </StepQuestion>;

  if (step === "buy") return <StepQuestion step="Step 2 of 2" title="Would you like to book your Dandiya tickets now?">
    <EventDetails />
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <a href={durgaPuja.dandiyaUrl} target="_blank" rel="noopener noreferrer" className={primary} onClick={() => setStep("bought")}>Yes, book on Humanitix <span aria-hidden="true" className="ml-1">↗</span></a>
      <button type="button" className={secondary} onClick={() => setStep("later")}>Not right now</button>
    </div>
    <button type="button" className={back} onClick={() => setStep("booked")}>← Back</button>
  </StepQuestion>;

  if (step === "bought") return <StepQuestion step="Booking" title="Humanitix has opened in a new tab.">
    <p className="mt-3 leading-7 text-[#725e4b]">Complete your booking there. Your tickets will be emailed to you by Humanitix. If the page did not open, <a href={durgaPuja.dandiyaUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#761c25] underline">book Dandiya tickets here ↗</a>.</p>
    <p className="mt-4 leading-7 text-[#725e4b]">Once you have booked, you can share your booking details with the team.</p>
    <button type="button" className={`${primary} mt-6`} onClick={() => setStep("details")}>I have booked, share my details</button>
  </StepQuestion>;

  return <StepQuestion step="No problem" title="We would love to see you there.">
    <p className="mt-3 leading-7 text-[#725e4b]">Dandiya Utsav is a ticketed event, so a ticket is needed for entry. Tickets are available on Humanitix whenever you are ready. Please come back and book before the evening.</p>
    <EventDetails />
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <a href={durgaPuja.dandiyaUrl} target="_blank" rel="noopener noreferrer" className={primary}>Book Dandiya tickets <span aria-hidden="true" className="ml-1">↗</span></a>
      <Link href={durgaPuja.path} className={secondary}>See the Durga Puja programme</Link>
    </div>
    <p className="mt-6 rounded-lg bg-[#fff9ec] p-4 text-sm leading-6 text-[#725e4b]">The Puja, Aarti and Prasad across all three days are open to everyone. Come and seek the blessings of Maa Bhagwati with your family.</p>
    <button type="button" className={back} onClick={() => setStep("booked")}>← Start again</button>
  </StepQuestion>;
}

function EventDetails() {
  return <dl className="mt-5 grid gap-3 rounded-lg border border-[#c5953d]/40 bg-[#fff9ec] p-4 text-sm sm:grid-cols-2">
    <div><dt className="text-xs font-bold uppercase tracking-[0.12em] text-[#9b6430]">When</dt><dd className="mt-1">{session.date} · {session.time}</dd></div>
    <div><dt className="text-xs font-bold uppercase tracking-[0.12em] text-[#9b6430]">Where</dt><dd className="mt-1">{durgaPuja.venue}, {durgaPuja.address}</dd></div>
  </dl>;
}
