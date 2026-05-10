import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Demande envoyée — Merci !',
  description: 'Votre demande de devis a bien été reçue. AFFRA Réseaux vous contacte sous 24h.',
  path: '/devis/merci',
})

export default function DevisMerciPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#F0FFFE] to-white flex items-center justify-center py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Merci pour votre demande !</h1>
          <p className="text-slate-700 text-lg mb-2">
            Votre demande de devis a bien été reçue.
          </p>
          <p className="text-slate-500 mb-8">
            Un membre de l&apos;équipe AFFRA Réseaux vous contactera dans un délai de 24h (jours ouvrés).
            Pensez à vérifier votre boîte de réception — un accusé de réception vous a été envoyé.
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-[#5BBF8A] via-[#29B4C5] to-[#29ABE2] text-white font-bold px-6 py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
