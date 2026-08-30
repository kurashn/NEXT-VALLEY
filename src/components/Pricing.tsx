// Server Component — 料金（sample世界観ブラッシュアップ版）
// 【仮】金額は仮の目安。正式料金が確定次第 rows を差し替える

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading } from "@/components/ui/SerifHeading";
import { withLang, type Lang } from "@/i18n";

const ja = {
    heading: "料金",
    lead: (
        <>
            ご提案・お見積もりまでは無料です。まず内容と金額を見てから、判断してください。<br className="hidden md:block" /> AIで制作の手間を減らしたぶん、制作費は抑え、公開後の集客に力を<span className="nowrap">かけます。</span>
        </>
    ),
    entryLabel: "まずはここから",
    entryTitle: "集客ページ制作 ＋ 集客サポート",
    entryDesc: (
        <>
            体験申込フォーム付きの1枚完結ページを、AI制作で最短3〜5日で公開。公開後は毎月の数字報告と改善で、申込を増やし<span className="nowrap">続けます。</span>
            <br />
            実例: 英語教室で、2026年1〜7月にLINE相談19件・<span className="nowrap">入会14名</span>（月次レポートより）。
            <a href="/blog/case-english-school-zero-to-14" className="inline-flex min-h-11 items-center font-bold text-coral-deep underline underline-offset-4">事例の詳細を見る</a>
        </>
    ),
    entryRows: [
        { key: "page", name: <>集客ページ制作<span className="nowrap">（1枚完結）</span></>, desc: "申込フォーム付き・最短3〜5日で公開", price: "¥55,000〜" },
        { key: "support", name: <>集客サポート</>, desc: "ページの改善・Googleマップ・LINE・毎月の数字報告。範囲に応じてお見積もり", price: "¥22,000〜/月" },
    ],
    entryNote: "税込。制作のみのご依頼も承ります",
    entryCta: "無料プレビューで完成イメージを見る",
    badge: "おすすめ",
    stepLabel: "複数ページのサイトごと、まるごと任せたい方は",
    planName: "まるごと集客プラン",
    planDesc: (
        <>
            複数ページのホームページと集客をセットで。「作る」と「集める」の分業をなくすことが、いちばん成果に<span className="nowrap">つながります。</span>
        </>
    ),
    monthlyIncludes: (
        <>
            月額に含まれるのは、毎月のアクセス・問い合わせ報告と、それをもとにした改善作業。「作って終わり」に<span className="nowrap">しません。</span>
        </>
    ),
    initialLabel: "初期",
    initialPrice: "¥165,000",
    initialSuffix: "〜",
    monthlyLabel: "＋ 月額",
    monthlyPrice: "¥44,000",
    monthlySuffix: "〜",
    taxNote: "いずれも税込",
    includes: "プランに含まれるもの",
    /* おすすめパッケージの内容（金額は仮） */
    packageFeatures: [
        { key: "hp", node: <>成果から逆算した<span className="nowrap">ホームページ制作</span></> },
        { key: "seo", node: <>SEO・MEO集客の<span className="nowrap">設計と運用</span></> },
        { key: "report", node: <>毎月のアクセス・問い合わせ<span className="nowrap">レポート</span></> },
        { key: "ops", node: <>公開後の更新・改善も<span className="nowrap">おまかせ</span></> },
    ],
    planCta: "このプランで無料診断を受ける",
    singleTitle: "単品でのご依頼",
    thService: "サービス",
    thType: "形態",
    thPrice: "目安（税込）",
    rows: [
        { key: "page", service: <>集客ページ制作<span className="nowrap">（1枚完結）</span></>, type: "買い切り", price: "¥55,000〜" },
        { key: "hp", service: <>ホームページ制作<span className="nowrap">（複数ページ）</span></>, type: "買い切り", price: "¥165,000〜" },
        { key: "support", service: <>集客サポート</>, type: "月額", price: "¥22,000〜/月" },
        { key: "sns", service: <>SNSマーケティング</>, type: "月額", price: "¥44,000〜/月" },
        { key: "design", service: <>デザイン制作<span className="nowrap">（ロゴ・チラシ等）</span></>, type: "スポット", price: "応相談" },
        { key: "ai", service: <><span className="nowrap">AI活用</span><span className="nowrap">コンサルティング</span></>, type: "スポット / 月額", price: "応相談" },
        { key: "tool", service: <>HP運用ツール<span className="nowrap">『SiteChat』</span></>, type: "SaaS", price: "応相談" },
    ],
    note: (
        <>
            内容により変動します。正式な金額は無料のお見積もりでご提示します。追加料金が発生する場合は、必ず事前にお<span className="nowrap">伝えします。</span>
        </>
    ),
};
const en: typeof ja = {
    heading: "Pricing",
    lead: (
        <>
            The proposal and quote are free. See exactly what you get and what it costs before you decide. <br className="hidden md:block" /> Need just a website or landing page? Single services are welcome too.
        </>
    ),
    entryLabel: "Start here",
    entryTitle: "One-page site + growth support",
    entryDesc: (
        <>
            A single-page site with a trial-lesson form, built with AI and live in as little as 3–5 days. After launch, a monthly report and improvements keep the inquiries coming.
            <br />
            Real example: an English school saw 19 LINE inquiries and 14 new students in Jan–Jul 2026 (from the client's monthly reports).
        </>
    ),
    entryRows: [
        { key: "page", name: <>One-page site</>, desc: "Inquiry form included, live in 3–5 days", price: "from ¥55,000" },
        { key: "support", name: <>Growth support</>, desc: "Page improvements, Google Maps, LINE, monthly report. Quoted by scope", price: "from ¥22,000/mo" },
    ],
    entryNote: "Tax incl. Build-only is fine too.",
    entryCta: "See a free preview of your design",
    badge: "Recommended",
    stepLabel: "Want a full multi-page site handled end to end?",
    planName: "All-in-One Growth Plan",
    planDesc: (
        <>
            A multi-page website and marketing, together. Keeping both in one team is what moves the numbers.
        </>
    ),
    monthlyIncludes: (
        <>
            The monthly fee covers your traffic and inquiry report every month, plus the improvements we make based on it. We don&apos;t build and walk away.
        </>
    ),
    initialLabel: "Setup",
    initialPrice: "¥165,000",
    initialSuffix: "+",
    monthlyLabel: "+ Monthly",
    monthlyPrice: "¥44,000",
    monthlySuffix: "+",
    taxNote: "All prices include tax",
    includes: "What’s included",
    packageFeatures: [
        { key: "hp", node: <>A website designed around your goals</> },
        { key: "seo", node: <>SEO and Google Maps (local SEO) strategy and management</> },
        { key: "report", node: <>Monthly traffic and inquiry reports</> },
        { key: "ops", node: <>Ongoing updates and improvements after launch</> },
    ],
    planCta: "Start with a free site check",
    singleTitle: "Single services",
    thService: "Service",
    thType: "Billing",
    thPrice: "Starting at (tax incl.)",
    rows: [
        { key: "page", service: <>One-page site</>, type: "One-time", price: "from ¥55,000" },
        { key: "hp", service: <>Website (multi-page)</>, type: "One-time", price: "from ¥165,000" },
        { key: "support", service: <>Growth support</>, type: "Monthly", price: "from ¥22,000/mo" },
        { key: "sns", service: <>Social media marketing</>, type: "Monthly", price: "from ¥44,000/mo" },
        { key: "design", service: <>Design (logos, flyers, etc.)</>, type: "Project", price: "Ask us" },
        { key: "ai", service: <>AI consulting</>, type: "Project / Monthly", price: "Ask us" },
        { key: "tool", service: <>Website management tool &ldquo;SiteChat&rdquo;</>, type: "SaaS", price: "Ask us" },
    ],
    note: (
        <>
            Final pricing depends on scope and is confirmed in your free quote. If anything would cost extra, we always tell you before it happens.
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

                {/* 入口: 制作のみ（教室・お店が最初に見る小さい額を先頭に） */}
                <FadeIn>
                    <div className="mb-6 flex flex-col gap-6 rounded-2xl border border-line bg-white p-8 lg:flex-row lg:items-center lg:gap-10 md:p-10">
                        <div className="flex-1">
                            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-coral-deep">{t.entryLabel}</p>
                            <h3 className="mb-3 text-2xl font-bold leading-snug text-ink md:text-[28px]">{t.entryTitle}</h3>
                            <p className="text-sm leading-[1.9] text-ink-sub">{t.entryDesc}</p>
                        </div>
                        <div className="lg:w-[40%]">
                            <ul className="mb-3 divide-y divide-line">
                                {t.entryRows.map((r) => (
                                    <li key={r.key} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                                        <span className="text-[15px] font-bold leading-snug text-ink">{r.name}</span>
                                        <span className="whitespace-nowrap text-2xl font-bold tabular-nums text-ink">{r.price}</span>
                                        <span className="basis-full text-xs leading-[1.7] text-ink-sub">{r.desc}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mb-4 text-xs text-ink-sub">{t.entryNote}</p>
                            <a
                                href={withLang(lang, "/preview")}
                                className="group inline-flex min-h-11 items-center gap-2 py-2 text-[15px] font-bold text-coral-deep underline decoration-2 underline-offset-4 transition-colors hover:text-navy-deep"
                            >
                                {t.entryCta}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                            </a>
                        </div>
                    </div>
                    <p className="mb-4 text-sm font-bold tracking-wider text-ink-sub">{t.stepLabel}</p>
                </FadeIn>

                {/* おすすめパッケージ */}
                <FadeIn>
                    <div className="relative mb-8 overflow-hidden rounded-2xl bg-white shadow-[0_20px_48px_rgba(31,26,20,0.1)] md:mb-10">
                        <span className="absolute right-0 top-0 z-10 rounded-bl-xl bg-coral px-5 py-2 text-[13px] font-bold tracking-wider text-navy-deep">
                            {t.badge}
                        </span>
                        <div className="flex flex-col md:flex-row md:items-stretch">
                            {/* 左: 紺のプラン面 */}
                            <div className="relative overflow-hidden bg-navy-deep p-8 text-white md:w-[44%] md:p-10">
                                <div
                                    aria-hidden
                                    className="absolute inset-0 opacity-30"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(var(--color-navy-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-navy-line) 1px, transparent 1px)",
                                        backgroundSize: "64px 64px",
                                    }}
                                />
                                <div className="relative">
                                    <p className="mb-3 text-xs font-bold tracking-[0.25em] text-coral">ALL-IN-ONE</p>
                                    <h3 className="mb-4 text-2xl font-bold leading-snug md:text-[28px]">
                                        {t.planName}
                                    </h3>
                                    <p className="mb-4 text-sm leading-[1.9] text-navy-sub">
                                        {t.planDesc}
                                    </p>
                                    <p className="mb-8 text-sm leading-[1.9] text-white">
                                        {t.monthlyIncludes}
                                    </p>
                                    <p>
                                        <span className="nowrap">
                                            <span className="text-sm text-navy-sub">{t.initialLabel}</span>{" "}
                                            <span className="text-4xl font-bold tabular-nums">{t.initialPrice}</span>
                                            <span className="text-sm">{t.initialSuffix}</span>
                                        </span>
                                        <br />
                                        <span className="nowrap">
                                            <span className="text-sm text-navy-sub">{t.monthlyLabel}</span>{" "}
                                            <span className="text-4xl font-bold tabular-nums">{t.monthlyPrice}</span>
                                            <span className="text-sm">{t.monthlySuffix}</span>
                                        </span>
                                    </p>
                                    <p className="mt-2 text-xs text-navy-sub">{t.taxNote}</p>
                                </div>
                                <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full bg-coral" />
                            </div>
                            {/* 右: 内訳とCTA */}
                            <div className="flex-1 p-8 md:p-10">
                                <p className="mb-4 text-xs font-bold tracking-[0.2em] text-ink-sub">{t.includes}</p>
                                <ul className="mb-8 grid gap-3">
                                    {t.packageFeatures.map((f) => (
                                        <li key={f.key} className="flex items-start gap-3 text-[15px] font-bold leading-snug text-ink">
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral/15">
                                                <Check className="h-3.5 w-3.5 text-coral-deep" aria-hidden />
                                            </span>
                                            <span>{f.node}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="https://lin.ee/N4QXdJL"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex h-14 items-center gap-2 rounded-full bg-coral-deep px-9 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
                                >
                                    {t.planCta}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                                </a>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn>
                    <p className="mb-4 text-sm font-bold tracking-wider text-ink-sub">{t.singleTitle}</p>
                    <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:p-4">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="bg-navy text-white">
                                        <th className="rounded-l-xl px-4 py-4 text-sm font-bold md:px-8">{t.thService}</th>
                                        <th className="hidden px-4 py-4 text-sm font-bold sm:table-cell md:px-8">{t.thType}</th>
                                        <th className="rounded-r-xl px-4 py-4 text-sm font-bold md:px-8">{t.thPrice}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {t.rows.map((row, i) => (
                                        <tr
                                            key={row.key}
                                            className={`transition-colors hover:bg-cream ${i > 0 ? "border-t border-line" : ""}`}
                                        >
                                            <td className="px-4 py-5 text-[15px] font-bold text-ink md:px-8">
                                                {row.service}
                                            </td>
                                            <td className="hidden px-4 py-5 text-sm text-ink-sub sm:table-cell md:px-8">
                                                {row.type}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-5 text-[15px] font-bold text-ink md:px-8">
                                                {row.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p className="mt-6 max-w-[40em] text-sm leading-[2] text-ink-sub">
                        {t.note}
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
