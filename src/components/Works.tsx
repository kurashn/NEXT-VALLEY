// Server Component — 制作実績＋お客様の声（sample世界観ブラッシュアップ版）
// クリーム地・セリフ見出し・白カード＋影＋ホバー。実名・レビューは旧サイト掲載済みの一次情報

import React from "react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading, serif } from "@/components/ui/SerifHeading";
import { WorksCarousel } from "@/components/WorksCarousel";

// Featured Works
import work1 from "@/images/works/works1.jpg";
import work4 from "@/images/works/works4.jpg";
import work5 from "@/images/works/works5.jpg";

// Other Works
import work2 from "@/images/works/works2.jpg";
import work3 from "@/images/works/works3.jpg";
import work6 from "@/images/works/works6.jpg";
import work7 from "@/images/works/works7.jpg";
import work8 from "@/images/works/works8.jpg";
import work9 from "@/images/works/works9.jpg";
import work11 from "@/images/works/works11.jpg";
import work12 from "@/images/works/works12.jpg";
import work13 from "@/images/works/works13.jpg";
import work14 from "@/images/works/works14.jpg";
import work15 from "@/images/works/works15.jpg";
import work16 from "@/images/works/works16.jpg";
import work17 from "@/images/works/works17.jpg";
import work18 from "@/images/works/works18.jpg";
import work19 from "@/images/works/works19.jpg";
import work20 from "@/images/works/works20.jpg";
import work21 from "@/images/works/works21.jpg";

const featuredWorks = [
    {
        name: "Tulip Ballet Studio様",
        label: "教育・スクール",
        image: work1,
        review: (
            <>非常に丁寧に、かつ、希望どおり作成していただきました！ウェブ関係はまったくわからず、毎回質問したりしていましたが、いつも丁寧に優しく答えてくださいました。また、様々な提案もしてくださり、想像以上の素敵なホームページを作成していただきました。依頼して本当に良かったと実感して<span className="nowrap">おります。</span></>
        ),
    },
    {
        name: "Rythmique Garden様",
        label: "教育・スクール",
        image: work5,
        review: (
            <>初めてのホームページ作成で、何も分からずほぼ全てお任せだったのですが、一つ一つ、丁寧に教えてくださいました。また、様々な提案もしてくださり、想像以上の素敵なホームページを作成していただきました。依頼して本当に良かったと実感して<span className="nowrap">おります。</span></>
        ),
    },
    {
        name: "Yuma English House様",
        label: "教育・スクール",
        image: work8,
        review: null,
        caption: "英語教室のホームページに加えて、英検対策コースのランディングページも制作。集客の入口を2つに増やした事例です。",
    },
];

const otherWorks: { name: string; label: string; image: typeof work1 }[] = [
    { name: "BowlingNavi -ボウナビ- 様", label: "メディア・情報サイト", image: work12 },
    { name: "久和不動産株式会社様", label: "不動産", image: work14 },
    { name: "株式会社西辻工務店様", label: "不動産・建設", image: work15 },
    { name: "イースタンホーク様", label: "不動産サービス", image: work16 },
    { name: "株式会社アイ・セカンド様", label: "企業サイト", image: work17 },
    { name: "I-SECOND STORE様", label: "ECサイト", image: work19 },
    { name: "パーソナルジムMe様", label: "フィットネス", image: work18 },
    { name: "黒鳥墓地様", label: "霊園", image: work20 },
    { name: "タイ北部チェンマイ情報ステーション様", label: "メディア", image: work13 },
    { name: "株式会社ビビッドディレクション様", label: "企業サイト", image: work6 },
    { name: "株式会社ワナビィ様", label: "企業サイト", image: work7 },
    { name: "ECCジュニア 一里山教室様", label: "教育・スクール", image: work4 },
    { name: "Colours Musical Studio様", label: "教育・スクール", image: work2 },
    { name: "まや子どもの家様", label: "教育・スクール", image: work3 },
    { name: "Yuma English House 英検対策コース様", label: "教育・スクール（LP）", image: work21 },
    { name: "DANCE STUDIO PLUS様", label: "教育・スクール", image: work9 },
    { name: "K-coaching様", label: "教育・スクール", image: work11 },
];

export function Works() {
    return (
        <section className="relative overflow-hidden bg-cream px-4 py-16 md:px-6 md:py-24">

            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <SerifHeading en="Works" jp="制作実績" />
                    <p className="lead -mt-6 mb-10 text-[15px] leading-[2] tracking-[0.03em] text-ink-sub md:mb-14">
                        不動産・建設・EC・フィットネス・情報メディア・スクールまで、50社以上の制作・支援実績があります。
                    </p>
                </FadeIn>

                {/* お客様の声つきの実績 */}
                <div className="mb-10 grid gap-6 md:mb-14 lg:grid-cols-3">
                    {featuredWorks.map((work, i) => (
                        <FadeIn key={work.name} delay={i * 0.08} className="flex">
                            <article className="group flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(31,26,20,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(31,26,20,0.1)]">
                                <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: "995 / 580" }}>
                                    <Image
                                        src={work.image}
                                        alt={`${work.name}のホームページ`}
                                        fill
                                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                                        placeholder="blur"
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-6 md:p-7">
                                    <p className="mb-3">
                                        <span className="rounded-full bg-cream px-3 py-1 text-xs text-ink-sub">
                                            {work.label}
                                        </span>
                                    </p>
                                    <h3 className="mb-4 text-lg font-bold text-ink">{work.name}</h3>
                                    <p className="flex-1 text-sm leading-[2] text-ink-sub">
                                        {work.review ?? work.caption}
                                    </p>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>

                {/* その他の実績（スライダー） */}
                <FadeIn>
                    <WorksCarousel items={otherWorks} />
                    <p className="mt-8 text-sm text-ink-sub">
                        ※ クライアント様のプライバシー保護のため、一部のみ掲載しております。
                    </p>
                </FadeIn>

            </div>
        </section>
    );
}
