import { ContactForm } from "@/components/contact/ContactForm";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ContactPage() {
  return (
    <PageLayout
      title="Contact Us"
      eyebrow="We’d love to hear from you!"
      description="Whether you have a question about an upcoming event, want to collaborate, or need assistance with your membership, our team is here to help."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <h2 className="text-2xl font-bold text-indigoInk">
            Send us a secure query
          </h2>
          <p className="mt-3 text-sm leading-6 text-indigoInk/70">
            For the privacy and security of our volunteer committee members, we
            do not publish personal phone numbers on this website. Please use
            the secure form below, and the appropriate team member will get back
            to you within 72 hours.
          </p>
          <ContactForm />
        </Card>

        <div className="grid gap-6">
          <Card className="border-lotus-500/25 bg-lotus-50">
            <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
              General Inquiries
            </p>
            <h2 className="mt-3 text-xl font-bold text-indigoInk">
              mithilaculturalsoc@gmail.com
            </h2>
            <p className="mt-3 text-sm leading-6 text-indigoInk/70">
              Your contact form query will be sent to this email address.
            </p>
            <Button
              href="mailto:mithilaculturalsoc@gmail.com"
              variant="secondary"
              className="mt-5"
            >
              Email directly
            </Button>
          </Card>

          <Card>
            <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
              Event registration queries
            </p>
            <p className="mt-3 text-sm leading-6 text-indigoInk/70">
              For urgent matters regarding event registrations, please use the
              specific registration links provided on the Events page.
            </p>
            <Button href="/events" className="mt-5">
              Go to Events
            </Button>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
