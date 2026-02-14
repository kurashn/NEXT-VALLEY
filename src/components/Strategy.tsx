// Server Component — FadeIn handles its own client boundary

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";

import { MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Strategy() {
    return (
        <section id="strategy" className="py-24 px-4 bg-[#002335] relative overflow-hidden text-white">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                {/* Text Content */}
                <div className="flex-1 space-y-8">
                    <FadeIn>
                        <div className="inline-block px-4 py-1.5 rounded-full bg-[#e26c5c] border border-[#e26c5c] text-xs font-bold text-white tracking-widest mb-4">
                            他社と何が違うのか
                        </div>
                        <h2 className="text-2xl md:text-5xl font-bold text-white leading-tight text-balance">
                            営業トークは、しません。<br className="hidden md:block" />実物をお見せします。
                        </h2>
                    </FadeIn>
                    <p className="text-white/80 text-lg leading-relaxed">
                        まず先に、あなたの教室のリニューアル案を勝手に作ります。<br /><br />
                        あなたの教室の魅力が「ホームページのせい」で伝わっていないなら、<br />
                        <span className="text-[#e26c5c] font-bold bg-white/10 px-1 rounded">見てもらえれば、わかります。</span>
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#e26c5c] flex items-center justify-center text-white font-bold shrink-0 text-sm">1</div>
                            <div>
                                <h4 className="text-white font-bold mb-1">見てから決められる。リスクゼロ。</h4>
                                <p className="text-white/60 text-sm">「イメージと違う」という失敗がありません。実物を見てから判断できます。</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#e26c5c] flex items-center justify-center text-white font-bold shrink-0 text-sm">2</div>
                            <div>
                                <h4 className="text-white font-bold mb-1">打ち合わせ不要。最短1日でお届け。</h4>
                                <p className="text-white/60 text-sm">AIを活用するため、あなたの時間を奪うヒアリングは不要です。</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Visual Mockup - Before/After Transformation */}
                <div className="flex-1 relative w-full aspect-square md:aspect-video flex items-center justify-center">
                    {/* Abstract representation of Before/After */}
                    <div className="relative w-64 h-96 bg-white rounded-2xl shadow-xl rotate-[-6deg] z-10 p-2 overflow-hidden border-4 border-slate-100 grayscale origin-bottom-left">
                        <div className="w-full h-full bg-slate-50 flex flex-col gap-2 p-2">
                            <div className="h-4 w-3/4 bg-slate-200 rounded" />
                            <div className="h-20 w-full bg-slate-200 rounded" />
                            <div className="h-2 w-full bg-slate-200 rounded" />
                            <div className="h-2 w-full bg-slate-200 rounded" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-slate-400 font-black text-4xl -rotate-12 border-2 border-slate-400 p-2 rounded opacity-50">BEFORE</span>
                        </div>
                    </div>

                    <FadeIn
                        delay={200}
                        className="absolute w-64 h-96 bg-white rounded-2xl shadow-2xl z-20 border-[6px] border-[#002335] overflow-hidden"
                    >
                        <div className="w-full h-full relative">
                            {/* Simulated Mobile UI */}
                            <div className="bg-gradient-to-br from-[#002335] to-[#002335]/80 h-32 p-4 flex flex-col justify-end">
                                <div className="text-white font-bold text-lg">My Class</div>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="flex gap-2">
                                    <div className="w-16 h-16 bg-slate-100 rounded-lg" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 w-full bg-slate-100 rounded" />
                                        <div className="h-3 w-2/3 bg-slate-100 rounded" />
                                    </div>
                                </div>
                                <Button size="sm" className="w-full bg-[#e26c5c] hover:bg-[#e26c5c]/90 text-white font-bold mt-4 shadow-md">
                                    無料体験を予約
                                </Button>
                            </div>

                            {/* Floating Cursor/Click */}
                            <div className="absolute bottom-8 right-8 animate-bounce">
                                <div className="relative">
                                    <div className="absolute -inset-2 bg-[#e26c5c]/20 rounded-full blur-md opacity-50 animate-ping" />
                                    <MousePointerClick className="relative z-10 text-[#e26c5c] w-8 h-8 fill-[#e26c5c]/20" />
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>

            </div>
        </section>
    );
}
