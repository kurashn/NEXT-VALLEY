// Server Component — サービス5本柱（sample/service.png の忠実再現）
// ウォームベージュ地・多色セリフ見出し・白カード＋ソフトなイラスト＋コーラル↗

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";

/* ── カード右側のソフトイラスト（SVG。ベージュ×コーラルの柔らかい質感） ── */

const soft = {
    panel: "#ffffff",
    line: "#e9e2d8",
    beige: "#efe9e0",
    beige2: "#e3dccf",
    coral: "#e26c5c",
    coralSoft: "#f0b3a8",
    ink: "#8a8378",
};

function IlloWeb() {
    return (
        <svg viewBox="0 0 240 170" className="h-full w-full" fill="none" aria-hidden>
            {/* ブラウザ */}
            <g filter="url(#s1)">
                <rect x="30" y="24" width="150" height="112" rx="10" fill={soft.panel} />
            </g>
            <rect x="30" y="24" width="150" height="112" rx="10" stroke={soft.line} />
            <line x1="30" y1="48" x2="180" y2="48" stroke={soft.line} />
            <circle cx="44" cy="36" r="3" fill={soft.coralSoft} />
            <circle cx="55" cy="36" r="3" fill={soft.beige2} />
            <rect x="44" y="60" width="70" height="46" rx="6" fill={soft.beige} />
            <path d="M52 98l16-18 12 12 10-10 14 16z" fill={soft.coralSoft} />
            <circle cx="97" cy="72" r="5" fill={soft.coral} opacity="0.7" />
            <rect x="124" y="62" width="44" height="7" rx="3.5" fill={soft.beige2} />
            <rect x="124" y="76" width="36" height="7" rx="3.5" fill={soft.beige} />
            <rect x="44" y="114" width="124" height="7" rx="3.5" fill={soft.beige} />
            {/* スマホ */}
            <g filter="url(#s1)">
                <rect x="168" y="52" width="44" height="88" rx="10" fill={soft.panel} />
            </g>
            <rect x="168" y="52" width="44" height="88" rx="10" stroke={soft.line} />
            <rect x="176" y="64" width="28" height="20" rx="4" fill={soft.beige} />
            <rect x="176" y="90" width="28" height="5" rx="2.5" fill={soft.beige2} />
            <rect x="176" y="100" width="20" height="5" rx="2.5" fill={soft.beige} />
            <rect x="176" y="116" width="28" height="10" rx="5" fill={soft.coral} opacity="0.85" />
            <defs>
                <filter id="s1" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1f1a14" floodOpacity="0.08" />
                </filter>
            </defs>
        </svg>
    );
}

function IlloSeo() {
    return (
        <svg viewBox="0 0 240 170" className="h-full w-full" fill="none" aria-hidden>
            {/* SEOブラウザ */}
            <g filter="url(#s2)">
                <rect x="88" y="18" width="120" height="84" rx="10" fill={soft.panel} />
            </g>
            <rect x="88" y="18" width="120" height="84" rx="10" stroke={soft.line} />
            <rect x="100" y="30" width="42" height="12" rx="6" fill={soft.coral} opacity="0.85" />
            <rect x="100" y="52" width="96" height="6" rx="3" fill={soft.beige2} />
            <rect x="100" y="64" width="80" height="6" rx="3" fill={soft.beige} />
            <rect x="100" y="76" width="88" height="6" rx="3" fill={soft.beige} />
            {/* マップカード */}
            <g filter="url(#s2)">
                <rect x="150" y="70" width="72" height="60" rx="10" fill={soft.panel} />
            </g>
            <rect x="150" y="70" width="72" height="60" rx="10" stroke={soft.line} />
            <path d="M150 96l24-10 24 10 24-10v34h-72z" fill={soft.beige} opacity="0.8" />
            <circle cx="186" cy="92" r="9" fill={soft.coral} />
            <circle cx="186" cy="92" r="3.5" fill="#fff" />
            <path d="M186 101l0 10" stroke={soft.coral} strokeWidth="3" />
            {/* 棒グラフカード */}
            <g filter="url(#s2)">
                <rect x="120" y="112" width="64" height="46" rx="8" fill={soft.panel} />
            </g>
            <rect x="120" y="112" width="64" height="46" rx="8" stroke={soft.line} />
            <rect x="130" y="136" width="8" height="14" rx="2" fill={soft.beige2} />
            <rect x="144" y="128" width="8" height="22" rx="2" fill={soft.coralSoft} />
            <rect x="158" y="122" width="8" height="28" rx="2" fill={soft.coral} />
            {/* 虫眼鏡 */}
            <circle cx="60" cy="76" r="30" stroke={soft.beige2} strokeWidth="10" fill="rgba(255,255,255,0.6)" />
            <circle cx="60" cy="76" r="30" stroke={soft.ink} strokeWidth="1" opacity="0.25" />
            <rect x="80" y="102" width="34" height="12" rx="6" transform="rotate(45 80 102)" fill={soft.beige2} />
            <defs>
                <filter id="s2" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1f1a14" floodOpacity="0.08" />
                </filter>
            </defs>
        </svg>
    );
}

function IlloSns() {
    return (
        <svg viewBox="0 0 240 170" className="h-full w-full" fill="none" aria-hidden>
            {/* スマホ */}
            <g filter="url(#s3)" transform="rotate(8 150 90)">
                <rect x="118" y="16" width="72" height="140" rx="14" fill={soft.panel} />
            </g>
            <g transform="rotate(8 150 90)">
                <rect x="118" y="16" width="72" height="140" rx="14" stroke={soft.line} />
                <rect x="130" y="34" width="48" height="8" rx="4" fill={soft.beige2} />
                <rect x="130" y="50" width="48" height="36" rx="6" fill={soft.beige} />
                <rect x="130" y="94" width="34" height="6" rx="3" fill={soft.beige2} />
                <rect x="130" y="106" width="44" height="6" rx="3" fill={soft.beige} />
                <rect x="130" y="126" width="48" height="12" rx="6" fill={soft.coral} opacity="0.85" />
            </g>
            {/* SNSバッジ: Instagram（角丸スクエア＋レンズ＋ドット） */}
            <g filter="url(#s3)">
                <rect x="52" y="30" width="40" height="40" rx="10" fill="url(#ig)" />
            </g>
            <rect x="60.5" y="38.5" width="23" height="23" rx="7" stroke="#fff" strokeWidth="2.6" fill="none" />
            <circle cx="72" cy="50" r="5.6" stroke="#fff" strokeWidth="2.6" fill="none" />
            <circle cx="79.4" cy="42.8" r="1.9" fill="#fff" />
            {/* X（斜めの2ストローク） */}
            <g filter="url(#s3)">
                <circle cx="66" cy="106" r="19" fill="#1a1a1a" />
            </g>
            <path d="M58.5 97.5 L73.5 114.5 M73.5 97.5 L58.5 114.5" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
            {/* LINE（角丸スクエア＋白バブル＋LINE文字） */}
            <g filter="url(#s3)">
                <rect x="80" y="128" width="38" height="38" rx="10" fill="#06c755" />
            </g>
            <path
                d="M99 136.5c-7.6 0-13.7 4.9-13.7 11 0 5.4 4.8 9.9 11.3 10.8.5.1.8.3.8.8l-.2 2.4c-.1.7.6 1 1.2.7 5.9-3.3 12-7.3 13.5-11.7.5-1.1.8-2.1.8-3 0-6.1-6.1-11-13.7-11z"
                fill="#fff"
            />
            <text x="99" y="150.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="7.5" fill="#06c755">LINE</text>
            <defs>
                <linearGradient id="ig" gradientUnits="userSpaceOnUse" x1="52" y1="70" x2="92" y2="30">
                    <stop stopColor="#f9ce34" />
                    <stop offset="0.5" stopColor="#ee2a7b" />
                    <stop offset="1" stopColor="#6228d7" />
                </linearGradient>
                <filter id="s3" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1f1a14" floodOpacity="0.1" />
                </filter>
            </defs>
        </svg>
    );
}

function IlloOps() {
    return (
        <svg viewBox="0 0 240 170" className="h-full w-full" fill="none" aria-hidden>
            {/* ブラウザ */}
            <g filter="url(#s4)">
                <rect x="60" y="20" width="130" height="92" rx="10" fill={soft.panel} />
            </g>
            <rect x="60" y="20" width="130" height="92" rx="10" stroke={soft.line} />
            <line x1="60" y1="42" x2="190" y2="42" stroke={soft.line} />
            <circle cx="73" cy="31" r="3" fill={soft.coralSoft} />
            <circle cx="84" cy="31" r="3" fill={soft.beige2} />
            <rect x="74" y="54" width="60" height="7" rx="3.5" fill={soft.beige2} />
            <rect x="74" y="68" width="90" height="7" rx="3.5" fill={soft.beige} />
            <rect x="74" y="82" width="76" height="7" rx="3.5" fill={soft.beige} />
            {/* 歯車 大 */}
            <g filter="url(#s4)">
                <Gear cx={158} cy={118} r={26} fill={soft.beige2} />
            </g>
            {/* 歯車 小 */}
            <g filter="url(#s4)">
                <Gear cx={196} cy={92} r={16} fill={soft.coralSoft} />
            </g>
            {/* レンチ */}
            <g filter="url(#s4)" transform="rotate(-35 108 132)">
                <rect x="96" y="126" width="52" height="11" rx="5.5" fill={soft.ink} opacity="0.55" />
                <circle cx="96" cy="131" r="11" fill="none" stroke={soft.ink} strokeWidth="7" opacity="0.55" />
            </g>
            <defs>
                <filter id="s4" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1f1a14" floodOpacity="0.08" />
                </filter>
            </defs>
        </svg>
    );
}

/* 歯車のヘルパー */
function Gear({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
    const teeth = 8;
    const paths = [];
    for (let i = 0; i < teeth; i++) {
        const a = (i * 2 * Math.PI) / teeth;
        const x = cx + Math.cos(a) * (r + 5);
        const y = cy + Math.sin(a) * (r + 5);
        paths.push(<rect key={i} x={x - 4} y={y - 4} width="8" height="8" rx="2" fill={fill} transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`} />);
    }
    return (
        <g>
            {paths}
            <circle cx={cx} cy={cy} r={r} fill={fill} />
            <circle cx={cx} cy={cy} r={r * 0.42} fill={soft.panel} />
        </g>
    );
}

function IlloAi() {
    return (
        <svg viewBox="0 0 340 170" className="h-full w-full" fill="none" aria-hidden>
            {/* 脳ネットワーク */}
            <g stroke={soft.beige2} strokeWidth="1.5">
                <path d="M60 60 L92 44 L120 66 L96 92 L60 60Z" />
                <path d="M92 44 L128 30 M120 66 L154 58 M96 92 L128 112 M60 60 L34 44 M60 60 L38 86" />
            </g>
            <g fill={soft.coral}>
                <circle cx="60" cy="60" r="4" />
                <circle cx="92" cy="44" r="3.5" />
                <circle cx="120" cy="66" r="4" />
                <circle cx="96" cy="92" r="3.5" />
            </g>
            <g fill={soft.beige2}>
                <circle cx="128" cy="30" r="3" />
                <circle cx="154" cy="58" r="3" />
                <circle cx="128" cy="112" r="3" />
                <circle cx="34" cy="44" r="3" />
                <circle cx="38" cy="86" r="3" />
            </g>
            {/* ノートPC */}
            <g filter="url(#s5)">
                <rect x="182" y="30" width="120" height="86" rx="8" fill={soft.panel} />
            </g>
            <rect x="182" y="30" width="120" height="86" rx="8" stroke={soft.line} />
            <rect x="192" y="42" width="42" height="8" rx="4" fill={soft.beige2} />
            {/* 円グラフ */}
            <circle cx="212" cy="80" r="18" fill={soft.beige} />
            <path d="M212 80 L212 62 A18 18 0 0 1 229 86 Z" fill={soft.coral} opacity="0.85" />
            {/* 折れ線 */}
            <polyline points="242,96 256,82 268,88 282,66 294,72" stroke={soft.coral} strokeWidth="2.5" />
            <g fill={soft.coral}>
                <circle cx="256" cy="82" r="2.5" />
                <circle cx="282" cy="66" r="2.5" />
            </g>
            <path d="M170 116h144l10 14a6 6 0 0 1-6 8H166a6 6 0 0 1-6-8z" fill={soft.beige2} />
            <defs>
                <filter id="s5" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1f1a14" floodOpacity="0.08" />
                </filter>
            </defs>
        </svg>
    );
}


function IlloDesign() {
    return (
        <svg viewBox="0 0 240 170" className="h-full w-full" fill="none" aria-hidden>
            {/* チラシ2枚 */}
            <g filter="url(#s6)" transform="rotate(-6 100 90)">
                <rect x="52" y="30" width="92" height="120" rx="8" fill={soft.panel} />
            </g>
            <g transform="rotate(-6 100 90)">
                <rect x="52" y="30" width="92" height="120" rx="8" stroke={soft.line} />
                <rect x="64" y="44" width="68" height="34" rx="5" fill={soft.coralSoft} />
                <rect x="64" y="88" width="52" height="7" rx="3.5" fill={soft.beige2} />
                <rect x="64" y="102" width="66" height="6" rx="3" fill={soft.beige} />
                <rect x="64" y="114" width="58" height="6" rx="3" fill={soft.beige} />
                <rect x="64" y="130" width="36" height="10" rx="5" fill={soft.coral} opacity="0.85" />
            </g>
            <g filter="url(#s6)" transform="rotate(7 170 95)">
                <rect x="128" y="42" width="80" height="104" rx="8" fill={soft.panel} />
            </g>
            <g transform="rotate(7 170 95)">
                <rect x="128" y="42" width="80" height="104" rx="8" stroke={soft.line} />
                <circle cx="168" cy="76" r="18" fill={soft.beige} />
                <path d="M168 76 L168 58 A18 18 0 0 1 185 82 Z" fill={soft.coral} opacity="0.8" />
                <rect x="140" y="104" width="56" height="6" rx="3" fill={soft.beige2} />
                <rect x="140" y="116" width="44" height="6" rx="3" fill={soft.beige} />
            </g>
            {/* カラースウォッチ */}
            <g filter="url(#s6)">
                <rect x="30" y="120" width="18" height="26" rx="4" fill="#e26c5c" />
                <rect x="42" y="126" width="18" height="26" rx="4" fill="#2e7f92" />
                <rect x="54" y="132" width="18" height="26" rx="4" fill="#b07d1a" />
            </g>
            {/* ペン */}
            <g filter="url(#s6)" transform="rotate(40 205 60)">
                <rect x="198" y="24" width="12" height="58" rx="6" fill={soft.ink} opacity="0.6" />
                <path d="M198 82 L204 96 L210 82 Z" fill={soft.coral} />
            </g>
            <defs>
                <filter id="s6" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1f1a14" floodOpacity="0.09" />
                </filter>
            </defs>
        </svg>
    );
}

/* ── データ ── */

const services = [
    {
        en: "AI CONSULTING",
        title: "AI活用コンサルティング",
        body: <>「AIで業務を効率化したいが、何から始めればいいか分からない」という方へ。自社の制作現場でAIを日常的に使い倒しているからこそ、机上の空論ではない導入支援ができます。ツールの選定・活用研修から業務フローの<span className="nowrap">設計まで。</span></>,
        illo: IlloAi,
        wide: true,
    },
    {
        en: "WEB PRODUCTION",
        title: "HP・LP制作",
        body: <>「誰に、何を、どう届けるか」から設計するホームページ・ランディングページ。デザインの好みではなく、成果から逆算して作ります。<strong className="font-bold text-ink">HP・LPの制作のみのご依頼も歓迎です。</strong> これから作る方は、<a href="/preview" className="font-bold text-coral-deep underline underline-offset-4">無料プレビュー</a>で先にデザインをご覧いただけます。</>,
        illo: IlloWeb,
    },
    {
        en: "SEO / MEO",
        title: "SEO・MEO集客",
        body: <>検索結果とGoogleマップで「いま探している人」に見つけてもらう施策。上位表示のためではなく、問い合わせにつながる導線として<span className="nowrap">設計します。</span></>,
        illo: IlloSeo,
    },
    {
        en: "SNS MARKETING",
        title: "SNSマーケティング",
        body: <>Instagram・Xから、LINE公式アカウント（LINEマーケティング）の構築・運用まで。「何を投稿すればいいか分からない」を、計画ごと<span className="nowrap">引き受けます。</span></>,
        illo: IlloSns,
    },
    {
        en: "DESIGN",
        title: "デザイン制作",
        body: <>ロゴ・チラシ・パンフレット・バナーなどの販促デザインもワンストップで。Webと世界観を揃えた「ちゃんと伝わる」販促物を<span className="nowrap">作ります。</span></>,
        illo: IlloDesign,
    },
    {
        en: "OPERATION SUPPORT",
        title: <>HP運用ツール<span className="nowrap">『SiteChat』</span></>,
        body: <>公開中のホームページを、チャットで指示するだけで安全に修正できる自社開発ツール。AIが修正案を作り、あなたの承認なしに公開されることはありません。※現在はご希望のお客様にのみ<span className="nowrap">ご案内しています。</span></>,
        illo: IlloOps,
        wide: true,
    },
];

/* 多色セリフの見出し（service.pngの配色） */
const letterColors = ["#2e7f92", "#b8452f", "#b07d1a", "#1a1a1a"];

export function Service() {
    return (
        <section className="relative overflow-hidden bg-cream px-4 py-16 md:px-6 md:py-24">

            <div className="relative mx-auto max-w-7xl">
                <FadeIn>
                    {/* ラベル */}
                    <p className="mb-3 flex items-center gap-2.5 text-[13px] font-bold tracking-[0.3em] text-ink">
                        <span aria-hidden className="block h-2 w-2 rounded-full bg-coral" />
                        事業内容
                    </p>
                    {/* 多色セリフ */}
                    <p
                        aria-label="Service"
                        className="text-[clamp(3rem,7.5vw,5.5rem)] font-bold leading-none"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                        {"Service".split("").map((ch, i) => (
                            <span key={i} aria-hidden style={{ color: letterColors[i % letterColors.length] }}>
                                {ch}
                            </span>
                        ))}
                    </p>
                    <span aria-hidden className="mt-4 block h-0.5 w-10 bg-coral" />
                    <p className="lead mt-6 text-[15px] leading-[2] tracking-[0.05em] text-ink-sub md:mb-2">
                        AI活用を軸に、マーケティングから制作まで。
                        <br />
                        全部を売り込みません。課題に合わせて、必要な打ち手だけを<span className="nowrap">提案します。</span>
                    </p>
                </FadeIn>

                {/* サービスカード */}
                <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2">
                    {services.map((s, i) => {
                        return (
                            <FadeIn key={s.en} delay={i * 0.08} className={s.wide ? "md:col-span-2" : ""}>
                                <div
                                    className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[20px] bg-white p-8 shadow-[0_16px_40px_rgba(31,26,20,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(31,26,20,0.1)] lg:flex-row lg:items-center md:p-10"
                                >
                                    {/* テキスト */}
                                    <div className={s.wide ? "lg:w-[60%]" : "lg:w-[55%]"}>
                                        <p className="mb-4 text-xs font-bold tracking-[0.25em] text-coral-deep">{s.en}</p>
                                        <h3 className="mb-4 flex flex-wrap items-center gap-3 text-2xl font-bold leading-snug text-ink md:text-[28px]">
                                            {s.title}
                                        </h3>
                                        <span aria-hidden className="mb-5 block h-0.5 w-8 bg-coral" />
                                        <p className="text-sm leading-[2] text-ink-sub">{s.body}</p>
                                    </div>
                                    {/* イラスト */}
                                    <div
                                        aria-hidden
                                        className={`pointer-events-none h-40 shrink-0 transition-transform duration-300 group-hover:scale-[1.04] lg:h-44 ${
                                            s.wide ? "lg:w-[40%]" : "lg:w-[45%]"
                                        }`}
                                    >
                                        <s.illo />
                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

