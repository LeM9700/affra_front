import Link from 'next/link'
import { DEVIS_HREF } from '@/lib/devis/projet'

export default function RealisationsCTA() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#5BBF8A]/25 bg-gradient-to-br from-[#5BBF8A]/8 to-[#29ABE2]/8 px-6 py-10 text-center sm:px-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Votre projet pourrait être notre prochaine réalisation.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Vous souhaitez installer une borne de recharge dans le Gard ou l’Hérault ? Échangez avec un expert IRVE et
            bénéficiez d’une visite technique gratuite pour étudier votre projet.
          </p>
          <Link
            href={DEVIS_HREF.particulier}
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 sm:w-auto"
            style={{ boxShadow: 'var(--shadow-green)' }}
          >
            Planifier ma visite technique gratuite
          </Link>
        </div>
      </div>
    </section>
  )
}
