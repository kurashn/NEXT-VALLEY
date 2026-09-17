// Server Component — 無料プレビューのページ（preview-design/ の6枚の参考画像を再現）
// 構成: ヘッダー → FV → お届けするデザイン案 → 3ステップ → 料金 → FAQ → 最終CTA → フッター
// ゴールは1つ（公式LINEで申し込む）。残り枠は copy.tsx の REMAINING_SLOTS を使う。

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, CalendarDays, Database, CircleCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { serif } from "@/components/ui/SerifHeading";
import { heavy, hand, V4 } from "@/lib/fonts-v4";
import { withLang, type Lang } from "@/i18n";
import { LINE_URL, REMAINING_SLOTS, TOTAL_SLOTS } from "./copy";
import { StickyApply } from "./StickyApply";
import { MiniSite, Laptop, Phone, Browser, SITES, StepIllustLine, StepIllustDesign, StepIllustDecide, CornerArcs, Blob } from "./Mock";

import logoDark from "@/images/logo-dark.png";

export { previewMetadata } from "./copy";

const NAVY = "#0F2540";
const TEAL = V4.teal;
const CORAL = V4.coralDeep;
const CREAM = "#FBF9F4";
const SUB = "#3B4457";

const ja = {
    header: { tagline: <>埼玉の小さな事業に、<br />Webで新しい景色を。</>, home: "トップページへ", cta: "無料プレビューを申し込む" },
    hero: {
        eyebrow: "契約前に見られる、無料デザインプレビュー",
        h1: (
            <>
                あなたの事業の<br />
                <span style={{ color: TEAL }}>ホームページ</span>を、<br />
                <span className="whitespace-nowrap"><span style={{ color: CORAL }}>契約前</span>に見てみませんか。</span>
            </>
        ),
        lead: <><span className="nowrap">事業に合わせたトップページ案を、</span><br className="hidden md:block" /><span className="nowrap">PC・スマホの両方で無料作成。</span></>,
        checks: [
            <>プレビュー作成 <span className={`${heavy.className} text-[26px] md:text-[30px]`} style={{ color: CORAL }}>0</span><span className="font-bold" style={{ color: CORAL }}>円</span></>,
            <>申込だけで契約・請求なし</>,
        ],
        cta: "LINEで無料プレビューを申し込む",
        ctaNote: "友だち追加後、簡単なヒアリングにお答えください。",
        terms: "正式制作は、初期0円・月額8,980円（税込）／最低契約期間1年。",
        slots: `毎月${TOTAL_SLOTS}社限定・今月あと${REMAINING_SLOTS}社`,
        pc: "PC",
        sp: "スマホ",
        caption: "デザイン案のイメージ",
        note: "無料で作成するのはトップページのデザイン案です。",
    },
    preview: {
        word: "Preview",
        sub: "お届けするデザイン案",
        title: <><span style={{ color: TEAL }}>あなたの事業</span>なら、<span className="nowrap">こんなホームページに。</span></>,
        lead: "事業の内容と、ご希望の雰囲気を反映します。",
        items: [
            { site: SITES.company, k: "会社", d: "信頼感と、事業の強みが伝わる。" },
            { site: SITES.cafe, k: "店舗", d: "お店の雰囲気と、こだわりを。" },
            { site: SITES.music, k: "教室", d: "レッスンの魅力を、わかりやすく。" },
        ],
        pill: "無料プレビューの範囲",
        note1: "トップページのデザイン案（PC・スマホ）をお届けします。",
        note2: "下層ページの制作・サイト公開は、正式契約後に進めます。",
        note3: "※ 掲載画像はデザイン案のイメージです。",
    },
    flow: {
        word: "Flow",
        sub: "申し込みから受け取りまで",
        title: <>申し込みから、<span style={{ color: TEAL }}>3ステップ</span>。</>,
        lead: "デザイン案を見てから、依頼するか決められます。",
        steps: [
            { n: "01", color: CORAL, Illust: StepIllustLine, t: "LINEで申し込む", d: <><span className="nowrap">友だち追加後、</span><br /><span className="nowrap">簡単なヒアリングに回答。</span></> },
            { n: "02", color: TEAL, Illust: StepIllustDesign, t: "デザイン案を受け取る", d: <><span className="nowrap">必要情報が揃ってから、</span><br /><span className="nowrap"><b style={{ color: CORAL }}>3営業日以内</b>にお届け。</span></> },
            { n: "03", color: CORAL, Illust: StepIllustDecide, t: "見てから、決める", d: <><span className="nowrap">内容・料金・条件を確認し、</span><br /><span className="nowrap">依頼するかご判断ください。</span></> },
        ],
        note: "合わなければ、見送っていただいて構いません。",
        note2: "お申し込みだけで契約・請求は発生しません。",
    },
    price: {
        word: "Price",
        sub: "無料の理由と、その先の料金",
        title: <>まずは、<span style={{ color: TEAL }}>仕上がり</span>を<span className="nowrap">知ってほしいから。</span></>,
        lead: <><span className="nowrap">正式な制作をご検討いただくために、</span><span className="nowrap">トップページ案を無料で作成しています。</span><br className="hidden md:block" /><span className="nowrap">ご依頼いただく場合の料金・条件も、</span><span className="nowrap">先にお伝えします。</span></>,
        leftLabel: "正式に制作をご依頼いただく場合",
        plan: "ホームページ制作・管理",
        initialLabel: "初期制作費",
        monthlyLabel: "月額",
        totalLabel: "初年度総額",
        rightLabel: "月額に含まれるもの",
        rows: [["ホームページ制作", "10ページまで"], ["修正・更新", "無制限"], ["ドメイン・サーバー費", "込み"]],
        term: "最低契約期間：",
        termValue: "1年間",
        billing: "課金開始：",
        billingValue: "契約日",
        note: "※ 継続的な集客支援は、別途お見積もりです。",
        link: "料金・サービスの詳細を見る",
    },
    faq: {
        word: "FAQ",
        sub: "よくある質問",
        trust: ["2021年創業", "100社以上の制作・支援"],
        title: <>申し込む前に、<span style={{ color: TEAL }}>気になること。</span></>,
        items: [
            { q: "本当に無料ですか？", a: "トップページのデザイン案は無料です。正式契約前に費用は発生しません。" },
            { q: "デザイン案を見てから、断っても大丈夫ですか？", a: "はい。デザイン案と料金・条件を確認してから、ご判断いただけます。こちらから追いかける連絡もしません。" },
            { q: "まだホームページがなくても申し込めますか？", a: "申し込めます。事業の内容と伝えたいことが分かれば、それに合った構成でお作りします。写真やロゴがなくても大丈夫です。" },
            { q: "申し込みには、何を用意すればよいですか？", a: "公式LINEを追加し、ヒアリング（約1分）に答えるだけです。会社・お店・教室のお名前、作る目的、載せたい内容、あれば今のサイトやInstagramを教えてください。" },
        ],
    },
    cta: {
        eyebrow: "YOUR NEXT, TOGETHER.",
        title: <>まずは、あなたの事業の<br /><span style={{ color: TEAL }}>デザイン案</span>を見てみませんか。</>,
        lead: <><span className="nowrap">新規制作も、リニューアルも。</span><span className="nowrap">LINEからお気軽にご相談ください。</span></>,
        button: "LINEで無料プレビューを申し込む",
        steps: "友だち追加 → ヒアリングに回答 → デザイン案を受け取る",
        note: "お申し込みだけで契約・請求は発生しません。",
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

const copy: Record<Lang, typeof ja> = { ja, en: ja };

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

function LineIcon() {
    return (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-black" style={{ color: CORAL }} aria-hidden>LINE</span>
    );
}

function LineButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-[64px] items-center justify-center gap-3 rounded-full pl-4 pr-8 text-[17px] font-bold text-white shadow-[0_12px_30px_rgba(232,80,58,0.3)] transition-transform hover:-translate-y-0.5 md:text-[19px] ${className}`}
            style={{ backgroundColor: CORAL }}
        >
            <LineIcon />
            {children}
            <ArrowUpRight className="h-5 w-5" aria-hidden />
        </a>
    );
}

function Check({ className = "h-7 w-7" }: { className?: string }) {
    return <CircleCheck className={className} strokeWidth={1.8} style={{ color: TEAL }} aria-hidden />;
}

export function PreviewPage({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <main className="min-h-screen bg-white" style={{ color: NAVY }}>
            {/* ヘッダー */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
                    <div className="flex items-center gap-4">
                        <Link href={withLang(lang, "/")} className="inline-flex min-h-11 items-center">
                            <Image src={logoDark} alt="NEXT VALLEY" width={170} height={28} priority className="h-7 w-auto md:h-8" />
                        </Link>
                        <p className="hidden text-[11px] leading-[1.5] lg:block" style={{ color: SUB }}>{t.header.tagline}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href={withLang(lang, "/")} className="hidden text-[13px] font-bold md:inline" style={{ color: NAVY }}>{t.header.home}</Link>
                        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-5 text-[13px] font-bold text-white md:h-12 md:px-6 md:text-[15px]" style={{ backgroundColor: CORAL }}>
                            {t.header.cta}
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </a>
                    </div>
                </div>
            </header>

            {/* FV */}
            <section className="relative overflow-hidden px-4 pb-12 pt-8 md:px-6 md:pb-20 md:pt-12" style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#FBF9F4 100%)" }}>
                <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.92fr_1.08fr] md:gap-4">
                    <div>
                        <p className="flex items-center gap-3 text-[14px] font-bold md:text-[16px]" style={{ color: CORAL }}>
                            <span aria-hidden className="block h-px w-10" style={{ backgroundColor: CORAL }} />
                            {t.hero.eyebrow}
                        </p>
                        <h1 className={`${heavy.className} mt-4 text-[clamp(1.75rem,3.75vw,2.95rem)] leading-[1.25] tracking-[-0.03em]`} style={{ color: NAVY }}>
                            {t.hero.h1}
                        </h1>
                        <p className="mt-5 text-[16px] leading-[1.8] md:text-[19px]" style={{ color: NAVY }}>{t.hero.lead}</p>
                        <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] font-bold md:text-[16px]" style={{ color: NAVY }}>
                            {t.hero.checks.map((c, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <Check />
                                    <span>{c}</span>
                                    {i === 0 && <span aria-hidden className="ml-3 hidden h-6 w-px sm:block" style={{ backgroundColor: "rgba(15,37,64,0.25)" }} />}
                                </li>
                            ))}
                        </ul>
                        <LineButton className="mt-6 w-full sm:w-auto">{t.hero.cta}</LineButton>
                        <p className="mt-4 text-[14px]" style={{ color: NAVY }}>{t.hero.ctaNote}</p>
                        <p className="mt-2 text-[12.5px]" style={{ color: SUB }}>{t.hero.terms}</p>
                        <p className="mt-1 text-[12.5px] font-bold" style={{ color: CORAL }}>{t.hero.slots}</p>
                    </div>
                    <div className="relative pb-10 pr-[20%] pt-8">
                        <Blob className="pointer-events-none absolute -left-[6%] -top-[2%] h-auto w-[112%]" />
                        <span className="absolute right-[26%] top-0 z-20 rounded-full border bg-white px-3 py-1 text-[11px] font-bold" style={{ borderColor: TEAL, color: NAVY }}>{t.hero.pc}</span>
                        <Laptop className="relative w-full">
                            <MiniSite site={SITES.bakery} variant="pc" />
                        </Laptop>
                        <span className="absolute -right-2 top-[26%] z-20 rounded-full border bg-white px-3 py-1 text-[11px] font-bold" style={{ borderColor: TEAL, color: NAVY }}>{t.hero.sp}</span>
                        <Phone className="absolute -bottom-[3%] right-0 z-10 w-[28%]">
                            <MiniSite site={SITES.bakery} variant="sp" />
                        </Phone>
                        <p className={`${hand.className} absolute bottom-2 left-[30%] text-[15px]`} style={{ color: TEAL }}>{t.hero.caption} <span aria-hidden>⤴</span></p>
                    </div>
                </div>
                <p className="mx-auto mt-4 max-w-6xl text-right text-[12.5px] md:mt-0" style={{ color: NAVY }}>
                    <span className="inline-block border-b pb-0.5" style={{ borderColor: TEAL }}>{t.hero.note}</span>
                </p>
            </section>

            {/* お届けするデザイン案 */}
            <section className="px-4 py-14 md:px-6 md:py-20" style={{ backgroundColor: CREAM }}>
                <div className="mx-auto max-w-6xl">
                    <Word word={t.preview.word} sub={t.preview.sub} />
                    <h2 className={`${heavy.className} text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.3]`} style={{ color: NAVY }}>{t.preview.title}</h2>
                    <p className="mt-2 text-[15px] md:text-[17px]" style={{ color: NAVY }}>{t.preview.lead}</p>
                    <ul className="mt-9 grid gap-10 md:grid-cols-3 md:gap-8">
                        {t.preview.items.map((it, i) => (
                            <li key={it.k}>
                                <FadeIn delay={i * 0.07}>
                                    <div className="relative pb-10 pr-[8%]">
                                        <Browser>
                                            <MiniSite site={it.site} variant="pc" />
                                        </Browser>
                                        <Phone className="absolute bottom-0 right-0 w-[32%]">
                                            <MiniSite site={it.site} variant="sp" />
                                        </Phone>
                                    </div>
                                    <p className={`${heavy.className} mt-5 text-[22px] tracking-[0.06em]`} style={{ color: NAVY }}>{it.k}</p>
                                    <p className="mt-1 text-[14.5px]" style={{ color: NAVY }}>{it.d}</p>
                                </FadeIn>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-10 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between" style={{ borderColor: "rgba(15,37,64,0.15)" }}>
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
                            <span className="inline-flex w-fit items-center rounded-md px-4 py-2 text-[13px] font-bold text-white" style={{ backgroundColor: CORAL }}>{t.preview.pill}</span>
                            <span aria-hidden className="hidden h-8 w-px md:block" style={{ backgroundColor: "rgba(15,37,64,0.25)" }} />
                            <div>
                                <p className="text-[14.5px] font-bold" style={{ color: NAVY }}>{t.preview.note1}</p>
                                <p className="text-[13px]" style={{ color: SUB }}>{t.preview.note2}</p>
                            </div>
                        </div>
                        <p className="text-[12.5px]" style={{ color: SUB }}>{t.preview.note3}</p>
                    </div>
                </div>
            </section>

            {/* 3ステップ */}
            <section id="flow" className="bg-white px-4 py-14 md:px-6 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <Word word={t.flow.word} sub={t.flow.sub} />
                    <h2 className={`${heavy.className} text-[clamp(1.7rem,4vw,3.2rem)] leading-[1.25]`} style={{ color: NAVY }}>{t.flow.title}</h2>
                    <p className="mt-2 text-[15px] md:text-[18px]" style={{ color: NAVY }}>{t.flow.lead}</p>
                    <ol className="mt-10 grid gap-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start md:gap-4">
                        {t.flow.steps.map((s, i) => (
                            <React.Fragment key={s.n}>
                                <li>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[64px] italic leading-none md:text-[76px]" style={{ fontFamily: serif, fontWeight: 700, color: s.color }}>{s.n}</span>
                                        <s.Illust className="h-auto w-[180px] md:w-[210px]" />
                                    </div>
                                    <p className={`${heavy.className} mt-3 text-[22px] md:text-[26px]`} style={{ color: NAVY }}>{s.t}</p>
                                    <p className="mt-2 text-[15px] leading-[1.8] md:text-[16px]" style={{ color: NAVY }}>{s.d}</p>
                                </li>
                                {i < t.flow.steps.length - 1 && (
                                    <li aria-hidden className="hidden self-center md:block">
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

            {/* 料金 */}
            <section className="px-4 py-14 md:px-6 md:py-20" style={{ backgroundColor: "#F6F9FA" }}>
                <div className="mx-auto max-w-6xl">
                    <Word word={t.price.word} sub={t.price.sub} />
                    <h2 className={`${heavy.className} text-[clamp(1.7rem,4vw,3.2rem)] leading-[1.25]`} style={{ color: NAVY }}>{t.price.title}</h2>
                    <p className="mt-3 text-[15px] leading-[1.9] md:text-[18px]" style={{ color: NAVY }}>{t.price.lead}</p>
                    <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-0">
                        <div className="md:pr-10">
                            <p className="flex items-center gap-3 text-[14px] font-bold md:text-[16px]" style={{ color: CORAL }}><span aria-hidden className="block h-px w-8" style={{ backgroundColor: CORAL }} />{t.price.leftLabel}</p>
                            <p className={`${heavy.className} mt-3 text-[26px] md:text-[34px]`} style={{ color: NAVY }}>{t.price.plan}</p>
                            <div className="mt-4 flex items-end gap-6 md:gap-8">
                                <div className="pr-6 md:pr-8" style={{ borderRight: "1px solid rgba(15,37,64,0.2)" }}>
                                    <p className="text-[13px] font-bold md:text-[15px]" style={{ color: NAVY }}>{t.price.initialLabel}</p>
                                    <p className="mt-1 leading-none" style={{ fontFamily: serif, fontWeight: 700, fontStyle: "italic", color: TEAL }}><span className="text-[64px] md:text-[80px]">0</span><span className={`${heavy.className} ml-1 text-[22px] not-italic md:text-[26px]`} style={{ color: NAVY }}>円</span></p>
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold md:text-[15px]" style={{ color: NAVY }}>{t.price.monthlyLabel}</p>
                                    <p className="mt-1 leading-none" style={{ fontFamily: serif, fontWeight: 700, fontStyle: "italic", color: CORAL }}><span className="text-[64px] md:text-[80px]">8,980</span><span className={`${heavy.className} ml-1 text-[22px] not-italic md:text-[26px]`}>円</span><span className="ml-1 text-[13px] not-italic md:text-[15px]" style={{ color: NAVY, fontFamily: "inherit" }}>（税込）</span></p>
                                </div>
                            </div>
                            <p className="mt-5 border-t pt-4 text-center text-[15px] font-bold md:text-[17px]" style={{ borderColor: "rgba(15,37,64,0.2)", color: NAVY }}>
                                {t.price.totalLabel}　<span className="text-[26px] md:text-[30px]" style={{ fontFamily: serif, fontWeight: 700 }}>107,760</span> 円（税込）
                            </p>
                        </div>
                        <div className="md:border-l md:pl-10" style={{ borderColor: "rgba(15,37,64,0.2)" }}>
                            <p className="flex items-center gap-3 text-[14px] font-bold md:text-[16px]" style={{ color: TEAL }}><span aria-hidden className="block h-px w-8" style={{ backgroundColor: TEAL }} />{t.price.rightLabel}</p>
                            <ul className="mt-2">
                                {t.price.rows.map(([k, v], i) => (
                                    <li key={k} className="flex items-center gap-4 py-4 md:py-5" style={{ borderTop: i ? "1px solid rgba(15,37,64,0.15)" : undefined }}>
                                        <Check className="h-8 w-8 shrink-0" />
                                        <span className="flex-1 text-[17px] md:text-[20px]" style={{ color: NAVY }}>{k}</span>
                                        <span className="text-[17px] md:text-[20px]" style={{ color: NAVY }}><span style={{ fontFamily: serif, fontWeight: 700 }}>{v.match(/^\d+/)?.[0] ?? ""}</span>{v.replace(/^\d+/, "")}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-[10px] px-6 py-5 md:flex-row md:gap-14" style={{ backgroundColor: "#E1EEF2" }}>
                        <p className="flex items-center gap-3 text-[16px] md:text-[18px]" style={{ color: NAVY }}><CalendarDays className="h-7 w-7" strokeWidth={1.6} style={{ color: TEAL }} aria-hidden />{t.price.term}<b className="text-[20px] md:text-[24px]">{t.price.termValue}</b></p>
                        <span aria-hidden className="hidden h-8 w-px md:block" style={{ backgroundColor: "rgba(15,37,64,0.25)" }} />
                        <p className="flex items-center gap-3 text-[16px] md:text-[18px]" style={{ color: NAVY }}><Database className="h-7 w-7" strokeWidth={1.6} style={{ color: TEAL }} aria-hidden />{t.price.billing}<b className="text-[20px] md:text-[24px]">{t.price.billingValue}</b></p>
                    </div>
                    <div className="mt-4 flex flex-col gap-2 text-[13px] md:flex-row md:items-center md:justify-between" style={{ color: SUB }}>
                        <p>{t.price.note}</p>
                        <Link href={withLang(lang, "/price")} className="inline-flex min-h-11 items-center gap-1 font-bold underline decoration-2 underline-offset-[6px]" style={{ color: NAVY }}>
                            {t.price.link}
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-4 py-14 md:px-6 md:py-20" style={{ backgroundColor: CREAM }}>
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <Word word={t.faq.word} sub={t.faq.sub} />
                        <p className="text-[13px]" style={{ color: SUB }}>{t.faq.trust.join("　｜　")}</p>
                    </div>
                    <h2 className={`${heavy.className} text-[clamp(1.7rem,4vw,3.2rem)] leading-[1.25]`} style={{ color: NAVY }}>{t.faq.title}</h2>
                    <div className="mt-6">
                        {t.faq.items.map((f, i) => (
                            <details key={f.q} open={i < 2} className="group border-b" style={{ borderColor: "rgba(15,37,64,0.2)" }}>
                                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-5 py-5 [&::-webkit-details-marker]:hidden">
                                    <span className="text-[30px] italic leading-none md:text-[36px]" style={{ fontFamily: serif, fontWeight: 700, color: CORAL }}>Q</span>
                                    <span className={`${heavy.className} flex-1 text-[17px] md:text-[22px]`} style={{ color: NAVY }}>{f.q}</span>
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
                    <h2 className={`${heavy.className} mt-7 text-[clamp(1.7rem,4vw,3.2rem)] leading-[1.3]`} style={{ color: NAVY }}>{t.cta.title}</h2>
                    <p className="mt-5 text-[15px] md:text-[18px]" style={{ color: NAVY }}>{t.cta.lead}</p>
                    <LineButton className="mt-8 w-full sm:w-auto sm:px-12">{t.cta.button}</LineButton>
                    <p className="mt-6 text-[14px] md:text-[16px]" style={{ color: NAVY }}>{t.cta.steps}</p>
                    <p className="mt-3 inline-flex items-center gap-2 text-[14px] md:text-[16px]" style={{ color: NAVY }}><Check className="h-6 w-6" />{t.cta.note}</p>
                </div>
            </section>

            {/* フッター */}
            <footer className="px-4 py-8 md:px-6 md:py-10" style={{ backgroundColor: "#F5F1E9" }}>
                <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link href={withLang(lang, "/")} className="inline-flex min-h-11 items-center">
                            <Image src={logoDark} alt="NEXT VALLEY" width={200} height={33} className="h-8 w-auto" />
                        </Link>
                        <p className="mt-1 text-[12.5px]" style={{ color: SUB }}>{t.footer.tagline}</p>
                    </div>
                    <div className="md:text-right">
                        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] md:justify-end" style={{ color: NAVY }}>
                            {t.footer.links.map((l) => (
                                <li key={l.href}><Link href={l.href === "/tokusho" || l.href === "/privacy" ? l.href : withLang(lang, l.href)} className="inline-flex min-h-11 items-center hover:underline">{l.name}</Link></li>
                            ))}
                        </ul>
                        <p className="text-[12px]" style={{ color: SUB }}>{t.footer.copyright}</p>
                    </div>
                </div>
            </footer>

            <StickyApply lang={lang} />
        </main>
    );
}
