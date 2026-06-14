import { announcements, donations, featuredEvents, members } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function AdminDashboardPage() {
  return (
    <PageLayout
      title="Admin dashboard"
      description="A future operations dashboard for members, events, tickets, donations, content and reporting."
      className="px-0 py-0"
    >
      <FeatureGrid
        features={[
          { title: "Members", description: `${members.length} placeholder member records.` },
          { title: "Events", description: `${featuredEvents.length} placeholder event records.` },
          { title: "Donations", description: `${donations.length} placeholder donation records.` },
          { title: "Announcements", description: `${announcements.length} placeholder announcements.` }
        ]}
      />
    </PageLayout>
  );
}
