// Server Component — 支援する内容（support.png の再現）
// 基本プランに含まれる3つ（つくる・更新する・管理する）と、別途お見積もりの集客改善

import React from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeadV4, Teal, Dots } from "@/components/ui/SectionHeadV4";
import { SupportIllust01 } from "@/components/ui/SupportIllust01";
import { serif } from "@/components/ui/SerifHeading";
import { heavy, V4 } from "@/lib/fonts-v4";
import { withLang, type Lang } from "@/i18n";

import illust02 from "@/images/v4/support-02.webp";
import illust03 from "@/images/v4/support-03.webp";

type Row = { no: string; title: string; sub: string; body: React.ReactNode; img?: StaticImageData };

const jaGeneral = {
    eyebrow: "支援する内容",
    title: (
        <>
            つくることも、<Teal>その後</Teal>のことも。
        </>
    ),
    lead: <><span className="nowrap">ホームページの制作・更新・管理を、</span><span className="nowrap">まとめて任せられます。</span></>,
    includedLabel: "基本プランに含まれること",
    rows: [
        { no: "01", title: "つくる", sub: "ホームページ制作", body: <><span className="nowrap">会社・お店・教室の魅力が伝わる</span><span className="nowrap">ページを制作。</span><br className="hidden lg:block" /><span className="nowrap">10ページまで、</span><span className="nowrap">スマートフォンにも対応。</span></> },
        { no: "02", title: "更新する", sub: "写真・文章の修正", img: illust02, body: <><span className="nowrap">写真の差し替えや、</span><span className="nowrap">お知らせ・営業時間の更新。</span><br className="hidden lg:block" /><span className="nowrap">修正・更新は、</span><span className="nowrap">回数を気にせず相談できます。</span></> },
        { no: "03", title: "管理する", sub: "ドメイン・サーバー管理", img: illust03, body: <><span className="nowrap">ドメイン・サーバーの管理も</span><span className="nowrap">まとめて対応。</span><br className="hidden lg:block" /><span className="nowrap">Webに詳しくなくても、</span><span className="nowrap">相談できる窓口に。</span></> },
    ] as Row[],
    optionalPill: "必要に応じて・別途お見積もり",
    optionalTitle: "集客の改善も、課題に合わせて。",
    optionalLead: "現状を確認し、必要な支援だけをご提案します。",
    chips: ["Googleマップ", "LINE", "SEO", "問い合わせ導線"],
    optionalNote: "※ 継続的な集客支援は、基本プランとは別料金です。",
    link: "サービス・料金の詳細を見る",
};

const enGeneral: typeof jaGeneral = {
    eyebrow: "WHAT WE DO",
    title: (
        <>
            The build, and <Teal>everything after</Teal>.
        </>
    ),
    lead: <>Building, updating and managing your website, all in one place.</>,
    includedLabel: "Included in the basic plan",
    rows: [
        { no: "01", title: "Build", sub: "Website creation", body: <>Pages that show what your company, shop or school is like. Up to 10 pages, mobile-ready.</> },
        { no: "02", title: "Update", sub: "Photos and text", img: illust02, body: <>New photos, news and opening hours. Ask for edits as often as you need.</> },
        { no: "03", title: "Manage", sub: "Domain and hosting", img: illust03, body: <>We look after the domain and hosting too, so there is one place to ask, however unfamiliar the web is.</> },
    ] as Row[],
    optionalPill: "When needed, quoted separately",
    optionalTitle: "Improvements to bring in more enquiries.",
    optionalLead: "We look at where you stand and propose only what helps.",
    chips: ["Google Maps", "LINE", "SEO", "Enquiry paths"],
    optionalNote: "Ongoing marketing support is priced separately from the basic plan.",
    link: "See services and pricing",
};

const copy: Record<Lang, typeof jaGeneral> = { ja: jaGeneral, en: enGeneral };

export function Service({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-white px-4 py-14 md:px-6 md:py-20">
            <div className="relative mx-auto max-w-6xl">
                <SectionHeadV4 word="Support" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

                <FadeIn>
                    <div className="rounded-[16px] border-[1.5px] bg-white px-5 pb-6 pt-4 md:px-8 md:pb-8" style={{ borderColor: V4.teal }}>
                        <Dots />
                        <p className="mt-4 inline-block rounded-md px-4 py-1.5 text-[13px] font-bold text-white md:text-[14px]" style={{ backgroundColor: V4.teal }}>
                            {t.includedLabel}
                        </p>
                        <ol className="mt-2">
                            {t.rows.map((r, i) => (
                                <li
                                    key={r.no}
                                    className={`grid items-center gap-x-6 gap-y-3 py-6 md:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[92px_260px_220px_minmax(0,1fr)] ${i > 0 ? "border-t" : ""}`}
                                    style={{ borderColor: "rgba(44,143,168,0.28)" }}
                                >
                                    <span className="text-[clamp(2.4rem,4.4vw,3.6rem)] font-bold leading-none" style={{ fontFamily: serif, color: i === 1 ? V4.teal : V4.coralDeep }}>
                                        {r.no}
                                    </span>
                                    <div className="md:border-l md:pl-6" style={{ borderColor: "rgba(20,51,90,0.25)" }}>
                                        <h3 className={`${heavy.className} text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.15]`} style={{ color: V4.navy }}>
                                            {r.title}
                                        </h3>
                                        <p className="mt-1 text-[14px] font-bold md:text-[15px]" style={{ color: V4.navy }}>
                                            {r.sub}
                                        </p>
                                    </div>
                                    <div className="hidden lg:block">
                                        {r.img ? (
                                            <Image src={r.img} alt="" sizes="220px" className="mx-auto h-auto w-[200px]" />
                                        ) : (
                                            <SupportIllust01 className="mx-auto h-auto w-[200px]" />
                                        )}
                                    </div>
                                    <p className="text-[14.5px] leading-[1.9] md:col-span-2 md:text-[15.5px] lg:col-span-1 lg:border-l lg:pl-7" style={{ color: V4.navy, borderColor: "rgba(20,51,90,0.25)" }}>
                                        {r.body}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </FadeIn>

                <FadeIn>
                    <div className="mt-6 grid gap-6 rounded-[16px] px-6 py-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.1fr)] md:items-center md:gap-8 md:px-9 md:py-7" style={{ backgroundColor: "#E8F4F4" }}>
                        <div>
                            <p className="inline-block rounded-full border-[1.5px] px-4 py-1 text-[12.5px] font-bold md:text-[13.5px]" style={{ borderColor: V4.coralDeep, color: V4.coralDeep }}>
                                {t.optionalPill}
                            </p>
                            <p className={`${heavy.className} mt-3 text-[clamp(1.25rem,2.4vw,1.85rem)] leading-[1.35]`} style={{ color: V4.navy }}>
                                {t.optionalTitle}
                            </p>
                            <p className="mt-1.5 text-[14px] md:text-[15px]" style={{ color: V4.navy }}>
                                {t.optionalLead}
                            </p>
                        </div>
                        <span aria-hidden className="hidden h-24 w-px md:block" style={{ backgroundColor: "rgba(20,51,90,0.3)" }} />
                        <div>
                            <ul className="flex flex-wrap gap-2.5">
                                {t.chips.map((c) => (
                                    <li key={c} className="rounded-md bg-white px-4 py-2 text-[14px] font-bold" style={{ color: V4.navy }}>
                                        {c}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                                <p className="text-[12.5px] md:text-[13.5px]" style={{ color: V4.navy }}>
                                    {t.optionalNote}
                                </p>
                                <a
                                    href={withLang(lang, "/price")}
                                    className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-bold underline decoration-2 underline-offset-[6px]"
                                    style={{ color: V4.navy }}
                                >
                                    {t.link}
                                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                                </a>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
