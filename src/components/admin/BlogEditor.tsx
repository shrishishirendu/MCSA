"use client";

import { FormEvent, useState } from "react";
import type { BlogPostSummary } from "@/types/content";
import { ContentImagePicker } from "@/components/admin/ContentImagePicker";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";
import { readJsonResponse } from "@/lib/response";

export function BlogEditor({ posts }: { posts: BlogPostSummary[] }) {
  const [selected, setSelected] = useState<BlogPostSummary | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function edit(post: BlogPostSummary) {
    setSelected(post);
    setImageUrls(post.imageUrls ?? []);
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
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const publish = submitter?.value === "publish";
    const response = await fetch(
      selected ? `/api/admin/blog-posts/${selected.id}` : "/api/admin/blog-posts",
      {
        method: selected ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          excerpt: formData.get("excerpt"),
          article: formData.get("article"),
          imageUrls,
          publish
        })
      }
    );
    const result = await readJsonResponse<Record<string, never>>(response);
    if (!response.ok) {
      setStatus(result.error ?? "The post could not be saved.");
      setSaving(false);
      return;
    }
    setStatus(selected ? "Blog post updated." : publish ? "Blog post published." : "Draft saved.");
    reset(form);
    setSaving(false);
    window.location.reload();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
      <form onSubmit={submit} className="grid gap-5 rounded-lg border border-indigoInk/10 bg-white p-6 shadow-soft">
        <div>
          <p className="text-sm font-semibold text-lotus-700">{selected ? "Editing article" : "New article"}</p>
          <h2 className="mt-1 text-2xl font-bold text-indigoInk">{selected ? "Edit blog post" : "Write a blog post"}</h2>
        </div>
        <FieldGroup>
          <Label htmlFor="blog-title">Title</Label>
          <TextInput key={`title-${selected?.id ?? "new"}`} id="blog-title" name="title" defaultValue={selected?.title ?? ""} required />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="blog-excerpt">Short summary</Label>
          <TextArea key={`excerpt-${selected?.id ?? "new"}`} id="blog-excerpt" name="excerpt" className="min-h-24" defaultValue={selected?.excerpt ?? ""} required />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="blog-article">Article</Label>
          <TextArea key={`body-${selected?.id ?? "new"}`} id="blog-article" name="article" className="min-h-72" defaultValue={selected?.body ?? ""} required />
        </FieldGroup>
        <FieldGroup>
          <Label>Article images</Label>
          <ContentImagePicker multiple urls={imageUrls} onChange={setImageUrls} />
        </FieldGroup>
        {status ? <p className="text-sm font-semibold text-lotus-700">{status}</p> : null}
        <div className="flex flex-wrap gap-3">
          <button type="submit" value="publish" disabled={saving} className="min-h-11 rounded-md bg-lotus-500 px-5 text-sm font-semibold text-white hover:bg-lotus-700 disabled:opacity-60">
            {selected ? "Update and publish" : "Publish to blog"}
          </button>
          <button type="submit" value="draft" disabled={saving} className="min-h-11 rounded-md border border-indigoInk/15 px-5 text-sm font-semibold text-indigoInk">
            {selected ? "Update as draft" : "Save draft"}
          </button>
          {selected ? <button type="button" onClick={() => reset()} className="min-h-11 rounded-md px-4 text-sm font-semibold text-indigoInk/65">Cancel edit</button> : null}
        </div>
      </form>

      <section>
        <h2 className="text-xl font-bold text-indigoInk">Existing posts</h2>
        <div className="mt-4 grid gap-3">
          {posts.map((post) => (
            <article key={post.id} className="rounded-lg border border-indigoInk/10 bg-white p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase text-lotus-700">{post.status ?? "published"}</p>
              <h3 className="mt-2 font-bold text-indigoInk">{post.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-indigoInk/65">{post.excerpt}</p>
              <button type="button" onClick={() => edit(post)} className="mt-4 rounded-md border border-lotus-500 px-4 py-2 text-sm font-semibold text-lotus-700 hover:bg-lotus-50">
                Edit post
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
