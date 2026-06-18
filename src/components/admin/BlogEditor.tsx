"use client";

import { FormEvent, useState } from "react";
import { ContentImagePicker } from "@/components/admin/ContentImagePicker";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";
import { readJsonResponse } from "@/lib/response";

export function BlogEditor() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    const publish = submitter?.value === "publish";
    const response = await fetch("/api/admin/blog-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        excerpt: formData.get("excerpt"),
        article: formData.get("article"),
        imageUrls,
        publish
      })
    });
    const result = await readJsonResponse<Record<string, never>>(response);

    if (!response.ok) {
      setStatus(result.error ?? "The post could not be saved.");
      setSaving(false);
      return;
    }

    setStatus(publish ? "Blog post published." : "Draft saved.");
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
        <p className="text-sm font-semibold text-lotus-700">New article</p>
        <h2 className="mt-1 text-2xl font-bold text-indigoInk">
          Write a blog post
        </h2>
      </div>
      <FieldGroup>
        <Label htmlFor="blog-title">Title</Label>
        <TextInput id="blog-title" name="title" required />
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor="blog-excerpt">Short summary</Label>
        <TextArea
          id="blog-excerpt"
          name="excerpt"
          className="min-h-24"
          required
        />
      </FieldGroup>
      <FieldGroup>
        <Label htmlFor="blog-article">Article</Label>
        <TextArea
          id="blog-article"
          name="article"
          className="min-h-72"
          placeholder="Write the complete article here. Paragraph breaks will be preserved."
          required
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Article images</Label>
        <ContentImagePicker
          multiple
          urls={imageUrls}
          onChange={setImageUrls}
        />
      </FieldGroup>
      {status ? (
        <p className="rounded-md bg-lotus-50 px-4 py-3 text-sm font-semibold text-lotus-700">
          {status}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          name="intent"
          value="publish"
          disabled={saving}
          className="min-h-11 rounded-md bg-lotus-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lotus-700 disabled:opacity-60"
        >
          Publish to blog
        </button>
        <button
          type="submit"
          name="intent"
          value="draft"
          disabled={saving}
          className="min-h-11 rounded-md border border-indigoInk/15 px-5 py-2.5 text-sm font-semibold text-indigoInk hover:border-lotus-500 disabled:opacity-60"
        >
          Save draft
        </button>
      </div>
    </form>
  );
}
