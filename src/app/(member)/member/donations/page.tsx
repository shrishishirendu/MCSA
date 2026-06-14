import { donations } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function MyDonationsPage() {
  return (
    <PageLayout
      title="My donations"
      description="A member donation history foundation for future Stripe receipts and tax documentation."
      className="px-0 py-0"
    >
      <FeatureGrid
        features={donations.map((donation) => ({
          title: donation.donorName,
          description: `AUD ${donation.amountAud} placeholder donation record.`,
          meta: donation.receivedAt
        }))}
      />
    </PageLayout>
  );
}
