import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SerifHeading } from "@/components/ui/SerifHeading";
import { ShindanTool } from "@/components/ShindanTool";
import { langAttr, type Lang } from "@/i18n";
import { shindanJsonLd } from "@/lib/jsonld";
import { shindanSlotsJa, shindanSlotsEn } from "@/lib/shindanSlots";

const ja = {
    h1: "Web集客セルフ診断（無料・3分）",
    headingEn: "Check",
    headingJp: "Web集客セルフ診断",
    pro: {
        badge: shindanSlotsJa,
        heading: "もっと詳しく知りたい方へ — プロによる無料診断",
        lead: "セルフ診断よりさらに踏み込んで、私たちが実際にあなたのサイトをスマホとパソコンで拝見し、A4数ページの診断書にしてお返しします。もちろん無料で、しつこい営業はありません。",
        checkTitle: "拝見する8項目",
        checks: [
            "ホームページの内容",
            "スマホでの表示・速さ",
            "検索での見つかりやすさ",
            "Googleマップ",
            "SNS",
            "LINE・フォーム",
            "問い合わせまでの導線",
            "競合との比較",
        ],
        getTitle: "お返しするもの",
        gets: "問題点 → 原因 → 改善策 → 直す順番、をまとめた診断書（PDF）。ご自身で直せる箇所は、そのやり方まで書いてあります。",
        cta: "LINEでサイトのURLを送る",
        note: "2営業日以内にお返しします・費用はかかりません",
    },
};
const en: typeof ja = {
    h1: "Website Self-Check (free, 3 minutes)",
    headingEn: "Check",
    headingJp: "Website Self-Check",
    pro: {
        badge: shindanSlotsEn,
        heading: "Want to go deeper? Get a free professional check-up",
        lead: "Beyond the self-check, we personally review your site on both phone and desktop and send you a written report of several pages. Free, with no pushy sales.",
        checkTitle: "The 8 things we review",
        checks: [
            "Website content",
            "Mobile display & speed",
            "Search visibility",
            "Google Maps",
            "Social media",
            "LINE & contact forms",
            "Path to inquiry",
            "Comparison with competitors",
        ],
        getTitle: "What you get",
        gets: "A written report (PDF): problems → causes → fixes → what to do first. Where something is easy to fix yourself, we include the how-to.",
        cta: "Send us your URL on LINE",
        note: "Delivered within 2 business days — free of charge",
    },
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

                    <div className="mt-16 rounded-2xl bg-[#002335] p-8 text-white md:p-10">
                        <p className="mb-4">
                            <span className="inline-block rounded-full bg-[#e26c5c] px-3 py-1 text-xs font-bold tracking-wider text-white">{t.pro.badge}</span>
                        </p>
                        <h2 className="mb-4 text-xl font-bold md:text-2xl">{t.pro.heading}</h2>
                        <p className="mb-8 leading-[1.9] text-white/85">{t.pro.lead}</p>
                        <div className="mb-8 grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="mb-3 text-sm font-bold tracking-wider text-[#e26c5c]">{t.pro.checkTitle}</h3>
                                <ul className="grid grid-cols-1 gap-y-1.5 text-sm text-white/90 sm:grid-cols-2 sm:gap-x-4">
                                    {t.pro.checks.map((c) => (
                                        <li key={c} className="flex items-start gap-1.5">
                                            <span aria-hidden className="mt-[2px] text-[#e26c5c]">✓</span>
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 text-sm font-bold tracking-wider text-[#e26c5c]">{t.pro.getTitle}</h3>
                                <p className="text-sm leading-[1.9] text-white/90">{t.pro.gets}</p>
                            </div>
                        </div>
                        <a
                            href="https://lin.ee/N4QXdJL"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#e26c5c] px-8 py-4 text-[19px] font-bold text-white transition-opacity hover:opacity-90"
                        >
                            {t.pro.cta}
                        </a>
                        <p className="mt-3 text-sm text-white/70">{t.pro.note}</p>
                    </div>
                </div>
            </section>
            <Footer lang={lang} />
        </main>
    );
}
