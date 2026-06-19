"use client";

import { FormEvent, useState } from "react";
import type { Announcement } from "@/types/content";
import { ContentImagePicker } from "@/components/admin/ContentImagePicker";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";
import { readJsonResponse } from "@/lib/response";

export function AnnouncementEditor({
  announcements
}: {
  announcements: Announcement[];
}) {
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function edit(item: Announcement) {
    setSelected(item);
    setImageUrls(item.imageUrl ? [item.imageUrl] : []);
    setStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset(form?: HTMLFormElement) {
    setSelected(null);
    setImageUrls([]);
    form?.reset();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch(
      selected
        ? `/api/admin/announcements/${selected.id}`
        : "/api/admin/announcements",
      {
        method: selected ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          details: formData.get("details"),
          imageUrl: imageUrls[0] ?? null
        })
      }
    );
    const result = await readJsonResponse<Record<string, never>>(response);
    if (!response.ok) {
      setStatus(result.error ?? "The announcement could not be saved.");
      setSaving(false);
      return;
    }
    setStatus(selected ? "Announcement updated." : "Announcement published.");
    reset(form);
    setSaving(false);
    window.location.reload();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
      <form
        onSubmit={submit}
        className="grid gap-5 rounded-lg border border-indigoInk/10 bg-white p-6 shadow-soft"
      >
        <div>
          <p className="text-sm font-semibold text-lotus-700">
            {selected ? "Editing notice" : "New notice"}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-indigoInk">
            {selected ? "Edit announcement" : "Create an announcement"}
          </h2>
        </div>
        <FieldGroup>
          <Label htmlFor="announcement-title">Title</Label>
          <TextInput
            key={`title-${selected?.id ?? "new"}`}
            id="announcement-title"
            name="title"
            defaultValue={selected?.title ?? ""}
            required
          />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="announcement-details">Details</Label>
          <TextArea
            key={`body-${selected?.id ?? "new"}`}
            id="announcement-details"
            name="details"
            className="min-h-48"
            defaultValue={selected?.body ?? ""}
            required
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Announcement image</Label>
          <ContentImagePicker urls={imageUrls} onChange={setImageUrls} />
        </FieldGroup>
        {status ? <p className="text-sm font-semibold text-lotus-700">{status}</p> : null}
        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={saving} className="min-h-11 rounded-md bg-lotus-500 px-5 text-sm font-semibold text-white hover:bg-lotus-700 disabled:opacity-60">
            {selected ? "Update announcement" : "Publish announcement"}
          </button>
          {selected ? (
            <button type="button" onClick={() => reset()} className="min-h-11 rounded-md border border-indigoInk/15 px-5 text-sm font-semibold text-indigoInk">
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>

      <section>
        <h2 className="text-xl font-bold text-indigoInk">Existing announcements</h2>
        <div className="mt-4 grid gap-3">
          {announcements.map((item) => (
            <article key={item.id} className="rounded-lg border border-indigoInk/10 bg-white p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase text-lotus-700">Published</p>
              <h3 className="mt-2 font-bold text-indigoInk">{item.title}</h3>
              <p className="mt-2 line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-indigoInk/65">{item.body}</p>
              <button type="button" onClick={() => edit(item)} className="mt-4 rounded-md border border-lotus-500 px-4 py-2 text-sm font-semibold text-lotus-700 hover:bg-lotus-50">
                Edit announcement
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
