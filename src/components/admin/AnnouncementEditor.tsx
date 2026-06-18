"use client";

import { FormEvent, useState } from "react";
import { ContentImagePicker } from "@/components/admin/ContentImagePicker";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";
import { readJsonResponse } from "@/lib/response";

export function AnnouncementEditor() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        details: formData.get("details"),
        audience: formData.get("audience"),
        imageUrl: imageUrls[0],
        publish: true
      })
    });
    const result = await readJsonResponse<Record<string, never>>(response);

    if (!response.ok) {
      setStatus(result.error ?? "The announcement could not be saved.");
      setSaving(false);
      return;
    }

    setStatus("Announcement published.");
    form.reset();
    setImageUrls([]);
    setSaving(false);
    window.location.reload();
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-5 rounded-lg border border-indigoInk/10 bg-white p-6 shadow-soft"
    >
      <div>
        <p className="text-sm font-semibold text-lotus-700">New notice</p>
        <h2 className="mt-1 text-2xl font-bold text-indigoInk">
          Create an announcement
        </h2>
      </div>
      <FieldGroup>
        <Label htmlFor="announcement-title">Title</Label>
        <TextInput id="announcement-title" name="title" required />
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor="announcement-details">Details</Label>
        <TextArea
          id="announcement-details"
          name="details"
          className="min-h-48"
          required
        />
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor="announcement-audience">Audience</Label>
        <select
          id="announcement-audience"
          name="audience"
          className="min-h-11 rounded-md border border-indigoInk/15 bg-white px-3 text-sm text-indigoInk outline-none focus:border-lotus-500 focus:ring-2 focus:ring-lotus-100"
          defaultValue="public"
        >
          <option value="public">Public — show on homepage</option>
          <option value="members">Members only</option>
        </select>
      </FieldGroup>
      <FieldGroup>
        <Label>Announcement image</Label>
        <ContentImagePicker urls={imageUrls} onChange={setImageUrls} />
      </FieldGroup>
      {status ? (
        <p className="rounded-md bg-lotus-50 px-4 py-3 text-sm font-semibold text-lotus-700">
          {status}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="min-h-11 rounded-md bg-lotus-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lotus-700 disabled:opacity-60"
        >
          Publish announcement
        </button>
      </div>
    </form>
  );
}
