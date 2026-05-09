import { MOCK_APPOINTMENTS } from "@/lib/mockData";

function formatDateTime(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-600",
  completed: "bg-gray-100 text-gray-500",
};

export default function AppointmentsPage() {
  const upcoming = MOCK_APPOINTMENTS.filter(
    (a) => a.appointment_datetime && new Date(a.appointment_datetime) > new Date()
  );

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <p className="text-gray-500 mt-1">
          Appointments booked by your AI receptionist.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold text-gray-900">
            {upcoming.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Upcoming</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold" style={{ color: "#1a5c2e" }}>
            {MOCK_APPOINTMENTS.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">This month</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <div className="text-3xl font-bold" style={{ color: "#c9952a" }}>
            $3,720
          </div>
          <div className="text-sm text-gray-500 mt-1">Est. revenue</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Upcoming appointments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Date &amp; time
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {upcoming.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {formatDateTime(apt.appointment_datetime)}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {apt.caller_name || "Unknown"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {apt.caller_number || "—"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {apt.service_requested || "—"}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        STATUS_STYLES[apt.status] || STATUS_STYLES.pending
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
