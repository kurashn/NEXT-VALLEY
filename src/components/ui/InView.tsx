"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * 視界に入ったら .is-inview を付ける薄いラッパー。
 * 実際の動きは CSS 側（.sh-* など）が担当する。
 * FadeIn と同じ安全策: reduced-motion は即時表示、Observer 不発時もタイマーで必ず表示。
 */
export function InView({
    children,
    className = "",
    threshold = 0.3,
}: {
    children: React.ReactNode;
    className?: string;
    threshold?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [inview, setInview] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setInview(true);
            return;
        }
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInview(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(el);
        const timer = window.setTimeout(() => setInview(true), 1500);
        return () => {
            observer.disconnect();
            window.clearTimeout(timer);
        };
    }, [threshold]);

    return (
        <div ref={ref} className={`${inview ? "is-inview " : ""}${className}`}>
            {children}
        </div>
    );
}
