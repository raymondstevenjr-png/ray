import type { Metadata } from "next"
import BlogCard from "@/components/BlogCard"
import { articles } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog – RemitSL | Remittance Guides for Sierra Leoneans",
  description:
    "In-depth guides on sending money to Sierra Leone — cheapest providers, scam warnings, and exchange rate education.",
}

export default function BlogPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-4xl font-bold mb-4">
            Remittance Guides
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Honest, practical guides to help Sierra Leoneans abroad send more money home —
            and keep it safe.
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>

          {/* Topics notice */}
          <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6 text-center">
            <h3 className="font-playfair text-xl font-bold text-navy mb-2">
              More guides coming soon
            </h3>
            <p className="text-gray-500 text-sm">
              Topics in progress: sending from Canada, mobile money setup in Sierra Leone,
              understanding SLE vs SLL, and how to send for business purposes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
