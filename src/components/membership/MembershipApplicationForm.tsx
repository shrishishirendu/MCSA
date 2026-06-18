"use client";

import { FormEvent, useState } from "react";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";
import { readJsonResponse } from "@/lib/response";

export function MembershipApplicationForm() {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/membership-applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        membershipType: formData.get("membershipType"),
        notes: formData.get("notes")
      })
    });
    const result = await readJsonResponse<Record<string, never>>(response);

    if (!response.ok) {
      setStatus(result.error ?? "The application could not be submitted.");
      setSubmitting(false);
      return;
    }

    setStatus("Application submitted for admin review.");
    form.reset();
    setSubmitting(false);
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldGroup>
          <Label htmlFor="fullName">Full name</Label>
          <TextInput id="fullName" name="fullName" required />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="email">Email</Label>
          <TextInput id="email" name="email" type="email" required />
        </FieldGroup>
      </div>
      <FieldGroup>
        <Label htmlFor="phone">Phone</Label>
        <TextInput id="phone" name="phone" type="tel" />
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor="membershipType">Membership type</Label>
        <select
          id="membershipType"
          name="membershipType"
          className="min-h-11 rounded-md border border-indigoInk/15 bg-white px-3 text-sm text-indigoInk outline-none focus:border-lotus-500 focus:ring-2 focus:ring-lotus-100"
          defaultValue="annual"
        >
          <option value="annual">Annual membership</option>
          <option value="lifetime">Lifetime membership</option>
          <option value="functional">Functional member</option>
        </select>
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor="notes">Application details</Label>
        <TextArea
          id="notes"
          name="notes"
          placeholder="Family details, interests or other information for the committee"
        />
      </FieldGroup>
      {status ? (
        <p className="rounded-md bg-lotus-50 px-4 py-3 text-sm font-semibold text-lotus-700">
          {status}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className="min-h-11 w-fit rounded-md bg-lotus-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lotus-700 disabled:opacity-60"
      >
        Submit application
      </button>
    </form>
  );
}
