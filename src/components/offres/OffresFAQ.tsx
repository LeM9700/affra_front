const FAQ = [
  {
    q: 'Quelle borne choisir pour une maison individuelle ?',
    a: "Tout dépend de votre usage quotidien. Si vous parcourez moins de 80 km par jour, la prise renforcée Green'up Legrand est une solution économique et suffisante. Pour une recharge rapide chaque nuit, la DazeBox Home T est notre best-seller : elle recharge la plupart des véhicules en 3 à 6 heures. Pour une solution haut de gamme avec pilotage intelligent et intégration solaire avancée, le V2C Trydan est le choix idéal. Nos techniciens certifiés IRVE vous conseillent gratuitement selon votre véhicule et votre installation électrique.",
  },
  {
    q: "Combien de temps prend l'installation ?",
    a: "Une installation standard prend entre 2 et 4 heures. Cela inclut la pose de la borne, le câblage, la mise en service et les tests de bon fonctionnement. Dans certains cas — passage de gaines sur une longue distance, adaptation du tableau électrique — la durée peut s'étendre à une journée complète. Nos techniciens certifiés IRVE s'occupent de l'intégralité des travaux et vous remettent un compte-rendu d'installation conforme aux normes NF C 15-100.",
  },
  {
    q: 'Est-ce compatible avec mes panneaux solaires ?',
    a: "Oui, la DazeBox Home T et le V2C Trydan sont tous deux compatibles avec une installation photovoltaïque. Leur système de pilotage intelligent peut prioriser l'énergie produite par vos panneaux pour charger votre véhicule électrique, réduisant ainsi votre consommation d'électricité du réseau. Nos experts vous accompagnent dans la configuration optimale selon votre production solaire et votre contrat de revente.",
  },
]

export default function OffresFAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Questions fréquentes</h2>
      <div className="flex flex-col gap-3">
        {FAQ.map(({ q, a }) => (
          <details
            key={q}
            className="group rounded-2xl border border-slate-200 bg-white shadow-sm open:shadow-md transition-shadow"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-slate-800 list-none">
              {q}
              <span className="shrink-0 text-[#5BBF8A] transition-transform group-open:rotate-45 text-xl leading-none">
                +
              </span>
            </summary>
            <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed">{a}</div>
          </details>
        ))}
      </div>
    </section>
  )
}
