"use client";
// 制作実績の一覧（業種で絞り込み）
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { linkOf, type Work, type CategoryKey } from "@/lib/works";

const NAVY = "#14335A", TEAL = "#2C8FA8", CORAL = "#E8503A", SUB = "#4A5A6E";

export function WorksGrid({ works, categories, heavyClass }: { works: Work[]; categories: readonly { key: CategoryKey; label: string }[]; heavyClass: string }) {
    const [cat, setCat] = useState<CategoryKey>("all");
    const shown = cat === "all" ? works : works.filter((w) => w.category === cat);
    const count = (k: CategoryKey) => (k === "all" ? works.length : works.filter((w) => w.category === k).length);
    return (
        <>
            <div className="mb-8 flex flex-wrap gap-2 md:mb-10" role="group" aria-label="業種で絞り込む">
                {categories.map((c) => {
                    const on = c.key === cat;
                    return (
                        <button
                            key={c.key}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setCat(c.key)}
                            className="min-h-[44px] rounded-full border px-4 text-[14px] font-bold transition-colors md:px-5 md:text-[15px]"
                            style={on ? { backgroundColor: NAVY, borderColor: NAVY, color: "#fff" } : { backgroundColor: "#fff", borderColor: "rgba(20,51,90,0.2)", color: NAVY }}
                        >
                            {c.label}
                            <span className="ml-1.5 text-[12px] font-normal opacity-70">{count(c.key)}</span>
                        </button>
                    );
                })}
            </div>

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((w) => {
                    const url = linkOf(w);
                    const inner = (
                        <>
                            <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: "995 / 580" }}>
                                <Image src={w.image} alt={`${w.name}のホームページ`} fill placeholder="blur" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]" />
                            </div>
                            <div className="flex flex-1 flex-col p-5 md:p-6">
                                <p className="text-[12.5px] font-bold" style={{ color: TEAL }}>{w.label}</p>
                                <h3 className={`${heavyClass} mt-1 text-[17px] leading-[1.5] md:text-[18px]`} style={{ color: NAVY }}>{w.name}</h3>
                                <p className="mt-2 text-left text-[14px] leading-[1.85]" style={{ color: SUB }}>{w.summary}</p>
                                <ul className="mt-3 flex flex-wrap gap-1.5">
                                    {w.scope.map((s) => (
                                        <li key={s} className="rounded-full px-2.5 py-0.5 text-[11.5px]" style={{ backgroundColor: "#FBF4EA", color: SUB }}>{s}</li>
                                    ))}
                                </ul>
                                {w.detail ? (
                                    <span className="mt-4 inline-flex items-center gap-1 pt-1 text-[14px] font-bold" style={{ color: CORAL }}>
                                        詳しく見る <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                                    </span>
                                ) : url ? (
                                    <span className="mt-4 inline-flex items-center gap-1 pt-1 text-[14px] font-bold" style={{ color: NAVY }}>
                                        サイトを見る <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                                    </span>
                                ) : null}
                            </div>
                        </>
                    );
                    const cls = "group flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300";
                    const hover = "flex-1 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(20,51,90,0.1)]";
                    return (
                        <li key={w.slug} className="flex">
                            {w.detail ? (
                                <Link href={`/works/${w.slug}`} className={`${cls} ${hover}`} style={{ borderColor: "rgba(20,51,90,0.12)" }}>{inner}</Link>
                            ) : url ? (
                                // 詳細ページがない実績は、カード全体で実際のサイトを開く（新しいタブ）
                                <a href={url} target="_blank" rel="noopener noreferrer" className={`${cls} ${hover}`} style={{ borderColor: "rgba(20,51,90,0.12)" }}>{inner}</a>
                            ) : (
                                <article className={`${cls} flex-1`} style={{ borderColor: "rgba(20,51,90,0.12)" }}>{inner}</article>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
