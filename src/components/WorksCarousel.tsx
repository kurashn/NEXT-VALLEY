"use client";

// 制作実績の横スクロールスライダー（scroll-snap・矢印・ドット。スマホはスワイプ）

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type WorkItem = { name: string; label: string; image: StaticImageData };

export function WorksCarousel({ items }: { items: WorkItem[] }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const [perView, setPerView] = useState(4);

    // 表示枚数（幅から算出）
    useEffect(() => {
        const calc = () => {
            const w = window.innerWidth;
            setPerView(w < 640 ? 1 : w < 1024 ? 2 : 4);
        };
        calc();
        window.addEventListener("resize", calc, { passive: true });
        return () => window.removeEventListener("resize", calc);
    }, []);

    const pages = Math.max(1, Math.ceil(items.length / perView));

    // スクロール位置 → ページ番号
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const onScroll = () => {
            const page = Math.round(el.scrollLeft / el.clientWidth);
            setIndex(Math.min(pages - 1, Math.max(0, page)));
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [pages]);

    const go = useCallback(
        (page: number) => {
            const el = trackRef.current;
            if (!el) return;
            const clamped = Math.min(pages - 1, Math.max(0, page));
            el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
            setIndex(clamped);
        },
        [pages]
    );

    return (
        <div className="relative">
            {/* トラック */}
            <div
                ref={trackRef}
                className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 md:-mx-0 md:px-0"
                style={{ scrollbarWidth: "none" }}
                aria-label="制作実績一覧"
            >
                {items.map((work) => (
                    <div
                        key={work.name}
                        className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
                    >
                        <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(31,26,20,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(31,26,20,0.08)]">
                            <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: "995 / 580" }}>
                                <Image
                                    src={work.image}
                                    alt={`${work.name}のホームページ`}
                                    fill
                                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                                    placeholder="blur"
                                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                            <div className="p-3">
                                <p className="mb-1 text-[11px] text-ink-sub">{work.label}</p>
                                <p className="text-[13px] font-bold leading-snug text-ink">{work.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* コントロール */}
            <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex items-center" role="tablist" aria-label="スライドページ">
                    {Array.from({ length: pages }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            role="tab"
                            aria-selected={i === index}
                            aria-label={`${i + 1}ページ目`}
                            onClick={() => go(i)}
                            className="flex h-11 w-11 cursor-pointer items-center justify-center"
                        >
                            <span
                                className={`block h-1.5 rounded-full transition-all duration-300 ${
                                    i === index ? "w-6 bg-coral" : "w-1.5 bg-line"
                                }`}
                            />
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => go(index - 1)}
                        disabled={index === 0}
                        aria-label="前へ"
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-coral hover:text-coral-deep disabled:cursor-default disabled:opacity-40"
                    >
                        <ChevronLeft className="h-5 w-5" aria-hidden />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(index + 1)}
                        disabled={index >= pages - 1}
                        aria-label="次へ"
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-coral hover:text-coral-deep disabled:cursor-default disabled:opacity-40"
                    >
                        <ChevronRight className="h-5 w-5" aria-hidden />
                    </button>
                </div>
            </div>
        </div>
    );
}
