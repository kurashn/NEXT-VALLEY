// Server Component — 料金（sample世界観ブラッシュアップ版）
// 【仮】金額は仮の目安。正式料金が確定次第 rows を差し替える

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading } from "@/components/ui/SerifHeading";

/* おすすめパッケージの内容（金額は仮） */
const packageFeatures = [
    { key: "hp", node: <>成果から逆算した<span className="nowrap">ホームページ制作</span></> },
    { key: "seo", node: <>SEO・MEO集客の<span className="nowrap">設計と運用</span></> },
    { key: "report", node: <>毎月のアクセス・<span className="nowrap">問い合わせレポート</span></> },
    { key: "ops", node: <>公開後の更新・改善も<span className="nowrap">おまかせ</span></> },
];

const rows = [
    { key: "lp", service: <>LP制作</>, type: "買い切り", price: "¥110,000〜" },
    { key: "hp", service: <>ホームページ制作</>, type: "買い切り", price: "¥220,000〜" },
    { key: "seo", service: <>SEO・MEO集客</>, type: "月額", price: "¥33,000〜/月" },
    { key: "sns", service: <>SNSマーケティング</>, type: "月額", price: "¥44,000〜/月" },
    { key: "design", service: <>デザイン制作<span className="nowrap">（ロゴ・チラシ等）</span></>, type: "スポット", price: "応相談" },
    { key: "ai", service: <><span className="nowrap">AI活用</span><span className="nowrap">コンサルティング</span></>, type: "スポット / 月額", price: "応相談" },
    { key: "tool", service: <>HP運用ツール<span className="nowrap">『SiteChat』</span></>, type: "SaaS", price: <a href="https://sitechat.jp/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold text-coral-deep underline underline-offset-4">サイトを見る</a> },
];

export function Pricing() {
    return (
        <section className="relative overflow-hidden bg-base px-4 py-16 md:px-6 md:py-24">

            <div className="relative mx-auto max-w-5xl">
                <FadeIn>
                    <SerifHeading en="Price" jp="料金" />
                    <p className="lead -mt-6 mb-10 text-[15px] leading-[2] tracking-[0.03em] text-ink-sub md:mb-14">
                        ご提案・お見積もりまでは無料です。まず内容と金額を見てから、判断してください。
                    </p>
                </FadeIn>

                {/* おすすめパッケージ */}
                <FadeIn>
                    <div className="relative mb-8 overflow-hidden rounded-2xl bg-white shadow-[0_20px_48px_rgba(31,26,20,0.1)] md:mb-10">
                        <span className="absolute right-0 top-0 z-10 rounded-bl-xl bg-coral px-5 py-2 text-[13px] font-bold tracking-wider text-navy-deep">
                            おすすめ
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
                                        まるごと集客プラン
                                    </h3>
                                    <p className="mb-8 text-sm leading-[1.9] text-navy-sub">
                                        「作る」と「集める」をセットで。この分業をなくすことが、いちばん成果に<span className="nowrap">つながります。</span>
                                    </p>
                                    <p>
                                        <span className="nowrap">
                                            <span className="text-sm text-navy-sub">初期</span>{" "}
                                            <span className="text-4xl font-bold tabular-nums">¥165,000</span>
                                            <span className="text-sm">〜</span>
                                        </span>
                                        <br />
                                        <span className="nowrap">
                                            <span className="text-sm text-navy-sub">＋ 月額</span>{" "}
                                            <span className="text-4xl font-bold tabular-nums">¥44,000</span>
                                            <span className="text-sm">〜（税込）</span>
                                        </span>
                                    </p>
                                </div>
                                <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full bg-coral" />
                            </div>
                            {/* 右: 内訳とCTA */}
                            <div className="flex-1 p-8 md:p-10">
                                <p className="mb-4 text-xs font-bold tracking-[0.2em] text-ink-sub">プランに含まれるもの</p>
                                <ul className="mb-8 grid gap-3">
                                    {packageFeatures.map((f) => (
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
                                    このプランで無料診断を受ける
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                                </a>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn>
                    <p className="mb-4 text-sm font-bold tracking-wider text-ink-sub">単品でのご依頼</p>
                    <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:p-4">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="bg-navy text-white">
                                        <th className="rounded-l-xl px-4 py-4 text-sm font-bold md:px-8">サービス</th>
                                        <th className="hidden px-4 py-4 text-sm font-bold sm:table-cell md:px-8">形態</th>
                                        <th className="rounded-r-xl px-4 py-4 text-sm font-bold md:px-8">目安（税込）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, i) => (
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
                        内容により変動します。正式な金額は無料のお見積もりでご提示します。追加料金が発生する場合は、必ず事前に<span className="nowrap">お伝えします。</span>
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
