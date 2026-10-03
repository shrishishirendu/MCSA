"use client";

import { useEffect, useState, type FormEvent } from "react";
import { durgaPuja } from "@/data/durga-puja-2026";
import { FieldGroup, Label, TextInput } from "@/components/ui/Form";
import { StepQuestion, stepButton } from "@/components/events/StepQuestion";
import { readJsonResponse } from "@/lib/response";

type Step = "paid" | "paid-thanks" | "details" | "contribute" | "letter";
type PaidStatus = "paid" | "not_paid";
type Guest = { name: string; email: string; phone: string };
type Letter = { reference: string; fileName: string; url: string; emailed: boolean };

const { primary, secondary, back: backLink } = stepButton;
const Question = StepQuestion;

export function InvitationLetterFlow() {
  const [step, setStep] = useState<Step>("paid");
  const [paidStatus, setPaidStatus] = useState<PaidStatus>("not_paid");
  const [guest, setGuest] = useState<Guest>({ name: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [wantsToContribute, setWantsToContribute] = useState<boolean | null>(null);
  const [letter, setLetter] = useState<Letter | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => () => { if (letter) URL.revokeObjectURL(letter.url); }, [letter]);

  async function generate(contribute: boolean | null) {
    setWantsToContribute(contribute);
    setStep("letter");
    setGenerating(true);
    setError("");
    try {
      const response = await fetch("/api/durga-puja-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...guest, consent, paidStatus, wantsToContribute: contribute })
      });
      const result = await readJsonResponse<{ ok?: boolean; reference: string; fileName: string; pdf: string; emailed: boolean }>(response);
      if (!response.ok || !result.ok) {
        setError(result.error ?? "Your invitation letter could not be prepared.");
        if (response.status === 400) setStep("details");
        return;
      }
      const bytes = Uint8Array.from(atob(result.pdf), character => character.charCodeAt(0));
      const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
      setLetter({ reference: result.reference, fileName: result.fileName, url, emailed: result.emailed });
    } catch {
      setError("Your invitation letter could not be prepared. Please check your connection and try again.");
    } finally {
      setGenerating(false);
    }
  }

  function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (paidStatus === "paid") void generate(null);
    else setStep("contribute");
  }

  function restart() {
    setLetter(null);
    setGuest({ name: "", email: "", phone: "" });
    setConsent(false);
    setWantsToContribute(null);
    setError("");
    setStep("paid");
  }

  if (step === "paid") return <Question step="Step 1 of 4" title="Have you already paid for Durga Puja 2026?">
    <p className="mt-3 leading-7 text-[#725e4b]">For example, a Seva package, an event ticket or a GoFundMe donation.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <button type="button" className={secondary} onClick={() => { setPaidStatus("paid"); setStep("paid-thanks"); }}>Yes, I have paid</button>
      <button type="button" className={primary} onClick={() => { setPaidStatus("not_paid"); setStep("details"); }}>No, not yet</button>
    </div>
  </Question>;

  if (step === "paid-thanks") return <Question step="Thank you" title="Thank you for supporting the celebration.">
    <p className="mt-3 leading-7 text-[#725e4b]">For any questions about your booking or contribution, please get in touch with the organising team:</p>
    <a href={`mailto:${durgaPuja.email}?subject=${encodeURIComponent("Durga Puja 2026 – payment enquiry")}`} className="mt-3 inline-block break-words text-lg font-semibold text-[#761c25] underline">{durgaPuja.email}</a>
    <div className="mt-6 rounded-lg bg-[#fff9ec] p-4">
      <p className="text-sm leading-6 text-[#725e4b]">Would you also like a personal invitation letter with the full programme?</p>
      <button type="button" className={`${primary} mt-4`} onClick={() => setStep("details")}>Get my invitation letter</button>
    </div>
    <button type="button" className={backLink} onClick={() => setStep("paid")}>← Back</button>
  </Question>;

  if (step === "details") return <Question step="Step 2 of 4" title="Your details">
    <p className="mt-3 leading-7 text-[#725e4b]">Your name appears on the invitation letter, and we will email you a copy.</p>
    <form onSubmit={submitDetails} className="mt-6 grid gap-5">
      <FieldGroup><Label htmlFor="invite-name">Full name (in English) *</Label><TextInput id="invite-name" autoComplete="name" maxLength={80} required value={guest.name} onChange={event => setGuest({ ...guest, name: event.target.value })} /></FieldGroup>
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldGroup><Label htmlFor="invite-email">Email *</Label><TextInput id="invite-email" type="email" autoComplete="email" maxLength={254} required value={guest.email} onChange={event => setGuest({ ...guest, email: event.target.value })} /></FieldGroup>
        <FieldGroup><Label htmlFor="invite-phone">Phone *</Label><TextInput id="invite-phone" type="tel" autoComplete="tel" maxLength={20} required value={guest.phone} onChange={event => setGuest({ ...guest, phone: event.target.value })} /></FieldGroup>
      </div>
      <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" required checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-1 size-4 shrink-0" /><span>I agree to Mithila Cultural Society Australia keeping these details and contacting me about Durga Puja 2026.</span></label>
      {error && <p role="alert" className="rounded-md border border-[#c5953d]/50 bg-[#fff9ec] p-4 text-sm leading-6">{error}</p>}
      <button type="submit" className={primary}>Continue</button>
    </form>
    <button type="button" className={backLink} onClick={() => setStep(paidStatus === "paid" ? "paid-thanks" : "paid")}>← Back</button>
  </Question>;

  if (step === "contribute") return <Question step="Step 3 of 4" title="Would you like to contribute to Maa Bhagwati now?">
    <p className="mt-3 leading-7 text-[#725e4b]">Your offering supports the Puja, Bhog, venue and community arrangements. Your invitation letter will be ready either way.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <a href={durgaPuja.donationUrl} target="_blank" rel="noopener noreferrer" className={primary} onClick={() => void generate(true)}>Yes, contribute via GoFundMe <span aria-hidden="true" className="ml-1">↗</span></a>
      <button type="button" className={secondary} onClick={() => void generate(false)}>Not now, show my letter</button>
    </div>
    <button type="button" className={backLink} onClick={() => setStep("details")}>← Back</button>
  </Question>;

  return <Question step={paidStatus === "paid" ? "Your invitation" : "Step 4 of 4"} title={generating ? "Preparing your invitation letter…" : letter ? `Your invitation is ready, ${guest.name.split(" ")[0]}.` : "Something went wrong"}>
    {generating && <p role="status" className="mt-3 leading-7 text-[#725e4b]">This only takes a moment.</p>}
    {!generating && error && <div role="alert" className="mt-4 rounded-md border border-[#c5953d]/50 bg-[#fff9ec] p-4 text-sm leading-6">
      <p>{error}</p>
      <button type="button" className={`${primary} mt-4`} onClick={() => void generate(wantsToContribute)}>Try again</button>
    </div>}
    {!generating && letter && <>
      {wantsToContribute && <p className="mt-3 leading-7 text-[#725e4b]">Thank you for choosing to contribute to Maa Bhagwati. GoFundMe has opened in a new tab. If it did not, <a href={durgaPuja.donationUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#761c25] underline">open GoFundMe here ↗</a>.</p>}
      <a href={letter.url} download={letter.fileName} className={`${primary} mt-6 w-full sm:w-auto`}>Download invitation letter (PDF) <span aria-hidden="true" className="ml-1">↓</span></a>
      <p role="status" className="mt-4 text-sm leading-6 text-[#725e4b]">{letter.emailed ? <>A copy has also been emailed to <strong>{guest.email}</strong>. Please check your spam folder if you cannot see it.</> : "We could not email a copy right now, so please download your letter here."}</p>
      <p className="mt-2 text-xs text-[#725e4b]">Reference: {letter.reference}</p>
      {wantsToContribute === false && <div className="mt-6 rounded-lg bg-[#fff9ec] p-4 text-sm leading-6">
        <p>Whenever you are ready, you can contribute to Maa Bhagwati or explore Seva packages.</p>
        <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1"><a href={durgaPuja.donationUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#761c25] underline">Donate via GoFundMe ↗</a><a href={durgaPuja.sevaUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#761c25] underline">View Seva packages ↗</a></p>
      </div>}
      <button type="button" className={backLink} onClick={restart}>Get a letter for someone else</button>
    </>}
  </Question>;
}
