"use client";

import { useMemo, useState } from "react";
import {
  eventAttendeeRecords,
  eventGroups,
  eventInvitationCampaigns,
  eventPaymentRecords,
  eventRoles,
  managedEvents,
  type EventGroupId,
  type EventRoleId
} from "@/data/placeholders";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";

type EventTab =
  | "overview"
  | "manage"
  | "invites"
  | "payments"
  | "approvals"
  | "attendees";

const tabs: Array<{ id: EventTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "manage", label: "Manage events" },
  { id: "invites", label: "Invitations" },
  { id: "payments", label: "Payments" },
  { id: "approvals", label: "Approvals" },
  { id: "attendees", label: "Attendees" }
];

const formatAud = (amount: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0
  }).format(amount);

function getRoleGroup(roleId: EventRoleId): EventGroupId | "all" {
  return eventRoles.find((role) => role.id === roleId)?.groupId ?? "all";
}

function getEventTitle(eventId: string) {
  return managedEvents.find((event) => event.id === eventId)?.title ?? eventId;
}

function canSeeAdminData(roleId: EventRoleId) {
  return roleId !== "member";
}

function canSeeAllGroups(roleId: EventRoleId) {
  return roleId === "super-admin";
}

export function EventManagementWorkspace() {
  const [roleId, setRoleId] = useState<EventRoleId>("super-admin");
  const [activeTab, setActiveTab] = useState<EventTab>("overview");

  const role = eventRoles.find((item) => item.id === roleId) ?? eventRoles[0];
  const roleGroup = getRoleGroup(roleId);
  const adminMode = canSeeAdminData(roleId);
  const superAdmin = canSeeAllGroups(roleId);

  const visibleEvents = useMemo(() => {
    if (roleId === "member") {
      return managedEvents.filter((event) => event.status === "published");
    }

    if (roleGroup === "all") {
      return managedEvents;
    }

    return managedEvents.filter((event) => event.groupId === roleGroup);
  }, [roleGroup, roleId]);

  const visibleEventIds = visibleEvents.map((event) => event.id);
  const visiblePayments = eventPaymentRecords.filter((payment) =>
    visibleEventIds.includes(payment.eventId)
  );
  const visibleInvites = eventInvitationCampaigns.filter((campaign) =>
    visibleEventIds.includes(campaign.eventId)
  );
  const visibleAttendees = eventAttendeeRecords.filter((attendee) =>
    visibleEventIds.includes(attendee.eventId)
  );
  const pendingApprovals = managedEvents.filter((event) => event.needsApproval);

  const totalCapacity = visibleEvents.reduce(
    (total, event) => total + event.capacity,
    0
  );
  const totalRegistrations = visibleEvents.reduce(
    (total, event) => total + event.registrations,
    0
  );
  const totalRevenue = visiblePayments.reduce(
    (total, payment) => total + payment.amountAud,
    0
  );

  return (
    <div className="grid gap-8">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="bg-lotus-50/60">
          <p className="text-sm font-bold uppercase tracking-wide text-lotus-700">
            Event operating model
          </p>
          <h2 className="mt-3 text-2xl font-bold text-indigoInk">
            City groups manage their own events. Central admin keeps final
            control.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-indigoInk/70">
            This page is structured for Sydney, Melbourne, Brisbane, Perth and
            Adelaide event teams. Each group can create events, invite its own
            audience, collect event payments and manage attendees. Super admin
            can approve events and see consolidated reporting.
          </p>
        </Card>

        <Card>
          <Label htmlFor="roleSelector">Preview access level</Label>
          <select
            id="roleSelector"
            value={roleId}
            onChange={(event) => {
              const nextRole = event.target.value as EventRoleId;
              setRoleId(nextRole);
              if (nextRole === "member" && activeTab === "approvals") {
                setActiveTab("overview");
              }
            }}
            className="mt-2 min-h-11 w-full rounded-md border border-indigoInk/15 bg-white px-3 text-sm font-semibold text-indigoInk outline-none transition focus:border-lotus-500 focus:ring-2 focus:ring-lotus-100"
          >
            {eventRoles.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <p className="mt-3 text-sm leading-6 text-indigoInk/65">
            {role.description}
          </p>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm font-semibold text-indigoInk/60">
            Visible events
          </p>
          <p className="mt-3 text-3xl font-bold text-indigoInk">
            {visibleEvents.length}
          </p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-indigoInk/60">
            Registrations
          </p>
          <p className="mt-3 text-3xl font-bold text-indigoInk">
            {totalRegistrations}/{totalCapacity}
          </p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-indigoInk/60">
            Invitation replies
          </p>
          <p className="mt-3 text-3xl font-bold text-indigoInk">
            {visibleInvites.reduce((total, item) => total + item.accepted, 0)}
          </p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-indigoInk/60">
            {adminMode ? "Payments visible" : "Payment privacy"}
          </p>
          <p className="mt-3 text-3xl font-bold text-indigoInk">
            {adminMode ? formatAud(totalRevenue) : "Hidden"}
          </p>
        </Card>
      </section>

      <nav className="flex gap-2 overflow-x-auto rounded-lg border border-indigoInk/10 bg-white p-2 shadow-soft">
        {tabs
          .filter((tab) => superAdmin || tab.id !== "approvals")
          .filter((tab) => adminMode || !["payments", "manage"].includes(tab.id))
          .map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-bold transition ${
                activeTab === tab.id
                  ? "bg-lotus-500 text-white"
                  : "text-indigoInk hover:bg-lotus-50 hover:text-lotus-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
      </nav>

      {activeTab === "overview" && (
        <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-4">
            {visibleEvents.map((event) => (
              <Card key={event.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-lotus-700">
                      {event.status} / {event.visibility}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-indigoInk">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm text-indigoInk/65">
                      {event.date}, {event.time} - {event.venue}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-indigoInk/70">
                      {event.summary}
                    </p>
                  </div>
                  <span className="rounded-full bg-lotus-50 px-3 py-1 text-xs font-bold text-lotus-700">
                    {event.owner}
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-md bg-lotus-50 p-3">
                    <p className="text-xs font-bold uppercase text-indigoInk/55">
                      Capacity
                    </p>
                    <p className="mt-1 font-bold text-indigoInk">
                      {event.registrations}/{event.capacity}
                    </p>
                  </div>
                  <div className="rounded-md bg-lotus-50 p-3">
                    <p className="text-xs font-bold uppercase text-indigoInk/55">
                      Ticket
                    </p>
                    <p className="mt-1 font-bold text-indigoInk">
                      {event.ticketPriceAud > 0
                        ? formatAud(event.ticketPriceAud)
                        : "Free"}
                    </p>
                  </div>
                  <div className="rounded-md bg-lotus-50 p-3">
                    <p className="text-xs font-bold uppercase text-indigoInk/55">
                      Payment
                    </p>
                    <p className="mt-1 font-bold text-indigoInk">
                      {adminMode ? formatAud(event.revenueAud) : "Own ticket only"}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button type="button">Register</Button>
                  <Button type="button" variant="secondary">
                    Pay for event
                  </Button>
                  {adminMode && (
                    <Button type="button" variant="ghost">
                      Manage
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <h2 className="text-xl font-bold text-indigoInk">
              Event groups
            </h2>
            <div className="mt-5 grid gap-3">
              {eventGroups
                .filter((group) => superAdmin || group.id === roleGroup)
                .map((group) => (
                  <div
                    key={group.id}
                    className="rounded-md border border-indigoInk/10 p-4"
                  >
                    <div className="flex flex-wrap justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-indigoInk">
                          {group.name}
                        </h3>
                        <p className="mt-1 text-sm text-indigoInk/65">
                          {group.city} - {group.admin}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-lotus-700">
                        {group.paymentAccount}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-indigoInk/70">
                      {group.description}
                    </p>
                  </div>
                ))}
            </div>
          </Card>
        </section>
      )}

      {activeTab === "manage" && adminMode && (
        <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-indigoInk">
                  Create event
                </h2>
                <p className="mt-2 text-sm leading-6 text-indigoInk/70">
                  City admins can save drafts and submit them for approval.
                  Super admin can publish after review.
                </p>
              </div>
              <span className="rounded-full bg-lotus-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-lotus-700">
                Approval required
              </span>
            </div>
            <form className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldGroup>
                  <Label htmlFor="eventGroup">Event group</Label>
                  <select
                    id="eventGroup"
                    defaultValue={roleGroup === "all" ? "sydney" : roleGroup}
                    className="min-h-11 rounded-md border border-indigoInk/15 bg-white px-3 text-sm text-indigoInk outline-none transition focus:border-lotus-500 focus:ring-2 focus:ring-lotus-100"
                  >
                    {eventGroups
                      .filter((group) => group.id !== "national")
                      .filter((group) => superAdmin || group.id === roleGroup)
                      .map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                  </select>
                </FieldGroup>
                <FieldGroup>
                  <Label htmlFor="eventVisibility">Visibility</Label>
                  <select
                    id="eventVisibility"
                    className="min-h-11 rounded-md border border-indigoInk/15 bg-white px-3 text-sm text-indigoInk outline-none transition focus:border-lotus-500 focus:ring-2 focus:ring-lotus-100"
                  >
                    <option>Public</option>
                    <option>Members only</option>
                    <option>Invite only</option>
                  </select>
                </FieldGroup>
              </div>
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
              <div className="grid gap-4 sm:grid-cols-3">
                <FieldGroup>
                  <Label htmlFor="generalTicket">General ticket</Label>
                  <TextInput id="generalTicket" type="number" placeholder="45" />
                </FieldGroup>
                <FieldGroup>
                  <Label htmlFor="memberTicket">Member ticket</Label>
                  <TextInput id="memberTicket" type="number" placeholder="25" />
                </FieldGroup>
                <FieldGroup>
                  <Label htmlFor="familyTicket">Family ticket</Label>
                  <TextInput id="familyTicket" type="number" placeholder="120" />
                </FieldGroup>
              </div>
              <FieldGroup>
                <Label htmlFor="eventSummary">Event summary</Label>
                <TextArea
                  id="eventSummary"
                  placeholder="Purpose, cultural context, invite audience, volunteer needs and payment notes"
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
              Admin controls
            </h2>
            <div className="mt-5 grid gap-3">
              {[
                "Create draft for own city group",
                "Configure member, family and guest ticket prices",
                "Invite selected member segments",
                "Track registrations and payment status",
                "Export attendee list for check-in",
                "Close event and prepare report"
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-md bg-lotus-50 p-3 text-sm text-indigoInk/75"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-lotus-700">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>
      )}

      {activeTab === "invites" && (
        <section className="grid gap-4 lg:grid-cols-2">
          {visibleInvites.map((invite) => (
            <Card key={invite.id}>
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-indigoInk">
                    {getEventTitle(invite.eventId)}
                  </h2>
                  <p className="mt-1 text-sm text-indigoInk/65">
                    Audience: {invite.audience}
                  </p>
                </div>
                {adminMode && (
                  <Button type="button" variant="secondary">
                    Send reminder
                  </Button>
                )}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {[
                  ["Sent", invite.sent],
                  ["Opened", invite.opened],
                  ["Accepted", invite.accepted],
                  ["Pending", invite.pending],
                  ["Declined", invite.declined]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md bg-lotus-50 p-3">
                    <p className="text-lg font-bold text-indigoInk">{value}</p>
                    <p className="text-xs font-semibold text-indigoInk/60">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </section>
      )}

      {activeTab === "payments" && adminMode && (
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-indigoInk">
                Payment management
              </h2>
              <p className="mt-2 text-sm text-indigoInk/65">
                Members will only see their own payment status. Admins see
                event-level collection and reconciliation.
              </p>
            </div>
            <Button type="button" variant="secondary">
              Export payment report
            </Button>
          </div>
          <div className="overflow-hidden rounded-lg border border-indigoInk/10 bg-white shadow-soft">
            <div className="grid grid-cols-1 divide-y divide-indigoInk/10 lg:grid-cols-[1fr_1.2fr_0.8fr_0.7fr_0.7fr_0.8fr] lg:divide-y-0">
              {["Payer", "Event", "Ticket", "Status", "Amount", "Reference"].map(
                (heading) => (
                  <div
                    key={heading}
                    className="hidden bg-lotus-50 p-4 text-sm font-bold text-indigoInk lg:block"
                  >
                    {heading}
                  </div>
                )
              )}
              {visiblePayments.map((payment) => (
                <div
                  key={payment.id}
                  className="grid gap-2 p-4 text-sm text-indigoInk/75 lg:contents"
                >
                  <div className="lg:p-4">{payment.payer}</div>
                  <div className="lg:p-4">{getEventTitle(payment.eventId)}</div>
                  <div className="lg:p-4">{payment.ticketType}</div>
                  <div className="lg:p-4">{payment.status}</div>
                  <div className="lg:p-4">{formatAud(payment.amountAud)}</div>
                  <div className="lg:p-4">{payment.reference}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === "approvals" && superAdmin && (
        <section className="grid gap-4">
          {pendingApprovals.map((event) => (
            <Card key={event.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-lotus-700">
                    Approval required
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-indigoInk">
                    {event.title}
                  </h2>
                  <p className="mt-1 text-sm text-indigoInk/65">
                    {event.date}, {event.time} - {event.venue}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-indigoInk/70">
                    Submitted by {event.owner}. Review event details, ticket
                    setup, venue readiness and invite audience before publishing.
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
        </section>
      )}

      {activeTab === "attendees" && (
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-indigoInk">
                Attendees and check-in
              </h2>
              <p className="mt-2 text-sm text-indigoInk/65">
                Check-in can be managed per event. Payment details stay visible
                only to admins.
              </p>
            </div>
            {adminMode && (
              <Button type="button" variant="secondary">
                Export attendee list
              </Button>
            )}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {visibleAttendees.map((attendee) => (
              <Card key={attendee.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-indigoInk">
                      {attendee.name}
                    </h3>
                    <p className="mt-1 text-sm text-indigoInk/65">
                      {getEventTitle(attendee.eventId)}
                    </p>
                  </div>
                  <span className="rounded-full bg-lotus-50 px-3 py-1 text-xs font-bold text-lotus-700">
                    {attendee.checkIn}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-bold uppercase text-indigoInk/55">
                      Membership
                    </p>
                    <p className="mt-1 text-sm font-semibold text-indigoInk">
                      {attendee.membership}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-indigoInk/55">
                      Tickets
                    </p>
                    <p className="mt-1 text-sm font-semibold text-indigoInk">
                      {attendee.tickets}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-indigoInk/55">
                      Payment
                    </p>
                    <p className="mt-1 text-sm font-semibold text-indigoInk">
                      {adminMode ? attendee.paymentStatus : "Private"}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
