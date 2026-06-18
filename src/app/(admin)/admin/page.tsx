import Link from "next/link";
import {
  donations,
  eventPaymentRecords,
  managedEvents,
} from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  getAnnouncements,
  getBlogPosts,
  getMembers
} from "@/lib/content-data";

const pendingPayments = eventPaymentRecords.filter(
  (payment) => payment.status === "pending"
);
const receivedDonations = donations.reduce(
  (total, donation) => total + donation.amountAud,
  0
);

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [members, blogPosts, announcements] = await Promise.all([
    getMembers(),
    getBlogPosts({ includeDrafts: true }),
    getAnnouncements({ includeUnpublished: true })
  ]);
  const pendingEvents = managedEvents.filter((event) => event.needsApproval);
  const pendingMembers = members.filter(
    (member) => member.membershipStatus === "pending"
  );
  const managementAreas = [
    {
      title: "Members",
      description: "Review applications and maintain membership records.",
      href: "/admin/members",
      count: members.length,
      countLabel: "records"
    },
    {
      title: "Events",
      description: "Review, approve and publish society events.",
      href: "/admin/events",
      count: managedEvents.length,
      countLabel: "events"
    },
    {
      title: "Tickets",
      description: "Check registrations, payments and attendee records.",
      href: "/admin/tickets",
      count: eventPaymentRecords.length,
      countLabel: "payments"
    },
    {
      title: "Donations",
      description: "Track donations and payment reconciliation.",
      href: "/admin/donations",
      count: donations.length,
      countLabel: "donations"
    },
    {
      title: "Blog posts",
      description: "Manage society updates and cultural articles.",
      href: "/admin/blog-posts",
      count: blogPosts.length,
      countLabel: "posts"
    },
    {
      title: "Announcements",
      description: "Publish updates for members and the public.",
      href: "/admin/announcements",
      count: announcements.length,
      countLabel: "notices"
    }
  ];

  return (
    <PageLayout
      eyebrow="Operations overview"
      title="Admin dashboard"
      description="Review work requiring attention and open each management area from one place."
      className="px-0 py-0"
    >
      <section
        aria-label="Admin summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <SummaryCard
          label="Pending approvals"
          value={pendingEvents.length + pendingMembers.length}
          detail={`${pendingEvents.length} event · ${pendingMembers.length} member`}
          tone="lotus"
        />
        <SummaryCard
          label="Published events"
          value={managedEvents.filter((event) => event.status === "published").length}
          detail={`${managedEvents.length} managed events`}
          tone="leaf"
        />
        <SummaryCard
          label="Payments to review"
          value={pendingPayments.length}
          detail={`${eventPaymentRecords.length} payment records`}
          tone="turmeric"
        />
        <SummaryCard
          label="Donations received"
          value={`$${receivedDonations.toLocaleString("en-AU")}`}
          detail="AUD recorded"
          tone="river"
        />
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.8fr)]">
        <section aria-labelledby="management-heading">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-lotus-700">Workspace</p>
              <h2
                id="management-heading"
                className="mt-1 text-2xl font-bold text-indigoInk"
              >
                Management areas
              </h2>
            </div>
            <Button href="/admin/reports" variant="secondary">
              View reports
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {managementAreas.map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="group rounded-lg border border-indigoInk/10 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-lotus-500/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-lotus-500 focus:ring-offset-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-indigoInk group-hover:text-lotus-700">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-indigoInk/65">
                      {area.description}
                    </p>
                  </div>
                  <span className="grid min-w-12 place-items-center rounded-md bg-lotus-50 px-3 py-2 text-lg font-bold text-lotus-700">
                    {area.count}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-indigoInk/10 pt-4 text-sm">
                  <span className="font-medium text-indigoInk/55">
                    {area.countLabel}
                  </span>
                  <span className="font-semibold text-lotus-700">
                    Open <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-6" aria-label="Admin attention list">
          <Card>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-lotus-700">
                  Needs attention
                </p>
                <h2 className="mt-1 text-xl font-bold text-indigoInk">
                  Approval queue
                </h2>
              </div>
              <span className="rounded-full bg-lotus-100 px-3 py-1 text-sm font-bold text-lotus-700">
                {pendingEvents.length + pendingMembers.length + pendingPayments.length}
              </span>
            </div>

            <div className="mt-5 divide-y divide-indigoInk/10">
              {pendingEvents.map((event) => (
                <QueueItem
                  key={event.id}
                  title={event.title}
                  detail="Event awaiting approval"
                  href="/admin/events"
                />
              ))}
              {pendingMembers.map((member) => (
                <QueueItem
                  key={member.id}
                  title={member.name}
                  detail="Membership application pending"
                  href="/admin/members"
                />
              ))}
              {pendingPayments.map((payment) => (
                <QueueItem
                  key={payment.id}
                  title={payment.payer}
                  detail={`Payment review · $${payment.amountAud} AUD`}
                  href="/admin/tickets"
                />
              ))}
            </div>
          </Card>

          <Card className="bg-indigoInk text-white">
            <p className="text-sm font-semibold text-turmeric">Admin access</p>
            <h2 className="mt-2 text-xl font-bold">Portal foundation</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              This interface currently uses project records. Authentication,
              database updates and payment actions must be connected before
              production administration is enabled.
            </p>
            <Button
              href="/"
              variant="secondary"
              className="mt-5 border-white/20 bg-white/10 text-white hover:border-white/50 hover:text-white"
            >
              View public website
            </Button>
          </Card>
        </aside>
      </div>
    </PageLayout>
  );
}

type SummaryCardProps = {
  label: string;
  value: number | string;
  detail: string;
  tone: "lotus" | "leaf" | "turmeric" | "river";
};

const summaryToneClasses: Record<SummaryCardProps["tone"], string> = {
  lotus: "border-lotus-500/30 bg-lotus-50 text-lotus-700",
  leaf: "border-leaf/25 bg-leaf/5 text-leaf",
  turmeric: "border-turmeric/30 bg-turmeric/10 text-indigoInk",
  river: "border-river/25 bg-river/5 text-river"
};

function SummaryCard({ label, value, detail, tone }: SummaryCardProps) {
  return (
    <article className={`rounded-lg border p-5 ${summaryToneClasses[tone]}`}>
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-3 text-3xl font-extrabold">{value}</p>
      <p className="mt-2 text-xs font-medium opacity-70">{detail}</p>
    </article>
  );
}

function QueueItem({
  title,
  detail,
  href
}: {
  title: string;
  detail: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
    >
      <span>
        <span className="block text-sm font-bold text-indigoInk group-hover:text-lotus-700">
          {title}
        </span>
        <span className="mt-1 block text-xs text-indigoInk/55">{detail}</span>
      </span>
      <span className="text-lg text-lotus-700" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
