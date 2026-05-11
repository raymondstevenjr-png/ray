import Link from "next/link"
import type { BlogArticle } from "@/lib/types"

interface BlogCardProps {
  article: BlogArticle
}

export default function BlogCard({ article }: BlogCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      {/* Header bar */}
      <div className="h-2 bg-gradient-to-r from-navy to-gold" />

      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <time dateTime={article.date}>{formattedDate}</time>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="font-playfair text-xl font-bold text-navy mb-3 leading-tight group-hover:text-gold transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed mb-5">
          {article.excerpt}
        </p>

        {/* CTA */}
        <Link
          href={`/blog/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-navy font-semibold text-sm hover:text-gold transition-colors"
        >
          Read More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
