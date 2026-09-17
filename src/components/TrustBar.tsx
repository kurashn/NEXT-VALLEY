// Server Component — ファーストビュー直下の安心材料（事実だけを4つ）

import React from "react";
import { type Lang } from "@/i18n";

const ja = [
    { key: "since", value: "2021年", label: "創業" },
    { key: "count", value: "100社以上", label: "制作・支援の実績" },
    { key: "home", value: "本庄市児玉町", label: "代表の出身地" },
    { key: "area", value: "全国", label: "オンラインで対応" },
];
const en: typeof ja = [
    { key: "since", value: "2021", label: "Founded" },
    { key: "count", value: "100+", label: "Sites built and supported" },
    { key: "home", value: "Kodama, Honjo", label: "Where the founder is from" },
    { key: "area", value: "Japan-wide", label: "Online support" },
];
const copy: Record<Lang, typeof ja> = { ja, en };

export function TrustBar({ lang = "ja" }: { lang?: Lang }) {
    const items = copy[lang];
    return (
        <section className="border-b border-line bg-base px-4 md:px-6">
            <ul className="mx-auto grid max-w-6xl grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
                {items.map((it) => (
                    <li key={it.key} className="flex flex-col items-center justify-center gap-0.5 py-5 text-center md:py-6">
                        <span className="text-[20px] font-bold leading-tight tabular-nums text-ink md:text-[22px]">{it.value}</span>
                        <span className="text-[12px] leading-snug text-ink-sub">{it.label}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
