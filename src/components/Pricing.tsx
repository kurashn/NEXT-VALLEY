// Server Component — 入口商品（ホームページ制作・管理）の料金
// 1枚のカードに、確定している料金と契約条件だけを載せる

import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading } from "@/components/ui/SerifHeading";
import { withLang, type Lang } from "@/i18n";

const ja = {
    heading: "料金",
    lead: (
        <>
            会社・店舗・教室のホームページを初期費用0円でお作りし、公開後の更新と管理までお引き受けします。
            <br className="hidden md:block" />
            お支払いは月額のみ。制作費をまとめて用意する必要は<span className="nowrap">ありません。</span>
        </>
    ),
    planLabel: "入口商品",
    planName: "ホームページ制作・管理",
    initialLabel: "初期制作費",
    initialValue: "0円",
    monthlyLabel: "月額",
    monthlyValue: "8,980円",
    taxNote: "（税込）",
    termsTitle: "ご契約の条件",
    terms: [
        { key: "pages", label: "制作ページ数", value: "10ページまで" },
        { key: "edit", label: "修正・更新", value: "無制限" },
        { key: "infra", label: "ドメイン・サーバー費", value: "月額に含む" },
        { key: "term", label: "最低契約期間", value: "1年間" },
        { key: "start", label: "課金開始", value: "ご契約日から" },
        { key: "transfer", label: "サイトの譲渡", value: "1年以上のご契約で可能" },
    ],
    totalLabel: "初年度のお支払い総額",
    totalValue: "107,760円（税込）",
    benefitsTitle: "任せられること",
    benefits: [
        <>写真の差し替えやお知らせの更新を、その都度お伝えいただくだけで<span className="nowrap">対応します。</span></>,
        <>ドメインの更新やサーバーの管理は当社で行います。期限切れの心配が<span className="nowrap">ありません。</span></>,
        <>問い合わせや予約までの案内の仕方は、事業の事情を伺いながら制作時に<span className="nowrap">設計します。</span></>,
        <>制作費の持ち出しがないので、始めるときの負担が<span className="nowrap">小さく済みます。</span></>,
    ],
    excludeTitle: "月額に含まれないもの",
    excludeLead: "次の継続的な支援は、この月額には含まれません。内容に応じてお見積もりします。",
    excludes: ["Googleマップ（MEO）の運用", "SNSの運用", "継続的なSEO支援", "LINE公式アカウントの構築・運用"],
    excludeNote: "月額に含まれるのは、ホームページへのLINEリンクの設置と、基本的な検索向け設定までです。",
    cta: "無料でデザイン案を見てみる",
    ctaNote: "デザイン案は無料です。料金と条件を見てから、正式に依頼するか決められます。",
    other: (
        <>
            買い切りでの制作をご希望の方や、他の業種の方は{" "}
            <a href={withLang("ja", "/price")} className="font-bold text-coral-deep underline underline-offset-4">
                料金ページ
            </a>
            をご覧ください。
        </>
    ),
};

const en: typeof ja = {
    heading: "Pricing",
    lead: (
        <>
            We build your website with no setup fee, then keep it updated and managed after launch. You pay monthly, so there is no large upfront cost.
        </>
    ),
    planLabel: "MAIN PLAN",
    planName: "Website build & management",
    initialLabel: "Setup fee",
    initialValue: "¥0",
    monthlyLabel: "Monthly",
    monthlyValue: "¥8,980",
    taxNote: " (tax incl.)",
    termsTitle: "Terms",
    terms: [
        { key: "pages", label: "Pages", value: "Up to 10" },
        { key: "edit", label: "Edits & updates", value: "Unlimited" },
        { key: "infra", label: "Domain & hosting", value: "Included" },
        { key: "term", label: "Minimum term", value: "12 months" },
        { key: "start", label: "Billing starts", value: "On the contract date" },
        { key: "transfer", label: "Site transfer", value: "Available after 12 months" },
    ],
    totalLabel: "First-year total",
    totalValue: "¥107,760 (tax incl.)",
    benefitsTitle: "What we take off your hands",
    benefits: [
        <>Send us new photos or news and we update the site for you.</>,
        <>We handle the domain renewal and hosting, so nothing expires unnoticed.</>,
        <>We design the path to an enquiry or booking with you while the site is being built.</>,
        <>No setup fee, so starting costs little.</>,
    ],
    excludeTitle: "Not included in the monthly fee",
    excludeLead: "These ongoing services are quoted separately, based on what you need.",
    excludes: ["Google Maps (MEO) management", "Social media management", "Ongoing SEO support", "LINE official account setup & operation"],
    excludeNote: "The monthly fee covers a LINE link on your site and basic search settings.",
    cta: "See a free design proposal",
    ctaNote: "The design proposal is free. Decide after seeing the price and the terms.",
    other: (
        <>
            Prefer a one-off build, or run a different kind of business?{" "}
            <a href={withLang("en", "/price")} className="font-bold text-coral-deep underline underline-offset-4">
                See the pricing page
            </a>
            .
        </>
    ),
};

const copy: Record<Lang, typeof ja> = { ja, en };

export function Pricing({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-base px-4 py-16 md:px-6 md:py-24">
            <div className="relative mx-auto max-w-5xl">
                <FadeIn>
                    <SerifHeading en="Price" jp={t.heading} />
                    <p className="lead -mt-6 mb-10 text-[15px] leading-[2] tracking-[0.03em] text-ink-sub md:mb-14">
                        {t.lead}
                    </p>
                </FadeIn>

                <FadeIn>
                    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_48px_rgba(31,26,20,0.1)]">
                        <div className="flex flex-col md:flex-row">
                            {/* 料金 */}
                            <div className="relative bg-navy-deep p-8 text-white md:w-[42%] md:p-10">
                                <p className="mb-3 text-[11px] font-bold tracking-[0.25em] text-coral">{t.planLabel}</p>
                                <h3 className="mb-7 text-2xl font-bold leading-snug md:text-[26px]">{t.planName}</h3>

                                <p className="mb-1">
                                    <span className="text-[13px] text-navy-sub">{t.initialLabel}</span>
                                    <br />
                                    <span className="text-[40px] font-bold leading-tight tabular-nums">{t.initialValue}</span>
                                </p>
                                <p className="mt-5">
                                    <span className="text-[13px] text-navy-sub">{t.monthlyLabel}</span>
                                    <br />
                                    <span className="text-[40px] font-bold leading-tight tabular-nums text-coral">{t.monthlyValue}</span>
                                    <span className="text-[13px] text-navy-sub">{t.taxNote}</span>
                                </p>

                                <div className="mt-7 border-t border-white/15 pt-5">
                                    <p className="text-[13px] text-navy-sub">{t.totalLabel}</p>
                                    <p className="text-[19px] font-bold tabular-nums">{t.totalValue}</p>
                                </div>
                                <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full bg-coral" />
                            </div>

                            {/* 条件と内容 */}
                            <div className="flex-1 p-8 md:p-10">
                                <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-ink-sub">{t.termsTitle}</p>
                                <dl className="mb-8 divide-y divide-line border-y border-line">
                                    {t.terms.map((row) => (
                                        <div key={row.key} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                                            <dt className="text-[14px] text-ink-sub">{row.label}</dt>
                                            <dd className="text-[15px] font-bold text-ink">{row.value}</dd>
                                        </div>
                                    ))}
                                </dl>

                                <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-ink-sub">{t.benefitsTitle}</p>
                                <ul className="mb-8 grid gap-3">
                                    {t.benefits.map((b, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[14.5px] leading-[1.9] text-ink">
                                            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral/15">
                                                <Check className="h-3.5 w-3.5 text-coral-deep" aria-hidden />
                                            </span>
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={withLang(lang, "/preview")}
                                    className="group inline-flex h-14 items-center gap-2 rounded-full bg-coral-deep px-8 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
                                >
                                    {t.cta}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                                </a>
                                <p className="mt-3 text-[13px] leading-[1.9] text-ink-sub">{t.ctaNote}</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* 含まれないもの */}
                <FadeIn>
                    <div className="mt-6 rounded-2xl border border-line bg-cream p-7 md:p-8">
                        <h3 className="mb-2 text-[16px] font-bold text-ink">{t.excludeTitle}</h3>
                        <p className="mb-4 text-[14px] leading-[1.9] text-ink-sub">{t.excludeLead}</p>
                        <ul className="mb-4 flex flex-wrap gap-2">
                            {t.excludes.map((x) => (
                                <li key={x} className="rounded-full border border-line bg-white px-4 py-1.5 text-[13px] text-ink">
                                    {x}
                                </li>
                            ))}
                        </ul>
                        <p className="text-[13px] leading-[1.9] text-ink-sub">{t.excludeNote}</p>
                    </div>
                    <p className="mt-6 text-[14px] leading-[2] text-ink-sub">{t.other}</p>
                </FadeIn>
            </div>
        </section>
    );
}
