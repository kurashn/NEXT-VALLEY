// 本庄市のホームページ制作ページ
// 「本庄市 ホームページ制作」「ホームページ制作 本庄市」で探している人の受け皿。
// 地元出身であること・本庄と児玉郡で探されるときの事情・料金・流れ・FAQを1ページに。埼玉北部は /saitama-hokubu、県全体はトップページ。
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, ArrowUpRight, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { heavy, V4 } from "@/lib/fonts-v4";
import { chunks } from "@/lib/nowrap";

const LINE = "https://lin.ee/N4QXdJL";
const URL = "https://www.nextvalley-jpn.com/honjo";

export const metadata: Metadata = {
    title: "本庄市のホームページ制作｜本庄市児玉町出身・初期0円・月額8,980円",
    description:
        "本庄市・児玉郡の会社・お店・教室のホームページ制作。代表は本庄市児玉町の出身です。初期0円・月額8,980円（税込）で10ページまで制作、更新無制限。契約前にデザイン案を無料でお作りします。",
    alternates: { canonical: URL },
    openGraph: {
        title: "本庄市のホームページ制作｜本庄市児玉町出身の NEXT VALLEY",
        description: "本庄市・児玉郡の小さな事業のホームページを、制作から公開後の更新・管理まで。初期0円・月額8,980円（税込）。契約前にデザイン案を無料で。",
        url: URL,
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "本庄市のホームページ制作｜NEXT VALLEY" }],
    },
    twitter: { card: "summary_large_image", title: "本庄市のホームページ制作｜NEXT VALLEY", images: ["/og-image.png"] },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            name: "本庄市のホームページ制作",
            serviceType: "ホームページ制作・管理",
            url: URL,
            provider: { "@type": "Organization", name: "NEXT VALLEY", url: "https://www.nextvalley-jpn.com" },
            areaServed: [
                { "@type": "City", name: "本庄市" },
                { "@type": "City", name: "上里町" },
                { "@type": "City", name: "美里町" },
                { "@type": "City", name: "神川町" },
                { "@type": "City", name: "深谷市" },
                { "@type": "City", name: "伊勢崎市" },
            ],
            offers: { "@type": "Offer", price: "8980", priceCurrency: "JPY", description: "初期制作費0円・月額8,980円（税込）・最低契約期間1年" },
        },
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "ホーム", item: "https://www.nextvalley-jpn.com/" },
                { "@type": "ListItem", position: 2, name: "埼玉北部のホームページ制作", item: "https://www.nextvalley-jpn.com/saitama-hokubu" },
                { "@type": "ListItem", position: 3, name: "本庄市のホームページ制作", item: URL },
            ],
        },
    ],
};

/* 本庄・児玉で探されるときの事情（ほかの地域ページとの違いはここ） */
const local = [
    {
        t: "車で探され、車で来る",
        d: "本庄・児玉は車で動く方が多く、上里町・神川町・美里町や、隣の深谷市・群馬県の伊勢崎市からも来てもらえる地域です。駐車場の有無と台数、近くの目印（国道17号・462号沿い、本庄早稲田駅の近くなど）を、最初の画面から見える場所に書きます。",
    },
    {
        t: "「本庄」だけでなく、町名や駅名でも探される",
        d: "検索されるのは「本庄 整体」だけではありません。「児玉 ピアノ教室」「本庄早稲田 カフェ」「上里 美容室」のように、旧町名や駅名で探す方もいます。ページの見出しや説明文に、実際に探される地名を入れておきます。",
    },
    {
        t: "口コミと紹介が強い。だから、確かめに来る",
        d: "地元では、知り合いの紹介で名前を知ってから、ホームページやGoogleマップで確かめる方が多くいます。そこで料金や雰囲気が分からないと、連絡の手前で止まります。紹介された方が安心して連絡できる形に整えます。",
    },
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

const areas = ["本庄市（本庄地域・児玉地域）", "上里町", "美里町", "神川町", "深谷市", "熊谷市", "伊勢崎市・藤岡市（群馬県）"];

const reads = [
    { href: "/blog/honjo-google-maps", t: "本庄・児玉のお店と教室が、Googleマップで見つけてもらうためにやること" },
    { href: "/blog/honjo-website-subsidy", t: "本庄市でホームページを作るときに使える補助金（2026年版）" },
    { href: "/blog/honjo-classroom-website", t: "本庄の教室がホームページで体験レッスンの申込を増やす方法" },
    { href: "/blog/isesaki-honjo-line-marketing", t: "伊勢崎・本庄の教室とお店がLINE公式を「予約と再来店」に使う方法" },
    { href: "/blog/kumagaya-fukaya-shop-web-marketing", t: "熊谷・深谷のお店がGoogleマップとホームページで新規客を増やす手順" },
];

const faqs = [
    { q: "本庄の会社ですか？", a: "代表の倉林は本庄市児玉町の出身です。いまは全国のお客様とオンラインでお仕事をしていて、やり取りはLINEかメールで完結します。本庄・児玉の地名や道、お店の探され方は、地元の感覚でお話しできます。" },
    { q: "本当に初期費用はかかりませんか？", a: "かかりません。初期制作費0円・月額8,980円（税込）で、最低契約期間は1年間です。契約日から課金が始まり、それまでのデザイン案は無料です。" },
    { q: "今のホームページを直してもらうだけでもいいですか？", a: "はい。今のサイトのURLを送っていただければ、直す順番を無料でお返しします（無料診断）。作り直しが必要ない場合は、そうお伝えします。" },
    { q: "Googleマップの登録や口コミも相談できますか？", a: "できます。本庄・児玉では、ホームページより先にGoogleマップで見つけてもらう方が多い業種もあります。登録内容・写真・口コミのお願いの仕方まで、ホームページとあわせて整えます。" },
    { q: "写真や文章がまだありません。", a: "大丈夫です。業種と伝えたいことが分かれば、それに合った構成でお作りします。写真や文章は制作の段階で一緒に準備します。" },
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

export default function HonjoPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar variant="light" />

            {/* FV */}
            <section className="px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40" style={{ backgroundColor: V4.cream }}>
                <div className="mx-auto max-w-4xl">
                    <nav aria-label="パンくず" className="mb-6 text-[12.5px]" style={{ color: V4.sub }}>
                        <Link href="/" className="inline-flex min-h-11 min-w-11 items-center underline underline-offset-4">ホーム</Link>
                        <span className="mx-2">›</span>
                        <Link href="/saitama-hokubu" className="inline-flex min-h-11 items-center underline underline-offset-4">埼玉北部のホームページ制作</Link>
                        <span className="mx-2">›</span>
                        <span>本庄市</span>
                    </nav>
                    <p className="flex items-center gap-3 text-[13px] font-bold md:text-[16px]" style={{ color: V4.coralDeep }}>
                        <span aria-hidden className="block h-px w-8" style={{ backgroundColor: V4.coralDeep }} />
                        <span><span className="nowrap">代表は、</span><span className="nowrap">本庄市児玉町の出身です</span></span>
                    </p>
                    <h1 className={`${heavy.className} mt-4 text-[clamp(1.7rem,5.2vw,3.4rem)] leading-[1.3] tracking-[-0.03em]`} style={{ color: V4.navy }}>
                        <span className="nowrap">本庄市の</span><span className="nowrap">ホームページ制作。</span><br />
                        <span style={{ color: V4.teal }}>初期0円</span>・<span style={{ color: V4.coralDeep }}>月額8,980円</span>。
                    </h1>
                    <p className="mt-5 text-[16px] leading-[1.9] md:text-[19px]" style={{ color: V4.navy }}>
                        本庄市と児玉郡（上里町・美里町・神川町）の小さな会社・お店・教室のホームページを、制作から公開後の更新・管理まで。Googleマップ・LINEとあわせて、地元のお客様に見つけてもらえる形に整えます。契約前に、トップページのデザイン案を無料でお作りします。
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-bold md:text-[17px]" style={{ color: V4.navy }}>
                        {["10ページまで制作", "修正・更新は無制限", "ドメイン・サーバー費込み", "Googleマップ・LINEも"].map((c) => (
                            <li key={c} className="flex items-center gap-2"><CircleCheck className="h-6 w-6 shrink-0" strokeWidth={1.8} style={{ color: V4.teal }} aria-hidden />{c}</li>
                        ))}
                    </ul>
                    <LineButton className="mt-8 w-full sm:w-auto">無料でデザイン案を見る</LineButton>
                    <p className="mt-3 text-[13px] md:text-[14px]" style={{ color: V4.sub }}><span className="nowrap">申し込みだけで契約・請求は発生しません。</span><span className="nowrap">最低契約期間1年・初年度総額107,760円（税込）。</span></p>
                </div>
            </section>

            {/* 地元の事情 */}
            <section className="px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-5xl">
                    <Head
                        eyebrow="本庄・児玉で探されるとき"
                        title={<>地元で選ばれるホームページは、<span className="nowrap">探され方から考えます。</span></>}
                        lead="本庄で育った立場から、この地域でお客様がお店や教室を探すときに起きていることを、制作に反映します。"
                    />
                    <ul className="grid gap-5 md:grid-cols-3">
                        {local.map((f, i) => (
                            <li key={f.t} className="rounded-2xl border p-6" style={{ borderColor: "rgba(20,51,90,0.12)" }}>
                                <span className="text-[30px] font-bold italic leading-none" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: i % 2 === 0 ? V4.coralDeep : V4.teal }}>0{i + 1}</span>
                                <p className={`${heavy.className} mt-3 text-[18px] leading-[1.5]`} style={{ color: V4.navy }}>{chunks(f.t)}</p>
                                <p className="mt-2 text-[14.5px] leading-[1.85]" style={{ color: V4.sub }}>{f.d}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-[15px] leading-[1.9] md:text-[16px]" style={{ color: V4.navy }}>
                        NEXT VALLEY（ネクストバレー）は、本庄市児玉町出身の倉林 駿が運営するWeb制作・集客支援です。2021年の開業から、広告代理店経由の案件を含めて100社以上のホームページ制作と集客をお手伝いしてきました。作って終わりにせず、ホームページ・Googleマップ・LINEをつなげて、問い合わせにつながるところまで設計します。
                    </p>
                </div>
            </section>

            {/* 料金 */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: "#F6F9FA" }}>
                <div className="mx-auto max-w-5xl">
                    <Head eyebrow="料金" title={<>初期制作費<span style={{ color: V4.teal }}>0円</span>・月額<span style={{ color: V4.coralDeep }}>8,980円</span>（税込）</>} lead="見積もりは要りません。月額に次の内容がすべて含まれます。" />
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
                    <p className="mt-8 text-[14.5px]" style={{ color: V4.sub }}>今のホームページを直したい方は、<Link href="/shindan" className="font-bold underline underline-offset-4" style={{ color: V4.navy }}>無料診断</Link>から。URLを送るだけで、直す順番をお返しします。</p>
                </div>
            </section>

            {/* 対応エリア */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: V4.cream }}>
                <div className="mx-auto max-w-5xl">
                    <Head eyebrow="対応エリア" title={<>本庄市と、<span className="nowrap">その周りの地域。</span></>} lead="やり取りはLINEかメールで完結するので、県内全域・全国からもご依頼いただけます。" />
                    <ul className="flex flex-wrap gap-2.5">
                        {areas.map((a) => (
                            <li key={a} className="flex items-center gap-1.5 rounded-full border bg-white px-4 py-2 text-[14.5px] font-bold" style={{ borderColor: "rgba(20,51,90,0.15)", color: V4.navy }}>
                                <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.8} style={{ color: V4.coralDeep }} aria-hidden />{a}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-[14.5px]" style={{ color: V4.sub }}>熊谷・深谷など埼玉北部のほかの地域については<Link href="/saitama-hokubu" className="font-bold underline underline-offset-4" style={{ color: V4.navy }}>埼玉北部のホームページ制作</Link>のページをご覧ください。</p>

                    <h3 className={`${heavy.className} mt-12 text-[20px]`} style={{ color: V4.navy }}>本庄・児玉の事業者向けに書いた記事</h3>
                    <ul className="mt-4 grid gap-3 md:grid-cols-2">
                        {reads.map((r) => (
                            <li key={r.href}>
                                <Link href={r.href} className="flex h-full items-start justify-between gap-3 rounded-xl border bg-white px-5 py-4 text-[15px] font-bold leading-[1.6] transition-colors hover:border-[#E8503A]" style={{ borderColor: "rgba(20,51,90,0.12)", color: V4.navy }}>
                                    <span>{r.t}</span>
                                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" style={{ color: V4.coralDeep }} aria-hidden />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 実績 */}
            <section className="px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-5xl">
                    <Head eyebrow="実績" title={<>公開したあとの数字まで、<span className="nowrap">お見せしています。</span></>} />
                    <div className="grid gap-5 md:grid-cols-2">
                        {[
                            { t: "入会ゼロの英会話教室が、7か月で14名に", d: "自作サイトのままだった教室の導線を1本に整えたところ、体験申込が入るようになりました。", href: "/blog/case-english-school-zero-to-14" },
                            { t: "情報サイトが記事だけで月323人から4,167人に", d: "広告費0円・8か月。公開後に数字を見ながら記事を積み上げた実測です。", href: "/blog/case-bowling-media-growth" },
                        ].map((c) => (
                            <Link key={c.href} href={c.href} className="block rounded-2xl border p-6 transition-colors hover:border-[#E8503A]" style={{ borderColor: "rgba(20,51,90,0.12)" }}>
                                <p className={`${heavy.className} text-[18px] leading-[1.5]`} style={{ color: V4.navy }}>{chunks(c.t)}</p>
                                <p className="mt-2 text-[14.5px] leading-[1.8]" style={{ color: V4.sub }}>{c.d}</p>
                                <span className="mt-3 inline-block text-[14px] font-bold" style={{ color: V4.coralDeep }}>事例を読む →</span>
                            </Link>
                        ))}
                    </div>
                    <p className="mt-6 text-[14px]" style={{ color: V4.sub }}>ほかの制作実績は<Link href="/works" className="underline underline-offset-4" style={{ color: V4.navy }}>制作実績のページ</Link>でご覧ください。</p>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: "#F6F9FA" }}>
                <div className="mx-auto max-w-3xl">
                    <Head eyebrow="よくある質問" title={<>本庄のお客様から、<span className="nowrap">よくいただく質問。</span></>} />
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
                        本庄の事業のホームページ、<br /><span style={{ color: V4.teal }}>デザイン案</span>から見てみませんか。
                    </h2>
                    <p className="mt-4 text-[15px] leading-[1.9] md:text-[17px]" style={{ color: V4.navy }}><span className="nowrap">新規制作も、リニューアルも。</span><span className="nowrap">3営業日以内にお届けします。</span></p>
                    <LineButton className="mt-8 w-full sm:w-auto">LINEで無料プレビューを申し込む</LineButton>
                    <p className="mt-4 text-[14px]" style={{ color: V4.sub }}><Link href="/preview" className="underline underline-offset-4">無料プレビューの詳細</Link>　｜　<Link href="/shindan" className="underline underline-offset-4">今のサイトの無料診断</Link>　｜　<Link href="/contact" className="underline underline-offset-4">メールで問い合わせる</Link></p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
