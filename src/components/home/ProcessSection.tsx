import Image from 'next/image'
import SectionTitle from '@/components/shared/SectionTitle'

const steps = [
  {
    number: '01',
    title: 'Demande de devis',
    description: 'Formulaire en ligne en 2 minutes. Réponse sous 24h.',
    photo: '/images/process/step1-demande.webp',
    alt: 'Formulaire de demande de devis en ligne',
  },
  {
    number: '02',
    title: 'Audit technique',
    description: 'Notre technicien évalue votre installation sur site.',
    photo: '/images/process/step2-audit.webp',
    alt: 'Technicien IRVE réalisant un audit électrique',
  },
  {
    number: '03',
    title: 'Installation certifiée',
    description: 'Pose par un technicien IRVE certifié, conforme RT 2020.',
    photo: '/images/process/step3-installation.webp',
    alt: "Installation d'une borne de recharge par AFFRA Réseaux",
  },
  {
    number: '04',
    title: 'Suivi & support',
    description: 'Attestation CONSUEL, IRVE et support technique inclus.',
    photo: '/images/process/step4-suivi.webp',
    alt: 'Suivi et support après installation de borne',
  },
]

export default function ProcessSection() {
  return (
    <section className="bg-slate-50/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Comment ça se passe"
          title="Simple, transparent, certifié"
          subtitle="De la demande à la mise en service — vous savez à chaque étape où en est votre projet."
          accentWord="certifié"
        />

        <div className="mt-14">
          {/* Timeline desktop */}
          <div className="hidden md:grid md:grid-cols-4 md:gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col">
                {/* Connecteur entre les steps */}
                {i < steps.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-[calc(50%+24px)] top-5 z-0 h-0.5 w-[calc(100%-48px+1.5rem)] bg-gradient-to-r from-[#5BBF8A]/40 to-[#29ABE2]/20"
                  />
                )}

                {/* Numéro cercle */}
                <div className="relative z-10 mb-5 flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2] shadow-[0_4px_12px_rgba(91,191,138,0.35)]">
                    <span className="text-xs font-bold text-white">{step.number}</span>
                  </div>
                </div>

                {/* Photo */}
                <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-4 shadow-[var(--shadow-sm)]">
                  <Image
                    src={step.photo}
                    alt={step.alt}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                    sizes="25vw"
                  />
                </div>

                <h3 className="mb-1.5 font-bold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Timeline mobile — liste verticale */}
          <div className="flex flex-col gap-8 md:hidden">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2]">
                    <span className="text-xs font-bold text-white">{step.number}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mt-2 flex-1 w-0.5 bg-gradient-to-b from-[#5BBF8A]/40 to-transparent min-h-[2rem]" />
                  )}
                </div>
                <div className="pb-4">
                  <h3 className="mb-1 font-bold text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
