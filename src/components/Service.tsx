// Server Component - no client-side interactivity needed

import React from "react";
import { Check, Rocket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Service() {
    return (
        <section id="service" className="py-24 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-5xl font-bold text-foreground mb-6">
                        料金プラン
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        あなたの教室に合ったプランを、お選びください。
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">

                    {/* Plan A: お試し (RECOMMENDED) */}
                    {/* Plan A: お試し (Main Focus) */}
                    <div className="md:col-span-3 mb-8">
                        <Card className="relative bg-white border-4 border-[#e26c5c] shadow-2xl flex flex-col md:flex-row overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute top-0 right-0 bg-[#e26c5c] text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-20">
                                申込者の90%がここからスタート
                            </div>

                            <div className="md:w-2/5 bg-[#e26c5c]/5 p-8 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-[#e26c5c]/20 relative">
                                <div className="mb-4">
                                    <Badge className="bg-[#e26c5c] text-white hover:bg-[#e26c5c] px-6 py-2 text-base font-bold shadow-lg mb-4">
                                        <Star className="w-4 h-4 fill-current mr-2" />
                                        人気No.1
                                    </Badge>
                                    <CardTitle className="text-2xl md:text-3xl font-bold text-[#002335]">まずはお試しプラン</CardTitle>
                                </div>
                                <div className="flex items-baseline justify-center gap-2 mb-4">
                                    <span className="text-6xl font-bold text-[#e26c5c]">¥0</span>
                                    <span className="text-xl text-[#002335]/60 font-medium">(無料)</span>
                                </div>
                                <p className="text-[#002335] font-bold mt-2">
                                    毎月5教室限定
                                </p>
                            </div>

                            <CardContent className="md:w-3/5 p-8 flex flex-col justify-center">
                                <CardDescription className="text-lg text-[#002335]/80 font-medium mb-6 text-center md:text-left">
                                    「失敗したくない」「まずは提案を見てみたい」という方はこちら。<br />
                                    プロがあなたの教室専用の改善案・デザインを無料で作成します。
                                </CardDescription>

                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                    {[
                                        "HP改善案の作成",
                                        "トップページデザイン",
                                        "スマホ実機での確認",
                                        "強引な営業は一切なし"
                                    ].map((feature) => (
                                        <div key={feature} className="flex items-center font-bold text-[#002335]">
                                            <div className="rounded-full bg-[#06C755]/10 p-1 mr-3 shrink-0">
                                                <Check className="w-4 h-4 text-[#06C755]" />
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <a href="https://lin.ee/N4QXdJL" target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xl h-16 shadow-xl shadow-[#06C755]/20 animate-pulse hover:animate-none">
                                        無料プレビューをもらう
                                        <Rocket className="ml-2 w-6 h-6" />
                                    </Button>
                                </a>
                                <p className="text-center text-xs text-[#002335]/50 mt-3">
                                    ※ リスクは一切ありません。気に入らなければ断ってください。
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Secondary Plans Container */}
                    <div className="md:col-span-3 grid md:grid-cols-2 gap-6 opacity-90 hover:opacity-100 transition-opacity">
                        {/* Plan B: 制作プラン */}
                        <Card className="bg-slate-50 border-slate-200 shadow-none hover:shadow-md transition-all">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-bold text-slate-700">制作プラン</CardTitle>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-slate-900">¥77,000</span>
                                    <span className="text-xs text-slate-500">(税込)</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-2">
                                    「無料プレビューは飛ばして、最短で制作したい」というお急ぎの方。
                                </p>
                            </CardHeader>
                            <CardFooter>
                                <Button className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300" variant="outline">
                                    今すぐ制作を申し込む
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Plan C: おまかせ集客 */}
                        <Card className="bg-slate-50 border-slate-200 shadow-none hover:shadow-md transition-all">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-bold text-slate-700">おまかせ集客プラン</CardTitle>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-slate-900">¥44,000</span>
                                    <span className="text-xs text-slate-500">/月(税込)</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-2">
                                    「制作から集客まで丸投げしたい」という方。
                                </p>
                            </CardHeader>
                            <CardFooter>
                                <Button className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300" variant="outline">
                                    集客までフルサポートで申し込む
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            </div>
        </section>
    );
}
