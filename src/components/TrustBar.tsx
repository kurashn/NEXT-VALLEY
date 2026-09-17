// Server Component — 実績と安心（trust.png の再現）。事実だけを4つ

import React from "react";
import { Sprout, AppWindow, MapPin, Globe } from "lucide-react";
import { SectionHeadV4, Underline } from "@/components/ui/SectionHeadV4";
import { heavy, V4 } from "@/lib/fonts-v4";
import { type Lang } from "@/i18n";

const icons = [Sprout, AppWindow, MapPin, Globe];

const ja = {
    eyebrow: "実績と安心",
    title: (
        <>
            <span className="nowrap">小さな事業の、</span>
            <span className="nowrap"><Underline>身近なWeb担当</Underline>として。</span>
        </>
    ),
    lead: "会社・お店・教室など、さまざまな事業のWebを支えています。",
    items: [
        { key: "since", value: "2021", unit: "年", label: "創業", note: "制作から公開後の運用まで。", tone: "navy" },
        { key: "count", value: "100", unit: "社以上", label: "制作・支援実績", note: "会社・店舗・教室など幅広く。", tone: "teal" },
        { key: "home", value: "本庄", unit: "", label: "代表の出身地", note: "埼玉とのつながりを大切に。", tone: "navy" },
        { key: "area", value: "全国対応", unit: "", label: "オンラインで相談・進行", note: "埼玉を中心に、全国へ。", tone: "teal" },
    ],
};
const en: typeof ja = {
    eyebrow: "TRACK RECORD",
    title: (
        <>
            A <Underline>web partner close at hand</Underline> for small businesses.
        </>
    ),
    lead: "We support the web presence of companies, shops and schools of many kinds.",
    items: [
        { key: "since", value: "2021", unit: "", label: "Founded", note: "From build to day-to-day upkeep.", tone: "navy" },
        { key: "count", value: "100", unit: "+", label: "Sites built and supported", note: "Companies, shops, schools and more.", tone: "teal" },
        { key: "home", value: "Honjo", unit: "", label: "Where the founder is from", note: "Rooted in Saitama.", tone: "navy" },
        { key: "area", value: "Japan-wide", unit: "", label: "Online meetings and delivery", note: "Saitama first, then anywhere.", tone: "teal" },
    ],
};
const copy: Record<Lang, typeof ja> = { ja, en };

export function TrustBar({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-white px-4 py-14 md:px-6 md:py-20">
            <div className="relative mx-auto max-w-6xl">
                <SectionHeadV4 word="Trust" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

                <ul className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
                    {t.items.map((it, i) => {
                        const Icon = icons[i];
                        const color = it.tone === "teal" ? V4.teal : V4.navy;
                        return (
                            <li
                                key={it.key}
                                className={`flex flex-col items-center px-3 text-center md:px-4 ${i > 0 ? "md:border-l" : ""} ${i % 2 === 1 ? "border-l md:border-l" : ""}`}
                                style={{ borderColor: "rgba(20,51,90,0.18)" }}
                            >
                                <span className="relative mb-3 inline-flex h-12 w-12 items-center justify-center">
                                    <Icon className="h-11 w-11 md:h-12 md:w-12" strokeWidth={1.4} style={{ color: V4.teal }} aria-hidden />
                                    <span aria-hidden className="absolute right-0 top-1 block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: V4.coral }} />
                                </span>
                                <p className={`${heavy.className} leading-none tracking-[-0.02em]`} style={{ color }}>
                                    <span className="text-[clamp(2.2rem,4.6vw,3.9rem)] tabular-nums">{it.value}</span>
                                    {it.unit && <span className="ml-0.5 text-[clamp(1rem,1.9vw,1.6rem)]">{it.unit}</span>}
                                </p>
                                <p className="mt-3 text-[14px] font-bold md:text-[15px]" style={{ color: V4.coralDeep }}>
                                    {it.label}
                                </p>
                                <p className="mt-1.5 text-[12.5px] leading-[1.7] md:text-[13.5px]" style={{ color: V4.navy }}>
                                    {it.note}
                                </p>
                            </li>
                        );
                    })}
                </ul>

                {/* 下の飾り罫（両端が上に折れ、右端に点） */}
                <svg aria-hidden viewBox="0 0 1200 36" preserveAspectRatio="none" className="mt-10 h-[36px] w-full">
                    <path d="M4 2 V16 Q4 24 12 24 H1150 Q1158 24 1158 16 V2" fill="none" stroke={V4.teal} strokeWidth="2" strokeLinecap="round" />
                    <circle cx="1170" cy="24" r="7" fill={V4.coral} />
                </svg>
            </div>
        </section>
    );
}
