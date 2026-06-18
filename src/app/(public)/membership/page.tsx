import { membershipOptions } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MembershipApplicationForm } from "@/components/membership/MembershipApplicationForm";

export default function MembershipPage() {
  return (
    <PageLayout
      title="Membership & Donations"
      eyebrow="Join, renew or support"
      description="Apply for membership, renew an existing membership or support the society with a donation."
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

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-lotus-500/25 bg-lotus-50">
            <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
              Bank transfer details
            </p>
            <h2 className="mt-3 text-2xl font-bold text-indigoInk">
              Pay your membership fee
            </h2>
            <dl className="mt-5 grid gap-4 text-sm">
              <BankDetail
                label="Account name"
                value="Mithila Cultural Society Australia Inc"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <BankDetail label="BSB" value="062452" />
                <BankDetail label="Account number" value="10509708" />
              </div>
            </dl>
            <p className="mt-5 text-sm leading-6 text-indigoInk/65">
              Please include your full name as the payment reference and retain
              the transfer receipt for confirmation.
            </p>
          </Card>

          <Card>
            <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
              Fees
            </p>
            <h2 className="mt-3 text-2xl font-bold text-indigoInk">
              Membership and donation amounts
            </h2>
            <ul className="mt-5 grid gap-3 text-sm text-indigoInk/75">
              <Fee label="Annual Membership" amount="AUD 21" />
              <Fee label="Renew Membership" amount="AUD 21" />
              <Fee label="Lifetime Membership" amount="AUD 51" />
              <Fee label="Donation (Puja)" amount="Open for any amount" />
            </ul>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card>
            <h2 className="text-xl font-bold text-indigoInk">
              Membership request
            </h2>
            <p className="mt-2 text-sm leading-6 text-indigoInk/70">
              Submit your details for committee review. The application will
              appear in the admin portal for approval.
            </p>
            <MembershipApplicationForm />
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

function BankDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-indigoInk/50">
        {label}
      </dt>
      <dd className="mt-1 font-bold text-indigoInk">{value}</dd>
    </div>
  );
}

function Fee({ label, amount }: { label: string; amount: string }) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-md bg-lotus-50 px-4 py-3">
      <span className="font-medium">{label}</span>
      <span className="font-bold text-lotus-700">{amount}</span>
    </li>
  );
}
