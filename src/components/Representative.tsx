// Server Component — 代表メッセージ（sample世界観ブラッシュアップ版）
// 明るいグレー地・白カード・セリフ見出し・引用符・署名

import React from "react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading, serif } from "@/components/ui/SerifHeading";

import shunk from "@/images/shunk.webp";

export function Representative() {
    return (
        <section className="relative overflow-hidden bg-base px-4 py-16 md:px-6 md:py-24">

            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <SerifHeading en="Message" jp="代表メッセージ" />
                </FadeIn>

                <FadeIn>
                    <div className="flex flex-col gap-8 rounded-2xl bg-white p-7 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:flex-row md:gap-14 md:p-14">
                        {/* 写真 */}
                        <div className="mx-auto w-full max-w-[280px] shrink-0 md:mx-0 md:w-72">
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                                <Image
                                    src={shunk}
                                    alt="NEXT VALLEY 代表 倉林駿"
                                    fill
                                    className="object-cover"
                                    placeholder="blur"
                                    sizes="(max-width: 768px) 280px, 288px"
                                />
                            </div>
                            <div className="mt-5 flex items-baseline justify-center gap-3 md:justify-start">
                                <p className="text-xl font-bold tracking-widest text-ink">倉林 駿</p>
                            </div>
                        </div>

                        {/* メッセージ */}
                        <div className="relative">
                            <span
                                aria-hidden
                                className="absolute -top-4 left-0 text-6xl leading-none text-coral/60 md:-left-2"
                                style={{ fontFamily: serif }}
                            >
                                “
                            </span>
                            <h3
                                className="mb-8 pt-8 text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold leading-[1.5] tracking-[0.02em] text-navy"
                                style={{ fontFamily: serif }}
                            >
                                営業トークより、
                                <br />
                                実物を見てください。
                            </h3>

                            <div className="space-y-6 text-[15px] leading-[2] tracking-[0.02em] text-ink-sub">
                                <p>こんにちは、代表の倉林 駿（くらはやし <span className="nowrap">しゅん）です。</span></p>
                                <p>
                                    「制作会社に頼むと高そう」「本当に効果が出るのか分からない」——Web制作の相談をためらう理由は、だいたい<span className="nowrap">この2つです。</span>
                                </p>
                                <p>
                                    だから私たちは、先に実物をお見せすることにしています。あなたの会社の現状を診断し、具体的な改善案と見積もりを無料で作る。気に入らなければ、<span className="nowrap">断ってください。</span>
                                </p>
                                <p className="font-bold text-ink">
                                    電話営業もしつこい連絡も、一切しません。リスクは私たちに、安心は<span className="nowrap">あなたに。</span>
                                </p>
                            </div>

                            {/* 署名 */}
                            <div className="mt-10 flex items-center justify-end gap-4">
                                <span aria-hidden className="block h-px w-16 bg-coral" />
                                <p className="text-sm text-ink-sub">
                                    NEXT VALLEY 代表　<span className="text-lg font-bold text-ink">倉林 駿</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
