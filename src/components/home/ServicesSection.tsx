import Link from 'next/link'
import { Home, Building2, Briefcase, HardHat, ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import FadeIn from '@/components/shared/FadeIn'

const services = [
  {
    href: '/services/particuliers',
    Icon: Home,
    title: 'Particuliers',
    description: 'Borne de recharge dans votre garage — installation rapide, certifiée et conforme.',
    color: 'from-[#5BBF8A]/15 to-[#5BBF8A]/5',
    iconColor: 'text-[#5BBF8A]',
  },
  {
    href: '/services/coproprietes',
    Icon: Building2,
    title: 'Copropriétés',
    description: 'Solution collective certifiée IRVE — plusieurs bornes, un seul interlocuteur expert.',
    color: 'from-[#29B4C5]/15 to-[#29B4C5]/5',
    iconColor: 'text-[#29B4C5]',
  },
  {
    href: '/services/professionnels',
    Icon: Briefcase,
    title: 'Professionnels',
    description: "Électrification de flottes et parkings d'entreprise — de 2 à plus de 10 bornes.",
    color: 'from-[#29ABE2]/15 to-[#29ABE2]/5',
    iconColor: 'text-[#29ABE2]',
  },
  {
    href: '/services/promoteurs',
    Icon: HardHat,
    title: 'Promoteurs',
    description: 'Infrastructure IRVE intégrée dès la conception — solution clé en main.',
    color: 'from-[#5BBF8A]/15 to-[#29ABE2]/5',
    iconColor: 'text-[#5BBF8A]',
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-slate-50/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Nos solutions"
          title="Une expertise pour chaque projet"
          subtitle="Quelle que soit votre situation, AFFRA Réseaux a la solution IRVE adaptée."
          accentWord="chaque projet"
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ href, Icon, title, description, color, iconColor }, i) => (
            <FadeIn key={href} delay={i * 0.08}>
            <Link
              href={href}
              className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[var(--shadow-card-hover)]"
            >
              {/* Icône */}
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} transition-transform duration-300 group-hover:scale-110`}>
                <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.75} />
              </div>

              {/* Texte */}
              <h3 className="mb-2 text-base font-bold text-slate-900 group-hover:text-[#29B4C5] transition-colors duration-200">
                {title}
              </h3>
              <p className="flex-1 text-sm text-slate-500 leading-relaxed">{description}</p>

              {/* Arrow indicator */}
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#29B4C5] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
                En savoir plus
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </div>
            </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
