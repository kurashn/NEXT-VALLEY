// 料金ページ（/price）— トップの料金セクションだけでは受け止められない
// 「ホームページ制作 費用 / 相場」で調べている人のための独立ページ。
// 入口商品は「ホームページ制作・管理」（初期0円／月額8,980円税込）。
// 入口商品（月額）と継続的な集客改善（お見積もり）の2本立て。買い切りは扱わない。
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading } from "@/components/ui/SerifHeading";
import { ArrowRight, Check, Minus } from "lucide-react";
import Link from "next/link";
import { withLang, langAttr, alternatesFor, type Lang } from "@/i18n";
import { priceJsonLd } from "@/lib/jsonld";

const ja = {
    eyebrow: "PRICE",
    h1: "ホームページ制作の料金",
    lead: "会社・お店・教室の問い合わせや予約を増やすために、Webまわりを整えて、公開してからも改善を続ける仕事をしています。入口になるのは、初期制作費0円・月額8,980円（税込）のホームページ制作・管理です。ご提案とお見積もりまでは無料です。",

    /* A: 入口商品 */
    entryHeadingEn: "Plan",
    entryHeadingJp: "入口の商品",
    entryLabel: "まずはここから",
    entryTitle: "ホームページ制作・管理",
    entryDesc:
        "制作費をいただかず、月額だけでホームページを持てる形です。公開した後の修正・更新も月額に含めているので、お知らせや料金の変更も、そのつどご連絡いただければこちらで直します。",
    initialLabel: "初期制作費",
    initialPrice: "0円",
    monthlyLabel: "月額",
    monthlyPrice: "8,980円",
    monthlyTax: "（税込）",
    specsTitle: "ご契約の条件",
    specs: [
        { k: "制作ページ数", v: "10ページまで" },
        { k: "11ページ目以降", v: "1ページにつき月額1,000円（税込）を追加。お知らせ・ブログの記事は数えません" },
        { k: "修正・更新", v: "回数の制限なし" },
        { k: "ドメイン・サーバー費", v: "月額に含みます" },
        { k: "最低契約期間", v: "1年間" },
        { k: "契約の更新", v: "1年後は自動更新。以降はいつでも解約できます（前月末までにお申し出ください）" },
        { k: "課金の開始", v: "ご契約日から" },
        { k: "サイトの譲渡", v: "1年以上のご契約で譲渡できます（費用なし。ドメインも移管します）" },
    ],
    totalLabel: "初年度のお支払い総額",
    totalPrice: "107,760円（税込）",
    totalNote: "月額8,980円（税込）の12か月分です。これ以外に初期費用はいただきません。",
    entryCta: "無料プレビューで完成イメージを見る",
    entryCtaNote: "費用0円・契約不要。デザイン案を見てからご判断ください",

    inclTitle: "月額に含まれるもの",
    incl: [
        "10ページまでのホームページ制作",
        "公開後の修正・更新（回数の制限なし。デザインの全面的な作り替えは別途お見積もり）",
        "ドメイン・サーバーの管理",
        "お問い合わせ・予約フォームの設置",
        "LINE公式アカウントへのリンク設置",
        "基本的な検索向け設定（検索結果に出るページの題名や説明文などの設定）",
    ],
    exclTitle: "月額に含まれないもの",
    excl: [
        "Googleマップ（地図検索で見つけてもらうための対策）の運用",
        "SNSの運用",
        "継続的なSEO（検索から見てもらうための改善）支援",
        "LINE公式アカウントの構築・運用",
    ],
    exclNote: "これらをご希望の場合は、下の「継続的な集客改善」で別途お受けしています。月額8,980円には含まれません。",

    /* B: 継続的な集客改善 */
    growthHeadingEn: "Growth",
    growthHeadingJp: "継続的な集客改善",
    growthLead:
        "ホームページができた後、問い合わせや予約を増やすための改善を続ける支援です。どこまでお任せいただくかで内容が変わるため、金額はお見積もりでご提示します。",
    growthItems: [
        "Googleマップ（地図検索）の情報整備",
        "問い合わせ・予約ページの改善",
        "LINEでの相談・予約の導線づくり",
        "検索から見てもらうための改善",
        "アクセス数・相談数・予約数の計測",
        "数字をもとにした改善のご提案と、その実行",
    ],
    growthPriceLabel: "料金",
    growthPrice: "内容に応じてお見積もり",
    growthNote: "まず今の状況を伺い、何から手をつけるかをご相談してからお見積もりします。",

    /* C: 業務効率化 */
    opsTitle: "追加のご相談",
    opsBody:
        "予約の受付やリマインド、問い合わせ対応にかかる手間を減らす仕組みも、ご相談に応じて一緒に考えます。内容を伺ってからのお見積もりです。",


    factorsTitle: "金額を左右する4つのこと",
    factorsLead:
        "継続的な集客改善などのお見積もりでは、たいていこの4点で金額が変わります。相見積もりを取るときも、ここを揃えて比べると差が分かります。",
    factors: [
        {
            n: "01",
            t: "ページ数",
            d: "トップページだけか、コース紹介や講師紹介まで作るか。1枚のページと10ページのサイトでは当然変わります。まず何ページ必要かを決めると、金額の見通しが立ちます。",
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
            d: "公開して終わりにせず、数字を見ながら改善を続けるか。月額に含まれる修正・更新だけで足りるか、継続的な集客改善まで頼むかはここで決まります。",
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
        "料金表を見比べても、出来上がりは分かりません。NEXT VALLEYでは契約の前に、あなたの教室・お店のトップページ案を無料でお作りしてお見せしています。3営業日以内にお届けし、気に入らなければそこで終わりで構いません。",
    ctaBtn: "無料プレビューを見る",
    ctaNote: "費用0円・契約不要・しつこい営業なし",
};

const en: typeof ja = {
    eyebrow: "PRICE",
    h1: "Pricing",
    lead: "We help schools and studios get more trial-lesson bookings: building the website, then keeping it improving after launch. The starting point is our website build and management plan, with no setup fee and a monthly fee of ¥8,980 (tax incl.). The proposal and quote are free.",

    entryHeadingEn: "Plan",
    entryHeadingJp: "The main plan",
    entryLabel: "Start here",
    entryTitle: "Website build and management",
    entryDesc:
        "No setup fee: you pay a monthly fee only. Edits and updates after launch are included, so when your trial-lesson details or fees change, message us and we make the change for you.",
    initialLabel: "Setup fee",
    initialPrice: "¥0",
    monthlyLabel: "Monthly",
    monthlyPrice: "¥8,980",
    monthlyTax: " (tax incl.)",
    specsTitle: "Terms",
    specs: [
        { k: "Pages built", v: "Up to 10 pages" },
        { k: "11th page onward", v: "¥1,000 a month (tax incl.) per extra page. News and blog posts do not count" },
        { k: "Edits and updates", v: "No limit on the number" },
        { k: "Domain and hosting", v: "Included in the monthly fee" },
        { k: "Minimum term", v: "1 year" },
        { k: "Billing starts", v: "On the contract date" },
        { k: "Site ownership", v: "Transferable to you after one year or more" },
    ],
    totalLabel: "Total for the first year",
    totalPrice: "¥107,760 (tax incl.)",
    totalNote: "That is ¥8,980 (tax incl.) for 12 months. There is nothing else to pay up front.",
    entryCta: "See a free preview of your design",
    entryCtaNote: "¥0, no contract. Look at the design first, then decide.",

    inclTitle: "What the monthly fee covers",
    incl: [
        "A website of up to 10 pages",
        "Edits and updates after launch (no limit on the number; a full redesign is quoted separately)",
        "Domain and hosting management",
        "Contact and trial-lesson forms",
        "A link to your LINE official account",
        "Basic search settings (the page title and description shown in search results)",
    ],
    exclTitle: "What it does not cover",
    excl: [
        "Managing your Google Maps listing (local search)",
        "Running your social media accounts",
        "Ongoing SEO (improving how you are found in search)",
        "Building or running a LINE official account",
    ],
    exclNote: "These are handled separately under “Ongoing growth work” below. They are not part of the ¥8,980 monthly fee.",

    growthHeadingEn: "Growth",
    growthHeadingJp: "Ongoing growth work",
    growthLead:
        "Work that continues after launch, aimed at increasing trial-lesson bookings. The scope differs for every school, so the amount is confirmed in your quote.",
    growthItems: [
        "Setting up and maintaining your Google Maps listing",
        "Improving the trial-lesson page",
        "Making it easy to ask questions and book over LINE",
        "Improving how you are found in search",
        "Measuring visits, inquiries and trial bookings",
        "Proposing improvements from those numbers, and carrying them out",
    ],
    growthPriceLabel: "Price",
    growthPrice: "Quoted by scope",
    growthNote: "We ask where you are now, agree what to tackle first, and then quote.",

    opsTitle: "Other things you can ask about",
    opsBody:
        "If booking, reminders or answering inquiries take too much of your time, we can look at that with you. Quoted once we know what is involved.",


    factorsTitle: "Four things that move the price",
    factorsLead:
        "For ongoing growth work and other quotes, the cost usually varies on these four points. Line them up when comparing quotes and the differences become clear.",
    factors: [
        {
            n: "01",
            t: "Number of pages",
            d: "Just a homepage, or courses and teacher profiles too? A single page and a ten-page site are different jobs. Deciding the page count first makes the budget predictable.",
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
            d: "Stop at launch, or keep improving with the numbers? That decides whether the edits included in the monthly plan are enough, or ongoing growth work is worth adding.",
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
        "Comparing price tables tells you nothing about the result. Before any contract, we design the homepage for your school or shop and show it to you, free of charge. Delivered within 3 business days; if you don't like it, that's the end of it.",
    ctaBtn: "See a free preview",
    ctaNote: "¥0 · no contract · no pushy sales",
};

const copy: Record<Lang, typeof ja> = { ja, en };

export function priceMetadata(lang: Lang): Metadata {
    if (lang === "en") {
        return {
            title: "Pricing | Website production and web marketing",
            description:
                "Website build and management with no setup fee, ¥8,980 a month (tax incl.): up to 10 pages, unlimited edits, domain and hosting included, one-year minimum. Ongoing growth work quoted by scope. Proposal and quote are free.",
            alternates: alternatesFor("/price", "en"),
            openGraph: {
                title: "Pricing | NEXT VALLEY",
                description:
                    "No setup fee, ¥8,980 a month (tax incl.) for a website we build and keep updated. Proposal and quote are free.",
                url: "https://www.nextvalley-jpn.com/en/price",
                locale: "en_US",
                type: "website",
            },
        };
    }
    return {
        title: "料金｜ホームページ制作・管理は初期0円＋月額8,980円（税込）",
        description:
            "ホームページ制作・管理は初期制作費0円、月額8,980円（税込）。10ページまで制作、修正・更新は無制限、ドメイン・サーバー費込み、最低契約1年（初年度総額107,760円・税込）。継続的な集客改善は内容に応じてお見積もり。ご提案・お見積もりは無料です。",
        alternates: alternatesFor("/price"),
        openGraph: {
            title: "料金｜ホームページ制作・管理は初期0円＋月額8,980円（税込） | NEXT VALLEY",
            description:
                "初期制作費0円・月額8,980円（税込）でホームページの制作と管理。ご提案・お見積もりは無料です。",
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
                        <p className="text-[15px] leading-[2] text-ink-sub md:text-[16px]">{t.lead}</p>
                    </FadeIn>
                </div>
            </section>

            {/* A: 入口商品 ＝ ホームページ制作・管理（月額8,980円） */}
            <section className="px-4 py-14 md:px-6 md:py-20">
                <div className="mx-auto max-w-5xl">
                    <FadeIn>
                        <SerifHeading en={t.entryHeadingEn} jp={t.entryHeadingJp} />
                    </FadeIn>

                    <FadeIn>
                        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_48px_rgba(31,26,20,0.1)]">
                            <div className="flex flex-col md:flex-row md:items-stretch">
                                {/* 左: 金額 */}
                                <div className="relative overflow-hidden bg-navy-deep p-7 text-white md:w-[44%] md:p-10">
                                    <div
                                        aria-hidden
                                        className="absolute inset-0 opacity-30"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(var(--color-navy-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-navy-line) 1px, transparent 1px)",
                                            backgroundSize: "64px 64px",
                                        }}
                                    />
                                    <div className="relative">
                                        <p className="mb-3 text-xs font-bold tracking-[0.25em] text-coral">{t.entryLabel}</p>
                                        <h3 className="mb-4 text-2xl font-bold leading-snug md:text-[28px]">{t.entryTitle}</h3>
                                        <p className="mb-7 text-[15px] leading-[1.9] text-navy-sub">{t.entryDesc}</p>

                                        <p className="mb-1">
                                            <span className="text-sm text-navy-sub">{t.initialLabel}</span>{" "}
                                            <span className="text-3xl font-bold tabular-nums">{t.initialPrice}</span>
                                        </p>
                                        <p>
                                            <span className="text-sm text-navy-sub">{t.monthlyLabel}</span>{" "}
                                            <span className="text-4xl font-bold tabular-nums">{t.monthlyPrice}</span>
                                            <span className="text-sm">{t.monthlyTax}</span>
                                        </p>

                                        <div className="mt-7 rounded-xl bg-white/10 p-4">
                                            <p className="text-xs text-navy-sub">{t.totalLabel}</p>
                                            <p className="text-xl font-bold tabular-nums">{t.totalPrice}</p>
                                            <p className="mt-1 text-xs leading-[1.8] text-navy-sub">{t.totalNote}</p>
                                        </div>
                                    </div>
                                    <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full bg-coral" />
                                </div>

                                {/* 右: 条件とCTA */}
                                <div className="flex-1 p-7 md:p-10">
                                    <p className="mb-4 text-xs font-bold tracking-[0.2em] text-ink-sub">{t.specsTitle}</p>
                                    <dl className="mb-8 divide-y divide-line">
                                        {t.specs.map((s) => (
                                            <div key={s.k} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                                                <dt className="text-[14px] leading-snug text-ink-sub">{s.k}</dt>
                                                <dd className="text-[15px] font-bold leading-snug text-ink">{s.v}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                    <Link
                                        href={withLang(lang, "/preview")}
                                        className="group inline-flex h-14 items-center gap-2 rounded-full bg-coral-deep px-7 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
                                    >
                                        {t.entryCta}
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                                    </Link>
                                    <p className="mt-3 text-[13px] leading-[1.8] text-ink-sub">{t.entryCtaNote}</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* 含まれるもの / 含まれないもの */}
                    <div className="mt-6 grid gap-5 md:mt-8 md:grid-cols-2">
                        <FadeIn>
                            <div className="h-full rounded-2xl border border-line bg-white p-6 md:p-8">
                                <h3 className="mb-5 text-lg font-bold leading-snug text-ink">{t.inclTitle}</h3>
                                <ul className="grid gap-3">
                                    {t.incl.map((i) => (
                                        <li key={i} className="flex items-start gap-3 text-[15px] leading-[1.85] text-ink">
                                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral/15">
                                                <Check className="h-3.5 w-3.5 text-coral-deep" aria-hidden />
                                            </span>
                                            <span>{i}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.05}>
                            <div className="h-full rounded-2xl border border-line bg-cream p-6 md:p-8">
                                <h3 className="mb-5 text-lg font-bold leading-snug text-ink">{t.exclTitle}</h3>
                                <ul className="grid gap-3">
                                    {t.excl.map((i) => (
                                        <li key={i} className="flex items-start gap-3 text-[15px] leading-[1.85] text-ink-sub">
                                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-faint/15">
                                                <Minus className="h-3.5 w-3.5 text-ink-sub" aria-hidden />
                                            </span>
                                            <span>{i}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-5 text-[13px] leading-[1.9] text-ink-sub">{t.exclNote}</p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* B: 継続的な集客改善 */}
            <section className="bg-cream px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-5xl">
                    <FadeIn>
                        <SerifHeading en={t.growthHeadingEn} jp={t.growthHeadingJp} />
                        <p className="-mt-6 mb-10 max-w-3xl text-[15px] leading-[2] text-ink-sub">{t.growthLead}</p>
                    </FadeIn>
                    <FadeIn>
                        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-10">
                            <ul className="grid gap-3 md:grid-cols-2 md:gap-x-10">
                                {t.growthItems.map((g) => (
                                    <li key={g} className="flex items-start gap-3 text-[15px] leading-[1.85] text-ink">
                                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral/15">
                                            <Check className="h-3.5 w-3.5 text-coral-deep" aria-hidden />
                                        </span>
                                        <span>{g}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-7 border-t border-line pt-6">
                                <p className="text-xs font-bold tracking-[0.2em] text-ink-sub">{t.growthPriceLabel}</p>
                                <p className="mt-1 text-xl font-bold leading-snug text-ink md:text-2xl">{t.growthPrice}</p>
                                <p className="mt-2 text-[14px] leading-[1.9] text-ink-sub">{t.growthNote}</p>
                            </div>
                        </div>
                    </FadeIn>

                    {/* C: 業務効率化は短く */}
                    <FadeIn delay={0.05}>
                        <div className="mt-5 rounded-xl border border-line bg-white p-5 md:p-6">
                            <h3 className="mb-2 text-[16px] font-bold text-ink">{t.opsTitle}</h3>
                            <p className="text-[14px] leading-[1.95] text-ink-sub">{t.opsBody}</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 金額を左右する4つのこと */}
            <section className="bg-cream px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-3xl">
                    <FadeIn>
                        <h2 className="mb-4 text-2xl font-bold leading-snug md:text-3xl">{t.factorsTitle}</h2>
                        <p className="mb-10 text-[15px] leading-[2] text-ink-sub">{t.factorsLead}</p>
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

            {/* ご紹介割引の案内 */}
            <section className="px-4 pb-16 md:px-6">
                <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-cream p-6 text-center">
                    <p className="text-sm leading-relaxed text-ink-sub">
                        {lang === "ja" ? (
                            <>
                                ご紹介経由のご契約には割引をご用意しています。ご紹介いただいた方には紹介料をお渡しします。詳しくは
                                <Link href="/partner" className="font-bold text-coral-deep underline underline-offset-2">ご紹介パートナー制度</Link>
                                をご覧ください。
                            </>
                        ) : (
                            <>
                                Referred clients get a discount, and referrers receive a referral fee.{" "}
                                <Link href="/partner" className="font-bold text-coral-deep underline underline-offset-2">Learn more (Japanese)</Link>
                            </>
                        )}
                    </p>
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
