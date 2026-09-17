// Server Component — ファーストビュー直下の安心材料（事実だけを4つ、紺地にコンパクトに）

import React from "react";
import { heavy, V4 } from "@/lib/fonts-v4";
import { type Lang } from "@/i18n";

const ja = [
    { key: "since", value: "2021", unit: "年", label: "創業", note: "制作から公開後の運用まで。", tone: "navy" },
    { key: "count", value: "100", unit: "社以上", label: "制作・支援実績", note: "会社・店舗・教室など幅広く。", tone: "teal" },
    { key: "home", value: "本庄", unit: "", label: "代表の出身地", note: "埼玉とのつながりを大切に。", tone: "navy" },
    { key: "area", value: "全国対応", unit: "", label: "オンラインで相談・進行", note: "埼玉を中心に、全国へ。", tone: "teal" },
];
const en: typeof ja = [
    { key: "since", value: "2021", unit: "", label: "Founded", note: "From build to day-to-day upkeep.", tone: "navy" },
    { key: "count", value: "100", unit: "+", label: "Sites built and supported", note: "Companies, shops, schools and more.", tone: "teal" },
    { key: "home", value: "Honjo", unit: "", label: "Where the founder is from", note: "Rooted in Saitama.", tone: "navy" },
    { key: "area", value: "Japan-wide", unit: "", label: "Online meetings and delivery", note: "Saitama first, then anywhere.", tone: "teal" },
];
const copy: Record<Lang, typeof ja> = { ja, en };

export function TrustBar({ lang = "ja" }: { lang?: Lang }) {
    const items = copy[lang];
    return (
        <section className="px-4 py-7 md:px-6 md:py-8" style={{ backgroundColor: "#041627" }}>
            <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0">
                {items.map((it, i) => {
                    const color = "#FFFFFF";
                    return (
                        <li
                            key={it.key}
                            className={`flex items-center px-3 md:justify-center md:px-4 ${i % 2 === 1 ? "border-l" : ""} ${i > 0 ? "md:border-l" : ""}`}
                            style={{ borderColor: "rgba(255,255,255,0.2)" }}
                        >
                            <div className="min-w-0 md:text-center">
                                <p className={`${heavy.className} leading-none tracking-[-0.02em]`} style={{ color }}>
                                    <span className="text-[clamp(1.4rem,2.4vw,1.9rem)] tabular-nums">{it.value}</span>
                                    {it.unit && <span className="ml-0.5 text-[clamp(0.8rem,1.1vw,0.95rem)]">{it.unit}</span>}
                                </p>
                                <p className="mt-1 text-[12px] font-bold leading-tight md:text-[12.5px]" style={{ color: V4.coral }}>
                                    {it.label}
                                </p>
                                <p className="mt-0.5 hidden text-[11.5px] leading-snug md:block" style={{ color: "rgba(255,255,255,0.78)" }}>
                                    {it.note}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
