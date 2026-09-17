// Server Component — よくある悩み（一般向け／教室向けの2種類）

import React from "react";
import Image, { type StaticImageData } from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { type Lang } from "@/i18n";

import photoEnglish from "@/images/problem-english.webp";
import photoDance from "@/images/problem-dance.webp";
import photoMusic from "@/images/problem-music.webp";

const photos: StaticImageData[] = [photoEnglish, photoDance, photoMusic, photoEnglish];

export type Audience = "general" | "classroom";

const jaGeneral = {
    heading: (
        <>
            Web担当がいない会社・お店から、
            <br />
            よくうかがう悩みです。
        </>
    ),
    lead: "どれも「事業が良くないから」ではありません。多くは、問い合わせや予約までの道が分かりにくいことが原因です。",
    problems: [
        {
            title: <>Web担当がいない。<br className="hidden md:block" />誰に頼めばいいか分からない</>,
            body: <>更新も直しも後回し。制作会社に頼むと高そうで、相談する前に<span className="nowrap">止まっている。</span></>,
        },
        {
            title: <>ホームページが古く、<br className="hidden md:block" />更新できていない</>,
            body: <>料金もメニューも変わったのに直せないまま。スマートフォンで見ると<span className="nowrap">読みにくい。</span></>,
        },
        {
            title: <>Instagramを頑張っても、<br className="hidden md:block" />問い合わせにつながらない</>,
            body: <>投稿は続けているが、見た人が次にどこへ行けばいいのかが<span className="nowrap">示せていない。</span></>,
        },
        {
            title: <>Googleマップ・HP・LINEが、<br className="hidden md:block" />つながっていない</>,
            body: <>それぞれはある。ただ、地図で見つけた人がそのまま予約や問い合わせに<span className="nowrap">進めない。</span></>,
        },
    ],
    bannerLead: "Googleマップも、ホームページも、LINEもある。",
    bannerTitle: (
        <>
            <span className="nowrap">それでも、</span>
            <span className="nowrap"><span className="text-coral">問い合わせまでの道</span>が</span>
            <span className="nowrap">つながっていないことがあります。</span>
        </>
    ),
};

const ja: typeof jaGeneral = {
    heading: (
        <>
            教室の先生から、
            <br />
            よくうかがう悩みです。
        </>
    ),
    lead: "どれも「教室が良くないから」ではありません。多くは、体験申込までの道が分かりにくいことが原因です。",
    problems: [
        {
            title: <>教室の良さが、<br className="hidden md:block" />Webで伝わらない</>,
            body: <>レッスンの雰囲気も先生の人柄も良いのに、ホームページからはそれが<span className="nowrap">分からない。</span></>,
        },
        {
            title: <>Instagramを頑張っても、<br className="hidden md:block" />申込につながらない</>,
            body: <>投稿は続けているが、見た人が次にどこへ行けばいいのかが<span className="nowrap">示せていない。</span></>,
        },
        {
            title: <>ホームページが古く、<br className="hidden md:block" />更新できていない</>,
            body: <>料金も講師も変わったのに直せないまま。スマートフォンで見ると文字が<span className="nowrap">小さい。</span></>,
        },
        {
            title: <>Webに時間を使えず、<br className="hidden md:block" />本業に集中したい</>,
            body: <>直したい所は分かっている。ただ、レッスンと事務の合間に手を付ける時間が<span className="nowrap">ない。</span></>,
        },
    ],
    bannerLead: "Googleマップも、ホームページも、LINEもある。",
    bannerTitle: (
        <>
            <span className="nowrap">それでも、</span>
            <span className="nowrap"><span className="text-coral">申込までの道</span>が</span>
            <span className="nowrap">つながっていないことがあります。</span>
        </>
    ),
};

const enGeneral: typeof jaGeneral = {
    heading: (
        <>
            What small businesses
            <br />
            tell us most often.
        </>
    ),
    lead: "None of this means the business isn't good. Usually the path to an enquiry or a booking is simply hard to follow.",
    problems: [
        {
            title: <>Nobody handles the web,<br className="hidden md:block" /> and who to ask is unclear</>,
            body: <>Updates and fixes keep getting postponed. Agencies seem expensive, so the question never gets asked.</>,
        },
        {
            title: <>The site is old<br className="hidden md:block" /> and never updated</>,
            body: <>Prices and menus have changed, and the text is hard to read on a phone.</>,
        },
        {
            title: <>Instagram takes effort<br className="hidden md:block" /> but brings no enquiries</>,
            body: <>Posts keep going up, yet nobody is told where to go next.</>,
        },
        {
            title: <>Google Maps, the site and LINE<br className="hidden md:block" /> don't connect</>,
            body: <>Each one exists, but someone who finds you on the map can't get straight to a booking.</>,
        },
    ],
    bannerLead: "Google Maps, a website, LINE: you may already have them all.",
    bannerTitle: (
        <>
            <span className="nowrap">Even then, </span>
            <span className="nowrap">the <span className="text-coral">path to an enquiry</span></span>
            <span className="nowrap"> is often broken.</span>
        </>
    ),
};

const en: typeof jaGeneral = {
    heading: (
        <>
            What teachers
            <br />
            tell us most often.
        </>
    ),
    lead: "None of this means the school isn't good. Usually the path to a trial booking is simply hard to follow.",
    problems: [
        {
            title: <>The website doesn&apos;t show<br className="hidden md:block" /> what the school is like</>,
            body: <>The lessons and the teacher are great, but none of that comes through online.</>,
        },
        {
            title: <>Instagram takes effort<br className="hidden md:block" /> but brings no bookings</>,
            body: <>Posts keep going up, yet nobody is told where to go next.</>,
        },
        {
            title: <>The site is old<br className="hidden md:block" /> and never updated</>,
            body: <>Fees and teachers have changed, and the text is tiny on a phone.</>,
        },
        {
            title: <>No time for the web,<br className="hidden md:block" /> teaching comes first</>,
            body: <>You know what needs fixing. There is just no time between lessons and admin.</>,
        },
    ],
    bannerLead: "Google Maps, a website, LINE — you may already have them all.",
    bannerTitle: (
        <>
            <span className="nowrap">Even then, </span>
            <span className="nowrap">the <span className="text-coral">path to a booking</span></span>
            <span className="nowrap"> is often broken.</span>
        </>
    ),
};

const copy: Record<Lang, Record<Audience, typeof jaGeneral>> = {
    ja: { general: jaGeneral, classroom: ja },
    en: { general: enGeneral, classroom: en },
};

export function Problem({ lang = "ja", audience = "general" }: { lang?: Lang; audience?: Audience }) {
    const t = copy[lang][audience];
    const showPhotos = audience === "classroom";
    return (
        <section className="relative overflow-hidden bg-navy px-4 py-16 text-white md:px-6 md:py-24">
            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <h2 className="mb-5 text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold leading-[1.5] tracking-tight">
                        {t.heading}
                    </h2>
                    <p className="mb-10 max-w-[44em] text-[15px] leading-[2] text-navy-sub md:mb-14">{t.lead}</p>
                </FadeIn>

                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {t.problems.map((p, i) => (
                        <li key={i} className="list-none">
                            <FadeIn delay={i * 0.07} className="h-full">
                                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                                    {showPhotos && (<div className="relative h-28 w-full overflow-hidden">
                                        <Image
                                            src={photos[i]}
                                            alt=""
                                            fill
                                            sizes="(max-width: 640px) 100vw, 25vw"
                                            className="object-cover opacity-45"
                                        />
                                        <span
                                            aria-hidden
                                            className="absolute inset-0"
                                            style={{ background: "linear-gradient(180deg, rgba(4,22,39,0.2) 0%, rgba(4,22,39,0.92) 100%)" }}
                                        />
                                    </div>)}
                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className="mb-3 text-[16.5px] font-bold leading-snug">{p.title}</h3>
                                        <p className="text-[13.5px] leading-[2] text-navy-sub">{p.body}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        </li>
                    ))}
                </ul>

                <FadeIn>
                    <div className="mt-10 rounded-2xl border border-coral/40 bg-coral/[0.08] p-7 md:mt-12 md:p-9">
                        <p className="mb-2 text-[13px] text-navy-sub">{t.bannerLead}</p>
                        <p className="text-[clamp(1.15rem,2.6vw,1.6rem)] font-bold leading-[1.6]">{t.bannerTitle}</p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
