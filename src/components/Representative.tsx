// Server Component — 代表メッセージ（sample世界観ブラッシュアップ版）
// 明るいグレー地・白カード・セリフ見出し・引用符・署名

import React from "react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading, serif } from "@/components/ui/SerifHeading";

import shun from "@/images/shun-new.webp";
import { type Lang } from "@/i18n";

const ja = {
    heading: "代表メッセージ",
    alt: "NEXT VALLEY 代表 倉林駿",
    title: (
        <>
            営業トークより、
            <br />
            実物を見てください。
        </>
    ),
    p1: (
        <>こんにちは、代表の倉林 駿（くらはやし しゅん）<span className="nowrap">です。</span></>
    ),
    p2: (
        <>
            「頼むと高そう」「本当に効果が出るのか分からない」。相談をためらう理由は、だいたいこの<span className="nowrap">2つです。</span>
        </>
    ),
    p3: (
        <>
            だから私たちは、先に実物をお見せすることにしています。あなたの会社の現状を診断し、具体的な改善案と見積もりを無料で作る。気に入らなければ、<span className="nowrap">断ってください。</span>
        </>
    ),
    p4: (
        <>
            無理な売り込みは一切しません。提案の中身で、判断して<span className="nowrap">ください。</span>
        </>
    ),
    signRole: "NEXT VALLEY 代表　",
    signName: "倉林 駿",
};
const en: typeof ja = {
    heading: "From the founder",
    alt: "Shun Kurahayashi, founder of NEXT VALLEY",
    title: (
        <>
            Skip the sales pitch.
            <br />
            See the real thing.
        </>
    ),
    p1: <>Hi, I’m Shun Kurahayashi, founder of NEXT VALLEY.</>,
    p2: (
        <>
            “It’s probably expensive.” “Will it actually work?” In our experience, those two doubts are what keep most people from reaching out.
        </>
    ),
    p3: (
        <>
            So we show you the real thing first. We take a close look at where your business stands, then put together concrete recommendations and a quote — free of charge. If it’s not for you, just say no.
        </>
    ),
    p4: (
        <>
            No pressure, no hard sell. Judge us on the substance of the proposal.
        </>
    ),
    signRole: "Founder, NEXT VALLEY ",
    signName: "Shun Kurahayashi",
};
const copy: Record<Lang, typeof ja> = { ja, en };

export function Representative({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-base px-4 py-16 md:px-6 md:py-24">

            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <SerifHeading en="Message" jp={t.heading} />
                </FadeIn>

                <FadeIn>
                    <div className="flex flex-col gap-8 rounded-2xl bg-white p-7 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:flex-row md:gap-14 md:p-14">
                        {/* 写真 */}
                        <div className="mx-auto w-full max-w-[320px] shrink-0 md:mx-0 md:w-80">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                                <Image
                                    src={shun}
                                    alt={t.alt}
                                    fill
                                    className="object-cover"
                                    placeholder="blur"
                                    sizes="(max-width: 768px) 320px, 320px"
                                />
                            </div>
                        </div>

                        {/* メッセージ */}
                        <div className="relative">
                            <h3
                                className="mb-8 text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold leading-[1.5] tracking-[0.02em] text-navy"
                                style={{ fontFamily: serif }}
                            >
                                {t.title}
                            </h3>

                            <div className="space-y-6 text-[15px] leading-[2] tracking-[0.02em] text-ink-sub">
                                <p>{t.p1}</p>
                                <p>{t.p2}</p>
                                <p>{t.p3}</p>
                                <p className="font-bold text-ink">{t.p4}</p>
                            </div>

                            {/* 署名 */}
                            <div className="mt-10 flex items-center justify-end gap-4">
                                <span aria-hidden className="block h-px w-16 bg-coral" />
                                <p className="text-sm text-ink-sub">
                                    {t.signRole}<span className="text-lg font-bold text-ink">{t.signName}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
