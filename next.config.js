/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Avoid the default 1200px-to-1920px jump for Retina photo viewers.
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1440, 1600, 1920, 2048, 2400],
  },
}

module.exports = nextConfig
