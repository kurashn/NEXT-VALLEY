// Server Component — FadeIn handles its own client boundary

import React from "react";

import { FadeIn } from "@/components/ui/FadeIn";
import Image from "next/image";
import { Brain, Heart } from "lucide-react";
import aiPerson from "@/images/ai-person.webp";

export function Solution() {
    return (
        <section id="solution" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <FadeIn className="relative inline-block">
                        <span className="relative z-10 text-[#e26c5c] font-black tracking-[0.2em] text-sm md:text-base px-4 py-1.5 rounded-full border border-[#e26c5c]/30 bg-[#e26c5c]/5 uppercase">
                            Our Strength
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#002335] mt-8 mb-6 leading-[1.4] md:leading-[1.3] tracking-tight">
                            AIの<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e26c5c] to-[#ff8c7a] px-1">「スピード」</span><br className="md:hidden" />
                            <span className="hidden md:inline"> × </span>
                            <br className="hidden md:block" />
                            人間の<span className="text-[#002335] relative inline-block">
                                「戦略」
                                <div className="absolute -bottom-1 left-0 w-full h-1 bg-[#e26c5c]/30 transform -skew-x-12"></div>
                            </span><span className="inline-block md:hidden">。</span>
                            <br />
                            <span className="text-2xl md:text-4xl text-[#002335]/80 font-bold mt-2 md:mt-4 block">
                                この掛け算が、結果を出す。
                            </span>
                        </h2>
                        <p className="text-[#002335]/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                            ただ<span className="font-semibold text-[#002335]">速いだけ</span>のAI制作でも、ただ<span className="font-semibold text-[#002335]">丁寧なだけ</span>の制作会社でもありません。それぞれの「最強」を組み合わせた、新しいWeb制作のカタチです。
                        </p>
                    </FadeIn>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-14 lg:gap-16">
                    {/* Visual Side */}
                    <FadeIn className="flex-1 lg:flex-[1.4] relative w-full aspect-square md:aspect-video lg:aspect-square max-w-sm md:max-w-md lg:max-w-none xl:max-w-[600px] mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#002335]/20 to-[#e26c5c]/20 rounded-full blur-3xl opacity-60" />

                        {/* ... */}

                        <Image
                            src={aiPerson}
                            alt="AI Speed x Human Strategy"
                            width={900}
                            height={900}
                            className="relative z-10 drop-shadow-2xl rounded-3xl object-contain w-full h-full"
                            placeholder="blur"
                            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 50vw"
                        />
                    </FadeIn>

                    {/* Content Side */}
                    <div className="flex-1 lg:flex-[1.2] space-y-6 lg:space-y-8">
                        <FadeIn
                            className="group relative overflow-hidden flex gap-6 items-start p-6 md:p-8 rounded-3xl border border-[#002335]/10 bg-white shadow-sm hover:shadow-md hover:border-[#e26c5c]/30 transition-all duration-300"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#002335]/5 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#002335]/10 to-[#002335]/5 text-[#002335] flex items-center justify-center shrink-0 shadow-inner group-hover:bg-gradient-to-br group-hover:from-[#e26c5c]/10 group-hover:to-[#e26c5c]/5 group-hover:text-[#e26c5c] transition-all duration-300">
                                <Brain className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#002335] mb-3 group-hover:text-[#e26c5c] transition-colors duration-300">AIで「作る」から、<br className="md:hidden" />圧倒的に安い・速い</h3>
                                <p className="text-[#002335]/70 text-sm md:text-base leading-relaxed">
                                    骨組みの構築やコード作成など、AIが得意な作業はすべてAIに任せます。<br className="hidden md:block" />
                                    人間がやると数日かかる作業を一瞬で終わらせるため、コストと時間を大幅に削減できます。
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn
                            className="group relative overflow-hidden flex gap-6 items-start p-6 md:p-8 rounded-3xl border border-[#002335]/10 bg-white shadow-sm hover:shadow-md hover:border-[#e26c5c]/30 transition-all duration-300"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e26c5c]/5 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e26c5c]/10 to-[#e26c5c]/5 text-[#e26c5c] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-all duration-300">
                                <Heart className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#002335] mb-3 group-hover:text-[#e26c5c] transition-colors duration-300">人間が「仕上げる」から、<br className="md:hidden" />品質も安心</h3>
                                <p className="text-[#002335]/70 text-sm md:text-base leading-relaxed">
                                    AIは「平均点」を作るのは得意ですが、「感動」を作るのは苦手です。<br className="hidden md:block" />
                                    デザインの微調整、心に響く文章、集客動線の設計は、プロの人間が責任を持って仕上げます。<br className="hidden md:block" />
                                    <span className="font-bold text-[#e26c5c] mt-2 inline-block">「AIだから変なサイトになる」という心配は無用です。</span>
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
