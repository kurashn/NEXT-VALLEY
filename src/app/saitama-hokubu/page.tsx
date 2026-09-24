// 埼玉北部のホームページ制作（熊谷・深谷・本庄など）ページ
// 「熊谷 ホームページ制作」「埼玉北部 ホームページ制作」の受け皿。県全体の「埼玉 ホームページ制作」はトップページ、本庄市は /honjo が担当（題名の取り合いを避ける）。料金・流れ・地域・実績・FAQを1ページに。
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { heavy, V4 } from "@/lib/fonts-v4";
import { chunks } from "@/lib/nowrap";

const LINE = "https://lin.ee/N4QXdJL";

export const metadata: Metadata = {
    title: "埼玉北部（熊谷・深谷・本庄）のホームページ制作｜初期0円・月額8,980円",
    description:
        "熊谷市・深谷市・本庄市・行田市・羽生市・児玉郡など、埼玉北部の小さな会社・お店・教室のホームページ制作。代表は本庄市児玉町の出身です。初期0円・月額8,980円（税込）で10ページまで制作、更新無制限。契約前にデザイン案を無料でお作りします。",
    alternates: { canonical: "https://www.nextvalley-jpn.com/saitama-hokubu" },
    openGraph: {
        title: "埼玉北部（熊谷・深谷・本庄）のホームページ制作 | NEXT VALLEY",
        description: "埼玉北部の小さな事業のホームページを、制作から公開後の更新・管理まで。契約前にデザイン案を無料で。",
        url: "https://www.nextvalley-jpn.com/saitama-hokubu",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "埼玉北部のホームページ制作｜NEXT VALLEY" }],
    },
    twitter: { card: "summary_large_image", title: "埼玉北部（熊谷・深谷・本庄）のホームページ制作 | NEXT VALLEY", images: ["/og-image.png"] },
};

const fit = [
    { t: "ホームページが、まだない", d: "名刺や口コミ、Instagramだけで来てもらっている。検索されたときに出てくる場所がほしい。" },
    { t: "作ったまま何年も放置している", d: "料金や営業時間が古いまま。直したいが、頼んだ制作会社と連絡が取れない。" },
    { t: "見られているのに、問い合わせがない", d: "アクセスはあるのに、電話も予約も来ない。どこを直せばいいか分からない。" },
];

const included = [
    ["ホームページ制作", "10ページまで（11ページ目以降は1ページにつき1,000円を制作時に一度だけ）"],
    ["修正・更新", "回数無制限（デザインの全面リニューアルを除く）"],
    ["ドメイン・サーバー費", "月額に含む"],
    ["スマートフォン対応・お問い合わせフォーム", "標準"],
    ["Googleマップ・Instagram・LINEとの連携", "標準"],
    ["公開後の管理・保守", "バックアップ、表示速度やエラーの確認、毎月のアクセスレポート（見られた数・検索での表示・問い合わせまでの流れを1枚にまとめてお送りします）"],
];

const steps = [
    { n: "01", t: "LINEで申し込む", d: "公式LINEを追加し、ヒアリング（約1分）に答えます。" },
    { n: "02", t: "デザイン案を受け取る", d: "3営業日以内に、トップページのデザイン案（PC・スマホ）を無料でお届け。" },
    { n: "03", t: "見てから決める", d: "料金・条件を確認して、依頼するかご判断ください。断っても費用はかかりません。" },
    { n: "04", t: "制作・公開", d: "写真や文章を一緒に準備し、下層ページまで制作して公開します。" },
    { n: "05", t: "公開後の更新・改善", d: "修正や更新はLINEで送るだけ。毎月の数字も1枚にまとめてお送りします。" },
];

const areas = [
    {
        name: "熊谷市・深谷市・行田市・羽生市",
        body: "美容室・整体院・カフェ・工務店など、お店の集客はGoogleマップとホームページの連携が要になります。",
        link: { href: "/blog/kumagaya-fukaya-shop-web-marketing", label: "熊谷・深谷のお店がマップとHPで新規客を増やす手順" },
    },
    {
        name: "本庄市・児玉郡（美里町・神川町・上里町）",
        body: "代表の地元です。本庄市児玉町で育った目線で、地域の会社・お店・教室のホームページと集客のご相談をお受けしています。",
        link: { href: "/honjo", label: "本庄市のホームページ制作" },
    },
    {
        name: "伊勢崎市・太田市（群馬県南部）",
        body: "県境をまたぐエリアもお受けしています。LINE公式を予約と再来店に活かす仕組みづくりが得意です。",
        link: { href: "/blog/isesaki-honjo-line-marketing", label: "伊勢崎・本庄の教室とお店のLINE活用" },
    },
    {
        name: "さいたま市・川越・所沢など、県内全域と全国",
        body: "上尾・鴻巣・加須・久喜・春日部・越谷・川口など県内どこでも。やり取りはLINEかメールで完結するので、全国からご依頼いただけます。",
        link: { href: "/blog/saitama-local-web-agency", label: "埼玉で地元の制作会社を選ぶべきか" },
    },
];

const cases = [
    { t: "入会ゼロの英会話教室が、7か月で14名に", d: "自作サイトのままだった教室の導線を1本に整えたところ、体験申込が入るようになりました。", href: "/blog/case-english-school-zero-to-14" },
    { t: "情報サイトが記事だけで月323人から4,167人に", d: "広告費0円・8か月。公開後に数字を見ながら記事を積み上げた実測です。", href: "/blog/case-bowling-media-growth" },
];

const faqs = [
    { q: "埼玉以外でも頼めますか？", a: "はい。やり取りはLINEかメールで完結するので、全国どこからでもご依頼いただけます。打ち合わせのための訪問やオンライン会議は行っていません。" },
    { q: "本当に初期費用はかかりませんか？", a: "かかりません。初期制作費0円・月額8,980円（税込）で、最低契約期間は1年間です。契約日から課金が始まり、それまでのデザイン案は無料です。" },
    { q: "写真や文章がまだありません。", a: "大丈夫です。業種と伝えたいことが分かれば、それに合った構成でお作りします。写真や文章は制作の段階で一緒に準備します。" },
    { q: "1年たったあと、サイトは自分のものになりますか？", a: "1年以上ご契約いただいた場合、サイトの譲渡は無料です。ドメインの移管もできます。" },
];

function Head({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead?: React.ReactNode }) {
    return (
        <div className="mb-8 md:mb-10">
            <p className="flex items-center gap-3 text-[13px] font-bold md:text-[15px]" style={{ color: V4.coralDeep }}>
                <span aria-hidden className="block h-px w-8" style={{ backgroundColor: V4.coralDeep }} />
                {eyebrow}
            </p>
            <h2 className={`${heavy.className} mt-3 text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.35] tracking-[-0.02em]`} style={{ color: V4.navy }}>{title}</h2>
            {lead && <p className="mt-3 text-[15px] leading-[1.9] md:text-[17px]" style={{ color: V4.sub }}>{lead}</p>}
        </div>
    );
}

function LineButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <a href={LINE} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-[60px] items-center justify-center gap-3 rounded-full px-7 text-[17px] font-bold text-white shadow-[0_12px_30px_rgba(232,80,58,0.3)] transition-transform hover:-translate-y-0.5 ${className}`} style={{ backgroundColor: V4.coralDeep }}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-black" style={{ color: V4.coralDeep }} aria-hidden>LINE</span>
            <span className="whitespace-nowrap">{children}</span>
            <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden />
        </a>
    );
}

export default function SaitamaPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar variant="light" />

            {/* FV */}
            <section className="px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40" style={{ backgroundColor: V4.cream }}>
                <div className="mx-auto max-w-4xl">
                    <p className="flex items-center gap-3 text-[13px] font-bold md:text-[16px]" style={{ color: V4.coralDeep }}>
                        <span aria-hidden className="block h-px w-8" style={{ backgroundColor: V4.coralDeep }} />
                        <span><span className="nowrap">熊谷・深谷・本庄など、</span><span className="nowrap">埼玉北部を中心に対応</span></span>
                    </p>
                    <h1 className={`${heavy.className} mt-4 text-[clamp(1.7rem,5.2vw,3.4rem)] leading-[1.3] tracking-[-0.03em]`} style={{ color: V4.navy }}>
                        <span className="nowrap">埼玉北部の</span><span className="nowrap">ホームページ制作は、</span><br />
                        <span style={{ color: V4.teal }}>初期0円</span>・<span style={{ color: V4.coralDeep }}>月額8,980円</span>。
                    </h1>
                    <p className="mt-5 text-[16px] leading-[1.9] md:text-[19px]" style={{ color: V4.navy }}>
                        熊谷・深谷・本庄など、埼玉北部の小さな会社・お店・教室のホームページを、制作から公開後の更新・管理までまとめてお引き受けします。代表は本庄市児玉町の出身です。契約前に、トップページのデザイン案を無料でお作りします。
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-bold md:text-[17px]" style={{ color: V4.navy }}>
                        {["10ページまで制作", "修正・更新は無制限", "ドメイン・サーバー費込み", "LINE・メールで完結"].map((c) => (
                            <li key={c} className="flex items-center gap-2"><CircleCheck className="h-6 w-6 shrink-0" strokeWidth={1.8} style={{ color: V4.teal }} aria-hidden />{c}</li>
                        ))}
                    </ul>
                    <LineButton className="mt-8 w-full sm:w-auto">無料でデザイン案を見る</LineButton>
                    <p className="mt-3 text-[13px] md:text-[14px]" style={{ color: V4.sub }}><span className="nowrap">申し込みだけで契約・請求は発生しません。</span><span className="nowrap">最低契約期間1年・初年度総額107,760円（税込）。</span></p>
                </div>
            </section>

            {/* こんな方へ */}
            <section className="px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-5xl">
                    <Head eyebrow="こんな方へ" title={<>埼玉北部の小さな事業の、<span className="nowrap">こんなお悩みに。</span></>} />
                    <ul className="grid gap-5 md:grid-cols-3">
                        {fit.map((f) => (
                            <li key={f.t} className="rounded-2xl border p-6" style={{ borderColor: "rgba(20,51,90,0.12)" }}>
                                <p className={`${heavy.className} text-[18px] leading-[1.5]`} style={{ color: V4.navy }}>{chunks(f.t)}</p>
                                <p className="mt-2 text-[14.5px] leading-[1.8]" style={{ color: V4.sub }}>{f.d}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-[15px] leading-[1.9] md:text-[16px]" style={{ color: V4.navy }}>
                        NEXT VALLEY（ネクストバレー）は、本庄市児玉町出身の代表が運営するWeb制作・集客支援です。2021年の開業から、広告代理店経由の案件を含めて100社以上のホームページ制作と集客をお手伝いしてきました。作って終わりにせず、ホームページ・Googleマップ・LINEをつなげて、問い合わせにつながるところまで設計します。
                    </p>
                </div>
            </section>

            {/* 料金 */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: "#F6F9FA" }}>
                <div className="mx-auto max-w-5xl">
                    <Head eyebrow="料金" title={<>初期制作費<span style={{ color: V4.teal }}>0円</span>・月額<span style={{ color: V4.coralDeep }}>8,980円</span>（税込）</>} lead="見積もりは要りません。どの地域でも同じ料金で、月額に次の内容がすべて含まれます。" />
                    <dl className="overflow-hidden rounded-2xl border bg-white text-[15px]" style={{ borderColor: "rgba(20,51,90,0.12)" }}>
                        {included.map(([k, v]) => (
                            <div key={k} className="flex flex-col gap-1 border-b px-5 py-4 last:border-b-0 lg:flex-row lg:gap-6" style={{ borderColor: "rgba(20,51,90,0.1)" }}>
                                <dt className="shrink-0 font-bold lg:w-[42%]" style={{ color: V4.navy }}>{k}</dt>
                                <dd style={{ color: V4.sub }}>{v}</dd>
                            </div>
                        ))}
                    </dl>
                    <p className="mt-5 text-[13.5px] leading-[1.8]" style={{ color: V4.sub }}>
                        最低契約期間は1年間（初年度のお支払総額107,760円・税込）、契約日から課金。1年以上のご契約でサイトの譲渡は無料です。Googleマップ運用・SNS運用・継続的なSEO・LINE公式の構築運用などの集客支援は、内容に応じて別途お見積もりします。
                    </p>
                    <p className="mt-4"><Link href="/price" className="inline-flex items-center gap-1 text-[15px] font-bold underline underline-offset-4" style={{ color: V4.navy }}>料金・サービスの詳細を見る <ArrowUpRight className="h-4 w-4" aria-hidden /></Link></p>
                </div>
            </section>

            {/* 流れ */}
            <section className="px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-5xl">
                    <Head eyebrow="ご依頼の流れ" title={<>デザイン案を見てから、<span className="nowrap">依頼するか決められます。</span></>} />
                    <ol className="grid gap-6 lg:grid-cols-5 lg:gap-4">
                        {steps.map((s, i) => (
                            <li key={s.n} className="flex gap-4 lg:block">
                                <span className="text-[34px] font-bold italic leading-none md:text-[40px]" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: i % 2 === 0 ? V4.coralDeep : V4.teal }}>{s.n}</span>
                                <div className="lg:mt-3">
                                    <p className={`${heavy.className} text-[17px] leading-[1.5]`} style={{ color: V4.navy }}>{s.t}</p>
                                    <p className="mt-1 text-[14px] leading-[1.8]" style={{ color: V4.sub }}>{s.d}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* 対応エリア */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: V4.cream }}>
                <div className="mx-auto max-w-5xl">
                    <Head eyebrow="対応エリア" title={<>埼玉北部から、<span className="nowrap">県内全域・全国へ。</span></>} lead="地域の事情に合わせた記事も書いています。あなたの地域に近いものからご覧ください。" />
                    <div className="grid gap-5 md:grid-cols-2">
                        {areas.map((a) => (
                            <div key={a.name} className="rounded-2xl border bg-white p-6" style={{ borderColor: "rgba(20,51,90,0.12)" }}>
                                <h3 className={`${heavy.className} text-[17px] leading-[1.5]`} style={{ color: V4.navy }}>{chunks(a.name)}</h3>
                                <p className="mt-2 text-[14.5px] leading-[1.8]" style={{ color: V4.sub }}>{a.body}</p>
                                <Link href={a.link.href} className="mt-2 inline-flex min-h-11 items-center text-[14px] font-bold underline underline-offset-4" style={{ color: V4.coralDeep }}>{a.link.label} →</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 実績 */}
            <section className="px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-5xl">
                    <Head eyebrow="実績" title={<>公開したあとの数字まで、<span className="nowrap">お見せしています。</span></>} />
                    <div className="grid gap-5 md:grid-cols-2">
                        {cases.map((c) => (
                            <Link key={c.href} href={c.href} className="block rounded-2xl border p-6 transition-colors hover:border-[#E8503A]" style={{ borderColor: "rgba(20,51,90,0.12)" }}>
                                <p className={`${heavy.className} text-[18px] leading-[1.5]`} style={{ color: V4.navy }}>{chunks(c.t)}</p>
                                <p className="mt-2 text-[14.5px] leading-[1.8]" style={{ color: V4.sub }}>{c.d}</p>
                                <span className="mt-3 inline-block text-[14px] font-bold" style={{ color: V4.coralDeep }}>事例を読む →</span>
                            </Link>
                        ))}
                    </div>
                    <p className="mt-6 text-[14px]" style={{ color: V4.sub }}>ほかの制作実績は<Link href="/works" className="underline underline-offset-4" style={{ color: V4.navy }}>制作実績のページ</Link>でご覧ください。毎月お渡しする集客レポートの<Link href="/blog/monthly-report-sample" className="underline underline-offset-4" style={{ color: V4.navy }}>サンプルも公開しています</Link>。</p>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: "#F6F9FA" }}>
                <div className="mx-auto max-w-3xl">
                    <Head eyebrow="よくある質問" title={<>埼玉北部のお客様から、<span className="nowrap">よくいただく質問。</span></>} />
                    <dl className="divide-y" style={{ borderColor: "rgba(20,51,90,0.12)" }}>
                        {faqs.map((f) => (
                            <div key={f.q} className="py-5">
                                <dt className={`${heavy.className} flex gap-3 text-[16px] leading-[1.6] md:text-[18px]`} style={{ color: V4.navy }}><span className="shrink-0" style={{ color: V4.coralDeep }}>Q</span><span>{chunks(f.q)}</span></dt>
                                <dd className="mt-2 flex gap-3 text-[15px] leading-[1.9]" style={{ color: V4.sub }}><span className="shrink-0 font-bold" style={{ color: V4.teal }}>A</span><span>{f.a}</span></dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: V4.mist }}>
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className={`${heavy.className} text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.4] tracking-[-0.02em]`} style={{ color: V4.navy }}>
                        まずは、あなたの事業の<br /><span style={{ color: V4.teal }}>デザイン案</span>を見てみませんか。
                    </h2>
                    <p className="mt-4 text-[15px] leading-[1.9] md:text-[17px]" style={{ color: V4.navy }}><span className="nowrap">新規制作も、リニューアルも。</span><br />今のホームページのURLを送っていただければ、直す順番も無料でお返しします。</p>
                    <LineButton className="mt-8 w-full sm:w-auto">LINEで無料プレビューを申し込む</LineButton>
                    <p className="mt-4 text-[14px]" style={{ color: V4.sub }}><Link href="/preview" className="underline underline-offset-4">無料プレビューの詳細を見る</Link>　｜　<Link href="/contact" className="underline underline-offset-4">メールで問い合わせる</Link></p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
