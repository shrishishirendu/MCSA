import { EventManagementWorkspace } from "@/components/events/EventManagementWorkspace";
import { ManagedEventGrid } from "@/components/events/ManagedEventGrid";
import { PageLayout } from "@/components/layout/PageLayout";
import { EventAnnouncementsStrip } from "@/components/sections/EventAnnouncementsStrip";
import { Button } from "@/components/ui/Button";
import { getManagedEvents, getPublicAnnouncements } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const [events, announcements] = await Promise.all([
    getManagedEvents(),
    getPublicAnnouncements()
  ]);

  return (
    <PageLayout
      title="Events"
      eyebrow="Celebrate, connect, and create memories"
      description="Our events are the heartbeat of our society. From grand annual festivals like Mithila Mahotsav to intimate workshops and family picnics, there is always something happening."
    >
      <section className="mb-10 rounded-2xl bg-gradient-to-r from-indigoInk to-lotus-700 p-6 text-white sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-turmeric">
          Featured event · 17–19 October 2026
        </p>
        <h2 className="mt-3 text-3xl font-bold">Mithila Mahotsav 2026</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
          Explore the complete three-day program and submit an Expression of
          Interest for cultural performances, stalls, volunteering, sponsorship
          and more.
        </p>
        <Button href="/events/mithila-mahotsav-2026" className="mt-5">
          Explore MM2026
        </Button>
      </section>

      <ManagedEventGrid events={events} />
      <EventManagementWorkspace hideOfficialEvents={events.length > 0} />
      <EventAnnouncementsStrip announcements={announcements} />
    </PageLayout>
  );
}
