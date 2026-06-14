import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function AdminTicketsPage() {
  return (
    <PageLayout title="Tickets" description="Admin ticket inventory, orders and attendee check-in foundation." className="px-0 py-0">
      <FeatureGrid
        features={[
          {
            title: "Ticket types",
            description: "Future ticket tiers, capacities, pricing and availability controls."
          },
          {
            title: "Orders",
            description: "Future order records from Stripe checkout and manual admin actions."
          },
          {
            title: "Check-in",
            description: "Future attendee lists and QR code verification."
          }
        ]}
      />
    </PageLayout>
  );
}
