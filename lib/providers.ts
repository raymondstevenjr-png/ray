import type { Provider, ProviderResult, Corridor } from "./types"

// Baseline mid-market rates (SLE per 1 unit of send currency)
export const BASELINE_MID_MARKET: Record<string, number> = {
  USD: 22.93,
  GBP: 29.05,
  CAD: 16.88,
}

// US corridor providers (USD baseline)
const US_PROVIDERS: Provider[] = [
  {
    name: "Wave",
    fee: "1%",
    feeCalc: (a: number) => a * 0.01,
    rate: 22.93,
    delivery: "Minutes",
    method: "Mobile Money",
    rating: 4.8,
    reviews: 12400,
    affiliate:
      "https://www.wave.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
  },
  {
    name: "Sendwave",
    fee: "0%",
    feeCalc: () => 0,
    rate: 22.52,
    delivery: "Minutes",
    method: "Mobile Money",
    rating: 4.6,
    reviews: 8200,
    affiliate:
      "https://www.sendwave.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
  },
  {
    name: "Wise",
    fee: "0.6% + $0.50",
    feeCalc: (a: number) => a * 0.006 + 0.5,
    rate: 22.47,
    delivery: "1–2 days",
    method: "Bank Transfer",
    rating: 4.8,
    reviews: 14800,
    affiliate:
      "https://wise.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
  },
  {
    name: "Remitly",
    fee: "$3.99 (<$500) / 1.5%",
    feeCalc: (a: number) => (a < 500 ? 3.99 : a * 0.015),
    rate: 22.36,
    delivery: "1–3 hours",
    method: "Bank or Cash",
    rating: 4.7,
    reviews: 20400,
    affiliate:
      "https://www.remitly.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
  },
  {
    name: "WorldRemit",
    fee: "$4.99 (<$200) / 2%",
    feeCalc: (a: number) => (a < 200 ? 4.99 : a * 0.02),
    rate: 22.24,
    delivery: "Same day",
    method: "Bank or Cash",
    rating: 4.5,
    reviews: 11900,
    affiliate:
      "https://www.worldremit.com/en?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
  },
  {
    name: "Ria",
    // Ria Money Transfer fees verified May 2026
    // Cash pickup: $5.00 | Bank deposit: $3.00 | Mobile: $0.99
    // Verify current fees at: riamoneytransfer.com
    fee: "$5.00",
    feeCalc: () => 5.00,
    rate: 22.13,
    delivery: "Minutes",
    method: "Cash Pickup",
    rating: 4.3,
    reviews: 6700,
    affiliate:
      "https://www.riamoneytransfer.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
    feeNote: "Cash pickup $5.00 · Bank deposit $3.00 · Mobile $0.99",
  },
  {
    name: "Western Union",
    fee: "3% + $5",
    feeCalc: (a: number) => a * 0.03 + 5,
    rate: 21.78,
    delivery: "Minutes",
    method: "Cash Pickup",
    rating: 4.1,
    reviews: 18900,
    affiliate:
      "https://www.westernunion.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
  },
  {
    name: "MoneyGram",
    fee: "2.5% + $4",
    feeCalc: (a: number) => a * 0.025 + 4,
    rate: 21.67,
    delivery: "Minutes",
    method: "Cash Pickup",
    rating: 4.0,
    reviews: 15300,
    affiliate:
      "https://www.moneygram.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
  },
]

// Rate factors relative to USD baseline (providerRate / 22.93)
// Apply these to GBP/CAD mid-markets to get corridor-specific rates
function scaleProviders(
  providers: Provider[],
  targetMidMarket: number,
  baseMidMarket: number,
  currencySymbol: string,
  feeLabels?: Record<string, string>,
  feeCalcs?: Record<string, (a: number) => number>
): Provider[] {
  return providers.map((p) => {
    const factor = p.rate / baseMidMarket
    const scaledRate = parseFloat((factor * targetMidMarket).toFixed(4))
    return {
      ...p,
      rate: scaledRate,
      fee: feeLabels?.[p.name] ?? p.fee.replace(/\$/g, currencySymbol),
      feeCalc: feeCalcs?.[p.name] ?? p.feeCalc,
    }
  })
}

// Only these providers serve UK and CA corridors
const CORRIDOR_PROVIDERS = ["Wave", "Sendwave", "Wise", "Remitly", "WorldRemit"]

// GBP-specific fee labels and calculations (same structure, different currency symbol)
const GBP_FEE_LABELS: Record<string, string> = {
  Wave: "1%",
  Sendwave: "0%",
  Wise: "0.6% + £0.50",
  Remitly: "£3.99 (<£500) / 1.5%",
  WorldRemit: "£4.99 (<£200) / 2%",
}

const GBP_FEE_CALCS: Record<string, (a: number) => number> = {
  Wave: (a) => a * 0.01,
  Sendwave: () => 0,
  Wise: (a) => a * 0.006 + 0.5,
  Remitly: (a) => (a < 500 ? 3.99 : a * 0.015),
  WorldRemit: (a) => (a < 200 ? 4.99 : a * 0.02),
}

const CAD_FEE_LABELS: Record<string, string> = {
  Wave: "1%",
  Sendwave: "0%",
  Wise: "0.6% + C$0.50",
  Remitly: "C$3.99 (<C$500) / 1.5%",
  WorldRemit: "C$4.99 (<C$200) / 2%",
}

const CAD_FEE_CALCS: Record<string, (a: number) => number> = {
  Wave: (a) => a * 0.01,
  Sendwave: () => 0,
  Wise: (a) => a * 0.006 + 0.5,
  Remitly: (a) => (a < 500 ? 3.99 : a * 0.015),
  WorldRemit: (a) => (a < 200 ? 4.99 : a * 0.02),
}

// Affiliate URLs for GBP/CAD (same base affiliate, different campaign label is fine)
const UK_AFFILIATES: Record<string, string> = {
  Wave: "https://www.wave.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
  Sendwave:
    "https://www.sendwave.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
  Wise: "https://wise.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
  Remitly:
    "https://www.remitly.com/?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
  WorldRemit:
    "https://www.worldremit.com/en?utm_source=remitsl&utm_medium=affiliate&utm_campaign=sierra-leone-comparison",
}

const UK_BASE_PROVIDERS = US_PROVIDERS.filter((p) =>
  CORRIDOR_PROVIDERS.includes(p.name)
)

const UK_PROVIDERS: Provider[] = scaleProviders(
  UK_BASE_PROVIDERS,
  BASELINE_MID_MARKET.GBP,
  BASELINE_MID_MARKET.USD,
  "£",
  GBP_FEE_LABELS,
  GBP_FEE_CALCS
).map((p) => ({ ...p, affiliate: UK_AFFILIATES[p.name] ?? p.affiliate }))

const CA_BASE_PROVIDERS = US_PROVIDERS.filter((p) =>
  CORRIDOR_PROVIDERS.includes(p.name)
)

const CA_PROVIDERS: Provider[] = scaleProviders(
  CA_BASE_PROVIDERS,
  BASELINE_MID_MARKET.CAD,
  BASELINE_MID_MARKET.USD,
  "C$",
  CAD_FEE_LABELS,
  CAD_FEE_CALCS
).map((p) => ({ ...p, affiliate: UK_AFFILIATES[p.name] ?? p.affiliate }))

export function getProviders(corridor: Corridor): Provider[] {
  switch (corridor) {
    case "US":
      return US_PROVIDERS
    case "UK":
      return UK_PROVIDERS
    case "CA":
      return CA_PROVIDERS
    default:
      return US_PROVIDERS
  }
}

export function calculateResults(
  providers: Provider[],
  sendAmount: number,
  liveMidMarket?: number,
  baselineMidMarket?: number
): ProviderResult[] {
  const results: ProviderResult[] = providers.map((provider) => {
    let providerRate = provider.rate
    // Scale provider rate to live mid-market if available
    if (liveMidMarket && baselineMidMarket && baselineMidMarket > 0) {
      const factor = provider.rate / baselineMidMarket
      providerRate = factor * liveMidMarket
    }

    const feeAmount = parseFloat(provider.feeCalc(sendAmount).toFixed(2))
    const netAmount = sendAmount - feeAmount
    const recipientSle = parseFloat((netAmount * providerRate).toFixed(2))
    const effectiveRate = sendAmount > 0 ? recipientSle / sendAmount : 0

    return {
      ...provider,
      rate: providerRate,
      feeAmount,
      recipientSle,
      effectiveRate,
      rank: 0,
    }
  })

  // Sort descending by recipientSle
  results.sort((a, b) => b.recipientSle - a.recipientSle)

  // Assign ranks
  results.forEach((r, i) => {
    r.rank = i + 1
  })

  return results
}
