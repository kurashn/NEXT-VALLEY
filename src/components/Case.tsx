// Server Component — 教室の支援事例（英会話教室）
// 数字と支援範囲は /blog/case-english-school-zero-to-14 の一次情報に合わせる。成果の保証はしない

import React from "react";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading } from "@/components/ui/SerifHeading";
import { withLang, type Lang } from "@/i18n";

const ja = {
    heading: "教室の支援事例",
    lead: (
        <>
            子ども向けの英会話教室のご支援です。教室名と地域は、先生のご希望で伏せています。
            <br className="hidden md:block" />
            ここに載せているのは、毎月お渡ししているレポートの<span className="nowrap">実数です。</span>
        </>
    ),
    beforeLabel: "ご相談の前",
    before: [
        "ホームページは先生が自作したものが1つだけ",
        "体験レッスンの申込は「お問い合わせ」ページの中。電話かメールのみ",
        "LINE公式アカウントなし",
        "目的の違うコースの案内が、同じページに混ざっていた",
    ],
    afterLabel: "行ったこと",
    after: [
        "ホームページを作り直し、最初の画面に体験レッスンの入口を置いた",
        "目的の違うコースを、別のページに分けた",
        "申込の入口を、LINE公式アカウント1本にした",
        "毎月5つの数字を1枚のレポートにして共有した",
    ],
    numbersLabel: "2026年1月〜7月の実数",
    numbers: [
        { key: "consult", value: "19", unit: "件", label: "LINEからの無料相談" },
        { key: "trial", value: "19", unit: "件", label: "体験の日程が決まった数" },
        { key: "join", value: "14", unit: "名", label: "入会" },
    ],
    numbersNote: "生徒数は1月の26名から、3〜4月には30名になりました。相談が1〜2件にとどまった月もあり、数字は月ごとに上下しています。",
    scopeLabel: "どこまでが当社の支援か",
    scope: "ホームページの制作と、申込までの導線の設計、公開後の毎月のレポートまでを担当しました。体験レッスンそのものと入会のご案内は、先生が行っています。",
    planNote: "この教室は、今回の月額プラン（初期0円・月額8,980円）とは別の形でご支援した事例です。同じ結果をお約束するものではありません。",
    cta: "この事例の詳細を読む",
};

const en: typeof ja = {
    heading: "A school we helped",
    lead: (
        <>
            A children&apos;s English school. The name and location are withheld at the teacher&apos;s request. The figures below come from the monthly report we send them.
        </>
    ),
    beforeLabel: "Before",
    before: [
        "One website the teacher had built alone",
        "Trial bookings buried in the contact page, by phone or email only",
        "No LINE official account",
        "Different courses mixed together on one page",
    ],
    afterLabel: "What we did",
    after: [
        "Rebuilt the site and put the trial booking at the top of the first screen",
        "Split the different courses into separate pages",
        "Made LINE the single entry point for bookings",
        "Sent a one-page report of five numbers every month",
    ],
    numbersLabel: "January to July 2026",
    numbers: [
        { key: "consult", value: "19", unit: "", label: "Enquiries via LINE" },
        { key: "trial", value: "19", unit: "", label: "Trial lessons booked" },
        { key: "join", value: "14", unit: "", label: "New students enrolled" },
    ],
    numbersNote: "Enrolment went from 26 students in January to 30 by March and April. Some months saw only one or two enquiries; the numbers move up and down.",
    scopeLabel: "What we were responsible for",
    scope: "We built the site, designed the path to a booking, and sent a monthly report after launch. The lessons and the enrolment conversations are the teacher's own work.",
    planNote: "This school was supported under a different arrangement from the ¥8,980 monthly plan. We cannot promise the same result.",
    cta: "Read the full case",
};

const copy: Record<Lang, typeof ja> = { ja, en };

export function Case({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-cream px-4 py-16 md:px-6 md:py-24">
            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <SerifHeading en="Case" jp={t.heading} />
                    <p className="lead -mt-6 mb-10 text-[15px] leading-[2] tracking-[0.03em] text-ink-sub md:mb-12">
                        {t.lead}
                    </p>
                </FadeIn>

                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)]">
                    {/* 前と後 */}
                    <FadeIn>
                        <div className="grid h-full gap-5 rounded-2xl bg-white p-7 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:grid-cols-2 md:p-9">
                            <div>
                                <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-ink-sub">{t.beforeLabel}</p>
                                <ul className="grid gap-2.5">
                                    {t.before.map((x) => (
                                        <li key={x} className="flex gap-2.5 text-[14px] leading-[1.9] text-ink-sub">
                                            <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-line" />
                                            <span>{x}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-coral-deep">{t.afterLabel}</p>
                                <ul className="grid gap-2.5">
                                    {t.after.map((x) => (
                                        <li key={x} className="flex gap-2.5 text-[14px] leading-[1.9] text-ink">
                                            <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-coral" />
                                            <span>{x}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </FadeIn>

                    {/* 数字 */}
                    <FadeIn delay={0.08}>
                        <div className="h-full rounded-2xl bg-navy-deep p-7 text-white md:p-9">
                            <p className="mb-5 text-[11px] font-bold tracking-[0.2em] text-coral">{t.numbersLabel}</p>
                            <ul className="mb-5 grid gap-4">
                                {t.numbers.map((n) => (
                                    <li key={n.key} className="flex items-baseline justify-between gap-4 border-b border-white/12 pb-3">
                                        <span className="text-[13.5px] leading-snug text-navy-sub">{n.label}</span>
                                        <span className="whitespace-nowrap">
                                            <span className="text-[32px] font-bold tabular-nums">{n.value}</span>
                                            <span className="text-[13px] text-navy-sub">{n.unit}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-[13px] leading-[1.9] text-navy-sub">{t.numbersNote}</p>
                        </div>
                    </FadeIn>
                </div>

                <FadeIn>
                    <div className="mt-5 rounded-2xl border border-line bg-white p-7 md:p-8">
                        <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-ink-sub">{t.scopeLabel}</p>
                        <p className="text-[14.5px] leading-[2] text-ink">{t.scope}</p>
                        <p className="mt-4 border-t border-line pt-4 text-[13px] leading-[1.9] text-ink-sub">{t.planNote}</p>
                        <a
                            href={withLang(lang, "/blog/case-english-school-zero-to-14")}
                            className="group mt-5 inline-flex min-h-11 items-center gap-2 text-[15px] font-bold text-coral-deep underline decoration-2 underline-offset-4 transition-colors hover:text-navy-deep"
                        >
                            {t.cta}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                        </a>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
