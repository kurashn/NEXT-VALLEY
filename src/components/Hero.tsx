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
            <span className="line-mask"><span style={{ animationDelay: "0.1s" }}>Webからの問い合わせ、</span></span>
            <span className="line-mask"><span style={{ animationDelay: "0.22s" }}>原因から直して増やす。</span></span>
        </>
    ),
    lead: (
        <>
            NEXT VALLEYは、2021年から100社以上を支援してきた、埼玉北部のWeb集客チームです。
            <br />
            「問い合わせが来ない」原因を見つけて、必要な施策だけを実行します。
            <br className="hidden md:block" />
            ホームページ制作・SEO・Googleマップ・SNS・AIは、そのための<span className="nowrap">手段です。</span>
        </>
    ),
    cta1Label: "サイトがある方も、これから作る方も",
    cta1: "LINEで無料診断を受ける",
    ctaNote: (
        <>
            URLを送るだけで<strong className="font-bold text-white">2営業日以内</strong>に、問題点と直す順番をまとめた診断書が<span className="nowrap">届きます。</span>
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
            <span className="line-mask"><span style={{ animationDelay: "0.1s" }}>More inquiries from the web —</span></span>
            <span className="line-mask"><span style={{ animationDelay: "0.22s" }}>by fixing the real cause.</span></span>
        </>
    ),
    lead: (
        <>
            NEXT VALLEY is a small web team in northern Saitama that has helped 100+ businesses since 2021. We find out why inquiries aren&apos;t coming in, then do only what&apos;s needed — websites, SEO, Google Maps, social media, and AI are the tools, not the goal.
        </>
    ),
    cta1Label: "HAVE A SITE OR STARTING FROM SCRATCH?",
    cta1: "Get a free site check on LINE",
    ctaNote: (
        <>
            Just send your URL and you&apos;ll get a written check-up — what&apos;s broken and what to fix first —{" "}
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
