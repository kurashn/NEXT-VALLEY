"use client";

import React, { useEffect, useRef, useState } from "react";

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

/**
 * エントランスの動き（design.md: フェード＋ライズ1種類のみ）。
 * prefers-reduced-motion 時は即時表示する。
 */
export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            setVisible(true);
            return;
        }
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);

        // フォールバック: 視界に入らなくても一定時間後には必ず表示する
        // （スクリーンショット・低速環境・Observer不発時に真っ白を防ぐ）
        const timer = window.setTimeout(() => setVisible(true), 1200);

        return () => {
            observer.disconnect();
            window.clearTimeout(timer);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
            } ${className}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            {children}
        </div>
    );
}
