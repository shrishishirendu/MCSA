import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function AdminReportsPage() {
  return (
    <PageLayout title="Reports" description="Reporting foundation for membership, events, donations and content performance." className="px-0 py-0">
      <FeatureGrid
        features={[
          {
            title: "Membership reports",
            description: "Future active, pending, expired and renewal reporting."
          },
          {
            title: "Event reports",
            description: "Future attendance, ticket revenue and event engagement reporting."
          },
          {
            title: "Donation reports",
            description: "Future donation totals, donor summaries and reconciliation exports."
          }
        ]}
      />
    </PageLayout>
  );
}
