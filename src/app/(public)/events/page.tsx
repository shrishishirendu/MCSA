import {
  eventAdminTasks,
  eventAttendees,
  eventDashboardStats,
  eventInvitations,
  eventPaymentOptions,
  eventRequests,
  featuredEvents
} from "@/data/placeholders";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";

export default function EventsPage() {
  return (
    <PageLayout
      title="Events"
      eyebrow="Event management"
      description="Create events, manage approvals, invite members, track registrations and prepare event payments from one simple page."
    >
      <div className="grid gap-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {eventDashboardStats.map((stat) => (
            <Card key={stat.label}>
              <p className="text-sm font-semibold text-indigoInk/60">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-bold text-indigoInk">
                {stat.value}
              </p>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-indigoInk">
                  Create event
                </h2>
                <p className="mt-2 text-sm leading-6 text-indigoInk/70">
                  Draft an event with the core details. Admin approval remains
                  required before publishing, invitations or payments.
                </p>
              </div>
              <span className="rounded-full bg-lotus-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-lotus-700">
                Draft
              </span>
            </div>
            <form className="mt-6 grid gap-4">
              <FieldGroup>
                <Label htmlFor="eventTitle">Event title</Label>
                <TextInput
                  id="eventTitle"
                  placeholder="Example: Mithila cultural evening"
                />
              </FieldGroup>
              <div className="grid gap-4 sm:grid-cols-3">
                <FieldGroup>
                  <Label htmlFor="eventDate">Date</Label>
                  <TextInput id="eventDate" type="date" />
                </FieldGroup>
                <FieldGroup>
                  <Label htmlFor="eventTime">Time</Label>
                  <TextInput id="eventTime" type="time" />
                </FieldGroup>
                <FieldGroup>
                  <Label htmlFor="eventCapacity">Capacity</Label>
                  <TextInput id="eventCapacity" type="number" placeholder="120" />
                </FieldGroup>
              </div>
              <FieldGroup>
                <Label htmlFor="eventLocation">Venue or online link</Label>
                <TextInput id="eventLocation" placeholder="Sydney, NSW" />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="eventSummary">Event summary</Label>
                <TextArea
                  id="eventSummary"
                  placeholder="Purpose, cultural context, audience, volunteer needs and payment notes"
                />
              </FieldGroup>
              <div className="flex flex-wrap gap-3">
                <Button type="button">Save draft</Button>
                <Button type="button" variant="secondary">
                  Submit for approval
                </Button>
              </div>
            </form>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-indigoInk">
              Admin workflow
            </h2>
            <div className="mt-5 grid gap-3">
              {eventAdminTasks.map((task, index) => (
                <div
                  key={task}
                  className="flex gap-3 rounded-md bg-lotus-50 p-3 text-sm text-indigoInk/75"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-lotus-700">
                    {index + 1}
                  </span>
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-indigoInk">
                Current events
              </h2>
              <p className="mt-2 text-sm text-indigoInk/65">
                Public event information, registration actions and payment
                entry points.
              </p>
            </div>
            <Button href="/admin/events" variant="secondary">
              Open admin events
            </Button>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {featuredEvents.map((event) => (
              <Card key={event.id}>
                <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
                  {event.status}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-indigoInk">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-indigoInk/65">
                  {event.date} - {event.location}
                </p>
                <div className="mt-5 grid gap-3 rounded-md bg-lotus-50 p-4 text-sm text-indigoInk/75">
                  <p>Registration: open</p>
                  <p>Invitation list: members, volunteers and supporters</p>
                  <p>Payment: Stripe checkout ready in next phase</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button type="button">Register</Button>
                  <Button type="button" variant="secondary">
                    Pay for event
                  </Button>
                  <Button type="button" variant="ghost">
                    Invite members
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <h2 className="text-xl font-bold text-indigoInk">
              Ticket and payment setup
            </h2>
            <div className="mt-5 grid gap-4">
              {eventPaymentOptions.map((option) => (
                <div
                  key={option.title}
                  className="rounded-md border border-indigoInk/10 p-4"
                >
                  <h3 className="font-bold text-indigoInk">{option.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-indigoInk/70">
                    {option.description}
                  </p>
                  <Button type="button" className="mt-4" variant="secondary">
                    Configure
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-indigoInk">
              Member invitations
            </h2>
            <div className="mt-5 grid gap-4">
              {eventInvitations.map((invite) => (
                <div
                  key={invite.id}
                  className="rounded-md border border-indigoInk/10 p-4"
                >
                  <div className="flex flex-wrap justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-indigoInk">
                        {invite.eventTitle}
                      </h3>
                      <p className="mt-1 text-sm text-indigoInk/65">
                        Audience: {invite.audience}
                      </p>
                    </div>
                    <Button type="button" variant="secondary">
                      Send reminder
                    </Button>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                    <div className="rounded-md bg-lotus-50 p-3">
                      <p className="font-bold text-indigoInk">{invite.sent}</p>
                      <p className="text-indigoInk/60">Sent</p>
                    </div>
                    <div className="rounded-md bg-lotus-50 p-3">
                      <p className="font-bold text-indigoInk">
                        {invite.accepted}
                      </p>
                      <p className="text-indigoInk/60">Accepted</p>
                    </div>
                    <div className="rounded-md bg-lotus-50 p-3">
                      <p className="font-bold text-indigoInk">
                        {invite.pending}
                      </p>
                      <p className="text-indigoInk/60">Pending</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigoInk">
            Attendees and payments
          </h2>
          <div className="mt-5 overflow-hidden rounded-lg border border-indigoInk/10 bg-white shadow-soft">
            <div className="grid grid-cols-1 gap-0 divide-y divide-indigoInk/10 lg:grid-cols-[1.2fr_1.2fr_0.9fr_0.7fr_0.7fr] lg:divide-y-0">
              <div className="hidden bg-lotus-50 p-4 text-sm font-bold text-indigoInk lg:block">
                Member / guest
              </div>
              <div className="hidden bg-lotus-50 p-4 text-sm font-bold text-indigoInk lg:block">
                Event
              </div>
              <div className="hidden bg-lotus-50 p-4 text-sm font-bold text-indigoInk lg:block">
                Ticket
              </div>
              <div className="hidden bg-lotus-50 p-4 text-sm font-bold text-indigoInk lg:block">
                Payment
              </div>
              <div className="hidden bg-lotus-50 p-4 text-sm font-bold text-indigoInk lg:block">
                Amount
              </div>
              {eventAttendees.map((attendee) => (
                <div
                  key={attendee.id}
                  className="grid gap-2 p-4 text-sm text-indigoInk/75 lg:contents"
                >
                  <div className="lg:p-4">
                    <span className="font-bold text-indigoInk lg:hidden">
                      Member / guest:{" "}
                    </span>
                    {attendee.name}
                  </div>
                  <div className="lg:p-4">
                    <span className="font-bold text-indigoInk lg:hidden">
                      Event:{" "}
                    </span>
                    {attendee.eventTitle}
                  </div>
                  <div className="lg:p-4">
                    <span className="font-bold text-indigoInk lg:hidden">
                      Ticket:{" "}
                    </span>
                    {attendee.ticketType}
                  </div>
                  <div className="lg:p-4">
                    <span className="font-bold text-indigoInk lg:hidden">
                      Payment:{" "}
                    </span>
                    {attendee.paymentStatus}
                  </div>
                  <div className="lg:p-4">
                    <span className="font-bold text-indigoInk lg:hidden">
                      Amount:{" "}
                    </span>
                    AUD {attendee.amountAud}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigoInk">
            Approval queue
          </h2>
          <div className="mt-5 grid gap-4">
            {eventRequests.map((request) => (
              <Card key={request.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-lotus-700">
                      {request.status}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-indigoInk">
                      {request.title}
                    </h3>
                    <p className="mt-1 text-sm text-indigoInk/65">
                      {request.proposedDate} - {request.submittedBy}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-indigoInk/70">
                      {request.nextStep}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="secondary">
                      Request changes
                    </Button>
                    <Button type="button">Approve</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
