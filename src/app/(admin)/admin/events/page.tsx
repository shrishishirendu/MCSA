import { featuredEvents } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function AdminEventsPage() {
  return (
    <PageLayout title="Events" description="Admin event creation and publishing foundation." className="px-0 py-0">
      <FeatureGrid
        features={featuredEvents.map((event) => ({
          title: event.title,
          description: event.location,
          meta: `${event.date} · ${event.status}`
        }))}
      />
    </PageLayout>
  );
}
