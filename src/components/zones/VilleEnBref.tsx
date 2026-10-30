import { aVille } from '@/lib/utils/preposition'

interface VilleEnBrefProps {
  nom: string
  departement: string
  nomDept: string
  /** Distance arrondie depuis Nîmes, `null` pour Nîmes. */
  distanceBaseKm: number | null
}

/**
 * Encadré de faits courts et vérifiables sur l'intervention dans une ville. Format liste de
 * définitions : facile à lire en diagonale et à citer pour un assistant IA.
 */
export default function VilleEnBref({ nom, departement, nomDept, distanceBaseKm }: VilleEnBrefProps) {
  const faits: { terme: string; valeur: string }[] = [
    { terme: 'Département', valeur: `${nomDept} (${departement})` },
    {
      terme: 'Depuis notre atelier',
      valeur:
        distanceBaseKm === null
          ? 'Siège de l’entreprise, à Nîmes'
          : `Environ ${distanceBaseKm} km de Nîmes, à vol d’oiseau`,
    },
    { terme: 'Qualification', valeur: 'IRVE, délivrée par AFNOR Certification' },
    { terme: 'Visite technique', valeur: 'Gratuite et sans engagement, à domicile' },
    { terme: 'Puissances', valeur: 'De la prise renforcée 3,7 kW à la borne 22 kW' },
  ]

  return (
    <section aria-labelledby="en-bref" className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h3 id="en-bref" className="mb-4 text-lg font-semibold text-slate-800">
        En bref : votre borne {aVille(nom)}
      </h3>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {faits.map(({ terme, valeur }) => (
          <div key={terme}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{terme}</dt>
            <dd className="mt-0.5 text-sm text-slate-800">{valeur}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
