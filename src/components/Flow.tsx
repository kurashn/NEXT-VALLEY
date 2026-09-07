// Server Component — ご依頼の流れ（sample世界観ブラッシュアップ版）
// クリーム地・セリフ数字＋矢印でつなぐ4ステップ

import React from "react";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading, serif } from "@/components/ui/SerifHeading";
import { type Lang } from "@/i18n";

const ja = {
    heading: "ご依頼の流れ",
    steps: [
        {
            title: "ご相談",
            body: <>LINEまたはメールでご連絡ください。「今のサイトのURLを送るだけ」で<span className="nowrap">大丈夫です。</span></>,
        },
        {
            title: "無料Web集客診断",
            body: <>ホームページ・検索・Googleマップ・SNS・問い合わせ導線を拝見し、問題点と原因、直す順番を診断書にしてお返しします。ここまで費用は<span className="nowrap">かかりません。</span></>,
        },
        {
            title: "必要な施策だけ改善",
            body: <>制作・SEO・MEO・SNS・AI活用の中から、診断で見つかった原因に効くものだけをご提案します。ご自身で直せる箇所は、そのやり方も<span className="nowrap">お伝えします。</span></>,
        },
        {
            title: "月額伴走",
            body: <>改善して終わりではなく、アクセスと問い合わせの数字を毎月レポートで確認しながら、次の一手を<span className="nowrap">打ち続けます。</span></>,
        },
    ],
};
const en: typeof ja = {
    heading: "How it works",
    steps: [
        {
            title: "Get in touch",
            body: <>Message us on LINE or by email. Sending the URL of your current site is enough to get started.</>,
        },
        {
            title: "Free marketing check-up",
            body: <>We review your website, search visibility, Google Maps, social media, and inquiry flow — and send you a written report: what&apos;s wrong, why, and what to fix first. Free of charge.</>,
        },
        {
            title: "Fix only what matters",
            body: <>From web production, SEO, Google Maps, social media, and AI, we propose only what addresses the causes we found. If something is easy to fix yourself, we&apos;ll show you how.</>,
        },
        {
            title: "Monthly partnership",
            body: <>Improvement isn&apos;t a one-off. We track traffic and inquiries in a monthly report and keep making the next move together.</>,
        },
    ],
};
const copy: Record<Lang, typeof ja> = { ja, en };

export function Flow({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-cream px-4 py-16 md:px-6 md:py-24">

            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <SerifHeading en="Flow" jp={t.heading} />
                </FadeIn>

                <ol className="flex flex-col items-stretch gap-3 md:flex-row md:gap-0">
                    {t.steps.map((s, i) => (
                        <React.Fragment key={s.title}>
                            {i > 0 && (
                                <li
                                    aria-hidden
                                    className="flex list-none items-center justify-center py-1 md:px-1 md:py-0"
                                >
                                    <ChevronRight className="h-6 w-6 rotate-90 text-coral md:rotate-0" />
                                </li>
                            )}
                            <li className="flex-1 list-none">
                                <FadeIn delay={i * 0.08} className="h-full">
                                    <div className="group flex h-full flex-col rounded-2xl bg-white p-7 shadow-[0_16px_40px_rgba(31,26,20,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(31,26,20,0.1)]">
                                        <div className="mb-5">
                                            <p className="mb-1 text-xs font-bold tracking-[0.3em] text-coral-deep">STEP</p>
                                            <p
                                                className="text-4xl font-bold leading-none text-coral md:text-5xl"
                                                style={{ fontFamily: serif }}
                                            >
                                                {String(i + 1).padStart(2, "0")}
                                            </p>
                                        </div>
                                        <h3 className="mb-4 text-base font-bold leading-snug text-ink md:text-lg">
                                            {s.title}
                                        </h3>
                                        <p className="text-sm leading-[2] text-ink-sub">{s.body}</p>
                                    </div>
                                </FadeIn>
                            </li>
                        </React.Fragment>
                    ))}
                </ol>
            </div>
        </section>
    );
}
