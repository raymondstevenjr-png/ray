"use client";

import { useState } from "react";
import type { Call } from "@/lib/types";

interface Props {
  call: Call;
}

const OUTCOME_LABELS: Record<string, { label: string; color: string }> = {
  appointment_booked: {
    label: "Appointment booked",
    color: "bg-green-100 text-green-700",
  },
  message_taken: { label: "Message taken", color: "bg-blue-100 text-blue-700" },
  inquiry_answered: {
    label: "Inquiry answered",
    color: "bg-purple-100 text-purple-700",
  },
  voicemail: { label: "Voicemail", color: "bg-gray-100 text-gray-600" },
  other: { label: "Other", color: "bg-gray-100 text-gray-600" },
};

function formatDuration(seconds: number | null) {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function CallRow({ call }: Props) {
  const [expanded, setExpanded] = useState(false);
  const outcome = OUTCOME_LABELS[call.outcome || "other"];

  return (
    <>
      <tr
        className="hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
          {formatDateTime(call.created_at)}
        </td>
        <td className="px-4 py-4 text-sm font-medium text-gray-900">
          {call.caller_name || (
            <span className="text-gray-400 font-normal">Unknown</span>
          )}
        </td>
        <td className="px-4 py-4 text-sm text-gray-600">
          {call.caller_number || "—"}
        </td>
        <td className="px-4 py-4 text-sm text-gray-600">
          {formatDuration(call.call_duration)}
        </td>
        <td className="px-4 py-4">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${outcome.color}`}
          >
            {outcome.label}
          </span>
        </td>
        <td className="px-4 py-4 text-right">
          <span className="text-gray-400 text-sm">{expanded ? "▲" : "▼"}</span>
        </td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan={6} className="bg-gray-50 px-4 py-5">
            <div className="grid md:grid-cols-2 gap-6">
              {call.ai_summary && (
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    AI Summary
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {call.ai_summary}
                  </p>
                </div>
              )}
              {call.transcript && (
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Full Transcript
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 text-xs text-gray-600 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto font-mono">
                    {call.transcript}
                  </div>
                </div>
              )}
            </div>
            {call.appointment_booked && call.appointment_datetime && (
              <div className="mt-4 flex items-center gap-2 text-sm text-brand-green font-semibold">
                <span>📅</span>
                Appointment booked:{" "}
                {new Date(call.appointment_datetime).toLocaleString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
