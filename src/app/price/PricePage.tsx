// 料金ページ（/price）— トップの料金セクションだけでは受け止められない
// 「ホームページ制作 費用 / 相場」で調べている人のための独立ページ。
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Pricing } from "@/components/Pricing";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { withLang, langAttr, alternatesFor, type Lang } from "@/i18n";
import { priceJsonLd } from "@/lib/jsonld";

const ja = {
    eyebrow: "PRICE",
    h1: "ホームページ制作の料金",
    lead: "ご提案とお見積もりまでは無料です。まず内容と金額を見てから、判断してください。ここに載せているのは目安で、正式な金額はお見積もりでご提示します。",
    factorsTitle: "金額を左右する4つのこと",
    factorsLead: "同じ「ホームページ制作」でも、金額が変わるのはたいていこの4点です。相見積もりを取るときも、ここを揃えて比べると差が分かります。",
    factors: [
        {
            n: "01",
            t: "ページ数",
            d: "トップページだけか、サービス紹介や事例まで作るか。1ページのLPと、10ページの企業サイトでは当然変わります。まず何ページ必要かを決めると、金額の見通しが立ちます。",
        },
        {
            n: "02",
            t: "文章と写真を誰が用意するか",
            d: "こちらで取材して書くのか、原稿をいただくのか。撮影に伺うのか、お持ちの写真を使うのか。ここが見積もりの差として最も大きく出る部分です。",
        },
        {
            n: "03",
            t: "必要な機能",
            d: "問い合わせフォームだけなら大きく変わりませんが、予約システム、会員機能、多言語対応などが入ると変わります。「今すぐ要るもの」と「後から足せるもの」を分けると無駄がありません。",
        },
        {
            n: "04",
            t: "公開後をどうするか",
            d: "作って終わりにするか、更新と改善を続けるか。月額の有無はここで決まります。ご自身で更新される場合は、その仕組みごとお渡しします。",
        },
    ],
    extraTitle: "追加料金について",
    extraBody:
        "お見積もりの後で金額が増えるのは、ご依頼の内容そのものが増えたときだけです。作業の途中で「これも必要でした」と後出しすることはありません。追加が発生しそうなときは、着手前に必ずお伝えして、進めるかどうかを決めていただきます。",
    flowTitle: "お見積もりまでの流れ",
    flow: [
        { t: "ご相談", d: "LINEまたはメールでご連絡ください。今のサイトのURLを送っていただくだけで大丈夫です。" },
        { t: "現状の確認", d: "何にお困りか、どこを目指すかを伺います。既存サイトがあれば、こちらで一度診断します。" },
        { t: "ご提案とお見積もり", d: "改善案と金額をセットでご提示します。ここまで費用はかかりません。" },
        { t: "ご判断", d: "内容を見てからお決めください。お断りいただいても構いません。" },
    ],
    ctaTitle: "金額より先に、実物を見ませんか",
    ctaBody:
        "料金表を見比べても、出来上がりは分かりません。NEXT VALLEYでは契約の前に、あなたのお店・教室・会社のトップページ案を無料でお作りしてお見せしています。3営業日以内にお届けし、気に入らなければそこで終わりで構いません。",
    ctaBtn: "無料プレビューを見る",
    ctaNote: "費用0円・契約不要・しつこい営業なし",
};

const en: typeof ja = {
    eyebrow: "PRICE",
    h1: "Pricing",
    lead: "The proposal and quote are free. See exactly what you get and what it costs before you decide. The figures below are guides; the final amount is confirmed in your quote.",
    factorsTitle: "Four things that move the price",
    factorsLead: "For the same “website project,” the cost usually varies on these four points. Line them up when comparing quotes and the differences become clear.",
    factors: [
        {
            n: "01",
            t: "Number of pages",
            d: "Just a homepage, or services and case studies too? A single landing page and a ten-page company site are different jobs. Deciding the page count first makes the budget predictable.",
        },
        {
            n: "02",
            t: "Who prepares the words and photos",
            d: "Do we interview you and write it, or do you supply the copy? Do we come and shoot, or use photos you already have? This is where quotes differ most.",
        },
        {
            n: "03",
            t: "Features you actually need",
            d: "A contact form changes little. Booking systems, member areas, or multiple languages do. Separating “needed now” from “can be added later” avoids waste.",
        },
        {
            n: "04",
            t: "What happens after launch",
            d: "Build and hand over, or keep improving it? That decides whether there is a monthly fee. If you want to update it yourself, we hand over the tools to do so.",
        },
    ],
    extraTitle: "About extra charges",
    extraBody:
        "The amount only rises after a quote if the scope itself grows. We never discover mid-project that something else was required. If anything looks like it will add cost, we tell you before starting and let you decide.",
    flowTitle: "How we get to a quote",
    flow: [
        { t: "Get in touch", d: "Message us on LINE or by email. Sending the URL of your current site is enough." },
        { t: "Review", d: "We ask what is not working and where you want to get to, and review your existing site." },
        { t: "Proposal and quote", d: "You get a plan with pricing. Nothing to pay up to this point." },
        { t: "Your decision", d: "Decide after reading it. Saying no is completely fine." },
    ],
    ctaTitle: "See the real thing before the numbers",
    ctaBody:
        "Comparing price tables tells you nothing about the result. Before any contract, we design your homepage and show it to you, free of charge. Delivered within 3 business days; if you don't like it, that's the end of it.",
    ctaBtn: "See a free preview",
    ctaNote: "¥0 · no contract · no pushy sales",
};

const copy: Record<Lang, typeof ja> = { ja, en };

export function priceMetadata(lang: Lang): Metadata {
    if (lang === "en") {
        return {
            title: "Pricing | Website production and web marketing",
            description:
                "One-page sites from ¥55,000, websites from ¥165,000, and monthly growth support from ¥22,000. What moves the price, how extra charges work, and how we get to a quote. Proposal and quote are free.",
            alternates: alternatesFor("/price", "en"),
            openGraph: {
                title: "Pricing | NEXT VALLEY",
                description:
                    "Guide prices for websites, landing pages, SEO and social media. Proposal and quote are free.",
                url: "https://www.nextvalley-jpn.com/en/price",
                locale: "en_US",
                type: "website",
            },
        };
    }
    return {
        title: "料金｜ホームページ制作・Web集客の費用",
        description:
            "集客ページ制作 ¥55,000〜、ホームページ制作 ¥165,000〜、集客サポート 月¥22,000〜の料金目安。金額を左右する4つの要素、追加料金の考え方、お見積もりまでの流れを解説します。ご提案・お見積もりは無料です。",
        alternates: alternatesFor("/price"),
        openGraph: {
            title: "料金｜ホームページ制作・Web集客の費用 | NEXT VALLEY",
            description:
                "集客ページ制作・ホームページ制作・集客サポートの料金目安。ご提案・お見積もりは無料です。",
            url: "https://www.nextvalley-jpn.com/price",
            locale: "ja_JP",
            type: "website",
        },
    };
}

export function PricePage({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <main className="min-h-screen bg-base text-ink" {...langAttr(lang)}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(priceJsonLd(lang)) }}
            />
            <Navbar lang={lang} />

            {/* 見出し */}
            <section className="px-4 pb-4 pt-32 md:px-6 md:pt-36">
                <div className="mx-auto max-w-3xl">
                    <FadeIn>
                        <p className="mb-4 text-[13px] font-bold tracking-[0.3em] text-coral-deep">{t.eyebrow}</p>
                        <h1 className="mb-6 text-3xl font-bold leading-[1.4] md:text-4xl">{t.h1}</h1>
                        <p className="leading-[2] text-ink-sub">{t.lead}</p>
                    </FadeIn>
                </div>
            </section>

            {/* 料金表（トップと同じ内容） */}
            <Pricing lang={lang} />

            {/* 金額を左右する4つのこと */}
            <section className="bg-cream px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-3xl">
                    <FadeIn>
                        <h2 className="mb-4 text-2xl font-bold leading-snug md:text-3xl">{t.factorsTitle}</h2>
                        <p className="mb-10 leading-[2] text-ink-sub">{t.factorsLead}</p>
                    </FadeIn>
                    <div className="flex flex-col gap-5">
                        {t.factors.map((f, i) => (
                            <FadeIn key={f.n} delay={i * 0.05}>
                                <div className="rounded-xl bg-white p-6 shadow-sm md:p-7">
                                    <div className="mb-3 flex items-baseline gap-4">
                                        <span className="text-xl font-bold text-coral-deep">{f.n}</span>
                                        <h3 className="text-lg font-bold leading-snug">{f.t}</h3>
                                    </div>
                                    <p className="text-[15px] leading-[2] text-ink-sub">{f.d}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 追加料金 */}
            <section className="px-4 py-16 md:px-6 md:py-20">
                <div className="mx-auto max-w-3xl">
                    <FadeIn>
                        <div className="rounded-xl border-l-4 border-coral bg-cream p-6 md:p-8">
                            <h2 className="mb-3 text-xl font-bold md:text-2xl">{t.extraTitle}</h2>
                            <p className="text-[15px] leading-[2] text-ink-sub">{t.extraBody}</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* お見積もりまでの流れ */}
            <section className="px-4 pb-16 md:px-6 md:pb-24">
                <div className="mx-auto max-w-3xl">
                    <FadeIn>
                        <h2 className="mb-10 text-2xl font-bold leading-snug md:text-3xl">{t.flowTitle}</h2>
                    </FadeIn>
                    <ol className="flex flex-col gap-4">
                        {t.flow.map((s, i) => (
                            <FadeIn key={s.t} delay={i * 0.05}>
                                <li className="flex gap-5 rounded-xl border border-ink-faint/15 p-5 md:p-6">
                                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-deep text-sm font-bold text-white">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="mb-1.5 text-[16px] font-bold text-ink">{s.t}</h3>
                                        <p className="text-[15px] leading-[1.95] text-ink-sub">{s.d}</p>
                                    </div>
                                </li>
                            </FadeIn>
                        ))}
                    </ol>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-navy-deep px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <FadeIn>
                        <h2 className="mb-5 text-2xl font-bold leading-snug text-white md:text-3xl">{t.ctaTitle}</h2>
                        <p className="mx-auto mb-9 max-w-2xl text-[15px] leading-[2] text-navy-sub">{t.ctaBody}</p>
                        <Link
                            href={withLang(lang, "/preview")}
                            className="inline-flex h-14 items-center gap-3 rounded-lg bg-coral-deep px-8 text-[16px] font-bold text-white transition-opacity hover:opacity-90"
                        >
                            {t.ctaBtn}
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <p className="mt-4 text-sm text-navy-sub">{t.ctaNote}</p>
                    </FadeIn>
                </div>
            </section>

            <Footer lang={lang} />
        </main>
    );
}
