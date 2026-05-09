import type { Call } from "@/lib/types";
import CallRow from "./CallRow";

interface Props {
  calls: Call[];
  title?: string;
  showViewAll?: boolean;
}

export default function CallTable({ calls, title, showViewAll }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {(title || showViewAll) && (
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          {title && (
            <h2 className="font-bold text-gray-900">{title}</h2>
          )}
          {showViewAll && (
            <a
              href="/dashboard/calls"
              className="text-sm text-brand-green font-medium hover:underline"
            >
              View all →
            </a>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Date &amp; time
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Caller
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Number
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Outcome
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {calls.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-400 text-sm">
                  No calls yet. Your AI receptionist is ready and waiting!
                </td>
              </tr>
            ) : (
              calls.map((call) => <CallRow key={call.id} call={call} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
