"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
                    <h1 className="text-3xl font-bold text-[#002335] mb-8 text-center border-b pb-6">
                        プライバシーポリシー
                    </h1>

                    <div className="prose max-w-none text-slate-600 space-y-8">
                        <div>
                            <p>
                                NEXT VALLEY（以下、「当方」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第1条（個人情報）</h2>
                            <p>
                                「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第2条（個人情報の収集方法）</h2>
                            <p>
                                当方は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当方の提携先（情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。）などから収集することがあります。
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第3条（個人情報を収集・利用する目的）</h2>
                            <p>
                                当方が個人情報を収集・利用する目的は、以下のとおりです。
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>当方サービスの提供・運営のため</li>
                                <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
                                <li>ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当方が提供する他のサービスの案内のメールを送付するため</li>
                                <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
                                <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
                                <li>ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため</li>
                                <li>有料サービスにおいて、ユーザーに利用料金を請求するため</li>
                                <li>上記の利用目的に付随する目的</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第4条（利用目的の変更）</h2>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>当方は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。</li>
                                <li>利用目的の変更を行った場合には、変更後の目的について、当方所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第5条（個人情報の第三者提供）</h2>
                            <p>
                                当方は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
                                <li>予め次の事項を告知あるいは公表し、かつ当方が個人情報保護委員会に届出をしたとき</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第6条（個人情報の開示）</h2>
                            <p>
                                当方は、本人から個人情報の開示を求められたときは、本人に対しこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#002335] mb-3">第7条（お問い合わせ窓口）</h2>
                            <p>
                                本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
                            </p>
                            <div className="mt-4 bg-slate-50 p-4 rounded-lg">
                                <p>屋号：NEXT VALLEY</p>
                                <p>担当者：倉林 駿</p>
                                <p>Eメールアドレス：info@nextvalley-jpn.com</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
