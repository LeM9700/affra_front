/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output for better serverless performance on Netlify
  output: 'standalone',
  
  // Image optimization
  images: {
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
};

module.exports = nextConfig;
