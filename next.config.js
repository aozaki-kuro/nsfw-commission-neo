/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cleanDistDir: true,
  images: {
    unoptimized: false,
  },

  // Ignore Lint during Build
  eslint: {
    ignoreDuringBuilds: true,
  },

  ...(process.env.CF_PAGES === 'true'
    ? { output: 'export' } // Use static output for Cloudflare Pages
    : null),
}

module.exports = nextConfig
