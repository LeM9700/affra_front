import Link from 'next/link'
import ChantierCard from '@/components/realisations/ChantierCard'
import type { Realisation } from '@/data/realisations'
import { roundKm, type WithDistance } from '@/lib/geo/voisinage'
import { aVille, deVille } from '@/lib/utils/preposition'

interface VilleChantiersProps {
  nom: string
  chantiers: WithDistance<Realisation>[]
}

/**
 * Chantiers réels réalisés près de la ville, avec leur distance. Rien n'est affiché s'il n'y en
 * a aucun dans le rayon retenu : on ne présente jamais un chantier lointain comme « proche ».
 */
export default function VilleChantiers({ nom, chantiers }: VilleChantiersProps) {
  if (chantiers.length === 0) return null

  return (
    <section aria-labelledby="chantiers-proches" className="mb-10">
      <h3 id="chantiers-proches" className="mb-2 text-xl font-bold text-slate-900">
        Nos chantiers près {deVille(nom)}
      </h3>
      <p className="mb-5 text-sm text-slate-600">
        Des installations réelles, photographiées sur place par notre équipe.
      </p>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {chantiers.map(({ item, km }) => (
          <li key={item.id} className="flex flex-col">
            <p className="mb-2 text-xs font-medium text-slate-500">
              {item.ville === nom ? `Réalisé ${aVille(nom)}` : `À environ ${roundKm(km)} km ${deVille(nom)}`}
            </p>
            <ChantierCard item={item} />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm">
        <Link href="/realisations" className="font-medium text-blue-600 hover:underline">
          Voir toutes nos réalisations
        </Link>
      </p>
    </section>
  )
}
