import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import bg from "@/images/cta-bg-photo.webp";

export function CTA() {
    return (
        <section className="py-24 px-4 bg-[#002335] relative overflow-hidden text-white">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#002335]/90 z-10" />
                <Image
                    src={bg}
                    alt="Background"
                    fill
                    className="object-cover opacity-40 mix-blend-overlay"
                    placeholder="blur"
                    sizes="100vw"
                />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-block mb-6">
                    <span className="bg-[#e26c5c] text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full tracking-wider shadow-lg">
                        毎月5教室限定・完全無料
                    </span>
                </div>

                <h2 className="text-3xl md:text-6xl font-bold mb-8 tracking-tight text-white leading-tight">
                    リスクゼロで、<br />プロの<span className="text-[#e26c5c] mx-2">「無料改善案」</span>を<br />
                    試してみませんか？
                </h2>
                <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                    いきなりの契約は不要です。<br />
                    まずはあなたの教室専用の<span className="font-bold text-white border-b border-[#e26c5c]">「完成イメージ」</span>をスマホで確認してください。<br />
                    気に入らなければ、そのまま断っていただいて構いません。
                </p>

                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#06C755] to-[#00d455] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <a href="https://lin.ee/N4QXdJL" target="_blank" rel="noopener noreferrer">
                            <Button
                                size="lg"
                                className="relative w-full md:w-auto bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xl px-12 py-8 h-auto rounded-xl shadow-[0_0_40px_rgba(6,199,85,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(6,199,85,0.6)] border border-white/20 cursor-pointer"
                            >
                                <span className="flex flex-col items-center">
                                    <span className="flex items-center gap-2">
                                        無料プレビューをもらう
                                        <ArrowRight className="w-6 h-6" />
                                    </span>
                                    <span className="text-xs font-normal opacity-90 mt-1 tracking-wide">
                                        ※ 最適な提案のため、簡単なヒアリングがあります
                                    </span>
                                </span>
                            </Button>
                        </a>
                    </div>
                    <p className="text-white/60 text-xs md:text-sm mt-4">
                        強引な営業は一切いたしませんのでご安心ください
                    </p>
                </div>
            </div>
        </section>
    );
}
