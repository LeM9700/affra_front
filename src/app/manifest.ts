import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AFFRA Réseaux — Installation IRVE',
    short_name: 'AFFRA Réseaux',
    description:
      'Installateur certifié IRVE en Hérault, Gard, Vaucluse, Bouches-du-Rhône, Aude et Pyrénées-Orientales.',
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
