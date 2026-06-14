import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageLayout } from "@/components/layout/PageLayout";

export default function DonatePage() {
  return (
    <PageLayout
      title="Donate"
      eyebrow="Moved into one simple page"
      description="Donation is now part of the Membership & Donations page so members and supporters have one clear place to join, renew or contribute."
    >
      <Card className="max-w-2xl">
        <h2 className="text-xl font-bold text-indigoInk">Support the society</h2>
        <p className="mt-3 text-sm leading-6 text-indigoInk/70">
          Use the combined page for donations, annual membership, renewals and
          lifetime membership.
        </p>
        <Button href="/membership" className="mt-5">
          Go to Membership & Donations
        </Button>
      </Card>
    </PageLayout>
  );
}
