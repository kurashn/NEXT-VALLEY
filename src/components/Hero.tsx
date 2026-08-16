// Server Component — ファーストビュー（sample/fv-sankou.png の忠実再現）
// 深い紺地・右側に渓谷の写真（左へフェード）・左コピー・下部に統計3つ

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

import fvbg from "@/images/fvbg.webp";
import { withLang, type Lang } from "@/i18n";

const ja = {
    h1: (
        <>
            AIで、売上と業務を
            <br />
            根本から変える。
        </>
    ),
    lead: (
        <>
            NEXT VALLEYは、AI活用のプロチーム。
            <br />
            マーケティングもHP・LP制作も、課題に合わせて最適な打ち手を提案し、
            <br className="hidden md:block" />
            売上アップと業務効率化を<span className="nowrap">支援します。</span>
        </>
    ),
    cta1Label: "サイトがある方",
    cta1: "無料で診断を受ける",
    cta2Label: "これから作る方",
    cta2: "無料プレビューを見る",
    note: (
        <>
            どちらも費用は一切かかりません・しつこい<span className="nowrap">営業なし</span>
        </>
    ),
};
const en: typeof ja = {
    h1: (
        <>
            Grow your business.
            <br />
            Powered by AI.
        </>
    ),
    lead: (
        <>
            NEXT VALLEY is a Japan-based team that puts AI to work for small businesses.{" "}
            <br className="hidden md:block" />
            From marketing to websites and landing pages, we recommend only what fits your goals —
            <br className="hidden md:block" />
            and help you win more customers with less busywork.
        </>
    ),
    cta1Label: "ALREADY HAVE A WEBSITE?",
    cta1: "Get a free site check",
    cta2Label: "BUILDING A NEW ONE?",
    cta2: "See a free preview",
    note: <>Both are completely free. No pushy sales calls, ever.</>,
};
const copy: Record<Lang, typeof ja> = { ja, en };

export default function Hero({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-navy-deep pt-20">
            {/* 渓谷の写真（デスクトップは右側ブレンド、モバイルは減光して全面に） */}
            <div
                aria-hidden
                className="absolute inset-y-0 right-0 w-full md:w-[62%]"
                style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 35%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 35%)",
                }}
            >
                <Image
                    src={fvbg}
                    alt=""
                    fill
                    priority
                    className="object-cover object-center opacity-45 md:opacity-95"
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 62vw"
                />
            </div>

            {/* 左カラムのコピー */}
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 md:px-6">
                <div className="max-w-3xl py-16">
                    <FadeIn>
                        <p className="mb-8 text-[13px] font-bold tracking-[0.3em] text-coral">
                            AI &times; MARKETING &times; PRODUCTION
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <h1 className="mb-8 text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.35] tracking-tight text-white">
                            {t.h1}
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <p className="lead mb-12 text-base leading-[2] text-navy-sub md:text-lg">
                            {t.lead}
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
                            {/* サイトがある方 → 無料診断 */}
                            <a
                                href="https://lin.ee/N4QXdJL"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col justify-center rounded-lg bg-coral px-7 py-4 text-white transition-opacity hover:opacity-90"
                            >
                                <span className="text-[11px] font-bold tracking-[0.2em] text-white/80">{t.cta1Label}</span>
                                <span className="inline-flex items-center gap-3 text-[19px] font-bold">
                                    {t.cta1}
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </a>
                            {/* これから作る方 → 無料プレビュー */}
                            <a
                                href={withLang(lang, "/preview")}
                                className="group flex flex-col justify-center rounded-lg border border-white/40 px-7 py-4 text-white transition-colors hover:border-coral hover:text-coral"
                            >
                                <span className="text-[11px] font-bold tracking-[0.2em] text-white/70">{t.cta2Label}</span>
                                <span className="inline-flex items-center gap-3 text-[19px] font-bold">
                                    {t.cta2}
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </a>
                        </div>
                        <p className="mt-4 text-sm text-navy-sub">{t.note}</p>
                    </FadeIn>
                </div>
            </div>

        </section>
    );
}
