"use client";

import React from "react";
import Image from "next/image";
// import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Sparkles, ArrowRight } from "lucide-react";

export function Representative() {
    return (
        <section className="relative py-24 px-4 overflow-hidden bg-[#002335] text-white">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/representative_bg_cool.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#002335] via-[#002335]/90 to-[#002335]/70" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

                    {/* Photo Column - Smart & Cool Style */}
                    <div className="w-full md:w-5/12 relative group">
                        <div className="relative w-64 h-80 md:w-80 md:h-[420px] mx-auto md:mx-0">
                            {/* Stylish Frame Elements */}
                            <div className="absolute top-4 -right-4 w-full h-full border-2 border-[#e26c5c]/30 rounded-br-3xl z-0" />
                            <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#e26c5c]/10 rounded-tl-3xl z-0 backdrop-blur-sm" />

                            {/* Main Image Container */}
                            <div className="relative w-full h-full rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-2xl z-10">
                                <Image
                                    src="/shunk.jpg"
                                    alt="NEXT VALLEY 代表"
                                    fill
                                    className="object-cover"
                                />
                                {/* Name Overlay */}
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
                                    <p className="text-white font-bold text-xl tracking-widest">倉林 駿</p>
                                    <p className="text-[#e26c5c] text-xs font-medium tracking-wider">NEXT VALLEY REPRESENTATIVE</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message Column */}
                    <FadeIn className="w-full md:w-7/12">
                        {/* New Catchphrase */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e26c5c]/20 border border-[#e26c5c]/30 text-[#e26c5c] text-xs font-bold tracking-widest mb-6">
                            <Sparkles className="w-3 h-3" />
                            MESSAGE
                        </div>

                        <h2 className="text-2xl md:text-5xl font-bold leading-tight mb-8">
                            まずは、<span className="text-[#e26c5c]">「無料改善案」</span>を<br />
                            見てみませんか？
                        </h2>

                        <div className="space-y-6 text-slate-300 leading-relaxed text-base md:text-lg">
                            <p>
                                こんにちは、代表の倉林 駿（くらはやし しゅん）です。<br />
                                ここまで読んでいただき、ありがとうございます。
                            </p>
                            <p>
                                「ホームページのリニューアル、失敗したくない...」<br />
                                「本当に効果が出るのか不安...」
                            </p>
                            <p>
                                その気持ち、痛いほどわかります。<br />
                                だからこそ、私たちは<strong className="text-white border-b border-[#e26c5c]">「まずは実物を見てもらう」</strong>ことにこだわっています。
                            </p>
                            <p>
                                営業トークで説得するのではなく、<br />
                                あなたの教室だけの「具体的な改善ビジョン」を形にしてお見せする。
                            </p>
                            <p>
                                もちろん、気に入らなければ断っていただいて構いません。<br />
                                リスクは私たちに、安心はあなたに。
                            </p>
                        </div>

                        {/* Signature / CTA */}
                        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div>
                                <p className="text-sm text-slate-400 mb-1">NEXT VALLEY 代表</p>
                                <p className="text-xl font-bold tracking-wider">倉林 駿</p>
                            </div>

                            <a href="#service" className="group flex items-center gap-2 text-[#e26c5c] font-bold hover:text-white transition-colors">
                                <span className="border-b border-[#e26c5c] group-hover:border-white transition-colors">プラン詳細を見る</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </FadeIn>

                </div>
            </div>
        </section>
    );
}
