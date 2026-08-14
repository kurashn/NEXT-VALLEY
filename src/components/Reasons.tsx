// Server Component — 選ばれる理由（sample/reason.png の忠実再現）
// 明るいグレー地・セリフ見出し・横長白カード（セリフ数字＋縦罫線＋明朝見出し＋丸バッジアイコン）

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading, serif } from "@/components/ui/SerifHeading";
import { InlineCTA } from "@/components/ui/InlineCTA";

/* ── 丸バッジ内の線画アイコン（teal×coral） ── */

function IconTeam() {
    return (
        <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" aria-hidden>
            <path d="M14 26a18 18 0 0 1 36 0" stroke="var(--color-coral)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="32" cy="34" r="6" stroke="#2e7f92" strokeWidth="2.5" />
            <path d="M22 52c0-6 4.5-10 10-10s10 4 10 10" stroke="#2e7f92" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="17" cy="38" r="4.5" stroke="#2e7f92" strokeWidth="2.2" />
            <path d="M9 52c0-4.5 3.5-8 8-8" stroke="#2e7f92" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="47" cy="38" r="4.5" stroke="#2e7f92" strokeWidth="2.2" />
            <path d="M55 52c0-4.5-3.5-8-8-8" stroke="#2e7f92" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
    );
}

function IconAiBrain() {
    return (
        <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" aria-hidden>
            <path
                d="M30 12c-7 0-11 5-11 10-4 1-7 5-7 9 0 3 1.5 6 4 7.5C16 44 20 48 25 48c2 0 4-.6 5-1.6V12z"
                stroke="#2e7f92"
                strokeWidth="2.4"
                strokeLinejoin="round"
            />
            <path
                d="M34 12c7 0 11 5 11 10 4 1 7 5 7 9 0 3-1.5 6-4 7.5C48 44 44 48 39 48c-2 0-4-.6-5-1.6V12z"
                stroke="#2e7f92"
                strokeWidth="2.4"
                strokeLinejoin="round"
            />
            <g stroke="#2e7f92" strokeWidth="1.8">
                <path d="M24 22h-6M24 30h-8M24 38h-6" />
                <path d="M40 22h6M40 30h8M40 38h6" />
            </g>
            <g fill="#2e7f92">
                <circle cx="17" cy="22" r="1.8" />
                <circle cx="15" cy="30" r="1.8" />
                <circle cx="17" cy="38" r="1.8" />
                <circle cx="47" cy="22" r="1.8" />
                <circle cx="49" cy="30" r="1.8" />
                <circle cx="47" cy="38" r="1.8" />
            </g>
            <g stroke="var(--color-coral)" strokeWidth="2.4" strokeLinecap="round">
                <path d="M52 10l3-4M56 16l4-2M56 22l3 1" />
            </g>
        </svg>
    );
}

function IconChart() {
    return (
        <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" aria-hidden>
            <g stroke="#2e7f92" strokeWidth="2.6" strokeLinecap="round">
                <path d="M18 52V38M30 52V30M42 52V36M54 52V26" />
            </g>
            <path d="M12 30l12-10 10 6 14-14" stroke="var(--color-coral)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <g fill="var(--color-coral)">
                <circle cx="24" cy="20" r="2.6" />
                <circle cx="34" cy="26" r="2.6" />
                <circle cx="48" cy="12" r="2.6" />
            </g>
        </svg>
    );
}

const reasons = [
    {
        icon: IconTeam,
        title: <>戦略から実行まで、<span className="nowrap">ワンチーム</span></>,
        body: (
            <>
                提案する人と、作る人・運用する人が同じチームです。
                <br className="hidden md:block" />
                施策が「点」で終わらず、売上までの設計図で<span className="nowrap">つながります。</span>
            </>
        ),
    },
    {
        icon: IconAiBrain,
        title: <>現場で使い倒している<span className="nowrap">AIノウハウ</span></>,
        body: (
            <>
                自社の制作・マーケの現場でAIを日常的に使い、通常1ヶ月の構築を最短3〜5日まで短縮しています。
                <br className="hidden md:block" />
                その実践のやり方ごと提供する、机上の空論ではない<span className="nowrap">支援です。</span>
            </>
        ),
    },
    {
        icon: IconChart,
        title: <>施策のあとは、数字で報告</>,
        body: (
            <>
                アクセス数・問い合わせ数など、成果を毎月レポート。
                <br className="hidden md:block" />
                「なんとなく良くなった気がする」ではなく、数字で判断できる状態を<span className="nowrap">保ちます。</span>
            </>
        ),
    },
];

export function Reasons() {
    return (
        <section className="relative overflow-hidden bg-base px-4 py-16 md:px-6 md:py-24">
            {/* 左端のドットパターン */}
            <div
                aria-hidden
                className="absolute left-0 top-1/3 hidden h-72 w-24 opacity-60 md:block"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(26,26,26,0.14) 1px, transparent 1.5px)",
                    backgroundSize: "12px 12px",
                }}
            />

            <div className="relative mx-auto max-w-6xl">
                {/* 見出し: 多色セリフのReason + 縦罫線 + JPラベル */}
                <FadeIn>
                    <SerifHeading en="Reason" jp="選ばれる理由" />
                </FadeIn>

                {/* 横長カード3枚 */}
                <div className="space-y-8 md:space-y-10">
                    {reasons.map((r, i) => (
                        <FadeIn key={i} delay={i * 0.08}>
                            <div className="group flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-[0_16px_40px_rgba(31,26,20,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(31,26,20,0.1)] md:flex-row md:items-center md:gap-10 md:px-14 md:py-12">
                                {/* 番号 */}
                                <div className="shrink-0 text-center md:w-24">
                                    <p
                                        className="text-5xl font-bold leading-none text-coral md:text-6xl"
                                        style={{ fontFamily: serif }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </p>
                                    <p className="mt-3 text-xs font-bold tracking-[0.3em] text-coral-deep">REASON</p>
                                </div>
                                {/* 縦罫線 */}
                                <span aria-hidden className="hidden h-24 w-px shrink-0 bg-coral/60 md:block" />
                                {/* テキスト */}
                                <div className="flex-1">
                                    <h3
                                        className="mb-4 text-[clamp(1.375rem,2.6vw,2rem)] font-bold leading-snug tracking-[0.02em] text-navy"
                                        style={{ fontFamily: serif }}
                                    >
                                        {r.title}
                                    </h3>
                                    <p className="text-[15px] leading-[2] tracking-[0.03em] text-ink-sub">{r.body}</p>
                                </div>
                                {/* 丸バッジアイコン */}
                                <div className="order-first flex h-24 w-24 shrink-0 items-center justify-center self-center rounded-full bg-[#f4efe8] transition-transform duration-300 group-hover:scale-105 md:order-none md:h-28 md:w-28">
                                    <r.icon />
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn>
                    <InlineCTA
                        message={<>この体制が合うかどうかは、提案を見て判断して<span className="nowrap">ください。</span></>}
                        button="まずは無料診断から"
                    />
                </FadeIn>
            </div>
        </section>
    );
}

