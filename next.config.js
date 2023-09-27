/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kt-first-bucket.s3.ap-northeast-2.amazonaws.com/**',
      },
    ],
  },
}

module.exports = {
  ...nextConfig,
}
