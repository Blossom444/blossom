/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
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
    unoptimized: true,
  },
  // Static file serving configuration
  assetPrefix: '',
  basePath: '',
  output: 'standalone'
}

module.exports = nextConfig 