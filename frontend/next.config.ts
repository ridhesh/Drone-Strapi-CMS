import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'localhost', 
      '127.0.0.1',
      'drone-strapi-backend.onrender.com', // Add your Render Strapi domain
      'your-strapi-backend.onrender.com'   // Generic placeholder
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      // ADD THESE FOR RENDER DEPLOYMENT:
      {
        protocol: 'https',
        hostname: 'drone-strapi-backend.onrender.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.onrender.com', // Catch-all for any Render subdomain
        pathname: '/uploads/**',
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Add this to ignore problematic paths
  async rewrites() {
    return [
      {
        source: '/.well-known/:path*',
        destination: '/404',
      },
    ];
  },
  // ADD FOR BETTER RENDER COMPATIBILITY:
  output: 'standalone', // Better for production
  trailingSlash: false,
};

export default nextConfig;