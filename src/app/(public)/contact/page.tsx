import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ContactPage() {
  return (
    <PageLayout
      title="Contact"
      eyebrow="Available across the site"
      description="Contact details are now present on the Home page and in the footer on every public page."
    >
      <Card className="max-w-2xl">
        <h2 className="text-xl font-bold text-indigoInk">
          Contact Mithila Cultural Society Australia
        </h2>
        <p className="mt-3 text-sm leading-6 text-indigoInk/70">
          For membership, events, donations, partnerships and volunteering,
          email the society.
        </p>
        <Button
          href="mailto:info@mithilaculturalsocietyaustralia.org"
          className="mt-5"
        >
          Email us
        </Button>
      </Card>
    </PageLayout>
  );
}
