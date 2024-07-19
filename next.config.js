/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['foodiful.shop'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kt-first-bucket.s3.ap-northeast-2.amazonaws.com/**',
      },
    ],
  },
  output: 'standalone',
}

module.exports = {
  ...nextConfig,
}
