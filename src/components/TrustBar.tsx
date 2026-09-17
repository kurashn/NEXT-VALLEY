// Server Component — ファーストビュー直下の安心材料（事実だけを4つ、コンパクトに）

import React from "react";
import { Sprout, AppWindow, MapPin, Globe } from "lucide-react";
import { heavy, V4 } from "@/lib/fonts-v4";
import { type Lang } from "@/i18n";

const icons = [Sprout, AppWindow, MapPin, Globe];

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
        <section className="bg-white px-4 py-7 md:px-6 md:py-8" style={{ borderBottom: "1px solid rgba(20,51,90,0.12)" }}>
            <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0">
                {items.map((it, i) => {
                    const Icon = icons[i];
                    const color = it.tone === "teal" ? V4.teal : V4.navy;
                    return (
                        <li
                            key={it.key}
                            className={`flex items-center gap-3 px-3 md:justify-center md:px-4 ${i % 2 === 1 ? "border-l" : ""} ${i > 0 ? "md:border-l" : ""}`}
                            style={{ borderColor: "rgba(20,51,90,0.18)" }}
                        >
                            <span className="relative hidden h-9 w-9 shrink-0 items-center justify-center sm:inline-flex">
                                <Icon className="h-8 w-8" strokeWidth={1.5} style={{ color: V4.teal }} aria-hidden />
                                <span aria-hidden className="absolute -right-0.5 top-0 block h-2 w-2 rounded-full" style={{ backgroundColor: V4.coral }} />
                            </span>
                            <div className="min-w-0">
                                <p className={`${heavy.className} leading-none tracking-[-0.02em]`} style={{ color }}>
                                    <span className="text-[clamp(1.4rem,2.4vw,1.9rem)] tabular-nums">{it.value}</span>
                                    {it.unit && <span className="ml-0.5 text-[clamp(0.8rem,1.1vw,0.95rem)]">{it.unit}</span>}
                                </p>
                                <p className="mt-1 text-[12px] font-bold leading-tight md:text-[12.5px]" style={{ color: V4.coralDeep }}>
                                    {it.label}
                                </p>
                                <p className="mt-0.5 hidden text-[11.5px] leading-snug md:block" style={{ color: V4.navy }}>
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
