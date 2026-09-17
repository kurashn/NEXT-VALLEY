// Server Component — v4デザインの共通見出し
// 左に多色のセリフ英字、縦罫線、右にコーラルの小見出し・極太の見出し・説明文

import React from "react";
import { heavy, V4 } from "@/lib/fonts-v4";
import { serif } from "@/components/ui/SerifHeading";

export function SectionHeadV4({
    word,
    eyebrow,
    title,
    lead,
    aside,
    className = "",
}: {
    word: string;
    eyebrow: string;
    title: React.ReactNode;
    lead?: React.ReactNode;
    aside?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`relative mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-center md:gap-8 ${className}`}>
            <p aria-label={word} className="shrink-0 text-[clamp(2.75rem,6.4vw,5rem)] font-bold leading-none tracking-[-0.01em]" style={{ fontFamily: serif }}>
                {word.split("").map((ch, i) => {
                    const p = word.length > 1 ? i / (word.length - 1) : 0;
                    const color = p < 0.34 ? V4.coralDeep : p < 0.67 ? V4.teal : V4.navy;
                    return (
                        <span key={i} aria-hidden style={{ color }}>
                            {ch}
                        </span>
                    );
                })}
            </p>
            <span aria-hidden className="hidden h-16 w-px shrink-0 md:block lg:h-20" style={{ backgroundColor: V4.navy, opacity: 0.55 }} />
            <div className="min-w-0">
                <p className="mb-1.5 text-[13px] font-bold tracking-[0.08em] md:text-[14px]" style={{ color: V4.coralDeep }}>
                    {eyebrow}
                </p>
                <h2 className={`${heavy.className} text-[clamp(1.5rem,3.3vw,2.5rem)] leading-[1.3] tracking-[-0.01em]`} style={{ color: V4.navy }}>
                    {title}
                </h2>
                {lead && (
                    <p className="mt-2 text-[14.5px] leading-[1.9] md:text-[17px]" style={{ color: V4.navy }}>
                        {lead}
                    </p>
                )}
            </div>
            {aside}
        </div>
    );
}

/** 見出しの中で青緑にする語 */
export function Teal({ children }: { children: React.ReactNode }) {
    return <span style={{ color: V4.teal }}>{children}</span>;
}

/** 見出しの中でコーラルの下線を引く語 */
export function Underline({ children }: { children: React.ReactNode }) {
    return (
        <span className="relative inline-block">
            <span className="relative z-10">{children}</span>
            <span aria-hidden className="absolute bottom-[0.02em] left-0 h-[0.13em] w-full rounded-full" style={{ backgroundColor: V4.coral }} />
        </span>
    );
}

/** カード上部の「•••」 */
export function Dots() {
    return (
        <span aria-hidden className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
                <span key={i} className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: V4.coral }} />
            ))}
        </span>
    );
}
