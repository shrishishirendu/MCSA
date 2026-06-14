import { announcements } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function AdminAnnouncementsPage() {
  return (
    <PageLayout title="Announcements" description="Admin announcement creation and targeting foundation." className="px-0 py-0">
      <FeatureGrid
        features={announcements.map((announcement) => ({
          title: announcement.title,
          description: `Audience: ${announcement.audience}`,
          meta: announcement.publishedAt
        }))}
      />
    </PageLayout>
  );
}
