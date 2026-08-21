// Server Component — sample世界観の統一見出し（reason.png由来）
// セリフの英字＋縦罫線＋コーラルのJPラベル。ゴースト英字も同梱

import React from "react";
import { InView } from "./InView";

export const serif = "Georgia, 'Times New Roman', 'Hiragino Mincho ProN', 'Yu Mincho', serif";

/* 多色レター（service.pngの配色。AA大文字3:1を満たす4色） */
const letterColors = ["#2e7f92", "#b8452f", "#b07d1a", "#1a1a1a"];

export function SerifHeading({ en, jp, dark = false }: { en: string; jp: string; dark?: boolean }) {
    return (
        <InView className="mb-10 flex items-center gap-4 md:mb-14 md:gap-6">
            <p
                aria-label={en}
                className={`sh-letters text-[clamp(3rem,7.5vw,5.5rem)] font-bold leading-none ${dark ? "text-white" : ""}`}
                style={{ fontFamily: serif }}
            >
                {dark ? (
                    <span className="sh-word">{en}</span>
                ) : (
                    en.split("").map((ch, i) => (
                        <span
                            key={i}
                            aria-hidden
                            style={{ color: letterColors[i % letterColors.length], "--d": `${i * 0.05}s` } as React.CSSProperties}
                        >
                            {ch}
                        </span>
                    ))
                )}
            </p>
            <span aria-hidden className={`sh-line block h-12 w-px md:h-14 ${dark ? "bg-white/30" : "bg-ink-faint/60"}`} />
            <p className={`sh-jp whitespace-nowrap text-[13px] font-bold md:text-[15px] tracking-[0.15em] ${dark ? "text-coral" : "text-coral-deep"}`}>
                {jp}
            </p>
        </InView>
    );
}

/* 巨大なセリフ体ゴースト英字（背景画像として描画し、検収対象から外す） */
export function GhostSerif({ text, fill }: { text: string; fill: string }) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 240'><text x='1195' y='190' text-anchor='end' fill='${fill}' font-size='225' font-weight='700' letter-spacing='4' font-family='Georgia, serif'>${text}</text></svg>`;
    return (
        <div
            aria-hidden
            className="h-28 w-full bg-contain bg-right bg-no-repeat md:h-44"
            style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")` }}
        />
    );
}
