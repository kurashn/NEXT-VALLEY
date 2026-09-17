// Server Component — FAQ。料金・契約条件は確定しているものだけを書く

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading } from "@/components/ui/SerifHeading";
import { type Lang } from "@/i18n";

export type FaqItem = { q: string; a: string; aNode?: React.ReactNode };

/** 日本語の FAQ（JSON-LD 用に従来どおり export。英語版は getFaqs("en")） */
export const faqs: FaqItem[] = [
    {
        q: "ホームページの料金を教えてください。",
        a: "初期制作費は0円、月額8,980円（税込）です。10ページまでの制作と、公開後の修正・更新、ドメイン・サーバー費が含まれます。初年度のお支払い総額は107,760円（税込）です。",
        aNode: (
            <>
                <p>初期制作費は0円、月額8,980円（税込）です。10ページまでの制作と、公開後の修正・更新、ドメイン・サーバー費が<span className="nowrap">含まれます。</span></p>
                <p className="mt-3">初年度のお支払い総額は107,760円（税込）です。</p>
            </>
        ),
    },
    {
        q: "無料プレビューでは何がもらえますか？",
        a: "トップページのデザイン案をお作りしてお見せします。費用はかからず、この時点でのご契約もありません。見たうえで、依頼するかどうかを決めていただけます。",
    },
    {
        q: "いつから料金がかかりますか？",
        a: "正式にご契約いただいた日から月額が始まります。無料プレビューを見ている間は料金がかかりません。",
    },
    {
        q: "最低契約期間はありますか？",
        a: "1年間です。ドメイン・サーバー費を含めて初期制作費を0円にしているため、1年間の継続をお願いしています。",
    },
    {
        q: "修正や更新は、何回まで頼めますか？",
        a: "正式契約後は回数の制限がありません。写真の差し替えやお知らせの更新も、その都度お知らせいただければ対応します。無料プレビューの段階での調整は1回までです。",
        aNode: (
            <>
                <p>正式契約後は回数の制限がありません。写真の差し替えやお知らせの更新も、その都度お知らせいただければ<span className="nowrap">対応します。</span></p>
                <p className="mt-3">無料プレビューの段階での調整は1回までです。</p>
            </>
        ),
    },
    {
        q: "Googleマップの運用やSNSの運用も月額に含まれますか？",
        a: "含まれません。月額に含まれるのは、ホームページへのLINEリンクの設置と、基本的な検索向け設定までです。Googleマップ（MEO）の運用、SNSの運用、継続的なSEO支援、LINE公式アカウントの構築・運用は、内容に応じて別途お見積もりします。",
    },
    {
        q: "サイトは自分のものになりますか？",
        a: "1年以上のご契約で、サイトの譲渡が可能です。手続きの進め方はご相談ください。",
    },
    {
        q: "写真や文章が用意できていなくても頼めますか？",
        a: "はい。今お持ちの写真とSNSの投稿から始められます。足りないものは、こちらでお伺いしながら文章の案をお作りします。",
    },
    {
        q: "どんな業種でも依頼できますか？",
        a: "はい。会社・店舗・教室など、Web担当のいない小さな事業を中心にお手伝いしています。業種は問いません。"
    },
    {
        q: "埼玉以外や遠方でも、対応できますか？",
        a: "全国対応です。打ち合わせはLINE・メール・ビデオ通話で完結します。埼玉北部を中心にお手伝いしていますが、地域は問いません。"
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
        a: "Twelve months. Because the setup fee is zero and domain and hosting are included, we ask for a year.",
    },
    {
        q: "How many edits can I ask for?",
        a: "After you sign, there is no limit on how often. Send us new photos or news any time. During the free preview stage, one round of adjustments is included.",
    },
    {
        q: "Does the monthly fee cover Google Maps or social media management?",
        a: "No. The monthly fee covers a LINE link on your site and basic search settings. Google Maps (MEO) management, social media management, ongoing SEO support, and LINE official account setup and operation are quoted separately.",
    },
    {
        q: "Will the site be mine?",
        a: "After twelve months or more, the site can be transferred to you. We'll walk you through the steps.",
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
        a: "Yes, we work with clients across Japan over LINE, email and video calls. Northern Saitama is our home ground, but location is no barrier.",
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
                                    <span className="text-base font-bold leading-snug text-ink transition-colors group-hover:text-coral-deep">{faq.q}</span>
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
