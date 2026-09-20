import { EventManagementWorkspace } from "@/components/events/EventManagementWorkspace";
import { ManagedEventGrid } from "@/components/events/ManagedEventGrid";
import { PageLayout } from "@/components/layout/PageLayout";
import { EventAnnouncementsStrip } from "@/components/sections/EventAnnouncementsStrip";
import { DurgaPujaFeature } from "@/components/sections/DurgaPujaFeature";
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
      <div className="mb-10"><DurgaPujaFeature /></div>

      <ManagedEventGrid events={events} />
      <EventManagementWorkspace hideOfficialEvents={events.length > 0} />
      <EventAnnouncementsStrip announcements={announcements} />
    </PageLayout>
  );
}
