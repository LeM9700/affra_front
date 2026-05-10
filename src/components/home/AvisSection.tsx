import Link from 'next/link'
import SectionTitle from '@/components/shared/SectionTitle'
import FadeIn from '@/components/shared/FadeIn'
import { getTestimonials } from '@/lib/api/testimonials'
import type { TestimonialSeoItem } from '@/types/testimonial'

const TYPE_CLIENT_LABELS: Record<string, string> = {
  maison: 'Particulier (maison)',
  copropriete: 'Copropriété',
  entreprise: 'Entreprise',
  autre: 'Client',
}

const FALLBACK_AVIS = [
  {
    initiales: 'M. D.',
    ville: 'Montpellier',
    departement: '34',
    type_client: 'maison',
    type_projet: 'Maison individuelle — borne 7,4 kW',
    resultat: null,
    temoignage: "Équipe très professionnelle, installation soignée et rapide. La borne fonctionne parfaitement. Je recommande vivement AFFRA Réseaux !",
    id: 'fallback-1',
    published_at: null,
  },
  {
    initiales: 'S. L.',
    ville: 'Nîmes',
    departement: '30',
    type_client: 'copropriete',
    type_projet: 'Copropriété — accompagnement dossier et installation',
    resultat: null,
    temoignage: "Très bon accompagnement pour mon projet en copropriété. Équipe réactive et installation soignée, je recommande.",
    id: 'fallback-2',
    published_at: null,
  },
  {
    initiales: 'T. R.',
    ville: 'Béziers',
    departement: '34',
    type_client: 'entreprise',
    type_projet: "Entreprise — infrastructure pour flotte professionnelle",
    resultat: null,
    temoignage: "Installation de 8 bornes pour notre flotte d'entreprise. Travail sérieux, délais respectés, excellent rapport qualité-prix.",
    id: 'fallback-3',
    published_at: null,
  },
] satisfies TestimonialSeoItem[]

function AvisCard({ avis, index }: { avis: TestimonialSeoItem; index: number }) {
  const typeLabel = TYPE_CLIENT_LABELS[avis.type_client] ?? 'Client'
  const projectTag = avis.type_projet ?? `${typeLabel} — ${avis.ville} (${avis.departement})`

  return (
    <FadeIn delay={index * 0.1}>
      <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 left-5 select-none text-[80px] font-black leading-none text-slate-100 transition-colors duration-300 group-hover:text-slate-50"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          &ldquo;
        </span>

        <div className="relative mb-4">
          <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {projectTag}
          </p>
        </div>

        <p className="relative flex-1 text-slate-700 leading-relaxed mb-6 text-[0.9375rem]">
          {avis.temoignage}
        </p>

        {avis.resultat && (
          <p className="mb-4 text-xs font-medium text-[#5BBF8A]">{avis.resultat}</p>
        )}

        <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2] text-xs font-bold text-white">
            {avis.initiales.replace(/[^A-Z]/g, '').slice(0, 2) || avis.initiales.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{avis.initiales}</p>
            <p className="text-xs text-slate-400">{avis.ville} ({avis.departement})</p>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export default async function AvisSection() {
  const avis = await getTestimonials().catch(() => [] as TestimonialSeoItem[])
  const displayed = avis.length > 0 ? avis.slice(0, 3) : FALLBACK_AVIS

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Retours clients"
          title="Retours d'expérience de terrain"
          subtitle="Témoignages issus de missions réalisées en Hérault, Gard et Bouches-du-Rhône."
          accentWord="clients"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {displayed.map((a, i) => (
            <AvisCard key={a.id} avis={a} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Témoignages publiés avec anonymisation (initiales + ville), sur la base de retours clients.
        </p>
        <div className="mt-4 text-center">
          <Link
            href="/temoignages/partager"
            className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Partager un témoignage
          </Link>
        </div>
      </div>
    </section>
  )
}
