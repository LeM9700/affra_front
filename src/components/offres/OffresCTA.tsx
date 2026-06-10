import Link from 'next/link'

export default function OffresCTA() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-[#5BBF8A] via-[#29B4C5] to-[#29ABE2] p-10 text-center shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Vous ne savez pas quelle borne choisir ?
        </h2>
        <p className="text-white/90 mb-7 text-base">
          Nos experts certifiés IRVE analysent votre situation et vous recommandent gratuitement la solution la plus adaptée à votre véhicule, votre installation et votre budget.
        </p>
        <Link
          href="/devis"
          className="inline-block rounded-xl bg-white px-8 py-3 font-semibold text-slate-800 shadow hover:bg-slate-50 transition"
        >
          Demander un devis gratuit
        </Link>
      </div>
    </section>
  )
}
