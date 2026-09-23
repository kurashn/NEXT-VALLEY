// 制作実績の一覧ページ
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeadV4, Teal } from "@/components/ui/SectionHeadV4";
import { heavy, V4 } from "@/lib/fonts-v4";
import { WORKS, CATEGORIES } from "@/lib/works";
import { WorksGrid } from "./WorksGrid";

const LINE = "https://lin.ee/N4QXdJL";

export const metadata: Metadata = {
    title: "制作実績｜ホームページ・LP・メディアの制作事例",
    description:
        "NEXT VALLEY の制作実績。不動産・建設・企業サイトから、店舗・教室・情報メディア・LPまで。担当した範囲と、公開後の成果もあわせてご覧いただけます。",
    alternates: { canonical: "https://www.nextvalley-jpn.com/works" },
    openGraph: { title: "制作実績 | NEXT VALLEY", description: "不動産・建設・企業サイトから、店舗・教室・情報メディア・LPまで。担当した範囲と成果をご覧いただけます。", url: "https://www.nextvalley-jpn.com/works" },
};

export default function WorksPage() {
    return (
        <main className="min-h-screen" style={{ backgroundColor: "#FDFAF3" }}>
            <Navbar variant="light" />

            <section className="px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40">
                <div className="mx-auto max-w-6xl">
                    <SectionHeadV4
                        word="Works"
                        eyebrow="制作実績"
                        title={<>作って終わりにしない、<span className="nowrap"><Teal>制作の実績</Teal>。</span></>}
                        lead={<><span className="nowrap">会社・不動産・建設から、</span><span className="nowrap">店舗・教室・情報メディア・LPまで。</span><span className="nowrap">担当した範囲とあわせてご覧ください。</span></>}
                    />
                    <WorksGrid works={WORKS} categories={CATEGORIES} heavyClass={heavy.className} />
                    <p className="mt-8 text-[13px]" style={{ color: V4.sub }}>※ 掲載しているのは、公開のご了承をいただいた直接のお客様の一部です。広告代理店・SNS運用会社・制作会社を通じてお受けした案件（社名は非公開）を含めると、2021年からの制作・支援は100社以上になります。</p>
                </div>
            </section>

            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: V4.mist }}>
                <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
                    <div className="rounded-2xl bg-white p-7 md:p-9">
                        <p className="text-[13px] font-bold" style={{ color: V4.coralDeep }}>ホームページを作りたい方へ</p>
                        <h2 className={`${heavy.className} mt-2 text-[22px] leading-[1.5] md:text-[26px]`} style={{ color: V4.navy }}>契約の前に、<span className="nowrap">デザイン案をお作りします。</span></h2>
                        <p className="mt-3 text-left text-[14.5px] leading-[1.9]" style={{ color: V4.sub }}>トップページのデザイン案を、PC・スマートフォンの2枚で無料でお出しします。初期制作費0円・月額8,980円（税込）です。</p>
                        <a href={LINE} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-[52px] items-center gap-2 rounded-full px-6 text-[15px] font-bold text-white" style={{ backgroundColor: V4.coralDeep }}>
                            LINEで無料プレビューを申し込む <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </a>
                    </div>
                    <div className="rounded-2xl bg-white p-7 md:p-9">
                        <p className="text-[13px] font-bold" style={{ color: V4.teal }}>広告代理店・運用会社・制作会社の方へ</p>
                        <h2 className={`${heavy.className} mt-2 text-[22px] leading-[1.5] md:text-[26px]`} style={{ color: V4.navy }}>LP・ホームページの制作で、<span className="nowrap">ご一緒できます。</span></h2>
                        <p className="mt-3 text-left text-[14.5px] leading-[1.9]" style={{ color: V4.sub }}>貴社のお客様の制作を、デザインから実装までお引き受けします。貴社名義での制作にも対応します。</p>
                        <Link href="/contact" className="mt-5 inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 px-6 text-[15px] font-bold" style={{ borderColor: V4.navy, color: V4.navy }}>
                            協業について相談する <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
