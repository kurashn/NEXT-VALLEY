import Hero from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Service } from "@/components/Service";
import { Reasons } from "@/components/Reasons";
import { Works } from "@/components/Works";
import { Pricing } from "@/components/Pricing";
import { Flow } from "@/components/Flow";
import { Representative } from "@/components/Representative";
import { FAQ, getFaqs } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIConsultProvider, SelfCheckSection } from "@/components/AIConsult";
import { langAttr, type Lang } from "@/i18n";
import { LangHtml } from "@/i18n/LangHtml";

const SITE = "https://www.nextvalley-jpn.com";

const jsonLdCopy = {
  ja: {
    founder: "倉林 駿",
    description:
      "埼玉北部の教室・お店のWeb集客を、制作から公開後の改善まで一貫して手がける制作チーム。2021年創業・50社以上の実績。教室ページ制作、ホームページ制作、集客サポート、SNSマーケティング、AI活用支援を課題に合わせて提供。",
  },
  en: {
    founder: "Shun Kurahayashi",
    description:
      "A small web team in northern Saitama, Japan, building sites for schools and shops since 2021: AI consulting, website & landing page production, SEO and Google Maps marketing, social media, and ongoing site support.",
  },
} as const;

export function HomePage({ lang = "ja" }: { lang?: Lang }) {
  const faqs = getFaqs(lang);
  const jl = jsonLdCopy[lang];
  const url = lang === "ja" ? SITE : `${SITE}/en`;
  return (
    <main id="top" className="min-h-screen bg-base text-ink selection:bg-coral/20" {...langAttr(lang)}>
      {lang === "en" && <LangHtml lang="en" />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "name": "NEXT VALLEY",
                "url": SITE,
                "logo": `${SITE}/og-image.png`,
                "founder": { "@type": "Person", "name": jl.founder },
                "foundingDate": "2021-01",
                "email": "info@nextvalley-jpn.com",
                "sameAs": []
              },
              {
                "@type": "ProfessionalService",
                "name": "NEXT VALLEY",
                "image": `${SITE}/og-image.png`,
                "description": jl.description,
                "url": url,
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "JP",
                },
                "areaServed": "JP",
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map((faq) => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a,
                  },
                })),
              },
            ],
          }),
        }}
      />
      <AIConsultProvider lang={lang}>
      <Navbar lang={lang} />
      <Hero lang={lang} />
      <div id="problem"><Problem lang={lang} /></div>
      <SelfCheckSection lang={lang} />
      <div id="service"><Service lang={lang} /></div>
      <div id="reason"><Reasons lang={lang} /></div>
      <div id="works"><Works lang={lang} /></div>
      <div id="price"><Pricing lang={lang} /></div>
      <div id="flow"><Flow lang={lang} /></div>
      <Representative lang={lang} />
      <FAQ lang={lang} />
      <CTA lang={lang} />
      <Footer lang={lang} />
      </AIConsultProvider>
    </main>
  );
}
