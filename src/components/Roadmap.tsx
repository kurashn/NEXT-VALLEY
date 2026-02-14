"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Zap, UserCheck, Rocket } from "lucide-react";

export function Roadmap() {
    const steps = [
        {
            step: "STEP 01",
            title: "無料プレビューを作成",
            desc: "まずはLINEで現状のお悩みをお聞かせください。あなたの教室専用の「改善案」を無料で作成し、スマホで確認できるURLをお送りします。",
            icon: MessageCircle,
            color: "text-[#06C755]",
            bg: "bg-[#06C755]/10",
            border: "border-[#06C755]/20",
        },
        {
            step: "STEP 02",
            title: "AIによる高速構築",
            desc: "構成が決まれば、AIを活用して圧倒的なスピードでサイトを構築。通常1ヶ月かかる工程を、わずか数日に短縮します。",
            icon: Zap,
            color: "text-[#e26c5c]",
            bg: "bg-[#e26c5c]/10",
            border: "border-[#e26c5c]/20",
        },
        {
            step: "STEP 03",
            title: "プロによる品質担保",
            desc: "「AIだと品質が心配？」ご安心ください。最後は必ずプロのデザイナーとエンジニアが細部を調整し、人間味のある高品質なサイトに仕上げます。",
            icon: UserCheck,
            color: "text-[#002335]",
            bg: "bg-[#002335]/10",
            border: "border-[#002335]/20",
        },
        {
            step: "STEP 04",
            title: "納品・運用スタート",
            desc: "修正回数に制限はありません。ご納得いただけるまで調整し、公開します。公開後も私たちのチームが運用のサポートを続けます。",
            icon: Rocket,
            color: "text-[#e26c5c]",
            bg: "bg-[#e26c5c]/10",
            border: "border-[#e26c5c]/20",
        }
    ];

    return (
        <section id="roadmap" className="py-24 px-4 bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#002335]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#002335]/10 to-transparent" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#e26c5c] font-bold tracking-wider text-sm bg-[#e26c5c]/10 px-3 py-1 rounded-full border border-[#e26c5c]/20">FLOW</span>
                        <h2 className="text-2xl md:text-5xl font-bold text-[#002335] mt-6 mb-6">制作の流れ</h2>
                        <p className="text-[#002335]/70 text-lg">
                            「いきなり契約」は怖いもの。<br />
                            だから私たちは、<span className="bg-[#e26c5c]/10 text-[#e26c5c] font-bold px-1 rounded-md">まず実物を見ていただく</span>ことから始めます。
                        </p>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Continuous Center Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-[#002335]/5 md:left-1/2 md:-ml-0.5 rounded-full" />

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                            >
                                {/* Center Marker */}
                                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#002335]/10 z-10 flex items-center justify-center transform -ml-4 md:ml-0 shadow-sm">
                                    <div className={`w-3 h-3 rounded-full ${step.bg.replace('/10', '')}`} />
                                </div>

                                {/* Content Card */}
                                <div className="w-full md:w-[calc(50%-3rem)] ml-12 md:ml-0 group">
                                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#002335]/5 hover:shadow-xl hover:border-[#e26c5c]/20 transition-all duration-300 relative overflow-hidden">
                                        {/* Step Number Background */}
                                        <div className="absolute -right-4 -top-4 text-9xl font-bold text-[#002335]/[0.02] select-none group-hover:text-[#e26c5c]/[0.05] transition-colors">
                                            {idx + 1}
                                        </div>

                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 ${step.bg} ${step.color} border ${step.border}`}>
                                            <step.icon className="w-3 h-3" />
                                            {step.step}
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-[#002335] mb-4 group-hover:text-[#e26c5c] transition-colors">
                                            {step.title}
                                        </h3>

                                        <p className="text-[#002335]/70 leading-relaxed text-sm md:text-base">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
