import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/Card";
import { VolunteerInterestForm } from "@/components/sections/VolunteerInterestForm";

export default function VolunteerPage() {
  return (
    <PageLayout
      eyebrow="Join our dynamic team"
      title="Volunteer with Mithila Cultural Society Australia"
      description="Share your details and interest area so the admin team can review your volunteer interest and follow up."
    >
      <Card>
        <VolunteerInterestForm />
      </Card>
    </PageLayout>
  );
}
