"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/calls", label: "Call log", icon: "📞" },
  { href: "/dashboard/appointments", label: "Appointments", icon: "📅" },
  { href: "/dashboard/settings", label: "AI settings", icon: "⚙️" },
  { href: "/dashboard/billing", label: "Billing", icon: "💳" },
  { href: "/dashboard/support", label: "Support", icon: "💬" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 min-h-screen sticky top-0">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: "#1a5c2e" }}
            >
              SS
            </div>
            <span className="font-bold text-gray-900">SaloneSeva</span>
          </Link>
        </div>

        {/* Business name */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="bg-green-50 rounded-xl p-3">
            <div className="text-xs text-brand-green font-semibold uppercase tracking-wider mb-1">
              Your business
            </div>
            <div className="font-semibold text-gray-900 text-sm">
              Aminata Beauty
            </div>
            <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
              AI active · (202) 555-0100
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-green text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600"
          >
            ← Back to website
          </Link>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40">
        <div className="grid grid-cols-5 h-16">
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 text-xs ${
                  isActive ? "text-brand-green" : "text-gray-400"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
