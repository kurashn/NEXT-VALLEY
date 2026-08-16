"use client";

import React, { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Copy, MessageCircle, Mail, RotateCcw, Smartphone } from "lucide-react";
import { withLang, type Lang } from "@/i18n";

/**
 * 無料プレビュー申込フォーム（診断形式）
 * - 1問ずつ答える → 最後に回答をまとめたメッセージを生成 → LINEで送る（コピー＋LINEを開く）
 * - 6問目で事業の確認。同業・公開予定なしは、その場でやさしくお断り
 * - サーバー送信なし（回答はブラウザ内だけ）。GA4イベントだけ送る
 * - 文言は lang（ja / en）で切り替え。生成される LINE メッセージも言語ごとのテンプレート
 */

const LINE_URL = "https://lin.ee/N4QXdJL#from=preview";
const LINE_OA_ID = "@013cjlgg"; // 公式アカウントのID（メッセージ入力済みでトークを開くために使用）
const MAIL_TO = "info@nextvalley-jpn.com";

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

/* ───────────────────────── 文言 ───────────────────────── */

const ja = {
    industries: ["整体・治療院", "美容室・サロン", "飲食店", "教室・スクール", "不動産", "建設・工務店・リフォーム", "士業（税理士・行政書士など）", "医療・クリニック", "フィットネス・ジム", "小売・EC", "コンサル・サービス業", "製造業", "その他"],
    moods: ["上品・高級感", "親しみやすい・やさしい", "元気・明るい", "信頼感・堅実", "シンプル・洗練", "おまかせ"],
    assets: ["写真あり・ロゴあり", "写真あり・ロゴなし", "写真なし・ロゴあり", "どちらもまだない"],
    timings: ["1〜3ヶ月以内に公開したい", "半年以内に公開したい", "時期は未定・情報収集中"],
    roles: ["代表・オーナー", "担当責任者（決裁に関われる）", "同業（Web制作・デザイン）", "その他"],
    // お断り判定に使う選択肢（上の配列と同じ文字列）
    timingUndecided: "時期は未定・情報収集中",
    roleCompetitor: "同業（Web制作・デザイン）",
    mailSubject: "無料プレビュー希望",
    buildMessage: (a: Answers) =>
        [
            "【無料プレビュー希望】",
            `1. 業種・屋号：${a.industry}／${a.name}`,
            `2. 地域：${a.area}`,
            `3. いちばん伝えたい強み：${a.strength}`,
            `4. 好みの雰囲気：${a.mood}${a.refUrl ? `（参考：${a.refUrl}）` : ""}`,
            `5. 写真・ロゴ：${a.assets}`,
            `6. 事業が分かるもの：${a.proof}`,
            `　公開予定：${a.timing}／立場：${a.role}`,
        ].join("\n"),
    progress: { intro: "無料プレビュー申込", done: "入力完了", q: (n: number) => `質問 ${n} / ${TOTAL_STEPS}` },
    intro: {
        title: (
            <>
                5つの質問に答えるだけ。<br />
                最後に、LINEでそのまま<span className="nowrap">送れます。</span>
            </>
        ),
        lead: "所要2分。写真やロゴがなくても大丈夫です。答えた内容はこのページの中だけで使い、送信するかどうかは最後にあなたが決めます。",
        list: ["業種・屋号", "地域", "いちばん伝えたい強み", "好みの雰囲気", "写真・ロゴの有無", "＋ 事業の確認（店舗名・SNS・既存サイトなど）"],
        start: "質問に答えはじめる",
        directPrefix: "質問に答えずにLINEで直接送りたい方は、",
        directLink: "LINEで「プレビュー希望」と送ってください",
    },
    q1: { title: "業種と、お店・教室・会社のお名前を教えてください。", sub: "屋号・店名・会社名。開業前なら予定の名前で大丈夫です。", placeholder: "お店・教室・会社のお名前（例：〇〇整骨院、〇〇英会話教室）" },
    q2: { title: "対象となる地域は、どこですか？", sub: "例：大阪市／渋谷区／全国（オンライン）", placeholder: "例：大阪市 北区" },
    q3: { title: "いちばん伝えたい強みは、何ですか？", sub: "一言で構いません。「産後の骨盤ケアが得意」「地元で30年」「初心者歓迎」など。", placeholder: "例：産後の骨盤ケアが得意。女性スタッフのみで、子連れでも通いやすい" },
    q4: { title: "好みの雰囲気は、どれに近いですか？", placeholder: "参考にしたいサイトがあればURL（任意）" },
    q5: { title: "写真やロゴは、ありますか？", sub: "なくても大丈夫です。プレビューは業種に合ったイメージでお作りします。" },
    q6: {
        title: "最後に、事業の確認だけさせてください。",
        sub: "本気でホームページを作る事業者様のための枠を守るために、確認しています。",
        proofLabel: "事業が分かるもの（いずれか1つ）",
        proofPlaceholder: "店舗名／SNSアカウント／Googleマップの名前／既存サイトURL／開業届の有無 など",
        timingLabel: "公開の予定",
        roleLabel: "あなたのお立場",
    },
    screened: {
        title: "ありがとうございます。今回は、お受けできない枠です。",
        lead: "無料プレビューは「これから本気でホームページを作る事業者様」に、毎月10社分だけお作りしている枠です。",
        competitor: "同業の方はご遠慮いただいています。ご理解ください。",
        undecided: "公開の時期が決まりましたら、そのときにあらためてお申し込みください。お待ちしています。",
        reset: "最初からやり直す",
        services: "NEXT VALLEYのサービスを見る",
    },
    result: {
        badge: "入力ありがとうございます",
        title: "この内容を、LINEで送ってください。",
        leadMobile: "下のボタンを押すと、この内容が入力された状態でLINEのトークが開きます。送信すれば申込完了。3営業日以内にトップページ案（PC・スマホ）をお送りします。",
        leadDesktop: (
            <>
                いちばん簡単なのは、<span className="font-bold text-ink">スマホのカメラで下のQRを読み取る</span>方法です。この内容が入力された状態でLINEが開くので、送信すれば申込完了。3営業日以内にトップページ案（PC・スマホ）をお送りします。
            </>
        ),
        preTitle: "クリックで全選択",
        openLineMobile: "LINEを開いて送る",
        copied: "コピーしました ✓",
        copyOnly: "内容だけコピー",
        mobileNote: "まだ友だち追加していない場合は、先に追加画面が開きます。追加後にもう一度ボタンを押してください。内容が入力されていない場合は、上の内容をコピー（ボタンを押した時点でコピー済みです）して貼り付けてください。",
        qrAria: "スマホで読み取るQRコード",
        qrTitle: "スマホのカメラでQRを読み取る",
        qrLead: "LINEが開き、上の内容が入力された状態になります。まだ友だち追加していない場合は、追加してからもう一度読み取ってください。",
        copyStep: "① 内容をコピーする",
        openLineDesktop: "② PC版LINEを開く",
        desktopNote: "PC版LINEを使う場合は、①でコピー → ②で開いた友だち追加ページから「トーク」へ → 貼り付けて送信してください。",
        copyFailed: "コピーできなかったようです。上の内容をクリックすると全選択できるので、Ctrl+C（Macは⌘+C）でコピーしてください。",
        mailPrefix: "LINEを使わない方は",
        mailLink: "メールで送る",
        mailSuffix: "（同じ内容が本文に入ります）",
        reset: "最初からやり直す",
    },
    error: "この項目に答えてから進んでください。",
    back: "戻る",
    next: "次へ",
    review: "入力内容を確認する",
};

const en: typeof ja = {
    industries: ["Chiropractic / bodywork", "Hair / beauty salon", "Restaurant / café", "School / classes", "Real estate", "Construction / renovation", "Professional services (tax, legal, etc.)", "Medical / clinic", "Fitness / gym", "Retail / e-commerce", "Consulting / services", "Manufacturing", "Other"],
    moods: ["Elegant / upscale", "Friendly / warm", "Energetic / bright", "Trustworthy / solid", "Simple / refined", "Leave it to you"],
    assets: ["Photos yes, logo yes", "Photos yes, logo no", "Photos no, logo yes", "Neither yet"],
    timings: ["Launch within 1–3 months", "Launch within 6 months", "No set date / just researching"],
    roles: ["Owner / founder", "Manager (involved in the decision)", "Web / design professional", "Other"],
    timingUndecided: "No set date / just researching",
    roleCompetitor: "Web / design professional",
    mailSubject: "Free Preview Request",
    buildMessage: (a: Answers) =>
        [
            "【Free Preview Request】",
            `1. Industry / name: ${a.industry} / ${a.name}`,
            `2. Area: ${a.area}`,
            `3. Main strength: ${a.strength}`,
            `4. Look & feel: ${a.mood}${a.refUrl ? ` (reference: ${a.refUrl})` : ""}`,
            `5. Photos / logo: ${a.assets}`,
            `6. Proof of business: ${a.proof}`,
            `   Launch timing: ${a.timing} / Role: ${a.role}`,
        ].join("\n"),
    progress: { intro: "FREE PREVIEW SIGN-UP", done: "ALL DONE", q: (n: number) => `QUESTION ${n} / ${TOTAL_STEPS}` },
    intro: {
        title: (
            <>
                Just five questions.<br />
                Then send it straight from LINE.
            </>
        ),
        lead: "About 2 minutes. No photos or logo needed. Your answers stay on this page — whether to send them is up to you at the end.",
        list: ["Industry & business name", "Area you serve", "Your main strength", "Preferred look & feel", "Photos / logo", "+ Quick business check (name, social media, existing site, etc.)"],
        start: "Start the questions",
        directPrefix: "Prefer to skip the questions? ",
        directLink: "Message us “Preview please” on LINE",
    },
    q1: { title: "What's your industry, and what's your business called?", sub: "Trade name, shop name, or company name. Not open yet? Use the planned name.", placeholder: "Business name (e.g., Sakura Clinic, Sunny English School)" },
    q2: { title: "What area do you serve?", sub: "e.g., Osaka City / Shibuya / Nationwide (online)", placeholder: "e.g., Kita-ku, Osaka" },
    q3: { title: "What's the one thing you most want to get across?", sub: "One line is fine: “Specialists in postnatal pelvic care,” “30 years in the neighborhood,” “Beginners welcome.”", placeholder: "e.g., Postnatal pelvic care specialists. All-female staff, kids welcome." },
    q4: { title: "Which look and feel is closest to what you want?", placeholder: "Link to a site you like (optional)" },
    q5: { title: "Do you have photos or a logo?", sub: "It's fine if you don't. We'll use imagery that suits your industry for the preview." },
    q6: {
        title: "Last thing: a quick business check.",
        sub: "We do this to keep the spots for business owners who are serious about building a website.",
        proofLabel: "Something that shows your business (any one)",
        proofPlaceholder: "Shop name / social media handle / Google Maps listing / existing website URL / business registration, etc.",
        timingLabel: "Launch timing",
        roleLabel: "Your role",
    },
    screened: {
        title: "Thank you. Unfortunately, this offer isn't a fit right now.",
        lead: "The free preview is reserved for business owners who are serious about building a website — just 10 a month. ",
        competitor: "We ask fellow web and design professionals to sit this one out. Thank you for understanding.",
        undecided: "Once you have a launch date in mind, please apply again — we'd love to hear from you.",
        reset: "Start over",
        services: "See what NEXT VALLEY does",
    },
    result: {
        badge: "Thanks for your answers",
        title: "Send this via LINE.",
        leadMobile: "Tap the button below and LINE will open with this message ready to go. Hit send and you're done. Your homepage design (desktop + mobile) will arrive within 3 business days.",
        leadDesktop: (
            <>
                The easiest way is to <span className="font-bold text-ink">scan the QR code below with your phone&rsquo;s camera</span>. LINE opens with this message filled in &mdash; send it and you&rsquo;re done. Your homepage design (desktop + mobile) will arrive within 3 business days.
            </>
        ),
        preTitle: "Click to select all",
        openLineMobile: "Open LINE and send",
        copied: "Copied ✓",
        copyOnly: "Copy text only",
        mobileNote: "If you haven't added us as a friend yet, the add-friend screen opens first. Add us, then tap the button again. If the message isn't filled in, just paste it — it was copied to your clipboard when you tapped the button.",
        qrAria: "QR code to scan with your phone",
        qrTitle: "Scan the QR code with your phone's camera",
        qrLead: "LINE opens with the message above filled in. Not a friend yet? Add us, then scan again.",
        copyStep: "① Copy the message",
        openLineDesktop: "② Open LINE for PC",
        desktopNote: "Using LINE on your PC? ① Copy → ② open the add-friend page and tap “Chat” → paste and send.",
        copyFailed: "Looks like copying didn't work. Click the message above to select it all, then press Ctrl+C (⌘+C on Mac).",
        mailPrefix: "Not on LINE? ",
        mailLink: "Send by email",
        mailSuffix: " (the same message goes in the body)",
        reset: "Start over",
    },
    error: "Please answer this question before continuing.",
    back: "Back",
    next: "Next",
    review: "Review my answers",
};

const copy: Record<Lang, typeof ja> = { ja, en };

/* ───────────────────────── ユーティリティ ───────────────────────── */

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

export function PreviewApply({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    const [step, setStep] = useState(0); // 0 = intro, 1..6 = questions, 7 = result
    const [a, setA] = useState<Answers>(initial);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [qrSvg, setQrSvg] = useState<string | null>(null);
    // 端末判定はクリック時・結果表示時に参照（SSR時はモバイル扱い）
    const [isMobile] = useState(() => (typeof navigator === "undefined" ? true : /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)));

    const set = (k: keyof Answers, v: string) => setA((s) => ({ ...s, [k]: v }));

    const screenedOut = a.role === t.roleCompetitor || a.timing === t.timingUndecided;
    const message = useMemo(() => t.buildMessage(a), [a, t]);

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
        if (!canNext) { setError(t.error); return; }
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
    const mailHref = `mailto:${MAIL_TO}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(message)}`;

    const progress = step === 0 ? 0 : step >= 7 ? 100 : Math.round(((step - 1) / TOTAL_STEPS) * 100);

    return (
        <div className="mx-auto max-w-2xl overflow-hidden rounded-[24px] bg-white text-ink shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            {/* 進捗 */}
            <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 md:px-8">
                <p className="text-[12px] font-bold tracking-[0.2em] text-coral-deep">
                    {step === 0 ? t.progress.intro : step >= 7 ? t.progress.done : t.progress.q(step)}
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
                            {t.intro.title}
                        </h3>
                        <p className="mt-4 text-[15px] leading-[2] text-ink-sub">
                            {t.intro.lead}
                        </p>
                        <ul className="mt-5 space-y-2 text-sm text-ink-sub">
                            {t.intro.list.map((s, i) => (
                                <li key={s} className="flex items-center gap-2.5">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cream text-[11px] font-bold text-coral-deep">{i < 5 ? i + 1 : "✓"}</span>
                                    {s}
                                </li>
                            ))}
                        </ul>
                        <button
                            type="button"
                            onClick={start}
                            className="lp-cta group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-coral-deep px-8 text-[17px] font-bold text-white shadow-cta transition-all hover:-translate-y-0.5 sm:w-auto"
                        >
                            {t.intro.start}
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                        </button>
                        <p className="mt-4 text-xs text-ink-sub">
                            {t.intro.directPrefix}
                            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center px-1 font-bold text-coral-deep underline underline-offset-4">
                                {t.intro.directLink}
                            </a>
                        </p>
                    </div>
                )}

                {/* Q1 */}
                {step === 1 && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">{t.q1.title}</h3>
                        <p className="mt-2 text-sm text-ink-sub">{t.q1.sub}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {t.industries.map((x) => (
                                <Chip key={x} selected={a.industry === x} onClick={() => set("industry", x)}>{x}</Chip>
                            ))}
                        </div>
                        <input className={`${inputCls} mt-4`} placeholder={t.q1.placeholder} value={a.name} onChange={(e) => set("name", e.target.value)} />
                    </div>
                )}

                {/* Q2 */}
                {step === 2 && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">{t.q2.title}</h3>
                        <p className="mt-2 text-sm text-ink-sub">{t.q2.sub}</p>
                        <input className={`${inputCls} mt-5`} placeholder={t.q2.placeholder} value={a.area} onChange={(e) => set("area", e.target.value)} />
                    </div>
                )}

                {/* Q3 */}
                {step === 3 && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">{t.q3.title}</h3>
                        <p className="mt-2 text-sm text-ink-sub">{t.q3.sub}</p>
                        <textarea className={`${inputCls} mt-5 min-h-[120px]`} placeholder={t.q3.placeholder} value={a.strength} onChange={(e) => set("strength", e.target.value)} />
                    </div>
                )}

                {/* Q4 */}
                {step === 4 && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">{t.q4.title}</h3>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {t.moods.map((x) => (
                                <Chip key={x} selected={a.mood === x} onClick={() => set("mood", x)}>{x}</Chip>
                            ))}
                        </div>
                        <input className={`${inputCls} mt-4`} placeholder={t.q4.placeholder} value={a.refUrl} onChange={(e) => set("refUrl", e.target.value)} />
                    </div>
                )}

                {/* Q5 */}
                {step === 5 && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">{t.q5.title}</h3>
                        <p className="mt-2 text-sm text-ink-sub">{t.q5.sub}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {t.assets.map((x) => (
                                <Chip key={x} selected={a.assets === x} onClick={() => set("assets", x)}>{x}</Chip>
                            ))}
                        </div>
                    </div>
                )}

                {/* Q6: 事業の確認 */}
                {step === 6 && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">{t.q6.title}</h3>
                        <p className="mt-2 text-sm leading-[1.9] text-ink-sub">{t.q6.sub}</p>
                        <label className="mt-5 block text-sm font-bold text-ink">{t.q6.proofLabel}</label>
                        <input className={`${inputCls} mt-2`} placeholder={t.q6.proofPlaceholder} value={a.proof} onChange={(e) => set("proof", e.target.value)} />
                        <p className="mt-5 text-sm font-bold text-ink">{t.q6.timingLabel}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {t.timings.map((x) => (
                                <Chip key={x} selected={a.timing === x} onClick={() => set("timing", x)}>{x}</Chip>
                            ))}
                        </div>
                        <p className="mt-5 text-sm font-bold text-ink">{t.q6.roleLabel}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {t.roles.map((x) => (
                                <Chip key={x} selected={a.role === x} onClick={() => set("role", x)}>{x}</Chip>
                            ))}
                        </div>
                    </div>
                )}

                {/* 結果 */}
                {step === 7 && screenedOut && (
                    <div>
                        <h3 className="text-xl font-bold leading-snug">{t.screened.title}</h3>
                        <p className="mt-4 text-[15px] leading-[2] text-ink-sub">
                            {t.screened.lead}
                            {a.role === t.roleCompetitor
                                ? t.screened.competitor
                                : t.screened.undecided}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-bold text-ink transition-colors hover:border-coral">
                                <RotateCcw className="h-4 w-4" aria-hidden /> {t.screened.reset}
                            </button>
                            <Link href={withLang(lang, "/")} className="inline-flex min-h-11 items-center px-2 text-sm font-bold text-coral-deep underline underline-offset-4">{t.screened.services}</Link>
                        </div>
                    </div>
                )}

                {step === 7 && !screenedOut && (
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-[12px] font-bold text-coral-deep">
                            <Check className="h-4 w-4" aria-hidden /> {t.result.badge}
                        </p>
                        <h3 className="mt-4 text-xl font-bold leading-snug">{t.result.title}</h3>
                        {isMobile ? (
                            <p className="mt-2 text-sm leading-[1.9] text-ink-sub">
                                {t.result.leadMobile}
                            </p>
                        ) : (
                            <p className="mt-2 text-sm leading-[1.9] text-ink-sub">
                                {t.result.leadDesktop}
                            </p>
                        )}
                        <pre className="mt-5 select-all whitespace-pre-wrap rounded-2xl border border-line bg-base p-4 text-[13px] leading-[1.9] text-ink" title={t.result.preTitle}>{message}</pre>

                        {isMobile ? (
                            <>
                                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <button
                                        type="button"
                                        onClick={openLineMobile}
                                        className="lp-cta group inline-flex h-16 flex-1 items-center justify-center gap-3 rounded-full bg-[#05a247] px-6 text-[19px] font-bold text-white shadow-[0_14px_32px_rgba(5,162,71,0.38)] transition-all hover:-translate-y-0.5"
                                    >
                                        <MessageCircle className="h-6 w-6" aria-hidden />
                                        {t.result.openLineMobile}
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                                    </button>
                                    <button type="button" onClick={doCopy} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm font-bold text-ink transition-colors hover:border-coral">
                                        <Copy className="h-4 w-4" aria-hidden /> {copied ? t.result.copied : t.result.copyOnly}
                                    </button>
                                </div>
                                <p className="mt-4 text-xs leading-[1.9] text-ink-sub">
                                    {t.result.mobileNote}
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="mt-6 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
                                    <div className="mx-auto w-56 rounded-2xl border border-line bg-white p-2 sm:mx-0" aria-label={t.result.qrAria}>
                                        {qrSvg ? (
                                            <div className="[&>svg]:h-auto [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
                                        ) : (
                                            <div className="aspect-square w-full animate-pulse rounded-xl bg-base" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
                                            <Smartphone className="h-5 w-5 text-coral-deep" aria-hidden />
                                            {t.result.qrTitle}
                                        </p>
                                        <p className="mt-2 text-sm leading-[1.9] text-ink-sub">
                                            {t.result.qrLead}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                onClick={doCopy}
                                                className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 ${copied ? "bg-ink" : "bg-coral-deep"}`}
                                            >
                                                {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                                                {copied ? t.result.copied : t.result.copyStep}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={openLineDesktop}
                                                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#05a247] px-5 text-[19px] font-bold text-white transition-all hover:-translate-y-0.5"
                                            >
                                                <MessageCircle className="h-5 w-5" aria-hidden />
                                                {t.result.openLineDesktop}
                                            </button>
                                        </div>
                                        <p className="mt-3 text-xs leading-[1.9] text-ink-sub">
                                            {t.result.desktopNote}
                                            {copyFailed && <span className="block font-bold text-coral-deep">{t.result.copyFailed}</span>}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                        <p className="mt-3 text-xs text-ink-sub">
                            {t.result.mailPrefix}{" "}
                            <a href={mailHref} className="inline-flex min-h-11 items-center gap-1 font-bold text-coral-deep underline underline-offset-4">
                                <Mail className="h-3.5 w-3.5" aria-hidden /> {t.result.mailLink}
                            </a>
                            {t.result.mailSuffix}
                        </p>
                        <button type="button" onClick={reset} className="mt-2 inline-flex min-h-11 items-center gap-2 text-xs text-ink-sub underline underline-offset-4">
                            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> {t.result.reset}
                        </button>
                    </div>
                )}

                {/* ナビゲーション */}
                {step >= 1 && step <= TOTAL_STEPS && (
                    <div className="mt-8">
                        {error && <p className="mb-3 text-sm font-bold text-coral-deep">{error}</p>}
                        <div className="flex items-center justify-between gap-3">
                            <button type="button" onClick={back} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-ink-sub transition-colors hover:text-ink">
                                <ArrowLeft className="h-4 w-4" aria-hidden /> {t.back}
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                className={`group inline-flex h-13 min-h-12 items-center gap-2 rounded-full px-7 text-[15px] font-bold text-white transition-all ${
                                    canNext ? "bg-coral-deep hover:-translate-y-0.5" : "bg-ink-sub/50"
                                }`}
                            >
                                {step === TOTAL_STEPS ? t.review : t.next}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
