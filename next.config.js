const cms = process.env.STRAPI_URL ? new URL(process.env.STRAPI_URL) : null

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Avoid the default 1200px-to-1920px jump for Retina photo viewers.
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1440, 1600, 1920, 2048, 2400],
    remotePatterns: cms ? [{
      protocol: cms.protocol.slice(0, -1),
      hostname: cms.hostname,
      port: cms.port,
      pathname: '/uploads/**',
    }] : [],
  },
}

module.exports = nextConfig
