"use client";

import { FormEvent, useState } from "react";
import { FieldGroup, Label, TextArea, TextInput } from "@/components/ui/Form";
import { readJsonResponse } from "@/lib/response";

const contributions = [
  "Solo dance", "Group dance", "Singing", "Instrumental music",
  "Drama/theatre", "Poetry/storytelling", "Mata Ka Jagrata participation",
  "Dandiya/Garba", "Traditional dress/fashion presentation",
  "Madhubani art/exhibition", "Food stall", "Community stall",
  "Volunteer", "Sponsorship", "Photography/videography", "Other"
];
const days = ["Day 1 — 17 October", "Day 2 — 18 October", "Day 3 — 19 October"];

export function MahotsavEoiForm() {
  const [ageGroup, setAgeGroup] = useState("");
  const [meeting, setMeeting] = useState(false);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: data.get("fullName"), email: data.get("email"), phone: data.get("phone"),
      ageGroup: data.get("ageGroup"), city: data.get("city"),
      contributions: data.getAll("contributions"), preferredDays: data.getAll("preferredDays"),
      participationFormat: data.get("participationFormat"), groupName: data.get("groupName"),
      participantDetails: data.get("participantDetails"), performanceDuration: data.get("performanceDuration"),
      musicLink: data.get("musicLink"), description: data.get("description"),
      requirements: data.get("requirements"), guardianName: data.get("guardianName"),
      guardianPhone: data.get("guardianPhone"), meetingRequested: meeting,
      meetingPurpose: data.get("meetingPurpose"), meetingPreference1: data.get("meetingPreference1"),
      meetingPreference2: data.get("meetingPreference2"), meetingPreference3: data.get("meetingPreference3")
    };
    const response = await fetch("/api/mahotsav-eoi", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
    });
    const result = await readJsonResponse<{ id?: string }>(response);
    if (!response.ok) {
      setStatus(result.error ?? "Submission failed.");
    } else {
      setStatus(`EOI submitted successfully. Reference: ${result.id}. The committee will contact you.`);
      form.reset(); setAgeGroup(""); setMeeting(false);
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={submit} className="grid gap-6 rounded-xl border border-indigoInk/10 bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldGroup><Label htmlFor="eoi-name">Full name *</Label><TextInput id="eoi-name" name="fullName" required /></FieldGroup>
        <FieldGroup><Label htmlFor="eoi-email">Email *</Label><TextInput id="eoi-email" name="email" type="email" required /></FieldGroup>
        <FieldGroup><Label htmlFor="eoi-phone">Phone *</Label><TextInput id="eoi-phone" name="phone" required /></FieldGroup>
        <FieldGroup><Label htmlFor="eoi-city">City *</Label><TextInput id="eoi-city" name="city" required /></FieldGroup>
      </div>
      <FieldGroup>
        <Label htmlFor="eoi-age">Age group *</Label>
        <select id="eoi-age" name="ageGroup" required value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className="min-h-11 rounded-md border border-indigoInk/15 bg-white px-3">
          <option value="">Select age group</option><option value="under-18">Under 18</option><option value="18-25">18–25</option><option value="26-40">26–40</option><option value="41-plus">41+</option>
        </select>
      </FieldGroup>
      {ageGroup === "under-18" ? (
        <div className="grid gap-4 rounded-md bg-lotus-50 p-4 sm:grid-cols-2">
          <FieldGroup><Label htmlFor="guardian-name">Parent/guardian name *</Label><TextInput id="guardian-name" name="guardianName" required /></FieldGroup>
          <FieldGroup><Label htmlFor="guardian-phone">Parent/guardian phone *</Label><TextInput id="guardian-phone" name="guardianPhone" required /></FieldGroup>
        </div>
      ) : null}
      <fieldset><legend className="text-sm font-semibold text-indigoInk">What would you like to contribute? Select all that apply. *</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{contributions.map((item) => <Check key={item} name="contributions" value={item} label={item} />)}</div>
      </fieldset>
      <fieldset><legend className="text-sm font-semibold text-indigoInk">Preferred day(s)</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{days.map((item) => <Check key={item} name="preferredDays" value={item} label={item} />)}</div></fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldGroup><Label htmlFor="format">Participation format</Label><select id="format" name="participationFormat" className="min-h-11 rounded-md border border-indigoInk/15 bg-white px-3"><option value="individual">Individual</option><option value="group">Group</option></select></FieldGroup>
        <FieldGroup><Label htmlFor="group-name">Group name</Label><TextInput id="group-name" name="groupName" /></FieldGroup>
        <FieldGroup><Label htmlFor="duration">Performance duration</Label><TextInput id="duration" name="performanceDuration" placeholder="e.g. 5 minutes" /></FieldGroup>
        <FieldGroup><Label htmlFor="music-link">Music/reference link</Label><TextInput id="music-link" name="musicLink" type="url" /></FieldGroup>
      </div>
      <FieldGroup><Label htmlFor="participants">Participant names and ages</Label><TextArea id="participants" name="participantDetails" /></FieldGroup>
      <FieldGroup><Label htmlFor="description">Describe your proposed contribution *</Label><TextArea id="description" name="description" required /></FieldGroup>
      <FieldGroup><Label htmlFor="requirements">Equipment, stage or other requirements</Label><TextArea id="requirements" name="requirements" /></FieldGroup>
      <label className="flex gap-3 rounded-md border border-indigoInk/10 bg-lotus-50 p-4"><input type="checkbox" checked={meeting} onChange={(e) => setMeeting(e.target.checked)} className="mt-1 size-5" /><span><strong className="block text-indigoInk">Request a 30-minute online meeting with the Core Committee</strong><span className="text-sm text-indigoInk/60">Optional. The committee will review and confirm manually.</span></span></label>
      {meeting ? <div className="grid gap-4 rounded-md border border-turmeric/30 bg-turmeric/10 p-4">
        <FieldGroup><Label htmlFor="meeting-purpose">Meeting purpose *</Label><select id="meeting-purpose" name="meetingPurpose" required className="min-h-11 rounded-md border border-indigoInk/15 bg-white px-3"><option value="">Select purpose</option><option>Performance discussion</option><option>Volunteering</option><option>Sponsorship</option><option>Food/community stall</option><option>Other</option></select></FieldGroup>
        <div className="grid gap-4 sm:grid-cols-3"><MeetingTime id="meeting-1" name="meetingPreference1" label="Preferred time 1 *" required /><MeetingTime id="meeting-2" name="meetingPreference2" label="Preferred time 2 *" required /><MeetingTime id="meeting-3" name="meetingPreference3" label="Preferred time 3" /></div>
      </div> : null}
      <p className="text-xs leading-5 text-indigoInk/55">EOI closes 20 July 2026. Submissions cannot be edited after submission. For help: mithilaculturalsoc@gmail.com</p>
      {status ? <p className="rounded-md bg-lotus-50 p-4 text-sm font-semibold text-lotus-700">{status}</p> : null}
      <button type="submit" disabled={submitting} className="min-h-12 rounded-md bg-lotus-500 px-6 font-semibold text-white hover:bg-lotus-700 disabled:opacity-60">Submit expression of interest</button>
    </form>
  );
}

function Check({ name, value, label }: { name: string; value: string; label: string }) {
  return <label className="flex items-center gap-2 rounded-md border border-indigoInk/10 p-3 text-sm text-indigoInk"><input type="checkbox" name={name} value={value} className="size-4" />{label}</label>;
}
function MeetingTime({ id, name, label, required }: { id: string; name: string; label: string; required?: boolean }) {
  return <FieldGroup><Label htmlFor={id}>{label}</Label><TextInput id={id} name={name} type="datetime-local" required={required} /></FieldGroup>;
}
