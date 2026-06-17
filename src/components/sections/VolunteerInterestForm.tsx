"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";

const adminEmail = "info@mithilaculturalsocietyaustralia.org";

export function VolunteerInterestForm() {
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const details = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      interestArea: String(formData.get("interestArea") ?? ""),
      comment: String(formData.get("comment") ?? "")
    };

    const body = [
      "Volunteer interest submission",
      "",
      `Name: ${details.name}`,
      `Phone: ${details.phone}`,
      `Email: ${details.email}`,
      `Interest area: ${details.interestArea}`,
      "",
      "Comment:",
      details.comment || "No comment provided"
    ].join("\n");

    const mailto = `mailto:${adminEmail}?subject=${encodeURIComponent(
      "Volunteer interest - Mithila Cultural Society Australia"
    )}&body=${encodeURIComponent(body)}`;

    setStatus("Opening your email app so the details can be sent to admin.");
    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldGroup>
          <Label htmlFor="name">Name</Label>
          <TextInput id="name" name="name" required placeholder="Your full name" />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="phone">Phone number</Label>
          <TextInput
            id="phone"
            name="phone"
            required
            placeholder="Your best contact number"
            type="tel"
          />
        </FieldGroup>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldGroup>
          <Label htmlFor="email">Email ID</Label>
          <TextInput
            id="email"
            name="email"
            required
            placeholder="name@example.com"
            type="email"
          />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="interestArea">Interest area</Label>
          <select
            id="interestArea"
            name="interestArea"
            required
            className="min-h-11 rounded-md border border-indigoInk/15 bg-white px-3 text-sm text-indigoInk outline-none transition focus:border-lotus-500 focus:ring-2 focus:ring-lotus-100"
          >
            <option value="">Select an area</option>
            <option>Event coordination</option>
            <option>Cultural programs</option>
            <option>Membership support</option>
            <option>Food and hospitality</option>
            <option>Media and communications</option>
            <option>Youth activities</option>
            <option>Community outreach</option>
            <option>Other</option>
          </select>
        </FieldGroup>
      </div>

      <FieldGroup>
        <Label htmlFor="comment">Comment</Label>
        <TextArea
          id="comment"
          name="comment"
          placeholder="Tell us how you would like to contribute"
        />
      </FieldGroup>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">Submit to Admin</Button>
        {status ? (
          <span className="text-sm font-semibold text-indigoInk/65">{status}</span>
        ) : (
          <span className="text-sm text-indigoInk/60">
            The submitted details will be sent to admin for review.
          </span>
        )}
      </div>
    </form>
  );
}
