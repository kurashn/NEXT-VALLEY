"use client";

import React, { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Copy, MessageCircle, Mail, RotateCcw, Smartphone } from "lucide-react";

/**
 * 無料プレビュー申込フォーム（診断形式）
 * - 1問ずつ答える → 最後に回答をまとめたメッセージを生成 → LINEで送る（コピー＋LINEを開く）
 * - 6問目で事業の確認。同業・公開予定なしは、その場でやさしくお断り
 * - サーバー送信なし（回答はブラウザ内だけ）。GA4イベントだけ送る
 */

const LINE_URL = "https://lin.ee/N4QXdJL#from=preview";
const LINE_OA_ID = "@013cjlgg"; // 公式アカウントのID（メッセージ入力済みでトークを開くために使用）
const MAIL_TO = "info@nextvalley-jpn.com";

const INDUSTRIES = ["整体・治療院", "美容室・サロン", "飲食店", "教室・スクール", "不動産", "建設・工務店・リフォーム", "士業（税理士・行政書士など）", "医療・クリニック", "フィットネス・ジム", "小売・EC", "コンサル・サービス業", "製造業", "その他"];
const MOODS = ["上品・高級感", "親しみやすい・やさしい", "元気・明るい", "信頼感・堅実", "シンプル・洗練", "おまかせ"];
const ASSETS = ["写真あり・ロゴあり", "写真あり・ロゴなし", "写真なし・ロゴあり", "どちらもまだない"];
const TIMINGS = ["1〜3ヶ月以内に公開したい", "半年以内に公開したい", "時期は未定・情報収集中"];
const ROLES = ["代表・オーナー", "担当責任者（決裁に関われる）", "同業（Web制作・デザイン）", "その他"];

type Answers = {
    industry: string;
    name: string;
    area: string;
    strength: string;
    mood: string;
    refUrl: string;
    assets: string;
    proof: string;
    timing: string;
    role: string;
};

const initial: Answers = { industry: "", name: "", area: "", strength: "", mood: "", refUrl: "", assets: "", proof: "", timing: "", role: "" };

const TOTAL_STEPS = 6;

function track(event: string, params: Record<string, string | number> = {}) {
    if (typeof window === "undefined") return;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", event, params);
}

/** メッセージ入力済みで公式LINEのトークを開くURL（スマホのLINEアプリでのみ有効） */
function lineMessageUrl(message: string) {
    return `https://line.me/R/oaMessage/${LINE_OA_ID}/?${encodeURIComponent(message)}`;
}

/** クリップボードにコピー（Clipboard API → 失敗時は execCommand にフォールバック） */
async function copyText(text: string): Promise<boolean> {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch { /* fallback へ */ }
    try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.left = "0";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ta.setSelectionRange(0, text.length);
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
    } catch {
        return false;
    }
}

function buildMessage(a: Answers) {
    const lines = [
        "【無料プレビュー希望】",
        `1. 業種・屋号：${a.industry}／${a.name}`,
        `2. 地域：${a.area}`,
        `3. いちばん伝えたい強み：${a.strength}`,
        `4. 好みの雰囲気：${a.mood}${a.refUrl ? `（参考：${a.refUrl}）` : ""}`,
        `5. 写真・ロゴ：${a.assets}`,
        `6. 事業が分かるもの：${a.proof}`,
        `　公開予定：${a.timing}／立場：${a.role}`,
    ];
    return lines.join("\n");
}

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-bold transition-all ${
                selected ? "border-coral-deep bg-coral-deep text-white shadow-[0_8px_20px_rgba(184,69,47,0.25)]" : "border-line bg-white text-ink hover:border-coral"
            }`}
        >
            {selected && <Check className="h-4 w-4" aria-hidden />}
            {children}
        </button>
    );
}

const inputCls = "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink-sub/60 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/25";

export function PreviewApply() {
    const [step, setStep] = useState(0); // 0 = intro, 1..6 = questions, 7 = result
    const [a, setA] = useState<Answers>(initial);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [qrSvg, setQrSvg] = useState<string | null>(null);
    // 端末判定はクリック時・結果表示時に参照（SSR時はモバイル扱い）
    const [isMobile] = useState(() => (typeof navigator === "undefined" ? true : /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)));

    const set = (k: keyof Answers, v: string) => setA((s) => ({ ...s, [k]: v }));

    const screenedOut = a.role === "同業（Web制作・デザイン）" || a.timing === "時期は未定・情報収集中";
    const message = useMemo(() => buildMessage(a), [a]);

    // PCで結果画面に来たら、スマホで読み取るQR（メッセージ入力済みURL）を作る
    useEffect(() => {
        if (step !== 7 || screenedOut || isMobile) return;
        let cancelled = false;
        QRCode.toString(lineMessageUrl(message), { type: "svg", errorCorrectionLevel: "L", margin: 1 })
            .then((svg) => { if (!cancelled) setQrSvg(svg); })
            .catch(() => QRCode.toString(LINE_URL, { type: "svg", errorCorrectionLevel: "M", margin: 1 }).then((svg) => { if (!cancelled) setQrSvg(svg); }).catch(() => setQrSvg(null)));
        return () => { cancelled = true; };
    }, [step, screenedOut, isMobile, message]);

    const canNext = (() => {
        switch (step) {
            case 1: return a.industry.trim() !== "" && a.name.trim() !== "";
            case 2: return a.area.trim() !== "";
            case 3: return a.strength.trim().length >= 5;
            case 4: return a.mood !== "";
            case 5: return a.assets !== "";
            case 6: return a.proof.trim() !== "" && a.timing !== "" && a.role !== "";
            default: return true;
        }
    })();

    const start = () => { setStep(1); track("preview_apply_start"); };
    const next = () => {
        if (!canNext) { setError("この項目に答えてから進んでください。"); return; }
        setError(null);
        if (step === TOTAL_STEPS) {
            setStep(7);
            track(screenedOut ? "preview_apply_screened_out" : "preview_apply_complete", { role: a.role, timing: a.timing });
            return;
        }
        setStep(step + 1);
        track("preview_apply_step", { step: step + 1 });
    };
    const back = () => { setError(null); setStep(Math.max(0, step - 1)); };
    const reset = () => { setA(initial); setStep(0); setCopied(false); setCopyFailed(false); setError(null); };

    const [copyFailed, setCopyFailed] = useState(false);
    const doCopy = async () => {
        const ok = await copyText(message);
        setCopied(ok);
        setCopyFailed(!ok);
        return ok;
    };
    // スマホ: コピーしてから、メッセージ入力済みでLINEアプリのトークを開く（未追加なら友だち追加画面）
    const openLineMobile = async () => {
        await doCopy();
        track("preview_apply_to_line", { device: "mobile" });
        window.location.href = lineMessageUrl(message);
    };
    // PC: 先にコピー→PC版LINE（友だち追加ページ）を開く。貼り付けてもらう
    const openLineDesktop = async () => {
        await doCopy();
        track("preview_apply_to_line", { device: "desktop" });
        window.open(LINE_URL, "_blank", "noopener,noreferrer");
    };
    const mailHref = `mailto:${MAIL_TO}?subject=${encodeURIComponent("無料プレビュー希望")}&body=${encodeURIComponent(message)}`;

    const progress = step === 0 ? 0 : step >= 7 ? 100 : Math.round(((step - 1) / TOTAL_STEPS) * 100);

    return (
        <div className="mx-auto max-w-2xl overflow-hidden rounded-[24px] bg-white text-ink shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            {/* 進捗 */}
            <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 md:px-8">
                <p className="text-[12px] font-bold tracking-[0.2em] text-coral-deep">
                    {step === 0 ? "無料プレビュー申込" : step >= 7 ? "入力完了" : `質問 ${step} / ${TOTAL_STEPS}`}
                </p>
                <div className="h-1.5 w-40 overflow-hidden rounded-full bg-line" aria-hidden>
                    <div className="h-full rounded-full bg-coral transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className="px-6 py-8 md:px-10 md:py-10">
                {/* イントロ */}
                {step === 0 && (
                    <div>
                        <h3 className="text-[clamp(1.375rem,3vw,1.75rem)] font-bold leading-[1.45] text-ink">
                            5つの質問に答えるだけ。<br />
                            最後に、LINEでそのまま<span className="nowrap">送れます。</span>
                        </h3>
                        <p className="mt-4 text-[15px] leading-[2] text-ink-sub">
                            所要2分。写真やロゴがなくても大丈夫です。答えた内容はこのページの中だけで使い、送信するかどうかは最後にあなたが決めます。
                        </p>
                        <ul className="mt-5 space-y-2 text-sm text-ink-sub">
                            {["業種・屋号", "地域", "いちばん伝えたい強み", "好みの雰囲気", "写真・ロゴの有無", "＋ 事業の確認（店舗名・SNS・既存サイトなど）"].map((t, i) => (
                                <li key={t} className="flex items-center gap-2.5">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cream text-[11px] font-bold text-coral-deep">{i < 5 ? i + 1 : "✓"}</span>
                                    {t}
                                </li>
                            ))}
                        </ul>
                        <button
                            type="button"
                            onClick={start}
                            className="lp-cta group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-coral-deep px-8 text-[17px] font-bold text-white shadow-cta transition-all hover:-translate-y-0.5 sm:w-auto"
                        >
                            質問に答えはじめる
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                        </button>
                        <p className="mt-4 text-xs text-ink-sub">
                            質問に答えずにLINEで直接送りたい方は、
                            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center px-1 font-bold text-coral-deep underline underline-offset-4">
                                LINEで「プレビュー希望」と送ってください
                            </a>
                        </p>
                    </div>
                )}

                {/* Q1 */}
                {step === 1 && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">業種と、お店・教室・会社のお名前を教えてください。</h3>
                        <p className="mt-2 text-sm text-ink-sub">屋号・店名・会社名。開業前なら予定の名前で大丈夫です。</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {INDUSTRIES.map((x) => (
                                <Chip key={x} selected={a.industry === x} onClick={() => set("industry", x)}>{x}</Chip>
                            ))}
                        </div>
                        <input className={`${inputCls} mt-4`} placeholder="お店・教室・会社のお名前（例：〇〇整骨院、〇〇英会話教室）" value={a.name} onChange={(e) => set("name", e.target.value)} />
                    </div>
                )}

                {/* Q2 */}
                {step === 2 && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">対象となる地域は、どこですか？</h3>
                        <p className="mt-2 text-sm text-ink-sub">例：大阪市／渋谷区／全国（オンライン）</p>
                        <input className={`${inputCls} mt-5`} placeholder="例：大阪市 北区" value={a.area} onChange={(e) => set("area", e.target.value)} />
                    </div>
                )}

                {/* Q3 */}
                {step === 3 && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">いちばん伝えたい強みは、何ですか？</h3>
                        <p className="mt-2 text-sm text-ink-sub">一言で構いません。「産後の骨盤ケアが得意」「地元で30年」「初心者歓迎」など。</p>
                        <textarea className={`${inputCls} mt-5 min-h-[120px]`} placeholder="例：産後の骨盤ケアが得意。女性スタッフのみで、子連れでも通いやすい" value={a.strength} onChange={(e) => set("strength", e.target.value)} />
                    </div>
                )}

                {/* Q4 */}
                {step === 4 && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">好みの雰囲気は、どれに近いですか？</h3>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {MOODS.map((x) => (
                                <Chip key={x} selected={a.mood === x} onClick={() => set("mood", x)}>{x}</Chip>
                            ))}
                        </div>
                        <input className={`${inputCls} mt-4`} placeholder="参考にしたいサイトがあればURL（任意）" value={a.refUrl} onChange={(e) => set("refUrl", e.target.value)} />
                    </div>
                )}

                {/* Q5 */}
                {step === 5 && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">写真やロゴは、ありますか？</h3>
                        <p className="mt-2 text-sm text-ink-sub">なくても大丈夫です。プレビューは業種に合ったイメージでお作りします。</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {ASSETS.map((x) => (
                                <Chip key={x} selected={a.assets === x} onClick={() => set("assets", x)}>{x}</Chip>
                            ))}
                        </div>
                    </div>
                )}

                {/* Q6: 事業の確認 */}
                {step === 6 && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">最後に、事業の確認だけさせてください。</h3>
                        <p className="mt-2 text-sm leading-[1.9] text-ink-sub">本気でホームページを作る事業者様のための枠を守るために、確認しています。</p>
                        <label className="mt-5 block text-sm font-bold text-ink">事業が分かるもの（いずれか1つ）</label>
                        <input className={`${inputCls} mt-2`} placeholder="店舗名／SNSアカウント／Googleマップの名前／既存サイトURL／開業届の有無 など" value={a.proof} onChange={(e) => set("proof", e.target.value)} />
                        <p className="mt-5 text-sm font-bold text-ink">公開の予定</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {TIMINGS.map((x) => (
                                <Chip key={x} selected={a.timing === x} onClick={() => set("timing", x)}>{x}</Chip>
                            ))}
                        </div>
                        <p className="mt-5 text-sm font-bold text-ink">あなたのお立場</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {ROLES.map((x) => (
                                <Chip key={x} selected={a.role === x} onClick={() => set("role", x)}>{x}</Chip>
                            ))}
                        </div>
                    </div>
                )}

                {/* 結果 */}
                {step === 7 && screenedOut && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">ありがとうございます。今回は、お受けできない枠です。</h3>
                        <p className="mt-4 text-[15px] leading-[2] text-ink-sub">
                            無料プレビューは「これから本気でホームページを作る事業者様」に、毎月10社分だけお作りしている枠です。
                            {a.role === "同業（Web制作・デザイン）"
                                ? "同業の方はご遠慮いただいています。ご理解ください。"
                                : "公開の時期が決まりましたら、そのときにあらためてお申し込みください。お待ちしています。"}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-bold text-ink transition-colors hover:border-coral">
                                <RotateCcw className="h-4 w-4" aria-hidden /> 最初からやり直す
                            </button>
                            <Link href="/" className="inline-flex min-h-11 items-center px-2 text-sm font-bold text-coral-deep underline underline-offset-4">NEXT VALLEYのサービスを見る</Link>
                        </div>
                    </div>
                )}

                {step === 7 && !screenedOut && (
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-[12px] font-bold text-coral-deep">
                            <Check className="h-4 w-4" aria-hidden /> 入力ありがとうございます
                        </p>
                        <h3 className="mt-4 text-xl font-bold leading-snug">この内容を、LINEで送ってください。</h3>
                        {isMobile ? (
                            <p className="mt-2 text-sm leading-[1.9] text-ink-sub">
                                下のボタンを押すと、この内容が入力された状態でLINEのトークが開きます。送信すれば申込完了。3営業日以内にトップページ案（PC・スマホ）をお送りします。
                            </p>
                        ) : (
                            <p className="mt-2 text-sm leading-[1.9] text-ink-sub">
                                いちばん簡単なのは、<span className="font-bold text-ink">スマホのカメラで下のQRを読み取る</span>方法です。この内容が入力された状態でLINEが開くので、送信すれば申込完了。3営業日以内にトップページ案（PC・スマホ）をお送りします。
                            </p>
                        )}
                        <pre className="mt-5 select-all whitespace-pre-wrap rounded-2xl border border-line bg-base p-4 text-[13px] leading-[1.9] text-ink" title="クリックで全選択">{message}</pre>

                        {isMobile ? (
                            <>
                                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <button
                                        type="button"
                                        onClick={openLineMobile}
                                        className="lp-cta group inline-flex h-16 flex-1 items-center justify-center gap-3 rounded-full bg-[#05a247] px-6 text-[19px] font-bold text-white shadow-[0_14px_32px_rgba(5,162,71,0.38)] transition-all hover:-translate-y-0.5"
                                    >
                                        <MessageCircle className="h-6 w-6" aria-hidden />
                                        LINEを開いて送る
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                                    </button>
                                    <button type="button" onClick={doCopy} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm font-bold text-ink transition-colors hover:border-coral">
                                        <Copy className="h-4 w-4" aria-hidden /> {copied ? "コピーしました ✓" : "内容だけコピー"}
                                    </button>
                                </div>
                                <p className="mt-4 text-xs leading-[1.9] text-ink-sub">
                                    まだ友だち追加していない場合は、先に追加画面が開きます。追加後にもう一度ボタンを押してください。内容が入力されていない場合は、上の内容をコピー（ボタンを押した時点でコピー済みです）して貼り付けてください。
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="mt-6 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
                                    <div className="mx-auto w-56 rounded-2xl border border-line bg-white p-2 sm:mx-0" aria-label="スマホで読み取るQRコード">
                                        {qrSvg ? (
                                            <div className="[&>svg]:h-auto [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
                                        ) : (
                                            <div className="aspect-square w-full animate-pulse rounded-xl bg-base" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
                                            <Smartphone className="h-5 w-5 text-coral-deep" aria-hidden />
                                            スマホのカメラでQRを読み取る
                                        </p>
                                        <p className="mt-2 text-sm leading-[1.9] text-ink-sub">
                                            LINEが開き、上の内容が入力された状態になります。まだ友だち追加していない場合は、追加してからもう一度読み取ってください。
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                onClick={doCopy}
                                                className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 ${copied ? "bg-ink" : "bg-coral-deep"}`}
                                            >
                                                {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                                                {copied ? "コピーしました ✓" : "① 内容をコピーする"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={openLineDesktop}
                                                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#05a247] px-5 text-[19px] font-bold text-white transition-all hover:-translate-y-0.5"
                                            >
                                                <MessageCircle className="h-5 w-5" aria-hidden />
                                                ② PC版LINEを開く
                                            </button>
                                        </div>
                                        <p className="mt-3 text-xs leading-[1.9] text-ink-sub">
                                            PC版LINEを使う場合は、①でコピー → ②で開いた友だち追加ページから「トーク」へ → 貼り付けて送信してください。
                                            {copyFailed && <span className="block font-bold text-coral-deep">コピーできなかったようです。上の内容をクリックすると全選択できるので、Ctrl+C（Macは⌘+C）でコピーしてください。</span>}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                        <p className="mt-3 text-xs text-ink-sub">
                            LINEを使わない方は{" "}
                            <a href={mailHref} className="inline-flex min-h-11 items-center gap-1 font-bold text-coral-deep underline underline-offset-4">
                                <Mail className="h-3.5 w-3.5" aria-hidden /> メールで送る
                            </a>
                            （同じ内容が本文に入ります）
                        </p>
                        <button type="button" onClick={reset} className="mt-2 inline-flex min-h-11 items-center gap-2 text-xs text-ink-sub underline underline-offset-4">
                            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> 最初からやり直す
                        </button>
                    </div>
                )}

                {/* ナビゲーション */}
                {step >= 1 && step <= TOTAL_STEPS && (
                    <div className="mt-8">
                        {error && <p className="mb-3 text-sm font-bold text-coral-deep">{error}</p>}
                        <div className="flex items-center justify-between gap-3">
                            <button type="button" onClick={back} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-ink-sub transition-colors hover:text-ink">
                                <ArrowLeft className="h-4 w-4" aria-hidden /> 戻る
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                className={`group inline-flex h-13 min-h-12 items-center gap-2 rounded-full px-7 text-[15px] font-bold text-white transition-all ${
                                    canNext ? "bg-coral-deep hover:-translate-y-0.5" : "bg-ink-sub/50"
                                }`}
                            >
                                {step === TOTAL_STEPS ? "入力内容を確認する" : "次へ"}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
