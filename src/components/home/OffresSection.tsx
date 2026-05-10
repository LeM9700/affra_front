import Link from 'next/link'
import Image from 'next/image'
import { Check, ArrowRight, Zap, Star, Crown } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import FadeIn from '@/components/shared/FadeIn'
import type { LucideIcon } from 'lucide-react'

interface Offre {
  badge: string
  BadgeIcon: LucideIcon
  titre: string
  soustitre: string
  prix: string
  prixValeur: string
  prixSuffix: string
  features: string[]
  highlight: boolean
  image: string
  imageAlt: string
  cta: { href: string; label: string }
}

const OFFRES: Offre[] = [
  {
    badge: 'Entrée de gamme',
    BadgeIcon: Zap,
    titre: "Green'up Legrand",
    soustitre: "Prise renforcée — jusqu'à 3,7 kW",
    prix: 'À partir de',
    prixValeur: '499 €',
    prixSuffix: 'TTC pose comprise',
    features: [
      'Solution économique et sécurisée',
      'Compatible VE et hybrides rechargeables',
      'Installation discrète et rapide',
      'Idéal pour les petits trajets du quotidien',
    ],
    highlight: false,
    image: '/images/GREEN UP LEGRAND.png',
    imageAlt: "Green'up Legrand — kit prise renforcée",
    cta: { href: '/devis', label: 'Demander un devis' },
  },
  {
    badge: 'Best-seller',
    BadgeIcon: Star,
    titre: 'DazeBox Home T',
    soustitre: 'Borne 7 kW — connectée et pilotable',
    prix: 'À partir de',
    prixValeur: '1 250 €',
    prixSuffix: 'TTC pose comprise',
    features: [
      "Recharge 2× plus rapide qu'une prise",
      'Application mobile incluse',
      'Programmation heures creuses',
      'Compatible bornes intelligentes',
    ],
    highlight: true,
    image: '/images/DAZEBOX HOME T.png',
    imageAlt: 'DazeBox Home T — borne de recharge 7 kW',
    cta: { href: '/devis', label: 'Choisir cette borne' },
  },
  {
    badge: 'Premium',
    BadgeIcon: Crown,
    titre: 'V2C Trydan',
    soustitre: 'Borne 22 kW — bi-directionnelle',
    prix: 'À partir de',
    prixValeur: '1 350 €',
    prixSuffix: 'TTC pose comprise',
    features: [
      "Puissance maximale jusqu'à 22 kW",
      'Technologie V2H (vehicle-to-home)',
      'Gestion dynamique de la puissance',
      'Idéal pour usage intensif',
    ],
    highlight: false,
    image: '/images/V2C TRYDAN.png',
    imageAlt: 'V2C Trydan — borne bi-directionnelle 22 kW',
    cta: { href: '/devis', label: 'Demander un devis' },
  },
]

export default function OffresSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Nos offres"
          title="Trouvez la borne adaptée"
          subtitle="Fourniture et pose comprises, installée par un technicien certifié IRVE."
          accentWord="adaptée"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3 items-start">
          {OFFRES.map((offre, i) => (
            <FadeIn key={offre.titre} delay={i * 0.10}>
            <div
              className={[
                'group relative flex flex-col rounded-3xl bg-white transition-all duration-300',
                offre.highlight
                  ? 'scale-[1.03] shadow-[0_8px_32px_rgba(91,191,138,0.20),0_24px_64px_rgba(41,171,226,0.12)] ring-2 ring-[#5BBF8A]/60'
                  : 'shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1',
              ].join(' ')}
            >
              {/* Image */}
              <div className="overflow-hidden rounded-t-3xl bg-white">
                <Image
                  src={offre.image}
                  alt={offre.imageAlt}
                  width={600}
                  height={300}
                  className="h-[220px] w-full object-contain p-4"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                {/* Badge */}
                <div className={[
                  'mb-3 inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-xs font-bold',
                  offre.highlight
                    ? 'bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] text-white'
                    : 'bg-slate-100 text-slate-600',
                ].join(' ')}>
                  <offre.BadgeIcon className="h-3 w-3" strokeWidth={2.5} />
                  {offre.badge}
                </div>

                {/* Titre */}
                <h3 className="text-xl font-bold text-slate-900">{offre.titre}</h3>
                <p className="mt-1 text-sm text-slate-500">{offre.soustitre}</p>

                {/* Prix */}
                <div className="mt-4 pb-4 border-b border-slate-100">
                  <p className="text-xs text-slate-400">{offre.prix}</p>
                  <p className="text-3xl font-black tracking-tight text-slate-900">{offre.prixValeur}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{offre.prixSuffix}</p>
                </div>

                {/* Features */}
                <ul className="mt-4 flex-1 space-y-2">
                  {offre.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#5BBF8A]" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    href={offre.cta.href}
                    className={[
                      'inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200',
                      offre.highlight
                        ? 'bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] text-white shadow-[var(--shadow-green)] hover:shadow-[var(--shadow-green-hover)] hover:-translate-y-0.5'
                        : 'border border-slate-200 bg-white text-slate-700 hover:border-[#5BBF8A]/40 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    {offre.cta.label}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Tous nos prix incluent la main d&apos;œuvre et les matériaux. TVA 5,5 % applicable sous conditions.
        </p>
      </div>
    </section>
  )
}