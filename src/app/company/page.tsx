import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";

export default function CompanyPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-16 px-4 bg-[#002335] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge className="bg-[#e26c5c] hover:bg-[#e26c5c] text-white border-none px-4 py-1.5 text-sm mb-8 tracking-wider">
                        PROFILE
                    </Badge>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6">
                        事業情報
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                        AIと戦略で、選ばれる教室へ。
                    </p>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">

                    {/* Vision / Philosophy */}
                    <div className="mb-20 space-y-8 text-slate-700 leading-loose text-lg">
                        <p>
                            「良い教育を提供しているのに、知られていない」<br />
                            そんなもどかしさを抱える教室・スクール運営者様のために、NEXT VALLEYは存在します。
                        </p>
                        <p>
                            従来のホームページ制作は、高額で時間がかかりすぎました。<br />
                            私たちはAI技術を駆使することで、圧倒的な「スピード」と「適正価格」を実現。<br />
                            しかし、AIだけでは人の心は動かせません。
                        </p>
                        <p>
                            徹底した「戦略」と「人間理解」を掛け合わせ、<br />
                            ただ作るだけでなく、<span className="font-bold text-[#e26c5c] bg-[#e26c5c]/10 px-1">集客という結果にコミットするパートナー</span>でありたいと考えています。
                        </p>
                    </div>


                    {/* Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <h2 className="text-xl font-bold text-[#002335] mb-8 border-l-4 border-[#e26c5c] pl-4">
                                事業概要
                            </h2>
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-bold text-[#002335] flex items-center h-full">屋号</dt>
                                </div>
                                <div className="sm:col-span-2 border-b border-slate-100 pb-4 sm:border-none sm:pb-0">
                                    <dd className="text-base text-slate-600">NEXT VALLEY（ネクストバレー）</dd>
                                </div>

                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-bold text-[#002335] flex items-center h-full">代表者</dt>
                                </div>
                                <div className="sm:col-span-2 border-b border-slate-100 pb-4 sm:border-none sm:pb-0">
                                    <dd className="text-base text-slate-600">倉林 駿（くらはやし しゅん）</dd>
                                </div>

                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-bold text-[#002335] flex items-center h-full">事業開始</dt>
                                </div>
                                <div className="sm:col-span-2 border-b border-slate-100 pb-4 sm:border-none sm:pb-0">
                                    <dd className="text-base text-slate-600">2021年1月</dd>
                                </div>

                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-bold text-[#002335] py-1">事業内容</dt>
                                </div>
                                <div className="sm:col-span-2 border-b border-slate-100 pb-4 sm:border-none sm:pb-0">
                                    <dd className="text-base text-slate-600 leading-relaxed space-y-2">
                                        <div className="flex items-start gap-2">
                                            <span className="text-[#e26c5c] font-bold">・</span>
                                            <span>AIを活用したWebサイト制作 / リニューアル</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-[#e26c5c] font-bold">・</span>
                                            <span>教育・スクール特化型Web集客支援</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-[#e26c5c] font-bold">・</span>
                                            <span>MEO対策（Googleマップ集客）</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-[#e26c5c] font-bold">・</span>
                                            <span>Webマーケティング内製化支援</span>
                                        </div>
                                    </dd>
                                </div>

                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-bold text-[#002335] flex items-center h-full">お問い合わせ</dt>
                                </div>
                                <div className="sm:col-span-2">
                                    <dd className="text-base text-slate-600">
                                        info@nextvalley-jpn.com<br />
                                        <span className="text-xs text-slate-400 mt-1 block">※ 営業・勧誘のメールは固くお断りいたします。</span>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
