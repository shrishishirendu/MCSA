import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MembershipApplicationForm } from "@/components/membership/MembershipApplicationForm";

const memberJoiningFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeuqLV3ND0htcbTojxgCS0f8w6SHumM_cb5fHmvy0SZM0xujw/viewform?usp=sharing&ouid=109159946150988163511";

const functionalMemberFormUrl = "https://forms.gle/yruEwXTZeMcKr7Mw8";

export default function MembershipPage() {
  return (
    <PageLayout
      title="Membership"
      eyebrow="Become a part of our Mithila family"
      description="Joining the Mithila Cultural Society Australia means more than just signing up—it means connecting with a thriving network of Maithil families across the country."
    >
      <div className="grid gap-6">
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
              Why Join?
            </p>
            <h2 className="mt-3 text-2xl font-bold text-indigoInk">
              Connect, participate and help shape the society
            </h2>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-indigoInk/75">
              <li>
                <span className="font-semibold text-indigoInk">
                  Exclusive Access:
                </span>{" "}
                Priority registration for cultural festivals, workshops, and
                social gatherings.
              </li>
              <li>
                <span className="font-semibold text-indigoInk">
                  Community Support:
                </span>{" "}
                Connect with mentors, elders, and peers who share your heritage.
              </li>
              <li>
                <span className="font-semibold text-indigoInk">
                  Cultural Education:
                </span>{" "}
                Access resources and events designed to teach Maithili language
                and arts to the next generation.
              </li>
              <li>
                <span className="font-semibold text-indigoInk">
                  Voting Rights:
                </span>{" "}
                Have your say in the society&apos;s direction and leadership.
              </li>
            </ul>
            <p className="mt-5 text-sm leading-6 text-indigoInk/70">
              Membership is open to all individuals and families who appreciate
              Mithila culture, regardless of their background.
            </p>
          </Card>

          <div className="grid gap-4">
            <Card className="border-lotus-500/25 bg-lotus-50">
              <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
                Start here
              </p>
              <h2 className="mt-3 text-2xl font-bold text-indigoInk">
                Join Mithila Cultural Society Australia
              </h2>
              <p className="mt-3 text-sm leading-6 text-indigoInk/75">
                Complete the membership form first, then pay the applicable fee
                using the bank details below. The committee will review your
                submission and confirm your membership status.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href={memberJoiningFormUrl}>Apply for membership</Button>
                <Button href="#membership-request" variant="secondary">
                  Use website form
                </Button>
              </div>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-lotus-500/25 bg-lotus-50">
                <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
                  Bank details
                </p>
                <h3 className="mt-3 text-lg font-bold text-indigoInk">
                  Pay your membership fee
                </h3>
                <dl className="mt-4 grid gap-3 text-sm">
                  <BankDetail
                    label="Account name"
                    value="Mithila Cultural Society Australia Inc"
                  />
                  <BankDetail label="BSB" value="062452" />
                  <BankDetail label="Account number" value="10509708" />
                </dl>
                <p className="mt-4 text-xs leading-5 text-indigoInk/65">
                  Please include your full name as the payment reference.
                </p>
              </Card>

              <Card>
                <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
                  Fees
                </p>
                <h3 className="mt-3 text-lg font-bold text-indigoInk">
                  Membership and donation amounts
                </h3>
                <ul className="mt-4 grid gap-2 text-sm text-indigoInk/75">
                  <Fee label="Annual Membership" amount="AUD 21" />
                  <Fee label="Renew Membership" amount="AUD 21" />
                  <Fee label="Lifetime Membership" amount="AUD 51" />
                  <Fee label="Donation (Puja)" amount="Open amount" />
                </ul>
              </Card>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-bold text-indigoInk">
              Functional Member
            </h3>
            <p className="mt-2 text-sm leading-6 text-indigoInk/70">
              Take an active role in planning, coordination and society
              functions.
            </p>
            <Button
              href={functionalMemberFormUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4"
              variant="secondary"
            >
              Join as Functional Member
            </Button>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-indigoInk">Volunteer</h3>
            <p className="mt-2 text-sm leading-6 text-indigoInk/70">
              Contribute time and skills for events, cultural activities, member
              support and community outreach.
            </p>
            <Button href="/volunteer" variant="secondary" className="mt-4">
              Join as a Volunteer
            </Button>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div id="membership-request">
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
          </div>

          <Card>
            <h2 className="text-xl font-bold text-indigoInk">How it works?</h2>
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
