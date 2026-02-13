"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
                    <h1 className="text-3xl font-bold text-[#002335] mb-8 text-center border-b pb-6">
                        利用規約
                    </h1>

                    <div className="prose max-w-none text-slate-600 space-y-8">
                        <div>
                            <p>
                                この利用規約（以下，「本規約」といいます。）は，NEXT VALLEY（以下，「当方」といいます。）が提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。当ウェブサイトをご利用される皆様（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第1条（適用）</h2>
                            <p>
                                本規約は，ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第2条（禁止事項）</h2>
                            <p>
                                ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>法令または公序良俗に違反する行為</li>
                                <li>犯罪行為に関連する行為</li>
                                <li>当方のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li>
                                <li>当方のサービスの運営を妨害するおそれのある行為</li>
                                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                                <li>他のユーザーに成りすます行為</li>
                                <li>当方のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為</li>
                                <li>その他，当方が不適切と判断する行為</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第3条（本サービスの提供の停止等）</h2>
                            <p>
                                当方は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                                <li>地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合</li>
                                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                                <li>その他，当方が本サービスの提供が困難と判断した場合</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第4条（利用制限および登録抹消）</h2>
                            <p>
                                当方は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>本規約のいずれかの条項に違反した場合</li>
                                <li>登録事項に虚偽の事実があることが判明した場合</li>
                                <li>その他，当方が本サービスの利用を適当でないと判断した場合</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第5条（免責事項）</h2>
                            <p>
                                当方の債務不履行責任は，当方の故意または重過失によらない場合には免責されるものとします。当方は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第6条（サービス内容の変更等）</h2>
                            <p>
                                当方は，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第7条（利用規約の変更）</h2>
                            <p>
                                当方は，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第8条（個人情報の取扱い）</h2>
                            <p>
                                当方は，本サービスの利用によって取得する個人情報については，当方「プライバシーポリシー」に従い適切に取り扱うものとします。
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第9条（準拠法・裁判管轄）</h2>
                            <p>
                                本規約の解釈にあたっては，日本法を準拠法とします。本サービスに関して紛争が生じた場合には，当方の本店所在地を管轄する裁判所を専属的合意管轄とします。
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
