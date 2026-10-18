import Link from 'next/link'
import { Home, Briefcase, ArrowRight, type LucideIcon } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import FadeIn from '@/components/shared/FadeIn'
import { DEVIS_HREF } from '@/lib/devis/projet'

interface Segment {
  id: string
  Icon: LucideIcon
  titre: string
  accroche: string
  description: string
  cta: { href: string; label: string }
  enSavoirPlus: { href: string; label: string }
  prioritaire: boolean
}

const SEGMENTS: Segment[] = [
  {
    id: 'particuliers',
    Icon: Home,
    titre: 'Particuliers',
    accroche: 'Rechargez chez vous, en toute simplicité.',
    description:
      'Borne de recharge ou prise renforcée ? Nous vous conseillons et installons la solution adaptée à votre véhicule, à vos habitudes et à votre budget.',
    cta: { href: DEVIS_HREF.particulier, label: 'Planifier ma visite gratuite' },
    enSavoirPlus: { href: '/services/particuliers', label: 'Solutions pour les particuliers' },
    prioritaire: true,
  },
  {
    id: 'independants-tpe-pme',
    Icon: Briefcase,
    titre: 'Indépendants, TPE & PME',
    accroche: 'Une solution de recharge adaptée à votre activité.',
    description:
      'Artisans, commerces, professions libérales et petites entreprises : nous installons une à deux bornes de recharge adaptées à vos véhicules, à vos locaux et à vos besoins professionnels.',
    cta: { href: DEVIS_HREF.entreprise, label: 'Étudier mon projet' },
    enSavoirPlus: { href: '/services/professionnels', label: 'Solutions pour les professionnels' },
    prioritaire: false,
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-slate-50/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Nos solutions"
          title="Votre borne de recharge, chez vous ou dans votre entreprise"
          subtitle="Particulier, indépendant ou dirigeant d’une petite entreprise ? AFFRA RESEAUX vous accompagne dans le choix et l’installation de votre solution de recharge dans le Gard et l’Hérault."
          accentWord="chez vous ou dans votre entreprise"
          size="md"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch">
          {SEGMENTS.map(({ id, Icon, titre, accroche, description, cta, enSavoirPlus, prioritaire }, i) => (
            <FadeIn key={id} delay={i * 0.1} className="h-full">
              <article
                className={[
                  'flex h-full flex-col rounded-3xl bg-white p-7 sm:p-9 transition-shadow duration-300',
                  prioritaire
                    ? 'shadow-[0_8px_32px_rgba(91,191,138,0.18),0_24px_64px_rgba(41,171,226,0.10)] ring-2 ring-[#5BBF8A]/60'
                    : 'border border-slate-200/80 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]',
                ].join(' ')}
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5BBF8A]/15 to-[#29ABE2]/10">
                  <Icon className="h-6 w-6 text-[#29B4C5]" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{titre}</h3>
                <p className="mt-2 text-base font-semibold text-slate-800">{accroche}</p>
                <p className="mt-3 flex-1 leading-relaxed text-slate-600">{description}</p>

                <div className="mt-8 flex flex-col gap-4">
                  <Link
                    href={cta.href}
                    className={[
                      'inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold transition-all duration-200',
                      prioritaire
                        ? 'bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] text-white hover:-translate-y-0.5'
                        : 'border border-slate-300 bg-white text-slate-700 hover:border-[#5BBF8A]/60 hover:bg-slate-50',
                    ].join(' ')}
                    style={prioritaire ? { boxShadow: 'var(--shadow-green)' } : undefined}
                  >
                    {cta.label}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </Link>
                  <Link
                    href={enSavoirPlus.href}
                    className="text-center text-sm font-medium text-[#29B4C5] underline-offset-4 hover:underline"
                  >
                    {enSavoirPlus.label}
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
