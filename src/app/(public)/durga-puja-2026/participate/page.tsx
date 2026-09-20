import type { Metadata } from "next";
import Link from "next/link";
import { RitualInterestForm } from "@/components/events/RitualInterestForm";
import { durgaPuja, ritualActivities, type RitualActivity } from "@/data/durga-puja-2026";

export const metadata: Metadata = {
  title: "Khoichha & Kanya Pujan · Participation interest",
  description: "Express interest in Mithila Khoichha or submit a parent or guardian enquiry for Kanya Pujan at Durga Puja 2026 in Sydney."
};

export default function RitualParticipationPage({ searchParams }: { searchParams: { activity?: string | string[] } }) {
  const activity: RitualActivity = searchParams.activity === "kanya-pujan" ? "kanya-pujan" : "khoichha";
  return <main className="bg-[#fff9ec] px-4 py-10 text-[#342820] sm:px-6 sm:py-14">
    <div className="mx-auto max-w-3xl">
      <Link href={`${durgaPuja.path}#celebrations`} className="text-sm font-semibold text-[#761c25] underline underline-offset-4">← Back to Durga Puja 2026</Link>
      <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-[#9b6430]">Sunday 18 October · Quakers Hill, Sydney</p>
      <h1 className="mt-3 font-serif text-4xl text-[#761c25]">Be part of our sacred traditions.</h1>
      <p className="mt-4 leading-7 text-[#725e4b]">Ladies can express interest in {ritualActivities.khoichha.name}. Parents and guardians can submit an enquiry for their girls to take part in Kanya Pujan.</p>
      <div className="mt-8 rounded-xl border border-[#c5953d]/40 bg-white p-5 sm:p-8"><h2 className="font-serif text-2xl text-[#761c25]">Expression of interest</h2><RitualInterestForm key={activity} initialActivity={activity} /></div>
      <div className="mt-7 text-sm leading-7"><p>Need help? Contact the organising team.</p><a href={`mailto:${durgaPuja.email}`} className="break-words font-semibold text-[#761c25] underline">{durgaPuja.email}</a><ul className="mt-2">{durgaPuja.contacts.map(contact => <li key={contact.href}><a href={contact.href} className="font-semibold text-[#761c25] underline">{contact.name}: {contact.phone}</a></li>)}</ul></div>
    </div>
  </main>;
}
