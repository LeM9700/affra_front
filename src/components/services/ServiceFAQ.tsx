'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface ServiceFAQProps {
  items: FAQItem[]
}

export default function ServiceFAQ({ items }: ServiceFAQProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Questions fréquentes</h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left text-slate-900 font-semibold hover:text-[#29B4C5] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {item.question}
                <span className="text-[#5BBF8A] text-xl ml-4 flex-shrink-0">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                  <div className="pt-3">{item.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
