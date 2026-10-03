import type { Metadata } from "next";
import Link from "next/link";
import { DandiyaBookingFlow } from "@/components/events/DandiyaBookingFlow";
import { dandiyaSession, durgaPuja } from "@/data/durga-puja-2026";

export const metadata: Metadata = {
  title: "Dandiya Utsav 2026 · Tickets & bookings",
  description: "Book Dandiya Utsav tickets or share your booking details for Durga Puja 2026 in Quakers Hill, Sydney."
};

export default function DandiyaPage() {
  const session = dandiyaSession();
  return <main className="bg-[#fff9ec] px-4 py-10 text-[#342820] sm:px-6 sm:py-14">
    <div className="mx-auto max-w-3xl">
      <Link href={`${durgaPuja.path}#celebrations`} className="text-sm font-semibold text-[#761c25] underline underline-offset-4">← Back to Durga Puja 2026</Link>
      <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-[#9b6430]">{session.date} · {session.time} · Quakers Hill, Sydney</p>
      <h1 className="mt-3 font-serif text-4xl text-[#761c25]">Dandiya Utsav 2026</h1>
      <p className="mt-4 leading-7 text-[#725e4b]">An evening of folk dance, music and celebration with family and friends. Tell us whether you have booked, and we will help with the rest.</p>
      <div className="mt-8 rounded-xl border border-[#c5953d]/40 bg-white p-5 sm:p-8"><DandiyaBookingFlow /></div>
      <div className="mt-7 text-sm leading-7"><p>Questions about your booking? Contact the organising team.</p><a href={`mailto:${durgaPuja.email}?subject=${encodeURIComponent("Dandiya 2026 enquiry")}`} className="break-words font-semibold text-[#761c25] underline">{durgaPuja.email}</a></div>
    </div>
  </main>;
}
