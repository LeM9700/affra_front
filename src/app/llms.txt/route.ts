import { getBlogPosts } from '@/lib/api/blog'
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY_NATIONAL } from '@/lib/contact'
import { ORGANIZATION_ADDRESS, ORGANIZATION_NAME, SITE_URL } from '@/lib/schema/organization'
import { buildLlmsTxt } from '@/lib/seo/llms'
import { aVille } from '@/lib/utils/preposition'
import { OFFRES, ORDRE_OFFRES } from '@/data/offres'
import { REALISATIONS } from '@/data/realisations'
import { villesSeo } from '@/data/villes-seo'

/** Regénéré au plus toutes les heures : suit les nouveaux articles sans requête à chaque lecture. */
export const revalidate = 3600

/**
 * GET /llms.txt : résumé du site pour les assistants IA (convention llmstxt.org).
 * Le blog est facultatif : si l'API ne répond pas, le fichier est servi sans la liste d'articles.
 */
export async function GET(): Promise<Response> {
  const articles = await getBlogPosts().catch(() => [])
  const { streetAddress, postalCode, addressLocality } = ORGANIZATION_ADDRESS

  const body = buildLlmsTxt({
    siteUrl: SITE_URL,
    name: ORGANIZATION_NAME,
    summary:
      'Entreprise qualifiée IRVE basée à Nîmes, spécialisée dans l’installation de bornes de recharge pour véhicules électriques dans le Gard (30) et l’Hérault (34) : particuliers, copropriétés, professionnels et promoteurs.',
    facts: [
      `Adresse : ${streetAddress}, ${postalCode} ${addressLocality}, Occitanie, France`,
      `Téléphone : ${CONTACT_PHONE_DISPLAY_NATIONAL} · E-mail : ${CONTACT_EMAIL}`,
      'Qualification IRVE délivrée par AFNOR Certification ; équipe formée IRVE P1, P2 et P3',
      'Assurance responsabilité civile décennale',
      'Visite technique gratuite et sans engagement à domicile, devis détaillé généralement transmis sous 24 heures après la visite',
      'Puissances installées : de la prise renforcée 3,7 kW à la borne triphasée 22 kW',
      'Prix affichés TTC, main d’œuvre et matériel compris ; TVA à 5,5 % applicable sous conditions',
      `Zone d’intervention : Gard et Hérault, notamment ${villesSeo.map((v) => v.nom).join(', ')}`,
    ],
    pages: [
      { title: 'Accueil', path: '/', description: 'présentation, offres et avis clients' },
      { title: 'Offres et prix', path: '/offres', description: 'comparatif des bornes installées, prix pose comprise, FAQ' },
      { title: 'Particuliers', path: '/services/particuliers', description: 'borne à domicile, maison individuelle et garage' },
      { title: 'Copropriétés', path: '/services/coproprietes', description: 'droit à la prise, recharge collective, comptage individuel' },
      { title: 'Professionnels', path: '/services/professionnels', description: 'flottes d’entreprise et parkings' },
      { title: 'Promoteurs', path: '/services/promoteurs', description: 'pré-équipement et équipement des programmes neufs' },
      { title: 'Réalisations', path: '/realisations', description: 'chantiers réels avec photos et détails techniques' },
      { title: 'Zone d’intervention', path: '/zone-intervention', description: 'carte et communes couvertes' },
      { title: 'Qui sommes-nous', path: '/a-propos', description: 'histoire, méthode, équipe et qualifications' },
      { title: 'Demande de devis', path: '/devis', description: 'formulaire de devis gratuit' },
    ],
    offres: ORDRE_OFFRES.map((id) => {
      const o = OFFRES[id]
      return { titre: o.titre, marque: o.marque, prixTtc: o.prixTtc, soustitre: o.detail.soustitre, anchor: o.id }
    }),
    villes: villesSeo.map((v) => ({ ...v, aVille: aVille(v.nom) })),
    realisations: [...REALISATIONS],
    // L'API ne renvoie que les articles publiés.
    articles: articles.map((a) => ({ titre: a.titre, slug: a.slug, description: a.meta_description })),
    optional: [
      { title: 'Blog', path: '/blog' },
      { title: 'Mentions légales', path: '/mentions-legales' },
      { title: 'Politique de confidentialité', path: '/politique-confidentialite' },
    ],
  })

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  })
}
