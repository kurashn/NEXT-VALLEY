// Server Component — 課題への共感（sample/problem.png の忠実再現・差分ループ3周目）
// 深紺の世界観。大きなカード内アート／割れたシェブロンの帯バナー／等高線の装飾

import React from "react";
import { MonitorSmartphone, TrendingDown, Clock, ChartColumn } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

/* ── カード内の背景アート（カード右側を大きく占める線画） ── */

function ArtBrowser() {
    return (
        <svg viewBox="0 0 220 200" className="h-full w-full" fill="none" aria-hidden preserveAspectRatio="xMaxYMid meet">
            <g transform="rotate(-10 130 100)" stroke="rgba(226,108,92,0.45)" strokeWidth="1.5">
                <rect x="40" y="30" width="200" height="150" rx="8" fill="rgba(255,255,255,0.04)" />
                <line x1="40" y1="58" x2="240" y2="58" />
                <circle cx="56" cy="44" r="3.5" />
                <circle cx="70" cy="44" r="3.5" />
                <line x1="216" y1="38" x2="228" y2="50" strokeWidth="2" />
                <line x1="228" y1="38" x2="216" y2="50" strokeWidth="2" />
                <g strokeDasharray="2 5" opacity="0.8">
                    <line x1="58" y1="80" x2="180" y2="80" />
                    <line x1="58" y1="98" x2="150" y2="98" />
                    <line x1="58" y1="116" x2="195" y2="116" />
                    <line x1="58" y1="134" x2="140" y2="134" />
                </g>
            </g>
        </svg>
    );
}

function ArtFunnel() {
    return (
        <svg viewBox="0 0 220 200" className="h-full w-full" fill="none" aria-hidden preserveAspectRatio="xMaxYMid meet">
            <g stroke="rgba(226,108,92,0.4)" strokeWidth="1.2">
                <ellipse cx="130" cy="38" rx="88" ry="20" />
                <ellipse cx="130" cy="76" rx="64" ry="15" />
                <ellipse cx="130" cy="112" rx="42" ry="11" />
                <ellipse cx="130" cy="146" rx="24" ry="7" />
                <ellipse cx="130" cy="176" rx="11" ry="4.5" />
                <line x1="42" y1="38" x2="106" y2="176" />
                <line x1="218" y1="38" x2="154" y2="176" />
                <path d="M66 38 Q100 110 118 176" opacity="0.5" />
                <path d="M194 38 Q160 110 142 176" opacity="0.5" />
            </g>
            <g fill="rgba(226,108,92,0.7)">
                <circle cx="80" cy="34" r="2" />
                <circle cx="170" cy="42" r="2" />
                <circle cx="108" cy="78" r="2" />
                <circle cx="148" cy="114" r="2" />
                <circle cx="128" cy="148" r="2" />
            </g>
        </svg>
    );
}

function ArtClock() {
    return (
        <svg viewBox="0 0 220 200" className="h-full w-full" fill="none" aria-hidden preserveAspectRatio="xMaxYMid meet">
            <g stroke="rgba(226,108,92,0.45)" strokeWidth="1.5">
                <circle cx="150" cy="100" r="86" />
                <circle cx="150" cy="100" r="72" strokeWidth="0.8" opacity="0.5" />
                {Array.from({ length: 12 }, (_, i) => {
                    const a = (i * Math.PI) / 6;
                    const x1 = 150 + Math.sin(a) * 76;
                    const y1 = 100 - Math.cos(a) * 76;
                    const x2 = 150 + Math.sin(a) * 86;
                    const y2 = 100 - Math.cos(a) * 86;
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="2" />;
                })}
                <line x1="150" y1="100" x2="150" y2="44" strokeWidth="2.5" />
                <line x1="150" y1="100" x2="192" y2="122" strokeWidth="2.5" />
                <circle cx="150" cy="100" r="4" fill="rgba(226,108,92,0.6)" />
            </g>
        </svg>
    );
}

function ArtChart() {
    return (
        <svg viewBox="0 0 220 200" className="h-full w-full" fill="none" aria-hidden preserveAspectRatio="xMaxYMid meet">
            <g stroke="rgba(255,255,255,0.1)" strokeWidth="1">
                <line x1="20" y1="170" x2="215" y2="170" />
                <line x1="20" y1="125" x2="215" y2="125" strokeDasharray="3 6" />
                <line x1="20" y1="80" x2="215" y2="80" strokeDasharray="3 6" />
                <line x1="20" y1="35" x2="215" y2="35" strokeDasharray="3 6" />
            </g>
            <polyline
                points="25,160 60,125 92,140 125,88 158,102 200,40"
                stroke="rgba(226,108,92,0.55)"
                strokeWidth="2"
            />
            <g fill="rgba(226,108,92,0.8)">
                {[
                    [25, 160],
                    [60, 125],
                    [92, 140],
                    [125, 88],
                    [158, 102],
                    [200, 40],
                ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3" />
                ))}
            </g>
        </svg>
    );
}

const problems = [
    {
        icon: TrendingDown,
        art: ArtFunnel,
        title: <>集客が、<br className="hidden md:block" />うまくいかない</>,
        body: <>HP・SNS・広告。やってはいるが、どれも中途半端で、問い合わせに<span className="nowrap">つながらない。</span></>,
    },
    {
        icon: MonitorSmartphone,
        art: ArtBrowser,
        title: <>ホームページが、<br className="hidden md:block" />古いまま</>,
        body: <>10年前のサイトが放置されたまま。会社の顔が、毎日の機会損失を生み<span className="nowrap">続けている。</span></>,
    },
    {
        icon: Clock,
        art: ArtClock,
        title: <>人手が足りず、<br className="hidden md:block" />業務に追われる</>,
        body: <>AIで効率化したいが、何から始めればいいか分からず、日々の業務で手一杯に<span className="nowrap">なっている。</span></>,
    },
    {
        icon: ChartColumn,
        art: ArtChart,
        title: <>施策の成果が、<br className="hidden md:block" />見えない</>,
        body: <>何が効いているのか分からないまま、社内の理解も、来期の予算も得られずに<span className="nowrap">いる。</span></>,
    },
];

/* ロゴのシェブロンマーク */
function SplitChevron() {
    return (
        <svg viewBox="0 0 27 40" className="h-10 w-auto" fill="none" aria-hidden>
            <path d="M0 0L15 20L0 40H12L27 20L12 0H0Z" fill="var(--color-coral)" />
        </svg>
    );
}

export function Problem() {
    return (
        <section className="relative overflow-hidden bg-navy-deep px-4 py-16 md:px-6 md:py-24">
            {/* 右上の等高線メッシュ装飾 */}
            <svg
                aria-hidden
                viewBox="0 0 700 320"
                fill="none"
                className="pointer-events-none absolute -top-6 right-0 hidden w-[640px] opacity-60 md:block"
            >
                <g stroke="rgba(226,108,92,0.25)" strokeWidth="1">
                    <path d="M0 200 C120 150 200 240 320 190 S560 90 700 140" />
                    <path d="M40 160 C160 110 240 200 360 150 S580 60 700 100" />
                    <path d="M90 120 C200 80 280 160 400 115 S600 35 700 70" />
                    <path d="M150 85 C250 55 330 125 450 85 S620 15 700 45" />
                </g>
                <g fill="rgba(226,108,92,0.5)">
                    <circle cx="320" cy="190" r="2" />
                    <circle cx="360" cy="150" r="2" />
                    <circle cx="450" cy="85" r="2" />
                    <circle cx="560" cy="98" r="2" />
                    <circle cx="620" cy="40" r="2" />
                </g>
            </svg>

            <div className="relative mx-auto max-w-7xl">
                <FadeIn>
                    <p className="mb-6 text-[13px] font-bold tracking-[0.3em] text-coral">PROBLEM</p>
                    <h2 className="mb-6 text-[clamp(2rem,4vw,4rem)] font-bold leading-[1.35] tracking-tight text-white">
                        こんな状態のまま、
                        <br />
                        止まっていませんか。
                    </h2>
                    <p className="lead mb-12 text-[15px] leading-[2] text-navy-sub md:mb-16">
                        集客も、業務も、「なんとなく」のままでは変わりません。
                        <br />
                        こんなお悩み、ありませんか？
                    </p>
                </FadeIn>

                {/* 課題カード4枚 */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {problems.map((p, i) => (
                        <FadeIn key={i} delay={i * 0.08} className="flex">
                            <div className="glass-edge group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-coral/50 hover:bg-white/[0.06]">
                                {/* カード右側を大きく占める背景アート */}
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute -right-2 top-2 h-28 w-[52%] opacity-80 transition-opacity duration-300 group-hover:opacity-100 md:-right-6 md:top-3 md:h-44 md:w-[80%]"
                                >
                                    <p.art />
                                </div>
                                {/* アート裏の淡いハイライト */}
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute right-0 top-0 h-32 w-1/2 md:h-48 md:w-2/3"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse at 70% 30%, rgba(226,108,92,0.08), transparent 70%)",
                                    }}
                                />

                                <p className="relative mb-4 flex items-center gap-3 text-2xl font-bold tracking-widest text-coral">
                                    {String(i + 1).padStart(2, "0")}
                                    <span aria-hidden className="block h-px w-8 bg-coral/40" />
                                </p>
                                <p.icon
                                    aria-hidden
                                    className="relative mb-6 h-10 w-10 text-coral transition-transform duration-300 group-hover:scale-110 md:mb-12 md:h-11 md:w-11"
                                    strokeWidth={1.5}
                                />
                                <h3 className="relative mb-4 text-xl font-bold leading-snug text-white">{p.title}</h3>
                                <p className="relative flex-1 text-sm leading-[1.9] text-navy-sub">{p.body}</p>
                                <span
                                    aria-hidden
                                    className="mt-5 block h-0.5 w-16 transition-all duration-300 group-hover:w-24"
                                    style={{
                                        background: "linear-gradient(to right, var(--color-coral), transparent)",
                                    }}
                                />
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* 帯バナー（コーラルの光条つき） */}
                <FadeIn>
                    <div className="relative mt-10 overflow-hidden rounded-2xl border border-coral/40 bg-white/[0.04] md:mt-14">
                        {/* 左端の光だまり */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-y-0 left-0 w-72"
                            style={{
                                background:
                                    "radial-gradient(ellipse 60% 120% at 0% 50%, rgba(226,108,92,0.18), transparent)",
                            }}
                        />
                        {/* 右上の光 */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    "radial-gradient(ellipse 30% 100% at 100% 0%, rgba(226,108,92,0.15), transparent)",
                            }}
                        />

                        <div className="relative flex flex-col items-start gap-5 px-5 py-7 md:flex-row md:items-center md:gap-10 md:px-14 md:py-10">
                            <span
                                aria-hidden
                                className="glow-pulse flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-coral/60 [&>svg]:h-6 md:h-24 md:w-24 md:[&>svg]:h-10"
                            >
                                <SplitChevron />
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="mb-2 text-[15px] text-white md:mb-3 md:text-[17px]">原因はあなたではありません。</p>
                                <p className="text-[clamp(1.1875rem,3.4vw,2.5rem)] font-bold leading-[1.5] text-white">
                                    <span className="nowrap"><span className="text-coral">『作る会社』</span>と<span className="text-coral">『集める会社』</span>が</span>
                                    <span className="nowrap">分かれていることです。</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
