// Server Component — ご依頼の流れ（flowdesign-v2.png の再現）。目的別に2つの流れを左右に並べる

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { serif } from "@/components/ui/SerifHeading";
import { mincho, V4 } from "@/lib/fonts-v4";
import { withLang, type Lang } from "@/i18n";

const LINE_URL = "https://lin.ee/N4QXdJL";
const BG = "#FBFAF5";

type Track = {
    tag: string;
    title: string;
    steps: [string, string][];
    note: string;
    cta: string;
    href: string;
    external?: boolean;
};

const ja = {
    eyebrow: "ご依頼の流れ",
    title: "まずは、相談から。",
    lead: "内容と料金に納得してから、進められます。",
    left: {
        tag: "新しく作る・作り直す方",
        title: "無料プレビューから",
        steps: [
            ["お申し込み・ヒアリング", "事業のことや、ご希望を伺います。"],
            ["デザイン案・料金を確認", "トップページ案と契約条件をご確認。"],
            ["納得いただけたら、ご契約", "契約日から月額料金が始まります。"],
            ["制作・公開、その後の管理", "ご確認のうえ公開し、更新も継続対応。"],
        ],
        note: "ご契約前のプレビューは無料です。",
        cta: "無料でデザイン案を見てみる",
        href: "/preview",
    } as Track,
    right: {
        tag: "今のホームページを改善したい方",
        title: "無料診断から",
        steps: [
            ["URLとお悩みを送る", "LINEで、今の状況を教えてください。"],
            ["現状と改善の優先順位を確認", "サイトや問い合わせへの流れを確認。"],
            ["対応範囲とお見積もり", "必要な支援だけをご提案します。"],
            ["ご承認後に、改善を開始", "合意いただいた内容から進めます。"],
        ],
        note: "改善の実施は、別途お見積もりです。",
        cta: "今のホームページを無料診断する",
        href: LINE_URL,
        external: true,
    } as Track,
};

const en: typeof ja = {
    eyebrow: "HOW IT WORKS",
    title: "Start with a conversation.",
    lead: "Go ahead only once the scope and price make sense to you.",
    left: {
        tag: "Building or rebuilding",
        title: "From a free preview",
        steps: [
            ["Apply and tell us about you", "Your business and what you want."],
            ["See the design and the price", "Check the homepage proposal and the terms."],
            ["Sign when it feels right", "The monthly fee starts on the contract date."],
            ["Build, launch, then upkeep", "We publish after your check and keep updating."],
        ],
        note: "The preview before signing is free.",
        cta: "See a free design proposal",
        href: "/preview",
    },
    right: {
        tag: "Improving an existing site",
        title: "From a free check",
        steps: [
            ["Send the URL and your concern", "Tell us on LINE where you stand."],
            ["Review the site and priorities", "We look at the pages and the path to contact."],
            ["Scope and quote", "Only the support that is needed."],
            ["Start after your approval", "We proceed with what we agreed."],
        ],
        note: "Carrying out improvements is quoted separately.",
        cta: "Get a free check of your site",
        href: LINE_URL,
        external: true,
    },
};

const copy: Record<Lang, typeof ja> = { ja, en };

function Card({ track, tone, lang }: { track: Track; tone: "coral" | "teal"; lang: Lang }) {
    const color = tone === "coral" ? "#E85A4A" : V4.teal;
    const bg = tone === "coral" ? "#FEF7F4" : "#F4F9FA";
    const line = tone === "coral" ? "rgba(232,90,74,0.22)" : "rgba(44,143,168,0.22)";
    const href = track.external ? track.href : withLang(lang, track.href);
    return (
        <div className="flex h-full flex-col rounded-[18px] px-6 pb-7 pt-7 md:px-9 md:pb-9 md:pt-8" style={{ backgroundColor: bg, borderTop: `4px solid ${color}` }}>
            <p className="text-[13px] font-bold md:text-[14px]" style={{ color }}>{track.tag}</p>
            <h3 className={`${mincho.className} mt-2 text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-[1.3]`} style={{ color: V4.navy }}>{track.title}</h3>
            <ol className="mt-7 grid gap-6">
                {track.steps.map(([t, d], i) => (
                    <li key={t} className="relative grid grid-cols-[52px_1fr] items-start gap-4">
                        {i < track.steps.length - 1 && <span aria-hidden className="absolute left-[25px] top-[52px] h-[calc(100%+8px)] w-[2px]" style={{ backgroundColor: line }} />}
                        <span className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full text-[17px] font-bold text-white" style={{ backgroundColor: color, fontFamily: serif }}>
                            0{i + 1}
                        </span>
                        <div className="pt-1">
                            <p className="text-[16px] font-bold leading-[1.5] md:text-[17px]" style={{ color: V4.navy }}>{t}</p>
                            <p className="mt-1 text-[13.5px] leading-[1.7] md:text-[14px]" style={{ color: V4.sub }}>{d}</p>
                        </div>
                    </li>
                ))}
            </ol>
            <p className="mt-7 text-center text-[13.5px] font-bold md:text-[14px]" style={{ color }}>＼ {track.note}</p>
            <a
                href={href}
                target={track.external ? "_blank" : undefined}
                rel={track.external ? "noopener noreferrer" : undefined}
                className="mt-4 inline-flex min-h-[56px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-[15px] font-bold transition-transform hover:-translate-y-0.5 md:min-h-[60px] md:px-6 md:text-[18px]"
                style={tone === "coral" ? { backgroundColor: color, color: "#fff" } : { border: `2px solid ${color}`, color, backgroundColor: "#fff" }}
            >
                {track.cta}
                <ArrowUpRight className="h-5 w-5" aria-hidden />
            </a>
        </div>
    );
}

export function Flow({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden px-4 py-14 md:px-6 md:py-20" style={{ backgroundColor: BG }}>
            <div className="relative mx-auto max-w-6xl">
                <div className="mb-9 flex flex-col gap-5 md:mb-11 md:flex-row md:items-center md:justify-between md:gap-8">
                    <div className="flex items-center gap-5">
                        <p aria-label="Flow" className="text-[clamp(2.75rem,6.4vw,5rem)] font-bold leading-none" style={{ fontFamily: serif }}>
                            <span aria-hidden style={{ color: V4.teal }}>F</span><span aria-hidden style={{ color: V4.coralDeep }}>l</span><span aria-hidden style={{ color: "#B07D1A" }}>o</span><span aria-hidden style={{ color: V4.navy }}>w</span>
                        </p>
                        <span aria-hidden className="block h-12 w-px" style={{ backgroundColor: "rgba(20,51,90,0.35)" }} />
                        <p className="text-[14px] font-bold md:text-[15px]" style={{ color: V4.coralDeep }}>{t.eyebrow}</p>
                    </div>
                    <div className="md:text-left">
                        <h2 className={`${mincho.className} text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.2] tracking-[0.02em]`} style={{ color: V4.navy }}>{t.title}</h2>
                        <p className="mt-2 text-[14.5px] md:text-[17px]" style={{ color: V4.sub }}>{t.lead}</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                    <FadeIn className="h-full"><Card track={t.left} tone="coral" lang={lang} /></FadeIn>
                    <FadeIn delay={0.08} className="h-full"><Card track={t.right} tone="teal" lang={lang} /></FadeIn>
                </div>
            </div>
        </section>
    );
}
