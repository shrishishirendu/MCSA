"use client";

import { useState, type FormEvent } from "react";
import { durgaPuja, ritualActivities, type RitualActivity } from "@/data/durga-puja-2026";
import { FieldGroup, Label, TextInput, TextArea } from "@/components/ui/Form";
import { readJsonResponse } from "@/lib/response";

export function RitualInterestForm({ initialActivity }: { initialActivity: RitualActivity }) {
  const [activity, setActivity] = useState<RitualActivity>(initialActivity);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const [fallback, setFallback] = useState("");
  const isKanya = activity === "kanya-pujan";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const comment = [
      `Durga Puja 2026 - ${ritualActivities[activity].name} participation interest`,
      "Sunday 18 October 2026 - Quakers Hill Community Centre",
      isKanya ? "Submitted by the parent or guardian." : "Submitted by the participant.",
      ...(isKanya ? [`Number of girls participating: ${data.get("childrenCount")}`] : []),
      "The sender agrees to be contacted to arrange participation.",
      "This is an expression of interest, not a confirmed reservation.",
      "", "Message:", String(data.get("message") ?? "").trim() || "No additional message."
    ].join("\n");
    setFallback(`mailto:${durgaPuja.email}?subject=${encodeURIComponent(`${ritualActivities[activity].name} - participation interest`)}&body=${encodeURIComponent(`${comment}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`)}`);
    setSubmitting(true);
    setStatus("");
    setError(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, comment })
      });
      const result = await readJsonResponse<{ ok?: boolean }>(response);
      if (!response.ok || !result.ok) throw new Error("Interest was not delivered.");
      setSent(true);
      setStatus(`Thank you. Your interest in ${ritualActivities[activity].name} has been sent to the MCSA team. The organisers will contact you to confirm arrangements.`);
    } catch {
      setError(true);
      setStatus("Your interest could not be sent. Your details are still here. Please try again or use the email link below to send them to the team.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) return <div role="status" className="mt-6 rounded-xl border border-[#c5953d]/40 bg-[#fff9ec] p-6 text-[#342820]"><h2 className="font-serif text-2xl text-[#761c25]">Thank you for being part of the celebration.</h2><p className="mt-4 leading-7">{status}</p><p className="mt-3 text-sm leading-6">This is an expression of interest. Participation is confirmed by the organising team.</p></div>;

  return (
    <form onSubmit={submit} className="mt-6 grid gap-5" aria-label="Activity participation interest">
      <fieldset disabled={submitting} className="grid min-w-0 gap-5 disabled:opacity-70">
        <FieldGroup>
          <Label htmlFor="ritual-activity">Activity</Label>
          <select id="ritual-activity" name="activity" value={activity} onChange={event => { setActivity(event.target.value as RitualActivity); setStatus(""); setError(false); setFallback(""); }} className="min-h-12 w-full rounded-md border border-indigoInk/15 bg-white px-3 text-sm">
            {Object.entries(ritualActivities).map(([key, details]) => <option key={key} value={key}>{details.name}</option>)}
          </select>
        </FieldGroup>
        <p className="rounded-md bg-[#fff9ec] p-4 text-sm leading-6 text-[#725e4b]">{isKanya ? "Please submit as the parent or guardian. Use your own contact details; child names, birth dates and photographs are not needed for this expression of interest." : "Share your contact details and the organising team will be in touch about taking part in Khoichha."}</p>
        <FieldGroup><Label htmlFor="ritual-name">{isKanya ? "Parent / guardian name" : "Your name"} *</Label><TextInput id="ritual-name" name="name" autoComplete="name" maxLength={120} required /></FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldGroup><Label htmlFor="ritual-email">{isKanya ? "Parent / guardian email" : "Email"} *</Label><TextInput id="ritual-email" name="email" type="email" autoComplete="email" maxLength={254} required /></FieldGroup>
          <FieldGroup><Label htmlFor="ritual-phone">{isKanya ? "Parent / guardian phone" : "Phone"} *</Label><TextInput id="ritual-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} required /></FieldGroup>
        </div>
        {isKanya && <FieldGroup><Label htmlFor="ritual-children">Number of girls you would like to participate *</Label><TextInput id="ritual-children" name="childrenCount" type="number" min={1} step={1} defaultValue={1} required /></FieldGroup>}
        <FieldGroup><Label htmlFor="ritual-message">Question or message (optional)</Label><TextArea id="ritual-message" name="message" maxLength={1500} placeholder="Let the organisers know what you would like to ask about participation." /></FieldGroup>
        <label className="flex items-start gap-3 text-sm leading-6"><input key={activity} name="consent" type="checkbox" required className="mt-1 size-4 shrink-0" /><span>{isKanya ? "I am the parent or guardian of the girl(s) I am submitting for, and agree to be contacted by MCSA about participation." : "I agree to be contacted by MCSA about my participation in Khoichha."}</span></label>
        <button type="submit" className="min-h-12 rounded-md bg-[#761c25] px-5 py-3 text-sm font-bold text-white hover:bg-[#55141d] disabled:opacity-60">{submitting ? "Sending interest..." : "Send expression of interest"}</button>
      </fieldset>
      {status && <div role={error ? "alert" : "status"} className="rounded-md border border-[#c5953d]/50 bg-[#fff9ec] p-4 text-sm leading-6"><p>{status}</p>{error && <a href={fallback} className="mt-3 inline-block font-semibold text-[#761c25] underline">Send these details by email instead</a>}</div>}
      <p className="text-xs leading-6 text-indigoInk/65">The organising team receives your enquiry by email and will confirm the next steps. This form does not book a ticket or guarantee a place.</p>
    </form>
  );
}
