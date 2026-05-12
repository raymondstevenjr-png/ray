import type { ProviderResult } from "@/lib/types"

interface ProviderRowProps {
  result: ProviderResult
  currencySymbol: string
  affiliateOverride?: string
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const full = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)

  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} className="w-3.5 h-3.5 text-gold fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalf && (
        <svg className="w-3.5 h-3.5 text-gold fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} className="w-3.5 h-3.5 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">
        {rating.toFixed(1)} ({reviews.toLocaleString()})
      </span>
    </span>
  )
}

export default function ProviderRow({ result, currencySymbol, affiliateOverride }: ProviderRowProps) {
  const isBestValue = result.rank === 1
  const affiliateUrl = affiliateOverride ?? result.affiliate

  return (
    <tr
      className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
        isBestValue ? "bg-amber-50 border-l-4 border-l-gold" : ""
      }`}
    >
      {/* Rank */}
      <td className="py-4 px-3 text-center">
        {isBestValue ? (
          <div className="flex flex-col items-center gap-1">
            <span className="bg-gold text-navy text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
              Best Value
            </span>
            <span className="text-gold font-bold">#{result.rank}</span>
          </div>
        ) : (
          <span className="text-gray-400 font-medium">#{result.rank}</span>
        )}
      </td>

      {/* Provider name */}
      <td className="py-4 px-3">
        <span className="font-semibold text-navy">{result.name}</span>
      </td>

      {/* Fee */}
      <td className="py-4 px-3 text-sm text-gray-600 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <span>{result.fee}</span>
          {result.feeNote && (
            <div className="relative group">
              <svg className="w-3.5 h-3.5 text-gray-400 cursor-help flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 hidden group-hover:block w-56 bg-navy text-white text-xs rounded-lg px-3 py-2 shadow-xl pointer-events-none">
                {result.feeNote}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy" />
              </div>
            </div>
          )}
        </div>
        {result.feeAmount > 0 && (
          <div className="text-xs text-gray-400">
            = {currencySymbol}{result.feeAmount.toFixed(2)}
          </div>
        )}
      </td>

      {/* Recipient SLE */}
      <td className="py-4 px-3">
        <span className={`font-bold text-lg ${isBestValue ? "text-gold" : "text-navy"}`}>
          {result.recipientSle.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          <span className="text-sm font-normal text-gray-500">SLE</span>
        </span>
      </td>

      {/* Rate */}
      <td className="py-4 px-3 text-sm text-gray-600 whitespace-nowrap">
        {result.rate.toFixed(2)} SLE/{currencySymbol === "$" ? "USD" : currencySymbol === "£" ? "GBP" : "CAD"}
      </td>

      {/* Delivery */}
      <td className="py-4 px-3 text-sm text-gray-600 whitespace-nowrap">
        {result.delivery}
      </td>

      {/* Method */}
      <td className="py-4 px-3 text-sm text-gray-600 whitespace-nowrap hidden md:table-cell">
        {result.method}
      </td>

      {/* Rating */}
      <td className="py-4 px-3 hidden lg:table-cell">
        <StarRating rating={result.rating} reviews={result.reviews} />
      </td>

      {/* CTA */}
      <td className="py-4 px-3">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-block bg-gold hover:bg-gold-light text-navy font-semibold text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Send Money →
        </a>
      </td>
    </tr>
  )
}
