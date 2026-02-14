"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Brain, Heart } from "lucide-react";

export function Solution() {
    return (
        <section id="solution" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#e26c5c] font-bold tracking-wider text-sm">私たちの強み</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-[#002335] mt-2 mb-4">
                            AIの「スピード」× 人間の「戦略」。<br className="hidden md:block" />
                            この掛け算が、結果を出す。
                        </h2>
                        <p className="text-[#002335]/60 max-w-2xl mx-auto">
                            ただ速いだけのAI制作でも、ただ丁寧なだけの制作会社でもありません。
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 relative w-full aspect-square md:aspect-video lg:aspect-square max-w-md mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#002335]/20 to-[#e26c5c]/20 rounded-full blur-3xl opacity-60" />
                        <Image
                            src="/ai-person.jpeg"
                            alt="AI Speed x Human Strategy"
                            width={600}
                            height={600}
                            className="relative z-10 drop-shadow-2xl rounded-3xl object-cover"
                        />
                    </motion.div>

                    {/* Content Side */}
                    <div className="flex-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group flex gap-6 items-start p-6 rounded-2xl border border-[#002335]/10 hover:border-[#002335]/20 hover:bg-[#002335]/[0.02] transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#002335]/10 text-[#002335] flex items-center justify-center shrink-0 group-hover:bg-[#002335]/15 transition-colors">
                                <Brain className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#002335] mb-2">AIで「作る」から、圧倒的に安い・速い</h3>
                                <p className="text-[#002335]/60 text-sm leading-relaxed">
                                    骨組みの構築やコード作成など、AIが得意な作業はすべてAIに任せます。<br />
                                    人間がやると数日かかる作業を一瞬で終わらせるため、コストと時間を大幅に削減できます。
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group flex gap-6 items-start p-6 rounded-2xl border border-[#002335]/10 hover:border-[#e26c5c]/20 hover:bg-[#e26c5c]/[0.03] transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#e26c5c]/10 text-[#e26c5c] flex items-center justify-center shrink-0 group-hover:bg-[#e26c5c]/15 transition-colors">
                                <Heart className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#002335] mb-2">人間が「仕上げる」から、品質も安心</h3>
                                <p className="text-[#002335]/60 text-sm leading-relaxed">
                                    AIは「平均点」を作るのは得意ですが、「感動」を作るのは苦手です。<br />
                                    デザインの微調整、心に響く文章、集客動線の設計は、プロの人間が責任を持って仕上げます。<br />
                                    <span className="font-bold text-[#e26c5c]">「AIだから変なサイトになる」という心配は無用です。</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
