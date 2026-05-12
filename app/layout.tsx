import type { Metadata } from "next"
import { Playfair_Display, DM_Sans } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import ChatDrawer from "@/components/ChatDrawer"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "RemitSL – Best Way to Send Money to Sierra Leone",
  description:
    "Compare remittance providers to Sierra Leone. Find the cheapest way to send money home with live exchange rates, fee comparisons, and honest provider reviews.",
  keywords:
    "send money Sierra Leone, remittance Sierra Leone, cheapest money transfer Sierra Leone, Wave Sendwave Wise comparison",
  openGraph: {
    title: "RemitSL – Best Way to Send Money to Sierra Leone",
    description:
      "Compare 8 providers side by side. Find the cheapest way to send money home to Sierra Leone. Updated live.",
    type: "website",
    locale: "en_US",
  },
  other: {
    "impact-site-verification": "7c5b5ab9-b504-4689-a2cd-a4f6f71470c8",
    "fo-verify": "4ebd1cfc-75d9-4b68-896d-6062a760a6f6",
  },
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/providers", label: "Providers" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/alerts", label: "Alerts" },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <meta name="fo-verify" content="4ebd1cfc-75d9-4b68-896d-6062a760a6f6" />
      </head>
      <body className="font-dm-sans antialiased bg-white text-gray-900 min-h-screen flex flex-col">
        {/* Top Sierra Leone flag bar */}
        <div className="flex h-2 w-full" aria-hidden="true">
          <div className="flex-1 bg-flag-green" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-flag-blue" />
        </div>

        {/* Navigation */}
        <nav className="bg-navy sticky top-0 z-40 shadow-md">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="font-playfair text-2xl font-bold text-gold hover:text-gold-light transition-colors"
            >
              RemitSL
            </Link>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-gold text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#compare"
                className="bg-gold hover:bg-gold-light text-navy text-sm font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Compare Now
              </Link>
            </div>

            {/* Mobile menu — simplified */}
            <div className="flex md:hidden items-center gap-3">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-gold text-xs font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-navy text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="font-playfair text-2xl font-bold text-gold mb-3">
                  RemitSL
                </div>
                <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                  Helping Sierra Leoneans in the US, UK, and Canada send more money home by comparing remittance providers honestly and transparently.
                </p>
              </div>

              {/* Pages */}
              <div>
                <h4 className="font-semibold text-white mb-3 text-sm">Pages</h4>
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-gold text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/credit-cards"
                      className="text-gray-300 hover:text-gold text-sm transition-colors"
                    >
                      Credit Cards
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-semibold text-white mb-3 text-sm">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Independent comparison site</li>
                  <li>Affiliate links disclose our compensation</li>
                  <li>Rates are indicative only</li>
                  <li>Always verify before sending</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-gray-400">
              <p>© 2026 RemitSL. Not affiliated with any provider.</p>
              <p>Built with care for the Sierra Leonean diaspora.</p>
            </div>
          </div>
        </footer>

        {/* Bottom Sierra Leone flag bar */}
        <div className="flex h-2 w-full" aria-hidden="true">
          <div className="flex-1 bg-flag-green" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-flag-blue" />
        </div>

        {/* Chat drawer — mounted globally */}
        <ChatDrawer />
      </body>
    </html>
  )
}
