import { announcements } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export default function MemberAnnouncementsPage() {
  return (
    <PageLayout
      title="Announcements"
      description="Member-facing announcements for events, volunteering, committee updates and community notices."
      className="px-0 py-0"
    >
      <FeatureGrid
        features={announcements.map((announcement) => ({
          title: announcement.title,
          description: `Audience: ${announcement.audience}.`,
          meta: announcement.publishedAt
        }))}
      />
    </PageLayout>
  );
}
