import { EventEditor } from "@/components/admin/EventEditor";
import { PageLayout } from "@/components/layout/PageLayout";
import { getManagedEvents } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await getManagedEvents({ includeDrafts: true });

  return (
    <PageLayout
      title="Events"
      description="Create, publish and edit official event listings. Published events appear on the public Events page."
      className="px-0 py-0"
    >
      <EventEditor events={events} />
    </PageLayout>
  );
}
