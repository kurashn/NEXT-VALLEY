// Server Component — 公開したあとの集客改善（grouthdesign-v2.png の再現）

import React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeadV4 } from "@/components/ui/SectionHeadV4";
import { heavy, V4 } from "@/lib/fonts-v4";
import { type Lang } from "@/i18n";

import { GrowthHp, GrowthMap, GrowthLine } from "@/components/ui/GrowthIllust";

const LINE_URL = "https://lin.ee/N4QXdJL";
const BG = "#FBF8F3";

type Item = { no: string; Illust: React.ComponentType<{ className?: string }>; title: string; sub: string; body: React.ReactNode };

const ja = {
    eyebrow: "公開したあとの集客改善",
    title: (
        <>
            <span className="inline-block border-b-[3px] pb-0.5" style={{ borderColor: V4.teal }}>必要なところから、</span>
            <span className="nowrap">集客を整える。</span>
        </>
    ),
    lead: <><span className="nowrap">「もっと問い合わせを増やしたい」ときに、</span><span className="nowrap">必要な支援だけ。</span></>,
    items: [
        { no: "01", Illust: GrowthHp, title: "ホームページ", sub: "問い合わせまで、迷わせない。", body: <><span className="nowrap">ページと問い合わせへの案内を</span><span className="nowrap">見直します。</span></> },
        { no: "02", Illust: GrowthMap, title: "Googleマップ", sub: "地域の人に、見つけてもらう。", body: <><span className="nowrap">登録情報・写真・検索での見え方を</span><span className="nowrap">整えます。</span></> },
        { no: "03", Illust: GrowthLine, title: "LINE", sub: "友だち追加の、その先へ。", body: <><span className="nowrap">最初の案内から予約までの流れを</span><span className="nowrap">整えます。</span></> },
    ] as Item[],
    steps: ["現状を確認", "課題を整理", "必要な支援をお見積もり"],
    note1: <><span className="nowrap">追加支援は別途お見積もり。</span><span className="nowrap">内容・金額にご納得いただいてから着手します。</span></>,
    note2: <><span className="nowrap">ホームページ制作・管理の基本プランだけでも、</span><span className="nowrap">ご利用いただけます。</span></>,
    link: "今のホームページを無料診断する",
};

const en: typeof ja = {
    eyebrow: "GROWTH AFTER LAUNCH",
    title: (
        <>
            <span className="inline-block border-b-[3px] pb-0.5" style={{ borderColor: V4.teal }}>Start where it matters,</span> and grow enquiries.
        </>
    ),
    lead: <>When you want more enquiries, only the support you need.</>,
    items: [
        { no: "01", Illust: GrowthHp, title: "Website", sub: "A clear path to the enquiry.", body: <>We review the pages and how they lead to contact.</> },
        { no: "02", Illust: GrowthMap, title: "Google Maps", sub: "Get found by people nearby.", body: <>Listing details, photos and how you appear in search.</> },
        { no: "03", Illust: GrowthLine, title: "LINE", sub: "Beyond the friend add.", body: <>From the first message to the booking.</> },
    ] as Item[],
    steps: ["Review the current state", "Sort the issues", "Quote only what is needed"],
    note1: <>Extra support is quoted separately and starts only after you agree to the scope and price.</>,
    note2: <>The basic build-and-manage plan works on its own, too.</>,
    link: "Get a free check of your site",
};

const copy: Record<Lang, typeof ja> = { ja, en };

export function AfterLaunch({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden px-4 py-14 md:px-6 md:py-20" style={{ backgroundColor: BG }}>
            <div className="relative mx-auto max-w-6xl">
                <SectionHeadV4 word="Growth" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

                <ul className="grid gap-10 md:grid-cols-3 md:gap-0">
                    {t.items.map((it, i) => (
                        <li key={it.no} className={`flex flex-col items-center px-2 text-center md:px-6 ${i > 0 ? "md:border-l" : ""}`} style={{ borderColor: "rgba(20,51,90,0.18)" }}>
                            <FadeIn delay={i * 0.07} className="flex flex-col items-center">
                                <div className="flex h-[200px] items-center justify-center md:h-[215px]">
                                    <it.Illust className="h-auto w-[260px] max-w-full md:w-[300px]" />
                                </div>
                                <p className="mt-4 text-[14px] font-bold tracking-[0.1em]" style={{ color: V4.teal }}>{it.no}</p>
                                <h3 className={`${heavy.className} mt-1 text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.3]`} style={{ color: V4.navy }}>{it.title}</h3>
                                <p className="mt-3 text-[15px] font-bold md:text-[16px]" style={{ color: V4.navy }}>{it.sub}</p>
                                <p className="mt-2 text-[13.5px] leading-[1.8] md:text-[14px]" style={{ color: V4.sub }}>{it.body}</p>
                            </FadeIn>
                        </li>
                    ))}
                </ul>

                <div className="mt-12 border-t pt-7" style={{ borderColor: "rgba(20,51,90,0.18)" }}>
                    <ol className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        {t.steps.map((s, i) => (
                            <li key={s} className="flex items-center gap-6 text-[15px] font-bold md:text-[17px]" style={{ color: V4.navy }}>
                                <span><span className="mr-3 tabular-nums" style={{ color: V4.teal }}>0{i + 1}</span>{s}</span>
                                {i < t.steps.length - 1 && <ArrowRight className="h-5 w-5" strokeWidth={1.5} style={{ color: V4.teal }} aria-hidden />}
                            </li>
                        ))}
                    </ol>
                    <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-1 text-[12.5px] leading-[1.8] md:flex-row md:gap-6 md:text-[13px]" style={{ color: V4.sub }}>
                            <p>{t.note1}</p>
                            <span aria-hidden className="hidden h-5 w-px self-center md:block" style={{ backgroundColor: "rgba(20,51,90,0.25)" }} />
                            <p>{t.note2}</p>
                        </div>
                        <a
                            href={LINE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[15px] font-bold underline decoration-2 underline-offset-[6px]"
                            style={{ color: V4.coralDeep }}
                        >
                            {t.link}
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
