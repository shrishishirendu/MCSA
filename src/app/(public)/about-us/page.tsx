import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function AboutUsPage() {
  return (
    <PageLayout
      title="About Us"
      eyebrow="Simplified"
      description="About Us content is now merged into the Home page so the public website remains simple and focused."
    >
      <Card className="max-w-2xl">
        <h2 className="text-xl font-bold text-indigoInk">
          Learn about Mithila Cultural Society Australia
        </h2>
        <p className="mt-3 text-sm leading-6 text-indigoInk/70">
          The Home page now includes the society introduction, cultural identity,
          committee/advisors preview and contact details.
        </p>
        <Button href="/" className="mt-5">
          Go to Home
        </Button>
      </Card>
    </PageLayout>
  );
}
