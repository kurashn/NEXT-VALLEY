// Server Component — 最終CTA（コンバージョン最適化版）
// ライト面のまま、中央寄せの大型パネル＋主役のLINEボタン＋安心材料

import React from "react";
import { MessageCircle, Mail, Check } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading, serif } from "@/components/ui/SerifHeading";
import { AIConsultTextLink } from "@/components/AIConsult";
import { withLang, type Lang } from "@/i18n";

const ja = {
    heading: "お問い合わせ",
    eyebrow: <>FREE CHECK &amp; PROPOSAL</>,
    title: (
        <>
            まずは、<span className="text-coral-deep">無料診断</span>から。
        </>
    ),
    lead: (
        <>
            サイトのURLやお悩みをLINEで送るだけ。改善の打ち手と概算お見積もりをまとめてお<span className="nowrap">返しします。</span>
            <br className="hidden md:block" />
            提案を見てから、頼むかどうか決めて<span className="nowrap">ください。</span>
        </>
    ),
    lineBtn: "LINEで無料診断を受ける",
    mailBtn: "メールで相談する",
    assurances: ["診断・提案・見積もりは無料", "しつこい営業なし", "全国オンライン対応"],
    stillPrefix: "まだ迷う方は →",
    selfCheck: "3分セルフ診断",
    separator: "／",
    aiConsult: "AIで課題整理",
    closing: "— 気に入らなければ、断ってください —",
};
const en: typeof ja = {
    heading: "Contact",
    eyebrow: <>FREE CHECK &amp; PROPOSAL</>,
    title: (
        <>
            Start with a <span className="text-coral-deep">free site check</span>.
        </>
    ),
    lead: (
        <>
            Just send us your website URL or a quick note on LINE. We’ll reply with concrete improvements and a ballpark quote.{" "}
            <br className="hidden md:block" />
            Read the proposal first — then decide whether to hire us.
        </>
    ),
    lineBtn: "Free site check on LINE",
    mailBtn: "Contact us by email",
    assurances: ["Free check, proposal, and quote", "No pushy sales", "Online, anywhere in Japan"],
    stillPrefix: "Still on the fence? →",
    selfCheck: "3-minute site check",
    separator: "/",
    aiConsult: "Sort it out with AI",
    closing: "— If it’s not for you, just say no —",
};
const copy: Record<Lang, typeof ja> = { ja, en };

export function CTA({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-base px-4 py-16 md:px-6 md:py-24">
            <div className="relative mx-auto max-w-5xl">
                <FadeIn>
                    <SerifHeading en="Contact" jp={t.heading} />
                </FadeIn>

                <FadeIn>
                    <div className="relative overflow-hidden rounded-[28px] bg-white px-6 py-12 text-center shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:px-16 md:py-16">
                        {/* 上辺のコーラルアクセント */}
                        <span aria-hidden className="absolute left-0 top-0 h-1.5 w-full bg-coral" />

                        <p className="mb-5 text-[13px] font-bold tracking-[0.3em] text-coral-deep">
                            {t.eyebrow}
                        </p>
                        <h3 className="mb-5 text-[clamp(1.625rem,4vw,2.75rem)] font-bold leading-[1.45] tracking-tight text-ink">
                            {t.title}
                        </h3>
                        <p className="lead mx-auto mb-10 max-w-[32em] text-[15px] leading-[2] text-ink-sub">
                            {t.lead}
                        </p>

                        {/* 主役: LINE / 従属: メール */}
                        <div className="mx-auto flex max-w-xl flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                            <a
                                href="https://lin.ee/N4QXdJL"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-sheen inline-flex h-16 items-center justify-center gap-2.5 rounded-full bg-[#05a247] px-8 text-[19px] font-bold text-white shadow-[0_12px_28px_rgba(5,162,71,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(5,162,71,0.45)] sm:flex-1"
                            >
                                <MessageCircle className="h-6 w-6" aria-hidden />
                                {t.lineBtn}
                            </a>
                            <a
                                href={withLang(lang, "/contact")}
                                className="inline-flex h-16 items-center justify-center gap-2 rounded-full border border-line bg-white px-8 text-[15px] font-bold text-ink transition-colors hover:border-coral hover:text-coral-deep"
                            >
                                <Mail className="h-5 w-5" aria-hidden />
                                {t.mailBtn}
                            </a>
                        </div>

                        {/* 安心材料 */}
                        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
                            {t.assurances.map((a) => (
                                <li key={a} className="flex items-center gap-1.5 text-sm font-bold text-ink-sub">
                                    <Check className="h-4 w-4 text-coral-deep" aria-hidden />
                                    {a}
                                </li>
                            ))}
                        </ul>

                        {/* まだ迷う人向け: 2つのセルフツールへ */}
                        <p className="mt-8 text-sm leading-[2] text-ink-sub">
                            {t.stillPrefix}{" "}
                            <a href={withLang(lang, "/shindan")} className="inline-flex min-h-11 items-center font-bold text-coral-deep underline underline-offset-4 transition-opacity hover:opacity-80">
                                {t.selfCheck}
                            </a>
                            <span className="mx-2">{t.separator}</span>
                            <AIConsultTextLink>{t.aiConsult}</AIConsultTextLink>
                        </p>

                        {/* 一言の後押し */}
                        <p className="mt-8 text-sm text-ink-sub" style={{ fontFamily: serif }}>
                            {t.closing}
                        </p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
