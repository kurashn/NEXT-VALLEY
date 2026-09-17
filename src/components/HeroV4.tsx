// Server Component — ファーストビュー v4（fv-v4.png の再現）
// 白地・中央見出し・左右に街並みのイラスト

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { heavy, hand } from "@/lib/fonts-v4";
import { withLang, type Lang } from "@/i18n";

import townLeft from "@/images/fv/town-left.webp";
import townRight from "@/images/fv/town-right.webp";

const NAVY = "#14335A";
const TEAL = "#2C8FA8";
const CORAL = "#FD7368";

const ja = {
    eyebrow: "埼玉の会社・お店・教室のためのWeb担当",
    h1a: <>あなたは、<span style={{ color: "#E8503A" }}>本業</span>に。</>,
    h1web: "Web",
    h1b: "は、私たちに。",
    lead: "ホームページ制作から、公開後の更新・管理まで。",
    priceInitialLabel: "初期制作費",
    priceInitial: "0円",
    priceMonthlyLabel: "月額",
    priceMonthly: "8,980円",
    priceTax: "（税込）",
    cta: "無料でデザイン案を見てみる",
    terms1: "10ページまで・更新無制限・ドメイン／サーバー込み",
    terms2: "最低契約期間1年・初年度総額107,760円（税込）",
    subPrefix: "今のホームページを改善したい方は、",
    subLink: "無料セルフ診断へ",
    hand1: "地域の仕事に、",
    hand2: "Webの力を。",
    en1: "LOCAL BUSINESS,",
    en2: "NEXT POSSIBILITIES.",
};

const en: typeof ja = {
    eyebrow: "WEB SUPPORT FOR COMPANIES, SHOPS AND SCHOOLS IN SAITAMA",
    h1a: <>You run the <span style={{ color: "#E8503A" }}>business</span>.</>,
    h1web: "Web",
    h1b: " is on us.",
    lead: "From building the site to updating and managing it after launch.",
    priceInitialLabel: "Setup",
    priceInitial: "¥0",
    priceMonthlyLabel: "Monthly",
    priceMonthly: "¥8,980",
    priceTax: " (tax incl.)",
    cta: "See a free design proposal",
    terms1: "Up to 10 pages, unlimited edits, domain and hosting included",
    terms2: "12-month minimum term, first-year total ¥107,760 (tax incl.)",
    subPrefix: "Already have a site? ",
    subLink: "Get a free site check",
    hand1: "Local work,",
    hand2: "with the web behind it.",
    en1: "LOCAL BUSINESS,",
    en2: "NEXT POSSIBILITIES.",
};

const copy: Record<Lang, typeof ja> = { ja, en };

export default function HeroV4({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-white">
            {/* ── 上段：白地。イラストはこの箱の下辺に揃える ── */}
            <div className="relative pt-[108px] md:pt-[120px]">
                {/* 街並みのイラスト（PCのみ） */}
                <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 hidden w-[30.5%] max-w-[470px] lg:block">
                    <Image src={townLeft} alt="" sizes="31vw" className="h-auto w-full" priority />
                </div>
                <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 hidden w-[32.5%] max-w-[500px] lg:block">
                    <Image src={townRight} alt="" sizes="33vw" className="h-auto w-full" priority />
                </div>

                {/* 手書き風の添え文（左）と英字（右） */}
                <p
                    aria-hidden
                    className={`${hand.className} pointer-events-none absolute left-[6.5%] top-[142px] hidden -rotate-[9deg] text-[27px] leading-[1.45] tracking-[0.08em] lg:block xl:top-[146px] xl:text-[30px]`}
                    style={{ color: TEAL }}
                >
                    {t.hand1}
                    <br />
                    {t.hand2}
                </p>
                <p
                    aria-hidden
                    className="pointer-events-none absolute right-[5%] top-[206px] hidden text-[11px] font-bold leading-[1.9] tracking-[0.3em] lg:block xl:top-[212px]"
                    style={{ color: "#6E8199" }}
                >
                    {t.en1}
                    <br />
                    {t.en2}
                </p>

                {/* 中央のコピー */}
                <div className="relative z-10 mx-auto max-w-[760px] px-4 pb-6 text-center md:px-6 md:pb-8 lg:pb-16">
                    <p className="mb-2 text-[14px] font-bold tracking-[0.12em] md:text-[15px]" style={{ color: NAVY }}>
                        {t.eyebrow}
                    </p>
                    <h1
                        className={`${heavy.className} mb-3 text-[clamp(2.15rem,min(6.9vw,8.6vh),5.2rem)] leading-[1.08] tracking-[-0.03em]`}
                        style={{ color: NAVY }}
                    >
                        <span className="block">{t.h1a}</span>
                        <span className="block">
                            <span className="relative inline-block">
                                <span style={{ color: TEAL }}>{t.h1web}</span>
                                <svg
                                    aria-hidden
                                    viewBox="0 0 100 12"
                                    preserveAspectRatio="none"
                                    className="absolute -bottom-[0.1em] left-0 h-[0.17em] w-full"
                                >
                                    <path d="M2 8 C 25 3, 50 3, 98 6" fill="none" stroke={CORAL} strokeWidth="5" strokeLinecap="round" />
                                </svg>
                            </span>
                            {t.h1b}
                        </span>
                    </h1>
                    <p className="mb-2.5 text-[16px] font-bold md:text-[18px]" style={{ color: NAVY }}>
                        {t.lead}
                    </p>
                    <p className="mb-4 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 text-[15px] font-bold md:text-[17px]" style={{ color: NAVY }}>
                        <span className="nowrap">
                            {t.priceInitialLabel}{" "}
                            <span className="text-[28px] tabular-nums md:text-[31px]" style={{ color: TEAL }}>{t.priceInitial}</span>
                        </span>
                        <span aria-hidden className="hidden text-[#9AA9BC] md:inline">｜</span>
                        <span className="nowrap">
                            {t.priceMonthlyLabel}{" "}
                            <span className="text-[28px] tabular-nums md:text-[31px]" style={{ color: TEAL }}>{t.priceMonthly}</span>
                            <span className="text-[14px]">{t.priceTax}</span>
                        </span>
                    </p>
                    <a
                        href={withLang(lang, "/preview")}
                        className="inline-flex min-h-[52px] items-center gap-2 rounded-full px-9 text-[16px] font-bold text-white shadow-[0_10px_28px_rgba(253,115,104,0.35)] transition-transform hover:-translate-y-0.5"
                        style={{ backgroundColor: CORAL }}
                    >
                        {t.cta}
                        <ArrowUpRight className="h-5 w-5" aria-hidden />
                    </a>
                    <p className="mt-2.5 text-[12.5px] leading-[1.75] md:text-[13px]" style={{ color: "#4A5A6E" }}>
                        {t.terms1}
                        <br />
                        {t.terms2}
                    </p>
                    <p className="mt-1.5 text-[12.5px]" style={{ color: "#6E8199" }}>
                        {t.subPrefix}
                        <a href={withLang(lang, "/shindan")} className="font-bold underline underline-offset-4" style={{ color: NAVY }}>
                            {t.subLink}
                        </a>
                    </p>
                </div>

                {/* 街並みのイラスト（スマホ・タブレット：本文の下に左右並び） */}
                <div aria-hidden className="pointer-events-none -mt-2 flex items-end justify-between lg:hidden">
                    <Image src={townLeft} alt="" sizes="55vw" className="h-auto w-[50%]" priority />
                    <Image src={townRight} alt="" sizes="50vw" className="h-auto w-[52%]" priority />
                </div>
            </div>
        </section>
    );
}
