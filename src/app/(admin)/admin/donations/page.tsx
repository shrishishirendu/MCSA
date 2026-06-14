import { donations } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function AdminDonationsPage() {
  return (
    <PageLayout title="Donations" description="Admin donation tracking and reconciliation foundation." className="px-0 py-0">
      <FeatureGrid
        features={donations.map((donation) => ({
          title: donation.donorName,
          description: `AUD ${donation.amountAud}`,
          meta: donation.receivedAt
        }))}
      />
    </PageLayout>
  );
}
