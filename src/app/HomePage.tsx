import Hero from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Service } from "@/components/Service";
import { Works } from "@/components/Works";
import { Case } from "@/components/Case";
import { AfterLaunch } from "@/components/AfterLaunch";
import { Pricing } from "@/components/Pricing";
import { Flow } from "@/components/Flow";
import { Representative } from "@/components/Representative";
import { FAQ, getFaqs } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { langAttr, type Lang } from "@/i18n";
import { LangHtml } from "@/i18n/LangHtml";

const SITE = "https://www.nextvalley-jpn.com";

const jsonLdCopy = {
  ja: {
    founder: "倉林 駿",
    description:
      "埼玉の小さな会社・店舗・教室のホームページ制作と、公開後の更新・集客改善。代表は本庄市児玉町出身。2021年創業・100社以上の実績。ホームページ制作・管理は初期費用0円、月額8,980円（税込）。全国オンライン対応。",
  },
  en: {
    founder: "Shun Kurahayashi",
    description:
      "A web team from northern Saitama, Japan, building and managing websites for small companies, shops and schools since 2021. No setup fee, 8,980 yen per month including tax, with marketing support quoted separately.",
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
      <Navbar lang={lang} />
      <Hero lang={lang} />
      <div id="case" className="scroll-mt-24"><Case lang={lang} /></div>
      <div id="problem" className="scroll-mt-24"><Problem lang={lang} /></div>
      <div id="service" className="scroll-mt-24"><Service lang={lang} /></div>
      <div id="price" className="scroll-mt-24"><Pricing lang={lang} /></div>
      <div id="works" className="scroll-mt-24"><Works lang={lang} /></div>
      <div id="growth" className="scroll-mt-24"><AfterLaunch lang={lang} /></div>
      <div id="flow" className="scroll-mt-24"><Flow lang={lang} /></div>
      <Representative lang={lang} />
      <FAQ lang={lang} />
      <CTA lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
