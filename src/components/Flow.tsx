// Server Component — ご依頼の流れ（sample世界観ブラッシュアップ版）
// クリーム地・セリフ数字＋矢印でつなぐ4ステップ

import React from "react";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading, serif } from "@/components/ui/SerifHeading";

const steps = [
    {
        title: "ご相談",
        body: <>LINEまたはメールでご連絡ください。「今のサイトのURLを送るだけ」で<span className="nowrap">大丈夫です。</span></>,
    },
    {
        title: "ご提案・お見積もり（無料）",
        body: <>現状を診断し、改善案と金額をセットでご提示します。ここまで費用はかかりません。断っていただいても<span className="nowrap">構いません。</span></>,
    },
    {
        title: "制作",
        body: <>AIを活用した制作フローで、通常1ヶ月の構築を最短3〜5日に<span className="nowrap">短縮します。</span></>,
    },
    {
        title: "公開・運用",
        body: <>公開して終わりではなく、アクセスと問い合わせの数字を見ながら改善を<span className="nowrap">続けます。</span></>,
    },
];

export function Flow() {
    return (
        <section className="relative overflow-hidden bg-cream px-4 py-16 md:px-6 md:py-24">

            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <SerifHeading en="Flow" jp="ご依頼の流れ" />
                </FadeIn>

                <ol className="flex flex-col items-stretch gap-3 md:flex-row md:gap-0">
                    {steps.map((s, i) => (
                        <React.Fragment key={s.title}>
                            {i > 0 && (
                                <li
                                    aria-hidden
                                    className="flex list-none items-center justify-center py-1 md:px-1 md:py-0"
                                >
                                    <ChevronRight className="h-6 w-6 rotate-90 text-coral md:rotate-0" />
                                </li>
                            )}
                            <li className="flex-1 list-none">
                                <FadeIn delay={i * 0.08} className="h-full">
                                    <div className="group flex h-full flex-col rounded-2xl bg-white p-7 shadow-[0_16px_40px_rgba(31,26,20,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(31,26,20,0.1)]">
                                        <div className="mb-5 flex items-baseline justify-between">
                                            <p
                                                className="text-4xl font-bold leading-none text-coral md:text-5xl"
                                                style={{ fontFamily: serif }}
                                            >
                                                {String(i + 1).padStart(2, "0")}
                                            </p>
                                            <p className="text-xs font-bold tracking-[0.3em] text-coral-deep">STEP</p>
                                        </div>
                                        <h3 className="mb-4 text-base font-bold leading-snug text-ink md:text-lg">
                                            {s.title}
                                        </h3>
                                        <p className="text-sm leading-[2] text-ink-sub">{s.body}</p>
                                    </div>
                                </FadeIn>
                            </li>
                        </React.Fragment>
                    ))}
                </ol>
            </div>
        </section>
    );
}
