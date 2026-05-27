import { MapPin, UserCheck, ShieldCheck, Wrench, Battery } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import FadeIn from '@/components/shared/FadeIn'
import type { LucideIcon } from 'lucide-react'

interface Bloc {
  num: string
  Icon: LucideIcon
  titre: string
  points: string[]
  featured?: boolean
}

const BLOCS: Bloc[] = [
  {
    num: '01',
    Icon: MapPin,
    titre: 'Une visite technique sur place, pas en visio',
    points: [
      "Déplacement d'un technicien certifié IRVE",
      'Analyse réelle de votre installation',
      'Conseils adaptés à votre situation',
      "Pas d'estimation approximative",
    ],
    featured: true,
  },
  {
    num: '02',
    Icon: UserCheck,
    titre: 'Un installateur local et réactif',
    points: [
      'Intervention rapide dans votre région',
      'Un interlocuteur unique',
      'Échanges simples, sans intermédiaire',
      'Vous savez à qui vous parlez',
    ],
  },
  {
    num: '03',
    Icon: ShieldCheck,
    titre: 'Certifié AFNOR NF C 15-100 & IRVE',
    points: [
      'Qualification RGE IRVE',

      'Conformité totale aux normes',
      'Garantie assurance décennale',
    ],
  },
  {
    num: '04',
    Icon: Wrench,
    titre: 'Une solution vraiment sur mesure',
    points: [
      'Borne ou prise renforcée selon votre usage',
      'Étude personnalisée',
      'Aucun suréquipement inutile',
      'Vous payez uniquement ce dont vous avez besoin',
    ],
  },
  {
    num: '05',
    Icon: Battery,
    titre: 'Du matériel fiable et sélectionné',
    points: [
      'Protections électriques de qualité (Legrand)',
      'Bornes performantes et connectées',
      'Matériel testé et approuvé',
      'On choisit le meilleur pour vous, pas le plus simple à poser',
    ],
  },
]

function BlocCard({ bloc }: { bloc: Bloc }) {
  const { num, Icon, titre, points, featured } = bloc
  return (
    <div
      className={[
        'group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300',
        featured
          ? 'border-[#5BBF8A]/30 bg-gradient-to-br from-[#5BBF8A]/8 to-[#29ABE2]/5 shadow-[var(--shadow-card)]'
          : 'border-slate-200/80 bg-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5',
      ].join(' ')}
    >
      {/* Numéro décoratif en fond */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-4 select-none text-[80px] font-black leading-none text-slate-100 transition-colors duration-300 group-hover:text-slate-50"
      >
        {num}
      </span>

      {/* Icône */}
      <div
        className={[
          'relative mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl',
          featured
            ? 'bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2]'
            : 'bg-gradient-to-br from-[#5BBF8A]/15 to-[#29ABE2]/10',
        ].join(' ')}
      >
        <Icon
          className={featured ? 'h-5 w-5 text-white' : 'h-5 w-5 text-[#29B4C5]'}
          strokeWidth={1.75}
        />
      </div>

      <h3 className="relative mb-3 font-bold text-slate-900 leading-snug">{titre}</h3>

      <ul className="relative space-y-1.5">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#5BBF8A]" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PourquoiNousChoisirSection() {
  const [featured, ...rest] = BLOCS
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Pourquoi nous choisir"
          title="Ce qui nous distingue"
          subtitle="Pas un catalogue en ligne, un expert local qui se déplace et travaille avec vous."
          accentWord="distingue"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FadeIn delay={0}>
            <BlocCard bloc={featured} />
          </FadeIn>
          {rest.map((bloc, i) => (
            <FadeIn key={bloc.num} delay={(i + 1) * 0.08}>
              <BlocCard bloc={bloc} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
