import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Clock, Gift, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { serif } from "@/components/ui/SerifHeading";
import logo from "@/images/logo-new.png";
import fvbg from "@/images/fvbg.webp";
import sample1 from "@/images/works/works1.jpg";
import sample2 from "@/images/works/works12.jpg";
import sample3 from "@/images/works/works14.jpg";

/**
 * 無料プレビュー制作キャンペーン LP（/preview）
 * - ゴールは1つ: LINEで申し込む
 * - 毎月10社限定。残り枠は下の定数を書き換えるだけで更新できる
 */
const REMAINING_SLOTS = 10; // ← 今月の残り枠（毎月ここを更新）
const LINE_URL = "https://lin.ee/N4QXdJL#from=preview";

export const metadata: Metadata = {
    title: "無料プレビュー制作｜先にトップページのデザインをお見せします（毎月10社限定）",
    description:
        "ホームページをこれから作る方へ。契約前に、あなたの会社のトップページのデザインを無料でお作りしてお見せします。気に入らなければそこで終わり。費用はかかりません。毎月10社限定・3営業日以内。",
    alternates: { canonical: "https://www.nextvalley-jpn.com/preview" },
};

const steps = [
    { n: "01", t: "LINEで5つ答える", d: "業種・地域・伝えたい強み・好みの雰囲気・素材の有無。所要2分。写真やロゴがなくても大丈夫です。" },
    { n: "02", t: "3営業日でトップページ案が届く", d: "PC・スマホの2枚の画像でお届け。AIを活用した制作環境で、待たせません。" },
    { n: "03", t: "見てから決める", d: "気に入れば正式制作へ（公開まで担当）。気に入らなければ、そこで終わりで大丈夫です。営業はしません。" },
];

const forWho = [
    "これからホームページを作ろうとしている",
    "制作会社を比べているが、完成イメージが湧かず決められない",
    "「作る前に、実物を見て判断したい」と思っている",
];

const faqs = [
    { q: "本当に無料ですか？あとから請求されませんか？", a: "はい、プレビュー制作は無料です。あとから請求することはありません。費用がかかるのは、気に入って「公開まで進めたい」となった場合の正式制作だけです。" },
    { q: "作ったデザインのデータはもらえますか？", a: "プレビューはPC・スマホの画像でお渡しします。編集用データやコードは、正式制作をご依頼いただいた場合にお渡しします。" },
    { q: "断ったら営業されませんか？", a: "されません。「今回は見送ります」で終わりです。こちらから追いかけて連絡することもありません。" },
    { q: "写真もロゴもないのですが、大丈夫ですか？", a: "大丈夫です。業種と伝えたいことが分かれば、それに合った構成とデザインでお作りします。素材は正式制作の段階で一緒に準備します。" },
    { q: "なぜ無料でできるのですか？", a: "AIを活用した制作環境で、トップページ1枚を作るコストが大幅に下がったからです。その分を「先に実物を見てもらう」ことに使っています。契約前に判断材料を渡した方が、お互いに後悔がないと考えています。" },
];

export default function PreviewPage() {
    return (
        <main className="min-h-screen bg-base text-ink">
            {/* 最小ヘッダー（ナビなし・ゴールを1つに） */}
            <header className="fixed left-0 right-0 top-0 z-50 bg-navy-deep">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
                    <Link href="/" className="flex min-h-11 items-center">
                        <Image src={logo} alt="NEXT VALLEY" width={180} height={40} className="h-8 w-auto object-contain md:h-9" priority />
                    </Link>
                    <a
                        href={LINE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-[#05a247] px-5 text-[19px] font-bold text-white transition-opacity hover:opacity-90"
                    >
                        <MessageCircle className="h-4 w-4" aria-hidden />
                        LINEで申し込む
                    </a>
                </div>
            </header>

            {/* FV */}
            <section className="relative overflow-hidden bg-navy-deep pt-16 md:pt-20">
                <div
                    aria-hidden
                    className="absolute inset-y-0 right-0 w-full md:w-[62%]"
                    style={{ maskImage: "linear-gradient(to right, transparent 0%, black 35%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 35%)" }}
                >
                    <Image src={fvbg} alt="" fill priority className="object-cover object-center opacity-45 md:opacity-95" placeholder="blur" sizes="(max-width: 768px) 100vw, 62vw" />
                </div>
                <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
                    <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-coral/60 px-4 py-1.5 text-[12px] font-bold tracking-[0.2em] text-coral">
                        <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                        FREE PREVIEW ／ 毎月10社限定
                    </p>
                    <h1 className="max-w-3xl text-[clamp(1.875rem,5vw,4.25rem)] font-bold leading-[1.35] tracking-tight text-white">
                        先に見せます。
                        <br />
                        あなたのホームページの
                        <br className="md:hidden" />
                        トップページを、<span className="text-coral">無料で。</span>
                    </h1>
                    <p className="lead mt-8 max-w-[34em] text-base leading-[2] text-navy-sub md:text-lg">
                        契約の前に、あなたの会社のトップページのデザインをお作りしてお見せします。気に入らなければ、そこで終わりで<span className="nowrap">大丈夫です。</span>
                    </p>

                    <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-white">
                        {[["費用", "0円"], ["納期", "3営業日以内"], ["今月の残り枠", `${REMAINING_SLOTS}社`]].map(([k, v]) => (
                            <li key={k} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-coral" aria-hidden />
                                <span className="text-navy-sub">{k}</span> {v}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        <a
                            href={LINE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex h-16 items-center gap-3 rounded-full bg-[#05a247] px-10 text-[19px] font-bold text-white shadow-[0_12px_28px_rgba(5,162,71,0.35)] transition-all hover:-translate-y-0.5"
                        >
                            <MessageCircle className="h-6 w-6" aria-hidden />
                            LINEで無料プレビューを申し込む
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                        </a>
                        <p className="text-sm text-navy-sub">
                            LINEで「プレビュー希望」と送るだけ・<span className="nowrap">しつこい営業なし</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* こんな方へ */}
            <section className="bg-base px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-5xl">
                    <p className="text-[12px] font-bold tracking-[0.3em] text-coral-deep">FOR</p>
                    <h2 className="mt-2 text-2xl font-bold leading-snug text-ink md:text-3xl">こんな方のための<span className="nowrap">サービスです</span></h2>
                    <ul className="mt-8 grid gap-4 md:grid-cols-3">
                        {forWho.map((f) => (
                            <li key={f} className="flex items-start gap-3 rounded-2xl bg-white p-6 shadow-[0_16px_40px_rgba(31,26,20,0.06)]">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral/15">
                                    <Check className="h-3.5 w-3.5 text-coral-deep" aria-hidden />
                                </span>
                                <span className="text-[15px] font-bold leading-[1.8] text-ink">{f}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-sm leading-[1.9] text-ink-sub">
                        ※ 本気でホームページを作る予定の事業者様が対象です。デザインの参考資料としてのご利用はご遠慮ください。
                    </p>
                </div>
            </section>

            {/* 流れ */}
            <section className="bg-cream px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-5xl">
                    <p className="text-[12px] font-bold tracking-[0.3em] text-coral-deep">FLOW</p>
                    <h2 className="mt-2 text-2xl font-bold leading-snug text-ink md:text-3xl">申し込みから3ステップ</h2>
                    <ol className="mt-8 grid gap-5 md:grid-cols-3">
                        {steps.map((s) => (
                            <li key={s.n} className="rounded-2xl bg-white p-7 shadow-[0_16px_40px_rgba(31,26,20,0.06)]">
                                <p className="text-4xl font-bold leading-none text-coral" style={{ fontFamily: serif }}>{s.n}</p>
                                <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{s.t}</h3>
                                <p className="mt-3 text-sm leading-[2] text-ink-sub">{s.d}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* 制作例 */}
            <section className="bg-base px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-5xl">
                    <p className="text-[12px] font-bold tracking-[0.3em] text-coral-deep">SAMPLE</p>
                    <h2 className="mt-2 text-2xl font-bold leading-snug text-ink md:text-3xl">こんな品質でお届けします</h2>
                    <p className="mt-3 text-[15px] leading-[1.9] text-ink-sub">実際に制作したサイトの一部です。50社以上の制作・支援実績があります。</p>
                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {[
                            { img: sample1, name: "Tulip Ballet Studio様", label: "教室・スクール" },
                            { img: sample2, name: "BowlingNavi様", label: "情報メディア" },
                            { img: sample3, name: "久和不動産株式会社様", label: "不動産" },
                        ].map((w) => (
                            <div key={w.name} className="overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(31,26,20,0.06)]">
                                <div className="relative w-full bg-white" style={{ aspectRatio: "995 / 580" }}>
                                    <Image src={w.img} alt={`${w.name}のホームページ`} fill className="object-cover" placeholder="blur" sizes="(max-width: 768px) 100vw, 33vw" />
                                </div>
                                <div className="p-4">
                                    <p className="text-[11px] text-ink-sub">{w.label}</p>
                                    <p className="text-sm font-bold text-ink">{w.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-sm">
                        <Link href="/#works" className="inline-flex min-h-11 items-center font-bold text-coral-deep underline underline-offset-4">
                            すべての実績を見る →
                        </Link>
                    </p>
                </div>
            </section>

            {/* なぜ無料か ＋ 料金 */}
            <section className="bg-cream px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-white p-8 shadow-[0_16px_40px_rgba(31,26,20,0.06)]">
                        <Gift className="h-8 w-8 text-coral-deep" aria-hidden />
                        <h2 className="mt-4 text-xl font-bold leading-snug text-ink">なぜ、無料でできるのか</h2>
                        <p className="mt-3 text-[15px] leading-[2] text-ink-sub">
                            AIを活用した制作環境で、トップページ1枚を作るコストが大幅に下がりました。その分を「契約前に実物を見てもらう」ことに使っています。判断材料を先に渡した方が、お互いに後悔がないからです。
                        </p>
                    </div>
                    <div className="rounded-2xl bg-navy-deep p-8 text-white">
                        <ShieldCheck className="h-8 w-8 text-coral" aria-hidden />
                        <h2 className="mt-4 text-xl font-bold leading-snug">気に入ったら、正式制作へ</h2>
                        <p className="mt-3 text-[15px] leading-[2] text-navy-sub">
                            プレビューは無料。公開まで進める場合の目安は下記です（内容により変動・正式なお見積もりを先にお出しします）。
                        </p>
                        <ul className="mt-5 space-y-2 text-[15px]">
                            <li className="flex justify-between border-b border-navy-line pb-2"><span>LP制作</span><span className="font-bold">¥110,000〜</span></li>
                            <li className="flex justify-between border-b border-navy-line pb-2"><span>ホームページ制作</span><span className="font-bold">¥220,000〜</span></li>
                        </ul>
                        <p className="mt-4 text-xs text-navy-sub">プレビューで作ったデザインを、そのまま公開まで仕上げます。</p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-base px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <p className="text-[12px] font-bold tracking-[0.3em] text-coral-deep">FAQ</p>
                    <h2 className="mt-2 text-2xl font-bold leading-snug text-ink md:text-3xl">よくあるご質問</h2>
                    <div className="mt-8 rounded-2xl bg-white px-6 shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:px-10">
                        {faqs.map((f, i) => (
                            <details key={f.q} className={`group ${i > 0 ? "border-t border-line" : ""}`}>
                                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                                    <span className="text-base font-bold leading-snug text-ink">{f.q}</span>
                                    <span aria-hidden className="shrink-0 text-xl font-bold text-coral transition-transform group-open:rotate-45">＋</span>
                                </summary>
                                <p className="pb-6 text-[15px] leading-[2] text-ink-sub">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* 最終CTA */}
            <section className="bg-cream px-4 py-16 md:px-6 md:py-24">
                <div className="mx-auto max-w-4xl rounded-[28px] bg-white px-6 py-12 text-center shadow-[0_16px_40px_rgba(31,26,20,0.06)] md:px-16 md:py-16">
                    <p className="mb-4 inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.3em] text-coral-deep">
                        <Clock className="h-4 w-4" aria-hidden />
                        今月の残り枠：{REMAINING_SLOTS}社
                    </p>
                    <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.45] text-ink">
                        まずは、あなたのトップページを<br className="md:hidden" />見てみませんか。
                    </h2>
                    <p className="mx-auto mt-4 max-w-[30em] text-[15px] leading-[2] text-ink-sub">
                        LINEで「プレビュー希望」と送っていただければ、5つの質問をお送りします。答えるだけで申込完了です。
                    </p>
                    <a
                        href={LINE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex h-16 items-center justify-center gap-3 rounded-full bg-[#05a247] px-10 text-[19px] font-bold text-white shadow-[0_12px_28px_rgba(5,162,71,0.35)] transition-all hover:-translate-y-0.5"
                    >
                        <MessageCircle className="h-6 w-6" aria-hidden />
                        LINEで無料プレビューを申し込む
                    </a>
                    <p className="mt-5 text-xs text-ink-sub">費用0円・3営業日以内・断ってOK・しつこい営業なし</p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
