import type { CSSProperties } from 'react'
import { PhoneCall, MapPin, FileText, ShieldCheck, BatteryCharging, type LucideIcon } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import FadeIn from '@/components/shared/FadeIn'

interface Etape {
  num: string
  Icon: LucideIcon
  titre: string
  texte: string
  /** Position (en %) sur l'ellipse du parcours desktop, centre du conteneur = 50/50. */
  x: number
  y: number
}

/**
 * Cinq étapes réparties à 72° d'écart sur une ellipse (rx 35 %, ry 38 %) :
 * haut, haut-droite, bas-droite, bas-gauche, haut-gauche — sens horaire depuis le haut.
 */
const ETAPES: Etape[] = [
  {
    num: '01',
    Icon: PhoneCall,
    titre: 'Premier contact avec un expert IRVE',
    texte:
      'Nous prenons connaissance de votre projet, répondons à vos premières questions et planifions une visite technique.',
    x: 50,
    y: 12,
  },
  {
    num: '02',
    Icon: MapPin,
    titre: 'Visite technique sur place, sans frais',
    texte:
      'Nous nous déplaçons à votre domicile pour analyser votre installation et établir un devis cohérent. Pas d’estimation approximative à distance.',
    x: 83.3,
    y: 38.3,
  },
  {
    num: '03',
    Icon: FileText,
    titre: 'Transmission du devis et suivi personnalisé',
    texte: 'Le devis vous est transmis et expliqué par le même expert IRVE qui vous accompagne depuis le premier échange.',
    x: 70.6,
    y: 80.7,
  },
  {
    num: '04',
    Icon: ShieldCheck,
    titre: 'Installation par des experts qualifiés IRVE',
    texte: 'Votre borne est installée par des professionnels qualifiés IRVE, dans le respect des règles en vigueur.',
    x: 29.4,
    y: 80.7,
  },
  {
    num: '05',
    Icon: BatteryCharging,
    titre: 'Prenez le contrôle de votre recharge',
    texte: 'Nous vous aidons à prendre en main votre installation pour profiter pleinement de votre véhicule électrique au quotidien.',
    x: 16.7,
    y: 38.3,
  },
]

export default function PourquoiNousChoisirSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Pourquoi nous choisir ?"
          title="Pas un simple catalogue en ligne : un expert local avec un accompagnement clair et structuré"
          subtitle="Chez AFFRA RESEAUX, vous êtes accompagné par un expert IRVE local à chaque étape de votre projet, du premier contact jusqu’à l’installation de votre borne de recharge."
          accentWord="un expert local"
          size="md"
        />

        <div className="relative mt-14 lg:h-[720px]">
          {/* Desktop : anneau reliant les étapes autour du centre */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="parcours-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5BBF8A" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#29ABE2" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            <ellipse
              cx="50"
              cy="50"
              rx="35"
              ry="38"
              fill="none"
              stroke="url(#parcours-ring)"
              strokeWidth="2"
              strokeDasharray="2 6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Centre du parcours (desktop) */}
          <div className="absolute left-1/2 top-1/2 hidden h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2] p-6 text-center shadow-[0_12px_40px_rgba(41,171,226,0.30)] lg:flex">
            <BatteryCharging className="mb-2 h-7 w-7 text-white" strokeWidth={1.75} aria-hidden />
            <p className="text-base font-bold leading-snug text-white">Votre projet de recharge</p>
          </div>

          {/* Centre du parcours (mobile / tablette) */}
          <p className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] px-5 py-2.5 text-sm font-bold text-white lg:hidden">
            <BatteryCharging className="h-4 w-4" strokeWidth={2} aria-hidden />
            Votre projet de recharge
          </p>

          <ol className="relative lg:absolute lg:inset-0">
            {ETAPES.map(({ num, Icon, titre, texte, x, y }, i) => (
              <li
                key={num}
                style={{ '--x': `${x}%`, '--y': `${y}%` } as CSSProperties}
                className="relative flex gap-4 lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:block lg:w-[270px] lg:-translate-x-1/2 lg:-translate-y-1/2"
              >
                {/* Mobile : numéro + connecteur vertical chronologique */}
                <div className="flex flex-col items-center lg:hidden" aria-hidden>
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2] text-sm font-bold text-white shadow-[0_4px_12px_rgba(91,191,138,0.35)]">
                    {num}
                  </span>
                  {i < ETAPES.length - 1 && (
                    <span className="mt-2 min-h-[1.5rem] w-0.5 flex-1 bg-gradient-to-b from-[#5BBF8A]/50 to-[#29ABE2]/10" />
                  )}
                </div>

                <FadeIn delay={i * 0.08} className="flex-1 pb-8 lg:pb-0">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[var(--shadow-card)]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-1 -top-3 hidden select-none text-[64px] font-black leading-none text-slate-100 lg:block"
                    >
                      {num}
                    </span>
                    <div className="relative mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5BBF8A]/15 to-[#29ABE2]/10">
                      <Icon className="h-5 w-5 text-[#29B4C5]" strokeWidth={1.75} aria-hidden />
                    </div>
                    <p className="relative text-xs font-semibold uppercase tracking-[0.15em] text-[#3a9e6c]">
                      Étape {num}
                    </p>
                    <h3 className="relative mt-1 text-base font-bold leading-snug text-slate-900">{titre}</h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{texte}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
