import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import { articles } from "@/lib/blog"

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug)
  if (!article) return { title: "Article Not Found" }
  return {
    title: `${article.title} – RemitSL`,
    description: article.excerpt,
  }
}

export default function BlogArticlePage({ params }: PageProps) {
  const article = articles.find((a) => a.slug === params.slug)

  if (!article) notFound()

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const otherArticles = articles.filter((a) => a.slug !== params.slug)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-navy text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="text-gray-400 hover:text-gold text-sm flex items-center gap-1 mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <div className="flex items-center gap-3 text-gray-400 text-sm mb-4">
            <time dateTime={article.date}>{formattedDate}</time>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold leading-tight text-white">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-navy max-w-none
            prose-headings:font-playfair prose-headings:text-navy
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-strong:text-navy
            prose-ul:text-gray-600
            prose-li:my-1
            prose-a:text-gold prose-a:no-underline hover:prose-a:underline
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-navy prose-code:text-sm
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-navy rounded-2xl p-6 text-center">
            <h3 className="font-playfair text-2xl font-bold text-white mb-3">
              Compare providers now
            </h3>
            <p className="text-gray-300 text-sm mb-5">
              See exactly how much SLE your family receives from each provider — live.
            </p>
            <Link
              href="/#compare"
              className="inline-block bg-gold hover:bg-gold-light text-navy font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Compare Rates →
            </Link>
          </div>

          {/* Other articles */}
          {otherArticles.length > 0 && (
            <div className="mt-12">
              <h3 className="font-playfair text-xl font-bold text-navy mb-4">
                More guides
              </h3>
              <div className="space-y-3">
                {otherArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="flex items-start gap-3 group p-4 rounded-xl border border-gray-200 hover:border-gold hover:bg-gold/5 transition-all"
                  >
                    <div className="w-1 bg-gold rounded-full self-stretch flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-navy group-hover:text-gold transition-colors text-sm leading-snug mb-1">
                        {a.title}
                      </p>
                      <p className="text-gray-400 text-xs">{a.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
