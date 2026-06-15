import { EventManagementWorkspace } from "@/components/events/EventManagementWorkspace";
import { PageLayout } from "@/components/layout/PageLayout";

export default function EventsPage() {
  return (
    <PageLayout
      title="Events"
      eyebrow="Event management"
      description="Create events, manage city groups, invite members, prepare event payments, track attendees and keep final approval with admin."
    >
      <EventManagementWorkspace />
    </PageLayout>
  );
}
