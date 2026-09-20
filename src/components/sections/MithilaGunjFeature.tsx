import Link from "next/link";
import { MithilaGunjImage } from "@/components/sections/MithilaGunjImage";

export function MithilaGunjFeature() {
  return (
    <section aria-labelledby="home-radio-heading" className="mt-6 grid gap-7 rounded-2xl bg-indigoInk p-6 text-white sm:p-8 md:grid-cols-[1fr_1.3fr] md:items-center">
      <MithilaGunjImage />
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-turmeric">Our weekly Maithili radio program</p>
        <h2 id="home-radio-heading" className="mt-3 text-3xl font-bold">Mithila Gunj</h2>
        <p className="mt-3 text-lg text-turmeric">Appan Bhasha. Appan Sanskriti. Appan Awaaz.</p>
        <p className="mt-4 leading-7 text-white/85">Connecting the Mithila diaspora through language, music, stories and culture. Presented by Shishirendu Jha.</p>
        <p className="mt-4 font-semibold">Every Sunday · 8–9 am Sydney time · 2TripleO 98.5 FM</p>
        <Link href="/mithila-gunj" className="mt-6 inline-flex rounded-full bg-turmeric px-6 py-3 font-bold text-indigoInk hover:bg-white">Discover &amp; listen</Link>
      </div>
    </section>
  );
}
