/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['tailwindui.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
