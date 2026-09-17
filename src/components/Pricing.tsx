// Server Component — 基本プラン・料金（price.png の再現）
// 1枚のカードに、確定している料金と契約条件だけを載せる

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeadV4, Dots } from "@/components/ui/SectionHeadV4";
import { heavy, hand, V4 } from "@/lib/fonts-v4";
import { withLang, type Lang } from "@/i18n";

import illust from "@/images/v4/price-illust.webp";

const ja = {
    eyebrow: "基本プラン・料金",
    title: "つくる費用を抑えて、長く頼れる。",
    lead: "ホームページの制作から、公開後の更新・管理まで。",
    handwriting: ["Your", "Next,", "Together."],
    planName: "ホームページ制作・管理",
    initialLabel: "初期制作費",
    initialValue: "0",
    initialUnit: "円",
    monthlyLabel: "月額",
    monthlyValue: "8,980",
    monthlyUnit: "円",
    taxNote: "（税込）",
    totalLabel: "初年度のお支払い総額",
    totalValue: "107,760",
    totalUnit: "円",
    afterNote: "公開後の修正・更新も、まとめてお任せ。",
    cta: "無料でデザイン案を見てみる",
    ctaNote: <><span className="nowrap">デザイン案と料金・条件を確認してから、</span><span className="nowrap">ご依頼いただけます。</span></>,
    includedTitle: "月額に含まれるもの",
    included: [
        { key: "pages", label: "制作ページ数", value: "10", unit: "ページまで" },
        { key: "edit", label: "修正・更新", value: "無制限", unit: "" },
        { key: "infra", label: "ドメイン・サーバー費", value: "込み", unit: "" },
    ],
    termsTitle: "ご契約の条件",
    terms: [
        { key: "term", label: "最低契約期間", value: "1年間", unit: "" },
        { key: "start", label: "課金開始", value: "契約日", unit: "" },
        { key: "transfer", label: "サイト譲渡", value: "1年以上の契約で可能", unit: "" },
    ],
    optionalNote: "継続的な集客支援は、別途お見積もりです。",
    excludeTitle: "月額に含まれない支援",
    excludes: ["Googleマップ運用", "LINE運用", "継続的なSEO支援", "SNS運用"],
    excludeNote: <><span className="nowrap">月額に含まれるのは、</span><span className="nowrap">ホームページへのLINEリンクの設置と、</span><span className="nowrap">基本的な検索向け設定までです。</span></>,
    link: "料金・サービスの詳細を見る",
};

const en: typeof ja = {
    eyebrow: "BASIC PLAN",
    title: "Low to start. Reliable for years.",
    lead: "From building the site to updating and managing it after launch.",
    handwriting: ["Your", "Next,", "Together."],
    planName: "Website build & management",
    initialLabel: "Setup fee",
    initialValue: "¥0",
    initialUnit: "",
    monthlyLabel: "Monthly",
    monthlyValue: "¥8,980",
    monthlyUnit: "",
    taxNote: " (tax incl.)",
    totalLabel: "First-year total",
    totalValue: "¥107,760",
    totalUnit: "",
    afterNote: "Edits and updates after launch are included.",
    cta: "See a free design proposal",
    ctaNote: <>Decide after seeing the proposal, the price and the terms.</>,
    includedTitle: "Included in the monthly fee",
    included: [
        { key: "pages", label: "Pages", value: "Up to 10", unit: "" },
        { key: "edit", label: "Edits & updates", value: "Unlimited", unit: "" },
        { key: "infra", label: "Domain & hosting", value: "Included", unit: "" },
    ],
    termsTitle: "Terms",
    terms: [
        { key: "term", label: "Minimum term", value: "12 months", unit: "" },
        { key: "start", label: "Billing starts", value: "Contract date", unit: "" },
        { key: "transfer", label: "Site transfer", value: "After 12 months", unit: "" },
    ],
    optionalNote: "Ongoing marketing support is quoted separately.",
    excludeTitle: "Not included in the monthly fee",
    excludes: ["Google Maps management", "LINE management", "Ongoing SEO", "Social media management"],
    excludeNote: <>The monthly fee covers a LINE link on your site and basic search settings.</>,
    link: "See pricing and services",
};

const copy: Record<Lang, typeof ja> = { ja, en };

function CheckRow({ label, value, unit }: { label: string; value: string; unit: string }) {
    return (
        <li className="flex items-center gap-4 py-3.5" style={{ borderColor: "rgba(44,143,168,0.28)" }}>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: V4.coralDeep }}>
                <Check className="h-4 w-4 text-white" strokeWidth={3} aria-hidden />
            </span>
            <span className="w-[10.5em] shrink-0 text-[14.5px] font-bold md:text-[15.5px]" style={{ color: V4.navy }}>
                {label}
            </span>
            <span className={`${heavy.className} text-[clamp(1.1rem,1.7vw,1.45rem)] leading-tight`} style={{ color: V4.navy }}>
                {value}
                {unit && <span className="ml-0.5 text-[0.75em]">{unit}</span>}
            </span>
        </li>
    );
}

export function Pricing({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden px-4 py-14 md:px-6 md:py-20" style={{ backgroundColor: V4.cream }}>
            <div className="relative mx-auto max-w-6xl">
                <SectionHeadV4
                    word="Price"
                    eyebrow={t.eyebrow}
                    title={t.title}
                    lead={t.lead}
                    aside={
                        <p
                            aria-hidden
                            className={`${hand.className} hidden shrink-0 rotate-[-8deg] text-[22px] leading-[1.35] tracking-[0.04em] lg:block lg:ml-auto lg:pr-6`}
                            style={{ color: V4.teal }}
                        >
                            {t.handwriting.map((l, i) => (
                                <span key={i} className="block" style={{ paddingLeft: `${i * 0.6}em` }}>
                                    {l}
                                </span>
                            ))}
                        </p>
                    }
                />

                <FadeIn>
                    <div className="rounded-[16px] border-[1.5px] bg-white px-5 pb-6 pt-4 md:px-6 md:pb-6" style={{ borderColor: V4.teal }}>
                        <Dots />
                        <div className="mt-4 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
                            {/* 左：料金 */}
                            <div className="rounded-[12px] p-6 md:p-8" style={{ backgroundColor: "#F2FAFB" }}>
                                <h3 className={`${heavy.className} text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.3]`} style={{ color: V4.navy }}>
                                    {t.planName}
                                </h3>
                                <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-4">
                                    <div>
                                        <p className="text-[14px] font-bold" style={{ color: V4.navy }}>{t.initialLabel}</p>
                                        <p className={`${heavy.className} mt-1 leading-none tabular-nums`} style={{ color: V4.navy }}>
                                            <span className="text-[clamp(3rem,5.6vw,4.8rem)]">{t.initialValue}</span>
                                            {t.initialUnit && <span className="ml-1 text-[clamp(1.2rem,2vw,1.7rem)]">{t.initialUnit}</span>}
                                        </p>
                                    </div>
                                    <span aria-hidden className="hidden h-20 w-px self-center sm:block" style={{ backgroundColor: "rgba(20,51,90,0.25)" }} />
                                    <div>
                                        <p className="text-[14px] font-bold" style={{ color: V4.navy }}>{t.monthlyLabel}</p>
                                        <p className={`${heavy.className} mt-1 leading-none tabular-nums`} style={{ color: V4.coralDeep }}>
                                            <span className="text-[clamp(3rem,5.6vw,4.8rem)]">{t.monthlyValue}</span>
                                            {t.monthlyUnit && <span className="ml-1 text-[clamp(1.2rem,2vw,1.7rem)]">{t.monthlyUnit}</span>}
                                            <span className="ml-1 text-[clamp(0.9rem,1.3vw,1.15rem)]">{t.taxNote}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-end justify-between gap-4 border-t pt-5" style={{ borderColor: "rgba(44,143,168,0.35)" }}>
                                    <div>
                                        <p className="text-[14px] font-bold" style={{ color: V4.navy }}>{t.totalLabel}</p>
                                        <p className={`${heavy.className} mt-1 leading-none tabular-nums`} style={{ color: V4.navy }}>
                                            <span className="text-[clamp(2rem,3.4vw,2.9rem)]">{t.totalValue}</span>
                                            {t.totalUnit && <span className="ml-1 text-[clamp(1rem,1.5vw,1.3rem)]">{t.totalUnit}</span>}
                                            <span className="ml-1 text-[clamp(0.85rem,1.1vw,1rem)]">{t.taxNote}</span>
                                        </p>
                                    </div>
                                    <Image src={illust} alt="" sizes="180px" className="hidden h-auto w-[150px] shrink-0 sm:block md:w-[170px]" />
                                </div>
                                <p className="mt-4 text-[13.5px] font-bold md:text-[16px]" style={{ color: V4.navy }}>
                                    {t.afterNote}
                                </p>
                                <a
                                    href={withLang(lang, "/preview")}
                                    className="mt-4 flex min-h-[56px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-[16px] font-bold text-white transition-transform hover:-translate-y-0.5 md:min-h-[60px] md:text-[19px]"
                                    style={{ backgroundColor: V4.coralDeep }}
                                >
                                    {t.cta}
                                    <ArrowUpRight className="h-5 w-5" aria-hidden />
                                </a>
                                <p className="mt-3 text-center text-[12.5px] md:text-[13.5px]" style={{ color: V4.navy }}>
                                    {t.ctaNote}
                                </p>
                            </div>

                            {/* 右：含まれるもの・条件 */}
                            <div className="px-1 py-1 lg:border-l lg:pl-8" style={{ borderColor: "rgba(44,143,168,0.35)" }}>
                                <p className="inline-block rounded-md px-4 py-1.5 text-[14px] font-bold" style={{ backgroundColor: "#DDEFF2", color: V4.teal }}>
                                    {t.includedTitle}
                                </p>
                                <ul className="mt-2 divide-y" style={{ borderColor: "rgba(44,143,168,0.28)" }}>
                                    {t.included.map((r) => (
                                        <CheckRow key={r.key} label={r.label} value={r.value} unit={r.unit} />
                                    ))}
                                </ul>
                                <p className="mt-6 inline-block rounded-md px-4 py-1.5 text-[14px] font-bold" style={{ backgroundColor: "#FDE5E0", color: V4.coralDeep }}>
                                    {t.termsTitle}
                                </p>
                                <ul className="mt-2 divide-y" style={{ borderColor: "rgba(44,143,168,0.28)" }}>
                                    {t.terms.map((r) => (
                                        <CheckRow key={r.key} label={r.label} value={r.value} unit={r.unit} />
                                    ))}
                                </ul>
                                <p className="mt-5 border-t pt-4 text-[13.5px] md:text-[14.5px]" style={{ color: V4.navy, borderColor: "rgba(44,143,168,0.28)" }}>
                                    {t.optionalNote}
                                </p>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn>
                    <div className="mt-7 grid gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-6">
                        <p className="text-[15px] font-bold md:text-[16px]" style={{ color: V4.navy }}>
                            {t.excludeTitle}
                        </p>
                        <div>
                            <ul className="flex flex-wrap gap-2.5">
                                {t.excludes.map((x) => (
                                    <li key={x} className="rounded-md border bg-white px-4 py-2 text-[13.5px] font-bold" style={{ color: V4.navy, borderColor: "rgba(20,51,90,0.35)" }}>
                                        {x}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-2.5 text-[12.5px] leading-[1.8] md:text-[13.5px]" style={{ color: V4.navy }}>
                                {t.excludeNote}
                            </p>
                        </div>
                        <a
                            href={withLang(lang, "/price")}
                            className="inline-flex min-h-11 items-center gap-1.5 text-[14.5px] font-bold underline decoration-2 underline-offset-[6px] md:border-l md:pl-6"
                            style={{ color: V4.navy, borderColor: "rgba(20,51,90,0.3)" }}
                        >
                            {t.link}
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </a>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
