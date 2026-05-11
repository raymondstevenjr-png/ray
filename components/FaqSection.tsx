"use client"

import { useState } from "react"

const faqs = [
  {
    question: "Which service sends the most SLE per dollar?",
    answer:
      "Based on current rates, Wave and Sendwave consistently deliver the most SLE per dollar with zero or minimal fees. For $200, Sendwave sends approximately 4,504 SLE with no fee. Wave charges a 1% fee but often offers the highest exchange rate, making it the best option for larger amounts over $300.",
  },
  {
    question: "Is Sendwave safe to use for Sierra Leone?",
    answer:
      "Yes. Sendwave (now part of Wave) is licensed, regulated, and used by hundreds of thousands of people across Africa and the diaspora. It partners with Orange Money and Africell for mobile money delivery in Sierra Leone. The company is registered in multiple US states and complies with FinCEN regulations. Your transfers are protected.",
  },
  {
    question: "What is the cheapest way to send money to Freetown?",
    answer:
      "Sendwave for amounts under $500 (zero fees), or Wave for larger amounts (1% fee but best exchange rate). Both deliver via mobile money to Orange Money and Africell accounts in minutes. Avoid Western Union and MoneyGram for Sierra Leone — their combined fees and poor exchange rates cost 3–5 times more than the best alternatives.",
  },
  {
    question: "How do I avoid remittance scams targeting Sierra Leoneans?",
    answer:
      "Never send money to someone you have not met in person, even if they claim to be family. No legitimate business asks for upfront fees before delivering a service. Be cautious of urgent requests — scammers create panic to bypass your judgment. If a family member says they are in an emergency, call them directly on a number you already have saved. If you feel pressured to send quickly, treat that as a red flag.",
  },
  {
    question: "What is the difference between SLE and SLL?",
    answer:
      "Sierra Leone redenominated its currency in 2022. 1 SLE (New Leone) equals 1,000 SLL (old Leone). All rates on this site are quoted in SLE (new Leone). When you see a rate like 22.93 SLE per USD, that is the new currency. If an older service or quote uses SLL, multiply by 1,000 to convert — or divide the SLL amount by 1,000 to get SLE.",
  },
  {
    question: "Is Wave available in Sierra Leone?",
    answer:
      "Yes, Wave launched in Sierra Leone and partners with local mobile money networks. It offers some of the best rates with a low 1% fee and minute-speed delivery. Recipients need a mobile money account with a supported network. Wave is available for senders in the US, and the app is free to download on iOS and Android.",
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-playfair text-3xl font-bold text-navy text-center mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Everything you need to know about sending money to Sierra Leone.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-navy group-hover:text-gold transition-colors pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gold shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndex === i && (
                <div className="px-5 pb-5 pt-1">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            Still have questions?{" "}
            <span className="text-navy font-medium">
              Use the chat button in the bottom-right corner
            </span>{" "}
            to ask our AI assistant anything about sending money to Sierra Leone.
          </p>
        </div>
      </div>
    </section>
  )
}
