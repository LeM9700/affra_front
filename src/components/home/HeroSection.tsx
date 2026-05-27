import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, MapPin, Award } from 'lucide-react'

const stats = [
  { icon: CheckCircle, value: '200+', label: 'bornes installées' },
  { icon: Award,       value: 'IRVE',  label: 'certifié P1-P2' },
  { icon: MapPin,      value: '2',     label: 'départements' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen lg:min-h-[90vh] flex items-center overflow-hidden bg-white">

      {/* Fond dégradé angulaire subtil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(91,191,138,0.07) 0%, rgba(41,180,197,0.05) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

          {/* ── Colonne texte ── */}
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5BBF8A]/25 bg-[#5BBF8A]/8 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5BBF8A] shadow-[0_0_8px_rgba(91,191,138,0.8)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3a9e6c]">
                Certifié IRVE P1–P2–P3 en Occitanie & PACA
              </span>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
              Borne électrique{' '}
              <br className="hidden sm:block" />
              <span className="text-gradient">ou prise renforcée&nbsp;?</span>
            </h1>

            {/* Sous-titre */}
            <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-xl">
              La solution de recharge la plus adaptée à votre usage et votre budget, installée par un expert certifié IRVE.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/devis"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: 'var(--shadow-green)' }}
              >
                Estimer mon installation en 1 min
              </Link>
              <Link
                href="/realisations"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
              >
                Voir nos réalisations
              </Link>
            </div>

            {/* Micro-garantie */}
            <p className="text-xs text-slate-400">
              Étude gratuite · Sans engagement · Réponse sous 24h
            </p>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-6 border-t border-slate-100 pt-8">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5BBF8A]/15 to-[#29ABE2]/15">
                    <Icon className="h-4 w-4 text-[#29B4C5]" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-lg font-bold leading-none text-slate-900">{value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Colonne image ── */}
          <div className="hidden lg:block relative w-[480px] xl:w-[560px] flex-shrink-0">
            {/* Halo décoratif derrière l'image */}
            <div
              aria-hidden
              className="absolute -inset-8 rounded-3xl"
              style={{
                background:
                  'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(91,191,138,0.12) 0%, rgba(41,180,197,0.08) 50%, transparent 70%)',
              }}
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-[0_24px_80px_rgba(15,23,42,0.15)]">
              <Image
                src="/images/hero/homepage-hero.webp"
                alt="Borne de recharge électrique installée par AFFRA Réseaux"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 480px, 560px"
              />
              {/* Badge flottant sur l'image */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/90 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2]">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Certifié IRVE P1–P2–P3</p>
                    <p className="text-xs text-slate-500">NF C 15-100 · Assurance décennale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
