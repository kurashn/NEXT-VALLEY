import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Noto_Sans_JP, Instrument_Serif } from "next/font/google";
import {
    ArrowRight,
    Check,
    Monitor,
    Smartphone,
    Sparkles,
    Palette,
    Gift,
    ShieldCheck,
    X,
    Quote,
    Wallet,
    Eye,
    Hourglass,
    Lock,
    BadgeCheck,
    UserRoundCheck,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PreviewApply } from "./PreviewApply";
import { StickyApply } from "./StickyApply";
import logo from "@/images/logo-new.png";
import shun from "@/images/shun-new.webp";
import fvPhoto from "@/images/preview-fv-laptop.webp"; // Unsplash（商用利用可）: 机の上のノートPC（人物なし）
import "./preview.css";

/**
 * 無料プレビュー制作キャンペーン LP（/preview）
 * - ゴールは1つ: LINEで申し込む
 * - 毎月10社限定。残り枠は下の定数を書き換えるだけで全箇所に反映される
 */
const REMAINING_SLOTS = 5; // ← 今月の残り枠（毎月ここを更新）
const TOTAL_SLOTS = 10;

/* LP専用の書体（本体サイトには影響しない） */
const lpSans = Noto_Sans_JP({ variable: "--lp-font-sans", subsets: ["latin"], weight: ["400", "500", "700", "900"], display: "swap", preload: false });
const lpSerif = Instrument_Serif({ variable: "--lp-font-serif", subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
    title: "無料プレビュー制作｜契約前に、あなたのトップページ案をお作りします（毎月10社限定）",
    description:
        "ホームページをこれから作る方へ。契約の前に、あなたのお店・教室・会社のトップページのデザイン案（PC・スマホ）を無料でお作りします。個人事業主の方も対象。5つの質問に答えるだけ、3営業日以内にお届け。気に入らなければそこで終わり。費用も営業もありません。毎月10社限定。",
    alternates: { canonical: "https://www.nextvalley-jpn.com/preview" },
    openGraph: {
        title: "先に、見せます。契約前に、あなたのトップページ案を無料で。｜NEXT VALLEY",
        description: "5つの質問に答えるだけ。3営業日以内にPC・スマホのデザイン案が届きます。費用0円・契約不要・毎月10社限定。",
        url: "https://www.nextvalley-jpn.com/preview",
        siteName: "NEXT VALLEY",
        locale: "ja_JP",
        type: "website",
        images: [{ url: "/og-preview.png", width: 1200, height: 630, alt: "先に、見せます。あなたのトップページを、無料で。" }],
    },
    twitter: { card: "summary_large_image", title: "先に、見せます。契約前に、あなたのトップページ案を無料で。｜NEXT VALLEY", images: ["/og-preview.png"] },
};

/* ───────────────────────── コピー・データ ───────────────────────── */

const heroChips = [
    { k: "費用", v: "0円" },
    { k: "納期", v: "3営業日以内" },
    { k: "契約", v: "不要" },
];

const stats = [
    { v: "50", unit: "社以上", k: "制作・支援実績" },
    { v: "2021", unit: "年〜", k: "事業開始" },
    { v: "3", unit: "営業日以内", k: "プレビューのお届け" },
    { v: "0", unit: "円", k: "プレビュー費用" },
];

const fears = [
    {
        icon: Wallet,
        t: <>払ってから、<span className="nowrap">がっかりする</span></>,
        d: "数十万円を払い、数週間待って、完成して初めてデザインを見る。イメージと違っても、作り直しは追加費用。いちばん多い後悔です。",
    },
    {
        icon: Eye,
        t: <>実績は「他社の話」で<span className="nowrap">しかない</span></>,
        d: "制作会社の実績がきれいでも、それは他社のサイト。「うちのお店・教室・会社なら、どんな見た目になるのか」は、頼むまで分かりません。",
    },
    {
        icon: Hourglass,
        t: <>比較しているうちに、<span className="nowrap">時間が溶ける</span></>,
        d: "何社にも問い合わせ、打ち合わせを重ね、見積もりを見比べる。本業の時間が削られ、結局「まだ決められない」まま数ヶ月。",
    },
];

const usualFlow = [
    "制作会社を何社も比較する",
    "見積もりと他社の実績で契約を決める",
    "打ち合わせを重ねて、数週間待つ",
    "完成して、初めてデザインを見る",
    "「イメージと違う…」でも、もう戻れない",
];

const ourFlow = [
    "このページで5つの質問に答え、LINEで送る（所要2分）",
    "3営業日以内に、あなたのトップページ案が届く",
    "実物を見てから、頼むかどうかを決める",
];

const deliverables = [
    { icon: Monitor, t: "PC版トップページ", d: "実際のブラウザで見た状態の画像。構成・写真の置き方・文字の大きさまで、そのまま確認できます。" },
    { icon: Smartphone, t: "スマホ版トップページ", d: "来訪者の多くはスマホ。指で触る前提のレイアウトを、別途つくって同時にお渡しします。" },
    { icon: Sparkles, t: <>業種と強みに<span className="nowrap">合わせた構成</span></>, d: "テンプレートの色替えではありません。「誰に・何を・どう伝えるか」から、あなたのお店・教室・会社に合わせて組み立てます。" },
    { icon: Palette, t: "希望の雰囲気を反映", d: "「上品に」「元気に」「信頼感を」。ひと言の希望から、色・書体・余白のトーンを決めます。" },
];

const voices = [
    {
        name: "Tulip Ballet Studio様",
        label: "バレエ教室",
        text: "非常に丁寧に、かつ、希望どおり作成していただきました！ウェブ関係はまったくわからず、毎回質問したりしていましたが、いつも丁寧に優しく答えてくださいました。想像以上の素敵なホームページを作成していただきました。",
    },
    {
        name: "Rythmique Garden様",
        label: "リトミック教室",
        text: "初めてのホームページ作成で、何も分からずほぼ全てお任せだったのですが、一つ一つ、丁寧に教えてくださいました。また、様々な提案もしてくださり、依頼して本当に良かったと実感しております。",
    },
];

const steps = [
    { n: "01", t: <>このページで5つの質問に答え、<span className="nowrap">LINEで送る</span></>, d: "業種・地域・伝えたい強み・好みの雰囲気・素材の有無の5つと、事業が分かるもの（店舗名・SNS・Googleマップ・既存サイトのいずれか）。答えた内容がそのままメッセージになるので、LINEに貼り付けて送るだけ。所要2分。写真やロゴがなくても大丈夫です。" },
    { n: "02", t: "確認のうえ、3営業日以内にトップページ案が届く", d: "事業の実態と、ご希望の内容を確認してから制作に入ります（条件に合わない場合は、その旨をお伝えします）。PC・スマホの2枚の画像でお届け。" },
    { n: "03", t: "見てから、決める", d: "気に入れば正式制作へ（公開まで担当）。気に入らなければ、そこで終わりで大丈夫です。こちらから追いかける連絡はしません。" },
];


const compareRows: { k: string; a: string; b: string; c: React.ReactNode }[] = [
    { k: "契約前にデザインを見られる", a: "△ ラフ案や口頭説明が中心", b: "× テンプレートから選ぶ", c: <>◎ 実物のトップページ案<span className="nowrap">（PC・スマホ）</span></> },
    { k: "費用が発生するタイミング", a: "契約時（着手金など）", b: "申込時", c: <>正式に依頼すると<span className="nowrap">決めたとき</span></> },
    { k: "デザイン案が届くまで", a: "契約後、数週間", b: "―", c: "3営業日以内" },
    { k: "断ったあと", a: "契約後の解約は難しい", b: "返金不可の場合も", c: "そこで終わり・営業なし" },
    { k: "作るのは", a: "会社による", b: "自分で組む", c: "正式制作と同じ担当" },
];

const promises = [
    { t: "プレビューは完全無料", d: "あとから請求することはありません。費用が発生するのは、気に入って正式制作に進む場合だけです。" },
    { t: "断っても、追いかけません", d: "「今回は見送ります」で終わり。電話営業も、こちらからの催促もしません。" },
    { t: "契約書も、口約束もなし", d: "プレビューの段階で、何かを約束していただくことはありません。見て、判断するだけです。" },
];

const forWho = [
    "実際に事業をしていて（または開業が決まっていて）、これからホームページを作る",
    "制作会社を比べているが、完成イメージが湧かず決められない",
    "「作る前に、実物を見て判断したい」と思っている",
    "気に入れば、正式制作を前向きに検討できる",
];

const notForWho = [
    "同業の方（Web制作会社・デザイナー・フリーランスの方）",
    "デザインの参考資料や相見積もりの材料だけが欲しい方",
    "ホームページを作る予定・予算が、まだない方",
    "事業の実態が確認できない方",
];

const conditions = [
    { icon: BadgeCheck, t: "事業の実態が確認できること", d: "店舗名・SNS・Googleマップ・既存サイト・開業届など、いずれかで事業が分かる方。" },
    { icon: UserRoundCheck, t: "決められる方ご本人であること", d: "代表者・オーナー・担当責任者など、ホームページについて判断できる方。" },
    { icon: Lock, t: "本気で作る予定があること", d: "気に入れば正式制作を検討できる方。参考目的・同業の方はお断りしています。" },
];

const faqs = [
    { q: "本当に無料ですか？あとから請求されませんか？", a: "はい、プレビュー制作は無料です。あとから請求することはありません。費用がかかるのは、気に入って「公開まで進めたい」となった場合の正式制作だけです。" },
    { q: "断ったら営業されませんか？", a: "されません。「今回は見送ります」で終わりです。こちらから追いかけて連絡することもありません。" },
    { q: "作ったデザインのデータはもらえますか？", a: "プレビューはPC・スマホの画像でお渡しします。編集用データやコードは、正式制作をご依頼いただいた場合にお渡しします。" },
    { q: "写真もロゴもないのですが、大丈夫ですか？", a: "大丈夫です。業種と伝えたいことが分かれば、それに合った構成とデザインでお作りします。素材は正式制作の段階で一緒に準備します。" },
    { q: "「確認」では、何を見るのですか？", a: "実際に事業をされているか（店舗名・SNS・Googleマップ・既存サイトなど）と、ホームページを作る予定が本当にあるか、の2点です。審査のような堅いものではなく、LINEでのやり取りの中で確認します。" },
    { q: "個人事業主・開業前でも申し込めますか？", a: "はい。個人事業主の方も、開業が決まっている方も対象です。屋号や開業予定日、SNSなど、事業が分かるものを教えてください。" },
    { q: "同業ですが、参考に申し込めますか？", a: "申し訳ありませんが、同業（Web制作・デザイン）の方や、参考資料が目的の方はお断りしています。本気でホームページを作る事業者様のための枠です。" },
    { q: "プレビューを見てから、修正の希望は言えますか？", a: "はい。プレビューの段階でも、気になる点は1回まで無料で調整します。正式制作に進む場合は、そのプレビューをたたき台にして、色・写真・文章などをご希望に合わせて仕上げていきます。" },
    { q: "なぜ無料でできるのですか？", a: "AIを活用した制作環境で、トップページ1枚を作るコストが大幅に下がったからです。その分を「先に実物を見てもらう」ことに使っています。契約前に判断材料を渡した方が、お互いに後悔がないと考えています。" },
];

/* ───────────────────────── 部品 ───────────────────────── */

function LineButton({ className = "" }: { className?: string }) {
    return (
        <a
            href="#apply"
            className={`lp-cta group inline-flex h-16 w-full max-w-md items-center justify-center gap-3 rounded-full bg-coral-deep px-6 text-[17px] font-bold text-white shadow-cta transition-all duration-300 hover:-translate-y-0.5 sm:w-auto sm:max-w-none sm:px-9 ${className}`}
        >
            <span className="whitespace-nowrap">無料プレビューを申し込む</span>
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
        </a>
    );
}

function CtaBlock({ message, dark = false }: { message: React.ReactNode; dark?: boolean }) {
    return (
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <p className={`text-[15px] font-bold leading-[1.9] ${dark ? "text-white" : "text-ink"}`}>{message}</p>
            <LineButton />
            <p className={`text-xs ${dark ? "text-navy-sub" : "text-ink-sub"}`}>
                5つの質問に答えて、LINEで送るだけ（所要2分）・費用0円・<span className="nowrap">断ってOK</span>
            </p>
        </div>
    );
}

function SectionHead({ label, jp, lead, dark = false, align = "left" }: { label: string; jp: React.ReactNode; lead?: React.ReactNode; dark?: boolean; align?: "left" | "center" }) {
    return (
        <div className={`mb-10 md:mb-14 ${align === "center" ? "text-center" : ""}`}>
            <p className={`inline-flex items-center gap-2.5 text-[12px] font-bold tracking-[0.25em] ${dark ? "text-coral" : "text-coral-deep"}`}>
                <span aria-hidden className="block h-px w-6 bg-current" />
                {label}
            </p>
            <h2 className={`mt-4 text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold leading-[1.4] tracking-tight ${dark ? "text-white" : "text-ink"}`}>{jp}</h2>
            {lead && <p className={`lead mt-4 max-w-[38em] text-[15px] leading-[2] ${align === "center" ? "mx-auto" : ""} ${dark ? "text-navy-sub" : "text-ink-sub"}`}>{lead}</p>}
        </div>
    );
}

function SlotsMeter({ dark = true }: { dark?: boolean }) {
    return (
        <div className={`inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-full border px-4 py-2 ${dark ? "border-white/15 bg-white/[0.04]" : "border-line bg-white"}`}>
            <span className="relative flex h-2.5 w-2.5">
                <span className="lp-pulse absolute inline-flex h-full w-full rounded-full bg-coral" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
            </span>
            <span className={`text-sm font-bold ${dark ? "text-white" : "text-ink"}`}>
                今月の残り枠 <span className="lp-serif text-2xl leading-none text-coral">{REMAINING_SLOTS}</span>
                <span className={dark ? "text-navy-sub" : "text-ink-sub"}> / {TOTAL_SLOTS}社</span>
            </span>
            <span className="flex gap-1" aria-hidden>
                {Array.from({ length: TOTAL_SLOTS }).map((_, i) => (
                    <span key={i} className={`h-1.5 w-3 rounded-full ${i < REMAINING_SLOTS ? "bg-coral" : dark ? "bg-white/15" : "bg-line"}`} />
                ))}
            </span>
        </div>
    );
}

/* ───────────────────────── ページ ───────────────────────── */

export default function PreviewPage() {
    return (
        <main className={`lp-root ${lpSans.variable} ${lpSerif.variable} min-h-screen bg-base text-ink`}>
            {/* ヘッダー（ナビなし・ゴールを1つに） */}
            <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-navy-deep/85 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">
                    <Link href="/" className="flex min-h-11 items-center">
                        <Image src={logo} alt="NEXT VALLEY" width={180} height={40} className="h-8 w-auto object-contain md:h-9" priority />
                    </Link>
                    <div className="flex items-center gap-4">
                        <p className="hidden items-center gap-2 rounded-full bg-navy-deep px-3 py-1.5 text-sm font-bold text-white md:inline-flex">
                            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                            毎月10社限定・今月あと{REMAINING_SLOTS}社
                        </p>
                        <a
                            href="#apply"
                            className="inline-flex h-11 items-center gap-2 rounded-full bg-coral-deep px-5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                        >
                            <span className="whitespace-nowrap">無料で申し込む</span>
                            <ArrowRight className="h-4 w-4" aria-hidden />
                        </a>
                    </div>
                </div>
            </header>

            {/* ── FV（写真なし・オーロラ＋グリッド） ── */}
            <section className="lp-aurora relative overflow-hidden bg-navy-deep pt-16 md:pt-20">
                {/* FV写真（トップとは別。右側に淡く敷いて左へフェード） */}
                <div
                    aria-hidden
                    className="absolute inset-y-0 right-0 w-full md:w-[70%]"
                    style={{ maskImage: "linear-gradient(to right, transparent 0%, black 55%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 55%)" }}
                >
                    <Image src={fvPhoto} alt="" fill priority className="object-cover object-[70%_center] opacity-30 md:opacity-40" sizes="(max-width: 768px) 100vw, 70vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-navy-deep/30" />
                </div>
                <div aria-hidden className="lp-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
                <div aria-hidden className="lp-vignette pointer-events-none absolute inset-0" />

                <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] max-w-7xl items-center px-4 pb-24 pt-14 md:px-6 md:pb-32 md:pt-20">
                    <div className="min-w-0 max-w-3xl">
                        <FadeIn>
                            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-coral/60 bg-coral/10 px-4 py-2 text-[12px] font-bold tracking-[0.2em] text-coral">
                                <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                                <span className="hidden sm:inline">無料プレビュー制作キャンペーン</span><span className="sm:hidden">無料プレビュー制作</span> ／ 毎月10社限定
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.08}>
                            <h1 className="text-white">
                                <span className="block text-[clamp(2.75rem,7.2vw,6rem)] font-black leading-[1.1] tracking-[-0.03em]">先に、見せます。</span>
                                <span className="mt-5 block text-[clamp(1.25rem,2.6vw,2.125rem)] font-bold leading-[1.5] tracking-tight">
                                    契約の前に、あなたのお店・教室・会社の<br />
                                    トップページ案を<span className="text-coral">無料で</span>お作りします。
                                </span>
                            </h1>
                        </FadeIn>
                        <FadeIn delay={0.16}>
                            <p className="lead mt-8 max-w-[34em] text-base leading-[2] text-navy-sub md:text-lg">
                                5つの質問に答えるだけ。3営業日以内に、PC・スマホ2枚のデザイン案が<span className="nowrap">届きます。</span>気に入らなければ、そこで終わり。費用も、営業も<span className="nowrap">ありません。</span>
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.22}>
                            <ul className="mt-8 flex flex-wrap gap-2.5">
                                {heroChips.map(({ k, v }) => (
                                    <li key={k} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] py-2 pl-3 pr-4 text-sm text-white backdrop-blur-sm">
                                        <Check className="h-4 w-4 text-coral" aria-hidden />
                                        <span className="text-navy-sub">{k}</span>
                                        <span className="font-bold">{v}</span>
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <div className="mt-10 flex flex-col items-stretch gap-5 sm:items-start">
                                <LineButton />
                                <p className="text-sm text-navy-sub">
                                    5つの質問に答えて、LINEで送るだけ・所要2分・<span className="nowrap">しつこい営業なし</span>
                                    <br />
                                    ※ 事業者様限定。本気でホームページを作る方のための枠です（簡単な確認あり）
                                </p>
                                <SlotsMeter />
                            </div>
                        </FadeIn>
                    </div>

                </div>

                <div aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
                    <span className="text-[10px] font-bold tracking-[0.35em] text-white/50">SCROLL</span>
                    <span className="lp-cue relative block h-10 w-px overflow-hidden text-coral/80" />
                </div>
            </section>

            {/* ── 数字の帯（信頼） ── */}
            <section className="border-b border-line bg-white" aria-label="実績の数字">
                <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
                    {stats.map((s) => (
                        <div key={s.k} className="flex flex-col items-center px-4 py-6 text-center md:py-7">
                            <dd className="text-ink">
                                <span className="lp-serif text-[2.75rem] leading-none text-navy">{s.v}</span>
                                <span className="ml-1 text-sm font-bold">{s.unit}</span>
                            </dd>
                            <dt className="mt-1 text-[12px] tracking-[0.1em] text-ink-sub">{s.k}</dt>
                        </div>
                    ))}
                </dl>
            </section>

            {/* ── 共感: いちばん怖いこと ── */}
            <section className="bg-base px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead
                            label="よくある不安"
                            jp={<>ホームページ制作で、<span className="nowrap">いちばん怖いこと。</span></>}
                            lead="ホームページは「完成するまで、どんな見た目になるか分からない」買い物でした。だから、こんな不安がついて回ります。"
                        />
                    </FadeIn>
                    <div className="grid gap-5 md:grid-cols-3">
                        {fears.map((f, i) => (
                            <FadeIn key={i} delay={i * 0.08}>
                                <div className="h-full rounded-[20px] border border-line/70 bg-white p-7 shadow-card md:p-8">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-coral-deep">
                                        <f.icon className="h-6 w-6" aria-hidden />
                                    </span>
                                    <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{f.t}</h3>
                                    <p className="mt-3 text-sm leading-[2] text-ink-sub">{f.d}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                    <FadeIn>
                        <p className="mt-10 text-center text-[clamp(1.125rem,2vw,1.5rem)] font-bold leading-[1.7] text-ink">
                            この3つは、「先に実物を見る」だけで<span className="nowrap">全部なくなります。</span>
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* ── 解決: 順番を変えた ── */}
            <section className="bg-white px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead
                            label="私たちの答え"
                            jp={<>だから、順番を変えました。<br className="md:hidden" /><span className="lp-marker">「見てから、決める。」</span></>}
                            lead="契約してから見るのではなく、見てから契約するかどうかを決める。それだけで、ホームページ制作の失敗はほとんど防げます。"
                        />
                    </FadeIn>
                    <div className="grid gap-6 md:grid-cols-2">
                        <FadeIn>
                            <div className="h-full rounded-[20px] border border-line bg-white p-7 md:p-9">
                                <p className="text-[12px] font-bold tracking-[0.25em] text-ink-sub">一般的な流れ</p>
                                <ol className="mt-5 space-y-3">
                                    {usualFlow.map((t, i) => (
                                        <li key={t} className="flex items-start gap-3 text-[15px] leading-[1.8] text-ink-sub">
                                            <span className="lp-serif mt-0.5 w-6 shrink-0 text-lg leading-none text-ink-sub">{i + 1}</span>
                                            <span className={i === usualFlow.length - 1 ? "lp-strike font-bold text-ink" : ""}>{t}</span>
                                        </li>
                                    ))}
                                </ol>
                                <p className="mt-6 flex items-center gap-2 text-sm font-bold text-ink">
                                    <X className="h-4 w-4 text-coral-deep" aria-hidden />
                                    見るのは、お金を払った後。
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <div className="relative h-full overflow-hidden rounded-[20px] bg-navy-deep p-7 text-white shadow-[0_30px_60px_rgba(4,22,39,0.35)] md:p-9">
                                <span aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-coral/20 blur-3xl" />
                                <p className="text-[12px] font-bold tracking-[0.25em] text-coral">NEXT VALLEY の流れ</p>
                                <ol className="mt-5 space-y-3">
                                    {ourFlow.map((t, i) => (
                                        <li key={t} className="flex items-start gap-3 text-[15px] font-bold leading-[1.8]">
                                            <span className="lp-serif mt-0.5 w-6 shrink-0 text-lg leading-none text-coral">{i + 1}</span>
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ol>
                                <p className="mt-6 flex items-center gap-2 text-sm font-bold">
                                    <Check className="h-4 w-4 text-coral" aria-hidden />
                                    見るのは、決める前。費用は0円。
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── お届けするもの ── */}
            <section className="bg-base px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead
                            label="お届けするもの"
                            jp={<>プレビューで、<span className="nowrap">お届けするもの。</span></>}
                            lead="「ラフなイメージ図」ではありません。気に入れば、そのまま公開まで仕上げられる実物のトップページ案です。気になる点は、プレビューの段階でも1回まで無料で調整します。"
                        />
                    </FadeIn>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {deliverables.map((d, i) => (
                            <FadeIn key={i} delay={i * 0.06}>
                                <div className="group h-full rounded-[20px] border border-line/70 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-deep text-coral transition-transform duration-300 group-hover:scale-105">
                                        <d.icon className="h-6 w-6" aria-hidden />
                                    </span>
                                    <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{d.t}</h3>
                                    <p className="mt-3 text-sm leading-[2] text-ink-sub">{d.d}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                    <FadeIn>
                        <CtaBlock message={<>あなたのお店・教室・会社なら、どんなトップページになるか。<br className="md:hidden" />まず、それを見て<span className="nowrap">ください。</span></>} />
                    </FadeIn>
                </div>
            </section>

            {/* ── 比較: 一般的な選択肢と何が違うか ── */}
            <section className="bg-white px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead
                            label="ほかとの違い"
                            jp={<>ほかの選択肢と、<span className="nowrap">何が違うのか。</span></>}
                            lead="一般的な例との比較です（会社やサービスにより異なります）。違いは1つ、「見る」と「払う」の順番です。"
                        />
                    </FadeIn>
                    {/* モバイル: 行ごとのカード */}
                    <div className="space-y-4 md:hidden">
                        {compareRows.map((r, i) => (
                            <FadeIn key={r.k} delay={i * 0.04}>
                                <div className="rounded-[20px] border border-line/70 bg-white p-5 shadow-card">
                                    <p className="text-[15px] font-bold text-ink">{r.k}</p>
                                    <dl className="mt-3 space-y-2 text-[13px]">
                                        <div className="flex gap-3"><dt className="w-[8.5em] shrink-0 text-ink-sub">一般的な制作会社</dt><dd className="text-ink-sub">{r.a}</dd></div>
                                        <div className="flex gap-3"><dt className="w-[8.5em] shrink-0 text-ink-sub">格安テンプレート</dt><dd className="text-ink-sub">{r.b}</dd></div>
                                        <div className="flex gap-3 rounded-xl bg-coral/[0.08] px-3 py-2"><dt className="w-[8.5em] shrink-0 font-bold text-coral-deep">NEXT VALLEY</dt><dd className="font-bold text-ink">{r.c}</dd></div>
                                    </dl>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                    <FadeIn className="hidden md:block">
                        <div className="overflow-x-auto rounded-[20px] border border-line/70 bg-white shadow-card">
                            <table className="lp-table w-full min-w-[820px] text-left text-[14px]">
                                <thead>
                                    <tr className="bg-navy-deep text-white">
                                        <th className="w-[26%] rounded-tl-[20px] text-[12px] font-bold tracking-[0.15em] text-navy-sub">比較項目</th>
                                        <th className="w-[24%] font-bold">一般的な制作会社</th>
                                        <th className="w-[22%] font-bold">格安テンプレート</th>
                                        <th className="w-[28%] whitespace-nowrap rounded-tr-[20px] bg-coral-deep font-bold">NEXT VALLEY 無料プレビュー</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {compareRows.map((r) => (
                                        <tr key={r.k}>
                                            <th className="whitespace-nowrap font-bold text-ink">{r.k}</th>
                                            <td className="whitespace-nowrap text-ink-sub">{r.a}</td>
                                            <td className="whitespace-nowrap text-ink-sub">{r.b}</td>
                                            <td className="whitespace-nowrap bg-coral/[0.07] font-bold text-ink">{r.c}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── お客様の声 ── */}
            <section className="bg-base px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead label="お客様の声" jp="実際にご依頼いただいた方の声。" lead="プレビューも、正式制作も、同じ担当が同じ姿勢で作ります。" />
                    </FadeIn>
                    <div className="grid gap-5 md:grid-cols-2">
                        {voices.map((v, i) => (
                            <FadeIn key={v.name} delay={i * 0.08}>
                                <figure className="h-full rounded-[20px] border border-line/70 bg-white p-7 shadow-card md:p-8">
                                    <Quote className="h-6 w-6 text-coral" aria-hidden />
                                    <blockquote className="mt-4 text-[15px] leading-[2] text-ink">{v.text}</blockquote>
                                    <figcaption className="mt-5 text-sm">
                                        <span className="font-bold text-ink">{v.name}</span>
                                        <span className="ml-2 text-ink-sub">{v.label}</span>
                                    </figcaption>
                                </figure>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 流れ ── */}
            <section id="flow" className="bg-white px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead label="申し込みの流れ" jp="申し込みから、3ステップ。" lead="必要なのはこのページとLINEだけ。電話も、打ち合わせの日程調整もありません。" />
                    </FadeIn>
                    <div className="grid items-start gap-10 lg:grid-cols-12">
                        <ol className="space-y-4 lg:col-span-7">
                            {steps.map((s, i) => (
                                <FadeIn key={s.n} delay={i * 0.08}>
                                    <li className="flex gap-6 rounded-[20px] border border-line/70 bg-white p-7 shadow-card md:p-8">
                                        <div className="shrink-0 text-center">
                                            <p className="lp-serif text-5xl leading-none text-coral">{s.n}</p>
                                            <p className="mt-2 text-[10px] font-bold tracking-[0.3em] text-coral-deep">STEP</p>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold leading-snug text-ink md:text-xl">{s.t}</h3>
                                            <p className="mt-2 text-sm leading-[2] text-ink-sub">{s.d}</p>
                                        </div>
                                    </li>
                                </FadeIn>
                            ))}
                        </ol>
                        <FadeIn delay={0.15} className="lg:col-span-5">
                            <div className="mx-auto max-w-[380px] overflow-hidden rounded-[28px] border border-line bg-[#8cabd9] shadow-card-hover" aria-hidden>
                                <div className="flex items-center gap-2 bg-[#2c3e50] px-4 py-3 text-white">
                                    <span className="h-7 w-7 rounded-full bg-white/20" />
                                    <span className="text-sm font-bold">NEXT VALLEY</span>
                                </div>
                                <div className="space-y-3 p-4 text-[13px] leading-[1.7]">
                                    <div className="flex justify-end">
                                        <p className="max-w-[86%] whitespace-pre-line rounded-2xl rounded-tr-sm bg-[#8de055] px-3.5 py-2 text-ink">{"【無料プレビュー希望】\n1. 業種・屋号：整体・治療院／〇〇整骨院\n2. 地域：大阪市 北区\n3. 強み：産後の骨盤ケアが得意\n4. 雰囲気：親しみやすい・やさしい\n5. 写真・ロゴ：写真あり・ロゴなし\n6. 事業が分かるもの：Googleマップ「〇〇整骨院」"}</p>
                                    </div>
                                    <div className="flex justify-start">
                                        <p className="max-w-[86%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-ink">
                                            ありがとうございます、確認できました。<span className="font-bold">3営業日以内</span>にトップページ案（PC・スマホ）をお送りします。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                    <FadeIn>
                        <CtaBlock message={<>質問は5つ。答えた内容が、そのまま申込メッセージに<span className="nowrap">なります。</span></>} />
                    </FadeIn>
                </div>
            </section>

            {/* ── なぜ無料か ＋ その先の料金 ── */}
            <section className="bg-base px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead label="無料の理由と料金" jp="なぜ無料か。そして、その先の料金。" lead="タネも仕掛けもありません。先に全部お伝えしておきます。" />
                    </FadeIn>
                    <div className="grid gap-6 md:grid-cols-2">
                        <FadeIn>
                            <div className="h-full rounded-[20px] border border-line/70 bg-white p-8 shadow-card md:p-10">
                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-coral-deep">
                                    <Gift className="h-6 w-6" aria-hidden />
                                </span>
                                <h3 className="mt-5 text-xl font-bold leading-snug text-ink md:text-2xl">なぜ、無料でできるのか</h3>
                                <p className="mt-4 text-[15px] leading-[2] text-ink-sub">
                                    AIを活用した制作環境で、トップページ1枚を作るコストが大幅に下がりました。その分を「契約前に実物を見てもらう」ことに使っています。判断材料を先に渡した方が、お互いに後悔がない<span className="nowrap">からです。</span>
                                </p>
                                <p className="mt-4 text-[15px] leading-[2] text-ink-sub">
                                    見て、気に入った方だけが正式制作に進む。私たちにとっても、ミスマッチのない仕事だけを引き受けられる、いちばん健全な<span className="nowrap">やり方です。</span>
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <div className="relative h-full overflow-hidden rounded-[20px] bg-navy-deep p-8 text-white md:p-10">
                                <span aria-hidden className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-coral/15 blur-3xl" />
                                <p className="text-[12px] font-bold tracking-[0.25em] text-coral">気に入ったら、正式制作へ</p>
                                <h3 className="mt-3 text-xl font-bold leading-snug md:text-2xl">プレビューのデザインを、<span className="nowrap">そのまま公開まで。</span></h3>
                                <p className="mt-4 text-[15px] leading-[2] text-navy-sub">
                                    公開まで進める場合の目安です。内容により変動しますが、正式なお見積もりを先にお出しし、追加費用が出る場合は必ず事前に<span className="nowrap">お伝えします。</span>
                                </p>
                                <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                                    {[["LP制作", "¥110,000〜"], ["ホームページ制作", "¥220,000〜"]].map(([k, v]) => (
                                        <li key={k} className="flex items-center justify-between py-3.5">
                                            <span className="text-[15px]">{k}</span>
                                            <span className="text-lg font-bold"><span className="lp-serif text-2xl leading-none">{v.replace("〜", "")}</span>〜</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-4 text-xs text-navy-sub">税込目安。公開後の運用・集客のご相談も承ります。</p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── 3つの約束（リスクの撤去） ── */}
            <section className="bg-white px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead label="3つの約束" jp={<>安心して申し込めるように、<span className="nowrap">3つ約束します。</span></>} />
                    </FadeIn>
                    <div className="grid gap-5 md:grid-cols-3">
                        {promises.map((p, i) => (
                            <FadeIn key={p.t} delay={i * 0.08}>
                                <div className="h-full rounded-[20px] border border-line/70 border-t-4 border-t-coral bg-white p-7 shadow-card md:p-8">
                                    <p className="lp-serif text-4xl leading-none text-coral">0{i + 1}</p>
                                    <h3 className="mt-4 flex items-center gap-2 text-lg font-bold leading-snug text-ink">
                                        <ShieldCheck className="h-5 w-5 shrink-0 text-coral-deep" aria-hidden />
                                        {p.t}
                                    </h3>
                                    <p className="mt-3 text-sm leading-[2] text-ink-sub">{p.d}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 対象／対象外 ＋ 10社の理由 ── */}
            <section className="bg-base px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <FadeIn>
                        <SectionHead
                            label="対象となる方"
                            jp={<>本気でホームページを作る、<span className="nowrap">事業者様のための枠です。</span></>}
                            lead="誰でも申し込めるキャンペーンではありません。実際に事業をされていて、本当にホームページを作りたい方のために、毎月10社分の制作時間を確保しています。お申し込み後、簡単な確認をさせていただき、条件に合わない場合はお断りすることがあります。"
                        />
                    </FadeIn>
                    <div className="mb-6 grid gap-5 md:grid-cols-3">
                        {conditions.map((c, i) => (
                            <FadeIn key={c.t} delay={i * 0.06}>
                                <div className="flex h-full gap-4 rounded-[20px] border border-line/70 bg-white p-6 shadow-card">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy-deep text-coral">
                                        <c.icon className="h-5 w-5" aria-hidden />
                                    </span>
                                    <div>
                                        <p className="text-[11px] font-bold tracking-[0.25em] text-coral-deep">条件 {i + 1}</p>
                                        <h3 className="mt-1 text-[15px] font-bold leading-snug text-ink">{c.t}</h3>
                                        <p className="mt-2 text-[13px] leading-[1.9] text-ink-sub">{c.d}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                    <div className="grid gap-6 lg:grid-cols-12">
                        <FadeIn className="lg:col-span-7">
                            <div className="grid h-full gap-6 rounded-[20px] border border-line/70 bg-white p-7 shadow-card sm:grid-cols-2 md:p-9">
                                <div>
                                    <p className="text-[12px] font-bold tracking-[0.25em] text-coral-deep">対象の方</p>
                                    <ul className="mt-4 space-y-3">
                                        {forWho.map((t) => (
                                            <li key={t} className="flex items-start gap-2.5 text-[15px] font-bold leading-[1.8] text-ink">
                                                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral/15">
                                                    <Check className="h-3 w-3 text-coral-deep" aria-hidden />
                                                </span>
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-[12px] font-bold tracking-[0.25em] text-ink-sub">対象外の方</p>
                                    <ul className="mt-4 space-y-3">
                                        {notForWho.map((t) => (
                                            <li key={t} className="flex items-start gap-2.5 text-[15px] leading-[1.8] text-ink-sub">
                                                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-line">
                                                    <X className="h-3 w-3 text-ink-sub" aria-hidden />
                                                </span>
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-5 text-xs leading-[1.9] text-ink-sub">※ 上記に当てはまる場合は、確認の段階でお断りすることがあります。本気で作る方の枠を守るためです。ご理解ください。</p>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.1} className="lg:col-span-5">
                            <div className="relative h-full overflow-hidden rounded-[20px] border border-line/70 bg-white p-7 shadow-card md:p-9">
                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-coral-deep">
                                    <Lock className="h-6 w-6" aria-hidden />
                                </span>
                                <h3 className="mt-5 text-xl font-bold leading-snug text-ink">なぜ、毎月10社までなのか</h3>
                                <p className="mt-4 text-[15px] leading-[2] text-ink-sub">
                                    プレビューも、正式制作と同じ担当が本気で作ります。品質を落とさずに対応できる上限が、月10社です。だからこそ、本当に作る予定のある事業者様に絞ってお受けしています。枠が埋まり次第、翌月のご案内に<span className="nowrap">なります。</span>
                                </p>
                                <div className="mt-6">
                                    <SlotsMeter dark={false} />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="bg-white px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-4xl">
                    <FadeIn>
                        <SectionHead label="よくあるご質問" jp="よくあるご質問" />
                    </FadeIn>
                    <FadeIn>
                        <div className="rounded-[20px] border border-line/70 bg-white px-6 shadow-card md:px-10">
                            {faqs.map((f, i) => (
                                <details key={f.q} className={`group ${i > 0 ? "border-t border-line" : ""}`}>
                                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                                        <span className="text-base font-bold leading-snug text-ink transition-colors group-hover:text-coral-deep">{f.q}</span>
                                        <span aria-hidden className="shrink-0 text-xl font-bold text-coral transition-transform group-open:rotate-45">＋</span>
                                    </summary>
                                    <p className="pb-6 text-[15px] leading-[2] text-ink-sub">{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── 申し込み（診断形式）＋ 追伸 ── */}
            <section id="apply" className="lp-aurora relative overflow-hidden bg-navy-deep px-4 py-20 text-white md:px-6 md:py-28">
                <div aria-hidden className="lp-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
                <div className="relative mx-auto max-w-4xl">
                    <FadeIn>
                        <div className="mb-10 text-center">
                            <div className="mb-6 flex justify-center">
                                <SlotsMeter />
                            </div>
                            <h2 className="text-[clamp(1.625rem,3.8vw,3rem)] font-bold leading-[1.45]">
                                まずは、あなたのトップページを<br className="md:hidden" /><span className="nowrap">見てみませんか。</span>
                            </h2>
                            <p className="mx-auto mt-4 max-w-[32em] text-[15px] leading-[2] text-navy-sub">
                                5つの質問に答えると、申込メッセージが自動でできあがります。それをLINEで送れば、<span className="nowrap">申込完了です。</span>
                            </p>
                        </div>
                    </FadeIn>
                    <FadeIn>
                        <PreviewApply />
                    </FadeIn>

                    {/* 追伸（代表から） */}
                    <FadeIn>
                        <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-6 rounded-[20px] border border-white/10 bg-white/[0.04] p-7 text-left sm:flex-row sm:items-start md:p-8">
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-coral/70">
                                <Image src={shun} alt="代表 倉林 駿" fill className="object-cover" sizes="80px" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold tracking-[0.25em] text-coral">追伸（代表より）</p>
                                <p className="mt-3 text-[15px] leading-[2] text-white/90">
                                    「頼むと高そう」「本当に効果が出るのか分からない」。ホームページをためらう理由は、だいたいこの2つです。だから私たちは、先に実物をお見せすることにしました。営業トークより、実物を見てください。気に入らなければ、断って<span className="nowrap">ください。</span>
                                </p>
                                <p className="mt-4 text-sm text-navy-sub">NEXT VALLEY 代表　<span className="font-bold text-white">倉林 駿</span></p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── ミニフッター ── */}
            <footer className="border-t border-navy-line bg-navy-deep py-10 text-navy-sub">
                <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 text-xs md:flex-row md:items-center md:px-6">
                    <div className="flex flex-col gap-3">
                        <Link href="/" className="inline-flex min-h-11 items-center">
                            <Image src={logo} alt="NEXT VALLEY" width={150} height={34} className="h-7 w-auto object-contain" />
                        </Link>
                        <p>屋号 NEXT VALLEY ／ 代表 倉林 駿 ／ <span className="nowrap">AI活用で売上と業務を支援するプロチーム</span></p>
                    </div>
                    <ul className="flex flex-wrap gap-x-6 gap-y-1">
                        {[["/", "トップページ"], ["/company", "事業情報"], ["/tokusho", "特定商取引法に基づく表記"], ["/privacy", "プライバシーポリシー"]].map(([href, label]) => (
                            <li key={href}>
                                <Link href={href} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="mx-auto mt-4 max-w-7xl px-4 text-xs md:px-6">&copy; {new Date().getFullYear()} NEXT VALLEY</p>
            </footer>

            {/* ── モバイル追従CTA（フォーム表示中は隠れる） ── */}
            <StickyApply />
        </main>
    );
}
