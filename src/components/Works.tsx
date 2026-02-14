"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { School, Building2, Globe } from "lucide-react";
import Image from "next/image";

export function Works() {
    const featuredWorks = [
        {
            name: "Tulip Ballet Studio様",
            category: "Education",
            label: "教育・スクール",
            image: "/images/works/works1.jpg",
            review: "非常に丁寧に、かつ、希望どおり作成していただきました！ウェブ関係はまったくわからず、毎回質問したりしていましたが、いつも丁寧に優しく答えてくださいました。また、様々な提案もしてくださり、想像以上の素敵なホームページを作成していただきました。依頼して本当に良かったと実感しております。丁重に要望を取り入れてくださり、徹底して顧客のニーズに合わせてくださいます。"
        },
        {
            name: "ECCジュニア 一里山教室様",
            category: "Education",
            label: "教育・スクール",
            image: "/images/works/works4.jpg",
            review: "ホームページ制作のお願いから公開まで迅速に対応していただけました。Webに関する知識が全くなかったのですが、丁寧に説明していただき、安心して依頼をすることができました。コミュニケーションも円滑にとれ、写真選びなども親身に対応してくださり、感謝しています。LINEを使ってフランクな形でやり取りができるのも大変良かったです！"
        },
        {
            name: "Rythmique Garden様",
            category: "Education",
            label: "教育・スクール",
            image: "/images/works/works5.jpg",
            review: "初めてのホームページ作成で、何も分からずほぼ全てお任せだったのですが、一つ一つ、丁寧に教えてくださいました。また、様々な提案もしてくださり、想像以上の素敵なホームページを作成していただきました。依頼して本当に良かったと実感しております。丁重に要望を取り入れてくださり、徹底して顧客のニーズに合わせてくださいます。"
        }
    ];

    const otherWorks = [
        // Education
        { name: "Colours Musical Studio様", category: "Education", label: "教育・スクール", image: "/images/works/works2.jpg" },
        { name: "まや子どもの家様", category: "Education", label: "教育・スクール", image: "/images/works/works3.jpg" },
        { name: "Yuma English House様", category: "Education", label: "教育・スクール", image: "/images/works/works8.jpg" },
        { name: "DANCE STUDIO PLUS様", category: "Education", label: "教育・スクール", image: "/images/works/works9.jpg" },
        { name: "K-coaching様", category: "Education", label: "教育・スクール", image: "/images/works/works11.jpg" },

        // Corporate
        { name: "株式会社ビビッドディレクション様", category: "Corporate", label: "企業・サービス", image: "/images/works/works6.jpg" },
        { name: "株式会社ワナビィ様", category: "Corporate", label: "企業・サービス", image: "/images/works/works7.jpg" },
    ];

    const getIcon = (category: string) => {
        switch (category) {
            case "Education": return <School className="w-4 h-4" />;
            case "Corporate": return <Building2 className="w-4 h-4" />;
            case "Media": return <Globe className="w-4 h-4" />;
            default: return <Building2 className="w-4 h-4" />;
        }
    };

    return (
        <section id="works" className="py-24 px-4 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-5xl font-bold text-[#002335] mb-6 tracking-tight">
                        制作実績
                    </h2>
                    <p className="text-[#002335]/70 text-lg md:text-xl max-w-2xl mx-auto">
                        教育機関、企業、メディアなど、<br className="md:hidden" />
                        <span className="font-bold text-[#e26c5c]">50社以上</span>の支援実績があります。
                    </p>
                </div>

                {/* Featured Works with Reviews */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {featuredWorks.map((work, index) => (
                        <Card key={index} className="bg-white border-none shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                            <div className="relative h-48 w-full overflow-hidden bg-white flex items-center justify-center">
                                <Image
                                    src={work.image}
                                    alt={work.name}
                                    fill
                                    className="object-contain transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-8 flex-1 flex flex-col">
                                <div className="mb-6">
                                    <Badge variant="secondary" className="bg-[#e26c5c]/10 text-[#e26c5c] mb-3 hover:bg-[#e26c5c]/20">
                                        {getIcon(work.category)}
                                        <span className="ml-1">{work.label}</span>
                                    </Badge>
                                    <h3 className="text-xl font-bold text-[#002335] border-b border-slate-100 pb-3">
                                        {work.name}
                                    </h3>
                                </div>
                                <div className="relative pl-4 flex-1">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 rounded-full"></div>
                                    <p className="text-slate-600 text-sm leading-relaxed italic">
                                        &quot;{work.review}&quot;
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Other Works List */}
                <div className="text-center mb-8">
                    <h3 className="text-lg font-bold text-slate-500 mb-6">その他の実績</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {otherWorks.map((work, index) => (
                        <div key={index} className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 flex items-center gap-3 hover:shadow-md transition-all overflow-hidden group">
                            <div className="w-12 h-12 rounded bg-slate-50 flex-shrink-0 overflow-hidden relative flex items-center justify-center">
                                {work.image ? (
                                    <Image src={work.image} alt={work.name} fill className="object-contain" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        {getIcon(work.category)}
                                    </div>
                                )}
                            </div>
                            <span className="text-sm font-bold text-[#002335] truncate group-hover:text-[#e26c5c] transition-colors">{work.name}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-slate-500 mb-8">
                        ※ クライアント様のプライバシー保護のため、一部のみ掲載しております。
                    </p>
                </div>
            </div>
        </section>
    );
}
