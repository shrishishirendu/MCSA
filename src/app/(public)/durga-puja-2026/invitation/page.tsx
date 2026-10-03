import type { Metadata } from "next";
import Link from "next/link";
import { InvitationLetterFlow } from "@/components/events/InvitationLetterFlow";
import { durgaPuja } from "@/data/durga-puja-2026";

export const metadata: Metadata = {
  title: "Durga Puja 2026 · Your invitation letter",
  description: "Download your personal invitation letter to Durga Puja 2026 in Sydney, 17–19 October, with the full three-day programme."
};

export default function InvitationLetterPage() {
  return <main className="bg-[#fff9ec] px-4 py-10 text-[#342820] sm:px-6 sm:py-14">
    <div className="mx-auto max-w-3xl">
      <Link href={durgaPuja.path} className="text-sm font-semibold text-[#761c25] underline underline-offset-4">← Back to Durga Puja 2026</Link>
      <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-[#9b6430]">{durgaPuja.dates} · Quakers Hill, Sydney</p>
      <h1 className="mt-3 font-serif text-4xl text-[#761c25]">Your invitation to Durga Puja 2026.</h1>
      <p className="mt-4 leading-7 text-[#725e4b]">Answer a few quick questions to receive a personal invitation letter with the full programme. Share it with your family and plan your visit.</p>
      <div className="mt-8 rounded-xl border border-[#c5953d]/40 bg-white p-5 sm:p-8"><InvitationLetterFlow /></div>
      <p className="mt-7 text-xs leading-6 text-[#725e4b]">The invitation letter is not an entry ticket or proof of payment. Ticketed events and Seva packages are booked separately.</p>
    </div>
  </main>;
}
