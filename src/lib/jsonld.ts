// 構造化データ（JSON-LD）の共通定義。
// 検索結果での見え方に関わるため、事実と異なる値は絶対に入れないこと
// （評価・レビュー件数などを持っていないのに書くのはガイドライン違反）。

import { type Lang } from "@/i18n";

export const SITE = "https://www.nextvalley-jpn.com";

const org = {
    "@type": "Organization",
    name: "NEXT VALLEY",
    url: SITE,
    logo: `${SITE}/og-image.png`,
    email: "info@nextvalley-jpn.com",
};

const areaServed = { "@type": "Country", name: "Japan" };

/** 無料プレビュー制作（/preview）: 無料サービス＋よくある質問 */
export function previewJsonLd(lang: Lang, faq: { q: string; a: string }[]) {
    const url = lang === "en" ? `${SITE}/en/preview` : `${SITE}/preview`;
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                name: lang === "en" ? "Free Website Preview" : "無料プレビュー制作",
                description:
                    lang === "en"
                        ? "Before any contract, we design your homepage (desktop and mobile) free of charge and show it to you. Delivered within 3 business days."
                        : "契約の前に、お店・教室・会社のトップページ案（PC・スマホ）を無料でお作りしてお見せするサービス。3営業日以内にお届けします。",
                url,
                provider: org,
                areaServed,
                serviceType: lang === "en" ? "Website design preview" : "ホームページデザイン案の無料制作",
                offers: {
                    "@type": "Offer",
                    price: 0,
                    priceCurrency: "JPY",
                    availability: "https://schema.org/LimitedAvailability",
                    url,
                },
            },
            {
                "@type": "FAQPage",
                mainEntity: faq.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
            },
        ],
    };
}

/** Web集客セルフ診断（/shindan）: 無料で使えるWebツール */
export function shindanJsonLd(lang: Lang) {
    const url = lang === "en" ? `${SITE}/en/shindan` : `${SITE}/shindan`;
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: lang === "en" ? "Website Self-Check" : "Web集客セルフ診断",
        description:
            lang === "en"
                ? "Answer 15 yes/no questions and get your web marketing score, plus the fixes to tackle first. Free, no sign-up."
                : "はい／いいえの15問に答えるだけで、Web集客のスコアと優先的に直すべきポイントが分かる無料の診断ツール。登録不要・所要3分。",
        url,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        browserRequirements: lang === "en" ? "Requires JavaScript" : "JavaScript が有効なブラウザ",
        inLanguage: lang === "en" ? "en" : "ja",
        publisher: org,
        offers: { "@type": "Offer", price: 0, priceCurrency: "JPY" },
    };
}

/**
 * 料金ページ（/price）
 * ※ 金額は src/components/Pricing.tsx の rows と揃えること。片方だけ直すと食い違う
 */
const PRICE_ITEMS = [
    { ja: "LP制作", en: "Landing page", min: 110000, unit: "one-time" },
    { ja: "ホームページ制作", en: "Website", min: 220000, unit: "one-time" },
    { ja: "SEO・MEO集客", en: "SEO & Google Maps", min: 33000, unit: "monthly" },
    { ja: "SNSマーケティング", en: "Social media marketing", min: 44000, unit: "monthly" },
];

export function priceJsonLd(lang: Lang) {
    const url = lang === "en" ? `${SITE}/en/price` : `${SITE}/price`;
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: lang === "en" ? "Website production and web marketing" : "ホームページ制作・Web集客支援",
        description:
            lang === "en"
                ? "Website and landing page production, SEO and Google Maps marketing, and social media support for small businesses in Japan. Proposal and quote are free."
                : "ホームページ・LP制作、SEO・MEO集客、SNSマーケティングの料金。ご提案・お見積もりは無料です。",
        url,
        provider: org,
        areaServed,
        offers: PRICE_ITEMS.map((p) => ({
            "@type": "Offer",
            name: lang === "en" ? p.en : p.ja,
            priceCurrency: "JPY",
            priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: p.min,
                priceCurrency: "JPY",
                valueAddedTaxIncluded: true,
            },
        })),
    };
}
