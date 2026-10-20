import Image from 'next/image'
import type { Realisation } from '@/data/realisations'

interface ChantierCardProps {
  item: Realisation
  /** Affiche la description complète du chantier (page Réalisations) au lieu du seul résumé. */
  detailed?: boolean
}

/**
 * Carte d'un chantier réel : photo au format fixe, ville, titre (H3), caractéristiques
 * techniques et, en option, description complète. S'étire sur toute la hauteur de son
 * conteneur pour que les cartes d'une même rangée restent alignées.
 */
export default function ChantierCard({ item, detailed = false }: ChantierCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/5] w-full bg-slate-100">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 82vw"
          className="object-cover"
          style={{ objectPosition: item.image.position }}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#3a9e6c]">
          {item.ville} ({item.codePostal})
        </p>
        <h3 className="mt-1 text-lg font-bold leading-snug text-slate-900">{item.titre}</h3>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{item.resume}</p>
        {detailed && <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>}
      </div>
    </article>
  )
}
