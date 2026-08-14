"use client";

// お問い合わせ — 回答しやすさ最適化版
// カテゴリはボタンで選ぶだけ・URL欄で診断オファーに接続・自由記入は一言でOK

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";

const categories = [
    "無料診断を受けたい",
    "HP・LP制作",
    "集客（SEO・MEO・SNS）",
    "AI活用・業務効率化",
    "デザイン制作",
    "その他",
];

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [category, setCategory] = useState<string>(categories[0]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const url = formData.get("url");
        const messageRaw = (formData.get("message") as string) || "";
        const data = {
            name: formData.get("name"),
            company: formData.get("company"),
            email: formData.get("email"),
            message: `【ご相談カテゴリ】${category}\n【サイトURL】${url || "未入力"}\n\n${messageRaw || "（自由記入なし）"}`,
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
        <main className="min-h-screen bg-base text-ink">
            <Navbar />

            <section className="px-4 pb-20 pt-32 md:pt-36">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-8 text-center">
                        <h1 className="mb-4 text-3xl font-bold text-ink">お問い合わせ</h1>
                        <p className="text-[15px] leading-[2] text-ink-sub">
                            2分で送れます。担当者より2営業日以内に<span className="nowrap">ご返信します。</span>
                        </p>
                    </div>

                    {/* LINEが最速の案内 */}
                    <a
                        href="https://lin.ee/N4QXdJL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-6 flex items-center justify-center gap-2.5 rounded-2xl bg-[#05a247] px-6 py-4 text-[19px] font-bold text-white transition-opacity hover:opacity-90"
                    >
                        <MessageCircle className="h-5 w-5" aria-hidden />
                        お急ぎの方はLINEが最速です
                    </a>

                    <div className="rounded-2xl bg-white p-7 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:p-10">
                        {isSubmitted ? (
                            <div className="py-12 text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#05a247]/10 text-[#05a247]">
                                    <CheckCircle2 className="h-8 w-8" />
                                </div>
                                <h2 className="mb-4 text-2xl font-bold text-ink">送信完了</h2>
                                <p className="leading-[2] text-ink-sub">
                                    お問い合わせありがとうございます。
                                    <br />
                                    内容を確認の上、担当者より2営業日以内にご連絡いたします。
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-7">
                                {/* カテゴリ: 選ぶだけ */}
                                <div className="space-y-3">
                                    <p className="text-sm font-bold text-ink">
                                        ご相談内容 <span className="text-coral-deep">*</span>
                                        <span className="ml-2 font-normal text-ink-sub">（選ぶだけでOK）</span>
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((c) => (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => setCategory(c)}
                                                className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 px-5 text-sm font-bold transition-colors ${
                                                    category === c
                                                        ? "border-coral-deep bg-coral-deep text-white"
                                                        : "border-line bg-white text-ink-sub hover:border-coral"
                                                }`}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid gap-7 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-ink">
                                            お名前 <span className="text-coral-deep">*</span>
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="山田 太郎"
                                            className="h-12 rounded-xl border-line text-base focus:border-coral"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="company" className="text-sm font-bold text-ink">
                                            会社名 / 屋号
                                            <span className="ml-2 font-normal text-ink-sub">（任意）</span>
                                        </label>
                                        <Input
                                            id="company"
                                            name="company"
                                            placeholder="株式会社○○"
                                            className="h-12 rounded-xl border-line text-base focus:border-coral"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-ink">
                                        メールアドレス <span className="text-coral-deep">*</span>
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="example@email.com"
                                        className="h-12 rounded-xl border-line text-base focus:border-coral"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="url" className="text-sm font-bold text-ink">
                                        今のサイトのURL
                                        <span className="ml-2 font-normal text-ink-sub">（あれば。無料診断に使います）</span>
                                    </label>
                                    <Input
                                        id="url"
                                        name="url"
                                        type="url"
                                        placeholder="https://example.com"
                                        className="h-12 rounded-xl border-line text-base focus:border-coral"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-ink">
                                        詳しい内容
                                        <span className="ml-2 font-normal text-ink-sub">（任意・一言でOK）</span>
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="例：問い合わせを増やしたい／AIで業務を効率化したい　など"
                                        className="min-h-28 resize-y rounded-xl border-line text-base focus:border-coral"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-coral-deep text-[17px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 disabled:opacity-60"
                                >
                                    {isSubmitting ? (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    ) : (
                                        <>
                                            この内容で送信する <Send className="h-5 w-5" />
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-xs text-ink-sub">
                                    <a href="/privacy" className="underline hover:text-ink">
                                        プライバシーポリシー
                                    </a>
                                    に同意の上、送信してください。しつこい営業は一切ありません。
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
