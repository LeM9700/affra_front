/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output for better serverless performance on Netlify
  output: 'standalone',
  
  // Image optimization
  images: {
    // AVIF en priorité (plus léger), WebP en repli
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.railway.app',
        pathname: '/images/**',
      },
    ],
  },
  
  // Performance optimizations (Turbopack handles this)
  productionBrowserSourceMaps: false,

  async redirects() {
    return [
      // Zone recentrée sur le Gard et l'Hérault : l'ancienne page Arles (13) reste indexée,
      // on transfère son référencement vers la page zone d'intervention.
      { source: '/zone-intervention/arles', destination: '/zone-intervention', statusCode: 301 },
    ]
  },
};

module.exports = nextConfig;
