import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const steeringCommittee = [
  {
    name: "Shishirendu Jha",
    initials: "SJ",
    role: "Public Officer",
    portfolio: "Official society representation and governance"
  },
  {
    name: "Deepak Thakur",
    initials: "DT",
    role: "Elected Member",
    portfolio: "Community engagement and member support"
  },
  {
    name: "Amitesh Jha",
    initials: "AJ",
    role: "Elected Member",
    portfolio: "Membership, events, and society operations"
  },
  {
    name: "Chandra Shekhar",
    initials: "CS",
    role: "Elected Member",
    portfolio: "Cultural programs and event coordination"
  },
  {
    name: "Navneet Jha",
    initials: "NJ",
    role: "Elected Member",
    portfolio: "Member communication and community activities"
  },
  {
    name: "Avinash Kumar",
    initials: "AK",
    role: "Elected Member",
    portfolio: "Volunteering, partnerships, and community outreach"
  }
];

export default function WhoAreWePage() {
  return (
    <PageLayout
      title="Who are we?"
      eyebrow="Our people"
      description="Meet the elected steering committee and learn how Mithila Cultural Society Australia organises community leadership, cultural programs and volunteer support."
    >
      <section>
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
            Our Steering Committee
          </p>
          <h2 className="mt-3 text-2xl font-bold text-indigoInk">
            Volunteer leadership for society governance and operations
          </h2>
          <p className="mt-4 text-base leading-7 text-indigoInk/70">
            The Mithila Cultural Society Australia is governed by a dedicated
            Steering Committee of elected members who volunteer their time to
            guide the society&apos;s vision and operations.
          </p>
          <p className="mt-3 text-base leading-7 text-indigoInk/70">
            For the privacy and security of our volunteer committee members, we
            do not publish personal mobile numbers on this website. Please use
            our Contact Us page to get in touch with the appropriate
            committee/individual.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steeringCommittee.map((member) => (
            <Card key={member.name} className="text-center">
              <div className="mx-auto grid size-24 place-items-center rounded-full border border-lotus-100 bg-lotus-50 text-2xl font-bold text-lotus-700 shadow-soft">
                {member.initials}
              </div>
              <h3 className="mt-5 text-xl font-bold text-indigoInk">
                {member.name}
              </h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-lotus-700">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-6 text-indigoInk/70">
                {member.portfolio}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Card className="bg-lotus-50/70">
          <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
            Beyond Steering Committee
          </p>
          <h2 className="mt-3 text-2xl font-bold text-indigoInk">
            Subcommittees, advisory groups and community contributors
          </h2>
          <p className="mt-4 text-sm leading-7 text-indigoInk/70">
            To ensure the smooth execution of our cultural activities and
            administrative functions, the society actively forms subcommittees
            and advisory committees on an as-needed basis. These groups bring
            together passionate community members with specific expertise,
            whether in event management, finance, youth engagement, or cultural
            programming.
          </p>
          <p className="mt-3 text-sm leading-7 text-indigoInk/70">
            If you are interested in contributing your skills to one of our
            subcommittees or advisory groups, please reach out to us via our
            Contact page. We always welcome fresh energy and new ideas!
          </p>
          <Button href="/contact" className="mt-6">
            Contact Us
          </Button>
        </Card>
      </section>
    </PageLayout>
  );
}
