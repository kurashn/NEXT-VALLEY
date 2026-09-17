// Server Component — FAQ。料金・契約条件は確定しているものだけを書く

import React from "react";
import { chunks } from "@/lib/nowrap";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading } from "@/components/ui/SerifHeading";
import { type Lang } from "@/i18n";

export type FaqItem = { q: string; a: string; aNode?: React.ReactNode };

/** 日本語の FAQ（JSON-LD 用に従来どおり export。英語版は getFaqs("en")） */
export const faqs: FaqItem[] = [
    {
        q: "料金を教えてください。",
        a: "初期制作費は0円、月額8,980円（税込）です。10ページまでの制作と、公開後の修正・更新、ドメイン・サーバー費が含まれます。初年度のお支払い総額は107,760円（税込）です。",
        aNode: (
            <>
                <p>初期制作費は0円、月額8,980円（税込）です。10ページまでの制作と、公開後の修正・更新、ドメイン・サーバー費が<span className="nowrap">含まれます。</span></p>
                <p className="mt-3">初年度のお支払い総額は107,760円（税込）です。</p>
            </>
        ),
    },
    {
        q: "無料プレビューで、何がもらえますか？",
        a: "トップページのデザイン案をお作りしてお見せします。費用はかからず、この時点でのご契約もありません。見たうえで、依頼するかどうかを決めていただけます。",
    },
    {
        q: "いつから料金がかかりますか？",
        a: "正式にご契約いただいた日から月額が始まります。無料プレビューを見ている間は料金がかかりません。",
    },
    {
        q: "最低契約期間はありますか？",
        a: "1年間です。ドメイン・サーバー費を含めて初期制作費を0円にしているため、1年間の継続をお願いしています。1年を過ぎると自動で更新され、以降はいつでも解約できます（前月末までにお知らせください）。1年未満での解約もできますが、その場合サイトの譲渡はできません。",
    },
    {
        q: "1年未満で解約したい場合は、どうなりますか？",
        a: "解約できます。その場合、サイトは公開終了となり、デザインや文章などのデータの譲渡はできません。解約は前月末までにお知らせください。解約月までの月額をお支払いいただき、お支払い済みの分の返金はありません。お預かりした写真やロゴの元データはお返しします。",
        aNode: (
            <>
                <p>解約できます。その場合、サイトは公開終了となり、デザインや文章などのデータの譲渡は<span className="nowrap">できません。</span></p>
                <p className="mt-3">解約は前月末までにお知らせください。解約月までの月額をお支払いいただき、お支払い済みの分の返金は<span className="nowrap">ありません。</span></p>
                <p className="mt-3">お預かりした写真やロゴの元データは<span className="nowrap">お返しします。</span></p>
            </>
        ),
    },
    {
        q: "ドメインとサーバーは、どちらが契約しますか？",
        a: "基本的に当方で契約し、費用は月額に含まれます。追加の料金はかかりません。お客様名義で契約したい場合は、お客様側でご用意いただければ、設定はこちらで行います。1年以上ご契約いただいてサイトを譲渡する際は、当方で契約したドメインもお客様へ移管します。費用はかかりません。",
        aNode: (
            <>
                <p>基本的に当方で契約し、費用は月額に含まれます。追加の料金は<span className="nowrap">かかりません。</span></p>
                <p className="mt-3">お客様名義で契約したい場合は、お客様側でご用意いただければ、設定はこちらで<span className="nowrap">行います。</span></p>
                <p className="mt-3">1年以上ご契約いただいてサイトを譲渡する際は、当方で契約したドメインもお客様へ移管します。費用は<span className="nowrap">かかりません。</span></p>
            </>
        ),
    },
    {
        q: "修正や更新は、何回まで頼めますか？",
        a: "正式契約後は回数の制限がありません。文章や写真の差し替え、お知らせや料金の更新、ページ内の構成の変更など、基本的に何でもお受けします。含まれないのは、デザインを全面的に作り替えることだけです（別途お見積もり）。修正のご依頼は、できるだけ1回にまとめてお送りください。抜け漏れなく、早く反映できます。無料プレビューの段階での調整は1回までです。",
        aNode: (
            <>
                <p>正式契約後は回数の制限がありません。文章や写真の差し替え、お知らせや料金の更新、ページ内の構成の変更など、基本的に何でも<span className="nowrap">お受けします。</span></p>
                <p className="mt-3">含まれないのは、デザインを全面的に作り替えることだけです。その場合は別途<span className="nowrap">お見積もりします。</span></p>
                <p className="mt-3">修正のご依頼は、できるだけ1回にまとめてお送りください。抜け漏れなく、早く<span className="nowrap">反映できます。</span></p>
                <p className="mt-3">無料プレビューの段階での調整は1回までです。</p>
            </>
        ),
    },
    {
        q: "11ページ以上のホームページも作れますか？",
        a: "作れます。11ページ目からは、1ページにつき月額1,000円（税込）を追加します。お知らせやブログの記事はページ数に数えません。20ページを超える場合はご相談ください。",
        aNode: (
            <>
                <p>作れます。11ページ目からは、1ページにつき月額1,000円（税込）を<span className="nowrap">追加します。</span></p>
                <p className="mt-3">お知らせやブログの記事はページ数に数えません。20ページを超える場合は<span className="nowrap">ご相談ください。</span></p>
            </>
        ),
    },
    {
        q: "GoogleマップやSNSの運用も、月額に含まれますか？",
        a: "含まれません。月額に含まれるのは、ホームページへのLINEリンクの設置と、基本的な検索向け設定までです。Googleマップ（MEO）の運用、SNSの運用、継続的なSEO支援、LINE公式アカウントの構築・運用は、内容に応じて別途お見積もりします。",
    },
    {
        q: "サイトは自分のものになりますか？",
        a: "1年以上のご契約で、サイトを譲渡できます。譲渡の費用はかかりません。ドメインも合わせてお客様へ移管します。手続きの進め方はご相談ください。",
    },
    {
        q: "写真や文章がなくても、頼めますか？",
        a: "はい。今お持ちの写真とSNSの投稿から始められます。足りないものは、こちらでお伺いしながら文章の案をお作りします。",
    },
    {
        q: "どんな業種でも依頼できますか？",
        a: "はい。会社・店舗・教室など、Web担当のいない小さな事業を中心にお手伝いしています。業種は問いません。"
    },
    {
        q: "埼玉以外や遠方でも、対応できますか？",
        a: "全国対応です。やり取りはLINEかメールで完結し、オンライン会議や電話は基本的に行いません。埼玉を中心にお手伝いしていますが、地域は問いません。"
    },
];

const faqsEn: FaqItem[] = [
    {
        q: "How much does a website cost?",
        a: "There is no setup fee. It is ¥8,980 per month, tax included, covering up to 10 pages, edits and updates after launch, and domain and hosting. The first-year total is ¥107,760 (tax incl.).",
    },
    {
        q: "What do I get with the free preview?",
        a: "A design proposal for your homepage. It costs nothing and commits you to nothing. You decide after seeing it.",
    },
    {
        q: "When does billing start?",
        a: "On the day you sign the contract. Nothing is charged while you are looking at the free preview.",
    },
    {
        q: "Is there a minimum term?",
        a: "Twelve months. Because the setup fee is zero and domain and hosting are included, we ask for a year. After that the plan renews automatically and you can cancel any month (let us know by the end of the previous month). You can cancel earlier, but the site cannot be transferred to you in that case.",
    },
    {
        q: "How many edits can I ask for?",
        a: "After you sign, there is no limit on how often. Text and photo changes, news and price updates, layout changes within a page: almost anything is covered. The one exception is a full redesign, which is quoted separately. Please send your changes in one batch where you can, so nothing is missed. During the free preview stage, one round of adjustments is included.",
    },
    {
        q: "Can I have more than 10 pages?",
        a: "Yes. From the 11th page, each extra page adds ¥1,000 a month (tax incl.). News and blog posts do not count as pages. For more than 20 pages, please ask.",
    },
    {
        q: "Does the monthly fee cover Google Maps or social media management?",
        a: "No. The monthly fee covers a LINE link on your site and basic search settings. Google Maps (MEO) management, social media management, ongoing SEO support, and LINE official account setup and operation are quoted separately.",
    },
    {
        q: "Will the site be mine?",
        a: "After twelve months or more, the site can be transferred to you at no charge, together with the domain. We'll walk you through the steps.",
    },
    {
        q: "What if I cancel before twelve months?",
        a: "You can. The site goes offline and the design and content are not transferred. Let us know by the end of the previous month; you pay up to the month of cancellation, and fees already paid are not refunded. Photos and logos you supplied are returned.",
    },
    {
        q: "Who registers the domain and hosting?",
        a: "We do, and the cost is included in the monthly fee with nothing extra. If you prefer to hold them in your own name, arrange them on your side and we handle the setup. When the site is transferred after twelve months, the domain we registered can be moved to you too.",
    },
    {
        q: "What if I don't have photos or text ready?",
        a: "That's fine. We can start with the photos you have and your social media posts, and draft the wording with you.",
    },
    {
        q: "Do you work with any kind of business?",
        a: "Yes. We mainly help small companies, shops and schools that have nobody handling the web. Any trade is welcome."
    },
    {
        q: "I'm not nearby. Can you still help?",
        a: "Yes, we work with clients across Japan over LINE and email, with no calls or video meetings needed. Northern Saitama is our home ground, but location is no barrier.",
    },
];

export function getFaqs(lang: Lang): FaqItem[] {
    return lang === "en" ? faqsEn : faqs;
}

const headings: Record<Lang, string> = { ja: "よくあるご質問", en: "FAQ" };

export function FAQ({ lang = "ja" }: { lang?: Lang }) {
    const items = getFaqs(lang);
    return (
        <section className="relative overflow-hidden bg-cream px-4 py-16 md:px-6 md:py-24">
            <div className="relative mx-auto max-w-4xl">
                <FadeIn>
                    <SerifHeading en="FAQ" jp={headings[lang]} />
                </FadeIn>

                <FadeIn>
                    <div className="rounded-2xl bg-white px-6 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:px-10">
                        {items.map((faq, i) => (
                            <details key={faq.q} className={`group ${i > 0 ? "border-t border-line" : ""}`}>
                                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 transition-colors hover:text-coral-deep [&::-webkit-details-marker]:hidden">
                                    <span className="text-[15px] font-bold leading-snug text-ink transition-colors group-hover:text-coral-deep md:text-[16px]">{chunks(faq.q)}</span>
                                    <span
                                        aria-hidden
                                        className="shrink-0 text-xl font-bold text-coral transition-transform group-open:rotate-45"
                                    >
                                        ＋
                                    </span>
                                </summary>
                                <div className="pb-6 text-[15px] leading-[2] text-ink-sub [&>p]:leading-[2]">
                                    {faq.aNode ?? faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
