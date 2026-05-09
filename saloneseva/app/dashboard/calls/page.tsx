"use client";

import { useState } from "react";
import CallTable from "@/components/dashboard/CallTable";
import { MOCK_CALLS } from "@/lib/mockData";
import type { Call } from "@/lib/types";

const OUTCOMES = [
  { value: "", label: "All outcomes" },
  { value: "appointment_booked", label: "Appointment booked" },
  { value: "message_taken", label: "Message taken" },
  { value: "inquiry_answered", label: "Inquiry answered" },
  { value: "other", label: "Other" },
];

export default function CallLogPage() {
  const [search, setSearch] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("");

  const filtered = MOCK_CALLS.filter((call: Call) => {
    const matchesSearch =
      !search ||
      call.caller_name?.toLowerCase().includes(search.toLowerCase()) ||
      call.caller_number?.includes(search) ||
      call.ai_summary?.toLowerCase().includes(search.toLowerCase());
    const matchesOutcome = !outcomeFilter || call.outcome === outcomeFilter;
    return matchesSearch && matchesOutcome;
  });

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Call log</h1>
        <p className="text-gray-500 mt-1">
          Every call your AI has handled. Click a row to see the full
          transcript.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, number, or summary..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 bg-white"
          />
        </div>
        <select
          value={outcomeFilter}
          onChange={(e) => setOutcomeFilter(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 bg-white"
        >
          {OUTCOMES.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Stats row */}
      <div className="flex gap-4 mb-6 text-sm text-gray-500">
        <span>
          <span className="font-bold text-gray-900">{filtered.length}</span>{" "}
          calls shown
        </span>
        <span>·</span>
        <span>
          <span className="font-bold text-gray-900">
            {filtered.filter((c) => c.appointment_booked).length}
          </span>{" "}
          appointments booked
        </span>
      </div>

      <CallTable calls={filtered} />
    </div>
  );
}
