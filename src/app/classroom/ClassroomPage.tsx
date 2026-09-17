// 業種別ページ：教室・スクール向け。トップと同じ部品を「教室向け」の文言で組む

import Hero from "@/components/Hero";
import { Case } from "@/components/Case";
import { Problem } from "@/components/Problem";
import { Service } from "@/components/Service";
import { Pricing } from "@/components/Pricing";
import { AfterLaunch } from "@/components/AfterLaunch";
import { Flow } from "@/components/Flow";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { langAttr, type Lang } from "@/i18n";
import { LangHtml } from "@/i18n/LangHtml";

export function ClassroomPage({ lang = "ja" }: { lang?: Lang }) {
    return (
        <main id="top" className="min-h-screen bg-base text-ink selection:bg-coral/20" {...langAttr(lang)}>
            {lang === "en" && <LangHtml lang="en" />}
            <Navbar lang={lang} />
            <Hero lang={lang} audience="classroom" />
            <div id="case" className="scroll-mt-24"><Case lang={lang} /></div>
            <div id="problem" className="scroll-mt-24"><Problem lang={lang} audience="classroom" /></div>
            <div id="service" className="scroll-mt-24"><Service lang={lang} audience="classroom" /></div>
            <div id="price" className="scroll-mt-24"><Pricing lang={lang} /></div>
            <div id="growth" className="scroll-mt-24"><AfterLaunch lang={lang} /></div>
            <div id="flow" className="scroll-mt-24"><Flow lang={lang} /></div>
            <FAQ lang={lang} />
            <CTA lang={lang} />
            <Footer lang={lang} />
        </main>
    );
}
