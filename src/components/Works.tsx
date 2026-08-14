// Server Component — 制作実績＋お客様の声（sample世界観ブラッシュアップ版）
// クリーム地・セリフ見出し・白カード＋影＋ホバー。実名・レビューは旧サイト掲載済みの一次情報

import React from "react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading, serif } from "@/components/ui/SerifHeading";

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
        name: "ECCジュニア 一里山教室様",
        label: "教育・スクール",
        image: work4,
        review: (
            <>ホームページ制作のお願いから公開まで迅速に対応していただけました。Webに関する知識が全くなかったのですが、丁寧に説明していただき、安心して依頼をすることができました。写真選びなども親身に対応してくださり、感謝しています。LINEを使ってフランクな形でやり取りができるのも大変<span className="nowrap">良かったです！</span></>
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
];

const otherWorks = [
    { name: "Colours Musical Studio様", image: work2 },
    { name: "まや子どもの家様", image: work3 },
    { name: "Yuma English House様", image: work8 },
    { name: "DANCE STUDIO PLUS様", image: work9 },
    { name: "K-coaching様", image: work11 },
    { name: "株式会社ビビッドディレクション様", image: work6 },
    { name: "株式会社ワナビィ様", image: work7 },
];

export function Works() {
    return (
        <section className="relative overflow-hidden bg-cream px-4 py-16 md:px-6 md:py-24">

            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <SerifHeading en="Works" jp="制作実績" />
                    <p className="lead -mt-6 mb-10 text-[15px] leading-[2] tracking-[0.03em] text-ink-sub md:mb-14">
                        スクールから企業サイトまで、50社以上の制作・支援実績があります。
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
                                    <p className="flex-1 text-sm leading-[2] text-ink-sub">{work.review}</p>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>

                {/* その他の実績（ピル型チップ） */}
                <FadeIn>
                    <div className="flex flex-wrap gap-3">
                        {otherWorks.map((work) => (
                            <div
                                key={work.name}
                                className="flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 shadow-[0_8px_20px_rgba(31,26,20,0.05)]"
                            >
                                <span className="relative block h-9 w-9 overflow-hidden rounded-full">
                                    <Image
                                        src={work.image}
                                        alt={`${work.name}のホームページ`}
                                        fill
                                        className="object-cover object-top"
                                        placeholder="blur"
                                        sizes="36px"
                                    />
                                </span>
                                <span className="text-sm font-bold text-ink">{work.name}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-sm text-ink-sub">
                        ※ クライアント様のプライバシー保護のため、一部のみ掲載しております。
                    </p>
                </FadeIn>

            </div>
        </section>
    );
}
