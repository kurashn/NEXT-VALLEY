// Server Component — 公開後の集客改善（別途お見積もりの領域）
// 不安をあおらず、必要になったときだけ相談できることを伝える

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading } from "@/components/ui/SerifHeading";
import { type Lang } from "@/i18n";

const ja = {
    heading: "公開したあとの集客改善",
    lead: (
        <>
            公開後に「もっと問い合わせを増やしたい」と思ったときに、必要な範囲だけご相談いただけます。
            <br className="hidden md:block" />
            月額のホームページ制作・管理だけでも、そのまま使い続けて<span className="nowrap">いただけます。</span>
        </>
    ),
    cases: [
        {
            key: "cv",
            when: "サイトは見られているのに、問い合わせが少ない",
            what: "サービスや体験のページと、問い合わせまでの案内を見直します。どの画面で止まっているかを確かめてから直します。",
        },
        {
            key: "meo",
            when: "地域の人に見つけてもらえていない",
            what: "Googleマップの登録内容と、検索での見え方の現状を確認します。写真や情報の不足を埋めるところから始めます。",
        },
        {
            key: "line",
            when: "LINEを追加してもらったあと、相談が止まる",
            what: "最初に届く案内の内容と、日程を決めるまでの手順を見直します。やり取りの回数を減らすのが目的です。",
        },
    ],
    flowTitle: "進め方",
    flow: [
        "アクセス数や問い合わせの数、事業の状況をうかがいます",
        "どこで止まっているのかを一緒に確認します",
        "必要な範囲だけをお見積もりします",
    ],
    note: "内容に応じてお見積もりします。金額に納得いただいてから着手します。",
};

const en: typeof ja = {
    heading: "Marketing after launch",
    lead: (
        <>
            When you want more enquiries after launch, you can ask for just the part you need. The monthly build-and-manage plan works on its own too.
        </>
    ),
    cases: [
        {
            key: "cv",
            when: "People visit, but few get in touch",
            what: "We review the service pages and the path to an enquiry, after checking where people stop.",
        },
        {
            key: "meo",
            when: "Local customers don't find you",
            what: "We check your Google Maps listing and how you appear in search, then fill in what's missing.",
        },
        {
            key: "line",
            when: "Chats go quiet after a LINE follow",
            what: "We review the first message and the steps to agree on a date, to cut the back and forth.",
        },
    ],
    flowTitle: "How it goes",
    flow: [
        "We ask about your visits, enquiries and current situation",
        "We look together at where people are stopping",
        "We quote for only the part that needs work",
    ],
    note: "Quoted to fit the work. Nothing starts until you agree to the price.",
};

const copy: Record<Lang, typeof ja> = { ja, en };

export function AfterLaunch({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-cream px-4 py-16 md:px-6 md:py-24">
            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <SerifHeading en="Growth" jp={t.heading} />
                    <p className="lead -mt-6 mb-10 text-[15px] leading-[2] tracking-[0.03em] text-ink-sub md:mb-12">
                        {t.lead}
                    </p>
                </FadeIn>

                <ul className="mb-8 grid gap-4 md:grid-cols-3">
                    {t.cases.map((c, i) => (
                        <li key={c.key} className="list-none">
                            <FadeIn delay={i * 0.07} className="h-full">
                                <div className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-[0_16px_40px_rgba(31,26,20,0.06)]">
                                    <p className="mb-3 text-[15px] font-bold leading-snug text-ink">{c.when}</p>
                                    <p className="text-[14px] leading-[2] text-ink-sub">{c.what}</p>
                                </div>
                            </FadeIn>
                        </li>
                    ))}
                </ul>

                <FadeIn>
                    <div className="rounded-2xl border border-line bg-base p-7 md:p-8">
                        <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-ink-sub">{t.flowTitle}</p>
                        <ol className="grid gap-3 md:grid-cols-3">
                            {t.flow.map((f, i) => (
                                <li key={f} className="flex gap-3 text-[14px] leading-[1.9] text-ink">
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-deep text-[12px] font-bold text-white">
                                        {i + 1}
                                    </span>
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ol>
                        <p className="mt-5 border-t border-line pt-4 text-[13px] leading-[1.9] text-ink-sub">{t.note}</p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
