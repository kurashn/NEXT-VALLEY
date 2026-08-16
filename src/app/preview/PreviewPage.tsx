import Image from "next/image";
import Link from "next/link";
import { Noto_Sans_JP, Instrument_Serif } from "next/font/google";
import { ArrowRight, Check, Gift, ShieldCheck, X, Quote, Lock } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PreviewApply } from "./PreviewApply";
import { StickyApply } from "./StickyApply";
import { previewCopy, REMAINING_SLOTS, TOTAL_SLOTS, type PreviewCopy } from "./copy";
import { withLang, langAttr, type Lang } from "@/i18n";
import logo from "@/images/logo-new.png";
import shun from "@/images/shun-new.webp";
import fvPhoto from "@/images/preview-fv-laptop.webp"; // Unsplash（商用利用可）: 机の上のノートPC（人物なし）
import "./preview.css";

export { previewMetadata } from "./copy";

/**
 * 無料プレビュー制作キャンペーン LP（/preview, /en/preview）の本体
 * - ゴールは1つ: LINEで申し込む
 * - 毎月10社限定。残り枠は copy.tsx の REMAINING_SLOTS を書き換えるだけで全箇所に反映される
 * - 文言は copy.tsx の { ja, en } から lang で引く
 */

/* LP専用の書体（本体サイトには影響しない） */
const lpSans = Noto_Sans_JP({ variable: "--lp-font-sans", subsets: ["latin"], weight: ["400", "500", "700", "900"], display: "swap", preload: false });
const lpSerif = Instrument_Serif({ variable: "--lp-font-serif", subsets: ["latin"], weight: "400", display: "swap" });

/* ───────────────────────── 部品 ───────────────────────── */

function LineButton({ t, className = "" }: { t: PreviewCopy; className?: string }) {
    return (
        <a
            href="#apply"
            className={`lp-cta group inline-flex h-16 w-full max-w-md items-center justify-center gap-3 rounded-full bg-coral-deep px-6 text-[17px] font-bold text-white shadow-cta transition-all duration-300 hover:-translate-y-0.5 sm:w-auto sm:max-w-none sm:px-9 ${className}`}
        >
            <span className="whitespace-nowrap">{t.lineButton}</span>
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
        </a>
    );
}

function CtaBlock({ t, message, dark = false }: { t: PreviewCopy; message: React.ReactNode; dark?: boolean }) {
    return (
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <p className={`text-[15px] font-bold leading-[1.9] ${dark ? "text-white" : "text-ink"}`}>{message}</p>
            <LineButton t={t} />
            <p className={`text-xs ${dark ? "text-navy-sub" : "text-ink-sub"}`}>{t.ctaNote}</p>
        </div>
    );
}

function SectionHead({ label, jp, lead, dark = false, align = "left" }: { label: string; jp: React.ReactNode; lead?: React.ReactNode; dark?: boolean; align?: "left" | "center" }) {
    return (
        <div className={`mb-10 md:mb-14 ${align === "center" ? "text-center" : ""}`}>
            <p className={`inline-flex items-center gap-2.5 text-[12px] font-bold tracking-[0.25em] ${dark ? "text-coral" : "text-coral-deep"}`}>
                <span aria-hidden className="block h-px w-6 bg-current" />
                {label}
            </p>
            <h2 className={`mt-4 text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold leading-[1.4] tracking-tight ${dark ? "text-white" : "text-ink"}`}>{jp}</h2>
            {lead && <p className={`lead mt-4 max-w-[38em] text-[15px] leading-[2] ${align === "center" ? "mx-auto" : ""} ${dark ? "text-navy-sub" : "text-ink-sub"}`}>{lead}</p>}
        </div>
    );
}

function SlotsMeter({ t, dark = true }: { t: PreviewCopy; dark?: boolean }) {
    return (
        <div className={`inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-full border px-4 py-2 ${dark ? "border-white/15 bg-white/[0.04]" : "border-line bg-white"}`}>
            <span className="relative flex h-2.5 w-2.5">
                <span className="lp-pulse absolute inline-flex h-full w-full rounded-full bg-coral" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
            </span>
            <span className={`text-sm font-bold ${dark ? "text-white" : "text-ink"}`}>
                {t.slots.before}<span className="lp-serif text-2xl leading-none text-coral">{REMAINING_SLOTS}</span>
                <span className={dark ? "text-navy-sub" : "text-ink-sub"}>{t.slots.after}</span>
            </span>
            <span className="flex gap-1" aria-hidden>
                {Array.from({ length: TOTAL_SLOTS }).map((_, i) => (
                    <span key={i} className={`h-1.5 w-3 rounded-full ${i < REMAINING_SLOTS ? "bg-coral" : dark ? "bg-white/15" : "bg-line"}`} />
                ))}
            </span>
        </div>
    );
}

/* ───────────────────────── ページ ───────────────────────── */

export function PreviewPage({ lang = "ja" }: { lang?: Lang }) {
    const t = previewCopy[lang];
    return (
        <main {...langAttr(lang)} className={`lp-root ${lpSans.variable} ${lpSerif.variable} min-h-screen bg-base text-ink`}>
            {/* ヘッダー（ナビなし・ゴールを1つに） */}
            <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-navy-deep/85 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">
                    <Link href={withLang(lang, "/")} className="flex min-h-11 items-center">
                        <Image src={logo} alt="NEXT VALLEY" width={180} height={40} className="h-8 w-auto object-contain md:h-9" priority />
                    </Link>
                    <div className="flex items-center gap-4">
                        <p className="hidden items-center gap-2 rounded-full bg-navy-deep px-3 py-1.5 text-sm font-bold text-white md:inline-flex">
                            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                            {t.header.badge(REMAINING_SLOTS)}
                        </p>
                        <a
                            href="#apply"
                            className="inline-flex h-11 items-center gap-2 rounded-full bg-coral-deep px-5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                        >
                            <span className="whitespace-nowrap">{t.header.cta}</span>
                            <ArrowRight className="h-4 w-4" aria-hidden />
                        </a>
                    </div>
                </div>
            </header>

            {/* ── FV（写真なし・オーロラ＋グリッド） ── */}
            <section className="lp-aurora relative overflow-hidden bg-navy-deep pt-16 md:pt-20">
                {/* FV写真（トップとは別。右側に淡く敷いて左へフェード） */}
                <div
                    aria-hidden
                    className="absolute inset-y-0 right-0 w-full md:w-[70%]"
                    style={{ maskImage: "linear-gradient(to right, transparent 0%, black 55%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 55%)" }}
                >
                    <Image src={fvPhoto} alt="" fill priority className="object-cover object-[70%_center] opacity-30 md:opacity-40" sizes="(max-width: 768px) 100vw, 70vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-navy-deep/30" />
                </div>
                <div aria-hidden className="lp-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
                <div aria-hidden className="lp-vignette pointer-events-none absolute inset-0" />

                <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] max-w-7xl items-center px-4 pb-24 pt-14 md:px-6 md:pb-32 md:pt-20">
                    <div className="min-w-0 max-w-3xl">
                        <FadeIn>
                            <p className={`mb-7 inline-flex items-center gap-2.5 rounded-full border border-coral/60 bg-coral/10 px-4 py-2 text-[12px] font-bold text-coral ${lang === "en" ? "tracking-[0.12em]" : "tracking-[0.2em]"}`}>
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                                <span className="whitespace-nowrap"><span className="hidden sm:inline">{t.hero.tagLong}</span><span className="sm:hidden">{t.hero.tagShort}</span>{t.hero.tagSuffix}</span>
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.08}>
                            <h1 className="text-white">
                                <span className="block text-[clamp(2.75rem,7.2vw,6rem)] font-black leading-[1.1] tracking-[-0.03em]">{t.hero.h1a}</span>
                                <span className="mt-5 block text-[clamp(1.25rem,2.6vw,2.125rem)] font-bold leading-[1.5] tracking-tight">
                                    {t.hero.h1b}
                                </span>
                            </h1>
                        </FadeIn>
                        <FadeIn delay={0.16}>
                            <p className="lead mt-8 max-w-[34em] text-base leading-[2] text-navy-sub md:text-lg">
                                {t.hero.lead}
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.22}>
                            <ul className="mt-8 flex flex-wrap gap-2.5">
                                {t.hero.chips.map(({ k, v }) => (
                                    <li key={k} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] py-2 pl-3 pr-4 text-sm text-white backdrop-blur-sm">
                                        <Check className="h-4 w-4 text-coral" aria-hidden />
                                        <span className="text-navy-sub">{k}</span>
                                        <span className="font-bold">{v}</span>
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <div className="mt-10 flex flex-col items-stretch gap-5 sm:items-start">
                                <LineButton t={t} />
                                <p className="text-sm text-navy-sub">
                                    {t.hero.note}
                                </p>
                                <SlotsMeter t={t} />
                            </div>
                        </FadeIn>
                    </div>

                </div>

                <div aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
                    <span className="text-[10px] font-bold tracking-[0.35em] text-white/50">{t.hero.scroll}</span>
                    <span className="lp-cue relative block h-10 w-px overflow-hidden text-coral/80" />
                </div>
            </section>

            {/* ── 数字の帯（信頼） ── */}
            <section className="border-b border-line bg-white" aria-label={t.statsAria}>
                <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
                    {t.stats.map((s) => (
                        <div key={s.k} className="flex flex-col items-center px-4 py-6 text-center md:py-7">
                            <dd className="text-ink">
                                <span className="lp-serif text-[2.75rem] leading-none text-navy">{s.v}</span>
                                <span className="ml-1 text-sm font-bold">{s.unit}</span>
                            </dd>
                            <dt className="mt-1 text-[12px] tracking-[0.1em] text-ink-sub">{s.k}</dt>
                        </div>
                    ))}
                </dl>
            </section>

            {/* ── 共感: いちばん怖いこと ── */}
            <section className="bg-base px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead
                            label={t.fears.label}
                            jp={t.fears.title}
                            lead={t.fears.lead}
                        />
                    </FadeIn>
                    <div className="grid gap-5 md:grid-cols-3">
                        {t.fears.items.map((f, i) => (
                            <FadeIn key={i} delay={i * 0.08}>
                                <div className="h-full rounded-[20px] border border-line/70 bg-white p-7 shadow-card md:p-8">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-coral-deep">
                                        <f.icon className="h-6 w-6" aria-hidden />
                                    </span>
                                    <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{f.t}</h3>
                                    <p className="mt-3 text-sm leading-[2] text-ink-sub">{f.d}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                    <FadeIn>
                        <p className="mt-10 text-center text-[clamp(1.125rem,2vw,1.5rem)] font-bold leading-[1.7] text-ink">
                            {t.fears.closing}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* ── 解決: 順番を変えた ── */}
            <section className="bg-white px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead
                            label={t.answer.label}
                            jp={t.answer.title}
                            lead={t.answer.lead}
                        />
                    </FadeIn>
                    <div className="grid gap-6 md:grid-cols-2">
                        <FadeIn>
                            <div className="h-full rounded-[20px] border border-line bg-white p-7 md:p-9">
                                <p className="text-[12px] font-bold tracking-[0.25em] text-ink-sub">{t.answer.usualLabel}</p>
                                <ol className="mt-5 space-y-3">
                                    {t.answer.usualFlow.map((s, i) => (
                                        <li key={s} className="flex items-start gap-3 text-[15px] leading-[1.8] text-ink-sub">
                                            <span className="lp-serif mt-0.5 w-6 shrink-0 text-lg leading-none text-ink-sub">{i + 1}</span>
                                            <span className={i === t.answer.usualFlow.length - 1 ? "lp-strike font-bold text-ink" : ""}>{s}</span>
                                        </li>
                                    ))}
                                </ol>
                                <p className="mt-6 flex items-center gap-2 text-sm font-bold text-ink">
                                    <X className="h-4 w-4 text-coral-deep" aria-hidden />
                                    {t.answer.usualClosing}
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <div className="relative h-full overflow-hidden rounded-[20px] bg-navy-deep p-7 text-white shadow-[0_30px_60px_rgba(4,22,39,0.35)] md:p-9">
                                <span aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-coral/20 blur-3xl" />
                                <p className="text-[12px] font-bold tracking-[0.25em] text-coral">{t.answer.ourLabel}</p>
                                <ol className="mt-5 space-y-3">
                                    {t.answer.ourFlow.map((s, i) => (
                                        <li key={s} className="flex items-start gap-3 text-[15px] font-bold leading-[1.8]">
                                            <span className="lp-serif mt-0.5 w-6 shrink-0 text-lg leading-none text-coral">{i + 1}</span>
                                            <span>{s}</span>
                                        </li>
                                    ))}
                                </ol>
                                <p className="mt-6 flex items-center gap-2 text-sm font-bold">
                                    <Check className="h-4 w-4 text-coral" aria-hidden />
                                    {t.answer.ourClosing}
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── お届けするもの ── */}
            <section className="bg-base px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead
                            label={t.deliver.label}
                            jp={t.deliver.title}
                            lead={t.deliver.lead}
                        />
                    </FadeIn>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {t.deliver.items.map((d, i) => (
                            <FadeIn key={i} delay={i * 0.06}>
                                <div className="group h-full rounded-[20px] border border-line/70 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-deep text-coral transition-transform duration-300 group-hover:scale-105">
                                        <d.icon className="h-6 w-6" aria-hidden />
                                    </span>
                                    <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{d.t}</h3>
                                    <p className="mt-3 text-sm leading-[2] text-ink-sub">{d.d}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                    <FadeIn>
                        <CtaBlock t={t} message={t.deliver.cta} />
                    </FadeIn>
                </div>
            </section>

            {/* ── 比較: 一般的な選択肢と何が違うか ── */}
            <section className="bg-white px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead
                            label={t.compare.label}
                            jp={t.compare.title}
                            lead={t.compare.lead}
                        />
                    </FadeIn>
                    {/* モバイル: 行ごとのカード */}
                    <div className="space-y-4 md:hidden">
                        {t.compare.rows.map((r, i) => (
                            <FadeIn key={r.k} delay={i * 0.04}>
                                <div className="rounded-[20px] border border-line/70 bg-white p-5 shadow-card">
                                    <p className="text-[15px] font-bold text-ink">{r.k}</p>
                                    <dl className="mt-3 space-y-2 text-[13px]">
                                        <div className="flex gap-3"><dt className="w-[8.5em] shrink-0 text-ink-sub">{t.compare.colA}</dt><dd className="text-ink-sub">{r.a}</dd></div>
                                        <div className="flex gap-3"><dt className="w-[8.5em] shrink-0 text-ink-sub">{t.compare.colB}</dt><dd className="text-ink-sub">{r.b}</dd></div>
                                        <div className="flex gap-3 rounded-xl bg-coral/[0.08] px-3 py-2"><dt className="w-[8.5em] shrink-0 font-bold text-coral-deep">{t.compare.colCShort}</dt><dd className="font-bold text-ink">{r.c}</dd></div>
                                    </dl>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                    <FadeIn className="hidden md:block">
                        <div className="overflow-x-auto rounded-[20px] border border-line/70 bg-white shadow-card">
                            <table className="lp-table w-full min-w-[820px] text-left text-[14px]">
                                <thead>
                                    <tr className="bg-navy-deep text-white">
                                        <th className="w-[26%] rounded-tl-[20px] text-[12px] font-bold tracking-[0.15em] text-navy-sub">{t.compare.colK}</th>
                                        <th className="w-[24%] font-bold">{t.compare.colA}</th>
                                        <th className="w-[22%] font-bold">{t.compare.colB}</th>
                                        <th className="w-[28%] whitespace-nowrap rounded-tr-[20px] bg-coral-deep font-bold">{t.compare.colC}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {t.compare.rows.map((r) => (
                                        <tr key={r.k}>
                                            <th className="whitespace-nowrap font-bold text-ink">{r.k}</th>
                                            <td className="whitespace-nowrap text-ink-sub">{r.a}</td>
                                            <td className="whitespace-nowrap text-ink-sub">{r.b}</td>
                                            <td className="whitespace-nowrap bg-coral/[0.07] font-bold text-ink">{r.c}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── お客様の声 ── */}
            <section className="bg-base px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead label={t.voices.label} jp={t.voices.title} lead={t.voices.lead} />
                    </FadeIn>
                    <div className="grid gap-5 md:grid-cols-2">
                        {t.voices.items.map((v, i) => (
                            <FadeIn key={v.name} delay={i * 0.08}>
                                <figure className="h-full rounded-[20px] border border-line/70 bg-white p-7 shadow-card md:p-8">
                                    <Quote className="h-6 w-6 text-coral" aria-hidden />
                                    <blockquote className="mt-4 text-[15px] leading-[2] text-ink">{v.text}</blockquote>
                                    <figcaption className="mt-5 text-sm">
                                        <span className="font-bold text-ink">{v.name}</span>
                                        <span className="ml-2 text-ink-sub">{v.label}</span>
                                    </figcaption>
                                </figure>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 流れ ── */}
            <section id="flow" className="bg-white px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead label={t.flow.label} jp={t.flow.title} lead={t.flow.lead} />
                    </FadeIn>
                    <div className="grid items-start gap-10 lg:grid-cols-12">
                        <ol className="space-y-4 lg:col-span-7">
                            {t.flow.steps.map((s, i) => (
                                <FadeIn key={s.n} delay={i * 0.08}>
                                    <li className="flex gap-6 rounded-[20px] border border-line/70 bg-white p-7 shadow-card md:p-8">
                                        <div className="shrink-0 text-center">
                                            <p className="lp-serif text-5xl leading-none text-coral">{s.n}</p>
                                            <p className="mt-2 text-[10px] font-bold tracking-[0.3em] text-coral-deep">STEP</p>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold leading-snug text-ink md:text-xl">{s.t}</h3>
                                            <p className="mt-2 text-sm leading-[2] text-ink-sub">{s.d}</p>
                                        </div>
                                    </li>
                                </FadeIn>
                            ))}
                        </ol>
                        <FadeIn delay={0.15} className="lg:col-span-5">
                            <div className="mx-auto max-w-[380px] overflow-hidden rounded-[28px] border border-line bg-[#8cabd9] shadow-card-hover" aria-hidden>
                                <div className="flex items-center gap-2 bg-[#2c3e50] px-4 py-3 text-white">
                                    <span className="h-7 w-7 rounded-full bg-white/20" />
                                    <span className="text-sm font-bold">NEXT VALLEY</span>
                                </div>
                                <div className="space-y-3 p-4 text-[13px] leading-[1.7]">
                                    <div className="flex justify-end">
                                        <p className="max-w-[86%] whitespace-pre-line rounded-2xl rounded-tr-sm bg-[#8de055] px-3.5 py-2 text-ink">{t.flow.chatSample}</p>
                                    </div>
                                    <div className="flex justify-start">
                                        <p className="max-w-[86%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-ink">
                                            {t.flow.chatReply}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                    <FadeIn>
                        <CtaBlock t={t} message={t.flow.cta} />
                    </FadeIn>
                </div>
            </section>

            {/* ── なぜ無料か ＋ その先の料金 ── */}
            <section className="bg-base px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead label={t.pricing.label} jp={t.pricing.title} lead={t.pricing.lead} />
                    </FadeIn>
                    <div className="grid gap-6 md:grid-cols-2">
                        <FadeIn>
                            <div className="h-full rounded-[20px] border border-line/70 bg-white p-8 shadow-card md:p-10">
                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-coral-deep">
                                    <Gift className="h-6 w-6" aria-hidden />
                                </span>
                                <h3 className="mt-5 text-xl font-bold leading-snug text-ink md:text-2xl">{t.pricing.whyTitle}</h3>
                                <p className="mt-4 text-[15px] leading-[2] text-ink-sub">
                                    {t.pricing.whyP1}
                                </p>
                                <p className="mt-4 text-[15px] leading-[2] text-ink-sub">
                                    {t.pricing.whyP2}
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <div className="relative h-full overflow-hidden rounded-[20px] bg-navy-deep p-8 text-white md:p-10">
                                <span aria-hidden className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-coral/15 blur-3xl" />
                                <p className="text-[12px] font-bold tracking-[0.25em] text-coral">{t.pricing.nextLabel}</p>
                                <h3 className="mt-3 text-xl font-bold leading-snug md:text-2xl">{t.pricing.nextTitle}</h3>
                                <p className="mt-4 text-[15px] leading-[2] text-navy-sub">
                                    {t.pricing.nextLead}
                                </p>
                                <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                                    {t.pricing.prices.map((p) => (
                                        <li key={p.k} className="flex items-center justify-between py-3.5">
                                            <span className="text-[15px]">{p.k}</span>
                                            <span className="text-lg font-bold">{p.prefix}<span className="lp-serif text-2xl leading-none">{p.num}</span>{p.suffix}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-4 text-xs text-navy-sub">{t.pricing.priceNote}</p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── 3つの約束（リスクの撤去） ── */}
            <section className="bg-white px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead label={t.promises.label} jp={t.promises.title} />
                    </FadeIn>
                    <div className="grid gap-5 md:grid-cols-3">
                        {t.promises.items.map((p, i) => (
                            <FadeIn key={p.t} delay={i * 0.08}>
                                <div className="h-full rounded-[20px] border border-line/70 border-t-4 border-t-coral bg-white p-7 shadow-card md:p-8">
                                    <p className="lp-serif text-4xl leading-none text-coral">0{i + 1}</p>
                                    <h3 className="mt-4 flex items-center gap-2 text-lg font-bold leading-snug text-ink">
                                        <ShieldCheck className="h-5 w-5 shrink-0 text-coral-deep" aria-hidden />
                                        {p.t}
                                    </h3>
                                    <p className="mt-3 text-sm leading-[2] text-ink-sub">{p.d}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 対象／対象外 ＋ 10社の理由 ── */}
            <section className="bg-base px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead
                            label={t.target.label}
                            jp={t.target.title}
                            lead={t.target.lead}
                        />
                    </FadeIn>
                    <div className="mb-6 grid gap-5 md:grid-cols-3">
                        {t.target.conditions.map((c, i) => (
                            <FadeIn key={i} delay={i * 0.06}>
                                <div className="flex h-full gap-4 rounded-[20px] border border-line/70 bg-white p-6 shadow-card">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy-deep text-coral">
                                        <c.icon className="h-5 w-5" aria-hidden />
                                    </span>
                                    <div>
                                        <p className="text-[11px] font-bold tracking-[0.25em] text-coral-deep">{t.target.condLabel(i + 1)}</p>
                                        <h3 className="mt-1 text-[15px] font-bold leading-snug text-ink">{c.t}</h3>
                                        <p className="mt-2 text-[13px] leading-[1.9] text-ink-sub">{c.d}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                    <div className="grid gap-6 lg:grid-cols-12">
                        <FadeIn className="lg:col-span-7">
                            <div className="grid h-full gap-6 rounded-[20px] border border-line/70 bg-white p-7 shadow-card sm:grid-cols-2 md:p-9">
                                <div>
                                    <p className="text-[12px] font-bold tracking-[0.25em] text-coral-deep">{t.target.forLabel}</p>
                                    <ul className="mt-4 space-y-3">
                                        {t.target.forWho.map((s) => (
                                            <li key={s} className="flex items-start gap-2.5 text-[15px] font-bold leading-[1.8] text-ink">
                                                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral/15">
                                                    <Check className="h-3 w-3 text-coral-deep" aria-hidden />
                                                </span>
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-[12px] font-bold tracking-[0.25em] text-ink-sub">{t.target.notForLabel}</p>
                                    <ul className="mt-4 space-y-3">
                                        {t.target.notForWho.map((s) => (
                                            <li key={s} className="flex items-start gap-2.5 text-[15px] leading-[1.8] text-ink-sub">
                                                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-line">
                                                    <X className="h-3 w-3 text-ink-sub" aria-hidden />
                                                </span>
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-5 text-xs leading-[1.9] text-ink-sub">{t.target.notForNote}</p>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.1} className="lg:col-span-5">
                            <div className="relative h-full overflow-hidden rounded-[20px] border border-line/70 bg-white p-7 shadow-card md:p-9">
                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-coral-deep">
                                    <Lock className="h-6 w-6" aria-hidden />
                                </span>
                                <h3 className="mt-5 text-xl font-bold leading-snug text-ink">{t.target.whyTenTitle}</h3>
                                <p className="mt-4 text-[15px] leading-[2] text-ink-sub">
                                    {t.target.whyTenP}
                                </p>
                                <div className="mt-6">
                                    <SlotsMeter t={t} dark={false} />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="bg-white px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-4xl">
                    <FadeIn>
                        <SectionHead label={t.faq.label} jp={t.faq.title} />
                    </FadeIn>
                    <FadeIn>
                        <div className="rounded-[20px] border border-line/70 bg-white px-6 shadow-card md:px-10">
                            {t.faq.items.map((f, i) => (
                                <details key={f.q} className={`group ${i > 0 ? "border-t border-line" : ""}`}>
                                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                                        <span className="text-base font-bold leading-snug text-ink transition-colors group-hover:text-coral-deep">{f.q}</span>
                                        <span aria-hidden className="shrink-0 text-xl font-bold text-coral transition-transform group-open:rotate-45">＋</span>
                                    </summary>
                                    <p className="pb-6 text-[15px] leading-[2] text-ink-sub">{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── 申し込み（診断形式）＋ 追伸 ── */}
            <section id="apply" className="lp-aurora relative overflow-hidden bg-navy-deep px-4 py-20 text-white md:px-6 md:py-28">
                <div aria-hidden className="lp-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
                <div className="relative mx-auto max-w-4xl">
                    <FadeIn>
                        <div className="mb-10 text-center">
                            <div className="mb-6 flex justify-center">
                                <SlotsMeter t={t} />
                            </div>
                            <h2 className="text-[clamp(1.625rem,3.8vw,3rem)] font-bold leading-[1.45]">
                                {t.apply.title}
                            </h2>
                            <p className="mx-auto mt-4 max-w-[32em] text-[15px] leading-[2] text-navy-sub">
                                {t.apply.lead}
                            </p>
                        </div>
                    </FadeIn>
                    <FadeIn>
                        <PreviewApply lang={lang} />
                    </FadeIn>

                    {/* 追伸（代表から） */}
                    <FadeIn>
                        <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-6 rounded-[20px] border border-white/10 bg-white/[0.04] p-7 text-left sm:flex-row sm:items-start md:p-8">
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-coral/70">
                                <Image src={shun} alt={t.apply.psAlt} fill className="object-cover" sizes="80px" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold tracking-[0.25em] text-coral">{t.apply.psLabel}</p>
                                <p className="mt-3 text-[15px] leading-[2] text-white/90">
                                    {t.apply.psText}
                                </p>
                                <p className="mt-4 text-sm text-navy-sub">{t.apply.psSign}<span className="font-bold text-white">{t.apply.psName}</span></p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── ミニフッター ── */}
            <footer className="border-t border-navy-line bg-navy-deep py-10 text-navy-sub">
                <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 text-xs md:flex-row md:items-center md:px-6">
                    <div className="flex flex-col gap-3">
                        <Link href={withLang(lang, "/")} className="inline-flex min-h-11 items-center">
                            <Image src={logo} alt="NEXT VALLEY" width={150} height={34} className="h-7 w-auto object-contain" />
                        </Link>
                        <p>{t.footer.tagline}</p>
                    </div>
                    <ul className="flex flex-wrap gap-x-6 gap-y-1">
                        {t.footer.links.map(([href, label]) => (
                            <li key={href}>
                                <Link href={href === "/tokusho" || href === "/privacy" ? href : withLang(lang, href)} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="mx-auto mt-4 max-w-7xl px-4 text-xs md:px-6">&copy; {new Date().getFullYear()} NEXT VALLEY</p>
            </footer>

            {/* ── モバイル追従CTA（フォーム表示中は隠れる） ── */}
            <StickyApply lang={lang} />
        </main>
    );
}
