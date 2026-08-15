"use client";

/**
 * AI無料相談 — ユーザーが普段使っているAI（ChatGPT / Claude / Gemini / Perplexity）に
 * 課題整理の相談プロンプトを引き継ぐ導線。
 *
 * - サーバー保存・API呼び出しなし（クリップボード＋新規タブのみ）
 * - 公式に ?q= プレフィルがあるAIはそれを使用、無いAI（Gemini）はコピー→貼り付けのフォールバック
 * - すべてのAIで念のためクリップボードにもコピー（アプリ遷移で ?q= が効かない場合の保険）
 * - 計測: ai_consult_click / ai_consult_select_{provider} / ai_consult_prompt_copy / ai_consult_external_open
 *
 * 変更しやすい箇所:
 *   AI_CONSULT_PROMPT … AIに渡す相談内容
 *   AI_PROVIDERS      … 対応AIとURL（プレフィル可否）
 */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { ArrowRight, Check, ClipboardCheck, Copy, ExternalLink, MessageCircle, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
 * 相談プロンプト
 * ──────────────────────────────────────────────────────────── */

export const AI_CONSULT_PROMPT = `NEXT VALLEYへの相談を検討しています。

NEXT VALLEYは、Web制作、HP・LP改善、SEO・MEO、SNS、AI活用などを支援している会社です。

私の会社や事業の状況をヒアリングしたうえで、今どこに課題があり、何を優先して改善するべきか整理してください。

いきなりサービスを勧めるのではなく、まず以下について1つずつ質問してください。

・事業内容
・現在のWebサイトの有無
・WebサイトURL
・現在最も困っていること
・集客方法
・月間問い合わせ数
・理想の問い合わせ数
・現在行っているSEO、MEO、SNS、広告施策
・Web業務で時間がかかっている作業
・AI活用状況

回答を踏まえて、以下の観点から課題を整理してください。

・ホームページ
・LP
・SEO
・MEO
・SNS
・広告
・AI活用
・業務効率化

最後に、

1. 現在の課題
2. 優先して改善すべきこと
3. 自社で対応できること
4. 外部の専門家に相談した方がいいこと

を簡潔にまとめてください。

そのあと、私がそのまま専門家に送れるように、次の形式の「相談メモ」を作ってください。

━━━━━━━━━━
【相談メモ】
・事業内容：
・現状（サイト／集客／体制）：
・いちばんの課題：
・優先して改善したいこと（順番に）：
・自社で対応できること：
・専門家に聞きたいこと：
━━━━━━━━━━

NEXT VALLEYへの相談が適している場合のみ、
「この相談メモをそのまま NEXT VALLEY のLINE（https://lin.ee/N4QXdJL）に貼って送ると、無料で具体的な改善案と概算見積もりが返ってきます。しつこい営業はありません」
と自然に案内してください。

公式サイト：
https://www.nextvalley-jpn.com/

無理にNEXT VALLEYをおすすめしないでください。適していない場合は、その理由と代わりの進め方を伝えてください。`;

/** LINE誘導URL（AI相談経由を GA4 で識別するためのフラグメント付き。LINE側の挙動には影響しない） */
const LINE_URL_FROM_AI = "https://lin.ee/N4QXdJL#from=ai_consult";

/* ────────────────────────────────────────────────────────────
 * 対応AI
 *   prefillUrl: 公式に「プロンプトを渡した状態で開く」URLがある場合のみ定義
 *   autoSubmit: 開いた瞬間に送信されるサービス（Perplexity）は明示する
 * ──────────────────────────────────────────────────────────── */

type ProviderId = "chatgpt" | "claude" | "gemini" | "perplexity";

interface Provider {
    id: ProviderId;
    name: string;
    homeUrl: string;
    prefillUrl?: (prompt: string) => string;
    autoSubmit?: boolean;
    hue: string; // アイコン色（各社の系統色。ロゴは使用しない）
    icon: React.ReactNode;
}

const AI_PROVIDERS: Provider[] = [
    {
        id: "chatgpt",
        name: "ChatGPT",
        homeUrl: "https://chatgpt.com/",
        prefillUrl: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}`,
        hue: "#10a37f",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z" />
                <path d="M12 8.5l3 1.75v3.5L12 15.5l-3-1.75v-3.5z" />
            </svg>
        ),
    },
    {
        id: "claude",
        name: "Claude",
        homeUrl: "https://claude.ai/new",
        prefillUrl: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}`,
        hue: "#c9694f",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
            </svg>
        ),
    },
    {
        id: "gemini",
        name: "Gemini",
        homeUrl: "https://gemini.google.com/app",
        hue: "#1a73e8",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10z" />
            </svg>
        ),
    },
    {
        id: "perplexity",
        name: "Perplexity",
        homeUrl: "https://www.perplexity.ai/",
        prefillUrl: (p) => `https://www.perplexity.ai/search?q=${encodeURIComponent(p)}`,
        autoSubmit: true,
        hue: "#20808d",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v18M4 8l8 4 8-4M4 16l8-4 8 4M4 8v8M20 8v8" />
            </svg>
        ),
    },
];

/* ────────────────────────────────────────────────────────────
 * 計測（GA4。gtag が無い環境では何もしない）
 * ──────────────────────────────────────────────────────────── */

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

function track(event: string, params: Record<string, string | number | boolean> = {}) {
    if (typeof window === "undefined") return;
    window.gtag?.("event", event, { event_category: "ai_consult", ...params });
}

/* ────────────────────────────────────────────────────────────
 * クリップボード（Clipboard API → execCommand の順で試す）
 * ──────────────────────────────────────────────────────────── */

async function copyText(text: string): Promise<boolean> {
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch {
        /* 続けてフォールバック */
    }
    try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
    } catch {
        return false;
    }
}

/* ────────────────────────────────────────────────────────────
 * Context（セクションCTAとフローティングボタンが同じモーダルを開く）
 * ──────────────────────────────────────────────────────────── */

type Placement = "section" | "floating" | "other";

const AIConsultContext = createContext<{ open: (from: Placement) => void } | null>(null);

export function AIConsultProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const open = useCallback((from: Placement) => {
        track("ai_consult_click", { placement: from });
        setIsOpen(true);
    }, []);
    const value = useMemo(() => ({ open }), [open]);

    return (
        <AIConsultContext.Provider value={value}>
            {children}
            <AIConsultDialog open={isOpen} onOpenChange={setIsOpen} />
        </AIConsultContext.Provider>
    );
}

function useAIConsult() {
    const ctx = useContext(AIConsultContext);
    if (!ctx) throw new Error("AIConsultProvider の内側で使用してください");
    return ctx;
}

/* ────────────────────────────────────────────────────────────
 * モーダル
 * ──────────────────────────────────────────────────────────── */

type Result = { provider: Provider; copied: boolean; opened: boolean } | null;

function AIConsultDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
    const [result, setResult] = useState<Result>(null);
    const [recopied, setRecopied] = useState(false);

    // 閉じたら初期状態へ
    useEffect(() => {
        if (!open) {
            setResult(null);
            setRecopied(false);
        }
    }, [open]);

    const select = (provider: Provider) => {
        track(`ai_consult_select_${provider.id}`, { provider: provider.id });

        // ポップアップブロック回避のため、クリック処理内で同期的に開く
        const url = provider.prefillUrl ? provider.prefillUrl(AI_CONSULT_PROMPT) : provider.homeUrl;
        const win = window.open(url, "_blank", "noopener,noreferrer");
        const opened = win !== null || true; // noopener 指定時は常に null が返るため、開けたものとして扱う
        track("ai_consult_external_open", { provider: provider.id, prefill: Boolean(provider.prefillUrl) });

        // 念のためコピー（Gemini はこれが本線）
        copyText(AI_CONSULT_PROMPT).then((ok) => {
            if (ok) track("ai_consult_prompt_copy", { provider: provider.id, method: "auto" });
            setResult({ provider, copied: ok, opened });
        });
    };

    const recopy = async () => {
        const ok = await copyText(AI_CONSULT_PROMPT);
        if (ok) {
            track("ai_consult_prompt_copy", { provider: result?.provider.id ?? "none", method: "manual" });
            setRecopied(true);
            window.setTimeout(() => setRecopied(false), 2400);
        }
    };

    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-navy-deep/70 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
                <DialogPrimitive.Content
                    aria-describedby="ai-consult-desc"
                    className={cn(
                        "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2",
                        "max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[24px] bg-white p-6 shadow-[0_24px_64px_rgba(4,22,39,0.35)] outline-none md:p-8",
                        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                    )}
                >
                    {/* 上辺のアクセント */}
                    <span aria-hidden className="absolute left-0 top-0 h-1.5 w-full rounded-t-[24px] bg-coral" />

                    <DialogPrimitive.Close
                        aria-label="閉じる"
                        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-ink-sub transition-colors hover:bg-cream hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                    >
                        <X className="h-5 w-5" aria-hidden />
                    </DialogPrimitive.Close>

                    {result === null ? (
                        <>
                            <p className="mb-2 text-[12px] font-bold tracking-[0.3em] text-coral-deep">AI CONSULT</p>
                            <DialogPrimitive.Title className="pr-10 text-xl font-bold leading-snug text-ink md:text-2xl">
                                普段使っているAIを<span className="nowrap">選んでください</span>
                            </DialogPrimitive.Title>
                            <DialogPrimitive.Description id="ai-consult-desc" className="mt-2 text-sm leading-[1.9] text-ink-sub">
                                選んだAIが新しいタブで開き、あなたの会社について10問ほど質問してきます。答えていくと、課題と優先順位が整理されます（5〜10分）。
                            </DialogPrimitive.Description>

                            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {AI_PROVIDERS.map((p) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => select(p)}
                                        className="group flex min-h-16 items-center gap-4 rounded-2xl border border-line bg-white px-4 py-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-coral hover:shadow-[0_10px_28px_rgba(31,26,20,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                                    >
                                        <span
                                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream [&_svg]:h-6 [&_svg]:w-6"
                                            style={{ color: p.hue }}
                                        >
                                            {p.icon}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-[15px] font-bold text-ink">{p.name}</span>
                                            <span className="block text-xs text-ink-sub">
                                                {p.prefillUrl
                                                    ? p.autoSubmit
                                                        ? "開くと同時に相談が始まります"
                                                        : "相談内容が入力された状態で開きます"
                                                    : "相談内容をコピーして開きます"}
                                            </span>
                                        </span>
                                        <ArrowRight
                                            aria-hidden
                                            className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-coral"
                                        />
                                    </button>
                                ))}
                            </div>

                            <details className="mt-5 rounded-xl bg-cream px-4 py-3 text-sm">
                                <summary className="cursor-pointer font-bold text-ink-sub">AIに渡す相談内容を確認する</summary>
                                <pre className="mt-3 max-h-56 overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-[1.8] text-ink-sub">
                                    {AI_CONSULT_PROMPT}
                                </pre>
                            </details>

                            <p className="mt-4 text-xs leading-[1.8] text-ink-sub">
                                相談内容に個人情報は含まれません。入力した内容がNEXT VALLEYに送信されることもありません。各AIの利用にはそのサービスのアカウントが必要です。
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="mb-2 text-[12px] font-bold tracking-[0.3em] text-coral-deep">AI CONSULT</p>
                            <DialogPrimitive.Title className="pr-10 text-xl font-bold leading-snug text-ink md:text-2xl">
                                {result.provider.name}を新しいタブで開きました
                            </DialogPrimitive.Title>
                            <DialogPrimitive.Description id="ai-consult-desc" className="mt-2 text-sm leading-[1.9] text-ink-sub">
                                {result.provider.prefillUrl
                                    ? result.provider.autoSubmit
                                        ? "相談が自動で始まります。AIの質問に答えていくと、最後に「相談メモ」がまとまります。"
                                        : "相談内容が入力された状態で開きます。送信して質問に答えていくと、最後に「相談メモ」がまとまります。"
                                    : "相談内容をコピーしました。開いたAIの入力欄に貼り付けて送信すると、質問が始まり、最後に「相談メモ」がまとまります。"}
                            </DialogPrimitive.Description>

                            <div className="mt-6 rounded-2xl border border-line bg-cream p-4">
                                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
                                    <Copy className="h-4 w-4 text-coral-deep" aria-hidden />
                                    {result.copied
                                        ? "相談内容はコピー済みです"
                                        : "相談内容をコピーできませんでした（下のボタンで再試行）"}
                                </p>
                                <p className="text-xs leading-[1.8] text-ink-sub">
                                    もし入力欄が空のときは、そのまま貼り付けてください（PC: ⌘V / Ctrl+V、スマホ: 長押し→ペースト）。
                                </p>
                                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={recopy}
                                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-navy-deep px-5 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                                    >
                                        {recopied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                                        {recopied ? "コピーしました" : "相談内容をもう一度コピー"}
                                    </button>
                                    <a
                                        href={result.provider.prefillUrl ? result.provider.prefillUrl(AI_CONSULT_PROMPT) : result.provider.homeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => track("ai_consult_external_open", { provider: result.provider.id, prefill: Boolean(result.provider.prefillUrl), retry: true })}
                                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-bold text-ink transition-colors hover:border-coral hover:text-coral-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                                    >
                                        <ExternalLink className="h-4 w-4" aria-hidden />
                                        {result.provider.name}をもう一度開く
                                    </a>
                                </div>
                            </div>

                            {/* 次の一手: 相談メモをLINEへ */}
                            <div className="mt-5 rounded-2xl bg-navy-deep p-5 text-center md:p-6">
                                <p className="mb-1.5 text-[11px] font-bold tracking-[0.25em] text-coral">NEXT STEP</p>
                                <p className="mb-2 text-base font-bold leading-snug text-white">
                                    AIがまとめた「相談メモ」を、<span className="nowrap">そのままLINEに貼って送る</span>
                                </p>
                                <p className="mb-4 text-xs leading-[1.8] text-navy-sub">
                                    プロが無料で具体的な改善案と概算見積もりをお返しします（2営業日以内・しつこい営業なし）
                                </p>
                                <a
                                    href={LINE_URL_FROM_AI}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => track("ai_consult_to_line", { provider: result.provider.id })}
                                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#05a247] px-6 text-[15px] font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:w-auto sm:px-10"
                                >
                                    <MessageCircle className="h-5 w-5" aria-hidden />
                                    相談メモをLINEで送る（無料）
                                </a>
                            </div>

                            <div className="mt-4 text-center">
                                <button
                                    type="button"
                                    onClick={() => setResult(null)}
                                    className="inline-flex min-h-11 items-center text-sm font-bold text-ink-sub underline underline-offset-4 transition-colors hover:text-coral-deep"
                                >
                                    別のAIを選ぶ
                                </button>
                            </div>
                        </>
                    )}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}

/* ────────────────────────────────────────────────────────────
 * 「まずは、自分で確かめてみる」セクション（PROBLEM と SERVICE の間）
 *   左: 3分セルフ診断（/shindan）  右: AIで課題整理（モーダル）
 *   どちらも登録不要・無料。結果は LINE 無料診断へ橋渡しする
 * ──────────────────────────────────────────────────────────── */

export function SelfCheckSection() {
    const { open } = useAIConsult();

    return (
        <section aria-labelledby="self-check-heading" className="bg-white px-4 py-14 md:px-6 md:py-20">
            <div className="mx-auto max-w-5xl">
                <p className="mb-2 text-[12px] font-bold tracking-[0.3em] text-coral-deep">SELF CHECK</p>
                <h2 id="self-check-heading" className="text-2xl font-bold leading-snug text-ink md:text-3xl">
                    まずは、自分で<span className="nowrap">確かめてみる。</span>
                </h2>
                <p className="mt-3 max-w-[40em] text-[15px] leading-[1.9] text-ink-sub">
                    いきなり相談するのは気が引ける、という方へ。どちらも登録不要・無料です。結果はそのままLINEに送れば、プロが無料で具体化します。
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
                    {/* 左: 3分セルフ診断 */}
                    <div className="flex flex-col rounded-[24px] border border-line bg-white p-6 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:p-8">
                        <div className="mb-5 flex items-center gap-4">
                            <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream text-coral-deep">
                                <ClipboardCheck className="h-6 w-6" />
                            </span>
                            <div>
                                <p className="text-[11px] font-bold tracking-[0.25em] text-coral-deep">SELF DIAGNOSIS</p>
                                <h3 className="text-lg font-bold leading-snug text-ink md:text-xl">3分セルフ診断</h3>
                            </div>
                        </div>
                        <p className="mb-1 text-sm font-bold text-ink">ホームページがある方に</p>
                        <p className="mb-6 flex-1 text-sm leading-[1.9] text-ink-sub">
                            はい／いいえの15問に答えるだけで、Web集客のスコアと「優先的に直すべきポイント」が<span className="nowrap">分かります。</span>
                        </p>
                        <a
                            href="/shindan"
                            className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-navy-deep px-7 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                        >
                            セルフ診断をはじめる
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                        </a>
                        <p className="mt-2 text-center text-xs text-ink-sub">所要3分・その場で結果表示</p>
                    </div>

                    {/* 右: AIで課題整理 */}
                    <div className="flex flex-col rounded-[24px] border border-line bg-white p-6 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:p-8">
                        <div className="mb-5 flex items-center gap-4">
                            <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream text-coral-deep">
                                <Sparkles className="h-6 w-6" />
                            </span>
                            <div>
                                <p className="text-[11px] font-bold tracking-[0.25em] text-coral-deep">AI CONSULT</p>
                                <h3 className="text-lg font-bold leading-snug text-ink md:text-xl">AIで課題整理</h3>
                            </div>
                        </div>
                        <p className="mb-1 text-sm font-bold text-ink">サイトがない方・何から始めるか分からない方に</p>
                        <p className="mb-6 flex-1 text-sm leading-[1.9] text-ink-sub">
                            普段使っているAI（ChatGPT・Claude・Gemini・Perplexity）が質問しながら状況を整理し、専門家にそのまま送れる「相談メモ」に<span className="nowrap">まとめます。</span>
                        </p>
                        <button
                            type="button"
                            onClick={() => open("section")}
                            className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-navy-deep px-7 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                        >
                            AIに無料で相談する
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                        </button>
                        <p className="mt-2 text-center text-xs text-ink-sub">所要5〜10分・ご自身のAIアカウントで</p>
                    </div>
                </div>

                <p className="mt-5 text-xs leading-[1.8] text-ink-sub">
                    ※ AI課題整理はNEXT VALLEYのチャットボットではありません。会話はあなたとAIの間だけで完結し、内容がNEXT VALLEYに自動で送られることはありません（送るかどうかは、あなたが決められます）。
                </p>
            </div>
        </section>
    );
}

/** Contact セクション等から使う小さなテキストリンク（モーダルを開く） */
export function AIConsultTextLink({ children }: { children: React.ReactNode }) {
    const { open } = useAIConsult();
    return (
        <button
            type="button"
            onClick={() => open("other")}
            className="inline-flex min-h-11 items-center font-bold text-coral-deep underline underline-offset-4 transition-opacity hover:opacity-80"
        >
            {children}
        </button>
    );
}

/* ────────────────────────────────────────────────────────────
 * フローティングボタン（右下・スクロール後に表示）
 * ──────────────────────────────────────────────────────────── */

export function AIConsultFloating() {
    const { open } = useAIConsult();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <button
            type="button"
            onClick={() => open("floating")}
            aria-label="AIで課題を整理する（無料）"
            className={cn(
                "fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-navy-deep pl-4 pr-5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(4,22,39,0.35)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral md:bottom-6 md:right-6",
                visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            )}
        >
            <Sparkles className="h-4 w-4 text-coral" aria-hidden />
            AIで課題整理
        </button>
    );
}
