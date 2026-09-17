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
      // 旧サイトのURL（2025年まで検索評価があったページ）を、いちばん近い今のページへ恒久転送
      { source: '/saitama-hp', destination: '/saitama-hokubu', permanent: true },
      { source: '/local-seo', destination: '/blog/local-seo-keywords', permanent: true },
      { source: '/homepage-info', destination: '/blog/website-preparation', permanent: true },
      { source: '/free-img', destination: '/blog/website-preparation', permanent: true },
      { source: '/english-marketing', destination: '/blog/no-students-reasons', permanent: true },
      { source: '/web-kanji', destination: '/company', permanent: true },
      { source: '/works', destination: '/#works', permanent: true },
      { source: '/about', destination: '/company', permanent: true },
      { source: '/recruit', destination: '/partner', permanent: true },
      // 削除したページ（英語版・教室向け・セルフ診断）
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/shindan', destination: '/preview', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
      { source: '/shindan', destination: '/preview', permanent: true },
      { source: '/classroom', destination: '/', permanent: true },
      { source: '/report-sample.html', destination: '/blog/monthly-report-sample', permanent: true },
    ];
  },
};

export default nextConfig;
