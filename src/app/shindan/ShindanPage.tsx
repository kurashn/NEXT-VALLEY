import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SerifHeading } from "@/components/ui/SerifHeading";
import { ShindanTool } from "@/components/ShindanTool";
import { langAttr, type Lang } from "@/i18n";
import { shindanJsonLd } from "@/lib/jsonld";

const ja = {
    h1: "Web集客セルフ診断（無料・3分）",
    headingEn: "Check",
    headingJp: "Web集客セルフ診断",
};
const en: typeof ja = {
    h1: "Website Self-Check (free, 3 minutes)",
    headingEn: "Check",
    headingJp: "Website Self-Check",
};
const copy: Record<Lang, typeof ja> = { ja, en };

export function shindanMetadata(lang: Lang): Metadata {
    if (lang === "ja") {
        return {
            title: "Web集客セルフ診断（無料・3分）",
            description:
                "15の質問に答えるだけで、あなたの会社のWeb集客の弱点が分かる無料セルフ診断。検索で見つからない、問い合わせが来ない、何から手を付ければいいか分からない。その原因をその場で特定します。",
        };
    }
    return {
        title: "Website Self-Check (Free, 3 Minutes)",
        description:
            "Answer 15 quick questions and find out where your website is losing customers. Not showing up in search, no inquiries, not sure where to start? Pinpoint the cause in 3 minutes — free, no sign-up.",
        openGraph: {
            title: "Website Self-Check (Free, 3 Minutes) | NEXT VALLEY",
            description:
                "Answer 15 quick questions and find out where your website is losing customers. Free, no sign-up.",
            url: "https://www.nextvalley-jpn.com/en/shindan",
            siteName: "NEXT VALLEY",
            locale: "en_US",
            type: "website",
        },
    };
}

export function ShindanPage({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <main className="min-h-screen bg-base text-ink" {...langAttr(lang)}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(shindanJsonLd(lang)) }}
            />
            <Navbar lang={lang} />
            <section className="px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-36">
                <div className="mx-auto max-w-3xl">
                    <h1 className="sr-only">{t.h1}</h1>
                    <SerifHeading en={t.headingEn} jp={t.headingJp} />
                    <ShindanTool lang={lang} />
                </div>
            </section>
            <Footer lang={lang} />
        </main>
    );
}
