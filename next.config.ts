// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // ⭐ PERMET LES IMAGES LOCALES
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'projet-aubin-backend-production.up.railway.app',
        pathname: '/uploads/**',
      },
      // ⭐ Domaines futurs (aubinromain.com) - au cas où
      {
        protocol: 'https',
        hostname: '**.up.railway.app',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'aubinromain.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.aubinromain.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;