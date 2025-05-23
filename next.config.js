/** @type {import('next').NextConfig} */
// Updated configuration for better image handling and deployment
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost', 'vercel.app', 'vercel-production.up.railway.app'],
    unoptimized: true,
  },
  // Security and optimization
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Ensure proper handling of environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig 