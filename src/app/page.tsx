import Hero from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Representative } from "@/components/Representative";
import { Service } from "@/components/Service";
import { Works } from "@/components/Works";
import { Strategy } from "@/components/Strategy";
import { Roadmap } from "@/components/Roadmap";
import { CTA } from "@/components/CTA";
import { FloatingCTA } from "@/components/FloatingCTA";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FAQ } from "@/components/FAQ";
import { Benefits } from "@/components/Benefits";
import { Column } from "@/components/Column";

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ProfessionalService",
                "name": "NEXT VALLEY",
                "image": "https://next-valley.com/logo-new.png",
                "description": "教室・スクール運営者専門のデジタルパートナー。ホームページ制作、集客支援、業務効率化などをAIを活用して提供。",
                "url": "https://next-valley.com",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "JP"
                },
                "areaServed": "JP"
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "本当に無料ですか？後から請求されませんか？",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "はい、提案・デザイン作成までは完全に無料です。私たちの方針は「まず実物を見ていただくこと」です。気に入らなければ、その時点でお断りいただいて構いません。その場合、費用は一切かかりません。"
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "電話営業や、しつこい勧誘はありませんか？",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "電話営業は一切行いません。やり取りはすべてLINEまたはメールのみです。こちらから一方的に連絡することもありませんので、ご安心ください。"
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "まだ依頼するか決めていないのですが...",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "はい、全く問題ありません。「今のホームページをどう直せばいいか知りたい」という軽い気持ちでご相談ください。プロの視点から、具体的な改善案をお伝えします。"
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "制作期間はどれくらいですか？",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "AIを活用するため、通常1ヶ月かかる構築作業を最短3〜5日に短縮可能です。お急ぎの場合もぜひご相談ください。"
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      <Navbar />
      <Hero />
      <div id="problem"><Problem /></div>
      <div id="solution"><Solution /></div>
      <div id="strategy"><Strategy /></div>
      <Representative />
      <div id="service"><Service /></div>
      <div id="works"><Works /></div>
      <Roadmap />
      <Column />
      <FAQ />
      <Benefits />
      <CTA />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
