/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav|ico|png|jpg|jpeg|gif|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
        },
      },
    });
    return config;
  },
  images: {
    domains: ['localhost'],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/static/**',
      },
    ],
  },
  // Static file serving configuration
  assetPrefix: process.env.NODE_ENV === 'production' ? '/_next' : '',
  basePath: '',
  output: 'standalone',
  // Add proper static file handling
  publicRuntimeConfig: {
    staticFolder: '/public',
  },
  // Configure static file serving
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Configure static file serving
  async rewrites() {
    return [
      {
        source: '/static/:path*',
        destination: '/public/:path*',
      },
      {
        source: '/assets/:path*',
        destination: '/public/assets/:path*',
      },
      {
        source: '/icons/:path*',
        destination: '/public/icons/:path*',
      },
      {
        source: '/images/:path*',
        destination: '/public/images/:path*',
      },
    ];
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