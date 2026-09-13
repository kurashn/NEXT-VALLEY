import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "ご紹介パートナー制度",
    description:
        "ホームページや集客で困っているお知り合いをご紹介ください。営業はすべてNEXT VALLEYが行い、ご成約時に紹介料をお支払いします。ご紹介された方にも制作費の割引があります。",
    alternates: { canonical: "https://www.nextvalley-jpn.com/partner" },
};

const steps = [
    {
        n: "01",
        t: "お知り合いを教えてください",
        d: "「ホームページで困ってる人がいる」、それだけで大丈夫です。公式LINEに「紹介したい」と一言送ってください。売り込みトークを覚える必要はありません。",
    },
    {
        n: "02",
        t: "あとはこちらが対応します",
        d: "無料のWeb集客診断や、契約前に実物を見られる無料プレビューでご案内します。しつこい営業は一切しません。ご紹介いただいた方の顔を潰すような対応は、決してしません。",
    },
    {
        n: "03",
        t: "ご成約したら、紹介料をお支払い",
        d: "ご成約・ご入金の確認後、銀行振込でお支払いします。ご成約に至らなくても、ご紹介者様・ご紹介いただいた方にご迷惑をおかけすることはありません。",
    },
];

const rewards = [
    { name: "ホームページ・集客ページの制作", amount: "ご成約金額の10%", note: "例：165,000円の制作なら16,500円" },
    { name: "集客サポート（月額契約）", amount: "月額1ヶ月分", note: "3ヶ月のご継続が確認できた時点でお支払い" },
    { name: "ご紹介された方への特典", amount: "制作費から5,000円引き", note: "ご紹介経由のご契約が対象" },
];

export default function PartnerPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-32 pb-16 px-4 bg-[#002335] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge className="bg-coral-deep hover:bg-coral-deep text-white border-none px-4 py-1.5 text-sm mb-8 tracking-wider">
                        PARTNER
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
                        ご紹介パートナー制度
                    </h1>
                    <p className="text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
                        ホームページや集客で困っているお知り合いを、教えてください。
                        <br className="hidden md:block" />
                        営業はすべてこちらが行い、ご成約時に紹介料をお支払いします。
                    </p>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto space-y-6 text-slate-700 leading-loose">
                    <p>
                        NEXT VALLEYは、2021年の開業以来100社以上のホームページ制作と集客を支援してきた、埼玉県本庄市のWeb制作事務所です。おかげさまで、お仕事の多くはご紹介から生まれています。
                    </p>
                    <p>
                        この制度は、その「ご紹介」にきちんとお礼をお返しするための仕組みです。過去にご一緒したお客様、地域の経営者仲間、士業の先生方。「そういえばあの人、ホームページで困ってたな」と思い当たる方がいれば、繋いでいただくだけで構いません。
                    </p>
                    <p>
                        そして、ご紹介はお知り合いへの売り込みではありません。ご紹介された方が最初に受け取るのは、営業の連絡ではなく、<span className="font-bold text-[#002335]">無料のWeb集客診断書</span>や<span className="font-bold text-[#002335]">契約前に見られる無料のデザイン案</span>です。気に入らなければ断って終わり、で本当に構いません。実際に、導線を整えてから7か月で14名の入会につながった教室もあります（<Link href="/blog/case-english-school-zero-to-14" className="text-[#0A5A8A] underline underline-offset-2">事例はこちら</Link>）。
                    </p>
                </div>
            </section>

            <section className="py-16 px-4 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-[#002335] mb-10 text-center">ご紹介の流れ</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {steps.map((s) => (
                            <div key={s.n} className="bg-white rounded-2xl border border-slate-200 p-7">
                                <p className="text-3xl font-bold text-[#e26c5c] mb-3">{s.n}</p>
                                <h3 className="font-bold text-[#002335] mb-3">{s.t}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{s.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-[#002335] mb-10 text-center">紹介料</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {rewards.map((r) => (
                            <div key={r.name} className="rounded-2xl border border-slate-200 p-7 text-center">
                                <h3 className="font-bold text-[#002335] mb-3 text-[15px]">{r.name}</h3>
                                <p className="text-xl font-bold text-[#b0432f] mb-3">{r.amount}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{r.note}</p>
                            </div>
                        ))}
                    </div>
                    <ul className="mt-8 mx-auto max-w-2xl space-y-1.5 text-sm text-slate-500 leading-relaxed list-disc pl-5">
                        <li>紹介料は、ご成約とご入金の確認後にお支払いします（銀行振込）</li>
                        <li>紹介料を受け取りにくい場合は、ご紹介先の割引への上乗せに変更できます（お知り合いがその分お得になります）</li>
                        <li>ご自身・ご自身の事業のご契約は、紹介料ではなくお見積りにて調整します</li>
                        <li>同じ方を複数の方からご紹介いただいた場合は、先にご連絡いただいた方が対象です</li>
                    </ul>
                </div>
            </section>

            <section className="py-16 px-4 bg-[#002335] text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">ご紹介は、LINEで一言</h2>
                    <p className="text-white/85 leading-relaxed mb-8">
                        公式LINEに「紹介したい」と送ってください。お知り合いの業種と、今どんなことで困っていそうかを、分かる範囲で教えていただければ、あとはこちらで進めます。
                    </p>
                    <a
                        href="https://lin.ee/N4QXdJL"
                        className="inline-flex items-center justify-center rounded-lg bg-[#e26c5c] px-8 py-4 text-[19px] font-bold text-white hover:opacity-90 min-h-[44px]"
                    >
                        LINEで「紹介したい」と送る
                    </a>
                    <p className="mt-6 text-sm text-white/70">
                        制度についてのご質問だけでも、お気軽にどうぞ。
                        <br />
                        サービス内容は<Link href="/" className="underline underline-offset-2 text-white">トップページ</Link>を、料金は<Link href="/price" className="underline underline-offset-2 text-white">料金ページ</Link>をご覧ください。
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
