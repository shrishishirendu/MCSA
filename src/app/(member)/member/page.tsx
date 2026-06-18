import { featuredEvents } from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/Card";
import { getAnnouncements, getApprovedMembers } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export default async function MemberDashboardPage() {
  const [members, announcements] = await Promise.all([
    getApprovedMembers(),
    getAnnouncements({ audience: "members" })
  ]);

  return (
    <PageLayout
      title="Member dashboard"
      description="Approved member records, tickets and member announcements."
      className="px-0 py-0"
    >
      <div className="grid gap-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <p className="text-sm font-semibold text-lotus-700">
              Approved members
            </p>
            <p className="mt-3 text-3xl font-bold text-indigoInk">
              {members.length}
            </p>
          </Card>
          <Card>
            <p className="text-sm font-semibold text-lotus-700">
              Upcoming events
            </p>
            <p className="mt-3 text-3xl font-bold text-indigoInk">
              {featuredEvents.length}
            </p>
          </Card>
          <Card>
            <p className="text-sm font-semibold text-lotus-700">
              Member announcements
            </p>
            <p className="mt-3 text-3xl font-bold text-indigoInk">
              {announcements.length}
            </p>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigoInk">Member directory</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <Card key={member.id}>
                <h3 className="font-bold text-indigoInk">{member.name}</h3>
                <p className="mt-1 text-sm capitalize text-lotus-700">
                  {member.membershipType ?? "Member"}
                </p>
                <p className="mt-3 text-sm text-indigoInk/60">
                  Joined{" "}
                  {member.joinedAt
                    ? new Date(member.joinedAt).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })
                    : "before digital records"}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
