import Image from 'next/image'
import SectionTitle from '@/components/shared/SectionTitle'
import FadeIn from '@/components/shared/FadeIn'

const isDev = process.env.NODE_ENV === 'development'

const avis = [
  {
    name: 'Marc D.',
    location: 'Montpellier (34)',
    rating: 5,
    text: "Équipe très professionnelle, installation soignée et rapide. La borne fonctionne parfaitement. Je recommande vivement AFFRA Réseaux !",
    avatar: '/images/avis/avis-1.webp',
    initials: 'MD',
  },
  {
    name: 'Sophie L.',
    location: 'Nîmes (30)',
    rating: 5,
    text: "Très bon accompagnement pour mon projet en copropriété. Équipe réactive et installation soignée, je recommande.",
    avatar: '/images/avis/avis-2.webp',
    initials: 'SL',
  },
  {
    name: 'Thomas R.',
    location: 'Béziers (34)',
    rating: 5,
    text: "Installation de 8 bornes pour notre flotte d'entreprise. Travail sérieux, délais respectés, excellent rapport qualité-prix.",
    avatar: '/images/avis/avis-3.webp',
    initials: 'TR',
  },
]

export default function AvisSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Avis clients"
          title="Ce que disent nos clients"
          subtitle="Des avis vérifiés issus de nos installations en Hérault et dans le Gard."
          accentWord="clients"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {avis.map((a, i) => (
            <FadeIn key={a.name} delay={i * 0.10}>
            <div
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5"
            >
              {/* Grande guillemet décorative */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-2 left-5 select-none text-[80px] font-black leading-none text-slate-100 transition-colors duration-300 group-hover:text-slate-50"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                &ldquo;
              </span>

              {/* Étoiles */}
              <div className="relative mb-4 flex gap-1">
                {Array.from({ length: a.rating }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Citation */}
              <p className="relative flex-1 text-slate-700 leading-relaxed mb-6 text-[0.9375rem]">
                {a.text}
              </p>

              {/* Auteur */}
              <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                  {isDev ? (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2] text-xs font-bold text-white">
                      {a.initials}
                    </div>
                  ) : (
                    <Image
                      src={a.avatar}
                      alt={`Photo de ${a.name}`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{a.name}</p>
                  <p className="text-xs text-slate-400">{a.location}</p>
                </div>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
