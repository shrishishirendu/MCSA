"use client";

import { FormEvent, useState } from "react";
import type { ManagedEvent } from "@/types/content";
import { ContentImagePicker } from "@/components/admin/ContentImagePicker";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";
import { readJsonResponse } from "@/lib/response";

export function EventEditor({ events }: { events: ManagedEvent[] }) {
  const [selected, setSelected] = useState<ManagedEvent | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function edit(event: ManagedEvent) {
    setSelected(event);
    setImageUrls(event.imageUrl ? [event.imageUrl] : []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset(form?: HTMLFormElement) {
    setSelected(null);
    setImageUrls([]);
    form?.reset();
  }

  async function submit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setSaving(true);
    const form = formEvent.currentTarget;
    const data = new FormData(form);
    const submitter = (formEvent.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const publish = submitter?.value === "publish";
    const response = await fetch(
      selected ? `/api/admin/events/${selected.id}` : "/api/admin/events",
      {
        method: selected ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.get("title"),
          date: data.get("date"),
          time: data.get("time"),
          venue: data.get("venue"),
          city: data.get("city"),
          summary: data.get("summary"),
          ticketingUrl: data.get("ticketingUrl"),
          priceLabel: data.get("priceLabel"),
          audience: data.get("audience"),
          imageUrl: imageUrls[0] ?? null,
          publish
        })
      }
    );
    const result = await readJsonResponse<Record<string, never>>(response);
    if (!response.ok) {
      setMessage(result.error ?? "The event could not be saved.");
      setSaving(false);
      return;
    }
    setMessage(selected ? "Event updated." : "Event created.");
    reset(form);
    setSaving(false);
    window.location.reload();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
      <form onSubmit={submit} className="grid gap-5 rounded-lg border border-indigoInk/10 bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-bold text-indigoInk">{selected ? "Edit event" : "Create event"}</h2>
        <FieldGroup><Label htmlFor="event-title">Title</Label><TextInput key={`t-${selected?.id}`} id="event-title" name="title" defaultValue={selected?.title ?? ""} required /></FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldGroup><Label htmlFor="event-date">Date</Label><TextInput key={`d-${selected?.id}`} id="event-date" name="date" type="date" defaultValue={selected?.date ?? ""} required /></FieldGroup>
          <FieldGroup><Label htmlFor="event-time">Time</Label><TextInput key={`time-${selected?.id}`} id="event-time" name="time" defaultValue={selected?.time ?? ""} /></FieldGroup>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldGroup><Label htmlFor="event-venue">Venue</Label><TextInput key={`v-${selected?.id}`} id="event-venue" name="venue" defaultValue={selected?.venue ?? ""} required /></FieldGroup>
          <FieldGroup><Label htmlFor="event-city">City</Label><TextInput key={`c-${selected?.id}`} id="event-city" name="city" defaultValue={selected?.city ?? "Australia"} /></FieldGroup>
        </div>
        <FieldGroup><Label htmlFor="event-summary">Description</Label><TextArea key={`s-${selected?.id}`} id="event-summary" name="summary" defaultValue={selected?.summary ?? ""} required /></FieldGroup>
        <FieldGroup><Label htmlFor="event-ticket">Registration / ticket link</Label><TextInput key={`u-${selected?.id}`} id="event-ticket" name="ticketingUrl" type="url" defaultValue={selected?.ticketingUrl ?? ""} /></FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldGroup><Label htmlFor="event-price">Price label</Label><TextInput key={`p-${selected?.id}`} id="event-price" name="priceLabel" defaultValue={selected?.priceLabel ?? "See event details"} /></FieldGroup>
          <FieldGroup><Label htmlFor="event-audience">Audience</Label><TextInput key={`a-${selected?.id}`} id="event-audience" name="audience" defaultValue={selected?.audience ?? "Members, families and guests"} /></FieldGroup>
        </div>
        <FieldGroup><Label>Event image</Label><ContentImagePicker urls={imageUrls} onChange={setImageUrls} /></FieldGroup>
        {message ? <p className="text-sm font-semibold text-lotus-700">{message}</p> : null}
        <div className="flex flex-wrap gap-3">
          <button type="submit" value="publish" disabled={saving} className="min-h-11 rounded-md bg-lotus-500 px-5 text-sm font-semibold text-white">Publish event</button>
          <button type="submit" value="draft" disabled={saving} className="min-h-11 rounded-md border border-indigoInk/15 px-5 text-sm font-semibold text-indigoInk">Save draft</button>
          {selected ? <button type="button" onClick={() => reset()} className="px-4 text-sm font-semibold text-indigoInk/65">Cancel edit</button> : null}
        </div>
      </form>

      <section>
        <h2 className="text-xl font-bold text-indigoInk">Existing events</h2>
        <div className="mt-4 grid gap-3">
          {events.map((event) => (
            <article key={event.id} className="rounded-lg border border-indigoInk/10 bg-white p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase text-lotus-700">{event.status}</p>
              <h3 className="mt-2 font-bold text-indigoInk">{event.title}</h3>
              <p className="mt-2 text-sm text-indigoInk/65">{event.date} · {event.venue}</p>
              <button type="button" onClick={() => edit(event)} className="mt-4 rounded-md border border-lotus-500 px-4 py-2 text-sm font-semibold text-lotus-700 hover:bg-lotus-50">Edit event</button>
            </article>
          ))}
          {!events.length ? <p className="rounded-lg bg-lotus-50 p-5 text-sm text-indigoInk/65">No database events yet. Run the supplied migration, then create the first event.</p> : null}
        </div>
      </section>
    </div>
  );
}
