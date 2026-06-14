import { announcements, featuredEvents } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function MemberDashboardPage() {
  return (
    <PageLayout
      title="Member dashboard"
      description="A member overview for profile status, membership, tickets, donations and announcements."
      className="px-0 py-0"
    >
      <FeatureGrid
        features={[
          {
            title: "Membership",
            description: "Active membership summary, renewal date and receipts will appear here."
          },
          {
            title: "Upcoming tickets",
            description: `${featuredEvents.length} placeholder event records are ready for future ticket integration.`
          },
          {
            title: "Announcements",
            description: `${announcements.length} placeholder announcements are available for members.`
          }
        ]}
      />
    </PageLayout>
  );
}
