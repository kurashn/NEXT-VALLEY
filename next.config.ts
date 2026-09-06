import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // www無しドメインをwww付きへ恒久リダイレクト（SEO: 評価の統合）
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'nextvalley-jpn.com' }],
        destination: 'https://www.nextvalley-jpn.com/:path*',
        permanent: true,
      },
      { source: '/blog/case-yuma-english-house', destination: '/blog/case-english-school-zero-to-14', permanent: true },
    ];
  },
};

export default nextConfig;
