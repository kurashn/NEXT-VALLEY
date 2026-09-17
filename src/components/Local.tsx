// Server Component — 地域とのつながり。出身地と、実際の対応方法だけを正確に書く

import React from "react";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading } from "@/components/ui/SerifHeading";
import { withLang, type Lang } from "@/i18n";

const ja = {
    heading: "地域とのつながり",
    title: (
        <>
            本庄市児玉町で育った代表が、
            <br className="hidden md:block" />
            埼玉北部の事業を中心に<span className="nowrap">お手伝いしています。</span>
        </>
    ),
    body: (
        <>
            <p>
                地元のお店や教室がどう探され、どう選ばれているかを、自分の生活の中で見てきました。「熊谷 整体」「本庄 英会話」と検索する人の目線で、サイトと導線を組みます。
            </p>
            <p>
                打ち合わせはLINE・メール・ビデオ通話で進めます。埼玉北部を軸にしつつ、全国どこからでもご相談いただけます。
            </p>
        </>
    ),
    areas: ["本庄市", "熊谷市", "深谷市", "行田市", "秩父市", "東松山市", "上里町", "美里町", "神川町", "寄居町"],
    areasNote: "上の地域以外も、埼玉県内・全国ともにオンラインで対応しています。",
    ctaArea: "対応エリアの詳細",
    ctaCompany: "代表・事業の紹介",
};

const en: typeof ja = {
    heading: "Local roots",
    title: (
        <>
            The founder grew up in Kodama, Honjo, and works mainly with businesses in northern Saitama.
        </>
    ),
    body: (
        <>
            <p>
                We know how local shops and schools get found and chosen because we grew up seeing it. We build sites and paths to enquiry from the point of view of someone searching for a business nearby.
            </p>
            <p>
                Meetings happen over LINE, email and video calls. Northern Saitama is the focus, but we work with clients anywhere in Japan.
            </p>
        </>
    ),
    areas: ["Honjo", "Kumagaya", "Fukaya", "Gyoda", "Chichibu", "Higashimatsuyama", "Kamisato", "Misato", "Kamikawa", "Yorii"],
    areasNote: "Beyond these areas, we support clients across Saitama and the rest of Japan online.",
    ctaArea: "Service area",
    ctaCompany: "About the founder",
};

const copy: Record<Lang, typeof ja> = { ja, en };

export function Local({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <section className="relative overflow-hidden bg-base px-4 py-16 md:px-6 md:py-24">
            <div className="relative mx-auto max-w-6xl">
                <FadeIn>
                    <SerifHeading en="Local" jp={t.heading} />
                </FadeIn>
                <div className="rounded-2xl border border-line bg-cream p-7 md:p-10">
                    <FadeIn>
                        <h3 className="mb-5 text-[clamp(1.25rem,2.6vw,1.75rem)] font-bold leading-[1.6] tracking-tight text-ink">
                            {t.title}
                        </h3>
                        <div className="space-y-4 text-[15px] leading-[2] text-ink-sub">{t.body}</div>
                        <ul className="mt-6 flex flex-wrap gap-2">
                            {t.areas.map((a) => (
                                <li key={a} className="rounded-full border border-line bg-white px-3.5 py-1 text-[13px] text-ink">
                                    {a}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-3 text-[13px] leading-[1.9] text-ink-sub">{t.areasNote}</p>
                        <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
                            <a
                                href={withLang(lang, "/saitama-hokubu")}
                                className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-bold text-coral-deep underline decoration-2 underline-offset-4 transition-colors hover:text-navy-deep"
                            >
                                {t.ctaArea}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                            </a>
                            <a
                                href={withLang(lang, "/company")}
                                className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-bold text-coral-deep underline decoration-2 underline-offset-4 transition-colors hover:text-navy-deep"
                            >
                                {t.ctaCompany}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
