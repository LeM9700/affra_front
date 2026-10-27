import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AFFRA RESEAUX — Installation IRVE',
    short_name: 'AFFRA RESEAUX',
    description:
      'Installateur qualifié IRVE de bornes de recharge dans le Gard (30) et l’Hérault (34).',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFC',
    theme_color: '#5BBF8A',
    icons: [
      {
        src: '/icons/affra_logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/affra_logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
