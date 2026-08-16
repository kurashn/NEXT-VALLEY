"use client";

// Web集客セルフ診断 — 15問のアンケート形式。最後にスコアと弱点カテゴリ別の打ち手を表示

import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, RotateCcw } from "lucide-react";
import { serif } from "@/components/ui/SerifHeading";
import type { Lang } from "@/i18n";

type Category = "戦略" | "第一印象" | "スマホ対応" | "伝わる内容" | "信頼" | "検索" | "運用";

const questions: { cat: Category; q: string }[] = [
    { cat: "戦略", q: "ホームページの役割（何のためのサイトか）を、一言で説明できますか？" },
    { cat: "戦略", q: "お客様が問い合わせに至るまでの道筋（どこから来て、何を見て、どう連絡するか）を説明できますか？" },
    { cat: "第一印象", q: "トップ画面を3秒見ただけで「誰の・何のサイトか」が伝わりますか？" },
    { cat: "第一印象", q: "最初の画面（スクロールする前）に、問い合わせボタンがありますか？" },
    { cat: "第一印象", q: "サイトの情報は、1年以内に更新されていますか？" },
    { cat: "スマホ対応", q: "スマホで見たとき、崩れや読みにくさはありませんか？" },
    { cat: "スマホ対応", q: "電話番号は、スマホでタップするだけで発信できますか？" },
    { cat: "伝わる内容", q: "料金の目安が、サイトに載っていますか？" },
    { cat: "伝わる内容", q: "「選ばれる理由」が、他社には書けない具体的な内容になっていますか？" },
    { cat: "信頼", q: "実績・事例・お客様の声が載っていますか？" },
    { cat: "信頼", q: "代表者やスタッフの顔（自社の写真）が見えますか？" },
    { cat: "検索", q: "社名で検索すると、自社サイトが1位に出ますか？" },
    { cat: "検索", q: "「地域名＋業種」で検索して、自社サイトかGoogleマップの情報が出てきますか？" },
    { cat: "検索", q: "Googleビジネスプロフィール（Googleマップの店舗情報）を整備していますか？" },
    { cat: "運用", q: "先月のアクセス数と問い合わせ件数を、答えられますか？" },
];

/* 英語版の質問文（順番・カテゴリは ja と同一。診断ロジックは questions の cat を使う） */
const questionsEn: string[] = [
    "Can you explain, in one sentence, what your website is for?",
    "Can you describe the path a customer takes to contact you (where they come from, what they read, and how they reach out)?",
    "Within 3 seconds of landing on your homepage, is it clear who you are and what you offer?",
    "Is there a contact button visible before visitors scroll?",
    "Has your site been updated within the past year?",
    "Does your site look right and read easily on a phone (no broken layouts, no tiny text)?",
    "Can visitors tap your phone number on a smartphone to call you?",
    "Does your site show at least a rough idea of your pricing?",
    "Are your \"reasons to choose us\" specific enough that no competitor could copy-paste them?",
    "Do you show your track record, case studies, or customer reviews?",
    "Can visitors see the faces of the owner or staff (real photos of your business)?",
    "When you search your business name, does your own site come up first?",
    "When you search \"your area + your type of business,\" does your site or your Google Maps listing appear?",
    "Have you set up and filled out your Google Business Profile (your listing on Google Maps)?",
    "Can you say how many visits and inquiries your site got last month?",
];

const catLabel: Record<Lang, Record<Category, string>> = {
    ja: { 戦略: "戦略", 第一印象: "第一印象", スマホ対応: "スマホ対応", 伝わる内容: "伝わる内容", 信頼: "信頼", 検索: "検索", 運用: "運用" },
    en: {
        戦略: "Strategy",
        第一印象: "First impression",
        スマホ対応: "Mobile",
        伝わる内容: "Messaging",
        信頼: "Trust",
        検索: "Search",
        運用: "Tracking",
    },
};

const advice: Record<Category, string> = {
    戦略: "まず「HPの目的」と「問い合わせまでの道筋」の設計から。ここが決まると、直すべき場所の優先順位がすべて決まります。",
    第一印象: "最初の3秒の伝わり方を改善しましょう。トップの見出しと問い合わせボタンだけでも数字が変わる、いちばん費用対効果の高い改修です。",
    スマホ対応: "アクセスの6〜8割はスマホです。崩れ・読みにくさ・押しにくさは、想像以上の機会損失を生んでいます。",
    伝わる内容: "「自社の言葉」を「お客様の言葉」に。料金の目安と、選ばれる理由の具体化が効きます。",
    信頼: "実績・お客様の声・顔の見える化を。1件の具体的な事例は、どんな営業トークより雄弁です。",
    検索: "「見つけてもらう仕組み」に穴があります。検索とGoogleマップの整備は、地域ビジネスで最も即効性のある打ち手です。",
    運用: "数字を見る習慣がないと、改善は当てずっぽうになります。アクセス解析と月次の確認から始めましょう。",
};

const adviceEn: Record<Category, string> = {
    戦略: "Start with the basics: what the site is for and how visitors get from landing to contacting you. Once that is clear, every other fix falls into a natural order of priority.",
    第一印象: "Improve what visitors take in during the first 3 seconds. Even just rewriting the top headline and adding a contact button moves the numbers — it is the highest-return fix there is.",
    スマホ対応: "60–80% of your visitors are on phones. Broken layouts, hard-to-read text, and buttons that are tough to tap cost you far more business than you would think.",
    伝わる内容: "Swap \"our words\" for \"your customer's words.\" Showing rough pricing and spelling out specific reasons to choose you both work well here.",
    信頼: "Show your track record, customer reviews, and real faces. One concrete case study speaks louder than any sales pitch.",
    検索: "There is a gap in how people find you. Tuning search and your Google Maps listing is the fastest-acting fix for any local business.",
    運用: "Without the habit of checking your numbers, every improvement is a guess. Start with analytics and a quick monthly review.",
};

const tiers = [
    { min: 13, grade: "A", title: "かなり優秀です", body: "基本はしっかり押さえられています。ここから先は、数字を見ながら磨き込む段階。伸びしろは「計測と改善の習慣化」にあります。" },
    { min: 9, grade: "B", title: "土台はあります", body: "全体の骨格はできています。ただし下の弱点カテゴリが問い合わせを止めている可能性が高いです。優先順位をつけて改善しましょう。" },
    { min: 5, grade: "C", title: "もったいない状態です", body: "サイトはあるのに、集客の仕事をしていません。逆に言えば、直せば大きく変わる状態です。弱点カテゴリから着手を。" },
    { min: 0, grade: "D", title: "設計から見直しましょう", body: "部分的な修正より、目的と道筋の設計からやり直すほうが早い可能性が高いです。ただし、全部を一度にやる必要はありません。" },
];

const tiersEn: typeof tiers = [
    { min: 13, grade: "A", title: "You're in great shape", body: "The fundamentals are solidly in place. From here, it is about refining while watching the numbers. Your upside lies in making measurement and improvement a habit." },
    { min: 9, grade: "B", title: "The foundation is there", body: "The overall structure works. But the weak spots below are very likely what is stopping inquiries. Prioritize them and fix them one at a time." },
    { min: 5, grade: "C", title: "You're leaving business on the table", body: "You have a website, but it is not doing the job of bringing in customers. The good news: fixing it will make a big difference. Start with the weak spots below." },
    { min: 0, grade: "D", title: "Time to rethink from the ground up", body: "Rather than patching individual pages, you will likely get there faster by redesigning the purpose and the path to contact. That said, you do not have to do everything at once." },
];

const ui = {
    ja: {
        eyebrow: "SELF CHECK",
        introTitle: (
            <>
                15の質問に答えるだけ。
                <br />
                あなたのWeb集客の<span className="text-coral-deep">弱点</span>が分かります。
            </>
        ),
        introLead: "所要時間は約3分。「はい／いいえ」で答えるだけで、スコアと優先的に直すべきポイントを表示します。",
        start: "診断をはじめる",
        introNote: "登録不要・無料",
        result: "RESULT",
        grade: (g: string) => `グレード ${g}`,
        weakTitle: "優先的に直すべきポイント",
        ctaTitle: (
            <>
                この結果、<span className="text-coral">プロの目</span>で具体化しませんか？
            </>
        ),
        ctaLead: (score: number) =>
            `LINEで「診断${score}点でした」とサイトのURLを送ってください。どこから直すべきか、費用はいくらか、あなたのサイトを見て無料でお答えします。`,
        ctaButton: "LINEで無料診断を受ける",
        ctaNote: "診断・提案・見積もりは無料／しつこい営業なし",
        restart: "もう一度診断する",
        yes: "はい",
        no: "いいえ",
        unknown: "わからない",
        back: "前の質問に戻る",
    },
    en: {
        eyebrow: "SELF CHECK",
        introTitle: (
            <>
                Answer 15 quick questions.
                <br />
                See where your website is <span className="text-coral-deep">losing customers</span>.
            </>
        ),
        introLead: "Takes about 3 minutes. Just answer yes or no and you will get a score plus the fixes to tackle first.",
        start: "Start the check",
        introNote: "No sign-up. Free.",
        result: "RESULT",
        grade: (g: string) => `Grade ${g}`,
        weakTitle: "Fix these first",
        ctaTitle: (
            <>
                Want a <span className="text-coral">professional</span> to turn this into a plan?
            </>
        ),
        ctaLead: (score: number) =>
            `Message us on LINE with "My self-check score was ${score}/15" and your website URL. We will look at your site and tell you where to start and what it would cost — free.`,
        ctaButton: "Free site check on LINE",
        ctaNote: "Assessment, proposal, and quote are free. No pushy sales calls.",
        restart: "Take the check again",
        yes: "Yes",
        no: "No",
        unknown: "Not sure",
        back: "Previous question",
    },
};

type Answer = "yes" | "no" | "unknown";

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export function ShindanTool({ lang = "ja" }: { lang?: Lang }) {
    const t = ui[lang];
    const [step, setStep] = useState(-1); // -1: intro, 0..14: 質問, 15: 結果
    const [answers, setAnswers] = useState<Answer[]>([]);

    const score = useMemo(() => answers.filter((a) => a === "yes").length, [answers]);

    const weakCats = useMemo(() => {
        const byCat = new Map<Category, { total: number; yes: number }>();
        questions.forEach((q, i) => {
            const rec = byCat.get(q.cat) ?? { total: 0, yes: 0 };
            rec.total += 1;
            if (answers[i] === "yes") rec.yes += 1;
            byCat.set(q.cat, rec);
        });
        return [...byCat.entries()]
            .filter(([, r]) => r.yes < r.total)
            .sort((a, b) => a[1].yes / a[1].total - b[1].yes / b[1].total)
            .slice(0, 3)
            .map(([cat]) => cat);
    }, [answers]);

    const answer = (a: Answer) => {
        const next = [...answers];
        next[step] = a;
        setAnswers(next);
        if (step + 1 >= questions.length) {
            setStep(questions.length);
            window.gtag?.("event", "shindan_complete", {
                event_category: "shindan",
                value: next.filter((x) => x === "yes").length,
            });
        } else {
            setStep(step + 1);
        }
    };

    const restart = () => {
        setAnswers([]);
        setStep(-1);
    };

    /* ── イントロ ── */
    if (step === -1) {
        return (
            <div className="rounded-[28px] bg-white p-8 text-center shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:p-14">
                <p className="mb-5 text-[13px] font-bold tracking-[0.3em] text-coral-deep">{t.eyebrow}</p>
                <h2 className="mb-5 text-[clamp(1.5rem,3.6vw,2.25rem)] font-bold leading-[1.5] text-ink">
                    {t.introTitle}
                </h2>
                <p className="lead mx-auto mb-10 max-w-[30em] text-[15px] leading-[2] text-ink-sub">
                    {t.introLead}
                </p>
                <button
                    onClick={() => setStep(0)}
                    className="inline-flex h-16 cursor-pointer items-center gap-2 rounded-full bg-coral-deep px-12 text-[17px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
                >
                    {t.start}
                    <ArrowRight className="h-5 w-5" aria-hidden />
                </button>
                <p className="mt-6 text-sm text-ink-sub">{t.introNote}</p>
            </div>
        );
    }

    /* ── 結果 ── */
    if (step >= questions.length) {
        const tier = (lang === "en" ? tiersEn : tiers).find((x) => score >= x.min)!;
        const adv = lang === "en" ? adviceEn : advice;
        return (
            <div className="rounded-[28px] bg-white p-8 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:p-14">
                <p className="mb-6 text-center text-[13px] font-bold tracking-[0.3em] text-coral-deep">{t.result}</p>

                {/* スコア */}
                <div className="mb-8 flex flex-col items-center gap-4">
                    <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border-4 border-coral bg-cream">
                        <p className="text-5xl font-bold leading-none text-ink" style={{ fontFamily: serif }}>
                            {score}
                            <span className="text-xl text-ink-sub">/15</span>
                        </p>
                        <p className="mt-1 text-sm font-bold text-coral-deep">{t.grade(tier.grade)}</p>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-snug text-ink md:text-3xl">{tier.title}</h2>
                    <p className="max-w-[34em] text-center text-[15px] leading-[2] text-ink-sub">{tier.body}</p>
                </div>

                {/* 弱点カテゴリ */}
                {weakCats.length > 0 && (
                    <div className="mb-10">
                        <h3 className="mb-4 text-center text-lg font-bold text-ink">{t.weakTitle}</h3>
                        <div className="space-y-3">
                            {weakCats.map((cat, i) => (
                                <div key={cat} className="rounded-2xl bg-cream p-5">
                                    <p className="mb-1.5 text-sm font-bold text-coral-deep">
                                        {i + 1}. {catLabel[lang][cat]}
                                    </p>
                                    <p className="text-sm leading-[1.9] text-ink-sub">{adv[cat]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="rounded-2xl bg-navy-deep p-7 text-center md:p-10">
                    <h3 className="mb-3 text-xl font-bold leading-snug text-white md:text-2xl">
                        {t.ctaTitle}
                    </h3>
                    <p className="mx-auto mb-7 max-w-[30em] text-sm leading-[2] text-navy-sub">
                        {t.ctaLead(score)}
                    </p>
                    <a
                        href="https://lin.ee/N4QXdJL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#05a247] px-10 text-[19px] font-bold text-white transition-opacity hover:opacity-90"
                    >
                        <MessageCircle className="h-5 w-5" aria-hidden />
                        {t.ctaButton}
                    </a>
                    <p className="mt-4 text-xs text-navy-sub">{t.ctaNote}</p>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={restart}
                        className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-bold text-ink-sub transition-colors hover:text-coral-deep"
                    >
                        <RotateCcw className="h-4 w-4" aria-hidden />
                        {t.restart}
                    </button>
                </div>
            </div>
        );
    }

    /* ── 質問 ── */
    const q = questions[step];
    const qText = lang === "en" ? questionsEn[step] : q.q;
    const progress = Math.round((step / questions.length) * 100);

    return (
        <div className="rounded-[28px] bg-white p-8 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:p-14">
            {/* プログレス */}
            <div className="mb-8">
                <div className="mb-2 flex items-baseline justify-between">
                    <p className="text-sm font-bold text-coral-deep">
                        Q{step + 1} <span className="text-ink-sub">/ {questions.length}</span>
                    </p>
                    <p className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink-sub">{catLabel[lang][q.cat]}</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-cream">
                    <div
                        className="h-full rounded-full bg-coral transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <h2 className="mb-10 min-h-24 text-xl font-bold leading-[1.7] text-ink md:text-2xl">{qText}</h2>

            <div className="grid gap-3 sm:grid-cols-3">
                <button
                    onClick={() => answer("yes")}
                    className="inline-flex h-16 cursor-pointer items-center justify-center gap-2 rounded-full bg-coral-deep text-[17px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95"
                >
                    <Check className="h-5 w-5" aria-hidden />
                    {t.yes}
                </button>
                <button
                    onClick={() => answer("no")}
                    className="inline-flex h-16 cursor-pointer items-center justify-center rounded-full border-2 border-line bg-white text-[17px] font-bold text-ink transition-colors duration-200 hover:border-coral hover:text-coral-deep"
                >
                    {t.no}
                </button>
                <button
                    onClick={() => answer("unknown")}
                    className="inline-flex h-16 cursor-pointer items-center justify-center rounded-full border-2 border-line bg-white text-[17px] font-bold text-ink-sub transition-colors duration-200 hover:border-coral hover:text-coral-deep"
                >
                    {t.unknown}
                </button>
            </div>

            {step > 0 && (
                <button
                    onClick={() => setStep(step - 1)}
                    className="mt-8 inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-bold text-ink-sub transition-colors hover:text-coral-deep"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    {t.back}
                </button>
            )}
        </div>
    );
}
