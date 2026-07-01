"use client";

import { FormEvent, useState } from "react";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";
import { readJsonResponse } from "@/lib/response";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        comment: formData.get("comment")
      })
    });
    const result = await readJsonResponse<Record<string, never>>(response);

    if (!response.ok) {
      setStatus(result.error ?? "Your message could not be sent.");
      setSubmitting(false);
      return;
    }

    setStatus(
      "Thank you. Your query has been sent to the MCSA team. We will get back to you within 72 hours."
    );
    form.reset();
    setSubmitting(false);
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldGroup>
          <Label htmlFor="name">Name</Label>
          <TextInput id="name" name="name" required />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="email">Email ID</Label>
          <TextInput id="email" name="email" type="email" required />
        </FieldGroup>
      </div>

      <FieldGroup>
        <Label htmlFor="phone">Phone number</Label>
        <TextInput id="phone" name="phone" type="tel" />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="comment">Comment</Label>
        <TextArea
          id="comment"
          name="comment"
          required
          placeholder="Write your question, collaboration idea or membership query here."
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
        {submitting ? "Sending..." : "Send query"}
      </button>
    </form>
  );
}
