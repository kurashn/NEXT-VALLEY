// Server Component — 「つくる」の挿絵（02・03の線画と同じ様式：青緑の線＋薄い青緑の面＋コーラルの点）

import React from "react";

const TEAL = "#2C8FA8";
const TEAL_LIGHT = "#CDE7EC";
const TEAL_LINE = "#9FD0DA";
const CORAL = "#E8503A";
const CORAL_LIGHT = "#F9D3CC";

export function SupportIllust01({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 240 150" className={className} aria-hidden>
            {/* パソコンの画面 */}
            <rect x="10" y="12" width="170" height="112" rx="10" fill="#fff" stroke={TEAL} strokeWidth="3" />
            <line x1="10" y1="34" x2="180" y2="34" stroke={TEAL} strokeWidth="2" />
            <circle cx="24" cy="23" r="3.5" fill={CORAL} />
            <circle cx="36" cy="23" r="3.5" fill={CORAL} />
            <circle cx="48" cy="23" r="3.5" fill={CORAL} />
            <line x1="120" y1="23" x2="168" y2="23" stroke={TEAL_LINE} strokeWidth="3" strokeLinecap="round" />
            {/* 画面の中：メイン画像と文章 */}
            <rect x="24" y="46" width="78" height="50" rx="5" fill={TEAL_LIGHT} />
            <path d="M32 90 L50 68 L62 82 L72 72 L94 90 Z" fill={TEAL} opacity="0.85" />
            <circle cx="84" cy="58" r="5" fill="#fff" />
            <line x1="112" y1="52" x2="166" y2="52" stroke={TEAL} strokeWidth="4" strokeLinecap="round" />
            <line x1="112" y1="66" x2="156" y2="66" stroke={TEAL_LINE} strokeWidth="3" strokeLinecap="round" />
            <line x1="112" y1="78" x2="162" y2="78" stroke={TEAL_LINE} strokeWidth="3" strokeLinecap="round" />
            <line x1="112" y1="90" x2="148" y2="90" stroke={TEAL_LINE} strokeWidth="3" strokeLinecap="round" />
            <rect x="24" y="106" width="52" height="10" rx="5" fill={CORAL} />
            {/* スタンド */}
            <line x1="95" y1="124" x2="95" y2="136" stroke={TEAL} strokeWidth="3" />
            <line x1="70" y1="138" x2="120" y2="138" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
            {/* スマートフォン */}
            <rect x="176" y="44" width="52" height="98" rx="10" fill="#fff" stroke={TEAL} strokeWidth="3" />
            <line x1="192" y1="52" x2="212" y2="52" stroke={TEAL_LINE} strokeWidth="3" strokeLinecap="round" />
            <rect x="184" y="62" width="36" height="28" rx="4" fill={TEAL_LIGHT} />
            <path d="M188 88 L198 76 L204 82 L210 78 L218 88 Z" fill={TEAL} opacity="0.85" />
            <line x1="184" y1="100" x2="220" y2="100" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
            <line x1="184" y1="110" x2="212" y2="110" stroke={TEAL_LINE} strokeWidth="3" strokeLinecap="round" />
            <rect x="184" y="120" width="36" height="9" rx="4.5" fill={CORAL_LIGHT} />
            <circle cx="202" cy="136" r="2.5" fill={TEAL} />
        </svg>
    );
}
