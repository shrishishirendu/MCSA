import {
  eventGroups,
  externalEventPlatforms,
  publicEventListings
} from "@/data/placeholders";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const launchSteps = [
  "Create the event in Humanitix, TryBooking or Eventbrite.",
  "Set ticket types, capacity, refund rules and payment collection inside that platform.",
  "Copy the public ticketing link into the MCSA event listing.",
  "MCSA admin approves the listing before it appears as an official event.",
  "Use the ticketing platform for attendee exports, QR check-in, emails and payment reports."
];

const statusLabel = {
  approved: "Ready",
  draft: "Draft",
  "needs-ticket-link": "Needs ticket link"
};

export function EventManagementWorkspace() {
  const activeCityGroups = eventGroups.filter((group) => group.id !== "national");

  return (
    <div className="grid gap-8">
      <section id="events">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-lotus-700">
              Official events
            </p>
            <h2 className="mt-2 text-2xl font-bold text-indigoInk">
              Upcoming MCSA events
            </h2>
            <p className="mt-2 text-sm text-indigoInk/65">
              Approved public events listed by Mithila Cultural Society
              Australia. Registration and payment are handled through the
              selected event platform.
            </p>
          </div>
          <Button href="#create-event" variant="secondary">
            Submit event for approval
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {publicEventListings.map((event) => (
            <Card key={event.id} className="flex flex-col">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <span className="rounded-full bg-lotus-50 px-3 py-1 text-xs font-bold text-lotus-700">
                  {event.city}
                </span>
                <span className="rounded-full bg-indigoInk/5 px-3 py-1 text-xs font-bold text-indigoInk/70">
                  {statusLabel[event.status]}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-indigoInk">
                {event.title}
              </h3>
              <p className="mt-3 text-sm font-semibold text-indigoInk/70">
                {event.date} / {event.time}
              </p>
              <p className="mt-1 text-sm text-indigoInk/65">{event.venue}</p>
              <p className="mt-4 flex-1 text-sm leading-6 text-indigoInk/70">
                {event.summary}
              </p>

              <div className="mt-5 grid gap-2 rounded-md bg-lotus-50 p-4 text-sm text-indigoInk/75">
                <p>
                  <span className="font-bold text-indigoInk">Audience:</span>{" "}
                  {event.audience}
                </p>
                <p>
                  <span className="font-bold text-indigoInk">Ticketing:</span>{" "}
                  {event.ticketingPlatform}
                </p>
                <p>
                  <span className="font-bold text-indigoInk">Price:</span>{" "}
                  {event.priceLabel}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button href={event.ticketingUrl}>
                  {event.status === "draft" ? "Choose ticketing" : "Register / Pay"}
                </Button>
                <Button href="mailto:info@mithilaculturalsociety.org.au" variant="ghost">
                  Contact organiser
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="create-event"
        className="rounded-2xl border border-lotus-100 bg-lotus-50/60 p-5 sm:p-7"
      >
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-lotus-700">
            Create an event
          </p>
          <h2 className="mt-2 text-2xl font-bold text-indigoInk">
            How MCSA events are created and approved
          </h2>
          <p className="mt-3 text-sm leading-6 text-indigoInk/70">
            City groups can create events in an external ticketing platform,
            then submit the live event link to MCSA for official approval and
            publishing on this page.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-white">
            <h3 className="text-xl font-bold text-indigoInk">
              Quick operating process
            </h3>
            <div className="mt-5 grid gap-3">
              {launchSteps.map((step, index) => (
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

          <Card className="bg-white">
            <h3 className="text-xl font-bold text-indigoInk">
              What MCSA approves
            </h3>
            <div className="mt-5 grid gap-3">
              {[
                "Which events appear as official MCSA events",
                "Which city group owns the event",
                "Final admin approval before publishing",
                "Public event description and contact point",
                "External ticketing link shown to members and guests"
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-indigoInk/10 bg-white p-3 text-sm font-semibold text-indigoInk/75"
                >
                  {item}
                </div>
              ))}
            </div>
            <Button
              href="mailto:info@mithilaculturalsociety.org.au"
              className="mt-5"
              variant="secondary"
            >
              Email event for approval
            </Button>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <h2 className="text-xl font-bold text-indigoInk">
            City event owners
          </h2>
          <div className="mt-5 grid gap-3">
            {activeCityGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-md border border-indigoInk/10 p-4"
              >
                <h3 className="font-bold text-indigoInk">{group.name}</h3>
                <p className="mt-1 text-sm text-indigoInk/65">
                  {group.city} / {group.admin}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-indigoInk">Ticketing options</h2>
          <div className="mt-5 grid gap-3">
            {externalEventPlatforms.map((platform) => (
              <div
                key={platform.name}
                className="rounded-md border border-indigoInk/10 p-4"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-lotus-700">
                  {platform.fit}
                </p>
                <h3 className="mt-2 font-bold text-indigoInk">
                  {platform.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-indigoInk/70">
                  {platform.description}
                </p>
                <Button href={platform.url} className="mt-4" variant="secondary">
                  Open {platform.name}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
