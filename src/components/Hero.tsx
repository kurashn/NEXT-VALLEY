/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

import Image from "next/image";

import heroBg from "@/images/hero-digital.webp";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] md:min-h-[110vh] flex items-center justify-center overflow-hidden bg-[#002335]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroBg}
                    alt="Background"
                    fill
                    className="object-cover opacity-90"
                    priority
                    placeholder="blur"
                    sizes="100vw"
                />
                {/* Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#002335]/90 via-[#002335]/70 to-[#002335]/95" />
            </div>

            <div className="container relative z-10 mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm font-medium mb-8 shadow-lg">
                        <Sparkles className="w-4 h-4 text-[#e26c5c]" />
                        <span>教室・スクール専門のデジタルパートナー</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.2] mb-8 drop-shadow-xl">
                        教室の集客、<br />
                        <span className="text-[#e26c5c]">まるごと</span>お任せください。
                    </h1>

                    {/* Subtext */}
                    <p className="text-slate-200 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto drop-shadow-md">
                        "生徒が増えない"を終わりにする。
                        <br className="hidden md:block" />
                        AI × 人間の最強タッグで、
                        <br className="hidden md:block" />
                        集客も業務効率化もまとめて解決します。
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                        <a href="https://lin.ee/N4QXdJL" target="_blank" rel="noopener noreferrer">
                            <Button
                                size="lg"
                                className="h-14 px-10 text-lg font-bold bg-[#e26c5c] hover:bg-[#e26c5c]/90 text-white shadow-xl shadow-[#e26c5c]/20 hover:shadow-[#e26c5c]/40 hover:scale-105 transition-all duration-300 rounded-full border border-[#e26c5c]/30 cursor-pointer"
                            >
                                無料プレビューをもらう
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </a>
                        <p className="text-sm text-slate-400 mt-4 sm:mt-0 sm:ml-4">
                            ※ 毎月5教室限定・費用は一切かかりません
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Elements - Subtle Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e26c5c]/10 rounded-full mix-blend-overlay filter blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-[100px]" />
        </section>
    );
}
