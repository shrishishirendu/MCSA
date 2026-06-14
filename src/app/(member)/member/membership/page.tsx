import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/Card";

export default function MyMembershipPage() {
  return (
    <PageLayout
      title="My membership"
      description="Membership tier, renewal status, payment history and receipts will be attached here in a future phase."
      className="px-0 py-0"
    >
      <Card className="max-w-2xl">
        <p className="text-sm font-semibold text-lotus-700">Status</p>
        <h2 className="mt-2 text-2xl font-bold text-indigoInk">Placeholder membership</h2>
        <p className="mt-3 text-sm leading-6 text-indigoInk/70">
          No live membership billing is enabled yet.
        </p>
      </Card>
    </PageLayout>
  );
}
