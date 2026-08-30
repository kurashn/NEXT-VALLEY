import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/blog/case-yuma-english-house', destination: '/blog/case-english-school-zero-to-14', permanent: true },
    ];
  },
};

export default nextConfig;
