import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    // /demo/tulip で index.html を表示（内部リンクは絶対パス化済みなので崩れない）
    return [{ source: "/demo/tulip", destination: "/demo/tulip/index.html" }];
  },
  async headers() {
    // デザイン確認用プレビュー（public/demo/）は検索エンジンに載せない。
    // お客様の実サイトと重複コンテンツになるのを防ぐため（ロリポップの .htaccess の代替）
    return [
      {
        source: "/demo/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
