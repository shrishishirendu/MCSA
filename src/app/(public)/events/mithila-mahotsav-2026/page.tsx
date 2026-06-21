import Image from "next/image";
import { MahotsavEoiForm } from "@/components/events/MahotsavEoiForm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const days = [
  {
    date: "Saturday, 17 October 2026",
    theme: "The Beginning — Devotion Awakens",
    items: ["Durga Idol Sthapna", "Maha-Shashthi Puja", "Bhog", "Community Darshan (open to public)", "Grand Mithila Cultural Programs — Mithila Mahotsav 2026", "Mata Ka Jagrata"],
    note: "The spiritual foundation begins in the morning and transforms into an evening celebration of Mithila through dance, music and storytelling."
  },
  {
    date: "Sunday, 18 October 2026",
    theme: "The Peak — Power, Purity & Participation",
    items: ["Maha-Saptami and Ashtami Puja", "Bhog", "Kanya Pujan", "Open cultural slots for other communities (ticketed)", "Dandiya and Garba"],
    note: "The most powerful spiritual day expands into an inclusive cultural platform for communities, artists, audiences and sponsors."
  },
  {
    date: "Monday, 19 October 2026",
    theme: "The Culmination — Gratitude & Closure",
    items: ["Maha-Navami Puja", "Bhog", "Visarjan", "Conclusion of Mithila Mahotsav"],
    note: "A deeply emotional conclusion where devotion completes its cycle and the community promises to return stronger every year."
  }
];

export default function MithilaMahotsavPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-indigoInk via-indigoInk to-lotus-700 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-turmeric">17–19 October 2026 · Quakers Hill Community Hall, Sydney</p>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Mithila Mahotsav 2026</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">A three-day immersive experience dedicated to the soul of Mithila — dedicated to Mithila, Maithili and Maithils.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Button href="#expression-of-interest">Expression of Interest</Button><Button href="https://events.humanitix.com/durga-puja/tickets" variant="secondary" className="border-white/30 bg-white/10 text-white hover:text-white">Become Our Yajmaan</Button></div>
            <p className="mt-4 text-sm font-semibold text-turmeric">EOI closes 20 July 2026</p>
          </div>
          <Image src="/images/mahotsav-invitation-card.png" alt="Mithila Mahotsav 2026 invitation" width={1104} height={579} className="rounded-xl shadow-2xl" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl"><p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">Three-day program</p><h2 className="mt-3 text-3xl font-bold text-indigoInk">Devotion, culture and participation</h2></div>
        <div className="grid gap-5 lg:grid-cols-3">{days.map((day, index) => <Card key={day.date}><span className="grid size-10 place-items-center rounded-full bg-lotus-500 font-bold text-white">{index + 1}</span><p className="mt-5 text-sm font-semibold text-lotus-700">{day.date}</p><h3 className="mt-2 text-xl font-bold text-indigoInk">{day.theme}</h3><ul className="mt-4 grid gap-2 text-sm text-indigoInk/75">{day.items.map(item => <li key={item}>• {item}</li>)}</ul><p className="mt-5 text-sm leading-6 text-indigoInk/65">{day.note}</p></Card>)}</div>
      </section>

      <section className="bg-lotus-50/70"><div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="grid gap-6 lg:grid-cols-3"><Card><h2 className="text-xl font-bold text-indigoInk">1. Submit your EOI</h2><p className="mt-3 text-sm leading-6 text-indigoInk/70">Choose multiple cultural, volunteer, stall, sponsorship or media contribution options.</p></Card><Card><h2 className="text-xl font-bold text-indigoInk">2. Committee review</h2><p className="mt-3 text-sm leading-6 text-indigoInk/70">The Core Committee reviews suitability, timing, requirements and available program slots.</p></Card><Card><h2 className="text-xl font-bold text-indigoInk">3. Confirmation</h2><p className="mt-3 text-sm leading-6 text-indigoInk/70">Approved participants are contacted with schedule, rehearsal and coordination details.</p></Card></div></div></section>

      <section id="expression-of-interest" className="mx-auto max-w-5xl scroll-mt-8 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8"><p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">Participate in MM2026</p><h2 className="mt-3 text-3xl font-bold text-indigoInk">Expression of Interest</h2><p className="mt-3 text-indigoInk/70">Multiple selections are welcome. One submission per participant or group.</p></div>
        <MahotsavEoiForm />
      </section>
    </main>
  );
}
