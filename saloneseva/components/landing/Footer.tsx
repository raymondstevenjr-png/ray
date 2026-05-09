import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: "#1a5c2e" }}
              >
                SS
              </div>
              <span className="font-bold text-lg">SaloneSeva</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Your business never misses a call again. AI-powered receptionist
              built for Sierra Leonean small business owners in the United
              States.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/#how-it-works" className="text-gray-400 hover:text-white transition-colors">
              How it works
            </Link>
            <Link href="/#pricing" className="text-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            SaloneSeva — Your business never misses a call again
          </p>
          <p className="text-gray-500 text-sm">
            © 2026 SaloneSeva. Built for Sierra Leonean businesses in America.
          </p>
        </div>
      </div>
    </footer>
  );
}
