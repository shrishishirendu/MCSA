import Image from "next/image";
import Link from "next/link";
import { durgaPuja } from "@/data/durga-puja-2026";

export function DurgaPujaFeature() {
  return <section aria-labelledby="durga-feature-title" className="overflow-hidden rounded-xl border border-[#c5953d]/60 bg-[#761c25] text-[#fff5dc]">
    <div className="grid sm:grid-cols-[1fr_0.6fr]">
      <div className="p-6 sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#f0cb85]">{durgaPuja.dates} · Quakers Hill, Sydney</p>
        <h2 id="durga-feature-title" className="mt-3 font-serif text-3xl sm:text-4xl">Durga Puja 2026</h2>
        <p className="mt-2 font-serif text-lg italic">Mithila welcomes Mahashakti.</p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#f4dfd2]">Your guide to Puja, Mithila Mahotsav, Mata ki Chowki, Dandiya, Seva and everything happening across the celebration.</p>
        <Link href={durgaPuja.path} className="mt-5 inline-flex min-h-12 items-center rounded-md bg-[#f6dfab] px-5 py-3 text-sm font-bold text-[#611922] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explore the festival & programme →</Link>
      </div>
      <div className="relative hidden sm:block"><Image src="/images/durga-puja-2026/family-devotion.webp" alt="A family celebrating Maa Durga together" fill sizes="(max-width: 640px) 1px, 450px" className="object-cover" /></div>
    </div>
  </section>;
}
