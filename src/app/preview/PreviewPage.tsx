// Server Component — 無料プレビューのページ（previewpage-design.png の再現）
// 構成: ヘッダー → FV → お届けするデザイン案 → 流れ（3ステップ） → 料金 → FAQ → 最終CTA → ミニフッター
// ゴールは1つ（公式LINEで申し込む）。残り枠は copy.tsx の REMAINING_SLOTS を使う。

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, CircleCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { serif } from "@/components/ui/SerifHeading";
import { heavy, hand, V4 } from "@/lib/fonts-v4";
import { withLang, type Lang } from "@/i18n";
import { LINE_URL, REMAINING_SLOTS, TOTAL_SLOTS } from "./copy";
import { StickyApply } from "./StickyApply";
import { MiniSite, Laptop, Phone, Browser, Leaf, SITES } from "./Mock";

import logoDark from "@/images/logo-dark.png";

export { previewMetadata } from "./copy";

const NAVY = V4.navy;
const TEAL = V4.teal;
const CORAL = V4.coralDeep;
const CREAM = "#FBF8F3";

const ja = {
    header: { home: "トップページへ", cta: "無料プレビューを申し込む" },
    hero: {
        eyebrow: "ホームページの新規制作・リニューアルをご検討中の方へ",
        h1: (
            <>
                あなたの事業の<br />
                <span style={{ color: TEAL }}>ホームページ</span>を、<br />
                <span className="nowrap"><span style={{ color: CORAL }}>契約前</span>に、</span><span className="nowrap">見てみませんか。</span>
            </>
        ),
        lead: <><span className="nowrap">事業に合わせたトップページ案を、</span><span className="nowrap">PC・スマホの両方で無料作成。</span></>,
        priceLabel: "プレビュー作成",
        priceValue: "0円",
        priceNote: "お申し込みだけで契約・請求は発生しません",
        cta: "LINEで無料プレビューを申し込む",
        ctaNote: "友だち追加後、簡単なヒアリングにお答えください。",
        slots: `毎月${TOTAL_SLOTS}社限定・今月あと${REMAINING_SLOTS}社`,
        mockCaption: "デザイン案のイメージ",
    },
    preview: {
        label: "Preview",
        sub: "お届けするデザイン案",
        title: "自分の事業なら、こんなホームページに。",
        lead: "事業の内容と、ご希望の雰囲気を反映します。",
        items: [
            { site: SITES.company, k: "会社", d: <><span className="nowrap">信頼感と実績が伝わる</span><br /><span className="nowrap">シンプルで誠実なデザイン。</span></> },
            { site: SITES.cafe, k: "店舗", d: <><span className="nowrap">商品の魅力が伝わる</span><br /><span className="nowrap">写真を活かしたデザイン。</span></> },
            { site: SITES.music, k: "教室", d: <><span className="nowrap">想いが伝わる、</span><br /><span className="nowrap">やさしく上品なデザイン。</span></> },
        ],
        note1: <><span className="nowrap">無料でお届けするのはトップページのデザイン案です。</span><span className="nowrap">下層ページの制作・サイト公開は正式契約後に進めます。</span></>,
        note2: "掲載画像はデザイン案のイメージです。"
    },
    flow: {
        label: "Flow",
        sub: "申し込みから、3ステップ。",
        steps: [
            { n: "01", icon: "line" as const, t: "LINEで申し込む", d: <><span className="nowrap">友だち追加後、</span><br /><span className="nowrap">ヒアリングに回答。</span></> },
            { n: "02", icon: "doc" as const, t: "デザイン案を受け取る", d: <><span className="nowrap">必要情報が揃ってから、</span><br /><span className="nowrap">3営業日以内にお届け。</span></> },
            { n: "03", icon: "check" as const, t: "見てから、決める", d: <><span className="nowrap">内容と料金を確認し、</span><br /><span className="nowrap">依頼するか判断。</span></> },
        ],
        note: "合わなければ、見送っていただいて構いません。",
    },
    price: {
        label: "Price",
        sub: "無料の理由と、その先の料金",
        title: "まずは、仕上がりを知ってほしいから。",
        lead: <><span className="nowrap">正式な制作をご検討いただくために、</span><span className="nowrap">トップページ案を無料で作成しています。</span><br className="hidden md:block" /><span className="nowrap">ご依頼いただく場合の料金・条件も、</span><span className="nowrap">先にお伝えします。</span></>,
        boxTitle: "正式に制作をご依頼いただく場合",
        initialLabel: "初期制作費",
        initialValue: "0",
        monthlyLabel: "月額",
        monthlyValue: "8,980",
        unit: "円",
        tax: "（税込）",
        boxNote: "継続的な集客支援は別途お見積もりです。",
        link: "料金・サービスの詳細を見る",
        rows: [
            ["ページ数", "10ページまで"],
            ["修正・更新", "無制限"],
            ["ドメイン・サーバー", "月額に含む"],
            ["最低契約期間", "1年間"],
            ["課金開始", "契約日"],
            ["初年度総額", "107,760円（税込）"],
        ],
    },
    faq: {
        label: "FAQ",
        title: "申し込み前に、気になること。",
        trust: ["2021年創業", "100社以上の制作・支援"],
        items: [
            { q: "本当に無料ですか？", a: "トップページ案の作成は無料です。正式契約前に費用は発生しません。" },
            { q: "見てから断っても大丈夫ですか？", a: "はい。デザイン案と条件を確認してから、ご判断いただけます。こちらから追いかける連絡もしません。" },
            { q: "まだホームページがなくても申し込めますか？", a: "申し込めます。事業の内容と伝えたいことが分かれば、それに合った構成でお作りします。写真やロゴがなくても大丈夫です。" },
            { q: "申し込みには何を用意すればよいですか？", a: "公式LINEを追加し、ヒアリング（約1分）に答えるだけです。会社・お店・教室のお名前、作る目的、載せたい内容、あれば今のサイトやInstagramを教えてください。" },
        ],
    },
    cta: {
        eyebrow: "YOUR NEXT, TOGETHER.",
        title: "まずは、自分の事業のデザイン案を。",
        lead: <><span className="nowrap">新規制作も、リニューアルも。</span><span className="nowrap">LINEからお気軽にご相談ください。</span></>,
        button: "LINEで無料プレビューを申し込む",
        steps: "友だち追加 → ヒアリングに回答 → デザイン案を受け取る",
        note: "お申し込みだけで契約・請求は発生しません。",
        hand: ["あなたの", "これからを、", "一緒に。"],
    },
    footer: {
        links: [
            { name: "トップページ", href: "/" },
            { name: "料金・サービス", href: "/price" },
            { name: "プライバシーポリシー", href: "/privacy" },
            { name: "特定商取引法に基づく表記", href: "/tokusho" },
        ],
        copyright: "© NEXT VALLEY",
    },
};

const copy: Record<Lang, typeof ja> = { ja, en: ja };

/* 見出しの行（イタリックのセリフ＋罫線＋小見出し） */
function Label({ word, sub }: { word: string; sub?: string }) {
    return (
        <div className="mb-3 flex items-center gap-4">
            <span className="text-[26px] italic leading-none md:text-[30px]" style={{ fontFamily: serif, color: CORAL }}>{word}</span>
            <span aria-hidden className="block h-px w-10" style={{ backgroundColor: "rgba(20,51,90,0.35)" }} />
            {sub && <span className="text-[13.5px] font-bold md:text-[15px]" style={{ color: NAVY }}>{sub}</span>}
        </div>
    );
}

function LineButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-[58px] items-center justify-center gap-2 rounded-full px-8 text-[17px] font-bold text-white shadow-[0_10px_28px_rgba(232,80,58,0.28)] transition-transform hover:-translate-y-0.5 md:text-[18px] ${className}`}
            style={{ backgroundColor: CORAL }}
        >
            {children}
            <ArrowUpRight className="h-5 w-5" aria-hidden />
        </a>
    );
}

function StepIcon({ kind }: { kind: "line" | "doc" | "check" }) {
    if (kind === "line") {
        return (
            <span className="flex h-16 w-16 items-center justify-center rounded-full text-[13px] font-black text-white" style={{ backgroundColor: TEAL }}>
                LINE
            </span>
        );
    }
    if (kind === "doc") return <FileText className="h-14 w-14" strokeWidth={1.4} style={{ color: TEAL }} aria-hidden />;
    return <CircleCheck className="h-14 w-14" strokeWidth={1.4} style={{ color: TEAL }} aria-hidden />;
}

export function PreviewPage({ lang = "ja" }: { lang?: Lang }) {
    const t = copy[lang];
    return (
        <main className="min-h-screen bg-white" style={{ color: NAVY }}>
            {/* ヘッダー（ゴールを1つに） */}
            <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur" style={{ borderColor: "rgba(20,51,90,0.1)" }}>
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
                    <Link href={withLang(lang, "/")} className="inline-flex min-h-11 items-center">
                        <Image src={logoDark} alt="NEXT VALLEY" width={160} height={27} priority className="h-7 w-auto" />
                    </Link>
                    <div className="flex items-center gap-5">
                        <Link href={withLang(lang, "/")} className="hidden text-[13px] font-bold md:inline" style={{ color: NAVY }}>{t.header.home}</Link>
                        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-5 text-[13px] font-bold text-white md:text-[14px]" style={{ backgroundColor: CORAL }}>
                            {t.header.cta}
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </a>
                    </div>
                </div>
            </header>

            {/* FV */}
            <section className="relative overflow-hidden px-4 pb-12 pt-10 md:px-6 md:pb-20 md:pt-16" style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#FBF8F3 100%)" }}>
                <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.02fr_1fr] md:gap-10">
                    <div>
                        <p className="text-[13px] font-bold md:text-[14px]" style={{ color: NAVY }}>{t.hero.eyebrow}</p>
                        <h1 className={`${heavy.className} mt-3 text-[clamp(1.85rem,3.6vw,2.85rem)] leading-[1.3] tracking-[-0.02em]`} style={{ color: NAVY }}>
                            {t.hero.h1}
                        </h1>
                        <p className="mt-4 text-[15px] font-bold md:text-[16px]" style={{ color: NAVY }}>{t.hero.lead}</p>
                        <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[13px]" style={{ color: NAVY }}>
                            <span className="font-bold">{t.hero.priceLabel} <span className={`${heavy.className} text-[22px]`} style={{ color: CORAL }}>{t.hero.priceValue}</span></span>
                            <span aria-hidden className="hidden text-[#9AA9BC] sm:inline">｜</span>
                            <span>{t.hero.priceNote}</span>
                        </p>
                        <LineButton className="mt-5 w-full sm:w-auto">{t.hero.cta}</LineButton>
                        <p className="mt-3 text-[12.5px]" style={{ color: V4.sub }}>{t.hero.ctaNote}</p>
                        <p className="mt-1 text-[12.5px] font-bold" style={{ color: CORAL }}>{t.hero.slots}</p>
                    </div>
                    <div className="relative pb-6 pr-[14%] md:pr-[12%]">
                        <Laptop className="w-full">
                            <MiniSite site={SITES.bakery} variant="pc" />
                        </Laptop>
                        <Phone className="absolute bottom-0 right-0 w-[30%]">
                            <MiniSite site={SITES.bakery} variant="sp" />
                        </Phone>
                        <p className="mt-3 text-right text-[12px] md:absolute md:bottom-1 md:right-[36%] md:mt-0" style={{ color: V4.sub }}>{t.hero.mockCaption} ↗</p>
                    </div>
                </div>
            </section>

            {/* お届けするデザイン案 */}
            <section className="bg-white px-4 py-14 md:px-6 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <Label word={t.preview.label} sub={t.preview.sub} />
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <h2 className={`${heavy.className} text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.3]`} style={{ color: NAVY }}>{t.preview.title}</h2>
                        <p className="text-[13.5px] md:text-[14px]" style={{ color: V4.sub }}>{t.preview.lead}</p>
                    </div>
                    <ul className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
                        {t.preview.items.map((it, i) => (
                            <li key={it.k}>
                                <FadeIn delay={i * 0.07}>
                                    <div className="relative pb-10 pr-[10%]">
                                        <Browser>
                                            <MiniSite site={it.site} variant="pc" />
                                        </Browser>
                                        <Phone className="absolute bottom-0 right-0 w-[34%]">
                                            <MiniSite site={it.site} variant="sp" />
                                        </Phone>
                                    </div>
                                    <p className={`${heavy.className} mt-4 text-[20px]`} style={{ color: NAVY }}>{it.k}</p>
                                    <p className="mt-1 text-[14px] leading-[1.8]" style={{ color: V4.sub }}>{it.d}</p>
                                </FadeIn>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-9 text-center text-[13.5px] font-bold md:text-[14.5px]" style={{ color: NAVY }}>{t.preview.note1}</p>
                    <p className="mt-2 text-center text-[12.5px]" style={{ color: V4.sub }}>{t.preview.note2}</p>
                </div>
            </section>

            {/* 流れ */}
            <section id="flow" className="px-4 py-14 md:px-6 md:py-20" style={{ backgroundColor: CREAM }}>
                <div className="mx-auto max-w-6xl">
                    <Label word={t.flow.label} sub={t.flow.sub} />
                    <ol className="mt-6 grid gap-8 md:grid-cols-3 md:gap-6">
                        {t.flow.steps.map((s, i) => (
                            <li key={s.n} className="relative flex gap-5 md:gap-6">
                                <span className="text-[30px] font-bold leading-none" style={{ fontFamily: serif, color: CORAL }}>{s.n}</span>
                                <div>
                                    <StepIcon kind={s.icon} />
                                    <p className={`${heavy.className} mt-4 text-[17px] md:text-[18px]`} style={{ color: NAVY }}>{s.t}</p>
                                    <p className="mt-2 text-[14px] leading-[1.8]" style={{ color: V4.sub }}>{s.d}</p>
                                </div>
                                {i < t.flow.steps.length - 1 && (
                                    <span aria-hidden className="absolute right-0 top-16 hidden text-[22px] md:block" style={{ color: TEAL }}>›</span>
                                )}
                            </li>
                        ))}
                    </ol>
                    <p className="mt-8 text-center text-[13.5px] font-bold" style={{ color: NAVY }}>{t.flow.note}</p>
                </div>
            </section>

            {/* 料金 */}
            <section className="bg-white px-4 py-14 md:px-6 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <Label word={t.price.label} sub={t.price.sub} />
                    <h2 className={`${heavy.className} text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.3]`} style={{ color: NAVY }}>{t.price.title}</h2>
                    <p className="mt-3 text-[14.5px] leading-[1.9] md:text-[15.5px]" style={{ color: NAVY }}>{t.price.lead}</p>
                    <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1fr] md:gap-8">
                        <div className="rounded-[12px] border" style={{ borderColor: "rgba(44,143,168,0.3)" }}>
                            <p className="rounded-t-[12px] px-6 py-4 text-[15px] font-bold md:text-[16px]" style={{ backgroundColor: "#EAF3F5", color: TEAL }}>{t.price.boxTitle}</p>
                            <div className="px-6 pb-6 pt-6">
                                <div className="flex items-end gap-8">
                                    <div className="pr-8" style={{ borderRight: "1px solid rgba(20,51,90,0.15)" }}>
                                        <p className="text-[14px] font-bold" style={{ color: NAVY }}>{t.price.initialLabel}</p>
                                        <p className={`${heavy.className} mt-1 leading-none`} style={{ color: NAVY }}><span className="text-[54px]">{t.price.initialValue}</span><span className="ml-1 text-[20px]">{t.price.unit}</span></p>
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold" style={{ color: NAVY }}>{t.price.monthlyLabel}</p>
                                        <p className={`${heavy.className} mt-1 leading-none`} style={{ color: CORAL }}><span className="text-[54px]">{t.price.monthlyValue}</span><span className="ml-1 text-[20px]">{t.price.unit}</span><span className="ml-1 text-[14px]">{t.price.tax}</span></p>
                                    </div>
                                </div>
                                <p className="mt-5 text-[13px]" style={{ color: V4.sub }}>{t.price.boxNote}</p>
                                <Link href={withLang(lang, "/price")} className="mt-5 inline-flex min-h-12 items-center gap-1.5 rounded-full border px-6 text-[14px] font-bold" style={{ borderColor: "rgba(20,51,90,0.35)", color: NAVY }}>
                                    {t.price.link}
                                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                                </Link>
                            </div>
                        </div>
                        <dl className="overflow-hidden rounded-[12px] border" style={{ borderColor: "rgba(20,51,90,0.12)" }}>
                            {t.price.rows.map(([k, v], i) => (
                                <div key={k} className="grid grid-cols-[42%_1fr]" style={{ borderTop: i ? "1px solid rgba(20,51,90,0.12)" : undefined }}>
                                    <dt className="px-5 py-4 text-[14px]" style={{ backgroundColor: CREAM, color: V4.sub }}>{k}</dt>
                                    <dd className="px-5 py-4 text-[15px] font-bold" style={{ color: NAVY }}>{v}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-4 py-14 md:px-6 md:py-20" style={{ backgroundColor: CREAM }}>
                <div className="mx-auto max-w-6xl">
                    <Label word={t.faq.label} />
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <h2 className={`${heavy.className} text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.3]`} style={{ color: NAVY }}>{t.faq.title}</h2>
                        <p className="text-[13.5px]" style={{ color: NAVY }}>{t.faq.trust.join("　｜　")}</p>
                    </div>
                    <div className="mt-6 grid gap-3">
                        {t.faq.items.map((f, i) => (
                            <details key={f.q} open={i < 2} className="group rounded-[10px] border bg-white px-5 md:px-7" style={{ borderColor: "rgba(20,51,90,0.12)" }}>
                                <summary className="flex min-h-14 cursor-pointer list-none items-center gap-4 py-4 [&::-webkit-details-marker]:hidden">
                                    <span className="text-[18px] font-bold" style={{ fontFamily: serif, color: CORAL }}>Q</span>
                                    <span className="flex-1 text-[15px] font-bold md:text-[16px]" style={{ color: NAVY }}>{f.q}</span>
                                    <span aria-hidden className="text-[22px] leading-none transition-transform group-open:rotate-45" style={{ color: CORAL }}>＋</span>
                                </summary>
                                <div className="flex gap-4 pb-5">
                                    <span className="text-[16px] font-bold" style={{ fontFamily: serif, color: V4.sub }}>A</span>
                                    <p className="text-[14.5px] leading-[1.9]" style={{ color: V4.sub }}>{f.a}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* 最終CTA */}
            <section id="apply" className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24" style={{ backgroundColor: "#E4EEF1" }}>
                <p aria-hidden className={`${hand.className} pointer-events-none absolute right-[6%] top-[38%] hidden -rotate-[12deg] text-[24px] leading-[1.6] tracking-[0.08em] lg:block`} style={{ color: TEAL }}>
                    {t.cta.hand.map((l) => <span key={l} className="block">{l}</span>)}
                </p>
                <Leaf className="pointer-events-none absolute -left-4 bottom-2 h-[180px] w-auto md:left-[4%] md:h-[220px]" />
                <Leaf flip className="pointer-events-none absolute -right-4 bottom-2 h-[180px] w-auto md:right-[4%] md:h-[220px]" />
                <div className="relative mx-auto max-w-3xl text-center">
                    <p className="inline-block border-b pb-1 text-[12px] tracking-[0.3em]" style={{ color: V4.sub, borderColor: "rgba(44,143,168,0.5)" }}>{t.cta.eyebrow}</p>
                    <h2 className={`${heavy.className} mt-6 text-[clamp(1.6rem,3.6vw,2.6rem)] leading-[1.3]`} style={{ color: NAVY }}>{t.cta.title}</h2>
                    <p className="mt-4 text-[15px] font-bold md:text-[16px]" style={{ color: NAVY }}>{t.cta.lead}</p>
                    <LineButton className="mt-7 w-full sm:w-auto sm:px-12">{t.cta.button}</LineButton>
                    <p className="mt-5 text-[14px] font-bold" style={{ color: NAVY }}>{t.cta.steps}</p>
                    <p className="mt-2 text-[12.5px]" style={{ color: V4.sub }}>{t.cta.note}</p>
                </div>
            </section>

            {/* ミニフッター */}
            <footer className="bg-white px-4 py-8 md:px-6">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
                    <Link href={withLang(lang, "/")} className="inline-flex min-h-11 items-center">
                        <Image src={logoDark} alt="NEXT VALLEY" width={150} height={25} className="h-6 w-auto" />
                    </Link>
                    <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-[12.5px]" style={{ color: V4.sub }}>
                        {t.footer.links.map((l) => (
                            <li key={l.href}><Link href={l.href === "/tokusho" || l.href === "/privacy" ? l.href : withLang(lang, l.href)} className="inline-flex min-h-11 items-center hover:underline">{l.name}</Link></li>
                        ))}
                    </ul>
                    <p className="text-[12px]" style={{ color: V4.sub }}>{t.footer.copyright}</p>
                </div>
            </footer>

            <StickyApply lang={lang} />
        </main>
    );
}
