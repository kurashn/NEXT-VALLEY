import Hero from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Service } from "@/components/Service";
import { Reasons } from "@/components/Reasons";
import { Works } from "@/components/Works";
import { Pricing } from "@/components/Pricing";
import { Flow } from "@/components/Flow";
import { Representative } from "@/components/Representative";
import { FAQ, faqs } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIConsultProvider, SelfCheckSection } from "@/components/AIConsult";

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-base text-ink selection:bg-coral/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "name": "NEXT VALLEY",
                "url": "https://nextvalley-jpn.com",
                "logo": "https://nextvalley-jpn.com/og-image.png",
                "founder": { "@type": "Person", "name": "倉林 駿" },
                "foundingDate": "2021-01",
                "email": "info@nextvalley-jpn.com",
                "sameAs": []
              },
              {
                "@type": "ProfessionalService",
                "name": "NEXT VALLEY",
                "image": "https://nextvalley-jpn.com/og-image.png",
                "description":
                  "AI活用で売上と業務を変えるプロチーム。AI活用コンサルティング、HP・LP制作、SEO・MEO集客、SNSマーケティング、HP運用サポートを課題に合わせて提供。",
                "url": "https://nextvalley-jpn.com",
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
      <AIConsultProvider>
      <Navbar />
      <Hero />
      <div id="problem"><Problem /></div>
      <SelfCheckSection />
      <div id="service"><Service /></div>
      <div id="reason"><Reasons /></div>
      <div id="works"><Works /></div>
      <div id="price"><Pricing /></div>
      <div id="flow"><Flow /></div>
      <Representative />
      <FAQ />
      <CTA />
      <Footer />
      </AIConsultProvider>
    </main>
  );
}
