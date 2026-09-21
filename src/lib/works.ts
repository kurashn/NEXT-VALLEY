// 制作実績のデータ（一覧 /works と詳細 /works/[slug] の正本）
// ここに書くのは、確認の取れている事実だけ。数字は、すでに記事で公開しているものに限る。
import type { StaticImageData } from "next/image";

import w1 from "@/images/works/works1.jpg";
import w2 from "@/images/works/works2.jpg";
import w3 from "@/images/works/works3.jpg";
import w4 from "@/images/works/works4.jpg";
import w5 from "@/images/works/works5.jpg";
import w6 from "@/images/works/works6.jpg";
import w7 from "@/images/works/works7.jpg";
import w8 from "@/images/works/works8.jpg";
import w9 from "@/images/works/works9.jpg";
import w11 from "@/images/works/works11.jpg";
import w12 from "@/images/works/works12.jpg";
import w13 from "@/images/works/works13.jpg";
import w14 from "@/images/works/works14.jpg";
import w15 from "@/images/works/works15.jpg";
import w16 from "@/images/works/works16.jpg";
import w17 from "@/images/works/works17.jpg";
import w18 from "@/images/works/works18.jpg";
import w19 from "@/images/works/works19.jpg";
import w20 from "@/images/works/works20.jpg";
import w21 from "@/images/works/works21.jpg";
import w22 from "@/images/works/works22.jpg";
import w23 from "@/images/works/works23.jpg";

export const CATEGORIES = [
    { key: "all", label: "すべて" },
    { key: "company", label: "会社・不動産・建設" },
    { key: "shop", label: "店舗・サービス" },
    { key: "school", label: "教室・スクール" },
    { key: "media", label: "メディア" },
    { key: "lp", label: "LP・ECサイト" },
] as const;
export type CategoryKey = (typeof CATEGORIES)[number]["key"];

export type WorkDetail = {
    /** ご相談時の状態・課題 */
    before?: string[];
    /** やったこと（見出しと説明） */
    did?: { t: string; d: string }[];
    /** 成果（公開済みの数字だけ） */
    result?: { value: string; label: string }[];
    resultNote?: string;
    /** お客様の声（原文のまま） */
    voice?: string[];
    /** 関連する記事 */
    article?: { href: string; label: string };
};

export type Work = {
    slug: string;
    name: string;
    category: Exclude<CategoryKey, "all">;
    /** 業種の表示名 */
    label: string;
    image: StaticImageData;
    /** 一覧カードに出す1文 */
    summary: string;
    /** 担当した範囲 */
    scope: string[];
    /** 公開中のサイト */
    url?: string;
    detail?: WorkDetail;
};

export const WORKS: Work[] = [
    {
        slug: "yuma-english-house",
        name: "Yuma English House 様",
        category: "school",
        label: "英語教室",
        image: w8,
        summary: "入会ゼロだった教室のホームページを作り直し、申込の入口をLINE1本に。7か月で14名のご入会につながりました。",
        scope: ["ホームページ制作", "コース別LP", "LINE導線の設計", "月次レポート", "集客支援"],
        url: "https://yuma-english.com/",
        detail: {
            before: [
                "ホームページは、先生がご自身で作ったものが1つだけ",
                "体験レッスンの申込は「お問い合わせ」ページの中にあり、電話かメールのみ",
                "LINE公式アカウントがない",
                "目的の違うコースの案内が、同じページに混ざっていた",
            ],
            did: [
                { t: "最初の画面に、体験レッスンの入口を置いた", d: "トップの一番上に、教室の場所・対象年齢・体験レッスンのボタン。どのページの最後にも同じボタンを置き、文言は「お問い合わせ」ではなく「体験レッスンを申し込む」にしました。" },
                { t: "目的の違うコースは、別のページに分けた", d: "通常のレッスンを探す方と、英検対策を探す方は、知りたいことが違います。ページを分けたことで、お問い合わせの内容が具体的になりました。" },
                { t: "申込の入口を、LINE公式アカウント1本にした", d: "ホームページのボタンはすべてLINEにつなぎ、ご相談から体験日程の決定までをLINEの中で完結させました。" },
                { t: "毎月、数字を1枚のレポートにしてお渡しする", d: "ホームページに来た人数、友だち追加、ご相談、体験、ご入会。この5つを毎月1枚にまとめて共有しています。" },
            ],
            result: [
                { value: "0 → 14名", label: "ご入会（7か月）" },
                { value: "2サイト", label: "教室サイトと英検対策LP" },
            ],
            resultNote: "月ごとの数字は、事例の記事で落ちた月も含めてそのまま公開しています。",
            voice: [
                "英語教室のホームページと、英検対策コースのページの2つを制作していただきました。",
                "それぞれ見ていただきたい方が違うので、分けて作るというご提案はとてもありがたかったです。お問い合わせの内容が具体的になり、ご案内もしやすくなりました。",
            ],
            article: { href: "/blog/case-english-school-zero-to-14", label: "入会ゼロの英会話教室が、7か月で14名になるまで" },
        },
    },
    {
        slug: "bowlingnavi",
        name: "BowlingNavi -ボウナビ-",
        category: "media",
        label: "情報メディア",
        image: w12,
        summary: "プロボウラーの方が運営する情報サイト。広告を使わず、記事だけで月323人から4,167人まで伸ばしました。",
        scope: ["サイト制作", "記事の企画・運用", "アクセス解析", "月次レポート"],
        url: "https://www.bowlingnavi.com/",
        detail: {
            did: [
                { t: "読者の疑問1つに、1記事で答える", d: "いちばん読まれているのは「ボウリングの平均スコアは何点か」に答える記事です。大きなテーマの記事は作らず、疑問が1つ、答えが1つ。内容の正しさは、プロの方の監修で担保しています。" },
                { t: "タイトルに、検索する人の言葉をそのまま入れる", d: "検索する人は「ボウリング スコア 平均」と打ちます。かっこいい言い回しより、探している人の言葉を優先しました。" },
                { t: "古くなった記事を、書き直す", d: "年が変わったら中身ごと更新。新しい記事を増やすより、読まれている記事を直すほうが効くことがあります。" },
                { t: "毎月、数字を見て次を決める", d: "「もう少しで上位に入る検索語」が分かるので、次に直す記事を迷いません。" },
            ],
            result: [
                { value: "323 → 4,167人", label: "月の訪問者（8か月）" },
                { value: "0円", label: "広告費" },
            ],
            resultNote: "6月に一度落ちた月も含めて、事例の記事でそのまま公開しています。",
            article: { href: "/blog/case-bowling-media-growth", label: "プロボウラーの情報サイトが、記事だけで月323人から4,167人になるまで" },
        },
    },
    {
        slug: "matsumi",
        name: "Matsumi 様",
        category: "shop",
        label: "理容室",
        image: w22,
        summary: "創業50年の理容室のホームページを、WordPressで全面リニューアル。公開後も、数字を見ながら改善を続けています。",
        scope: ["デザイン", "WordPress実装", "公開後の保守", "月次レポート"],
        url: "https://matsumi-hair.com/",
        detail: {
            did: [
                { t: "WordPressのオリジナルテーマで、全面リニューアル", d: "料金、ヘアカタログ、アクセス、お知らせ。お店の方がご自身で更新できる形で組み直しました。" },
                { t: "ご予約の入口を、電話に絞った", d: "ご予約は電話優先のお店です。どのページからも、電話番号をすぐ押せるようにしています。" },
                { t: "公開後に、行き止まりのページをなくした", d: "なくなった古いURLに来た方を、近いページへ自動でご案内するようにしました。検索エンジンにも移転先が伝わります。" },
                { t: "検索結果に出る見出しを、ページごとに見直した", d: "開く前に中身が分かるよう、地域名と料金を入れた見出しに変えました。" },
                { t: "電話ボタンが押された回数を、数えられるようにした", d: "ホームページがご予約にどれだけつながっているかを、毎月のレポートでお伝えできるようにしています。" },
            ],
        },
    },
    {
        slug: "tulip-ballet-studio",
        name: "Tulip Ballet Studio 様",
        category: "school",
        label: "バレエ教室",
        image: w1,
        summary: "バレエ教室のホームページ。はじめての制作で、ご質問に一つずつお答えしながら進めました。",
        scope: ["ホームページ制作"],
        detail: {
            voice: [
                "非常に丁寧に、かつ、希望どおり作成していただきました！ウェブ関係はまったくわからず、毎回質問したりしていましたが、いつも丁寧に優しく答えてくださいました。",
                "また、様々な提案もしてくださり、想像以上の素敵なホームページを作成していただきました。依頼して本当に良かったと実感しております。",
            ],
        },
    },
    {
        slug: "rythmique-garden",
        name: "Rythmique Garden 様",
        category: "school",
        label: "リトミック教室",
        image: w5,
        summary: "リトミック教室のホームページ。ほぼすべてお任せいただき、ご提案しながら形にしました。",
        scope: ["ホームページ制作"],
        detail: {
            voice: [
                "初めてのホームページ作成で、何も分からずほぼ全てお任せだったのですが、一つ一つ、丁寧に教えてくださいました。",
                "また、様々な提案もしてくださり、想像以上の素敵なホームページを作成していただきました。依頼して本当に良かったと実感しております。",
            ],
        },
    },
    { slug: "kyuwa-fudosan", name: "久和不動産株式会社 様", category: "company", label: "不動産", image: w14, summary: "不動産管理会社のホームページ。", scope: ["ホームページ制作", "公開後の保守"] },
    { slug: "nishitsuji-koumuten", name: "株式会社西辻工務店 様", category: "company", label: "不動産・建設", image: w15, summary: "工務店のコーポレートサイト。", scope: ["ホームページ制作"] },
    { slug: "i-second", name: "株式会社アイ・セカンド 様", category: "company", label: "企業サイト", image: w17, summary: "コーポレートサイト。", scope: ["ホームページ制作"] },
    { slug: "eastern-hawk", name: "イースタンホーク 様", category: "company", label: "不動産サービス", image: w16, summary: "空撮を活かした不動産サービスのサイト。", scope: ["ホームページ制作"] },
    { slug: "wannabe", name: "株式会社ワナビィ 様", category: "company", label: "企業サイト", image: w7, summary: "放課後等デイサービスを運営する会社のコーポレートサイト。", scope: ["ホームページ制作", "公開後の保守", "月次レポート"], url: "https://wantto.jp/" },
    { slug: "vivid-direction", name: "株式会社ビビッドディレクション 様", category: "company", label: "企業サイト", image: w6, summary: "コーポレートサイト。", scope: ["ホームページ制作", "公開後の保守"] },
    { slug: "mew-seed", name: "株式会社ミュウシード（夢み寮）様", category: "company", label: "介護・福祉", image: w23, summary: "住宅型有料老人ホームのホームページ。", scope: ["ホームページ制作", "公開後の保守", "月次レポート"], url: "https://mew-seed.com/" },
    { slug: "personal-gym-me", name: "パーソナルジムMe 様", category: "shop", label: "フィットネス", image: w18, summary: "パーソナルジムのホームページ。", scope: ["ホームページ制作"] },
    { slug: "kurotori-bochi", name: "黒鳥墓地 様", category: "shop", label: "霊園", image: w20, summary: "霊園のホームページ。", scope: ["ホームページ制作"] },
    { slug: "dance-studio-plus", name: "DANCE STUDIO PLUS 様", category: "school", label: "ダンススクール", image: w9, summary: "ダンススクールのホームページ。", scope: ["ホームページ制作", "公開後の保守", "月次レポート"], url: "https://dancestudioplus.com/" },
    { slug: "colours-musical-studio", name: "Colours Musical Studio 様", category: "school", label: "ミュージカル教室", image: w2, summary: "ミュージカル教室のホームページ。", scope: ["ホームページ制作", "公開後の保守", "月次レポート"], url: "https://colours-musicalstudio.com" },
    { slug: "ecc-ichiriyama", name: "ECCジュニア 一里山教室 様", category: "school", label: "英語教室", image: w4, summary: "英語教室のホームページ。", scope: ["ホームページ制作"] },
    { slug: "maya-kodomonoie", name: "まや子どもの家 様", category: "school", label: "教育・スクール", image: w3, summary: "まや子どもの家のホームページ。", scope: ["ホームページ制作"] },
    { slug: "k-coaching", name: "K-coaching 様", category: "school", label: "コーチング", image: w11, summary: "コーチングのホームページ。", scope: ["ホームページ制作"] },
    { slug: "chiangmai-station", name: "タイ北部チェンマイ情報ステーション 様", category: "media", label: "情報メディア", image: w13, summary: "チェンマイの情報を届けるメディアサイト。", scope: ["サイト制作"] },
    { slug: "yuma-eiken-lp", name: "Yuma English House 英検対策コース 様", category: "lp", label: "LP", image: w21, summary: "英検対策コースの専用ページ。教室のホームページとは分けて、探している方に合わせて作りました。", scope: ["LP制作"] },
    { slug: "i-second-store", name: "I-SECOND STORE 様", category: "lp", label: "ECサイト", image: w19, summary: "オンラインストア。", scope: ["ECサイト制作"] },
];

export const DETAILED = WORKS.filter((w) => w.detail);
export const findWork = (slug: string) => WORKS.find((w) => w.slug === slug);
