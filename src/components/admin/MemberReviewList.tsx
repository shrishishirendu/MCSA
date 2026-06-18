"use client";

import { useState } from "react";
import type { MemberSummary } from "@/types/content";
import { readJsonResponse } from "@/lib/response";

function formatDate(value?: string | null) {
  if (!value) return "Not assigned";
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export function MemberReviewList({
  initialMembers
}: {
  initialMembers: MemberSummary[];
}) {
  const [members, setMembers] = useState(initialMembers);
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function reviewMember(
    member: MemberSummary,
    status: "approved" | "rejected"
  ) {
    setBusyId(member.id);
    setMessage("");

    const response = await fetch(`/api/admin/members/${member.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const result = await readJsonResponse<{
      member?: {
        membership_status: "approved" | "rejected";
        joined_at: string | null;
      };
    }>(response);

    if (!response.ok || !result.member) {
      setMessage(result.error ?? "The member could not be updated.");
      setBusyId(null);
      return;
    }

    setMembers((current) =>
      current.map((item) =>
        item.id === member.id
          ? {
              ...item,
              membershipStatus: result.member!.membership_status,
              joinedAt: result.member!.joined_at
            }
          : item
      )
    );
    setMessage(
      status === "approved"
        ? `${member.name} has been approved.`
        : `${member.name} has been rejected.`
    );
    setBusyId(null);
  }

  return (
    <div>
      {message ? (
        <p className="mb-4 rounded-md border border-lotus-100 bg-lotus-50 px-4 py-3 text-sm font-semibold text-lotus-700">
          {message}
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {members.map((member) => {
          const isOpen = openId === member.id;
          const isPending = member.membershipStatus === "pending";

          return (
            <article
              key={member.id}
              className="rounded-lg border border-indigoInk/10 bg-white shadow-soft"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : member.id)}
                className="flex w-full items-start justify-between gap-4 p-6 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lotus-500"
                aria-expanded={isOpen}
              >
                <span>
                  <span
                    className={`text-sm font-semibold ${
                      member.membershipStatus === "approved" ||
                      member.membershipStatus === "active"
                        ? "text-leaf"
                        : member.membershipStatus === "rejected"
                          ? "text-indigoInk/50"
                          : "text-lotus-700"
                    }`}
                  >
                    {member.membershipStatus}
                  </span>
                  <span className="mt-4 block text-xl font-bold text-indigoInk">
                    {member.name}
                  </span>
                  <span className="mt-2 block text-sm text-indigoInk/65">
                    {member.email}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-xl font-bold text-lotus-700"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen ? (
                <div className="border-t border-indigoInk/10 px-6 pb-6 pt-5">
                  <dl className="grid gap-4 text-sm sm:grid-cols-2">
                    <Detail label="Phone" value={member.phone || "Not provided"} />
                    <Detail
                      label="Membership type"
                      value={member.membershipType || "Annual"}
                    />
                    <Detail
                      label="Payment declared"
                      value={member.paymentConfirmed ? "Yes" : "No"}
                    />
                    <Detail
                      label="Application date"
                      value={formatDate(member.createdAt)}
                    />
                    <Detail
                      label="Date joined"
                      value={formatDate(member.joinedAt)}
                    />
                  </dl>
                  <div className="mt-4 rounded-md bg-lotus-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigoInk/50">
                      Application notes
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-indigoInk/70">
                      {member.notes || "No notes were supplied."}
                    </p>
                  </div>

                  {isPending ? (
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={busyId === member.id}
                        onClick={() => reviewMember(member, "approved")}
                        className="min-h-11 rounded-md bg-leaf px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-leaf/90 disabled:cursor-wait disabled:opacity-60"
                      >
                        Approve application
                      </button>
                      <button
                        type="button"
                        disabled={busyId === member.id}
                        onClick={() => reviewMember(member, "rejected")}
                        className="min-h-11 rounded-md border border-lotus-500 px-5 py-2.5 text-sm font-semibold text-lotus-700 transition hover:bg-lotus-50 disabled:cursor-wait disabled:opacity-60"
                      >
                        Reject application
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-indigoInk/45">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-indigoInk">{value}</dd>
    </div>
  );
}
