import { EventManagementWorkspace } from "@/components/events/EventManagementWorkspace";
import { PageLayout } from "@/components/layout/PageLayout";

export default function EventsPage() {
  return (
    <PageLayout
      title="Events"
      eyebrow="Official event hub"
      description="Find approved MCSA events and register through the selected event platform. City groups can manage ticketing externally while MCSA keeps final publishing control."
    >
      <EventManagementWorkspace />
    </PageLayout>
  );
}
