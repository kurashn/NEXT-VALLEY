// Server Component — よくある悩み（worries.png の再現）

import React from "react";
import Image, { type StaticImageData } from "next/image";
import { AppWindow, MousePointer2 } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeadV4, Teal, Underline } from "@/components/ui/SectionHeadV4";
import { heavy, V4 } from "@/lib/fonts-v4";
import { type Lang } from "@/i18n";

import worryUpdate from "@/images/v4/worry-update.webp";
import worryContact from "@/images/v4/worry-contact.webp";
import worryTime from "@/images/v4/worry-time.webp";

type Worry = { no: string; tag: string; title: React.ReactNode; body: React.ReactNode; img: StaticImageData; alt: string };

const jaGeneral = {
    eyebrow: "よくある悩み",
    title: (
        <>
            <span className="nowrap">Webのこと、</span>
            <span className="nowrap"><Underline>後回し</Underline>になっていませんか。</span>
        </>
    ),
    lead: "本業が忙しいと、ホームページのことまで手が回らないものです。",
    worries: [
        {
            no: "01", tag: "UPDATE", img: worryUpdate, alt: "ノートパソコンでホームページを開いている手元",
            title: <>ホームページが古いまま。<br />更新の仕方もわからない。</>,
            body: <>写真や営業時間を変えたいのに、<br className="hidden lg:block" />ついそのままになっている。</>,
        },
        {
            no: "02", tag: "CONTACT", img: worryContact, alt: "花屋の店内でスマートフォンを見る店主の手元",
            title: <>見られているのに、<br />問い合わせにつながらない。</>,
            body: <>ホームページやSNSはあるけれど、<br className="hidden lg:block" />相談や予約がなかなか増えない。</>,
        },
        {
            no: "03", tag: "TIME", img: worryTime, alt: "のこぎりで木材を切る職人の手元",
            title: <>Webに使う時間も、<br />相談できる人もいない。</>,
            body: <>日々の仕事で手いっぱい。<br className="hidden lg:block" />何から手をつければいいのか迷っている。</>,
        },
    ] as Worry[],
    bannerTitle: (
        <>
            ひとりで抱えず、<Teal>Web担当</Teal>に任せてみませんか。
        </>
    ),
    bannerLead: "制作・更新・管理から、必要に応じた集客改善まで。",
};

const enGeneral: typeof jaGeneral = {
    eyebrow: "COMMON WORRIES",
    title: (
        <>
            Is the web always <Underline>the thing that waits</Underline>?
        </>
    ),
    lead: "When the business keeps you busy, the website is the first thing to slip.",
    worries: [
        {
            no: "01", tag: "UPDATE", img: worryUpdate, alt: "Hands on a laptop showing a website",
            title: <>The site is out of date,<br />and updating it is a mystery.</>,
            body: <>Photos and opening hours need changing, but it never happens.</>,
        },
        {
            no: "02", tag: "CONTACT", img: worryContact, alt: "A florist's hands holding a phone in the shop",
            title: <>People look,<br />but nobody gets in touch.</>,
            body: <>There is a website and social media, yet enquiries and bookings stay flat.</>,
        },
        {
            no: "03", tag: "TIME", img: worryTime, alt: "A craftsman's hands sawing timber",
            title: <>No time for the web,<br />and no one to ask.</>,
            body: <>The day is full already. Where to even start is unclear.</>,
        },
    ] as Worry[],
    bannerTitle: (
        <>
            Don&apos;t carry it alone. Let a <Teal>web partner</Teal> take it on.
        </>
    ),
    bannerLead: "From build, updates and upkeep to improvements when you need them.",
};

const copy: Record<Lang, typeof jaGeneral> = { ja: jaGeneral, en: enGeneral };

export function Problem({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden px-4 py-14 md:px-6 md:py-20" style={{ backgroundColor: V4.cream }}>
            <div className="relative mx-auto max-w-6xl">
                <SectionHeadV4 word="Worries" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

                <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
                    {t.worries.map((w, i) => (
                        <li key={w.no} className="list-none">
                            <FadeIn delay={i * 0.07}>
                                <div className="overflow-hidden rounded-[14px] shadow-[0_10px_28px_rgba(20,51,90,0.08)]">
                                    <Image src={w.img} alt={w.alt} sizes="(max-width: 768px) 100vw, 33vw" className="aspect-[500/342] h-auto w-full object-cover" />
                                </div>
                                <p className="mt-4 text-[13px] font-bold tracking-[0.1em]" style={{ color: i === 1 ? V4.teal : V4.coralDeep }}>
                                    {w.no} <span className="font-medium" style={{ color: i === 1 ? V4.teal : V4.coralDeep }}>/ {w.tag}</span>
                                </p>
                                <h3 className={`${heavy.className} mt-2 text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[1.4]`} style={{ color: V4.navy }}>
                                    {w.title}
                                </h3>
                                <p className="mt-2.5 text-[14px] leading-[1.9] md:text-[15px]" style={{ color: V4.navy }}>
                                    {w.body}
                                </p>
                            </FadeIn>
                        </li>
                    ))}
                </ul>

                <FadeIn>
                    <div className="mt-10 flex flex-col items-center gap-4 rounded-[16px] px-6 py-6 text-center md:mt-12 md:flex-row md:justify-center md:gap-8 md:py-7 md:text-left" style={{ backgroundColor: "#E6F5F4" }}>
                        <span aria-hidden className="relative inline-flex h-14 w-16 shrink-0 items-center justify-center">
                            <AppWindow className="h-12 w-14" strokeWidth={1.4} style={{ color: V4.teal }} />
                            <MousePointer2 className="absolute -bottom-1 right-1 h-6 w-6 fill-current" style={{ color: V4.navy }} />
                        </span>
                        <span aria-hidden className="hidden h-12 w-px md:block" style={{ backgroundColor: "rgba(20,51,90,0.3)" }} />
                        <div>
                            <p className={`${heavy.className} text-[clamp(1.2rem,2.4vw,1.85rem)] leading-[1.4]`} style={{ color: V4.navy }}>
                                {t.bannerTitle}
                            </p>
                            <p className="mt-1.5 text-[13.5px] md:text-[15px]" style={{ color: V4.navy }}>
                                {t.bannerLead}
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
