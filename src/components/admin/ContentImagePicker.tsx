"use client";

import { useState } from "react";
import { readJsonResponse } from "@/lib/response";

export function ContentImagePicker({
  multiple = false,
  urls,
  onChange
}: {
  multiple?: boolean;
  urls: string[];
  onChange: (urls: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError("");

    try {
      const selected = Array.from(files).slice(0, multiple ? 2 : 1);
      const uploaded: string[] = [];

      for (const file of selected) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData
        });
        const result = await readJsonResponse<{
          url?: string;
        }>(response);
        if (!response.ok || !result.url) {
          throw new Error(result.error ?? "Image upload failed.");
        }
        uploaded.push(result.url);
      }

      onChange(multiple ? [...urls, ...uploaded].slice(0, 2) : uploaded);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-3">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={multiple}
        disabled={uploading || (multiple && urls.length >= 2)}
        onChange={(event) => upload(event.target.files)}
        className="block w-full rounded-md border border-indigoInk/15 bg-white p-2 text-sm text-indigoInk file:mr-3 file:rounded-md file:border-0 file:bg-lotus-50 file:px-3 file:py-2 file:font-semibold file:text-lotus-700"
      />
      <p className="text-xs text-indigoInk/50">
        JPG, PNG or WebP, maximum 5 MB{multiple ? " each. Up to two images." : "."}
      </p>
      {uploading ? (
        <p className="text-sm font-semibold text-lotus-700">Uploading image…</p>
      ) : null}
      {error ? <p className="text-sm font-semibold text-lotus-700">{error}</p> : null}
      {urls.length ? (
        <div className="flex flex-wrap gap-2">
          {urls.map((url) => (
            <div
              key={url}
              className="flex items-center gap-2 rounded-md bg-lotus-50 px-3 py-2 text-xs text-indigoInk"
            >
              <span>Image uploaded</span>
              <button
                type="button"
                onClick={() => onChange(urls.filter((item) => item !== url))}
                className="font-bold text-lotus-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
