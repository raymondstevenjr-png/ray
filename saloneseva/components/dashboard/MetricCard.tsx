interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  highlight?: boolean;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  highlight,
}: MetricCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 ${
        highlight
          ? "text-white"
          : "bg-white border border-gray-100"
      }`}
      style={highlight ? { backgroundColor: "#1a5c2e" } : {}}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trend.positive
                ? highlight
                  ? "bg-white/20 text-white"
                  : "bg-green-100 text-brand-green"
                : "bg-red-100 text-red-600"
            }`}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
      <div
        className={`text-3xl font-bold mb-1 ${
          highlight ? "text-white" : "text-gray-900"
        }`}
      >
        {value}
      </div>
      <div
        className={`text-sm font-medium ${
          highlight ? "text-green-200" : "text-gray-500"
        }`}
      >
        {title}
      </div>
      {subtitle && (
        <div
          className={`text-xs mt-1 ${
            highlight ? "text-green-300" : "text-gray-400"
          }`}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}
