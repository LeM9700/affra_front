import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DevisWizard from '@/components/devis/DevisWizard'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Demande de devis gratuit',
  description:
    "Demandez votre devis gratuit pour l'installation d'une borne de recharge. Réponse sous 24h par AFFRA Réseaux, expert IRVE en Hérault et Gard.",
  path: '/devis',
})

export default function DevisPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#F0FFFE] to-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Demande de devis gratuit</h1>
            <p className="text-slate-500">Réponse sous 24h sans engagement</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <DevisWizard />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
