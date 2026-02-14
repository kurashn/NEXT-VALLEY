// Server Component — FadeIn handles its own client boundary

import React from "react";
import { Clock, Smartphone, AlertCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

import Image from "next/image";

import problemEnglish from "@/images/problem-english.webp";
import problemDance from "@/images/problem-dance.webp";
import problemMusic from "@/images/problem-music.webp";

export function Problem() {
    const problems = [
        {
            icon: Smartphone,
            image: problemEnglish,
            title: "ホームページ、\nスマホで見たことありますか？",
            desc: "「昔作ったまま」のサイトは、スマホ世代の保護者から見ると「信頼できない」と判断されてしまいます。それだけで入会率は激減します。"
        },
        {
            icon: AlertCircle,
            image: problemDance,
            title: "毎日SNS更新...\nでも問い合わせゼロ。",
            desc: "一生懸命更新しても、戦略がなければただの徒労。見込み客に届いていない「空回り」状態です。"
        },
        {
            icon: Clock,
            image: problemMusic,
            title: "「集客する時間」が、\nもう残っていない。",
            desc: "先生の本分は「教えること」。しかし集客に時間を奪われ、肝心の授業がおろそかになっては本末転倒です。"
        }
    ];

    return (
        <section id="problem" className="py-24 bg-[#002335]/[0.03] relative overflow-hidden">
            {/* Subtle Pattern */}
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#002335_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="container mx-auto px-6 relative">
                <div className="text-center mb-16">
                    <div className="text-center mb-16">
                        <FadeIn>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#e26c5c]/10 border border-[#e26c5c]/20 rounded-full mb-6">
                                <span className="text-[#e26c5c] text-xs font-bold tracking-widest">こんなお悩みありませんか？</span>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold text-[#002335] mb-4 text-balance">
                                こんなに頑張っているのに、<br />
                                なぜ生徒が集まらないのか。
                            </h2>
                            <p className="text-[#002335]/60 text-lg">実はそれ、「教え方」ではなく「届け方」の問題かもしれません。</p>
                        </FadeIn>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((item, idx) => (
                        <FadeIn
                            key={idx}
                            className="group bg-white rounded-2xl border border-[#002335]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-[#002335]/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute bottom-4 left-4 z-20 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg">
                                    <item.icon className="w-5 h-5 text-[#e26c5c]" />
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-lg font-bold text-[#002335] mb-4 whitespace-pre-line leading-relaxed">
                                    {item.title}
                                </h3>
                                <p className="text-[#002335]/70 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
