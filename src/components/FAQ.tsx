// Server Component — FAQ（copy.md セクション9）。開閉はネイティブの details/summary で行う

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SerifHeading } from "@/components/ui/SerifHeading";

export const faqs = [
    {
        q: "本当に効果は出ますか？",
        a: "「必ず出ます」とは言いません。代わりに、ご提案の段階で「何を・どの順番で・どの数字を目標にやるか」を具体的に示します。公開後は毎月数字を報告するので、効果が出ているかどうかをあいまいにしません。",
        aNode: (
            <>「必ず出ます」とは言いません。代わりに、ご提案の段階で「何を・どの順番で・どの数字を目標にやるか」を具体的に示します。公開後は毎月数字を報告するので、効果が出ているかどうかをあいまいに<span className="nowrap">しません。</span></>
        ),
    },
    {
        q: "HPやLPの制作だけをお願いすることはできますか？",
        a: "はい、制作のみのご依頼も承っています。集客やAI活用のご提案は、必要な場合にだけお伝えします。「まずサイトだけ作りたい」で構いません。",
    },
    {
        q: "見積もりを頼んだら、しつこく営業されませんか？",
        a: "電話営業は一切行いません。やり取りはLINEまたはメールのみで、こちらから一方的に連絡することもありません。",
        aNode: (
            <>電話営業は一切行いません。やり取りはLINEまたはメールのみで、こちらから一方的に連絡することも<span className="nowrap">ありません。</span></>
        ),
    },
    {
        q: "Webの知識がまったくなくても、丸投げできますか？",
        a: "できます。専門用語を使わずにご説明し、文章や写真の準備からこちらで伴走します。ご用意いただくのは「事業への理解」だけです。",
    },
    {
        q: "まだ頼むと決めていないのですが、相談だけでもいいですか？",
        a: "はい。「今のサイトをどう直せばいいか知りたい」という段階のご相談で構いません。提案と見積もりまでは無料です。",
        aNode: (
            <>はい。「今のサイトをどう直せばいいか知りたい」という段階のご相談で構いません。提案と見積もりまでは<span className="nowrap">無料です。</span></>
        ),
    },
    {
        q: "制作期間はどれくらいですか？",
        a: "AIを活用した制作フローにより、通常1ヶ月かかる構築を最短3〜5日に短縮できます。お急ぎの場合もご相談ください。",
        aNode: (
            <>AIを活用した制作フローにより、通常1ヶ月かかる構築を最短3〜5日に短縮できます。お急ぎの場合も<span className="nowrap">ご相談ください。</span></>
        ),
    },
    {
        q: "遠方ですが、対応できますか？",
        a: "全国対応です。打ち合わせはオンライン（LINE・メール・ビデオ通話）で完結します。",
    },
];

export function FAQ() {
    return (
        <section className="relative overflow-hidden bg-cream px-4 py-16 md:px-6 md:py-24">
            <div className="relative mx-auto max-w-4xl">
                <FadeIn>
                    <SerifHeading en="FAQ" jp="よくあるご質問" />
                </FadeIn>

                <FadeIn>
                    <div className="rounded-2xl bg-white px-6 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:px-10">
                        {faqs.map((faq, i) => (
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
                                <p className="pb-6 text-[15px] leading-[2] text-ink-sub">
                                    {"aNode" in faq ? faq.aNode : faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
