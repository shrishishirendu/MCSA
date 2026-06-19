import { EventManagementWorkspace } from "@/components/events/EventManagementWorkspace";
import { ManagedEventGrid } from "@/components/events/ManagedEventGrid";
import { PageLayout } from "@/components/layout/PageLayout";
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
      <ManagedEventGrid events={events} />
      <EventManagementWorkspace />
    </PageLayout>
  );
}
