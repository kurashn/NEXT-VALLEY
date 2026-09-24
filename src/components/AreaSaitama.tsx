// Server Component — 対応エリア（埼玉のホームページ制作）
// トップページが「埼玉 ホームページ制作」を受け持つための段落。北部は /saitama-hokubu、本庄市は /honjo へつなぐ。
import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeadV4, Teal } from "@/components/ui/SectionHeadV4";
import { heavy, V4 } from "@/lib/fonts-v4";
import { chunks } from "@/lib/nowrap";
import type { Lang } from "@/i18n";

const areas = [
    { k: "本庄市・児玉郡", d: "代表の出身地です。本庄・児玉・上里・美里・神川の会社・お店・教室へ。", href: "/honjo", cta: "本庄市のホームページ制作" },
    { k: "熊谷・深谷など、埼玉北部", d: "行田・羽生・鴻巣まで。Googleマップとホームページをつなげて整えます。", href: "/saitama-hokubu", cta: "埼玉北部のホームページ制作" },
    { k: "さいたま市・川越・所沢など、県内全域", d: "埼玉のどこでも同じ料金です。やり取りはLINEかメールで完結します。", href: "/blog/saitama-local-web-agency", cta: "埼玉で制作会社を選ぶときの考え方" },
];

export function AreaSaitama({ lang = "ja" }: { lang?: Lang }) {
    if (lang !== "ja") return null;
    return (
        <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: V4.cream }}>
            <div className="mx-auto max-w-6xl">
                <SectionHeadV4
                    word="Area"
                    eyebrow="対応エリア"
                    title={<>埼玉の<Teal>ホームページ制作</Teal>。<span className="nowrap">北部は、代表の地元です。</span></>}
                    lead={<><span className="nowrap">さいたま市・川越・所沢から、</span><span className="nowrap">熊谷・深谷・本庄まで。</span><span className="nowrap">埼玉の小さな会社・お店・教室のホームページを、</span><span className="nowrap">同じ料金とやり方でお引き受けします。</span><span className="nowrap">全国からのご依頼にも対応しています。</span></>}
                />
                <ul className="grid gap-5 md:grid-cols-3">
                    {areas.map((a, i) => (
                        <li key={a.href} className="flex">
                            <FadeIn delay={i * 0.07} className="flex flex-1">
                                <Link href={a.href} className="group flex flex-1 flex-col rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(20,51,90,0.1)] md:p-7" style={{ borderColor: "rgba(20,51,90,0.12)" }}>
                                    <MapPin className="h-6 w-6" strokeWidth={1.8} style={{ color: V4.coralDeep }} aria-hidden />
                                    <p className={`${heavy.className} mt-3 text-[19px] leading-[1.45]`} style={{ color: V4.navy }}>{chunks(a.k)}</p>
                                    <p className="mt-2 flex-1 text-left text-[14.5px] leading-[1.85]" style={{ color: V4.sub }}>{a.d}</p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-bold" style={{ color: V4.coralDeep }}>
                                        {a.cta}
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                                    </span>
                                </Link>
                            </FadeIn>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
