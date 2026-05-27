'use client'

interface Props {
  onStart: () => void
}

export default function DevisScreen1Accroche({ onStart }: Props) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2] mb-6">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
        Trouvez la solution de recharge adaptée à votre besoin
      </h2>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto">
        Répondez à quelques questions, on vous rappelle avec une solution sur mesure.
      </p>
      <button
        onClick={onStart}
        className="inline-block bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] hover:opacity-90 text-white font-bold px-10 py-4 rounded-xl text-lg transition-opacity shadow-md"
      >
        Commencer
      </button>
      <p className="text-xs text-slate-400 mt-4">Étude gratuite, sans engagement, on vous rappelle sous 24h</p>
    </div>
  )
}
