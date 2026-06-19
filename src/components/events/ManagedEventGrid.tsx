/* eslint-disable @next/next/no-img-element */
import type { ManagedEvent } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ManagedEventGrid({ events }: { events: ManagedEvent[] }) {
  if (!events.length) return null;

  return (
    <section className="mb-10">
      <p className="text-sm font-bold uppercase tracking-wide text-lotus-700">Admin-managed events</p>
      <h2 className="mt-2 text-2xl font-bold text-indigoInk">Latest official listings</h2>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden p-0">
            {event.imageUrl ? <img src={event.imageUrl} alt="" className="h-48 w-full object-cover" /> : null}
            <div className="p-6">
              <p className="text-sm font-semibold text-lotus-700">{event.date} {event.time}</p>
              <h3 className="mt-2 text-xl font-bold text-indigoInk">{event.title}</h3>
              <p className="mt-2 text-sm text-indigoInk/60">{event.venue}, {event.city}</p>
              <p className="mt-4 text-sm leading-6 text-indigoInk/70">{event.summary}</p>
              <p className="mt-4 text-sm font-semibold text-indigoInk">{event.priceLabel}</p>
              {event.ticketingUrl ? <Button href={event.ticketingUrl} className="mt-5">Register / Pay</Button> : null}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
