"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TokushoPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
                    <h1 className="text-3xl font-bold text-[#002335] mb-8 text-center border-b pb-6">
                        特定商取引法に基づく表記
                    </h1>

                    <dl className="space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                            <dt className="text-sm font-bold text-[#002335] mb-1">事業者の名称（屋号）</dt>
                            <dd className="text-slate-600">NEXT VALLEY</dd>
                        </div>

                        <div className="border-b border-slate-100 pb-4">
                            <dt className="text-sm font-bold text-[#002335] mb-1">代表者氏名</dt>
                            <dd className="text-slate-600">倉林 駿</dd>
                        </div>

                        <div className="border-b border-slate-100 pb-4">
                            <dt className="text-sm font-bold text-[#002335] mb-1">所在地</dt>
                            <dd className="text-slate-600">
                                詳細については、お取引の際に請求があれば遅滞なく開示いたします。
                            </dd>
                        </div>

                        <div className="border-b border-slate-100 pb-4">
                            <dt className="text-sm font-bold text-[#002335] mb-1">お問い合わせ先</dt>
                            <dd className="text-slate-600">
                                info@nextvalley-jpn.com<br />
                                ※正確な記録を残すため、お問い合わせは原則メールにてお願いいたします。
                            </dd>
                        </div>

                        <div className="border-b border-slate-100 pb-4">
                            <dt className="text-sm font-bold text-[#002335] mb-1">販売価格</dt>
                            <dd className="text-slate-600">
                                各プラン・商品ページに記載している価格とします。
                            </dd>
                        </div>

                        <div className="border-b border-slate-100 pb-4">
                            <dt className="text-sm font-bold text-[#002335] mb-1">商品代金以外の必要料金</dt>
                            <dd className="text-slate-600">
                                ・消費税<br />
                                ・銀行振込の場合、振込手数料<br />
                                ・インターネット接続料金その他の電気通信回線の通信に関する費用
                            </dd>
                        </div>

                        <div className="border-b border-slate-100 pb-4">
                            <dt className="text-sm font-bold text-[#002335] mb-1">お支払い方法</dt>
                            <dd className="text-slate-600">
                                銀行振込、またはクレジットカード決済
                            </dd>
                        </div>

                        <div className="border-b border-slate-100 pb-4">
                            <dt className="text-sm font-bold text-[#002335] mb-1">代金の支払時期</dt>
                            <dd className="text-slate-600">
                                ・銀行振込：契約締結後、請求書に記載の期日までにお支払いください。<br />
                                ・クレジットカード：各カード会社の引き落とし日にお支払いください。
                            </dd>
                        </div>

                        <div className="border-b border-slate-100 pb-4">
                            <dt className="text-sm font-bold text-[#002335] mb-1">サービスの提供時期</dt>
                            <dd className="text-slate-600">
                                ご契約時に定めたスケジュールに従い提供いたします。
                            </dd>
                        </div>

                        <div>
                            <dt className="text-sm font-bold text-[#002335] mb-1">返品・キャンセルに関する特約</dt>
                            <dd className="text-slate-600">
                                サービスの性質上、契約締結後のキャンセル・返金はお受けしておりません。<br />
                                ただし、当方の責に帰すべき事由によりサービス提供が不可能となった場合はこの限りではありません。
                            </dd>
                        </div>
                    </dl>
                </div>
            </section>

            <Footer />
        </main>
    );
}
