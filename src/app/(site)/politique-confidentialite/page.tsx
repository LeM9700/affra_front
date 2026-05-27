import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et traitement des données personnelles AFFRA Réseaux.',
  path: '/politique-confidentialite',
})

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="bg-slate-900 py-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Politique de confidentialité</h1>

        <p className="text-slate-400 mb-8">Dernière mise à jour : janvier 2026</p>

        {[
          {
            title: '1. Responsable du traitement',
            content:
              "AFFRA Réseaux, [adresse], est responsable du traitement de vos données personnelles collectées via ce site.",
          },
          {
            title: '2. Données collectées',
            content:
              "Nous collectons uniquement les données que vous nous transmettez volontairement via le formulaire de demande de devis : prénom, nom, adresse e-mail, téléphone, code postal, type de projet et description. Ces données sont nécessaires pour traiter votre demande.",
          },
          {
            title: '3. Finalités du traitement',
            content:
              "Vos données sont utilisées exclusivement pour : (a) vous contacter suite à votre demande de devis, (b) vous envoyer un accusé de réception par e-mail, (c) améliorer notre service client.",
          },
          {
            title: '4. Base juridique',
            content:
              "Le traitement est fondé sur votre consentement explicite donné lors de la soumission du formulaire (case à cocher).",
          },
          {
            title: '5. Destinataires des données',
            content:
              "Vos données ne sont partagées avec aucun tiers à des fins commerciales. Elles peuvent être transmises à notre prestataire d'envoi d'e-mail (Resend) dans le seul but de vous contacter.",
          },
          {
            title: '6. Durée de conservation',
            content:
              "Vos données de demande de devis sont conservées pendant 12 mois maximum à compter de votre demande, puis supprimées automatiquement.",
          },
          {
            title: '7. Vos droits',
            content:
              "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de vos données. Pour exercer ces droits, contactez-nous à : contact@affra-reseaux.fr. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).",
          },
          {
            title: '8. Cookies',
            content:
              "Ce site n'utilise pas de cookies de traçage ou publicitaires. Aucun cookie tiers n'est déposé sans votre consentement.",
          },
          {
            title: '9. Sécurité',
            content:
              "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, toute divulgation ou toute destruction.",
          },
        ].map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-2">{section.title}</h2>
            <p className="text-slate-300 leading-relaxed">{section.content}</p>
          </div>
        ))}

        <p className="text-slate-300 mt-8">
          Pour toute question relative à nos pratiques de confidentialité, contactez-nous à{' '}
          <a href="mailto:contact@affra-reseaux.fr" className="text-emerald-400 hover:underline">
            contact@affra-reseaux.fr
          </a>.
        </p>
      </div>
    </section>
  )
}
