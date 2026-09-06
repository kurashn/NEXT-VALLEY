import React from "react";
import type { Metadata } from "next";
import NextImage from "next/image";
import Navbar from "@/components/layout/Navbar";
import shun from "@/images/shun-new.webp";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { langAttr, type Lang } from "@/i18n";

const ja = {
    badge: "PROFILE",
    h1: "事業情報",
    tagline: "AIで、売上と業務を根本から変える。",
    philosophy: (
        <>
            <p>
                「良い仕事をしているのに、知られていない」<br />
                そんなもどかしさを抱える中小企業・事業者様のために、NEXT VALLEYは存在します。
            </p>
            <p>
                従来のホームページ制作は、高額で時間がかかりすぎました。<br />
                私たちはAI技術を駆使することで、圧倒的な「スピード」と「適正価格」を実現。<br />
                しかし、AIだけでは人の心は動かせません。
            </p>
            <p>
                徹底した「戦略」と「人間理解」を掛け合わせ、<br />
                ただ作るだけでなく、<span className="font-bold text-coral-deep bg-[#e26c5c]/10 px-1">集客という結果にコミットするパートナー</span>でありたいと考えています。
            </p>
        </>
    ),
    tableTitle: "事業概要",
    rowName: "屋号",
    name: "NEXT VALLEY（ネクストバレー）",
    rowRep: "代表者",
    rep: "倉林 駿（くらはやし しゅん）",
    rowFounded: "事業開始",
    founded: "2021年1月",
    rowServices: "事業内容",
    services: [
        "AI活用コンサルティング",
        "ホームページ・LP制作 / リニューアル",
        "SEO・MEO対策（検索・Googleマップ集客）",
        "SNS・LINEマーケティング支援",
        "デザイン制作（ロゴ・チラシ・パンフレット）",
        "HP運用ツール『SiteChat』の開発・提供",
    ],
    rowContact: "お問い合わせ",
    email: "info@nextvalley-jpn.com",
    contactNote: "※ 営業・勧誘のメールは固くお断りいたします。",
    bullet: "・",
    profileTitle: "代表プロフィール",
    profileName: "倉林 駿（くらはやし しゅん）",
    profileBody: (
        <>
            <p>
                埼玉県本庄市児玉町出身。もともとは消防士を目指していましたが、ヘルニアで断念。働き方を考え直すなかで、場所に縛られずに働けるITの道を選びました。
            </p>
            <p>
                2020年、大学4年を前にプログラミングの独学を開始。半年ほどで個人として案件を受注し、Web制作会社で現場経験を積んだのち、2021年1月にNEXT VALLEYを開業しました。以来、ホームページ制作とWebマーケティングで100社以上の事業者様を支援しています。
            </p>
            <p>
                海外では、ノマドワーカー向けのリトリートイベントをタイ（チェンマイ・バンコク・プーケット）、インドネシア（バリ島ウブド）、ベトナム（ダナン）で開催し、コミュニティ運営も行っています。イベントやコミュニティの集客は自分自身の実践テーマでもあり、ご提案には自分で試して効果のあったことを反映しています。
            </p>
        </>
    ),
};
const en: typeof ja = {
    badge: "PROFILE",
    h1: "About Us",
    tagline: "Grow your business. Powered by AI.",
    philosophy: (
        <>
            <p>
                &ldquo;We do great work — people just don&rsquo;t know about us yet.&rdquo;<br />
                NEXT VALLEY exists for the small businesses and independent owners who feel that frustration.
            </p>
            <p>
                Traditional website projects have always been too expensive and too slow.<br />
                By putting AI to work, we deliver real speed at a fair price.<br />
                But AI alone doesn&rsquo;t move people.
            </p>
            <p>
                We pair it with solid strategy and a genuine understanding of your customers —<br />
                so we don&rsquo;t just build your site. We aim to be <span className="font-bold text-coral-deep bg-[#e26c5c]/10 px-1">a partner committed to one result: more customers</span>.
            </p>
        </>
    ),
    tableTitle: "Company Profile",
    rowName: "Business name",
    name: "NEXT VALLEY",
    rowRep: "Representative",
    rep: "Shun Kurahayashi",
    rowFounded: "Established",
    founded: "January 2021",
    rowServices: "What we do",
    services: [
        "AI consulting for small businesses",
        "Website and landing page design / redesign",
        "SEO and Google Maps (local SEO)",
        "Social media and LINE marketing support",
        "Design (logos, flyers, brochures)",
        "Development of SiteChat, our website management tool",
    ],
    rowContact: "Contact",
    email: "info@nextvalley-jpn.com",
    contactNote: "Please note: unsolicited sales and marketing emails are not accepted.",
    bullet: "•",
    profileTitle: "About the founder",
    profileName: "Shun Kurahayashi",
    profileBody: (
        <>
            <p>
                Born and raised in Honjo, Saitama. I originally trained to become a firefighter, but a herniated disc ended that path — and led me to rethink how I wanted to work. That search brought me to tech and to work that isn&rsquo;t tied to one place.
            </p>
            <p>
                I began teaching myself programming in 2020, started taking on client work within about six months, and gained hands-on experience at a web production company before founding NEXT VALLEY in January 2021. Since then, I&rsquo;ve supported more than 100 businesses with web design and marketing.
            </p>
            <p>
                Outside Japan, I host retreat events for remote workers — in Chiang Mai, Bangkok and Phuket (Thailand), Ubud (Bali, Indonesia) and Da Nang (Vietnam) — and run a community around them. Growing events and communities is something I practice myself, and what works there feeds directly into what I recommend to clients.
            </p>
        </>
    ),
};
const copy: Record<Lang, typeof ja> = { ja, en };

/** ja は従来どおり metadata 無し（layout の既定を継承）。en のみ英語 metadata を返す */
export function companyMetadata(lang: Lang): Metadata {
    if (lang === "ja") return {};
    return {
        title: "About Us",
        description:
            "NEXT VALLEY is an AI-powered marketing and web design team in Japan, helping small businesses win more customers. Representative: Shun Kurahayashi. Established 2021.",
        openGraph: {
            title: "About Us | NEXT VALLEY",
            description:
                "An AI-powered marketing and web design team in Japan, helping small businesses win more customers.",
            url: "https://www.nextvalley-jpn.com/en/company",
            siteName: "NEXT VALLEY",
            locale: "en_US",
            type: "website",
        },
    };
}

export function CompanyPage({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <main className="min-h-screen bg-white" {...langAttr(lang)}>
            <Navbar lang={lang} />

            {/* Header */}
            <section className="pt-32 pb-16 px-4 bg-[#002335] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge className="bg-coral-deep hover:bg-coral-deep text-white border-none px-4 py-1.5 text-sm mb-8 tracking-wider">
                        {t.badge}
                    </Badge>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6">
                        {t.h1}
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                        {t.tagline}
                    </p>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">

                    {/* Vision / Philosophy */}
                    <div className="mb-20 space-y-8 text-slate-700 leading-loose text-lg">
                        {t.philosophy}
                    </div>


                    {/* 代表プロフィール */}
                    <div className="mb-16 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <h2 className="text-xl font-bold text-[#002335] mb-8 border-l-4 border-[#e26c5c] pl-4">
                                {t.profileTitle}
                            </h2>
                            <div className="flex flex-col gap-8 md:flex-row md:gap-10">
                                <div className="mx-auto w-full max-w-[260px] shrink-0 md:mx-0 md:w-64">
                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                                        <NextImage src={shun} alt={t.profileName} fill className="object-cover" placeholder="blur" sizes="260px" />
                                    </div>
                                    <p className="mt-4 text-center font-bold text-[#002335] md:text-left">{t.profileName}</p>
                                </div>
                                <div className="space-y-5 text-[15px] leading-loose text-slate-600">
                                    {t.profileBody}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <h2 className="text-xl font-bold text-[#002335] mb-8 border-l-4 border-[#e26c5c] pl-4">
                                {t.tableTitle}
                            </h2>
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-bold text-[#002335] flex items-center h-full">{t.rowName}</dt>
                                </div>
                                <div className="sm:col-span-2 border-b border-slate-100 pb-4 sm:border-none sm:pb-0">
                                    <dd className="text-base text-slate-600">{t.name}</dd>
                                </div>

                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-bold text-[#002335] flex items-center h-full">{t.rowRep}</dt>
                                </div>
                                <div className="sm:col-span-2 border-b border-slate-100 pb-4 sm:border-none sm:pb-0">
                                    <dd className="text-base text-slate-600">{t.rep}</dd>
                                </div>

                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-bold text-[#002335] flex items-center h-full">{t.rowFounded}</dt>
                                </div>
                                <div className="sm:col-span-2 border-b border-slate-100 pb-4 sm:border-none sm:pb-0">
                                    <dd className="text-base text-slate-600">{t.founded}</dd>
                                </div>

                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-bold text-[#002335] py-1">{t.rowServices}</dt>
                                </div>
                                <div className="sm:col-span-2 border-b border-slate-100 pb-4 sm:border-none sm:pb-0">
                                    <dd className="text-base text-slate-600 leading-relaxed space-y-2">
                                        {t.services.map((s) => (
                                            <div key={s} className="flex items-start gap-2">
                                                <span className="text-coral-deep font-bold">{t.bullet}</span>
                                                <span>{s}</span>
                                            </div>
                                        ))}
                                    </dd>
                                </div>

                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-bold text-[#002335] flex items-center h-full">{t.rowContact}</dt>
                                </div>
                                <div className="sm:col-span-2">
                                    <dd className="text-base text-slate-600">
                                        {t.email}<br />
                                        <span className="text-xs text-slate-400 mt-1 block">{t.contactNote}</span>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </section>

            <Footer lang={lang} />
        </main>
    );
}
