import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Maintenance } from "@/components/Maintenance";
import Script from "next/script";
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
  metadataBase: new URL("https://nextvalley-jpn.com"),
  title: {
    default: "NEXT VALLEY | AI活用で売上と業務を変えるプロチーム",
    template: "%s | NEXT VALLEY",
  },
  description: "集客がうまくいかない、業務に追われている。NEXT VALLEYはAI活用のプロチームです。マーケティングからHP・LP制作まで課題に合わせて提案し、売上アップと業務効率化を根本から支援します。診断・提案・見積もりは無料。",
  keywords: ["AI活用支援", "AIコンサルティング", "業務効率化", "Web集客", "ホームページ制作", "LP制作", "SEO対策", "MEO対策", "SNSマーケティング", "中小企業"],
  openGraph: {
    title: "NEXT VALLEY | AI活用で売上と業務を変えるプロチーム",
    description: "AI活用のプロチームが、マーケティングから制作まで課題に合わせて提案。売上アップと業務効率化を根本から支援します。診断・提案・見積もりは無料。",
    url: "https://nextvalley-jpn.com",
    siteName: "NEXT VALLEY",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NEXT VALLEY - AI活用で売上と業務を変えるプロチーム",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXT VALLEY | AI活用で売上と業務を変えるプロチーム",
    description: "AIで、売上と業務を根本から変える。マーケティングから制作まで、課題に合わせて提案します。診断・提案・見積もりは無料。",
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
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isMaintenanceMode ? <Maintenance /> : children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T6ZVHJKZ2S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T6ZVHJKZ2S');
          `}
        </Script>
        {/* CTAクリック計測: LINE・メールへの遷移をGA4イベントとして送る */}
        <Script id="cta-click-tracking" strategy="afterInteractive">
          {`
            document.addEventListener('click', function (e) {
              var a = e.target && e.target.closest ? e.target.closest('a') : null;
              if (!a || typeof gtag !== 'function') return;
              var href = a.getAttribute('href') || '';
              if (href.indexOf('lin.ee') !== -1) {
                gtag('event', 'line_click', {
                  event_category: 'cta',
                  event_label: (a.textContent || '').trim().slice(0, 50),
                  page_path: location.pathname,
                });
              } else if (href.indexOf('mailto:') === 0 || href === '/contact') {
                gtag('event', 'mail_click', {
                  event_category: 'cta',
                  event_label: (a.textContent || '').trim().slice(0, 50),
                  page_path: location.pathname,
                });
              }
            }, { capture: true });
          `}
        </Script>
        {/* Microsoft Clarity（NEXT_PUBLIC_CLARITY_ID を設定した場合のみ有効） */}
        {clarityId && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
