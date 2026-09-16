// Server Component — 支援する範囲（4つの段階）
// 各段階で「月額に含むこと」と「別途お見積もりのこと」を分けて書く

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading, serif } from "@/components/ui/SerifHeading";
import { type Lang } from "@/i18n";

type Stage = {
    key: string;
    step: string;
    title: string;
    body: React.ReactNode;
    included: string[];
    optional: string[];
};

const ja = {
    label: "支援する範囲",
    lead: (
        <>
            体験申込までは、4つの段階に分かれます。どこでつまずいているかによって、やることが変わります。
            <br className="hidden md:block" />
            月額のホームページ制作・管理に含むことと、別途お見積もりになることを分けて<span className="nowrap">書きました。</span>
        </>
    ),
    includedLabel: "月額に含む",
    optionalLabel: "別途お見積もり",
    stages: [
        {
            key: "find",
            step: "01",
            title: "見つけてもらう",
            body: <>保護者は「地域名＋教室名」で検索し、Googleマップと検索結果を見比べます。まず、探している人の目に入ることが<span className="nowrap">必要です。</span></>,
            included: ["ページの基本的な検索向け設定（タイトル・説明文）", "スマートフォンでの表示"],
            optional: ["Googleマップ（MEO）の整備・運用", "継続的なSEO支援"],
        },
        {
            key: "tell",
            step: "02",
            title: "教室の魅力を伝える",
            body: <>対象年齢・場所・料金・講師・雰囲気。保護者が知りたいことが揃っていないと、比べる前に<span className="nowrap">離れます。</span></>,
            included: ["10ページまでの制作", "写真やお知らせの差し替え（回数の制限なし）", "クラス・料金・アクセスの見せ方の設計"],
            optional: ["写真撮影", "ロゴ・チラシなどの制作"],
        },
        {
            key: "apply",
            step: "03",
            title: "相談・体験申込に進んでもらう",
            body: <>申込の入口が分かりにくいと、興味を持った人でも止まります。どこからでも1回で申し込める形に<span className="nowrap">します。</span></>,
            included: ["申込ボタンと問い合わせフォームの設置", "LINEへのリンク設置"],
            optional: ["LINE公式アカウントの構築・運用", "予約や自動返信の仕組みづくり"],
        },
        {
            key: "improve",
            step: "04",
            title: "数字を見て改善する",
            body: <>公開して終わりにせず、来た人数と申込の数を見ながら、次に直す場所を<span className="nowrap">決めます。</span></>,
            included: ["公開後の修正・更新（回数の制限なし）"],
            optional: ["アクセスと申込の計測", "毎月のレポートと改善提案", "改善の実行"],
        },
    ] as Stage[],
};

const en: typeof ja = {
    label: "What we help with",
    lead: (
        <>
            Getting to a trial booking has four stages. What needs doing depends on where people drop off. Below, what the monthly plan covers is separated from what is quoted separately.
        </>
    ),
    includedLabel: "In the monthly plan",
    optionalLabel: "Quoted separately",
    stages: [
        {
            key: "find",
            step: "01",
            title: "Be found",
            body: <>Parents search for your area and your school, then compare what they see on Google Maps and in search results.</>,
            included: ["Basic search settings (title and description)", "Mobile display"],
            optional: ["Google Maps (MEO) setup and management", "Ongoing SEO support"],
        },
        {
            key: "tell",
            step: "02",
            title: "Show what your school is like",
            body: <>Ages, location, fees, teachers, atmosphere. If those are missing, people leave before comparing.</>,
            included: ["Up to 10 pages", "Photo and news updates, no limit on how often", "Layout for classes, fees and access"],
            optional: ["Photography", "Logo and print design"],
        },
        {
            key: "apply",
            step: "03",
            title: "Make enquiring easy",
            body: <>If the way to book is hard to find, interested people stop there. We make it one tap from any page.</>,
            included: ["Booking buttons and a contact form", "A link to your LINE account"],
            optional: ["LINE official account setup and operation", "Booking and auto-reply systems"],
        },
        {
            key: "improve",
            step: "04",
            title: "Improve with the numbers",
            body: <>After launch we look at visits and bookings to decide what to fix next.</>,
            included: ["Edits and updates after launch, no limit on how often"],
            optional: ["Tracking visits and bookings", "Monthly reporting and proposals", "Carrying out the improvements"],
        },
    ] as Stage[],
};

const copy: Record<Lang, typeof ja> = { ja, en };

export function Service({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-base px-4 py-16 md:px-6 md:py-24">
            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <SerifHeading en="Support" jp={t.label} />
                    <p className="lead -mt-6 mb-10 text-[15px] leading-[2] tracking-[0.03em] text-ink-sub md:mb-14">
                        {t.lead}
                    </p>
                </FadeIn>

                <ol className="grid gap-4 md:grid-cols-2">
                    {t.stages.map((s, i) => (
                        <li key={s.key} className="list-none">
                            <FadeIn delay={i * 0.06} className="h-full">
                                <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 md:p-8">
                                    <div className="mb-4 flex items-baseline gap-4">
                                        <span className="text-[26px] font-bold leading-none text-coral" style={{ fontFamily: serif }}>
                                            {s.step}
                                        </span>
                                        <h3 className="text-[19px] font-bold leading-snug text-ink">{s.title}</h3>
                                    </div>
                                    <p className="mb-6 text-[14.5px] leading-[2] text-ink-sub">{s.body}</p>

                                    <div className="mt-auto grid gap-4">
                                        <div>
                                            <p className="mb-2 inline-block rounded-full bg-coral/15 px-3 py-1 text-[11.5px] font-bold text-coral-deep">
                                                {t.includedLabel}
                                            </p>
                                            <ul className="grid gap-1.5">
                                                {s.included.map((x) => (
                                                    <li key={x} className="text-[13.5px] leading-[1.8] text-ink">
                                                        {x}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="border-t border-line pt-4">
                                            <p className="mb-2 inline-block rounded-full border border-line px-3 py-1 text-[11.5px] font-bold text-ink-sub">
                                                {t.optionalLabel}
                                            </p>
                                            <ul className="grid gap-1.5">
                                                {s.optional.map((x) => (
                                                    <li key={x} className="text-[13.5px] leading-[1.8] text-ink-sub">
                                                        {x}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
