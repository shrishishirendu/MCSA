import { membershipOptions } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";

export default function MembershipPage() {
  return (
    <PageLayout
      title="Membership & Donations"
      eyebrow="Join, renew or support"
      description="One simple page for annual membership, renewal, lifetime membership and donations. Payment integration can be added later without changing the page structure."
    >
      <div className="grid gap-6">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {membershipOptions.map((option) => (
            <Card key={option.title}>
              <h2 className="text-lg font-bold text-indigoInk">
                {option.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-indigoInk/70">
                {option.description}
              </p>
              <Button type="button" className="mt-5" variant="secondary">
                {option.action}
              </Button>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card>
            <h2 className="text-xl font-bold text-indigoInk">
              Membership request
            </h2>
            <p className="mt-2 text-sm leading-6 text-indigoInk/70">
              Collect the basic request first. Admin approval and payment
              confirmation can be connected in the next implementation phase.
            </p>
            <form className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldGroup>
                  <Label htmlFor="fullName">Full name</Label>
                  <TextInput id="fullName" placeholder="Your name" />
                </FieldGroup>
                <FieldGroup>
                  <Label htmlFor="email">Email</Label>
                  <TextInput id="email" type="email" placeholder="you@example.com" />
                </FieldGroup>
              </div>
              <FieldGroup>
                <Label htmlFor="membershipType">Membership or donation type</Label>
                <TextInput
                  id="membershipType"
                  placeholder="Annual, renewal, lifetime or donation"
                />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="notes">Notes</Label>
                <TextArea
                  id="notes"
                  placeholder="Family details, renewal information, donation message or payment notes"
                />
              </FieldGroup>
              <div className="flex flex-wrap gap-3">
                <Button type="button">Submit request</Button>
                <Button type="button" variant="secondary">
                  Payment ready
                </Button>
              </div>
            </form>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-indigoInk">
              Admin confirmation
            </h2>
            <p className="mt-3 text-sm leading-6 text-indigoInk/70">
              Membership and payment records should stay under admin control.
              Admin can approve, request changes, mark payment received, issue
              receipts and update member status.
            </p>
            <div className="mt-5 grid gap-3">
              {[
                "Request submitted",
                "Admin verifies member details",
                "Payment is completed or reconciled",
                "Membership status is approved",
                "Member can view status in the portal"
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex gap-3 rounded-md bg-lotus-50 p-3 text-sm text-indigoInk/75"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-lotus-700">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
}
