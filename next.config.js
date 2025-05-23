/** @type {import('next').NextConfig} */
// Updated configuration for better image handling and deployment
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost'],
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
}

module.exports = nextConfig 