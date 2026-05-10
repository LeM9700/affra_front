import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export default function CTABand() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24">
      {/* Halos décoratifs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(91,191,138,0.20) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(41,171,226,0.15) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <span className="mb-5 inline-block rounded-full border border-[#5BBF8A]/25 bg-[#5BBF8A]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#5BBF8A]">
          Devis gratuit — sans engagement
        </span>

        {/* Titre très grand */}
        <h2 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
          Prêt à recharger{' '}
          <span className="inline-block bg-gradient-to-r from-[#5BBF8A] via-[#29B4C5] to-[#29ABE2] bg-clip-text text-transparent">
            chez vous ?
          </span>
        </h2>

        <p className="mx-auto mb-10 max-w-xl text-lg text-slate-400 leading-relaxed">
          Obtenez votre estimation en 2 minutes. Notre équipe certifiée IRVE vous répond sous 24h.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/devis"
            className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ boxShadow: '0 8px 30px rgba(91,191,138,0.30), 0 2px 8px rgba(41,171,226,0.20)' }}
          >
            Demander un devis gratuit
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
          <a
            href="tel:+33XXXXXXXXX"
            className="inline-flex items-center gap-2.5 rounded-2xl border border-slate-700 bg-slate-800/60 px-8 py-4 text-base font-semibold text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800 hover:text-white"
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} />
            Nous appeler
          </a>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Étude gratuite · Sans engagement · Réponse sous 24h
        </p>
      </div>
    </section>
  )
}
