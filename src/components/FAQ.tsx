"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
    const faqs = [
        {
            question: "本当に無料ですか？後から請求されませんか？",
            answer: "はい、提案・デザイン作成までは完全に無料です。私たちの方針は「まず実物を見ていただくこと」です。気に入らなければ、その時点でお断りいただいて構いません。その場合、費用は一切かかりません。"
        },
        {
            question: "電話営業や、しつこい勧誘はありませんか？",
            answer: "電話営業は一切行いません。やり取りはすべてLINEまたはメールのみです。こちらから一方的に連絡することもありませんので、ご安心ください。"
        },
        {
            question: "まだ依頼するか決めていないのですが...",
            answer: "はい、全く問題ありません。「今のホームページをどう直せばいいか知りたい」という軽い気持ちでご相談ください。プロの視点から、具体的な改善案をお伝えします。"
        },
        {
            question: "制作期間はどれくらいですか？",
            answer: "AIを活用するため、通常1ヶ月かかる構築作業を最短3〜5日に短縮可能です。お急ぎの場合もぜひご相談ください。"
        },
        {
            question: "教室以外の業種（オンラインスクールやサロンなど）でも依頼できますか？",
            answer: "はい、もちろんです。オンラインスクール、学習塾、サロン、クリニックなど、予約や申し込みが必要なビジネスであれば柔軟に対応可能です。"
        }
    ];

    return (
        <section id="faq" className="py-24 px-4 bg-white">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#e26c5c] font-bold tracking-wider text-sm bg-[#e26c5c]/10 px-3 py-1 rounded-full border border-[#e26c5c]/20">FAQ</span>
                    <h2 className="text-2xl md:text-4xl font-bold text-[#002335] mt-6 mb-6">よくあるご質問</h2>
                    <p className="text-[#002335]/70">
                        「無料プレビュー」に関する<br className="md:hidden" />よくあるご質問をまとめました。
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border border-slate-200 rounded-lg px-6 data-[state=open]:bg-slate-50 transition-colors"
                        >
                            <AccordionTrigger className="text-left font-bold text-[#002335] py-6 hover:no-underline hover:text-[#e26c5c] transition-colors text-base md:text-lg">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed pb-6 text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
