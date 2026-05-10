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
  
  // Performance optimizations
  productionBrowserSourceMaps: false,
  compress: true,
  minify: true,
  swcMinify: true,
  
  // Optimize package size
  webpack: (config, { isServer }) => {
    config.optimization.minimize = true;
    return config;
  },
};

module.exports = nextConfig;
