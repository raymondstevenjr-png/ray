export type Currency = "USD" | "GBP" | "CAD"
export type Corridor = "US" | "UK" | "CA"

export interface Provider {
  name: string
  fee: string
  feeCalc: (amount: number) => number
  rate: number          // SLE per send-currency (baseline/static)
  delivery: string
  method: string
  rating: number
  reviews: number
  affiliate: string
  available?: boolean
  feeNote?: string
}

export interface ProviderResult extends Provider {
  feeAmount: number
  recipientSle: number
  effectiveRate: number  // recipientSle / sendAmount
  rank: number
}

export interface RateAlert {
  email: string
  target_rate: number
  country: string
  currency: Currency
  created_at?: string
  active?: boolean
}

export interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  content: string
}
