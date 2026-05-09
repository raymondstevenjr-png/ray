"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: "#1a5c2e" }}
            >
              SS
            </div>
            <span className="font-bold text-gray-900 text-lg">SaloneSeva</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-brand-green font-medium text-sm">
              How it works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-brand-green font-medium text-sm">
              Pricing
            </a>
            <Link href="/dashboard" className="text-gray-600 hover:text-brand-green font-medium text-sm">
              Dashboard
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Sign in
            </Link>
            <Link
              href="/onboard"
              className="btn-primary text-sm px-5 py-2.5 rounded-lg"
            >
              Start free trial
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block w-full h-0.5 bg-current transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-full h-0.5 bg-current transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block w-full h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-3">
            <a href="#how-it-works" className="block py-2 text-gray-600 font-medium" onClick={() => setOpen(false)}>
              How it works
            </a>
            <a href="#pricing" className="block py-2 text-gray-600 font-medium" onClick={() => setOpen(false)}>
              Pricing
            </a>
            <Link href="/dashboard" className="block py-2 text-gray-600 font-medium" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
            <Link href="/onboard" className="btn-primary block text-center py-3 rounded-lg mt-2">
              Start free trial
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
