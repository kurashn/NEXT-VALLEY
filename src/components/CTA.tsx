// Server Component — お問い合わせ（contact-v5.png の再現）。
// 上に見出しと添え文、下に 01 無料プレビュー／02 無料診断 の2行、最後にメール相談と保証の一行。

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { serif } from "@/components/ui/SerifHeading";
import { heavy, V4 } from "@/lib/fonts-v4";
import type { Lang } from "@/i18n";

const LINE_URL = "https://lin.ee/N4QXdJL";
const BG = "#F9F7F1";
const RULE = "rgba(20,51,90,0.35)";

const t = {
    word: "Contact",
    eyebrow: "お問い合わせ",
    title: (
        <>
            Webのこと、<br />
            <span style={{ color: V4.teal }}>まずは</span>話してみませんか。
        </>
    ),
    aside: <><span className="nowrap">つくることも、</span><span className="nowrap">今あるサイトのことも。</span></>,
    asideEn: "LET'S TALK ABOUT YOUR NEXT.",
    rows: [
        {
            n: "01",
            color: V4.coralDeep,
            tag: "新しく作る・作り直す方へ",
            title: "無料プレビュー",
            desc: <><span className="nowrap">あなたの事業に合わせた</span><span className="nowrap">トップページ案を、</span><span className="nowrap">契約前に。</span></>,
            cta: "デザイン案を見てみる",
            sub: <><span className="nowrap">デザインを見てから、</span><span className="nowrap">依頼を判断。</span></>,
            href: "/preview",
            external: false,
            filled: true,
        },
        {
            n: "02",
            color: V4.teal,
            tag: "今のホームページを改善したい方へ",
            title: "無料診断",
            desc: <><span className="nowrap">サイトの改善点と、</span><span className="nowrap">取り組む順番をお伝えします。</span></>,
            cta: "今のサイトを診断する",
            sub: <><span className="nowrap">改善の実施は、</span><span className="nowrap">別途お見積もり。</span></>,
            href: LINE_URL,
            external: true,
            filled: false,
        },
    ],
    mail: "メールで相談する",
    notes: ["相談・デザイン案・診断は無料", "全国オンライン対応"],
};

export function CTA({ lang = "ja" }: { lang?: Lang }) {
    void lang;
    return (
        <section id="contact" className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: BG }}>
            <div className="mx-auto max-w-[1180px]">
                <FadeIn>
                    {/* 見出し行 */}
                    <div className="flex items-center gap-4 md:gap-5">
                        <p className="text-[34px] italic leading-none md:text-[44px]" style={{ fontFamily: serif, fontWeight: 700 }}>
                            <span style={{ color: V4.coralDeep }}>{t.word.slice(0, 4)}</span>
                            <span style={{ color: V4.teal }}>{t.word.slice(4)}</span>
                        </p>
                        <span aria-hidden className="block h-8 w-px md:h-9" style={{ backgroundColor: RULE }} />
                        <p className="text-[14px] font-bold md:text-[16px]" style={{ color: V4.coralDeep }}>{t.eyebrow}</p>
                    </div>

                    <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between md:gap-10">
                        <h2 className={`${heavy.className} text-[clamp(1.9rem,5.4vw,4.3rem)] leading-[1.22] tracking-[-0.035em]`} style={{ color: V4.navy }}>
                            {t.title}
                        </h2>
                        <div className="shrink-0 md:pb-2 md:text-right">
                            <p className="text-left text-[15px] font-bold md:text-right md:text-[19px]" style={{ color: V4.navy }}>{t.aside}</p>
                            <p className="mt-2 flex items-center gap-4 whitespace-nowrap text-left text-[10.5px] tracking-[0.22em] md:justify-end md:text-[12px] md:tracking-[0.28em]" style={{ color: V4.faint }}>
                                <span aria-hidden className="block h-px w-10 shrink-0 md:w-24" style={{ backgroundColor: RULE }} />
                                <span>{t.asideEn}</span>
                            </p>
                        </div>
                    </div>
                </FadeIn>

                {/* 2つの入口 */}
                <div className="mt-8 border-t md:mt-10" style={{ borderColor: RULE }}>
                    {t.rows.map((r, i) => (
                        <FadeIn key={r.n} delay={i * 0.08}>
                            <a
                                href={r.href}
                                {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-5 border-b py-8 md:grid-cols-[170px_1fr_auto] md:gap-x-10 md:py-10"
                                style={{ borderColor: RULE }}
                            >
                                <span
                                    className="flex items-center gap-5 self-stretch text-[64px] italic leading-none md:text-[110px]"
                                    style={{ fontFamily: serif, fontWeight: 700, color: r.color }}
                                >
                                    {r.n}
                                    <span aria-hidden className="hidden h-full w-px md:block" style={{ backgroundColor: r.color, opacity: 0.6 }} />
                                </span>
                                <span>
                                    <span className="block text-[13px] font-bold md:text-[15px]" style={{ color: r.color }}>{r.tag}</span>
                                    <span className={`${heavy.className} mt-1 block text-[30px] leading-[1.2] tracking-[-0.02em] md:text-[52px]`} style={{ color: V4.navy }}>{r.title}</span>
                                    <span className="mt-2 block text-[14.5px] leading-[1.8] md:text-[17px]" style={{ color: V4.navy }}>{r.desc}</span>
                                </span>
                                <span className="col-span-2 flex items-center justify-between gap-5 md:col-span-1 md:justify-end md:gap-7">
                                    <span className="md:text-right">
                                        <span className={`${heavy.className} block text-[19px] leading-[1.3] md:text-[27px]`} style={{ color: r.color }}>{r.cta}</span>
                                        <span className="mt-1 block text-[13px] md:text-[14.5px]" style={{ color: V4.sub }}>{r.sub}</span>
                                    </span>
                                    <span
                                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full transition-transform group-hover:-translate-y-0.5 md:h-24 md:w-24"
                                        style={r.filled ? { backgroundColor: r.color, color: "#fff" } : { border: `2px solid ${r.color}`, color: r.color }}
                                        aria-hidden
                                    >
                                        <ArrowUpRight className="h-7 w-7 md:h-9 md:w-9" strokeWidth={2.2} />
                                    </span>
                                </span>
                            </a>
                        </FadeIn>
                    ))}
                </div>

                {/* 下段 */}
                <FadeIn>
                    <div className="mt-8 flex flex-col gap-5 md:mt-10 md:flex-row md:items-center md:justify-between">
                        <a href="/contact" className="inline-flex w-fit items-center gap-2 border-b-2 pb-1 text-[17px] font-bold md:text-[20px]" style={{ color: V4.navy, borderColor: V4.navy }}>
                            {t.mail}
                            <ArrowUpRight className="h-5 w-5" aria-hidden />
                        </a>
                        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] md:text-[15px]" style={{ color: V4.sub }}>
                            {t.notes.map((n) => (
                                <li key={n} className="flex items-center gap-6">
                                    <span aria-hidden className="hidden h-6 w-px md:block" style={{ backgroundColor: RULE }} />
                                    {n}
                                </li>
                            ))}
                        </ul>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
