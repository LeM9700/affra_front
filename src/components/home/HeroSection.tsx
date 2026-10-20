import Image from 'next/image'
import Link from 'next/link'
import { Award, MapPin, CalendarCheck, ArrowRight, ImageIcon, Clock } from 'lucide-react'

const mentions = [
  { icon: Award, label: 'Entreprise qualifiée IRVE' },
  { icon: MapPin, label: 'Installateur local · Gard & Hérault' },
  { icon: CalendarCheck, label: 'Visite technique gratuite' },
]

export default function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-[#F2FBF7] via-white to-[#EEF8FC] lg:min-h-[86vh]">
      {/* Photo pleine hauteur sur le bord droit, fondue dans le fond (desktop) */}
      <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
        <Image
          src="/images/hero/homepage-hero.webp"
          alt="Borne de recharge électrique installée par AFFRA RESEAUX"
          fill
          priority
          className="object-cover"
          sizes="48vw"
        />
        <div aria-hidden className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#F6FCFA] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl lg:max-w-[52%]">
          {/* Logo et arguments */}
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Image
              src="/icons/affra_logo.png"
              alt="Logo AFFRA RESEAUX"
              width={96}
              height={96}
              priority
              className="h-20 w-20 flex-shrink-0 object-contain sm:h-24 sm:w-24"
            />
            <ul className="flex flex-wrap gap-x-4 gap-y-3 xl:flex-nowrap">
              {mentions.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 xl:border-l xl:border-slate-200 xl:pl-4 xl:first:border-l-0 xl:first:pl-0">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5BBF8A]/15 to-[#29ABE2]/15">
                    <Icon className="h-4 w-4 text-[#29B4C5]" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="max-w-[7.5rem] text-xs font-semibold leading-snug text-slate-700">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Titre principal */}
          <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-5xl xl:text-6xl">
            Borne électrique{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient">ou prise renforcée&nbsp;?</span>
          </h1>

          {/* Sous-titre */}
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-500">
            Un expert IRVE local vous accompagne de A à Z : visite technique gratuite à domicile, conseils personnalisés et installation adaptée à vos besoins et à votre budget.
          </p>

          {/* CTA */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] px-7 py-4 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: 'var(--shadow-green)' }}
            >
              Estimer mon installation en 1 min
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </Link>
            <Link
              href="/realisations"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
            >
              Voir nos réalisations
              <ImageIcon className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </div>

          {/* Engagement de rappel */}
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4 flex-shrink-0 text-[#5BBF8A]" strokeWidth={2.25} aria-hidden />
            Un expert IRVE vous recontacte sous 24 h.
          </p>
        </div>
      </div>
    </section>
  )
}
