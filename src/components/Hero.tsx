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
            <span className="line-mask"><span style={{ animationDelay: "0.1s" }}>埼玉北部の教室・お店の</span></span>
            <span className="line-mask"><span style={{ animationDelay: "0.22s" }}>集客を、AIで立て直す。</span></span>
        </>
    ),
    lead: (
        <>
            NEXT VALLEYは、AI活用のプロチーム。
            <br />
            集客の仕組みづくりからHP・LP制作まで、教室・お店の課題に合わせて最適な打ち手を提案し、
            <br className="hidden md:block" />
            売上アップと業務効率化を<span className="nowrap">支援します。</span>
        </>
    ),
    cta1Label: "サイトがある方も、これから作る方も",
    cta1: "LINEで無料診断を受ける",
    ctaNote: (
        <>
            送ると<strong className="font-bold text-white">2営業日以内</strong>に、改善案と概算お見積もりが<span className="nowrap">届きます。</span>
        </>
    ),
    previewPrefix: "これから作る方は、",
    previewLink: "無料プレビュー",
    previewSuffix: "で先に完成イメージを見られます。",
    note: (
        <>
            どちらも費用は一切かかりません・しつこい<span className="nowrap">営業なし</span>
        </>
    ),
};
const en: typeof ja = {
    h1: (
        <>
            <span className="line-mask"><span style={{ animationDelay: "0.1s" }}>More customers for your</span></span>
            <span className="line-mask"><span style={{ animationDelay: "0.22s" }}>school or shop. Powered by AI.</span></span>
        </>
    ),
    lead: (
        <>
            NEXT VALLEY is an AI-powered team based in northern Saitama. From marketing systems to websites and landing pages, we recommend only what fits your school or shop — and help you win more customers with less busywork.
        </>
    ),
    cta1Label: "HAVE A SITE OR STARTING FROM SCRATCH?",
    cta1: "Get a free site check on LINE",
    ctaNote: (
        <>
            Send us a message and you&apos;ll get concrete improvements and a ballpark quote{" "}
            <strong className="font-bold text-white">within 2 business days</strong>.
        </>
    ),
    previewPrefix: "Building a new site? ",
    previewLink: "See a free preview",
    previewSuffix: " of your design first.",
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
                    className="hero-photo-in object-cover object-center opacity-45 md:opacity-95"
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 62vw"
                />
            </div>

            {/* 左カラムのコピー */}
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 md:px-6">
                <div className="hero-scroll-out max-w-3xl py-16">
                    <p className="eyebrow-in mb-8 text-[13px] font-bold tracking-[0.3em] text-coral">
                        AI &times; MARKETING &times; PRODUCTION
                    </p>

                    <h1 className="mb-8 text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.35] tracking-tight text-white">
                        {t.h1}
                    </h1>

                    <FadeIn delay={0.4}>
                        <p className="lead mb-12 text-base leading-[2] text-navy-sub md:text-lg">
                            {t.lead}
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.55}>
                        {/* 主要動線はLINE無料診断の1本（金継ぎ見立て・問い9） */}
                        <a
                            href="https://lin.ee/N4QXdJL"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-sheen group inline-flex flex-col justify-center rounded-lg bg-coral px-8 py-4 text-white transition-opacity hover:opacity-90"
                        >
                            <span className="text-[11px] font-bold tracking-[0.2em] text-white/80">{t.cta1Label}</span>
                            <span className="inline-flex items-center gap-3 text-[19px] font-bold">
                                {t.cta1}
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </a>
                        <p className="mt-4 text-sm leading-[1.9] text-navy-sub">{t.ctaNote}</p>
                        {/* 無料プレビューは文中リンクへ格下げ */}
                        <p className="mt-2 text-sm leading-[1.9] text-navy-sub">
                            {t.previewPrefix}
                            <a href={withLang(lang, "/preview")} className="font-bold text-white underline decoration-coral decoration-2 underline-offset-4 transition-colors hover:text-coral">
                                {t.previewLink}
                            </a>
                            {t.previewSuffix}
                        </p>
                        <p className="mt-4 text-sm text-navy-sub">{t.note}</p>
                    </FadeIn>
                </div>
            </div>

        </section>
    );
}
