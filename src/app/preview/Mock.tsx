// Server Components — 無料プレビューのページで使う「架空のサイト画面」と端末の枠
// 参考画像（previewpage-design.png）のパン屋・工務店・カフェ・音楽教室の画面を、コードで組んで鮮明に出す。
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
    heading: string[];
    sub: string[];
    cta: string;
    news: string;
    photo: StaticImageData;
    photoSp: StaticImageData;
    latin?: boolean;
};

export const SITES = {
    bakery: { name: "やさしいパン屋", nav: ["HOME", "ABOUT", "MENU", "NEWS", "CONTACT"], heading: ["毎日に、", "やさしいおいしさを。"], sub: ["地元の小さなパン屋です。", "焼きたてのパンを、日々の暮らしに。"], cta: "商品を見る", news: "お知らせ", photo: bakery, photoSp: bakerySp },
    company: { name: "まこと工務店", nav: ["ホーム", "私たちの想い", "施工事例", "会社概要", "お問い合わせ"], heading: ["心地よい暮らしを、", "つくる、地元の工務店。"], sub: ["家族のこれからを見つめて、", "ずっと寄り添います。"], cta: "施工事例を見る", news: "お知らせ", photo: house, photoSp: houseSp },
    cafe: { name: "BROWN CAFE", nav: ["HOME", "MENU", "NEWS", "CONTACT"], heading: ["コーヒーで、", "やさしい時間を。"], sub: ["こだわりの一杯と、", "くつろげる空間を。"], cta: "メニューを見る", news: "NEWS", photo: cafe, photoSp: cafeSp, latin: true },
    music: { name: "つばさ音楽教室", nav: ["ホーム", "コース", "講師紹介", "教室案内", "お問い合わせ"], heading: ["音楽で、", "子どもの未来を豊かに。"], sub: ["一人ひとりのペースに寄り添う", "やさしいレッスン。"], cta: "体験レッスンについて", news: "お知らせ", photo: music, photoSp: musicSp },
} satisfies Record<string, MockSite>;

const cq = { containerType: "inline-size" } as React.CSSProperties;

/** 架空サイトの画面（pc: 横長 / sp: 縦長） */
export function MiniSite({ site, variant = "pc" }: { site: MockSite; variant?: "pc" | "sp" }) {
    const pc = variant === "pc";
    return (
        <div style={cq} className="w-full">
            <div className="relative overflow-hidden bg-white text-[#2A2A2A]" style={{ aspectRatio: pc ? "16 / 10" : "9 / 19" }}>
                {/* ヘッダー */}
                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-white/95" style={{ height: pc ? "9cqw" : "12cqw", padding: pc ? "0 4cqw" : "0 5cqw" }}>
                    <span className={`${site.latin ? heavy.className : mincho.className} font-bold tracking-wide`} style={{ fontSize: pc ? "2.6cqw" : "4.6cqw" }}>{site.name}</span>
                    {pc ? (
                        <span className="flex" style={{ gap: "3cqw", fontSize: "1.4cqw", letterSpacing: "0.08em" }}>
                            {site.nav.map((n) => <span key={n}>{n}</span>)}
                        </span>
                    ) : (
                        <span className="flex flex-col" style={{ gap: "1.2cqw" }}>
                            {[0, 1, 2].map((i) => <span key={i} className="block bg-[#2A2A2A]" style={{ width: "5cqw", height: "0.6cqw" }} />)}
                        </span>
                    )}
                </div>
                {/* メイン画像 */}
                <div className="absolute inset-x-0" style={{ top: pc ? "9cqw" : "12cqw", height: pc ? "76cqw" : "118cqw" }}>
                    <Image src={pc ? site.photo : site.photoSp} alt="" fill sizes={pc ? "(max-width: 768px) 90vw, 40vw" : "(max-width: 768px) 30vw, 14vw"} className="object-cover" />
                    <div className="absolute inset-0" style={{ background: pc ? "linear-gradient(90deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.7) 38%, rgba(255,255,255,0) 62%)" : "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0) 75%)" }} />
                    <div className="absolute" style={{ left: pc ? "5cqw" : "6cqw", top: pc ? "12cqw" : "8cqw", right: pc ? "42cqw" : "6cqw" }}>
                        <p className={`${mincho.className} font-bold leading-[1.45]`} style={{ fontSize: pc ? "4.2cqw" : "6.4cqw" }}>
                            {site.heading.map((l) => <span key={l} className="block">{l}</span>)}
                        </p>
                        <p className="leading-[1.8]" style={{ fontSize: pc ? "1.6cqw" : "2.9cqw", marginTop: pc ? "2.4cqw" : "3cqw", color: "#4A4A4A" }}>
                            {site.sub.map((l) => <span key={l} className="block">{l}</span>)}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-[#B08B5B] text-white" style={{ fontSize: pc ? "1.5cqw" : "2.8cqw", padding: pc ? "1.2cqw 3cqw" : "2cqw 5cqw", marginTop: pc ? "3cqw" : "4cqw", gap: "1cqw" }}>
                            {site.cta} <span aria-hidden>→</span>
                        </span>
                    </div>
                </div>
                {/* お知らせ */}
                <div className="absolute inset-x-0 bottom-0 bg-white" style={{ height: pc ? "15cqw" : "60cqw", padding: pc ? "2.5cqw 4cqw" : "5cqw 6cqw" }}>
                    <p className={`${mincho.className} font-bold`} style={{ fontSize: pc ? "2cqw" : "3.6cqw" }}>{site.news}</p>
                    <div className="mt-[1cqw] flex" style={{ gap: "2cqw" }}>
                        {[0, 1, 2].map((i) => (
                            <span key={i} className="block rounded-[0.6cqw] bg-[#EEE9E2]" style={{ width: pc ? "16cqw" : "26cqw", height: pc ? "7cqw" : "16cqw" }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/** ノートPCの枠 */
export function Laptop({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={className} style={cq}>
            <div className="rounded-[1.6cqw] bg-[#1B1F27] p-[1.2cqw] pb-[1.6cqw] shadow-[0_24px_60px_rgba(20,51,90,0.18)]">
                <div className="overflow-hidden rounded-[0.6cqw] bg-white">{children}</div>
            </div>
            <div className="mx-[-2cqw] h-[1.8cqw] rounded-b-[1.2cqw] bg-[#D5D9DF]" />
            <div className="mx-auto h-[0.5cqw] w-[24cqw] rounded-b-[0.6cqw] bg-[#B8BEC7]" />
        </div>
    );
}

/** スマートフォンの枠 */
export function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={className} style={cq}>
            <div className="relative rounded-[9cqw] bg-[#1B1F27] p-[3cqw] shadow-[0_18px_44px_rgba(20,51,90,0.22)]">
                <div className="absolute left-1/2 top-[3cqw] z-20 h-[5cqw] w-[36cqw] -translate-x-1/2 rounded-b-[2.4cqw] bg-[#1B1F27]" />
                <div className="overflow-hidden rounded-[6.5cqw] bg-white">{children}</div>
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

/** 葉の線画（最終CTAの飾り） */
export function Leaf({ className = "", flip = false }: { className?: string; flip?: boolean }) {
    return (
        <svg viewBox="0 0 120 160" className={className} aria-hidden style={flip ? { transform: "scaleX(-1)" } : undefined} fill="none" stroke="#7FB0BE" strokeWidth="1.6" strokeLinecap="round">
            <path d="M60 156 C 58 110, 50 70, 30 30" />
            <path d="M44 100 C 30 92, 16 96, 8 112 C 22 116, 36 112, 44 100 Z" />
            <path d="M50 76 C 34 62, 20 62, 10 74 C 24 82, 40 82, 50 76 Z" />
            <path d="M56 120 C 70 108, 86 110, 96 124 C 82 130, 66 128, 56 120 Z" />
            <path d="M54 96 C 66 82, 82 80, 94 90 C 82 100, 66 102, 54 96 Z" />
            <path d="M36 44 C 28 30, 30 16, 40 6 C 48 18, 46 34, 36 44 Z" />
        </svg>
    );
}
