/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.ctfassets.net', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizeCss: true,
  },
  async rewrites() {
    return [
      {
        source: '/contentful-app',
        destination: '/contentful-app/index.html',
      },
    ];
  },
  // Handle missing environment variables gracefully
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || '',
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || '',
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
