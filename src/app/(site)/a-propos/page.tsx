import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import CTABand from '@/components/shared/CTABand'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'À propos AFFRA Réseaux',
  description:
    "Découvrez AFFRA Réseaux, installateur certifié IRVE P1–P2–P3 en Hérault, Gard, Vaucluse, Bouches-du-Rhône, Aude et Pyrénées-Orientales : notre équipe, nos certifications et notre engagement pour la mobilité électrique.",
  path: '/a-propos',
})

export default function AProposPage() {
  return (
    <>
      <PageHero
        imageSrc="/images/hero/a-propos-hero.webp"
        imageAlt="Équipe AFFRA Réseaux sur un chantier d'installation IRVE"
        title="À propos d'AFFRA Réseaux"
        subtitle="Expert certifié IRVE P1–P2–P3 depuis 5 ans en Hérault, Gard, Vaucluse, Bouches-du-Rhône, Aude et Pyrénées-Orientales."
      />

      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Notre mission</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              AFFRA Réseaux accompagne la transition vers la mobilité électrique en installant des bornes de recharge
              certifiées IRVE pour particuliers, copropriétés et professionnels en Occitanie et PACA.
              Notre priorité : une installation fiable, conforme et durable.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Nos certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Certification IRVE P1–P2–P3', desc: 'Installation et mise en service de bornes de recharge pour véhicules électriques.' },
                { title: 'AFNOR NF C 15-100', desc: 'Certification des installations électriques intérieures, garantissant conformité et sécurité.' },
              ].map((cert) => (
                <div key={cert.title} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-[#5BBF8A]/50 transition-colors">
                  <h3 className="text-[#5BBF8A] font-bold mb-2">{cert.title}</h3>
                  <p className="text-slate-600 text-sm">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Chiffres clés</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '200+', label: 'Bornes installées' },
                { value: '5 ans', label: "d'expérience" },
                { value: '6', label: 'Occitanie & PACA' },
                { value: '100%', label: 'Certifié IRVE' },
              ].map((s) => (
                <div key={s.label} className="text-center bg-slate-50 border border-slate-200 rounded-2xl py-6">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] bg-clip-text text-transparent">{s.value}</div>
                  <div className="text-slate-600 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
