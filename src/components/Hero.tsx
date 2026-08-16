// Server Component — ファーストビュー（sample/fv-sankou.png の忠実再現）
// 深い紺地・右側に渓谷の写真（左へフェード）・左コピー・下部に統計3つ

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

import fvbg from "@/images/fvbg.webp";

export default function Hero() {
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
                            AIで、売上と業務を
                            <br />
                            根本から変える。
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <p className="lead mb-12 text-base leading-[2] text-navy-sub md:text-lg">
                            NEXT VALLEYは、AI活用のプロチーム。
                            <br />
                            マーケティングもHP・LP制作も、課題に合わせて最適な打ち手を提案し、
                            <br className="hidden md:block" />
                            売上アップと業務効率化を<span className="nowrap">支援します。</span>
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
                                <span className="text-[11px] font-bold tracking-[0.2em] text-white/80">サイトがある方</span>
                                <span className="inline-flex items-center gap-3 text-[19px] font-bold">
                                    無料で診断を受ける
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </a>
                            {/* これから作る方 → 無料プレビュー */}
                            <a
                                href="/preview"
                                className="group flex flex-col justify-center rounded-lg border border-white/40 px-7 py-4 text-white transition-colors hover:border-coral hover:text-coral"
                            >
                                <span className="text-[11px] font-bold tracking-[0.2em] text-white/70">これから作る方</span>
                                <span className="inline-flex items-center gap-3 text-[19px] font-bold">
                                    無料プレビューを見る
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </a>
                        </div>
                        <p className="mt-4 text-sm text-navy-sub">どちらも費用は一切かかりません・<span className="nowrap">しつこい営業なし</span></p>
                    </FadeIn>
                </div>
            </div>

        </section>
    );
}
