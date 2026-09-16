// Server Component — 最終CTA。目的別に2つの入口を並べる

import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading, serif } from "@/components/ui/SerifHeading";
import { withLang, type Lang } from "@/i18n";

const ja = {
    heading: "お問い合わせ",
    eyebrow: "CONTACT",
    title: (
        <>
            目的に合わせて、<span className="text-coral-deep">2つの入口</span>があります。
        </>
    ),
    newTitle: "新しく作りたい・作り直したい",
    newBody: (
        <>
            トップページのデザイン案を無料でお作りします。初期費用0円・月額8,980円（税込）の条件とあわせてご確認いただき、そのうえで正式に依頼するか決められます。
        </>
    ),
    newCta: "無料でデザイン案を見てみる",
    fixTitle: "今のホームページで集客を改善したい",
    fixBody: (
        <>
            今のサイト・検索・Googleマップを拝見して、改善点と直す順番をお返しします。作り直しや月額プランへの切り替えが必要とは限りません。
        </>
    ),
    fixCta: "今のサイトの改善点を知りたい",
    mailPrefix: "メールでのご相談は",
    mailLink: "お問い合わせフォーム",
    mailSuffix: "から。",
    assurances: ["デザイン案・診断・お見積もりは無料", "電話営業はしません", "全国オンライン対応"],
    closing: "気に入らなければ、断ってください。",
};

const en: typeof ja = {
    heading: "Contact",
    eyebrow: "CONTACT",
    title: (
        <>
            Two ways in, <span className="text-coral-deep">depending on what you need</span>.
        </>
    ),
    newTitle: "I want a new site, or a rebuild",
    newBody: (
        <>
            We&apos;ll design your homepage for free. Look at it alongside the terms, no setup fee and ¥8,980 a month including tax, then decide whether to go ahead.
        </>
    ),
    newCta: "See a free design proposal",
    fixTitle: "I have a site and want more bookings",
    fixBody: (
        <>
            We review your site, search visibility and Google Maps, then send back what to fix and in what order. A rebuild or a monthly plan isn&apos;t always the answer.
        </>
    ),
    fixCta: "Get a free site check",
    mailPrefix: "Prefer email? Use the ",
    mailLink: "contact form",
    mailSuffix: ".",
    assurances: ["Design proposals, checks and quotes are free", "No sales calls", "Online, anywhere in Japan"],
    closing: "If it isn't for you, just say no.",
};

const copy: Record<Lang, typeof ja> = { ja, en };

export function CTA({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-base px-4 py-16 md:px-6 md:py-24">
            <div className="relative mx-auto max-w-5xl">
                <FadeIn>
                    <SerifHeading en={t.eyebrow} jp={t.heading} />
                    <h3 className="-mt-6 mb-10 text-[clamp(1.4rem,3vw,2rem)] font-bold leading-[1.5] tracking-tight text-ink md:mb-12">
                        {t.title}
                    </h3>
                </FadeIn>

                <div className="grid gap-5 md:grid-cols-2">
                    {/* 新しく作る */}
                    <FadeIn>
                        <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-[0_16px_40px_rgba(31,26,20,0.08)] md:p-10">
                            <h4 className="mb-4 text-[19px] font-bold leading-snug text-ink">{t.newTitle}</h4>
                            <p className="mb-8 text-[14.5px] leading-[2] text-ink-sub">{t.newBody}</p>
                            <a
                                href={withLang(lang, "/preview")}
                                className="btn-sheen group mt-auto inline-flex h-14 items-center justify-center gap-2 rounded-full bg-coral px-7 text-[16px] font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-95"
                            >
                                {t.newCta}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                            </a>
                        </div>
                    </FadeIn>

                    {/* 今のHPを改善する */}
                    <FadeIn delay={0.08}>
                        <div className="flex h-full flex-col rounded-2xl border border-line bg-cream p-8 md:p-10">
                            <h4 className="mb-4 text-[19px] font-bold leading-snug text-ink">{t.fixTitle}</h4>
                            <p className="mb-8 text-[14.5px] leading-[2] text-ink-sub">{t.fixBody}</p>
                            <a
                                href={withLang(lang, "/shindan")}
                                className="group mt-auto inline-flex h-14 items-center justify-center gap-2 rounded-full border border-navy-deep bg-white px-7 text-[16px] font-bold text-navy-deep transition-colors hover:border-coral hover:text-coral-deep"
                            >
                                {t.fixCta}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                            </a>
                        </div>
                    </FadeIn>
                </div>

                <FadeIn>
                    <p className="mt-8 text-center text-[14px] leading-[2] text-ink-sub">
                        {t.mailPrefix}
                        <a
                            href={withLang(lang, "/contact")}
                            className="font-bold text-coral-deep underline underline-offset-4 hover:text-navy-deep"
                        >
                            {t.mailLink}
                        </a>
                        {t.mailSuffix}
                    </p>

                    <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
                        {t.assurances.map((a) => (
                            <li key={a} className="flex items-center gap-1.5 text-[13.5px] font-bold text-ink-sub">
                                <Check className="h-4 w-4 text-coral-deep" aria-hidden />
                                {a}
                            </li>
                        ))}
                    </ul>

                    <p className="mt-8 text-center text-sm text-ink-sub" style={{ fontFamily: serif }}>
                        {t.closing}
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
