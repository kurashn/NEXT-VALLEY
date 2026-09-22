// Server Component — 今あるホームページの無料診断ページ（docs/renewal/2026-09-shindan/構成.md を実装）
// 構成: ヘッダー → FV（LINEのやり取りの見本） → こんな方へ → 診断で分かること → 送っていただくもの → 3ステップ → 診断のあと（料金） → 診断の見本 → FAQ → 最終CTA → フッター
// ゴールは1つ（公式LINEでURLを送ってもらう）。見た目は /preview と揃える。

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, CircleCheck, Smartphone, MapPin, Route, ListChecks, Wrench, Clock3 } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { serif } from "@/components/ui/SerifHeading";
import { heavy, hand, V4 } from "@/lib/fonts-v4";
import { chunks } from "@/lib/nowrap";
import { StickyApply } from "../preview/StickyApply";
import { CornerArcs } from "../preview/Mock";

import logoDark from "@/images/logo-dark.png";
import stepLine from "@/images/preview/step-line.webp";
import stepDesign from "@/images/preview/step-design.webp";
import stepDecide from "@/images/preview/step-decide.webp";

export const SHINDAN_LINE_URL = "https://lin.ee/N4QXdJL#from=shindan";

const NAVY = "#0F2540";
const TEAL = V4.teal;
const CORAL = V4.coralDeep;
const CREAM = "#FBF9F4";
const SUB = "#3B4457";

const t = {
    header: { tagline: <>埼玉の小さな事業に、<br />Webで新しい景色を。</>, home: "トップページへ", cta: "無料診断を申し込む" },
    hero: {
        eyebrow: <><span className="nowrap">今あるホームページの、</span><span className="nowrap">無料診断</span></>,
        h1: (
            <>
                問い合わせが<br />
                <span style={{ color: CORAL }}>来ない原因</span>を、<br />
                <span className="whitespace-nowrap"><span style={{ color: TEAL }}>無料</span>でお答えします。</span>
            </>
        ),
        lead: <><span className="nowrap">今のホームページのURLを、</span><span className="nowrap">LINEで送るだけ。</span><br className="hidden md:block" /><span className="nowrap">改善点と直す順番を、</span><span className="nowrap">3営業日以内にお返しします。</span></>,
        checks: [
            <>診断 <span className={`${heavy.className} text-[26px] md:text-[30px]`} style={{ color: CORAL }}>0</span><span className="font-bold" style={{ color: CORAL }}>円</span></>,
            <>申込だけで契約・請求なし</>,
        ],
        cta: <><span className="hidden md:inline">LINEで</span>無料診断を申し込む</>,
        ctaNote: <><span className="nowrap">友だち追加後、</span><span className="nowrap">URLと業種、困っていることを送ってください。</span></>,
        terms: <><span className="nowrap">作り直しや月額プランへの切り替えを</span><span className="nowrap">前提にしていません。</span><span className="nowrap">自分で直せる内容は、そう書きます。</span></>,
    },
    who: {
        word: "Who",
        sub: "こんな方へ",
        title: <>ホームページは<span className="nowrap">あるのに、</span><span style={{ color: TEAL }}>結果</span>が出ていない。</>,
        items: [
            { k: "見られているのに、問い合わせがない", d: "アクセスはあるのに、電話もLINEも来ない。どこで止まっているかが分からない。" },
            { k: "作ったまま、何年も直していない", d: "料金や営業時間が古いまま。何を直せばいいか、誰に聞けばいいかも分からない。" },
            { k: "店名で検索しても、上に出てこない", d: "Googleで店名や「地域名＋業種」を検索しても、自分のサイトやマップが出てこない。" },
        ],
    },
    what: {
        word: "Check",
        sub: "診断で分かること",
        title: <>改善点と、<span style={{ color: TEAL }}>直す順番</span>を<span className="nowrap">お返しします。</span></>,
        lead: <><span className="nowrap">見るのは5か所。</span><span className="nowrap">効果が大きい順に並べて、</span><span className="nowrap">箇条書きでお返しします。</span></>,
        items: [
            { Icon: ListChecks, k: "改善点3〜5個と、取り組む順番", d: "効果が大きい順。全部ではなく、今やるべきものだけ。" },
            { Icon: Smartphone, k: "スマホとPCの最初の画面", d: "開いた瞬間に「何の店か・どこか」が伝わっているか。" },
            { Icon: MapPin, k: "検索とGoogleマップでの見え方", d: "店名、「地域名＋業種」で出てくるか。写真と口コミの状態。" },
            { Icon: Route, k: "問い合わせまでの導線", d: "電話・LINE・フォームの、どこで人が止まっているか。" },
            { Icon: Wrench, k: "自分で直せることと、頼んだほうがいいこと", d: "無料サービスのままで直せることは、そうお伝えします。" },
        ],
        format: <><span className="nowrap">LINEのメッセージで、</span><span className="nowrap">箇条書きでお返しします。</span><span className="nowrap">長い資料は作りません。</span></>,
    },
    send: {
        word: "Send",
        sub: "送っていただくもの",
        title: <>用意するのは、<span style={{ color: TEAL }}>3行</span>だけ。</>,
        items: [
            { k: "ホームページのURL", d: "Wix・Jimdo・ペライチ・アメブロでも大丈夫です。" },
            { k: "業種と地域", d: "例：本庄市のピアノ教室、熊谷市の整体院。" },
            { k: "困っていること", d: "一言で。「問い合わせが月1件もない」など。" },
        ],
        note: <><span className="nowrap">写真やアクセスデータの準備は要りません。</span></>,
    },
    flow: {
        word: "Flow",
        sub: "申し込みから受け取りまで",
        title: <>申し込みから、<span style={{ color: TEAL }}>3ステップ</span>。</>,
        lead: <><span className="nowrap">診断を見てから、</span><span className="nowrap">どうするか決められます。</span></>,
        steps: [
            { n: "01", color: CORAL, img: stepLine, t: "LINEで申し込む", d: <><span className="nowrap">公式LINEを追加し、</span><br /><span className="nowrap">URLと業種、困りごとを送る。</span></> },
            { n: "02", color: TEAL, img: stepDesign, t: "診断を受け取る", d: <><span className="nowrap"><b style={{ color: CORAL }}>3営業日以内</b>に、</span><br /><span className="nowrap">改善点と直す順番をLINEでお返し。</span></> },
            { n: "03", color: CORAL, img: stepDecide, t: "見てから、決める", d: <><span className="nowrap">自分で直す・頼む・何もしない。</span><br /><span className="nowrap">どれでも構いません。</span></> },
        ],
        note: <><span className="nowrap">こちらから追いかける連絡はしません。</span></>,
        note2: <><span className="nowrap">お申し込みだけで</span><span className="nowrap">契約・請求は発生しません。</span></>,
    },
    price: {
        word: "Price",
        sub: "診断のあと",
        title: <>直す作業を<span className="nowrap">頼みたい場合。</span></>,
        lead: <><span className="nowrap">診断だけで終えても、</span><span className="nowrap">費用はかかりません。</span><span className="nowrap">頼みたくなったときの料金は、</span><span className="nowrap">先にお伝えしておきます。</span></>,
        rows: [
            { k: "作り直し・公開後の管理までまとめて", v: <>初期 <b style={{ fontFamily: serif, fontStyle: "italic" }} className="text-[22px] md:text-[26px]">0</b>円・月額 <b style={{ fontFamily: serif, fontStyle: "italic" }} className="text-[22px] md:text-[26px]">8,980</b>円<span className="text-[13px]">（税込）</span></>, d: "10ページまで・更新無制限・ドメイン／サーバー込み。" },
            { k: "今のサイトを部分的に直すだけ", v: <>内容に応じてお見積もり</>, d: "Googleマップの整備、LINEの導線づくりも同じです。必要な支援だけをご提案します。" },
            { k: "診断だけで終える", v: <>費用なし</>, d: "あとから請求することもありません。" },
        ],
        link: "料金・サービスの詳細を見る",
    },
    sample: {
        word: "Sample",
        sub: "診断の見本",
        title: <>実際の診断は、<span className="nowrap">こんな形で</span><span style={{ color: TEAL }}>お返し</span>します。</>,
        lead: <><span className="nowrap">教室のホームページを例にした、</span><span className="nowrap">診断の形です。</span><span className="nowrap">業種が違っても、見る場所は同じです。</span></>,
        to: "〇〇教室（ピアノ・埼玉）さまへ",
        items: [
            ["スマホで開いた最初の画面に、教室名と場所が出ていません。", "見出しに「本庄市のピアノ教室」を入れる"],
            ["体験レッスンの申込ボタンが、ページの一番下にしかありません。", "最初の画面と、各セクションの終わりに置く"],
            ["Googleマップに写真が2枚しかなく、口コミが0件です。", "教室内の写真を10枚、通っている方に口コミを2件お願いする"],
            ["料金ページが「お問い合わせください」だけです。", "月謝を載せる"],
            ["更新が2023年で止まっています。", "お知らせを月1回"],
        ],
        close: "1と2は今週中に直せます。3は1か月。4と5は方針を決めてから。",
        note: "※ 見本のため、架空の教室で書いています。実際の診断は、あなたのサイトを見て書きます。",
    },
    faq: {
        word: "FAQ",
        sub: "よくある質問",
        title: <>申し込む前に、<span style={{ color: TEAL }}>気になること。</span></>,
        items: [
            { q: "本当に無料ですか？", a: "はい。診断は無料で、あとから請求することもありません。" },
            { q: "診断のあと、営業されますか？", a: "しません。診断をお返ししたあと、こちらから追いかける連絡はしません。頼みたくなったら、LINEでその旨を送ってください。" },
            { q: "Wix・Jimdo・ペライチで作ったサイトでも見てもらえますか？", a: "見られます。無料サービスのままで直せることも、あわせてお伝えします。作り直しを前提にした診断はしません。" },
            { q: "ホームページがなく、Instagramだけです。", a: "InstagramのURLでも診断します。その場合は、Instagramから問い合わせまでの流れと、Googleマップの状態を中心に見ます。" },
        ],
    },
    cta: {
        eyebrow: "YOUR NEXT, TOGETHER.",
        title: <>まずは、<span className="nowrap">URLを</span><span style={{ color: TEAL }}>送ってみて</span>ください。</>,
        lead: <><span className="nowrap">3行送るだけで、</span><span className="nowrap">3営業日以内に診断が届きます。</span></>,
        button: <><span className="hidden md:inline">LINEで</span>無料診断を申し込む</>,
        steps: <><span className="nowrap">友だち追加 →</span> <span className="nowrap">URLを送る →</span> <span className="nowrap">3営業日以内に診断が届く</span></>,
        note: <><span className="nowrap">お申し込みだけで</span><span className="nowrap">契約・請求は発生しません。</span></>,
        subs: [
            { label: "新しく作る方は「無料プレビュー」へ", href: "/preview" },
            { label: "メールで相談する", href: "/contact" },
        ],
    },
    footer: {
        tagline: "埼玉の小さな事業に、頼れるWeb担当を。",
        links: [
            { name: "トップページ", href: "/" },
            { name: "料金・サービス", href: "/price" },
            { name: "お問い合わせ", href: "/contact" },
            { name: "プライバシーポリシー", href: "/privacy" },
            { name: "特定商取引法に基づく表記", href: "/tokusho" },
        ],
        copyright: "© NEXT VALLEY",
    },
};

/* イタリックのセリフ英字（頭文字コーラル、残り青緑）＋ 罫線 ＋ 小見出し */
function Word({ word, sub }: { word: string; sub?: string }) {
    return (
        <div className="mb-3 flex items-center gap-4">
            <span className="text-[30px] italic leading-none md:text-[38px]" style={{ fontFamily: serif, fontWeight: 700 }}>
                <span style={{ color: CORAL }}>{word[0]}</span><span style={{ color: TEAL }}>{word.slice(1)}</span>
            </span>
            <span aria-hidden className="block h-px w-10" style={{ backgroundColor: CORAL }} />
            {sub && <span className="text-[13.5px] font-bold md:text-[15px]" style={{ color: CORAL }}>{sub}</span>}
        </div>
    );
}

function LineIcon({ big = false }: { big?: boolean }) {
    return (
        <span className={`flex shrink-0 items-center justify-center rounded-full bg-white font-black ${big ? "h-12 w-12 text-[14px] md:h-14 md:w-14 md:text-[16px]" : "h-9 w-9 text-[11px]"}`} style={{ color: CORAL }} aria-hidden>LINE</span>
    );
}

function LineButton({ children, className = "", big = false }: { children: React.ReactNode; className?: string; big?: boolean }) {
    return (
        <a
            href={SHINDAN_LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center rounded-full font-bold text-white shadow-[0_12px_30px_rgba(232,80,58,0.3)] transition-transform hover:-translate-y-0.5 ${big ? "min-h-[68px] gap-3 pl-4 pr-7 text-[16px] md:min-h-[88px] md:gap-4 md:pl-5 md:pr-9 md:text-[25px]" : "min-h-[64px] gap-3 pl-4 pr-8 text-[17px] md:text-[19px]"} ${className}`}
            style={{ backgroundColor: CORAL }}
        >
            <LineIcon big={big} />
            <span className="whitespace-nowrap">{children}</span>
            <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden />
        </a>
    );
}

function Check({ className = "h-7 w-7" }: { className?: string }) {
    return <CircleCheck className={className} strokeWidth={1.8} style={{ color: TEAL }} aria-hidden />;
}

/* FV右側：実機風のスマホに、LINEのやり取りの見本。まわりに「何がもらえるか」のカードを浮かべる */
function ChatMock() {
    const bubble = "max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-[1.7] md:text-[13.5px]";
    return (
        <div className="relative mx-auto w-full max-w-[560px] px-6 sm:px-0" aria-label="LINEでのやり取りの例">
            {/* 背景の柔らかい光と、透かしの英字 */}
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(44,143,168,0.16), rgba(44,143,168,0))" }} />
            <span aria-hidden className="pointer-events-none absolute left-1/2 top-[-14px] hidden -translate-x-1/2 select-none whitespace-nowrap text-[150px] italic leading-none sm:block md:text-[190px]" style={{ fontFamily: serif, fontWeight: 700, color: "rgba(20,51,90,0.045)", letterSpacing: "-0.02em" }}>Check</span>

            {/* スマホ本体 */}
            <div className="relative mx-auto w-[292px] md:w-[320px]">
                <div className="relative rounded-[46px] p-[10px] shadow-[0_40px_80px_-24px_rgba(15,37,64,0.35),0_12px_28px_rgba(15,37,64,0.12)]" style={{ backgroundColor: "#14203A" }}>
                    <div aria-hidden className="absolute left-1/2 top-[10px] z-10 h-[26px] w-[104px] -translate-x-1/2 rounded-b-[16px]" style={{ backgroundColor: "#14203A" }} />
                    <div className="overflow-hidden rounded-[38px]" style={{ backgroundColor: "#EEF3F6" }}>
                        <div className="flex items-center gap-2 px-5 pb-3 pt-11 text-[12px] font-bold" style={{ backgroundColor: "#fff", color: NAVY, borderBottom: "1px solid rgba(15,37,64,0.08)" }}>
                            <span className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-black text-white" style={{ backgroundColor: CORAL }}>NV</span>
                            NEXT VALLEY
                            <span className="ml-auto text-[10px] font-normal" style={{ color: SUB }}>公式</span>
                        </div>
                        <div className="flex flex-col gap-2.5 px-3.5 pb-6 pt-4">
                            <p className="text-center text-[10px]" style={{ color: SUB }}>月曜 10:12</p>
                            <div className="flex justify-end">
                                <p className={`${bubble} rounded-br-md text-white`} style={{ backgroundColor: TEAL }}>
                                    https://example-piano.jp<br />本庄市のピアノ教室です<br />体験の申込が月1件もありません
                                </p>
                            </div>
                            <p className="text-center text-[10px]" style={{ color: SUB }}>水曜 15:40</p>
                            <div className="flex justify-start">
                                <p className={`${bubble} rounded-bl-md bg-white shadow-[0_2px_8px_rgba(15,37,64,0.06)]`} style={{ color: NAVY }}>
                                    拝見しました。直す順番でお返しします。<br />
                                    <b style={{ color: CORAL }}>1.</b> スマホの最初の画面に教室名と場所が出ていません → 見出しに「本庄市のピアノ教室」を入れる<br />
                                    <b style={{ color: CORAL }}>2.</b> 体験申込のボタンが一番下だけ → 最初の画面にも置く<br />
                                    <b style={{ color: CORAL }}>3.</b> Googleマップの写真が2枚 → 教室内を10枚<br />
                                    <span style={{ color: SUB }}>1と2は今週中に直せます…</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 浮かぶカード：左上「送るのは3行」／右下「3営業日以内」 */}
                <div className="absolute -left-28 top-[104px] hidden w-[176px] rounded-2xl bg-white p-3.5 shadow-[0_18px_40px_-12px_rgba(15,37,64,0.28)] sm:block" style={{ border: "1px solid rgba(15,37,64,0.08)" }}>
                    <p className="text-[10.5px] font-bold tracking-[0.12em]" style={{ color: CORAL }}>送るのは</p>
                    <p className={`${heavy.className} mt-0.5 text-[22px] leading-none`} style={{ color: NAVY }}>3行<span className="ml-1 text-[13px]">だけ</span></p>
                    <ul className="mt-2 flex flex-col gap-1 text-[11px] leading-[1.5]" style={{ color: SUB }}>
                        {["URL", "業種と地域", "困っていること"].map((x) => (
                            <li key={x} className="flex items-center gap-1.5"><CircleCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={2} style={{ color: TEAL }} aria-hidden />{x}</li>
                        ))}
                    </ul>
                </div>
                <div className="absolute -right-36 bottom-[96px] hidden items-center gap-3 rounded-2xl bg-white py-3 pl-3 pr-4 shadow-[0_18px_40px_-12px_rgba(15,37,64,0.28)] sm:flex" style={{ border: "1px solid rgba(15,37,64,0.08)" }}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "#E9F3F5" }}><Clock3 className="h-5 w-5" strokeWidth={1.8} style={{ color: TEAL }} aria-hidden /></span>
                    <span>
                        <span className={`${heavy.className} block text-[18px] leading-none`} style={{ color: NAVY }}>3営業日<span className="text-[12px]">以内</span></span>
                        <span className="mt-1 block text-[11px]" style={{ color: SUB }}>LINEで診断が届く</span>
                    </span>
                </div>
            </div>
            <p className="mt-4 text-center text-[11.5px] md:mt-5" style={{ color: SUB }}>※ やり取りの例です（架空の教室）</p>
        </div>
    );
}

export function ShindanPage() {
    return (
        <main className="min-h-screen bg-white" style={{ color: NAVY }}>
            {/* ヘッダー */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="inline-flex min-h-11 items-center">
                            <Image src={logoDark} alt="NEXT VALLEY" width={170} height={28} priority className="h-7 w-auto md:h-8" />
                        </Link>
                        <p className="hidden text-[11px] leading-[1.5] lg:block" style={{ color: SUB }}>{t.header.tagline}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="hidden text-[13px] font-bold md:inline" style={{ color: NAVY }}>{t.header.home}</Link>
                        <a href={SHINDAN_LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-5 text-[13px] font-bold text-white md:h-12 md:px-6 md:text-[15px]" style={{ backgroundColor: CORAL }}>
                            {t.header.cta}
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </a>
                    </div>
                </div>
            </header>

            {/* FV */}
            <section className="relative overflow-hidden px-4 pb-14 pt-10 md:px-6 md:pb-24 md:pt-16" style={{ background: "linear-gradient(180deg, #FEFEFC 0%, #F7FAFB 100%)" }}>
                {/* 右上の細い円弧（ブランド共通のあしらい） */}
                <svg aria-hidden className="pointer-events-none absolute -right-28 -top-32 hidden h-[420px] w-[420px] md:block" viewBox="0 0 420 420" fill="none">
                    <circle cx="300" cy="120" r="200" stroke={CORAL} strokeWidth="1.2" opacity="0.35" /><circle cx="340" cy="80" r="200" stroke={TEAL} strokeWidth="1.2" opacity="0.35" />
                </svg>
                <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[1.12fr_1fr] lg:gap-8">
                    <div className="relative">
                        <p className="flex items-center gap-3 text-[14px] font-bold md:text-[18px]" style={{ color: CORAL }}>
                            <span aria-hidden className="block h-px w-8 shrink-0 md:w-12" style={{ backgroundColor: CORAL }} />
                            <span>{t.hero.eyebrow}</span>
                        </p>
                        <h1 className={`${heavy.className} mt-4 text-[clamp(1.5rem,7.6vw,2.4rem)] leading-[1.22] md:text-[clamp(1.9rem,3.95vw,3.6rem)] tracking-[-0.035em]`} style={{ color: NAVY }}>
                            {t.hero.h1}
                        </h1>
                        <p className="mt-5 text-[17px] leading-[1.7] md:text-[22px]" style={{ color: NAVY }}>{t.hero.lead}</p>
                        <ul className="mt-6 flex flex-wrap items-center gap-2.5 text-[15px] font-bold md:text-[17px]" style={{ color: NAVY }}>
                            {t.hero.checks.map((c, i) => (
                                <li key={i} className="flex items-center gap-2 rounded-full bg-white py-2 pl-2.5 pr-4" style={{ border: "1px solid rgba(15,37,64,0.12)" }}>
                                    <Check className="h-7 w-7" />
                                    <span>{c}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="relative mt-7 w-full sm:w-fit">
                            <LineButton className="w-full sm:w-auto" big>{t.hero.cta}</LineButton>
                            <p aria-hidden className={`${hand.className} pointer-events-none absolute -top-9 right-0 hidden rotate-[-6deg] whitespace-nowrap text-[24px] leading-none tracking-[0.06em] sm:block sm:-right-2 sm:-top-9 lg:-right-24 lg:-top-7 lg:text-[27px]`} style={{ color: TEAL }}>
                                URLを送るだけ
                                <svg aria-hidden className="absolute -bottom-5 left-2 h-6 w-10 md:-left-9 md:top-4" viewBox="0 0 40 24" fill="none"><path d="M36 2c-8 12-20 18-34 16m0 0 6-5m-6 5 7 3" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </p>
                        </div>
                        <p className="mt-5 text-[15px] md:text-[18px]" style={{ color: NAVY }}>{t.hero.ctaNote}</p>
                        <p className="mt-2 text-[13px] md:text-[15px]" style={{ color: SUB }}>{t.hero.terms}</p>
                    </div>
                    <FadeIn>
                        <ChatMock />
                    </FadeIn>
                </div>
            </section>

            {/* こんな方へ */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: "#FDFBF7" }}>
                <div className="mx-auto max-w-6xl">
                    <Word word={t.who.word} sub={t.who.sub} />
                    <h2 className={`${heavy.className} text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.3] tracking-[-0.02em]`} style={{ color: NAVY }}>{t.who.title}</h2>
                    <ul className="mt-9 grid gap-5 md:grid-cols-3 md:gap-6">
                        {t.who.items.map((it, i) => (
                            <li key={it.k} className="flex">
                                <FadeIn delay={i * 0.07} className="flex-1">
                                    <div className="h-full rounded-2xl border bg-white p-6 md:p-7" style={{ borderColor: "rgba(15,37,64,0.12)" }}>
                                        <span className="text-[34px] italic leading-none md:text-[40px]" style={{ fontFamily: serif, fontWeight: 700, color: i % 2 ? TEAL : CORAL }}>0{i + 1}</span>
                                        <p className={`${heavy.className} mt-3 text-[18px] leading-[1.5] md:text-[20px]`} style={{ color: NAVY }}>{chunks(it.k)}</p>
                                        <p className="mt-2 text-[14.5px] leading-[1.85]" style={{ color: SUB }}>{it.d}</p>
                                    </div>
                                </FadeIn>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 診断で分かること */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: "#FEFDF9" }}>
                <div className="mx-auto max-w-6xl">
                    <Word word={t.what.word} sub={t.what.sub} />
                    <h2 className={`${heavy.className} text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.3] tracking-[-0.02em]`} style={{ color: NAVY }}>{t.what.title}</h2>
                    <p className="mt-2 text-[15px] md:text-[17px]" style={{ color: NAVY }}>{t.what.lead}</p>
                    <ul className="mt-8">
                        {t.what.items.map(({ Icon, k, d }, i) => (
                            <li key={k} className="flex items-start gap-4 py-5 md:items-center md:gap-6 md:py-6" style={{ borderTop: i ? "1px solid rgba(15,37,64,0.15)" : undefined }}>
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full md:h-14 md:w-14" style={{ backgroundColor: "#E9F3F5" }}>
                                    <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.7} style={{ color: TEAL }} aria-hidden />
                                </span>
                                <div className="flex-1 md:flex md:items-center md:gap-8">
                                    <p className={`${heavy.className} text-[17px] leading-[1.5] md:w-[46%] md:text-[21px]`} style={{ color: NAVY }}>{chunks(k)}</p>
                                    <p className="mt-1 text-[14.5px] leading-[1.8] md:mt-0 md:flex-1 md:text-[16px]" style={{ color: SUB }}>{chunks(d)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex items-center gap-3 rounded-[10px] px-5 py-4 text-[14.5px] font-bold md:text-[16px]" style={{ backgroundColor: "#E1EEF2", color: NAVY }}>
                        <Check className="h-7 w-7 shrink-0" />
                        <p>{t.what.format}</p>
                    </div>
                </div>
            </section>

            {/* 送っていただくもの */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: CREAM }}>
                <div className="mx-auto max-w-6xl">
                    <Word word={t.send.word} sub={t.send.sub} />
                    <h2 className={`${heavy.className} text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.3] tracking-[-0.02em]`} style={{ color: NAVY }}>{t.send.title}</h2>
                    <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
                        {t.send.items.map((it, i) => (
                            <li key={it.k} className="flex items-start gap-4 rounded-2xl bg-white p-5 md:p-6" style={{ border: "1px solid rgba(15,37,64,0.12)" }}>
                                <span className="text-[34px] italic leading-none md:text-[40px]" style={{ fontFamily: serif, fontWeight: 700, color: i % 2 ? TEAL : CORAL }}>{i + 1}</span>
                                <div>
                                    <p className={`${heavy.className} text-[17px] md:text-[19px]`} style={{ color: NAVY }}>{it.k}</p>
                                    <p className="mt-1 text-[14px] leading-[1.8]" style={{ color: SUB }}>{chunks(it.d)}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <p className="mt-5 inline-flex items-center gap-2 text-[14.5px] md:text-[16px]" style={{ color: NAVY }}><Check className="h-6 w-6" />{t.send.note}</p>
                </div>
            </section>

            {/* 3ステップ */}
            <section id="flow" className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: "#FEFDF9" }}>
                <div className="mx-auto max-w-6xl">
                    <Word word={t.flow.word} sub={t.flow.sub} />
                    <h2 className={`${heavy.className} text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.3] tracking-[-0.02em]`} style={{ color: NAVY }}>{t.flow.title}</h2>
                    <p className="mt-2 text-[15px] md:text-[18px]" style={{ color: NAVY }}>{t.flow.lead}</p>
                    <ol className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-4">
                        {t.flow.steps.map((s, i) => (
                            <React.Fragment key={s.n}>
                                <li>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[64px] italic leading-none md:text-[76px]" style={{ fontFamily: serif, fontWeight: 700, color: s.color }}>{s.n}</span>
                                        <span className="flex h-[150px] w-[190px] items-center justify-center md:h-[170px] md:w-[220px]"><Image src={s.img} alt="" sizes="220px" className="h-auto max-h-full w-auto max-w-full" /></span>
                                    </div>
                                    <p className={`${heavy.className} mt-3 text-[22px] md:text-[26px]`} style={{ color: NAVY }}>{s.t}</p>
                                    <p className="mt-2 text-[15px] leading-[1.8] md:text-[16px]" style={{ color: NAVY }}>{s.d}</p>
                                </li>
                                {i < t.flow.steps.length - 1 && (
                                    <li aria-hidden className="hidden self-center lg:block">
                                        <ArrowRight className="h-8 w-8" strokeWidth={1.2} style={{ color: "#9DB6C2" }} />
                                    </li>
                                )}
                            </React.Fragment>
                        ))}
                    </ol>
                    <div className="mt-10 border-t pt-6 text-center" style={{ borderColor: "rgba(15,37,64,0.15)" }}>
                        <p className="inline-flex items-center gap-2 text-[16px] font-bold md:text-[18px]" style={{ color: TEAL }}>
                            <Check className="h-7 w-7" />
                            <span style={{ color: NAVY }}>{t.flow.note}</span>
                        </p>
                        <p className="mt-1 text-[13px]" style={{ color: SUB }}>{t.flow.note2}</p>
                    </div>
                </div>
            </section>

            {/* 診断のあと（料金） */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: "#F6F9FA" }}>
                <div className="mx-auto max-w-6xl">
                    <Word word={t.price.word} sub={t.price.sub} />
                    <h2 className={`${heavy.className} text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.3] tracking-[-0.02em]`} style={{ color: NAVY }}>{t.price.title}</h2>
                    <p className="mt-3 text-[15px] leading-[1.9] md:text-[18px]" style={{ color: NAVY }}>{t.price.lead}</p>
                    <ul className="mt-8">
                        {t.price.rows.map((r, i) => (
                            <li key={r.k} className="grid gap-2 py-5 md:grid-cols-[1fr_auto] md:items-center md:gap-8 md:py-6" style={{ borderTop: i ? "1px solid rgba(15,37,64,0.15)" : undefined }}>
                                <div>
                                    <p className={`${heavy.className} text-[17px] md:text-[20px]`} style={{ color: NAVY }}>{chunks(r.k)}</p>
                                    <p className="mt-1 text-[14px] leading-[1.8]" style={{ color: SUB }}>{chunks(r.d)}</p>
                                </div>
                                <p className="text-[16px] font-bold md:text-right md:text-[18px]" style={{ color: NAVY }}>{r.v}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex justify-end">
                        <Link href="/price" className="inline-flex min-h-11 items-center gap-1 text-[13px] font-bold underline decoration-2 underline-offset-[6px]" style={{ color: NAVY }}>
                            {t.price.link}
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 診断の見本 */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: "#FDFBF7" }}>
                <div className="mx-auto max-w-6xl">
                    <Word word={t.sample.word} sub={t.sample.sub} />
                    <h2 className={`${heavy.className} text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.3] tracking-[-0.02em]`} style={{ color: NAVY }}>{t.sample.title}</h2>
                    <p className="mt-2 text-[15px] md:text-[17px]" style={{ color: NAVY }}>{t.sample.lead}</p>
                    <FadeIn>
                        <div className="mt-8 rounded-2xl bg-white p-6 md:p-10" style={{ border: "1px solid rgba(15,37,64,0.12)" }}>
                            <p className="text-[15px] font-bold md:text-[17px]" style={{ color: NAVY }}>{t.sample.to}</p>
                            <ol className="mt-5 flex flex-col gap-4">
                                {t.sample.items.map(([issue, fix], i) => (
                                    <li key={i} className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                                        <span className="text-[26px] italic leading-none md:text-[30px]" style={{ fontFamily: serif, fontWeight: 700, color: CORAL }}>{i + 1}</span>
                                        <div>
                                            <p className="text-[15px] leading-[1.8] md:text-[16.5px]" style={{ color: NAVY }}>{chunks(issue)}</p>
                                            <p className="mt-1 flex items-start gap-2 text-[14.5px] font-bold leading-[1.7] md:text-[16px]" style={{ color: NAVY }}>
                                                <ArrowRight className="mt-1 h-4 w-4 shrink-0" style={{ color: TEAL }} aria-hidden />
                                                <span>{chunks(fix)}</span>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                            <p className="mt-6 border-t pt-5 text-[15px] font-bold md:text-[16.5px]" style={{ borderColor: "rgba(15,37,64,0.15)", color: NAVY }}>{chunks(t.sample.close)}</p>
                        </div>
                    </FadeIn>
                    <p className="mt-4 text-[12.5px]" style={{ color: SUB }}>{t.sample.note}</p>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: CREAM }}>
                <div className="mx-auto max-w-6xl">
                    <Word word={t.faq.word} sub={t.faq.sub} />
                    <h2 className={`${heavy.className} text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.3] tracking-[-0.02em]`} style={{ color: NAVY }}>{t.faq.title}</h2>
                    <div className="mt-6">
                        {t.faq.items.map((f, i) => (
                            <details key={f.q} open={i < 2} className="group border-b" style={{ borderColor: "rgba(15,37,64,0.2)" }}>
                                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-5 py-5 [&::-webkit-details-marker]:hidden">
                                    <span className="text-[30px] italic leading-none md:text-[36px]" style={{ fontFamily: serif, fontWeight: 700, color: CORAL }}>Q</span>
                                    <span className={`${heavy.className} flex-1 text-[16px] leading-[1.5] md:text-[21px]`} style={{ color: NAVY }}>{chunks(f.q)}</span>
                                    <span aria-hidden className="text-[28px] leading-none" style={{ color: TEAL }}><span className="group-open:hidden">＋</span><span className="hidden group-open:inline">−</span></span>
                                </summary>
                                <div className="mb-5 flex items-center gap-5 rounded-[6px] px-5 py-4" style={{ backgroundColor: "#E9F3F5" }}>
                                    <span className="text-[26px] italic leading-none md:text-[30px]" style={{ fontFamily: serif, fontWeight: 700, color: TEAL }}>A</span>
                                    <p className="text-[15px] leading-[1.8] md:text-[16px]" style={{ color: NAVY }}>{f.a}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* 最終CTA */}
            <section id="apply" className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: "#E7F2F4" }}>
                <CornerArcs />
                <div className="relative mx-auto max-w-3xl text-center">
                    <p className="text-[13px] tracking-[0.3em] md:text-[15px]" style={{ color: TEAL }}>{t.cta.eyebrow}</p>
                    <span aria-hidden className="mx-auto mt-3 block h-[2px] w-16" style={{ backgroundColor: CORAL }} />
                    <h2 className={`${heavy.className} mt-7 text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.35] tracking-[-0.02em]`} style={{ color: NAVY }}>{t.cta.title}</h2>
                    <p className="mt-5 text-[15px] md:text-[18px]" style={{ color: NAVY }}>{t.cta.lead}</p>
                    <LineButton className="mt-8 w-full sm:w-auto sm:px-12">{t.cta.button}</LineButton>
                    <p className="mt-6 text-[14px] md:text-[16px]" style={{ color: NAVY }}>{t.cta.steps}</p>
                    <p className="mt-3 inline-flex items-center gap-2 text-[14px] md:text-[16px]" style={{ color: NAVY }}><Check className="h-6 w-6" />{t.cta.note}</p>
                    <ul className="mt-8 flex flex-col items-center justify-center gap-3 text-[14px] sm:flex-row sm:gap-8 md:text-[15px]">
                        {t.cta.subs.map((s) => (
                            <li key={s.href}>
                                <Link href={s.href} className="inline-flex min-h-11 items-center gap-1 font-bold underline decoration-2 underline-offset-[6px]" style={{ color: NAVY }}>
                                    {s.label}
                                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* フッター */}
            <footer className="px-4 py-8 md:px-6 md:py-10" style={{ backgroundColor: "#F5F1E9" }}>
                <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link href="/" className="inline-flex min-h-11 items-center">
                            <Image src={logoDark} alt="NEXT VALLEY" width={200} height={33} className="h-8 w-auto" />
                        </Link>
                        <p className="mt-1 text-[12.5px]" style={{ color: SUB }}>{t.footer.tagline}</p>
                    </div>
                    <div className="md:text-right">
                        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] md:justify-end" style={{ color: NAVY }}>
                            {t.footer.links.map((l) => (
                                <li key={l.href}><Link href={l.href} className="inline-flex min-h-11 items-center hover:underline">{l.name}</Link></li>
                            ))}
                        </ul>
                        <p className="text-[12px]" style={{ color: SUB }}>{t.footer.copyright}</p>
                    </div>
                </div>
            </footer>

            <StickyApply label="LINEで無料診断を申し込む" href={SHINDAN_LINE_URL} />
        </main>
    );
}
