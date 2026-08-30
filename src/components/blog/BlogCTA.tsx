import { MessageCircle } from "lucide-react";

/* 記事末尾の誘導。記事のタグ・カテゴリから「この記事を読んだ人が次にしたいこと」に合わせて文面を出し分ける。
   行き先は変えない（LINE無料診断が本命）。副ボタンだけテーマで変える */

type Variant = {
    eyebrow: string;
    heading: React.ReactNode;
    body: React.ReactNode;
    sub: { label: string; href: string };
};

const LINE = "https://lin.ee/N4QXdJL";

const variants: Record<string, Variant> = {
    classroom: {
        eyebrow: "この記事を読んだ先生へ",
        heading: (
            <>
                体験申込が来ない原因、今の教室サイトを見て<span className="nowrap">お答えします</span>
            </>
        ),
        body: (
            <>
                教室のURL（ペライチやアメブロでも大丈夫です）をLINEで送るだけ。
                <br className="hidden md:block" />
                申込が来ない原因と直す順番、概算の費用を2営業日以内にお返しします。
            </>
        ),
        sub: { label: "無料プレビューを見る", href: "/preview" },
    },
    maps: {
        eyebrow: "この記事を読んだ方へ",
        heading: (
            <>
                Googleマップと今のサイトに、何が足りないか<span className="nowrap">診断します</span>
            </>
        ),
        body: (
            <>
                お店の名前とサイトのURLをLINEで送るだけ。
                <br className="hidden md:block" />
                地図で見つけてもらうために直す順番と、概算の費用を2営業日以内にお返しします。
            </>
        ),
        sub: { label: "3分セルフ診断を試す", href: "/shindan" },
    },
    line: {
        eyebrow: "この記事を読んだ方へ",
        heading: (
            <>
                LINE公式を「予約と再来店」に使う設計、一緒に<span className="nowrap">決めます</span>
            </>
        ),
        body: (
            <>
                今の運用（登録者数・配信の頻度・困っていること）をLINEで送るだけ。
                <br className="hidden md:block" />
                最初に整える1つと、概算の費用を2営業日以内にお返しします。
            </>
        ),
        sub: { label: "3分セルフ診断を試す", href: "/shindan" },
    },
    cost: {
        eyebrow: "この記事を読んだ方へ",
        heading: (
            <>
                「うちの場合はいくら？」を、先に<span className="nowrap">お出しします</span>
            </>
        ),
        body: (
            <>
                作りたいものと今の状況をLINEで送るだけ。概算のお見積もりを2営業日以内にお返しします。
                <br className="hidden md:block" />
                これから作る方は、契約前に完成イメージを無料でご覧いただけます。
            </>
        ),
        sub: { label: "無料プレビューを見る", href: "/preview" },
    },
    ai: {
        eyebrow: "この記事を読んだ方へ",
        heading: (
            <>
                AIで減らせる作業が何か、今の業務を聞いて<span className="nowrap">お答えします</span>
            </>
        ),
        body: (
            <>
                「毎週これに時間を取られている」をLINEで送るだけ。
                <br className="hidden md:block" />
                最初に手を付ける1つと、概算の費用を2営業日以内にお返しします。
            </>
        ),
        sub: { label: "3分セルフ診断を試す", href: "/shindan" },
    },
    default: {
        eyebrow: "この記事を読んだ方へ",
        heading: (
            <>
                「うちの場合は、どこから？」を無料でお<span className="nowrap">答えします</span>
            </>
        ),
        body: (
            <>
                サイトのURLやお悩みをLINEで送るだけ。
                <br className="hidden md:block" />
                改善の打ち手と概算お見積もりを、2営業日以内にお返しします。
            </>
        ),
        sub: { label: "3分セルフ診断を試す", href: "/shindan" },
    },
};

const hasAny = (list: string[], words: string[]) => list.some((t) => words.some((w) => t.includes(w)));

export function pickVariant(tags: string[] = [], categories: string[] = []): keyof typeof variants {
    if (hasAny(tags, ["LINE"])) return "line";
    if (hasAny(tags, ["生徒", "体験レッスン", "ピアノ", "英会話", "バレエ", "書道", "習い事"])) return "classroom";
    if (hasAny(tags, ["MEO", "Googleマップ", "Googleビジネス", "地図"])) return "maps";
    if (hasAny(tags, ["費用", "料金", "見積", "相場", "制作会社の選び方", "格安", "無料", "お急ぎ"])) return "cost";
    if (hasAny(tags, ["教室", "スクール"])) return "classroom";
    if (categories.includes("ai-efficiency") || hasAny(tags, ["AI"])) return "ai";
    return "default";
}

export const BlogCTA = ({ tags = [], categories = [] }: { tags?: readonly string[] | string[]; categories?: readonly string[] | string[] }) => {
    const v = variants[pickVariant([...tags], [...categories])];
    return (
        <div className="my-16 rounded-2xl bg-[#eef2f6] p-8 text-center md:p-12">
            <p className="mb-3 text-[12px] font-bold tracking-[0.2em] text-coral-deep">{v.eyebrow}</p>
            <h3 className="mb-4 text-2xl font-bold text-navy md:text-3xl">{v.heading}</h3>
            <p className="mx-auto mb-8 max-w-2xl leading-[1.9] text-ink-sub">{v.body}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                    href={LINE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#05a247] px-5 text-[19px] font-bold text-white sm:px-8 shadow-[0_12px_28px_rgba(5,162,71,0.3)] transition-all hover:-translate-y-0.5 sm:w-auto"
                >
                    <MessageCircle className="h-5 w-5" aria-hidden />
                    LINEで無料診断を受ける
                </a>
                <a
                    href={v.sub.href}
                    className="inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-full border border-line bg-white px-6 text-[15px] font-bold text-ink sm:px-8 transition-colors hover:border-coral hover:text-coral-deep sm:w-auto"
                >
                    {v.sub.label}
                </a>
            </div>
            <p className="mt-4 text-xs text-ink-sub">※ 診断・提案・見積もりは無料。しつこい営業は一切ありません</p>
        </div>
    );
};
