import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/utils/metadata'
import { CONTACT_EMAIL } from '@/lib/contact'
import { ORGANIZATION_ADDRESS, ORGANIZATION_NAME } from '@/lib/schema/organization'

// Mêmes coordonnées que les mentions légales et les données structurées (source unique).
const SIEGE = `${ORGANIZATION_ADDRESS.streetAddress}, ${ORGANIZATION_ADDRESS.postalCode} ${ORGANIZATION_ADDRESS.addressLocality}`

export const metadata: Metadata = buildMetadata({
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et traitement des données personnelles AFFRA RESEAUX.',
  path: '/politique-confidentialite',
})

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="bg-slate-900 py-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Politique de confidentialité</h1>

        <p className="text-slate-400 mb-8">Dernière mise à jour : octobre 2026</p>

        {[
          {
            title: '1. Responsable du traitement',
            content:
              `${ORGANIZATION_NAME}, SARL dont le siège social est situé ${SIEGE}, est responsable du traitement de vos données personnelles collectées via ce site.`,
          },
          {
            title: '2. Données collectées',
            content:
              "Nous collectons uniquement les données que vous nous transmettez volontairement : via le formulaire de demande de devis (prénom, nom, adresse e-mail, téléphone, code postal, type de projet et description) et via le bouton « Être appelé pour une visite technique gratuite » (nom et téléphone). Ces données sont nécessaires pour traiter votre demande. Lorsque vous nous transmettez une demande, elle est associée à votre parcours sur le site (pages consultées, provenance, clics sur nos coordonnées), enregistré grâce au cookie décrit à l'article 8.",
          },
          {
            title: '3. Finalités du traitement',
            content:
              "Vos données sont utilisées exclusivement pour : (a) vous contacter suite à votre demande de devis ou de rappel, et vous recontacter au sujet de votre projet, (b) vous envoyer un accusé de réception par e-mail, (c) améliorer notre service client et mesurer l'efficacité de nos actions de communication.",
          },
          {
            title: '4. Base juridique',
            content:
              "Le traitement est fondé sur votre consentement explicite donné lors de l'envoi du formulaire de devis ou de la demande de rappel (case à cocher). Vous pouvez retirer ce consentement à tout moment en nous écrivant.",
          },
          {
            title: '5. Destinataires des données',
            content:
              "Vos données ne sont partagées avec aucun tiers à des fins commerciales. Elles peuvent être transmises à nos prestataires techniques dans le seul but de traiter votre demande : notre prestataire d'envoi d'e-mail (Resend) et la messagerie Telegram, utilisée pour prévenir notre équipe de chaque nouvelle demande.",
          },
          {
            title: '6. Durée de conservation',
            content:
              "Vos données de demande de devis sont conservées pendant 12 mois maximum à compter de votre demande, puis supprimées automatiquement. Une demande de rappel (nom, téléphone) et le parcours associé sont supprimés automatiquement après 13 mois sans nouvelle visite, sauf si vous êtes devenu client (les données nécessaires à la facturation sont conservées selon les obligations comptables).",
          },
          {
            title: '7. Vos droits',
            content:
              `Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de vos données. Pour exercer ces droits, contactez-nous à : ${CONTACT_EMAIL}. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).`,
          },
          {
            title: '8. Cookies',
            content:
              "Ce site n'utilise aucun cookie publicitaire ni cookie tiers. Il dépose un unique cookie first-party, « affra_vid », contenant un identifiant aléatoire (aucune donnée personnelle, aucune empreinte de navigateur). Il sert à mesurer la provenance des visites (moteur de recherche, fiche Google, assistant IA, campagne…) et les pages consultées, et à les rattacher à une éventuelle demande de devis ou de rappel ou à un clic sur nos coordonnées, afin d'évaluer l'efficacité de nos actions de communication. Il expire au bout de 13 mois ; les données de visite associées sont supprimées au-delà de cette durée lorsqu'elles ne sont liées à aucune demande. Vous pouvez le supprimer à tout moment depuis les paramètres de votre navigateur.",
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
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-400 hover:underline">
            {CONTACT_EMAIL}
          </a>.
        </p>
      </div>
    </section>
  )
}
