import { members } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function AdminMembersPage() {
  return (
    <PageLayout title="Members" description="Admin member management foundation." className="px-0 py-0">
      <FeatureGrid
        features={members.map((member) => ({
          title: member.name,
          description: member.email,
          meta: member.membershipStatus
        }))}
      />
    </PageLayout>
  );
}
