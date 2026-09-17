// Server Components — 無料プレビューのページで使う「架空のサイト画面」と端末の枠・挿絵
// preview-design/ の参考画像（まちのパン屋さん・住まいの工房・まちの喫茶室・音楽の教室）をコードで組んで鮮明に出す。
// 文字の大きさは cqw（親の幅に対する%）で決めているので、枠の幅が変わっても比率が保たれる。

import React from "react";
import Image, { type StaticImageData } from "next/image";
import { mincho, heavy } from "@/lib/fonts-v4";

import bakery from "@/images/preview/bakery.webp";
import bakerySp from "@/images/preview/bakery-sp.webp";
import house from "@/images/preview/house.webp";
import houseSp from "@/images/preview/house-sp.webp";
import cafe from "@/images/preview/cafe.webp";
import cafeSp from "@/images/preview/cafe-sp.webp";
import music from "@/images/preview/music.webp";
import musicSp from "@/images/preview/music-sp.webp";

export type MockSite = {
    name: string;
    nav: string[];
    navButton: string;
    accent: string;
    heading: string[];
    sub: string[];
    cta: string;
    photo: StaticImageData;
    photoSp: StaticImageData;
    news?: { label: string; rows: [string, string][]; more: string };
    script?: string;
};

export const SITES = {
    bakery: {
        name: "まちのパン屋さん", nav: ["HOME", "ABOUT", "MENU", "NEWS", "ACCESS"], navButton: "問い合わせ", accent: "#D9562E",
        heading: ["毎日に、", "焼きたての", "しあわせ。"], sub: ["地域の素材でつくる、", "やさしくて、あたたかいパン。", "今日も、みなさまの食卓に。"], cta: "パンのメニューを見る",
        photo: bakery, photoSp: bakerySp, script: "Good Bread\nGood Days.",
        news: { label: "お知らせ", rows: [["2024.10.24", "季節限定「くるみとレーズンのカンパーニュ」を販売開始"], ["2024.10.10", "11月の営業日カレンダーを公開しました"]], more: "お知らせ一覧 →" },
    },
    company: { name: "住まいの工房", nav: ["ホーム", "私たちの想い", "施工事例", "よくあるご質問"], navButton: "お問い合わせ", accent: "#8A7A5E", heading: ["暮らしに、", "心地よい場所を。"], sub: ["家族のこれからに、", "寄り添う住まいをつくります。"], cta: "私たちの想いを見る", photo: house, photoSp: houseSp },
    cafe: { name: "まちの喫茶室", nav: ["ホーム", "メニュー", "お知らせ", "私たちについて"], navButton: "お問い合わせ", accent: "#B86A4A", heading: ["日々に、", "ひと息の時間を。"], sub: ["やさしいコーヒーで、", "いつもの日常を、ちょっと特別に。"], cta: "メニューを見る", photo: cafe, photoSp: cafeSp },
    music: { name: "音楽の教室", nav: ["ホーム", "レッスン", "講師紹介", "教室について"], navButton: "お問い合わせ", accent: "#3E8FA3", heading: ["音楽を、", "もっと身近に。"], sub: ["ひとりひとりのペースで、", "音楽のある毎日を。"], cta: "レッスンを見る", photo: music, photoSp: musicSp },
} satisfies Record<string, MockSite>;

const cq = { containerType: "inline-size" } as React.CSSProperties;
const INK = "#1F2A44";

/** 架空サイトの画面（pc: 横長 / sp: 縦長） */
export function MiniSite({ site, variant = "pc" }: { site: MockSite; variant?: "pc" | "sp" }) {
    const pc = variant === "pc";
    const hasNews = pc && !!site.news;
    const headerH = pc ? "9cqw" : "13cqw";
    const heroH = pc ? (hasNews ? "70cqw" : "53.5cqw") : "150cqw";
    return (
        <div style={cq} className="w-full">
            <div className="relative overflow-hidden bg-white" style={{ aspectRatio: pc ? (hasNews ? "16 / 10" : "16 / 10") : "9 / 19.5", color: INK }}>
                {/* ヘッダー */}
                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-white" style={{ height: headerH, padding: pc ? "0 3.5cqw" : "0 5cqw" }}>
                    <span className={`${mincho.className} flex items-center font-bold`} style={{ fontSize: pc ? "2.4cqw" : "4.4cqw", gap: "1cqw", color: site.accent }}>
                        <span aria-hidden style={{ fontSize: pc ? "2.2cqw" : "4cqw" }}>❦</span>
                        {site.name}
                    </span>
                    {pc ? (
                        <span className="flex items-center" style={{ gap: "2.6cqw", fontSize: "1.25cqw", letterSpacing: "0.06em" }}>
                            {site.nav.map((n) => <span key={n}>{n}</span>)}
                            <span className="rounded-full text-white" style={{ backgroundColor: site.accent, padding: "0.9cqw 2.2cqw", fontSize: "1.2cqw" }}>{site.navButton}</span>
                        </span>
                    ) : (
                        <span className="flex flex-col" style={{ gap: "1.3cqw" }}>
                            {[0, 1, 2].map((i) => <span key={i} className="block" style={{ width: "5.5cqw", height: "0.7cqw", backgroundColor: INK }} />)}
                        </span>
                    )}
                </div>
                {/* メイン画像と見出し */}
                <div className="absolute inset-x-0" style={{ top: headerH, height: heroH }}>
                    <Image src={pc ? site.photo : site.photoSp} alt="" fill sizes={pc ? "(max-width: 768px) 90vw, 40vw" : "(max-width: 768px) 30vw, 14vw"} className="object-cover" />
                    <div className="absolute inset-0" style={{ background: pc ? "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 34%, rgba(255,255,255,0) 60%)" : "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0) 68%)" }} />
                    {site.script && pc && (
                        <p className="absolute italic" style={{ right: "4cqw", top: "5cqw", fontSize: "1.7cqw", color: "rgba(255,255,255,0.95)", fontFamily: "Georgia, serif", textAlign: "right", whiteSpace: "pre-line", lineHeight: 1.4, textShadow: "0 1px 6px rgba(0,0,0,0.25)" }}>{site.script}</p>
                    )}
                    <div className="absolute" style={{ left: pc ? "4cqw" : "6cqw", top: pc ? "8cqw" : "10cqw", right: pc ? "44cqw" : "6cqw" }}>
                        <p className={`${mincho.className} font-bold`} style={{ fontSize: pc ? "4.2cqw" : "7cqw", lineHeight: 1.4 }}>
                            {site.heading.map((l) => <span key={l} className="block">{l}</span>)}
                        </p>
                        <p style={{ fontSize: pc ? "1.55cqw" : "2.9cqw", lineHeight: 1.85, marginTop: pc ? "2cqw" : "3cqw", color: "#3B4457" }}>
                            {site.sub.map((l) => <span key={l} className="block">{l}</span>)}
                        </p>
                        {site.news ? (
                            <span className="inline-flex items-center rounded-full text-white" style={{ backgroundColor: site.accent, fontSize: pc ? "1.5cqw" : "2.8cqw", padding: pc ? "1.1cqw 2.8cqw" : "2cqw 4.5cqw", marginTop: pc ? "2.6cqw" : "4cqw", gap: "1cqw" }}>
                                {site.cta} <span aria-hidden>→</span>
                            </span>
                        ) : (
                            <span className="inline-flex items-center" style={{ fontSize: pc ? "1.5cqw" : "2.8cqw", marginTop: pc ? "2.6cqw" : "4cqw", gap: "1.2cqw", color: site.accent }}>
                                <span className="block" style={{ width: pc ? "4cqw" : "6cqw", height: "1px", backgroundColor: site.accent }} />
                                {site.cta} <span aria-hidden>→</span>
                            </span>
                        )}
                    </div>
                </div>
                {/* お知らせ（パン屋のPCのみ） */}
                {hasNews && site.news && (
                    <div className="absolute inset-x-0 bottom-0 bg-white" style={{ height: "21cqw", padding: "2cqw 3.5cqw" }}>
                        <div className="flex items-baseline justify-between" style={{ borderBottom: "1px solid rgba(31,42,68,0.15)", paddingBottom: "0.8cqw" }}>
                            <p className={`${heavy.className}`} style={{ fontSize: "1.9cqw" }}>{site.news.label}</p>
                        </div>
                        <div className="flex" style={{ gap: "3cqw", marginTop: "1.2cqw" }}>
                            <div className="flex-1">
                                {site.news.rows.map(([d, t]) => (
                                    <p key={t} className="flex" style={{ fontSize: "1.2cqw", gap: "2.4cqw", lineHeight: 2.1, color: "#3B4457" }}>
                                        <span style={{ color: "#8A93A6" }}>{d}</span><span>{t}</span>
                                    </p>
                                ))}
                                <p style={{ fontSize: "1.2cqw", textAlign: "right", marginTop: "0.4cqw" }}>{site.news.more}</p>
                            </div>
                            <span className="relative block overflow-hidden rounded-[0.6cqw]" style={{ width: "24cqw", height: "12cqw" }}>
                                <Image src={site.photoSp} alt="" fill sizes="12vw" className="object-cover" />
                            </span>
                        </div>
                    </div>
                )}
                {/* スマホ：見出しの下に小さな画像 */}
                {!pc && (
                    <div className="absolute inset-x-0 bottom-0 bg-white" style={{ height: "32cqw", padding: "4cqw 6cqw" }}>
                        <p className={`${mincho.className} font-bold`} style={{ fontSize: "3.4cqw" }}>{site.news?.label ?? "お知らせ"}</p>
                        <div className="flex" style={{ gap: "3cqw", marginTop: "2cqw" }}>
                            {[0, 1].map((i) => <span key={i} className="block rounded-[1cqw]" style={{ width: "40cqw", height: "16cqw", backgroundColor: "#EFEBE4" }} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/** ノートPCの枠（銀色の本体・黒い縁） */
export function Laptop({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={className} style={cq}>
            <div className="rounded-t-[2cqw] rounded-b-[0.8cqw] bg-[#2B2F38] p-[1.1cqw] pb-[1.3cqw] shadow-[0_30px_70px_rgba(20,51,90,0.22)]">
                <div className="overflow-hidden rounded-[0.6cqw] bg-white">{children}</div>
            </div>
            <div className="relative mx-[-4cqw] h-[2.6cqw] rounded-b-[1.6cqw]" style={{ background: "linear-gradient(180deg,#E6E9EE 0%,#C9CED6 100%)" }}>
                <span className="absolute left-1/2 top-0 h-[0.9cqw] w-[16cqw] -translate-x-1/2 rounded-b-[0.8cqw] bg-[#B4BAC4]" />
            </div>
        </div>
    );
}

/** スマートフォンの枠 */
export function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={className} style={cq}>
            <div className="relative rounded-[10cqw] bg-[#2A2F3A] p-[3cqw] shadow-[0_22px_50px_rgba(20,51,90,0.25)]">
                <div className="absolute left-1/2 top-[3cqw] z-20 h-[5cqw] w-[36cqw] -translate-x-1/2 rounded-b-[2.4cqw] bg-[#2A2F3A]" />
                <div className="overflow-hidden rounded-[7cqw] bg-white">{children}</div>
            </div>
        </div>
    );
}

/** ブラウザ風の枠（上に3つの点） */
export function Browser({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`overflow-hidden rounded-[10px] border bg-white shadow-[0_12px_32px_rgba(20,51,90,0.10)] ${className}`} style={{ borderColor: "rgba(20,51,90,0.1)" }}>
            <div className="flex items-center gap-1.5 border-b bg-[#F5F6F8] px-3 py-2" style={{ borderColor: "rgba(20,51,90,0.08)" }}>
                <span className="h-2 w-2 rounded-full bg-[#F26D5B]" /><span className="h-2 w-2 rounded-full bg-[#F2B84B]" /><span className="h-2 w-2 rounded-full bg-[#6CC088]" />
            </div>
            {children}
        </div>
    );
}

/* ── 3ステップの挿絵（線画） ── */
const NAVY = "#1F2A44";
const TEAL = "#2C8FA8";
const CORAL = "#E8503A";
const PALE = "#CFE2E8";

export function StepIllustLine({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 240 170" className={className} aria-hidden>
            <rect x="24" y="8" width="92" height="154" rx="14" fill="#fff" stroke={NAVY} strokeWidth="3" />
            <rect x="54" y="14" width="32" height="6" rx="3" fill={NAVY} />
            <circle cx="70" cy="86" r="30" fill="#06C755" />
            <text x="70" y="92" textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff" fontFamily="Arial, sans-serif">LINE</text>
            <path d="M132 58 h84 a8 8 0 0 1 8 8 v58 a8 8 0 0 1 -8 8 h-60 l-14 14 v-14 h-10 a8 8 0 0 1 -8 -8 v-58 a8 8 0 0 1 8 -8 z" fill="#fff" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" />
            <path d="M146 82 l5 5 l9 -10" fill="none" stroke={CORAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M146 106 l5 5 l9 -10" fill="none" stroke={CORAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="170" y1="80" x2="208" y2="80" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
            <line x1="170" y1="104" x2="208" y2="104" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}

export function StepIllustDesign({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 240 170" className={className} aria-hidden>
            <rect x="14" y="10" width="170" height="118" rx="10" fill="#fff" stroke={NAVY} strokeWidth="3" />
            <circle cx="30" cy="26" r="4" fill={CORAL} /><circle cx="44" cy="26" r="4" fill={CORAL} /><circle cx="58" cy="26" r="4" fill={CORAL} />
            <line x1="14" y1="40" x2="184" y2="40" stroke={NAVY} strokeWidth="2" />
            <rect x="28" y="52" width="66" height="44" rx="4" fill={PALE} />
            <rect x="104" y="54" width="64" height="8" rx="4" fill={PALE} />
            <rect x="104" y="70" width="52" height="8" rx="4" fill={PALE} />
            <rect x="28" y="106" width="140" height="8" rx="4" fill={PALE} />
            <line x1="99" y1="128" x2="99" y2="146" stroke={NAVY} strokeWidth="3" />
            <line x1="70" y1="148" x2="128" y2="148" stroke={NAVY} strokeWidth="3" strokeLinecap="round" />
            <rect x="168" y="56" width="58" height="104" rx="10" fill="#fff" stroke={NAVY} strokeWidth="3" />
            <rect x="186" y="62" width="22" height="5" rx="2.5" fill={NAVY} />
            <rect x="178" y="76" width="38" height="22" rx="3" fill={PALE} />
            <rect x="178" y="106" width="38" height="12" rx="3" fill={CORAL} />
            <rect x="178" y="126" width="38" height="8" rx="3" fill={PALE} />
            <rect x="178" y="140" width="26" height="8" rx="3" fill={PALE} />
        </svg>
    );
}

export function StepIllustDecide({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 240 170" className={className} aria-hidden>
            <path d="M64 12 h84 l32 32 v114 h-116 z" fill="#fff" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" />
            <path d="M148 12 v32 h32" fill="none" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" />
            <rect x="82" y="48" width="58" height="30" rx="4" fill={PALE} />
            <rect x="82" y="90" width="80" height="7" rx="3.5" fill={PALE} />
            <rect x="82" y="106" width="64" height="7" rx="3.5" fill={PALE} />
            <rect x="82" y="122" width="72" height="7" rx="3.5" fill={PALE} />
            <circle cx="168" cy="130" r="24" fill="#fff" stroke={CORAL} strokeWidth="3" />
            <path d="M156 130 l8 8 l16 -18" fill="none" stroke={CORAL} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/** 最終CTAの四隅の弧 */
export function CornerArcs() {
    return (
        <>
            <svg aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px]" viewBox="0 0 320 320" fill="none">
                <circle cx="220" cy="100" r="150" stroke={CORAL} strokeWidth="1.5" /><circle cx="250" cy="70" r="150" stroke={TEAL} strokeWidth="1.5" />
            </svg>
            <svg aria-hidden className="pointer-events-none absolute -bottom-32 -left-28 h-[320px] w-[320px]" viewBox="0 0 320 320" fill="none">
                <circle cx="100" cy="220" r="150" stroke={CORAL} strokeWidth="1.5" /><circle cx="70" cy="250" r="150" stroke={TEAL} strokeWidth="1.5" />
            </svg>
        </>
    );
}

/** FVの背景の青緑のかたち */
export function Blob({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 600 500" className={className} aria-hidden>
            <path d="M120 120 C 200 20, 420 10, 520 90 C 600 160, 590 300, 520 380 C 450 460, 260 480, 160 420 C 60 360, 40 220, 120 120 Z" fill="#DDEFF2" />
        </svg>
    );
}
