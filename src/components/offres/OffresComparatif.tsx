import DrapeauFrance from '@/components/shared/DrapeauFrance'
import {
  LIGNES_COMPARATIF,
  OFFRES,
  OFFRE_RECOMMANDEE,
  ORDRE_OFFRES,
  type Offre,
  type ValeurComparatif,
} from '@/data/offres'
import { formatPrixTtc } from '@/lib/offres/prix'

const COLONNES = ORDRE_OFFRES.map((id) => OFFRES[id])

function valeur(offre: Offre, cle: (typeof LIGNES_COMPARATIF)[number]['cle']): ValeurComparatif {
  return cle === 'prix' ? `À partir de ${formatPrixTtc(offre.prixTtc)}` : offre.comparatif[cle]
}

function Cellule({ v }: { v: ValeurComparatif }) {
  if (v === true) return <span className="text-[#5BBF8A] font-bold">✓</span>
  if (v === false) return <span className="text-slate-300">—</span>
  if (v === null) return <span className="text-xs italic text-slate-400">Nous consulter</span>
  return <>{v}</>
}

export default function OffresComparatif() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Comparatif des offres</h2>
      <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-100">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-3 px-4 font-semibold text-slate-500 w-40">Critère</th>
              {COLONNES.map((offre) => {
                const recommandee = offre.id === OFFRE_RECOMMANDEE
                return (
                  <th
                    key={offre.id}
                    className={`py-3 px-4 font-bold text-center ${
                      recommandee
                        ? 'text-[#5BBF8A] bg-[#5BBF8A]/5'
                        : offre.fabriqueEnFrance
                          ? 'text-[#002395]'
                          : 'text-slate-700'
                    }`}
                  >
                    {offre.titre}
                    {recommandee && (
                      <span className="ml-2 inline-block rounded-full bg-[#5BBF8A]/10 text-[#5BBF8A] text-xs px-2 py-0.5 font-semibold">
                        Best-seller
                      </span>
                    )}
                    {offre.fabriqueEnFrance && (
                      <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#002395]/[0.07] text-[#002395] text-xs px-2 py-0.5 font-semibold whitespace-nowrap">
                        Made in France
                        <DrapeauFrance className="h-2 w-3 flex-shrink-0" />
                      </span>
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {LIGNES_COMPARATIF.map((ligne, ri) => (
              <tr key={ligne.cle} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                <td className="py-3 px-4 font-medium text-slate-600 whitespace-nowrap">{ligne.label}</td>
                {COLONNES.map((offre) => (
                  <td
                    key={offre.id}
                    className={`py-3 px-4 text-center ${
                      offre.id === OFFRE_RECOMMANDEE ? 'bg-[#5BBF8A]/5 font-semibold text-slate-800' : 'text-slate-600'
                    }`}
                  >
                    <Cellule v={valeur(offre, ligne.cle)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
