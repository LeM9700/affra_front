import type { Metadata } from 'next'

const SITE_URL = 'https://affra-reseaux.fr'
const SITE_NAME = 'AFFRA Réseaux'
const DEFAULT_OG = '/images/og/og-default.png'

export function buildMetadata({
  title,
  description,
  path = '/',
  ogImage = DEFAULT_OG,
}: {
  title: string
  description: string
  path?: string
  ogImage?: string
}): Metadata {
  const url = `${SITE_URL}${path}`

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${ogImage}`, width: 1200, height: 630 }],
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
