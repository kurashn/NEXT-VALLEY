// Server Component — 制作実績＋お客様の声（sample世界観ブラッシュアップ版）
// クリーム地・セリフ見出し・白カード＋影＋ホバー。実名・レビューは旧サイト掲載済みの一次情報

import React from "react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading, serif } from "@/components/ui/SerifHeading";
import { WorksCarousel, type WorkItem } from "@/components/WorksCarousel";
import { type Lang } from "@/i18n";

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
import work22 from "@/images/works/works22.jpg";

/* 画像（言語共通。順序は copy.featured / copy.others と一致させる） */
const featuredImages = [work1, work5, work8];
const otherImages = [
    work22, work12, work14, work15, work16, work17, work19, work18, work20, work13,
    work6, work7, work4, work2, work3, work21, work9, work11,
];

type FeaturedCopy = { name: string; label: string; review: React.ReactNode; caption?: string };
type OtherCopy = { name: string; label: string };

/* ── 文言（日本語 / 英語） ── */
const ja = {
    heading: "制作実績",
    lead: "不動産・建設・EC・フィットネス・情報メディア・スクールまで、50社以上の制作・支援実績があります。",
    imageAlt: (name: string) => `${name}のホームページ`,
    featured: [
        {
            name: "Tulip Ballet Studio様",
            label: "教育・スクール",
            review: (
                <><p>非常に丁寧に、かつ、希望どおり作成していただきました！ウェブ関係はまったくわからず、毎回質問したりしていましたが、いつも丁寧に優しく答えてくださいました。</p><p>また、様々な提案もしてくださり、想像以上の素敵なホームページを作成していただきました。依頼して本当に良かったと実感して<span className="nowrap">おります。</span></p></>
            ),
        },
        {
            name: "Rythmique Garden様",
            label: "教育・スクール",
            review: (
                <><p>初めてのホームページ作成で、何も分からずほぼ全てお任せだったのですが、一つ一つ、丁寧に教えてくださいました。</p><p>また、様々な提案もしてくださり、想像以上の素敵なホームページを作成していただきました。依頼して本当に良かったと実感して<span className="nowrap">おります。</span></p></>
            ),
        },
        {
            name: "Yuma English House様",
            label: "教育・スクール",
            review: (
                <><p>英語教室のホームページと、英検対策コースのページの2つを制作していただきました。</p><p>それぞれ見ていただきたい方が違うので、分けて作るというご提案はとてもありがたかったです。お問い合わせの内容が具体的になり、ご案内もしやすく<span className="nowrap">なりました。</span></p></>
            ),
        },
    ] as FeaturedCopy[],
    others: [
        { name: "Matsumi様", label: "理容・美容" },
        { name: "BowlingNavi -ボウナビ- 様", label: "メディア・情報サイト" },
        { name: "久和不動産株式会社様", label: "不動産" },
        { name: "株式会社西辻工務店様", label: "不動産・建設" },
        { name: "イースタンホーク様", label: "不動産サービス" },
        { name: "株式会社アイ・セカンド様", label: "企業サイト" },
        { name: "I-SECOND STORE様", label: "ECサイト" },
        { name: "パーソナルジムMe様", label: "フィットネス" },
        { name: "黒鳥墓地様", label: "霊園" },
        { name: "タイ北部チェンマイ情報ステーション様", label: "メディア" },
        { name: "株式会社ビビッドディレクション様", label: "企業サイト" },
        { name: "株式会社ワナビィ様", label: "企業サイト" },
        { name: "ECCジュニア 一里山教室様", label: "教育・スクール" },
        { name: "Colours Musical Studio様", label: "教育・スクール" },
        { name: "まや子どもの家様", label: "教育・スクール" },
        { name: "Yuma English House 英検対策コース様", label: "教育・スクール（LP）" },
        { name: "DANCE STUDIO PLUS様", label: "教育・スクール" },
        { name: "K-coaching様", label: "教育・スクール" },
    ] as OtherCopy[],
    note: "※ クライアント様のプライバシー保護のため、一部のみ掲載しております。",
};
const en: typeof ja = {
    heading: "Our work",
    lead: "Over 50 businesses served, from real estate and construction to e-commerce, fitness, online media, and schools.",
    imageAlt: (name: string) => `Website for ${name}`,
    featured: [
        {
            name: "Tulip Ballet Studio",
            label: "Education & Schools",
            review: (
                <>They built exactly what we asked for, and with real care. I knew nothing about websites and had questions at every step, but they always answered kindly and patiently. They also came up with all sorts of ideas, and the site turned out even nicer than I&apos;d imagined. I&apos;m truly glad we asked them.</>
            ),
        },
        {
            name: "Rythmique Garden",
            label: "Education & Schools",
            review: (
                <>It was our first website and I had no idea what I was doing, so I left almost everything to them &mdash; and they walked me through it one step at a time. They also suggested lots of ideas, and the site turned out even nicer than I&apos;d imagined. I&apos;m truly glad we asked them.</>
            ),
        },
        {
            name: "Yuma English House",
            label: "Education & Schools",
            review: (
                <><p>They built two things for us: the school&apos;s main website and a separate page for our Eiken prep course. The two reach different audiences, so their suggestion to keep them apart was very welcome. The inquiries we receive are now much more specific, which makes them easier to answer.</p></>
            ),
        },
    ],
    others: [
        { name: "Matsumi", label: "Barbershop" },
        { name: "BowlingNavi", label: "Media & Information Site" },
        { name: "KyuWa Estate Co., Ltd.", label: "Real Estate" },
        { name: "Nishitsuji Construction Co., Ltd.", label: "Real Estate & Construction" },
        { name: "Eastern Hawk", label: "Real Estate Services" },
        { name: "I-SECOND Co., Ltd.", label: "Corporate Website" },
        { name: "I-SECOND STORE", label: "E-commerce" },
        { name: "Personal Gym Me", label: "Fitness" },
        { name: "Kurotori Bochi", label: "Cemetery" },
        { name: "Chiang Mai Info Station (Northern Thailand)", label: "Media" },
        { name: "Vivid Direction Co., Ltd.", label: "Corporate Website" },
        { name: "Wannabe Co., Ltd.", label: "Corporate Website" },
        { name: "ECC Junior Ichiriyama", label: "Education & Schools" },
        { name: "Colours Musical Studio", label: "Education & Schools" },
        { name: "Maya Children's House", label: "Education & Schools" },
        { name: "Yuma English House: Eiken Prep Course", label: "Education & Schools (Landing Page)" },
        { name: "DANCE STUDIO PLUS", label: "Education & Schools" },
        { name: "K-coaching", label: "Education & Schools" },
    ],
    note: "To protect our clients' privacy, only a selection of our work is shown here.",
};
const copy: Record<Lang, typeof ja> = { ja, en };

export function Works({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    const featuredWorks = t.featured.map((w, i) => ({ ...w, image: featuredImages[i] }));
    const otherWorks: WorkItem[] = t.others.map((w, i) => ({ ...w, image: otherImages[i] }));
    return (
        <section className="relative overflow-hidden bg-cream px-4 py-16 md:px-6 md:py-24">

            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <SerifHeading en="Works" jp={t.heading} />
                    <p className="lead -mt-6 mb-10 text-[15px] leading-[2] tracking-[0.03em] text-ink-sub md:mb-14">
                        {t.lead}
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
                                        alt={t.imageAlt(work.name)}
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
                                    <div className="flex-1 text-sm leading-[2] text-ink-sub [&>p]:leading-[2] [&>p+p]:mt-3">
                                        {work.review ?? work.caption}
                                    </div>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>

                {/* その他の実績（スライダー） */}
                <FadeIn>
                    <WorksCarousel items={otherWorks} lang={lang} />
                    <p className="mt-8 text-sm text-ink-sub">
                        {t.note}
                    </p>
                </FadeIn>

            </div>
        </section>
    );
}
