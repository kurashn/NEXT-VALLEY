// Server Component — ファーストビュー v4（fv-v4.png の再現）
// 白地・中央見出し・左右に街並みのイラスト・下に生成りの帯と3枚の写真

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Noto_Sans_JP, Zen_Kurenaido } from "next/font/google";
import { withLang, type Lang } from "@/i18n";

import townLeft from "@/images/fv/town-left.webp";
import townRight from "@/images/fv/town-right.webp";
import photoCafe from "@/images/fv/photo-cafe.webp";
import photoCraft from "@/images/fv/photo-craft.webp";
import photoSchool from "@/images/fv/photo-school.webp";

const heavy = Noto_Sans_JP({ subsets: ["latin"], weight: ["900"], display: "swap" });
const hand = Zen_Kurenaido({ subsets: ["latin"], weight: ["400"], display: "swap" });

const NAVY = "#14335A";
const TEAL = "#2C8FA8";
const CORAL = "#FD7368";
const CREAM = "#FBF4EA";

const ja = {
    eyebrow: "埼玉の会社・お店・教室のためのWeb担当",
    h1a: "あなたは、本業に。",
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
    subLink: "無料診断へ",
    hand1: "地域の仕事に、",
    hand2: "Webの力を。",
    en1: "LOCAL BUSINESS,",
    en2: "NEXT POSSIBILITIES.",
    photos: [
        { key: "cafe", img: photoCafe, caption: "お店の毎日を、もっと豊かに。", tag: "CAFE", alt: "カフェでコーヒーを手渡す店主" },
        { key: "craft", img: photoCraft, caption: "確かな仕事を、地域へ。", tag: "CRAFT", alt: "木材に印をつける職人" },
        { key: "school", img: photoSchool, caption: "教える時間に、夢中に。", tag: "SCHOOL", alt: "陶芸を教える先生と生徒" },
    ],
};

const en: typeof ja = {
    eyebrow: "WEB SUPPORT FOR COMPANIES, SHOPS AND SCHOOLS IN SAITAMA",
    h1a: "You run the business.",
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
    photos: [
        { key: "cafe", img: photoCafe, caption: "Better days for the shop.", tag: "CAFE", alt: "A cafe owner handing over a coffee" },
        { key: "craft", img: photoCraft, caption: "Solid work, for the neighbourhood.", tag: "CRAFT", alt: "A craftsman marking timber" },
        { key: "school", img: photoSchool, caption: "Time to teach, fully present.", tag: "SCHOOL", alt: "A pottery teacher with a student" },
    ],
};

const copy: Record<Lang, typeof ja> = { ja, en };

// 写真ごとの段差（参考画像では左から順に少しずつ下がる）
const photoOffset = ["lg:mt-0", "lg:mt-3", "lg:mt-[52px]"];

export default function HeroV4({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-white">
            {/* ── 上段：白地。イラストはこの箱の下辺に揃える ── */}
            <div className="relative pt-[84px] md:pt-[86px]">
                {/* 街並みのイラスト（PCのみ） */}
                <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 hidden w-[27%] max-w-[420px] lg:block">
                    <Image src={townLeft} alt="" sizes="28vw" className="h-auto w-full" priority />
                </div>
                <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 hidden w-[25.5%] max-w-[392px] lg:block">
                    <Image src={townRight} alt="" sizes="26vw" className="h-auto w-full" priority />
                </div>

                {/* 手書き風の添え文（左）と英字（右） */}
                <p
                    aria-hidden
                    className={`${hand.className} pointer-events-none absolute left-[6.5%] top-[108px] hidden -rotate-[9deg] text-[27px] leading-[1.45] tracking-[0.08em] lg:block xl:top-[112px] xl:text-[30px]`}
                    style={{ color: TEAL }}
                >
                    {t.hand1}
                    <br />
                    {t.hand2}
                </p>
                <p
                    aria-hidden
                    className="pointer-events-none absolute right-[5%] top-[172px] hidden text-[11px] font-bold leading-[1.9] tracking-[0.3em] lg:block xl:top-[178px]"
                    style={{ color: "#6E8199" }}
                >
                    {t.en1}
                    <br />
                    {t.en2}
                </p>

                {/* 中央のコピー */}
                <div className="relative z-10 mx-auto max-w-[760px] px-4 pb-5 text-center md:px-6 md:pb-6">
                    <p className="mb-2 text-[14px] font-bold tracking-[0.12em] md:text-[15px]" style={{ color: NAVY }}>
                        {t.eyebrow}
                    </p>
                    <h1
                        className={`${heavy.className} mb-3 text-[clamp(2.15rem,min(6.4vw,8vh),4.6rem)] leading-[1.1] tracking-[-0.02em]`}
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
            </div>

            {/* ── 下段：生成りの帯と写真 ── */}
            <div className="relative pb-10 pt-7 md:pb-8 md:pt-7" style={{ backgroundColor: CREAM }}>
                {/* 白地の下辺をゆるく丸める */}
                <svg aria-hidden viewBox="0 0 1440 22" preserveAspectRatio="none" className="pointer-events-none absolute left-0 top-0 h-[22px] w-full">
                    <path d="M0 0 H1440 V3 C 1120 22, 320 22, 0 3 Z" fill="#fff" />
                </svg>

                {/* コーラルの曲線（PCのみ） */}
                <svg
                    aria-hidden
                    viewBox="0 0 1440 430"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
                >
                    <path d="M 982 98 C 1040 62, 1140 38, 1240 48" fill="none" stroke={CORAL} strokeWidth="3" strokeLinecap="round" />
                    <circle cx="1240" cy="48" r="6" fill={TEAL} />
                    <path d="M 686 282 C 740 322, 800 340, 860 334 C 920 328, 960 300, 1012 320" fill="none" stroke={CORAL} strokeWidth="3" strokeLinecap="round" />
                </svg>

                <div className="relative mx-auto grid max-w-[1280px] gap-6 px-4 md:px-6 lg:grid-cols-[2.14fr_1fr_1.17fr] lg:items-start lg:gap-7 lg:px-11">
                    {t.photos.map((p, i) => (
                        <figure key={p.key} className={`m-0 ${photoOffset[i]}`}>
                            <div className="overflow-hidden rounded-[18px] shadow-[0_14px_34px_rgba(20,51,90,0.10)]">
                                <Image
                                    src={p.img}
                                    alt={p.alt}
                                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 1024px) 100vw, 22vw"}
                                    className="h-auto w-full"
                                />
                            </div>
                            <figcaption className="mt-3 text-center">
                                <span className="block text-[15px] font-bold" style={{ color: NAVY }}>
                                    {p.caption}
                                </span>
                                <span className="mt-1 block text-[11px] font-bold tracking-[0.3em]" style={{ color: "#6E8199" }}>
                                    {p.tag}
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
