import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#002335",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "NEXT VALLEY | 教室運営者のためのデジタルパートナー",
    template: "%s | NEXT VALLEY",
  },
  description: "生徒が集まらない、業務に追われる...その悩み、AIとデジタルで解決しませんか？NEXT VALLEYは、個人・小規模教室（ピアノ、英会話、ヨガ、学習塾など）専門のデジタルパートナーです。ホームページ制作から集客、業務効率化まで、まるごとサポートします。",
  keywords: ["教室 集客", "スクール 運営", "ホームページ制作", "AI活用", "業務効率化", "個人教室", "学習塾", "ピアノ教室", "英会話スクール", "ヨガスタジオ"],
  openGraph: {
    title: "NEXT VALLEY | 教室運営者のためのデジタルパートナー",
    description: "生徒が集まらない、業務に追われる...その悩み、AIとデジタルで解決しませんか？初期費用0円・月額制で、あなたの教室の「資産」を共に創ります。",
    url: "https://next-valley.com", // 仮のURL
    siteName: "NEXT VALLEY",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.png", // 後で画像を作成・配置する必要があるが、まずは定義
        width: 1200,
        height: 630,
        alt: "NEXT VALLEY - 教室運営者のためのデジタルパートナー",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXT VALLEY | 教室運営者のためのデジタルパートナー",
    description: "教室運営の悩みをデジタルで解決。初期費用0円・月額制のパートナー。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
