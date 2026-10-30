import { aVille } from '@/lib/utils/preposition'

interface VilleDeroulementProps {
  nom: string
}

/** Méthode d'intervention (reprend les engagements de la page Qui sommes-nous). */
export default function VilleDeroulement({ nom }: VilleDeroulementProps) {
  const etapes = [
    {
      titre: 'Premier échange',
      texte:
        'Nous faisons le point sur votre véhicule, vos trajets, votre logement et la présence éventuelle de panneaux photovoltaïques.',
    },
    {
      titre: 'Visite technique gratuite',
      texte: `Un expert IRVE se déplace chez vous ${aVille(nom)} pour vérifier le tableau, les protections et la prise de terre, puis définir l’emplacement et le passage des câbles. Le devis détaillé suit, généralement sous 24 heures.`,
    },
    {
      titre: 'Installation soignée',
      texte: 'Pose de la borne et du câblage dans les règles IRVE, avec des finitions propres et un chantier nettoyé.',
    },
    {
      titre: 'Mise en service',
      texte:
        'Nous testons la borne, configurons ses fonctions et vous montrons comment l’utiliser. Vous gardez ensuite un interlocuteur direct.',
    },
  ]

  return (
    <section aria-labelledby="deroulement" className="mb-10">
      <h3 id="deroulement" className="mb-4 text-xl font-bold text-slate-900">
        Comment se déroule votre installation {aVille(nom)}
      </h3>
      <ol className="space-y-4">
        {etapes.map(({ titre, texte }, index) => (
          <li key={titre} className="flex gap-4">
            <span
              aria-hidden
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-white"
            >
              {index + 1}
            </span>
            <div>
              <p className="font-semibold text-slate-900">{titre}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{texte}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
