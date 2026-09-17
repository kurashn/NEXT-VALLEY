// Server Component — 集客改善の挿絵3点（grouthdesign-v2.png の線画を同じ様式で描き直したもの）

import React from "react";
import { heavy } from "@/lib/fonts-v4";

const NAVY = "#1E3A5F";
const CORAL = "#E8503A";
const TEAL = "#2C8FA8";
const GOLD = "#E8A83A";
const SKY = "#DCE7F1";
const SKY2 = "#C9D8E6";
const GRAY = "#D9DEE5";
const GREEN = "#CDEBD9";

function Spark({ x, y, color = CORAL }: { x: number; y: number; color?: string }) {
    return (
        <g stroke={color} strokeWidth="4" strokeLinecap="round" transform={`translate(${x} ${y})`}>
            <line x1="0" y1="0" x2="12" y2="-16" />
            <line x1="10" y1="12" x2="28" y2="6" />
        </g>
    );
}

/** 01 ホームページ：ブラウザ画面と「お問い合わせ」ボタン */
export function GrowthHp({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 320 210" className={className} aria-hidden>
            <rect x="12" y="14" width="250" height="176" rx="14" fill="#fff" stroke={NAVY} strokeWidth="3" />
            <rect x="12" y="14" width="250" height="34" rx="14" fill={SKY} />
            <rect x="12" y="34" width="250" height="14" fill={SKY} />
            <line x1="12" y1="48" x2="262" y2="48" stroke={NAVY} strokeWidth="2" />
            <circle cx="32" cy="31" r="5" fill={CORAL} />
            <circle cx="48" cy="31" r="5" fill={GOLD} />
            <circle cx="64" cy="31" r="5" fill="#7CC29A" />
            <rect x="30" y="66" width="86" height="60" rx="6" fill={SKY} />
            <path d="M40 116 L62 88 L76 104 L88 94 L108 116 Z" fill={SKY2} />
            <circle cx="92" cy="80" r="6" fill="#fff" />
            <rect x="130" y="68" width="110" height="9" rx="4.5" fill={GRAY} />
            <rect x="130" y="86" width="96" height="9" rx="4.5" fill={GRAY} />
            <rect x="130" y="104" width="104" height="9" rx="4.5" fill={GRAY} />
            <rect x="30" y="144" width="86" height="9" rx="4.5" fill={GRAY} />
            <rect x="30" y="162" width="70" height="9" rx="4.5" fill={GRAY} />
            <rect x="134" y="138" width="108" height="36" rx="18" fill={CORAL} />
            <text x="188" y="162" textAnchor="middle" fontSize="15" fill="#fff" className={heavy.className}>お問い合わせ</text>
            <path transform="translate(236 156) scale(1.35)" d="M0 0 L0 22 L6 17 L10 26 L14 24 L10 15 L17 15 Z" fill="#fff" stroke={NAVY} strokeWidth="2.2" strokeLinejoin="round" />
            <Spark x={284} y={124} />
        </svg>
    );
}

/** 02 Googleマップ：地図のピンと店舗カード */
export function GrowthMap({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 320 210" className={className} aria-hidden>
            <rect x="10" y="20" width="150" height="150" rx="12" fill={SKY} />
            <g stroke="#fff" strokeWidth="9" strokeLinecap="round" fill="none">
                <path d="M10 60 L160 40" />
                <path d="M30 20 L70 170" />
                <path d="M10 130 L160 110" />
                <path d="M110 20 L130 170" />
            </g>
            <path d="M62 60 C42 60 30 74 30 92 C30 112 62 138 62 138 C62 138 94 112 94 92 C94 74 82 60 62 60 Z" fill={CORAL} />
            <circle cx="62" cy="90" r="11" fill="#fff" />
            <rect x="120" y="44" width="188" height="126" rx="12" fill="#fff" stroke={NAVY} strokeWidth="3" />
            {/* 店舗 */}
            <path d="M140 92 L150 74 L206 74 L216 92 Z" fill="#fff" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M140 92 Q149 104 158 92 Z" fill={CORAL} />
            <path d="M158 92 Q167 104 176 92 Z" fill="#fff" stroke={NAVY} strokeWidth="2" />
            <path d="M176 92 Q185 104 194 92 Z" fill={CORAL} />
            <path d="M194 92 Q205 104 216 92 Z" fill="#fff" stroke={NAVY} strokeWidth="2" />
            <rect x="150" y="76" width="14" height="16" fill={CORAL} />
            <rect x="178" y="76" width="14" height="16" fill={CORAL} />
            <rect x="146" y="100" width="64" height="40" fill={SKY} stroke={NAVY} strokeWidth="2.5" />
            <rect x="156" y="112" width="16" height="28" fill={TEAL} />
            <rect x="182" y="112" width="18" height="14" fill="#fff" stroke={NAVY} strokeWidth="2" />
            {/* 情報行 */}
            <rect x="226" y="80" width="66" height="8" rx="4" fill={GRAY} />
            <rect x="226" y="96" width="54" height="8" rx="4" fill={GRAY} />
            <rect x="226" y="112" width="62" height="8" rx="4" fill={GRAY} />
            <g fill={GOLD}>
                {[0, 1, 2, 3].map((i) => (
                    <path key={i} transform={`translate(${228 + i * 17} 134) scale(0.7)`} d="M10 0 L12.9 6.6 L20 7.3 L14.6 12 L16.2 19 L10 15.4 L3.8 19 L5.4 12 L0 7.3 L7.1 6.6 Z" />
                ))}
            </g>
            <rect x="146" y="152" width="146" height="7" rx="3.5" fill={GRAY} />
        </svg>
    );
}

/** 03 LINE：スマホの画面と会話 */
export function GrowthLine({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 320 210" className={className} aria-hidden>
            <rect x="96" y="6" width="130" height="220" rx="22" fill="#fff" stroke={NAVY} strokeWidth="3.5" />
            <rect x="140" y="14" width="42" height="9" rx="4.5" fill={NAVY} />
            <rect x="52" y="52" width="176" height="52" rx="12" fill="#fff" stroke={NAVY} strokeWidth="2" />
            <text x="66" y="74" fontSize="13" fill={NAVY} className={heavy.className}>はじめまして。</text>
            <text x="66" y="94" fontSize="13" fill={NAVY} className={heavy.className}>予約をしたいのですが…</text>
            <rect x="122" y="122" width="192" height="52" rx="12" fill={GREEN} />
            <text x="136" y="144" fontSize="13" fill={NAVY} className={heavy.className}>かしこまりました。</text>
            <text x="136" y="164" fontSize="13" fill={NAVY} className={heavy.className}>ご希望をお伺いします。</text>
            <Spark x={244} y={44} />
        </svg>
    );
}
