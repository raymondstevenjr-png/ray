import MetricCard from "@/components/dashboard/MetricCard";
import CallTable from "@/components/dashboard/CallTable";
import { MOCK_CALLS, MOCK_METRICS } from "@/lib/mockData";

export default function DashboardOverview() {
  const recentCalls = MOCK_CALLS.slice(0, 10);

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-500 mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Status banner */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8 flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-lg">✓</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-green-900">
            Your AI receptionist is active
          </div>
          <div className="text-sm text-green-700">
            Answering calls at (202) 555-0100 · 14 days remaining in free trial
          </div>
        </div>
        <a
          href="/dashboard/settings"
          className="text-sm text-green-700 font-medium hover:underline flex-shrink-0"
        >
          Edit settings
        </a>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total calls this month"
          value={MOCK_METRICS.totalCallsThisMonth}
          icon="📞"
          trend={{ value: "12%", positive: true }}
          highlight
        />
        <MetricCard
          title="Appointments booked"
          value={MOCK_METRICS.appointmentsBooked}
          icon="📅"
          trend={{ value: "8%", positive: true }}
          subtitle="by your AI"
        />
        <MetricCard
          title="Missed calls handled"
          value={MOCK_METRICS.missedCallsHandled}
          icon="🤖"
          subtitle="would have been voicemail"
        />
        <MetricCard
          title="Revenue saved"
          value={`$${MOCK_METRICS.estimatedRevenueSaved.toLocaleString()}`}
          icon="💰"
          trend={{ value: "23%", positive: true }}
          subtitle="estimated this month"
        />
      </div>

      {/* Recent calls */}
      <CallTable
        calls={recentCalls}
        title="Recent calls"
        showViewAll={true}
      />
    </div>
  );
}
