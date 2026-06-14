import { featuredEvents } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function MyTicketsPage() {
  return (
    <PageLayout
      title="My tickets"
      description="A member ticket area ready for future event registrations, QR codes and Stripe payment records."
      className="px-0 py-0"
    >
      <FeatureGrid
        features={featuredEvents.map((event) => ({
          title: event.title,
          description: `Placeholder ticket record for ${event.location}.`,
          meta: event.date
        }))}
      />
    </PageLayout>
  );
}
