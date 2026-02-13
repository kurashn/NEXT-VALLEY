"use client";

import React from "react";
import { MessageCircle, FileText, Star } from "lucide-react";

export function Benefits() {
    const benefits = [
        {
            icon: FileText,
            title: "集客ノウハウを配信",
            desc: "「生徒が集まる教室」と「集まらない教室」の違いは？現場で使える集客のコツを定期配信します。"
        },
        {
            icon: MessageCircle,
            title: "チャット相談が無料",
            desc: "「この施策はどう思う？」など、ちょっとした疑問をいつでもプロに相談できます。"
        },
        {
            icon: Star,
            title: "制作枠の優先確保",
            desc: "毎月5教室限定の制作枠が埋まる前に、LINE登録者様には優先的にご案内をお送りします。"
        }
    ];

    return (
        <section className="py-20 px-4 bg-slate-50 border-t border-slate-200">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#002335] mb-4">
                        LINE登録で、<span className="text-[#e26c5c]">3つの特典</span>が手に入ります
                    </h2>
                    <p className="text-[#002335]/70 text-sm md:text-base">
                        無料プレビュー以外にも、教室運営に役立つ情報をお届けします。
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {benefits.map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:border-[#e26c5c]/30 transition-colors">
                            <div className="w-14 h-14 rounded-full bg-[#e26c5c]/10 flex items-center justify-center text-[#e26c5c] mb-4">
                                <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold text-[#002335] mb-3">
                                {item.title}
                            </h3>
                            <p className="text-[#002335]/70 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
