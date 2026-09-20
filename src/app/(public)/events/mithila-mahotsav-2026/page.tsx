import type { Metadata } from "next";
import { MahotsavEoiForm } from "@/components/events/MahotsavEoiForm";
import { Button } from "@/components/ui/Button";
import { DurgaPujaFeature } from "@/components/sections/DurgaPujaFeature";

export const metadata: Metadata = {
  title: "Mithila Mahotsav 2026 ? Participation",
  description: "Get involved in Mithila Mahotsav 2026 and explore the complete Durga Puja festival guide."
};

export default function MithilaMahotsavPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-indigoInk">Mithila Mahotsav 2026</h1>
      <DurgaPujaFeature />
      <section id="expression-of-interest" className="mx-auto max-w-5xl scroll-mt-8 py-14">
        <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">Participation enquiries</p>
        <h2 className="mt-3 text-3xl font-bold text-indigoInk">Be part of the celebration</h2>
        <p className="mt-3 leading-7 text-indigoInk/70">For current performance, volunteer and community opportunities, contact the organising team. Programme information, Seva, donations and event links are on our Durga Puja 2026 page.</p>
        <Button href="/contact" className="mt-5">Contact the organising team</Button>
        <details className="mt-8 rounded-xl border border-indigoInk/15 bg-white p-5">
          <summary className="cursor-pointer font-semibold text-indigoInk">Expression of Interest form</summary>
          <p className="my-5 text-sm leading-6 text-indigoInk/70">If the team has asked you to submit your details, use this form. Submitting an enquiry does not confirm a place in the programme.</p>
          <MahotsavEoiForm />
        </details>
      </section>
    </main>
  );
}
