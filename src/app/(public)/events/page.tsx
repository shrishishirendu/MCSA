import { EventManagementWorkspace } from "@/components/events/EventManagementWorkspace";
import { ManagedEventGrid } from "@/components/events/ManagedEventGrid";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { getManagedEvents } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getManagedEvents();
  return (
    <PageLayout
      title="Events"
      eyebrow="Official event hub"
      description="Find approved MCSA events and register through the selected event platform. City groups can manage ticketing externally while MCSA keeps final publishing control."
    >
      <section className="mb-10 rounded-2xl bg-gradient-to-r from-indigoInk to-lotus-700 p-6 text-white sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-turmeric">Featured event · 17–19 October 2026</p>
        <h2 className="mt-3 text-3xl font-bold">Mithila Mahotsav 2026</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">Explore the complete three-day program and submit an Expression of Interest for cultural performances, stalls, volunteering, sponsorship and more.</p>
        <Button href="/events/mithila-mahotsav-2026" className="mt-5">Explore MM2026</Button>
      </section>
      <ManagedEventGrid events={events} />
      <EventManagementWorkspace hideOfficialEvents={events.length > 0} />
    </PageLayout>
  );
}
