const ROWS = [
  { label: 'Puissance max', values: ['3,7 kW', '22 kW', '22 kW'] },
  { label: 'Prix indicatif TTC', values: ['À partir de 499 €', 'À partir de 1 250 €', 'À partir de 1 350 €'] },
  { label: 'Câble Type 2 inclus', values: ['Non', 'Oui (5 m)', 'Oui (5 m)'] },
  { label: 'Compatible solaire', values: ['Non', 'Oui', 'Oui'] },
  { label: 'Wi-Fi / Bluetooth', values: ['Non', 'Oui', 'Oui'] },
  { label: 'Écran intégré', values: ['Non', 'Oui', 'Non'] },
  { label: 'Design', values: ['Discret', 'Moderne', 'Premium'] },
  { label: 'Idéal pour', values: ['Petits trajets', 'Usage quotidien', 'Haut de gamme'] },
]

const HEADERS = ["Green'up Legrand", 'DazeBox Home T', 'V2C Trydan']
const HIGHLIGHT_COL = 1

export default function OffresComparatif() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Comparatif des offres</h2>
      <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-100">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-3 px-4 font-semibold text-slate-500 w-40">Critère</th>
              {HEADERS.map((h, i) => (
                <th
                  key={h}
                  className={`py-3 px-4 font-bold text-center ${
                    i === HIGHLIGHT_COL
                      ? 'text-[#5BBF8A] bg-[#5BBF8A]/5'
                      : 'text-slate-700'
                  }`}
                >
                  {h}
                  {i === HIGHLIGHT_COL && (
                    <span className="ml-2 inline-block rounded-full bg-[#5BBF8A]/10 text-[#5BBF8A] text-xs px-2 py-0.5 font-semibold">
                      Best-seller
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, ri) => (
              <tr key={row.label} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                <td className="py-3 px-4 font-medium text-slate-600 whitespace-nowrap">{row.label}</td>
                {row.values.map((v, ci) => (
                  <td
                    key={ci}
                    className={`py-3 px-4 text-center ${
                      ci === HIGHLIGHT_COL ? 'bg-[#5BBF8A]/5 font-semibold text-slate-800' : 'text-slate-600'
                    }`}
                  >
                    {v === 'Oui' ? (
                      <span className="text-[#5BBF8A] font-bold">✓</span>
                    ) : v === 'Non' ? (
                      <span className="text-slate-300">—</span>
                    ) : (
                      v
                    )}
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
