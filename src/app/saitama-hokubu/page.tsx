import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "本庄・熊谷・深谷・伊勢崎のホームページ制作・集客支援",
    description:
        "埼玉県本庄市のWeb制作・集客支援 NEXT VALLEY。本庄・熊谷・深谷・伊勢崎など埼玉北部の教室・お店のホームページ制作（¥165,000〜）、集客ページ制作（¥55,000〜）、Googleマップ・LINEの集客サポート（月¥22,000〜）。契約前に無料でデザイン案をご覧いただけます。",
    alternates: { canonical: "https://www.nextvalley-jpn.com/saitama-hokubu" },
};

const areas = [
    {
        name: "本庄市・児玉郡",
        body: "代表の地元です。本庄市児玉町を拠点に、地域の教室・お店のホームページ制作と集客のご相談をお受けしています。",
        link: { href: "/blog/honjo-classroom-website", label: "本庄の教室が体験申込を増やす方法" },
    },
    {
        name: "熊谷市・深谷市",
        body: "美容室・整体院・カフェ・工務店など、お店の集客はGoogleマップとホームページの連携が要になります。",
        link: { href: "/blog/kumagaya-fukaya-shop-web-marketing", label: "熊谷・深谷のお店がマップとHPで新規客を増やす手順" },
    },
    {
        name: "伊勢崎市・太田市（群馬県南部）",
        body: "県境をまたぐエリアもお受けしています。LINE公式を予約と再来店に活かす仕組みづくりが得意です。",
        link: { href: "/blog/isesaki-honjo-line-marketing", label: "伊勢崎・本庄の教室とお店のLINE活用" },
    },
    {
        name: "上里町・美里町・寄居町など周辺地域",
        body: "上記以外の埼玉北部の市町村も対応しています。やりとりはLINE・メールで完結するので、店舗にお伺いしなくても進められます。",
        link: null,
    },
];

const services = [
    { name: "集客ページ制作（1枚完結）", price: "¥55,000〜", desc: "申込フォーム付きのページを最短3〜5日で公開。まず小さく始めたい方に" },
    { name: "ホームページ制作（複数ページ）", price: "¥165,000〜", desc: "教室・お店の顔になる本格的なホームページ。制作後の集客まで見据えた設計" },
    { name: "集客サポート", price: "月¥22,000〜", desc: "Googleマップ・LINE・ページ改善・毎月の数字レポート。作った後を任せたい方に" },
];

export default function SaitamaHokubuPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-32 pb-16 px-4 bg-[#002335] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge className="bg-coral-deep hover:bg-coral-deep text-white border-none px-4 py-1.5 text-sm mb-8 tracking-wider">
                        AREA
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
                        本庄・熊谷・深谷・伊勢崎の
                        <br className="md:hidden" />
                        ホームページ制作・集客支援
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                        埼玉北部の教室・お店の集客を、地元のWeb制作会社がお手伝いします。
                    </p>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto space-y-6 text-slate-700 leading-loose">
                    <p>
                        NEXT VALLEY（ネクストバレー）は、埼玉県本庄市を拠点とするWeb制作・集客支援の事務所です。代表は本庄市児玉町の出身。2021年の開業以来、100社以上のホームページ制作とWebマーケティングを支援してきました。
                    </p>
                    <p>
                        大手の制作会社と違うのは、作って終わりにしないことです。ホームページ・Googleマップ・LINEをつなげて「教室やお店を探している地元の方に見つけてもらい、問い合わせにつながる」ところまでを設計します。実際に、自作ホームページで入会ゼロだった子ども向け英語教室が、導線を整えてから7か月で14名の入会につながった事例もあります（<Link href="/blog/case-english-school-zero-to-14" className="text-[#0A5A8A] underline underline-offset-2">事例の詳細はこちら</Link>）。
                    </p>
                </div>
            </section>

            <section className="py-16 px-4 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-[#002335] mb-10 text-center">対応エリア</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {areas.map((a) => (
                            <div key={a.name} className="bg-white rounded-2xl border border-slate-200 p-7">
                                <h3 className="font-bold text-lg text-[#002335] mb-3">{a.name}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed mb-3">{a.body}</p>
                                {a.link && (
                                    <Link href={a.link.href} className="text-sm font-bold text-[#e26c5c] hover:underline underline-offset-2">
                                        {a.link.label} →
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-[#002335] mb-4 text-center">料金の目安</h2>
                    <p className="text-center text-sm text-slate-600 mb-10">
                        正式なお見積りは内容確定後にご提示します。金額をご確認いただいてからのご契約です。
                    </p>
                    <div className="grid gap-6 md:grid-cols-3">
                        {services.map((s) => (
                            <div key={s.name} className="rounded-2xl border border-slate-200 p-7 text-center">
                                <h3 className="font-bold text-[#002335] mb-2 text-[15px]">{s.name}</h3>
                                <p className="text-2xl font-bold text-[#e26c5c] mb-3">{s.price}</p>
                                <p className="text-sm text-slate-600 leading-relaxed text-left">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-center text-sm text-slate-600">
                        詳しくは<Link href="/price" className="text-[#0A5A8A] underline underline-offset-2">料金ページ</Link>をご覧ください。
                    </p>
                </div>
            </section>

            <section className="py-16 px-4 bg-[#002335] text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">契約の前に、実物をご覧ください</h2>
                    <p className="text-white/85 leading-relaxed mb-8">
                        「頼むと高そう」「効果が出るか分からない」という方のために、ご契約前にあなたのお店・教室のトップページのデザイン案を無料でお作りしています。気に入らなければ、そこで終わりで構いません。
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="https://lin.ee/N4QXdJL"
                            className="inline-flex items-center justify-center rounded-lg bg-[#e26c5c] px-8 py-4 font-bold text-white hover:opacity-90 min-h-[44px]"
                        >
                            LINEで無料診断する
                        </a>
                        <Link
                            href="/preview"
                            className="inline-flex items-center justify-center rounded-lg border border-white/70 px-8 py-4 font-bold text-white hover:bg-white/10 min-h-[44px]"
                        >
                            無料プレビューの詳細を見る
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
