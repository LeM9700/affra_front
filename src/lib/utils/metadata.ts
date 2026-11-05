import type { Metadata } from 'next'

const SITE_URL = 'https://affra-reseaux.fr'
const SITE_NAME = 'AFFRA RESEAUX'
const DEFAULT_OG = '/images/og/og-default.png'

/**
 * Metadata communes (title, description, canonical absolu, Open Graph, Twitter).
 *
 * @param options.title - Titre de la page ; suffixé par « | AFFRA RESEAUX » sauf si `absoluteTitle`.
 * @param options.absoluteTitle - Le titre contient déjà la marque : utilisé tel quel (`title.absolute`).
 * @param options.description - Meta description.
 * @param options.path - Chemin de la page (canonical = SITE_URL + path).
 * @param options.ogImage - Image Open Graph (chemin absolu depuis la racine du site).
 * @param options.ogImageAlt - Texte alternatif de l'image Open Graph.
 * @returns Objet Metadata Next.js.
 */
export function buildMetadata({
  title,
  absoluteTitle = false,
  description,
  path = '/',
  ogImage = DEFAULT_OG,
  ogImageAlt,
}: {
  title: string
  absoluteTitle?: boolean
  description: string
  path?: string
  ogImage?: string
  ogImageAlt?: string
}): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${ogImage}`, width: 1200, height: 630, ...(ogImageAlt ? { alt: ogImageAlt } : {}) }],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}${ogImage}`],
    },
  }
}
