// Server Component — ファーストビュー
// 教室・スクール向け。左にコピーと入口商品の料金、右に実際に制作した教室サイト（PC・スマホ）

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

import classroomPc from "@/images/hero/classroom-pc.webp";
import classroomSp from "@/images/hero/classroom-sp.webp";
import { withLang, type Lang } from "@/i18n";

const ja = {
    eyebrow: "教室・スクールのWebまわり",
    h1: (
        <>
            <span className="line-mask"><span style={{ animationDelay: "0.1s" }}>教室の魅力が伝わる。</span></span>
            <span className="line-mask"><span style={{ animationDelay: "0.22s" }}>体験申込につながる。</span></span>
        </>
    ),
    lead: (
        <>
            教室・スクールのホームページ制作から、公開後の更新・集客改善まで。
            <br className="hidden md:block" />
            先生がレッスンに集中できるよう、Webまわりをお手伝い<span className="nowrap">します。</span>
        </>
    ),
    planLabel: "ホームページ制作・管理",
    planInitial: "初期費用",
    planInitialValue: "0円",
    planMonthly: "月額",
    planMonthlyValue: "8,980円",
    planTax: "（税込）",
    planFeatures: "10ページまで制作・修正無制限・ドメイン／サーバー費込み",
    planTerms: "最低契約期間1年・ご契約日から課金",
    planExtra: "継続的な集客支援は別途ご相談",
    cta: "無料でデザイン案を見てみる",
    ctaNote: "料金・条件とデザイン案を確認してから、正式依頼を決められます。",
    subPrefix: "今のホームページで集客を改善したい方は、",
    subLink: "今のサイトの改善点を知りたい",
    note: "英語・ダンス・バレエ・音楽などの教室を中心に。店舗・その他の事業者の方もご相談いただけます。",
    shotAlt: "制作したバレエ教室のホームページ（パソコン表示）",
    shotAltSp: "制作したバレエ教室のホームページ（スマートフォン表示）",
    shotCaption: "制作例：Tulip Ballet Studio様",
};

const en: typeof ja = {
    eyebrow: "WEB FOR SCHOOLS & STUDIOS",
    h1: (
        <>
            <span className="line-mask"><span style={{ animationDelay: "0.1s" }}>Show what your school is like.</span></span>
            <span className="line-mask"><span style={{ animationDelay: "0.22s" }}>Turn visits into trial bookings.</span></span>
        </>
    ),
    lead: (
        <>
            Websites for schools and studios, plus the updates and marketing work that come after launch, so teachers can stay focused on their lessons.
        </>
    ),
    planLabel: "Website build & management",
    planInitial: "Setup",
    planInitialValue: "¥0",
    planMonthly: "Monthly",
    planMonthlyValue: "¥8,980",
    planTax: " (tax incl.)",
    planFeatures: "Up to 10 pages, unlimited edits, domain and hosting included",
    planTerms: "12-month minimum term, billed from the contract date",
    planExtra: "Ongoing marketing support is quoted separately",
    cta: "See a free design proposal",
    ctaNote: "Check the design, the price and the terms before you decide.",
    subPrefix: "Already have a site and want more inquiries? ",
    subLink: "Get a free site check",
    note: "Mainly English, dance, ballet and music schools. Shops and other businesses are welcome too.",
    shotAlt: "A ballet school website we built, shown on a laptop",
    shotAltSp: "A ballet school website we built, shown on a phone",
    shotCaption: "Our work: Tulip Ballet Studio",
};

const copy: Record<Lang, typeof ja> = { ja, en };

export default function Hero({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-navy-deep pb-16 pt-28 md:pb-24 md:pt-32">
            {/* 背景の細いグリッド（装飾） */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--color-navy-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-navy-line) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage: "radial-gradient(120% 80% at 70% 20%, black 0%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(120% 80% at 70% 20%, black 0%, transparent 75%)",
                }}
            />

            <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)] lg:items-center lg:gap-10">
                {/* 左: コピーと料金 */}
                <div className="max-w-2xl">
                    <p className="eyebrow-in mb-6 text-[12px] font-bold tracking-[0.3em] text-coral">
                        {t.eyebrow}
                    </p>

                    <h1 className="mb-7 text-[clamp(1.9rem,4.4vw,3.5rem)] font-bold leading-[1.4] tracking-tight text-white">
                        {t.h1}
                    </h1>

                    <FadeIn delay={0.35}>
                        <p className="lead mb-9 text-[15px] leading-[2] text-navy-sub md:text-base">{t.lead}</p>
                    </FadeIn>

                    {/* 入口商品の料金 */}
                    <FadeIn delay={0.45}>
                        <div className="mb-8 rounded-2xl border border-white/15 bg-white/[0.06] p-5 md:p-6">
                            <p className="mb-2 text-[13px] font-bold tracking-wider text-white">{t.planLabel}</p>
                            <p className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                                <span className="nowrap">
                                    <span className="text-[13px] text-navy-sub">{t.planInitial}</span>{" "}
                                    <span className="text-[26px] font-bold tabular-nums text-white md:text-3xl">{t.planInitialValue}</span>
                                </span>
                                <span className="nowrap">
                                    <span className="text-[13px] text-navy-sub">{t.planMonthly}</span>{" "}
                                    <span className="text-[26px] font-bold tabular-nums text-coral md:text-3xl">{t.planMonthlyValue}</span>
                                    <span className="text-[13px] text-navy-sub">{t.planTax}</span>
                                </span>
                            </p>
                            <p className="mt-3 text-[13px] leading-[1.9] text-white/85">{t.planFeatures}</p>
                            <p className="mt-1 text-[13px] leading-[1.9] text-white/85">{t.planTerms}</p>
                            <p className="mt-3 border-t border-white/15 pt-3 text-[13px] leading-[1.9] text-navy-sub">
                                {t.planExtra}
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.55}>
                        <a
                            href={withLang(lang, "/preview")}
                            className="btn-sheen group inline-flex min-h-14 items-center gap-2.5 rounded-lg bg-coral px-8 text-[17px] font-bold text-white transition-opacity hover:opacity-90"
                        >
                            {t.cta}
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                        </a>
                        <p className="mt-3 text-[13px] leading-[1.9] text-navy-sub">{t.ctaNote}</p>

                        <p className="mt-5 text-[13px] leading-[1.9] text-navy-sub">
                            {t.subPrefix}
                            <a
                                href={withLang(lang, "/shindan")}
                                className="font-bold text-white underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
                            >
                                {t.subLink}
                            </a>
                        </p>
                        <p className="mt-5 max-w-[34em] text-[12.5px] leading-[1.9] text-navy-sub/80">{t.note}</p>
                    </FadeIn>
                </div>

                {/* 右: 実際に制作した教室サイト */}
                <FadeIn delay={0.3}>
                    <figure className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
                        <div className="overflow-hidden rounded-xl border border-white/15 shadow-[0_28px_70px_rgba(0,0,0,0.45)]">
                            <div className="flex items-center gap-1.5 bg-[#0b1b28] px-3 py-2" aria-hidden>
                                <span className="h-2 w-2 rounded-full bg-white/25" />
                                <span className="h-2 w-2 rounded-full bg-white/25" />
                                <span className="h-2 w-2 rounded-full bg-white/25" />
                            </div>
                            <Image
                                src={classroomPc}
                                alt={t.shotAlt}
                                priority
                                sizes="(max-width: 1024px) 90vw, 46vw"
                                className="h-auto w-full"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-2 w-[22%] min-w-[92px] overflow-hidden rounded-[14px] border-[3px] border-[#0b1b28] shadow-[0_18px_44px_rgba(0,0,0,0.5)] sm:-left-6">
                            <Image
                                src={classroomSp}
                                alt={t.shotAltSp}
                                sizes="120px"
                                className="h-auto w-full"
                            />
                        </div>
                        <figcaption className="mt-8 text-right text-[12px] text-navy-sub">{t.shotCaption}</figcaption>
                    </figure>
                </FadeIn>
            </div>
        </section>
    );
}
