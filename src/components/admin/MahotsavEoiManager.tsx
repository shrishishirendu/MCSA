"use client";

import { useState } from "react";
import { readJsonResponse } from "@/lib/response";

export type EoiRecord = {
  id: string; full_name: string; email: string; phone: string; age_group: string; city: string;
  contributions: string[]; preferred_days: string[]; participation_format: string;
  group_name: string | null; participant_details: string | null; performance_duration: string | null;
  music_link: string | null; description: string; requirements: string | null;
  guardian_name: string | null; guardian_phone: string | null; meeting_requested: boolean;
  meeting_purpose: string | null; meeting_preference_1: string | null; meeting_preference_2: string | null;
  meeting_preference_3: string | null; status: string; admin_notes: string | null; created_at: string;
};

export function MahotsavEoiManager({ initialRecords }: { initialRecords: EoiRecord[] }) {
  const [records, setRecords] = useState(initialRecords);
  const [openId, setOpenId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function update(record: EoiRecord, status: string, notes: string) {
    const response = await fetch(`/api/admin/mahotsav-eoi/${record.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, adminNotes: notes })
    });
    const result = await readJsonResponse<{ eoi?: EoiRecord }>(response);
    if (!response.ok || !result.eoi) return setMessage(result.error ?? "Update failed.");
    setRecords(current => current.map(item => item.id === record.id ? result.eoi! : item));
    setMessage(`${record.full_name} updated to ${status.replace("_", " ")}.`);
  }

  return <div>
    {message ? <p className="mb-4 rounded-md bg-lotus-50 p-3 text-sm font-semibold text-lotus-700">{message}</p> : null}
    <div className="grid gap-4">
      {records.map(record => {
        const open = openId === record.id;
        return <article key={record.id} className="rounded-lg border border-indigoInk/10 bg-white shadow-soft">
          <button type="button" onClick={() => setOpenId(open ? null : record.id)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
            <span><span className="text-xs font-semibold uppercase text-lotus-700">{record.status.replace("_", " ")}</span><strong className="mt-2 block text-lg text-indigoInk">{record.full_name}</strong><span className="text-sm text-indigoInk/60">{record.contributions.join(", ")}</span></span><span className="text-xl text-lotus-700">{open ? "−" : "+"}</span>
          </button>
          {open ? <EoiDetail record={record} onUpdate={update} /> : null}
        </article>;
      })}
      {!records.length ? <p className="rounded-lg bg-lotus-50 p-6 text-center text-indigoInk/65">No MM2026 expressions of interest yet.</p> : null}
    </div>
  </div>;
}

function EoiDetail({ record, onUpdate }: { record: EoiRecord; onUpdate: (record: EoiRecord, status: string, notes: string) => void }) {
  const [status, setStatus] = useState(record.status);
  const [notes, setNotes] = useState(record.admin_notes ?? "");
  return <div className="border-t border-indigoInk/10 p-5">
    <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
      <Info label="Contact" value={`${record.email} · ${record.phone}`} /><Info label="Age / city" value={`${record.age_group} · ${record.city}`} /><Info label="Preferred days" value={record.preferred_days.join(", ") || "Any"} />
      <Info label="Format / group" value={`${record.participation_format}${record.group_name ? ` · ${record.group_name}` : ""}`} /><Info label="Duration" value={record.performance_duration || "Not provided"} /><Info label="Submitted" value={new Date(record.created_at).toLocaleDateString("en-AU")} />
    </div>
    <Block title="Proposal" value={record.description} /><Block title="Participants" value={record.participant_details} /><Block title="Requirements" value={record.requirements} />
    {record.guardian_name ? <Block title="Parent/guardian" value={`${record.guardian_name} · ${record.guardian_phone}`} /> : null}
    {record.meeting_requested ? <Block title="Online committee meeting requested" value={`${record.meeting_purpose}. Preferred times: ${[record.meeting_preference_1, record.meeting_preference_2, record.meeting_preference_3].filter(Boolean).join("; ")}`} /> : null}
    <div className="mt-5 grid gap-4 sm:grid-cols-[220px_1fr_auto]">
      <select value={status} onChange={e => setStatus(e.target.value)} className="min-h-11 rounded-md border border-indigoInk/15 bg-white px-3"><option value="submitted">Submitted</option><option value="under_review">Under review</option><option value="approved">Approved</option><option value="waitlisted">Waitlisted</option><option value="rejected">Rejected</option><option value="withdrawn">Withdrawn</option></select>
      <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Admin notes / meeting confirmation" className="min-h-11 rounded-md border border-indigoInk/15 px-3" />
      <button type="button" onClick={() => onUpdate(record, status, notes)} className="rounded-md bg-lotus-500 px-5 font-semibold text-white">Save</button>
    </div>
  </div>;
}
function Info({ label, value }: { label: string; value: string }) { return <div><p className="text-xs font-semibold uppercase text-indigoInk/45">{label}</p><p className="mt-1 text-indigoInk">{value}</p></div>; }
function Block({ title, value }: { title: string; value?: string | null }) { return value ? <div className="mt-4 rounded-md bg-lotus-50 p-4"><p className="text-xs font-semibold uppercase text-indigoInk/45">{title}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-indigoInk/70">{value}</p></div> : null; }
