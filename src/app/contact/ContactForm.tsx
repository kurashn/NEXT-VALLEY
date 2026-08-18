"use client";

// お問い合わせフォーム本体（Client Component）— 回答しやすさ最適化版
// カテゴリはボタンで選ぶだけ・URL欄で診断オファーに接続・自由記入は一言でOK
// ページ枠（Navbar/Footer/metadata）は ContactPage.tsx（Server）側

import React, { useState } from "react";
import Script from "next/script";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";
import type { Lang } from "@/i18n";

const ja = {
    categories: [
        "無料診断を受けたい",
        "HP・LP制作",
        "集客（SEO・MEO・SNS）",
        "AI活用・業務効率化",
        "デザイン制作",
        "その他",
    ],
    // API に送る message 本文の固定ラベル
    msgCategory: "【ご相談カテゴリ】",
    msgUrl: "【サイトURL】",
    msgUrlEmpty: "未入力",
    msgEmpty: "（自由記入なし）",
    errSend: "送信に失敗しました",
    errUnknown: "不明なエラー",
    errAlert: (m: string) => `送信に失敗しました: ${m}`,
    h1: "お問い合わせ",
    lead: (
        <>
            2分で送れます。担当者より2営業日以内にご<span className="nowrap">返信します。</span>
        </>
    ),
    lineCta: "お急ぎの方はLINEが最速です",
    doneTitle: "送信完了",
    doneBody: (
        <>
            お問い合わせありがとうございます。
            <br />
            内容を確認の上、担当者より2営業日以内にご連絡いたします。
        </>
    ),
    honeypot: "Website",
    catLabel: "ご相談内容",
    catHint: "（選ぶだけでOK）",
    nameLabel: "お名前",
    namePlaceholder: "山田 太郎",
    companyLabel: "会社名 / 屋号",
    companyHint: "（任意）",
    companyPlaceholder: "株式会社○○",
    emailLabel: "メールアドレス",
    emailPlaceholder: "example@email.com",
    urlLabel: "今のサイトのURL",
    urlHint: "（あれば。無料診断に使います）",
    urlPlaceholder: "https://example.com",
    messageLabel: "詳しい内容",
    messageHint: "（任意・一言でOK）",
    messagePlaceholder: "例：問い合わせを増やしたい／AIで業務を効率化したい　など",
    submit: "この内容で送信する",
    privacyLink: "プライバシーポリシー",
    privacyNote: "に同意の上、送信してください。しつこい営業は一切ありません。",
    // 特定電子メール法：この表示があると、公表アドレス宛の広告メール送信の適用除外が外れる
    noSolicitation: "※ 営業・宣伝を目的とした電子メールの送信はお断りいたします。",
};
const en: typeof ja = {
    categories: [
        "Free site check",
        "Website / landing page",
        "Marketing (SEO, Google Maps, social)",
        "AI & workflow automation",
        "Design (logo, flyer, etc.)",
        "Other",
    ],
    msgCategory: "[Topic] ",
    msgUrl: "[Website URL] ",
    msgUrlEmpty: "not provided",
    msgEmpty: "(no additional details)",
    errSend: "Something went wrong while sending",
    errUnknown: "Unknown error",
    errAlert: (m: string) => `Something went wrong while sending: ${m}`,
    h1: "Contact",
    lead: <>Takes about 2 minutes. We reply within 2 business days.</>,
    lineCta: "In a hurry? LINE is fastest",
    doneTitle: "Message sent",
    doneBody: (
        <>
            Thank you for getting in touch.
            <br />
            We will review your message and reply within 2 business days.
        </>
    ),
    honeypot: "Website",
    catLabel: "What can we help with?",
    catHint: "(just pick one)",
    nameLabel: "Name",
    namePlaceholder: "Jane Smith",
    companyLabel: "Company / business name",
    companyHint: "(optional)",
    companyPlaceholder: "Your business",
    emailLabel: "Email",
    emailPlaceholder: "example@email.com",
    urlLabel: "Your current website",
    urlHint: "(if you have one — we will use it for the free site check)",
    urlPlaceholder: "https://example.com",
    messageLabel: "Details",
    messageHint: "(optional — a sentence is fine)",
    messagePlaceholder: "e.g. I want more inquiries / I want to automate tasks with AI",
    submit: "Send message",
    privacyLink: "Privacy Policy (JP)",
    privacyNote: ". No pushy sales calls, ever.",
    noSolicitation: "Note: we do not accept unsolicited sales or marketing emails.",
    // 英語では「By sending, you agree to the …」の語順にするため前置きは JSX 側で分岐
};
const copy: Record<Lang, typeof ja> = { ja, en };

export function ContactForm({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    const categories = t.categories;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [category, setCategory] = useState<string>(categories[0]);
    // 迷惑メール対策: フォーム表示時刻（送信までの経過時間をサーバーで判定）
    const [startedAt] = useState(() => Date.now());
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

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
            message: `${t.msgCategory}${category}\n${t.msgUrl}${url || t.msgUrlEmpty}\n\n${messageRaw || t.msgEmpty}`,
            // 迷惑メール対策用（人間には見えない・影響しない）
            website: formData.get("website") || "",
            elapsedMs: Date.now() - startedAt,
            turnstileToken: formData.get("cf-turnstile-response") || undefined,
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
                throw new Error(errorData.details || errorData.error || t.errSend);
            }

            setIsSubmitted(true);
        } catch (error) {
            console.error(error);
            alert(t.errAlert(error instanceof Error ? error.message : t.errUnknown));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {turnstileSiteKey && (
                <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
            )}

            <section className="px-4 pb-20 pt-32 md:pt-36">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-8 text-center">
                        <h1 className="mb-4 text-3xl font-bold text-ink">{t.h1}</h1>
                        <p className="text-[15px] leading-[2] text-ink-sub">
                            {t.lead}
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
                        {t.lineCta}
                    </a>

                    <div className="rounded-2xl bg-white p-7 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:p-10">
                        {isSubmitted ? (
                            <div className="py-12 text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#05a247]/10 text-[#05a247]">
                                    <CheckCircle2 className="h-8 w-8" />
                                </div>
                                <h2 className="mb-4 text-2xl font-bold text-ink">{t.doneTitle}</h2>
                                <p className="leading-[2] text-ink-sub">
                                    {t.doneBody}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="relative space-y-7">
                                {/* ハニーポット: 人間には見えない。bot が埋めたら破棄される */}
                                <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0">
                                    <label htmlFor="website">{t.honeypot}</label>
                                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" className="h-0 w-0" />
                                </div>

                                {/* カテゴリ: 選ぶだけ */}
                                <div className="space-y-3">
                                    <p className="text-sm font-bold text-ink">
                                        {t.catLabel} <span className="text-coral-deep">*</span>
                                        <span className="ml-2 font-normal text-ink-sub">{t.catHint}</span>
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
                                            {t.nameLabel} <span className="text-coral-deep">*</span>
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            required
                                            placeholder={t.namePlaceholder}
                                            className="h-12 rounded-xl border-line text-[16px] text-ink focus:border-coral"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="company" className="text-sm font-bold text-ink">
                                            {t.companyLabel}
                                            <span className="ml-2 font-normal text-ink-sub">{t.companyHint}</span>
                                        </label>
                                        <Input
                                            id="company"
                                            name="company"
                                            placeholder={t.companyPlaceholder}
                                            className="h-12 rounded-xl border-line text-[16px] text-ink focus:border-coral"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-ink">
                                        {t.emailLabel} <span className="text-coral-deep">*</span>
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder={t.emailPlaceholder}
                                        className="h-12 rounded-xl border-line text-[16px] text-ink focus:border-coral"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="url" className="text-sm font-bold text-ink">
                                        {t.urlLabel}
                                        <span className="ml-2 font-normal text-ink-sub">{t.urlHint}</span>
                                    </label>
                                    <Input
                                        id="url"
                                        name="url"
                                        type="url"
                                        placeholder={t.urlPlaceholder}
                                        className="h-12 rounded-xl border-line text-[16px] text-ink focus:border-coral"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-ink">
                                        {t.messageLabel}
                                        <span className="ml-2 font-normal text-ink-sub">{t.messageHint}</span>
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder={t.messagePlaceholder}
                                        className="min-h-28 resize-y rounded-xl border-line text-[16px] text-ink focus:border-coral"
                                    />
                                </div>

                                {/* Cloudflare Turnstile（NEXT_PUBLIC_TURNSTILE_SITE_KEY を設定した場合のみ表示） */}
                                {turnstileSiteKey && (
                                    <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-size="flexible" data-theme="light" />
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-coral-deep text-[17px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 disabled:opacity-60"
                                >
                                    {isSubmitting ? (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    ) : (
                                        <>
                                            {t.submit} <Send className="h-5 w-5" />
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-xs text-ink-sub">
                                    {lang === "en" && "By sending this form, you agree to our "}
                                    <a href="/privacy" className="underline hover:text-ink">
                                        {t.privacyLink}
                                    </a>
                                    {t.privacyNote}
                                </p>

                                <p className="text-center text-xs text-ink-sub">{t.noSolicitation}</p>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
