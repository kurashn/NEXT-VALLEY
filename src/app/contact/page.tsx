"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            company: formData.get("company"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || errorData.error || "送信に失敗しました");
            }

            setIsSubmitted(true);
        } catch (error) {
            console.error(error);
            alert(`送信に失敗しました: ${error instanceof Error ? error.message : "不明なエラー"}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-[#002335] mb-4">
                            お問い合わせ
                        </h1>
                        <p className="text-slate-600">
                            Web制作、集客改善、その他ご相談など、<br className="hidden md:block" />
                            お気軽にお問い合わせください。
                        </p>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center py-12 animate-in fade-in duration-500">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#002335] mb-4">送信完了</h2>
                            <p className="text-slate-600 mb-8">
                                お問い合わせありがとうございます。<br />
                                内容を確認の上、担当者より2営業日以内にご連絡いたします。
                            </p>
                            <Button
                                onClick={() => setIsSubmitted(false)}
                                variant="outline"
                                className="border-[#002335] text-[#002335] hover:bg-[#002335]/5"
                            >
                                戻る
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold text-[#002335]">
                                    お名前 <span className="text-[#e26c5c]">*</span>
                                </label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="山田 太郎"
                                    className="h-12 border-slate-200 focus:border-[#002335]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="company" className="text-sm font-bold text-[#002335]">
                                    会社名 / 屋号
                                </label>
                                <Input
                                    id="company"
                                    name="company"
                                    placeholder="株式会社○○"
                                    className="h-12 border-slate-200 focus:border-[#002335]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-[#002335]">
                                    メールアドレス <span className="text-[#e26c5c]">*</span>
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="example@email.com"
                                    className="h-12 border-slate-200 focus:border-[#002335]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-[#002335]">
                                    お問い合わせ内容 <span className="text-[#e26c5c]">*</span>
                                </label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    required
                                    placeholder="ご相談内容をご記入ください"
                                    className="min-h-[160px] border-slate-200 focus:border-[#002335] resize-y"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 bg-[#e26c5c] hover:bg-[#e26c5c]/90 text-white font-bold text-lg rounded-lg shadow-lg flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        送信する <Send className="w-5 h-5" />
                                    </>
                                )}
                            </Button>

                            <p className="text-xs text-slate-400 text-center">
                                <a href="/privacy" className="underline hover:text-slate-600">プライバシーポリシー</a>に同意の上、送信してください。
                            </p>
                        </form>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
