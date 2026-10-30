import { FAQ_OFFRES } from '@/data/offres'

export default function OffresFAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Questions fréquentes</h2>
      <div className="flex flex-col gap-3">
        {FAQ_OFFRES.map(({ q, a }) => (
          <details
            key={q}
            className="group rounded-2xl border border-slate-200 bg-white shadow-sm open:shadow-md transition-shadow"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-slate-800 list-none">
              {q}
              <span className="shrink-0 text-[#5BBF8A] transition-transform group-open:rotate-45 text-xl leading-none">
                +
              </span>
            </summary>
            <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed">{a}</div>
          </details>
        ))}
      </div>
    </section>
  )
}
