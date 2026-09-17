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
 * ※ 入口商品は「ホームページ制作・管理」（初期0円／月額8,980円税込・最低1年）。
 *   金額は src/app/price/PricePage.tsx の表記と揃えること。片方だけ直すと食い違う
 */
const PRICE_ITEMS: {
    ja: string;
    en: string;
    /** 月額の商品（monthly）か、目安額（from）か */
    kind: "monthly" | "from";
    price: number;
    /** 月額商品の初期費用（0円もそのまま書く） */
    setup?: number;
}[] = [
    { ja: "ホームページ制作・管理", en: "Website build and management", kind: "monthly", price: 8980, setup: 0 },
];

/** 月額8,980円（税込）を UnitPriceSpecification で表す */
function monthlySpec(price: number) {
    return {
        "@type": "UnitPriceSpecification",
        price,
        priceCurrency: "JPY",
        valueAddedTaxIncluded: true,
        unitCode: "MON",
        billingDuration: 1,
        billingIncrement: 1,
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
    };
}

export function priceJsonLd(lang: Lang) {
    const url = lang === "en" ? `${SITE}/en/price` : `${SITE}/price`;
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: lang === "en" ? "Website production and web marketing" : "ホームページ制作・Web集客支援",
        description:
            lang === "en"
                ? "Website build and management with no setup fee, ¥8,980 a month (tax incl.): up to 10 pages, unlimited edits, domain and hosting included, one-year minimum term. Ongoing growth work is quoted separately. Proposal and quote are free."
                : "ホームページ制作・管理は初期制作費0円、月額8,980円（税込）。10ページまで制作、修正・更新は無制限、ドメイン・サーバー費込み、最低契約期間は1年間。継続的な集客改善は別途お見積もりします。",
        url,
        provider: org,
        areaServed,
        offers: PRICE_ITEMS.map((p) => ({
            "@type": "Offer",
            name: lang === "en" ? p.en : p.ja,
            priceCurrency: "JPY",
            url,
            priceSpecification:
                p.kind === "monthly"
                    ? [
                          monthlySpec(p.price),
                          {
                              "@type": "PriceSpecification",
                              name: lang === "en" ? "Setup fee" : "初期制作費",
                              price: p.setup ?? 0,
                              priceCurrency: "JPY",
                              valueAddedTaxIncluded: true,
                          },
                      ]
                    : {
                          "@type": "PriceSpecification",
                          minPrice: p.price,
                          priceCurrency: "JPY",
                          valueAddedTaxIncluded: true,
                      },
        })),
    };
}
