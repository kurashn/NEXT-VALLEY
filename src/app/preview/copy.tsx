// 無料プレビューLP（/preview, /en/preview）の文言辞書。
// ja は従来の page.tsx の文言をそのまま移したもの（1文字も変えない）。en は typeof ja に合わせる。
import React from "react";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Monitor, Smartphone, Sparkles, Palette, Wallet, Eye, Hourglass, Lock, BadgeCheck, UserRoundCheck } from "lucide-react";
import type { Lang } from "@/i18n";

/** 毎月10社限定。残り枠は下の定数を書き換えるだけで全箇所に反映される */
export const REMAINING_SLOTS = 4; // ← 今月の残り枠（毎月ここを更新）
export const TOTAL_SLOTS = 10;
export const FORM_URL = "https://forms.gle/FoAHMCtmPhppB8wd8";
export const LINE_URL = "https://lin.ee/N4QXdJL#from=preview";

type IconItem = { icon: LucideIcon; t: React.ReactNode; d: string };
type CompareRow = { k: string; a: string; b: string; c: React.ReactNode };
type Term = { k: string; v: React.ReactNode };

/* ───────────────────────── 日本語 ───────────────────────── */

const ja = {
    header: {
        badge: (n: number) => `毎月10社限定・今月あと${n}社`,
        cta: "無料で申し込む",
    },
    lineButton: "無料プレビューを申し込む",
    ctaNote: (
        <>
            ヒアリングシートに答えるだけ（約1分）・費用0円・<span className="nowrap">断ってOK</span>
        </>
    ),
    slots: { before: "今月の残り枠 ", after: ` / ${TOTAL_SLOTS}社` },
    hero: {
        tagLong: "無料プレビュー制作キャンペーン",
        tagShort: "無料プレビュー制作",
        tagSuffix: " ／ 毎月10社限定",
        h1a: "先に、見せます。",
        h1b: (
            <>
                契約の前に、あなたのお店・会社・教室の<br />
                トップページ案を<span className="text-coral">無料で</span>お作りします。
            </>
        ),
        lead: (
            <>
                体験レッスンの申し込みにつながるトップページ案を、ヒアリングシートに答えるだけでお作りします。3営業日以内に、PC・スマホ2枚のデザイン案が<span className="nowrap">届きます。</span>気に入らなければ、そこで終わり。費用も、営業も<span className="nowrap">ありません。</span>
            </>
        ),
        chips: [
            { k: "プレビュー費用", v: "0円" },
            { k: "お届け", v: "3営業日以内" },
            { k: "この時点の契約", v: "不要" },
            { k: "正式制作の初期費用", v: "0円" },
            { k: "正式制作の月額", v: "8,980円（税込）" },
        ],
        note: (
            <>
                ヒアリングシートに答えるだけ（約1分）・しつこい<span className="nowrap">営業なし</span>
                <br />
                ※ 埼玉の小さな会社・店舗・教室を中心に、全国オンラインで対応しています。業種は<span className="nowrap">問いません。</span>
                <br />
                ※ 事業者様限定。本気でホームページを作る方のための枠です（簡単な確認あり）
            </>
        ),
        scroll: "SCROLL",
    },
    statsAria: "実績の数字",
    stats: [
        { v: "100", unit: "社以上", k: "制作・支援実績" },
        { v: "2021", unit: "年〜", k: "事業開始" },
        { v: "3", unit: "営業日以内", k: "プレビューのお届け" },
        { v: "0", unit: "円", k: "プレビュー費用" },
    ],
    fears: {
        label: "よくある不安",
        title: <>ホームページ制作で、<br className="md:hidden" />いちばん怖いこと。</>,
        lead: "ホームページは「完成するまで、どんな見た目になるか分からない」買い物でした。だから、こんな不安がついて回ります。" as React.ReactNode,
        items: [
            {
                icon: Wallet,
                t: <>払ってから、<span className="nowrap">がっかりする</span></>,
                d: "数十万円を払い、数週間待って、完成して初めてデザインを見る。イメージと違っても、作り直しは追加費用。いちばん多い後悔です。",
            },
            {
                icon: Eye,
                t: <>実績は「他社の話」で<span className="nowrap">しかない</span></>,
                d: "制作会社の実績がきれいでも、それは他社のサイト。「うちなら、どんな見た目になるのか」は、頼むまで分かりません。",
            },
            {
                icon: Hourglass,
                t: <>比較しているうちに、<span className="nowrap">時間が溶ける</span></>,
                d: "何社にも問い合わせ、打ち合わせを重ね、見積もりを見比べる。本業の時間が削られ、結局「まだ決められない」まま数ヶ月。",
            },
        ] as IconItem[],
        closing: (
            <>
                この3つは、「先に実物を見る」だけで<span className="nowrap">全部なくなります。</span>
            </>
        ),
    },
    answer: {
        label: "私たちの答え",
        title: <>だから、順番を変えました。<br className="md:hidden" /><span className="lp-marker">「見てから、決める。」</span></>,
        lead: "契約してから見るのではなく、見てから契約するかどうかを決める。それだけで、ホームページ制作の失敗はほとんど防げます。" as React.ReactNode,
        usualLabel: "一般的な流れ",
        usualFlow: [
            "制作会社を何社も比較する",
            <React.Fragment key="u2">見積もりと他社の実績で<span className="whitespace-nowrap">契約を決める</span></React.Fragment>,
            "打ち合わせを重ねて、数週間待つ",
            "完成して、初めてデザインを見る",
            <React.Fragment key="u5">「イメージと違う…」でも、<span className="whitespace-nowrap">もう戻れない</span></React.Fragment>,
        ],
        usualClosing: "見るのは、お金を払った後。",
        ourLabel: "NEXT VALLEY の流れ",
        ourFlow: [
            "ヒアリングシート（約1分）に答える",
            <React.Fragment key="o2">3営業日以内に、あなたの<span className="whitespace-nowrap">トップページ案</span>が届く</React.Fragment>,
            "実物を見てから、頼むかどうかを決める",
        ],
        ourClosing: "見るのは、決める前。費用は0円。",
    },
    deliver: {
        label: "お届けするもの",
        title: <>プレビューで、<br className="md:hidden" />お届けするもの。</>,
        lead: "「ラフなイメージ図」ではありません。気に入れば、そのまま公開まで仕上げられる実物のトップページ案です。気になる点は、プレビューの段階でも1回まで無料で調整します（正式契約のあとは、修正・更新が無制限になります）。" as React.ReactNode,
        items: [
            { icon: Monitor, t: "PC版トップページ", d: "実際のブラウザで見た状態の画像。構成・写真の置き方・文字の大きさまで、そのまま確認できます。" },
            { icon: Smartphone, t: "スマホ版トップページ", d: "来訪者の多くはスマホ。指で触る前提のレイアウトを、別途つくって同時にお渡しします。" },
            { icon: Sparkles, t: <>業種と強みに<span className="nowrap">合わせた構成</span></>, d: "テンプレートの色替えではありません。問い合わせや予約までどう案内するかを考えて、あなたの事業に合わせて組み立てます。店舗・その他の業種も同じ作り方です。" },
            { icon: Palette, t: "希望の雰囲気を反映", d: "「上品に」「元気に」「信頼感を」。ひと言の希望から、色・書体・余白のトーンを決めます。" },
        ] as IconItem[],
        cta: <>あなたの事業なら、どんなトップページに<span className="nowrap">なるか。</span><br className="md:hidden" />まず、それを見て<span className="nowrap">ください。</span></>,
    },
    compare: {
        label: "ほかとの違い",
        title: <>ほかの選択肢と、<br className="md:hidden" />何が違うのか。</>,
        lead: "一般的な例との比較です（会社やサービスにより異なります）。違いは1つ、「見る」と「払う」の順番です。" as React.ReactNode,
        colK: "比較項目",
        colA: "一般的な制作会社",
        colB: "格安テンプレート",
        colC: "NEXT VALLEY 無料プレビュー",
        colCShort: "NEXT VALLEY",
        rows: [
            { k: "契約前にデザインを見られる", a: "△ ラフ案や口頭説明が中心", b: "× テンプレートから選ぶ", c: <>◎ 実物のトップページ案<span className="nowrap">（PC・スマホ）</span></> },
            { k: "費用が発生するタイミング", a: "契約時（着手金など）", b: "申込時", c: <>正式契約日から<span className="nowrap">（プレビューは0円）</span></> },
            { k: "デザイン案が届くまで", a: "契約後、数週間", b: "―", c: "3営業日以内" },
            { k: "断ったあと", a: "契約後の解約は難しい", b: "返金不可の場合も", c: "そこで終わり・営業なし" },
            { k: "作るのは", a: "会社による", b: "自分で組む", c: "正式制作と同じ担当" },
            { k: "正式制作の費用", a: "初期費用が数十万円", b: "月額＋自分で作る手間", c: <>初期0円<br />月額8,980円（税込）</> },
        ] as CompareRow[],
    },
    voices: {
        label: "お客様の声",
        title: "実際にご依頼いただいた方の声。" as React.ReactNode,
        lead: "プレビューも、正式制作も、同じ担当が同じ姿勢で作ります。" as React.ReactNode,
        items: [
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
        ],
    },
    flow: {
        label: "申し込みの流れ",
        title: "申し込みから、3ステップ。" as React.ReactNode,
        lead: "必要なのはLINEとヒアリングシートだけ。電話も、打ち合わせの日程調整もありません。" as React.ReactNode,
        steps: [
            { n: "01", t: <>公式LINEを追加し、ヒアリングシート（約1分）に<span className="nowrap">答える</span></>, d: "友だち追加すると、ヒアリングシートの案内がすぐ届きます。教室・お店のお名前、作る目的、載せたい内容など、スマホから約1分で回答できます。写真やロゴがなくても大丈夫です。" },
            { n: "02", t: "確認のうえ、3営業日以内にトップページ案が届く", d: "事業の実態と、ご希望の内容を確認してから制作に入ります（条件に合わない場合は、その旨をお伝えします）。PC・スマホの2枚の画像でお届け。" },
            { n: "03", t: "見てから、決める", d: "気に入れば正式制作へ進みます。条件は、初期制作費0円・月額8,980円（税込）・最低契約期間1年間。料金がかかり始めるのは正式契約日からです。気に入らなければ、そこで終わりで大丈夫です。こちらから追いかける連絡はしません。" },
        ] as { n: string; t: React.ReactNode; d: string }[],
        formTitle: "ヒアリングシートで聞くこと",
        formItems: [
            "教室・お店のお名前と所在地",
            "ホームページを作る目的",
            "載せたい内容",
            "参考にしたいサイト",
            "今のサイト・Instagram（あれば）",
            "写真・ロゴの有無",
        ],
        formNote: "スマホから約1分で回答できます。回答から3営業日以内に、デザイン案をお送りします。",
        cta: <>所要は約1分。回答から3営業日以内に、デザイン案を<span className="nowrap">お届けします。</span></>,
    },
    pricing: {
        label: "無料の理由と料金",
        title: "なぜ無料か。そして、その先の料金。" as React.ReactNode,
        lead: "タネも仕掛けもありません。先に全部お伝えしておきます。" as React.ReactNode,
        whyTitle: "なぜ、無料でできるのか",
        whyP1: (
            <>
                AIを活用した制作環境で、トップページ1枚を作るコストが大幅に下がりました。その分を「契約前に実物を見てもらう」ことに使っています。判断材料を先に渡した方が、お互いに後悔がない<span className="nowrap">からです。</span>
            </>
        ),
        whyP2: (
            <>
                見て、気に入った方だけが正式制作に進む。私たちにとっても、ミスマッチのない仕事だけを引き受けられる、いちばん健全な<span className="nowrap">やり方です。</span>
            </>
        ),
        nextLabel: "気に入ったら、正式制作へ",
        nextTitle: <>プレビューのデザインを、<br className="md:hidden" />そのまま公開まで。</>,
        nextLead: (
            <>
                正式制作に進む場合の条件です。金額も期間も、申し込む前にすべてお伝えします。あとから初期費用を追加で請求することは<span className="nowrap">ありません。</span>
            </>
        ),
    },
    terms: {
        label: "正式制作の条件",
        heading: "正式制作に進むときの条件",
        lead: (
            <>
                プレビューは無料です。この条件でのご契約になるのは、実物を見て「公開まで進めたい」と決めた<span className="nowrap">ときだけです。</span>
            </>
        ) as React.ReactNode,
        items: [
            { k: "初期制作費", v: "0円" },
            { k: "月額", v: "8,980円（税込）" },
            { k: "制作ページ数", v: "10ページまで" },
            { k: "修正・更新", v: "無制限" },
            { k: "ドメイン・サーバー費", v: "月額に含む" },
            { k: "最低契約期間", v: "1年間" },
            { k: "課金開始", v: "正式契約日" },
            { k: "初年度の支払総額", v: "107,760円（税込）" },
        ] as Term[],
        notes: [
            "プレビューを見た時点では、料金は発生しません。料金がかかり始めるのは正式契約日からです。",
            "1年以上ご契約いただいた場合、サイトをお客様へ譲渡できます。",
            "Googleマップの運用・SNSの運用・継続的なSEO・LINE公式アカウントの構築と運用といった、継続的な集客支援はこの月額に含みません。ご希望の内容に応じて、別途お見積もりします。",
            "プレビュー段階の調整は1回まで無料です。修正・更新が無制限になるのは、正式契約のあとです。",
        ],
    },
    promises: {
        label: "3つの約束",
        title: <>安心して申し込めるように、<br className="md:hidden" /> 3つ約束します。</>,
        items: [
            { t: "プレビューは完全無料", d: "あとから請求することはありません。費用が発生するのは、気に入って正式制作に進む場合だけです。" },
            { t: "断っても、追いかけません", d: "「今回は見送ります」で終わり。電話営業も、こちらからの催促もしません。" },
            { t: "契約書も、口約束もなし", d: "プレビューの段階で、何かを約束していただくことはありません。見て、判断するだけです。正式制作に進むと決めたときに、あらためて条件をご確認いただきます。" },
        ],
    },
    target: {
        label: "対象となる方",
        title: <>本気でホームページを作る、<br className="md:hidden" />事業者様のための枠です。</>,
        lead: "誰でも申し込めるキャンペーンではありません。実際に事業をされていて、本当にホームページを作りたい方のために、毎月10社分の制作時間を確保しています。埼玉の小さな会社・店舗・教室を中心に、全国オンラインでお受けしています。業種は問いません。お申し込み後、簡単な確認をさせていただき、条件に合わない場合はお断りすることがあります。" as React.ReactNode,
        condLabel: (n: number) => `条件 ${n}`,
        conditions: [
            { icon: BadgeCheck, t: "事業の実態が確認できること", d: "店舗名・SNS・Googleマップ・既存サイト・開業届など、いずれかで事業が分かる方。" },
            { icon: UserRoundCheck, t: "決められる方ご本人であること", d: "代表者・オーナー・担当責任者など、ホームページについて判断できる方。" },
            { icon: Lock, t: "本気で作る予定があること", d: "気に入れば正式制作を検討できる方。参考目的・同業の方はお断りしています。" },
        ] as IconItem[],
        forLabel: "対象の方",
        forWho: [
            "実際に事業をしていて（または開業が決まっていて）、これからホームページを作る",
            "体験レッスンや問い合わせの申し込みを、もっと分かりやすい形で受けたい",
            "制作会社を比べているが、完成イメージが湧かず決められない",
            "「作る前に、実物を見て判断したい」と思っている",
            "気に入れば、正式制作を前向きに検討できる",
        ],
        notForLabel: "対象外の方",
        notForWho: [
            "同業の方（Web制作会社・デザイナー・フリーランスの方）",
            "デザインの参考資料や相見積もりの材料だけが欲しい方",
            "ホームページを作る予定・予算が、まだない方",
            "事業の実態が確認できない方",
        ],
        notForNote: "※ 上記に当てはまる場合は、確認の段階でお断りすることがあります。本気で作る方の枠を守るためです。ご理解ください。",
        whyTenTitle: "なぜ、毎月10社までなのか",
        whyTenP: (
            <>
                プレビューも、正式制作と同じ担当が本気で作ります。品質を落とさずに対応できる上限が、月10社です。だからこそ、本当に作る予定のある事業者様に絞ってお受けしています。枠が埋まり次第、翌月のご案内に<span className="nowrap">なります。</span>
            </>
        ),
    },
    faq: {
        label: "よくあるご質問",
        title: "よくあるご質問" as React.ReactNode,
        items: [
            { q: "本当に無料ですか？あとから請求されませんか？", a: "はい、プレビュー制作は無料です。あとから請求することはありません。費用がかかるのは、気に入って「公開まで進めたい」となった場合の正式制作だけです。正式制作は初期制作費0円・月額8,980円（税込）で、最低契約期間は1年間です。" },
            { q: "断ったら営業されませんか？", a: "されません。「今回は見送ります」で終わりです。こちらから追いかけて連絡することもありません。" },
            { q: "作ったデザインのデータはもらえますか？", a: "プレビューはPC・スマホの画像でお渡しします。編集用データやコードは、正式制作をご依頼いただいた場合にお渡しします。" },
            { q: "写真もロゴもないのですが、大丈夫ですか？", a: "大丈夫です。業種と伝えたいことが分かれば、それに合った構成とデザインでお作りします。素材は正式制作の段階で一緒に準備します。" },
            { q: "「確認」では、何を見るのですか？", a: "実際に事業をされているか（店舗名・SNS・Googleマップ・既存サイトなど）と、ホームページを作る予定が本当にあるか、の2点です。審査のような堅いものではなく、LINEでのやり取りの中で確認します。" },
            { q: "個人事業主・開業前でも申し込めますか？", a: "はい。個人事業主の方も、開業が決まっている方も対象です。屋号や開業予定日、SNSなど、事業が分かるものを教えてください。" },
            { q: "同業ですが、参考に申し込めますか？", a: "申し訳ありませんが、同業（Web制作・デザイン）の方や、参考資料が目的の方はお断りしています。本気でホームページを作る事業者様のための枠です。" },
            { q: "プレビューを見てから、修正の希望は言えますか？", a: "はい。プレビューの段階では、気になる点を1回まで無料で調整します。正式制作に進む場合は、そのプレビューをたたき台にして、色・写真・文章などをご希望に合わせて仕上げていきます。正式契約のあとは、修正・更新の回数に制限はありません。" },
            { q: "正式制作の料金を教えてください。", a: "初期制作費は0円、月額8,980円（税込）です。10ページまでの制作、修正・更新は無制限、ドメイン代とサーバー代も月額に含みます。最低契約期間は1年間で、初年度の支払総額は107,760円（税込）です。" },
            { q: "いつから料金がかかりますか？", a: "正式契約日からです。プレビューを見た時点では料金は発生しません。見て、断っていただいても費用はかかりません。" },
            { q: "Googleマップやインスタの運用もお願いできますか？", a: "ご相談いただけます。ただしGoogleマップの運用・SNSの運用・継続的なSEO・LINE公式アカウントの構築と運用といった継続的な集客支援は、月額8,980円（税込）には含みません。ご希望の内容をうかがったうえで、別途お見積もりします。" },
            { q: "サイトは自分のものになりますか？", a: "1年以上ご契約いただいた場合、サイトをお客様へ譲渡できます。詳しい手順は正式契約の前にご説明します。" },
            { q: "どんな業種でも申し込めますか？", a: "はい。会社・店舗・教室など、業種は問いません。まずはヒアリングシートで事業の内容を教えてください。" },
            { q: "なぜ無料でできるのですか？", a: "AIを活用した制作環境で、トップページ1枚を作るコストが大幅に下がったからです。その分を「先に実物を見てもらう」ことに使っています。契約前に判断材料を渡した方が、お互いに後悔がないと考えています。" },
        ],
    },
    apply: {
        title: (
            <>
                まずは、あなたの<span className="nowrap">トップページ</span>を<br className="md:hidden" /><span className="nowrap">見てみませんか。</span>
            </>
        ),
        lead: (
            <>
                下のボタンから公式LINEを追加すると、ヒアリングシート（約1分）が届きます。答えるだけで<span className="nowrap">申込完了です。</span>
                <br />
                まだ決めていない方は、質問だけでも大丈夫です。LINEで「気になる」と一言送っていただければ、<span className="nowrap">こちらからご説明します。</span>
            </>
        ),
        formButton: "LINEで無料プレビューを申し込む",
        formButtonNote: (
            <>
                追加するとヒアリングシート（約1分）が届きます・プレビューは<span className="nowrap">費用0円</span>・回答から3営業日以内に<span className="nowrap">お届け</span>・この時点では<span className="nowrap">料金はかかりません</span>
            </>
        ) as React.ReactNode,
        psAlt: "代表 倉林 駿",
        psLabel: "追伸（代表より）",
        psText: (
            <>
                「頼むと高そう」「本当に効果が出るのか分からない」。ホームページをためらう理由は、だいたいこの2つです。だから私たちは、先に実物をお見せすることにしました。営業トークより、実物を見てください。気に入らなければ、断って<span className="nowrap">ください。</span>
            </>
        ),
        psSign: "NEXT VALLEY 代表　",
        psName: "倉林 駿",
    },
    footer: {
        tagline: (
            <>
                屋号 NEXT VALLEY ／ 代表 倉林 駿 ／ 2021年創業・100社以上の制作・<span className="nowrap">支援実績</span>
            </>
        ),
        links: [
            ["/", "トップページ"],
            ["/company", "事業情報"],
            ["/tokusho", "特定商取引法に基づく表記"],
            ["/privacy", "プライバシーポリシー"],
        ] as [string, string][],
    },
    sticky: "無料プレビューを申し込む（約1分）",
};

/* ───────────────────────── English ───────────────────────── */

const en: typeof ja = {
    header: {
        badge: (n: number) => `10 spots a month · ${n} left`,
        cta: "Apply free",
    },
    lineButton: "Get your free preview",
    ctaNote: <>One short hearing sheet (about 1 minute) · ¥0 · Free to say no</>,
    slots: { before: "", after: ` of ${TOTAL_SLOTS} spots left this month` },
    hero: {
        tagLong: "FREE PREVIEW",
        tagShort: "FREE PREVIEW",
        tagSuffix: " · 10 SPOTS/MO",
        h1a: "See it first.",
        h1b: (
            <>
                Before you sign anything, we&rsquo;ll design a homepage for your school or studio &mdash;{" "}
                <span className="text-coral">free of charge</span>.
            </>
        ),
        lead: (
            <>
                Fill in one short hearing sheet. Within 3 business days you&rsquo;ll receive two designs &mdash; desktop and mobile. Don&rsquo;t like them? That&rsquo;s the end of it. No fees, no sales calls.
            </>
        ),
        chips: [
            { k: "Preview cost", v: "¥0" },
            { k: "Delivery", v: "3 business days" },
            { k: "Contract now", v: "None" },
            { k: "Setup fee", v: "¥0" },
            { k: "Monthly", v: "¥8,980 (incl. tax)" },
        ],
        note: (
            <>
                One short hearing sheet · about 1 minute · no pushy follow-up
                <br />
                Mainly for schools and studios (English, dance, ballet, music). Shops and other businesses are welcome to ask.
                <br />
                For business owners only. Spots are reserved for people who are serious about building a website (we do a quick check).
            </>
        ),
        scroll: "SCROLL",
    },
    statsAria: "Track record",
    stats: [
        { v: "100+", unit: "", k: "Businesses served" },
        { v: "2021", unit: "", k: "Founded" },
        { v: "3", unit: "business days", k: "Preview delivered within" },
        { v: "¥0", unit: "", k: "Preview cost" },
    ],
    fears: {
        label: "COMMON WORRIES",
        title: <>The scariest part of getting a website built.</>,
        lead: "A website used to be something you couldn't see until it was finished. That's why these worries keep coming up.",
        items: [
            {
                icon: Wallet,
                t: "Paying first, then being disappointed",
                d: "You pay hundreds of thousands of yen, wait weeks, and only see the design once it's done. If it's not what you pictured, changes cost extra. It's the most common regret we hear.",
            },
            {
                icon: Eye,
                t: "Portfolios only show other people's sites",
                d: "An agency's portfolio may look great, but those are someone else's sites. What your own school would actually look like? You won't know until you've committed.",
            },
            {
                icon: Hourglass,
                t: "Time melts away while you compare",
                d: "You contact several agencies, sit through meetings, and compare quotes. Months go by, your real work suffers, and you still haven't decided.",
            },
        ],
        closing: <>All three disappear the moment you can see the real thing first.</>,
    },
    answer: {
        label: "OUR ANSWER",
        title: <>So we flipped the order. <span className="lp-marker">See it first. Then decide.</span></>,
        lead: "Instead of signing and then seeing, you see first and then decide whether to sign. That alone prevents most website regrets.",
        usualLabel: "THE USUAL WAY",
        usualFlow: [
            "Compare several web agencies",
            "Pick one based on quotes and other clients' work",
            "Sit through meetings, then wait weeks",
            "See the design for the first time when it's finished",
            "“This isn't what I pictured…” — but there's no going back",
        ],
        usualClosing: "You see it after you've paid.",
        ourLabel: "THE NEXT VALLEY WAY",
        ourFlow: [
            "Fill in the hearing sheet (about 1 minute)",
            "Receive your homepage design within 3 business days",
            "Look at the real thing, then decide whether to hire us",
        ],
        ourClosing: "You see it before you decide. Cost: ¥0.",
    },
    deliver: {
        label: "WHAT YOU GET",
        title: <>What&rsquo;s in your free preview.</>,
        lead: "This isn't a rough sketch. It's a real homepage design that, if you like it, we can take all the way to launch. And if something bugs you, we'll make one round of adjustments at the preview stage — free.",
        items: [
            { icon: Monitor, t: "Desktop homepage", d: "An image of your homepage as it would appear in a real browser — layout, photo placement, type sizes, all of it." },
            { icon: Smartphone, t: "Mobile homepage", d: "Most visitors arrive on their phones. We design a separate touch-first layout and deliver both together." },
            { icon: Sparkles, t: "Built around your industry and strengths", d: "Not a template with the colors swapped. We start from who you're talking to, what you offer, and how to say it — then build it for your business." },
            { icon: Palette, t: "Your preferred look and feel", d: "“Elegant.” “Energetic.” “Trustworthy.” One word from you sets the tone for colors, typography, and spacing." },
        ],
        cta: <>What would a homepage for your business look like? <br className="md:hidden" /> See that first.</>,
    },
    compare: {
        label: "HOW WE COMPARE",
        title: <>What makes this different.</>,
        lead: "A general comparison (details vary by company and service). The one real difference: whether you see it before or after you pay.",
        colK: "Compared on",
        colA: "Typical web agency",
        colB: "Budget templates",
        colC: "NEXT VALLEY Free Preview",
        colCShort: "NEXT VALLEY",
        rows: [
            { k: "See the design before signing", a: "△ Rough sketches or verbal descriptions", b: "× You pick from templates", c: "◎ A real design (desktop + mobile)" },
            { k: "When you start paying", a: "At signing (deposit, etc.)", b: "At sign-up", c: "From the contract date (the preview is ¥0)" },
            { k: "Time until you see a design", a: "Weeks after signing", b: "—", c: "Within 3 business days" },
            { k: "If you say no", a: "Hard to cancel once signed", b: "Often non-refundable", c: "That's the end. No sales calls." },
            { k: "Who does the work", a: "Depends on the agency", b: "You build it yourself", c: "The same team that builds the real site" },
            { k: "Cost of the real site", a: "A setup fee in the hundreds of thousands", b: "Monthly fee plus your own time", c: <>¥0 setup<br />¥8,980/mo (incl. tax)</> },
        ],
    },
    voices: {
        label: "CLIENT VOICES",
        title: "What our clients say.",
        lead: "The preview and the finished site are built by the same people, with the same care. (Reviews translated from Japanese.)",
        items: [
            {
                name: "Tulip Ballet Studio",
                label: "Ballet school",
                text: "They were incredibly thorough and made exactly what we asked for! I knew nothing about websites and asked questions constantly, but they always answered kindly and patiently. The site turned out even lovelier than we imagined.",
            },
            {
                name: "Rythmique Garden",
                label: "Music & movement classes",
                text: "It was our first website and we left almost everything to them, but they walked us through each step. They also came up with all sorts of suggestions — we're truly glad we chose them.",
            },
        ],
    },
    flow: {
        label: "HOW IT WORKS",
        title: "Three steps, start to design.",
        lead: "All you need is LINE and one short hearing sheet. No phone calls, no scheduling meetings.",
        steps: [
            { n: "01", t: "Add our LINE, then fill in the hearing sheet (about 1 minute)", d: "Add us as a friend and the hearing sheet arrives right away — your business name, what you want the site to do, what to include, and so on (the sheet is in Japanese). About a minute on your phone. No photos or logo? No problem." },
            { n: "02", t: "We confirm, then deliver your homepage design within 3 business days", d: "We check that the business is real and what you're looking for before we start (if it's not a fit, we'll let you know). You get two images: desktop and mobile." },
            { n: "03", t: "Look, then decide", d: "Like it? We move to full production and handle everything through launch. Don't? That's the end of it — we won't chase you." },
        ],
        formTitle: "What the hearing sheet asks",
        formItems: [
            "Business name and area",
            "What you want the site to do",
            "What to include",
            "Sites you'd like to reference",
            "Current site / Instagram (if any)",
            "Photos and logo — have them or not",
        ],
        formNote: "About 1 minute on your phone. Your design arrives within 3 business days of answering.",
        cta: <>About 1 minute to answer. Your design arrives within 3 business days.</>,
    },
    pricing: {
        label: "WHY IT'S FREE & WHAT COMES NEXT",
        title: "Why it's free — and what a full site costs.",
        lead: "No tricks, no catch. Here's everything up front.",
        whyTitle: "Why we can do this for free",
        whyP1: (
            <>
                AI-powered production has dramatically cut the cost of building a single homepage. We put those savings into letting you see the real thing before you sign. Giving you something concrete to judge means fewer regrets on both sides.
            </>
        ),
        whyP2: (
            <>
                Only the people who see it and like it move forward. For us, that&rsquo;s the healthiest way to work &mdash; we only take on projects that are a genuine fit.
            </>
        ),
        nextLabel: "LIKE IT? MOVE TO FULL PRODUCTION",
        nextTitle: <>We take the preview design <br className="md:hidden" /> all the way to launch.</>,
        nextLead: (
            <>
                These are the terms if you go ahead. We tell you the price and the term before you apply, and we never add a setup fee later.
            </>
        ),
    },
    terms: {
        label: "FULL PRODUCTION TERMS",
        heading: "Terms if you go ahead",
        lead: (
            <>
                The preview is free. These terms apply only if you see the design and decide to take it to launch.
            </>
        ) as React.ReactNode,
        items: [
            { k: "Setup fee", v: "¥0" },
            { k: "Monthly", v: "¥8,980 (incl. tax)" },
            { k: "Pages built", v: "Up to 10" },
            { k: "Edits and updates", v: "Unlimited" },
            { k: "Domain and hosting", v: "Included in the monthly fee" },
            { k: "Minimum term", v: "1 year" },
            { k: "Billing starts", v: "On the contract date" },
            { k: "First-year total", v: "¥107,760 (incl. tax)" },
        ],
        notes: [
            "Nothing is charged when you view the preview. Billing starts on the contract date.",
            "After one year or more on contract, the site can be transferred to you.",
            "Ongoing growth support — Google Maps, social media, ongoing SEO, and building and running a LINE Official Account — is not included in the monthly fee. We quote it separately based on what you need.",
            "At the preview stage we make one round of adjustments for free. Unlimited edits and updates start after the contract.",
        ],
    },
    promises: {
        label: "THREE PROMISES",
        title: <>Three promises, so you can apply with confidence.</>,
        items: [
            { t: "The preview is completely free", d: "We'll never bill you afterward. You pay only if you like it and choose to move to full production." },
            { t: "Say no, and we won't chase you", d: "“Not this time” is the end of the conversation. No sales calls, no follow-up nudges." },
            { t: "No contract, no verbal commitments", d: "At the preview stage, we ask you to promise nothing. Just look and decide. We go through the terms with you again if you decide to go ahead." },
        ],
    },
    target: {
        label: "WHO IT'S FOR",
        title: <>Reserved for business owners who are serious about building a website.</>,
        lead: "This isn't an open-to-anyone campaign. Each month we set aside production time for 10 real businesses that genuinely want a website. We focus on schools and studios — English, dance, ballet, music — where a trial lesson is how people join. Shops and other businesses are welcome to ask. After you apply, we do a quick check, and we may decline if it's not a fit.",
        condLabel: (n: number) => `CONDITION ${n}`,
        conditions: [
            { icon: BadgeCheck, t: "We can verify your business", d: "A business name, social media account, Google Maps listing, existing website, or business registration — any one of these." },
            { icon: UserRoundCheck, t: "You can make the decision", d: "Owner, founder, or the person responsible for the website." },
            { icon: Lock, t: "You genuinely plan to build a site", d: "You'd seriously consider full production if you like the preview. Not for reference-gathering or fellow web professionals." },
        ],
        forLabel: "THIS IS FOR YOU IF",
        forWho: [
            "You run a business (or have a confirmed opening date) and need a website",
            "You want trial lesson sign-ups and enquiries to come in more clearly",
            "You're comparing agencies but can't decide without seeing a finished look",
            "You'd rather see the real thing before committing",
            "You'd seriously consider full production if you like it",
        ],
        notForLabel: "NOT A FIT IF",
        notForWho: [
            "You're a fellow web professional (agency, designer, freelancer)",
            "You just want design references or a comparison quote",
            "You have no plans or budget for a website yet",
            "We can't verify your business",
        ],
        notForNote: "If any of these apply, we may decline at the check stage. It's how we keep the spots for people who are serious — thank you for understanding.",
        whyTenTitle: "Why only 10 a month",
        whyTenP: (
            <>
                The preview is built with the same care, by the same people, as a full site. Ten a month is the most we can take without cutting corners &mdash; so we reserve them for businesses that genuinely plan to build. Once they&rsquo;re full, we&rsquo;ll offer you the following month.
            </>
        ),
    },
    faq: {
        label: "FAQ",
        title: "Frequently asked questions",
        items: [
            { q: "Is it really free? Will I be billed later?", a: "Yes, the preview is free, and we'll never bill you afterward. The only cost is full production — if you like the design and want us to take it to launch. Full production is ¥0 setup plus ¥8,980 a month (incl. tax), on a one-year minimum term." },
            { q: "If I say no, will you keep contacting me?", a: "No. “Not this time” ends it. We won't reach out to follow up." },
            { q: "Do I get the design files?", a: "The preview comes as desktop and mobile images. Editable files and code are delivered when you commission full production." },
            { q: "I don't have photos or a logo. Is that okay?", a: "Absolutely. As long as we know your industry and what you want to say, we'll build a layout and design that fits. We'll sort out photos and other assets together during full production." },
            { q: "What does the “check” involve?", a: "Two things: that you're actually running a business (business name, social media, Google Maps, existing site, etc.), and that you genuinely plan to build a website. It's not a formal screening — we simply confirm it in the LINE conversation." },
            { q: "Can sole proprietors or pre-opening businesses apply?", a: "Yes. Sole proprietors and businesses with a confirmed opening date are welcome. Just tell us something that shows the business — your trade name, planned opening date, social media, and so on." },
            { q: "I'm in the web business myself. Can I apply for reference?", a: "Sorry, we don't accept applications from fellow web or design professionals, or from anyone looking for reference material. These spots are for business owners who are serious about building a website." },
            { q: "Can I ask for changes after seeing the preview?", a: "Yes. At the preview stage we make one round of adjustments for free. If you move to full production, the preview becomes the starting point and we refine colors, photos, and copy to your liking. After the contract, there is no limit on edits or updates." },
            { q: "What does full production cost?", a: "¥0 setup and ¥8,980 a month, tax included. That covers up to 10 pages, unlimited edits and updates, and the domain and hosting fees. The minimum term is one year, so the first-year total is ¥107,760 (incl. tax)." },
            { q: "When does billing start?", a: "On the contract date. Nothing is charged when you view the preview, and nothing is charged if you say no." },
            { q: "Can you also run our Google Maps and social media?", a: "We're happy to discuss it, but ongoing growth support — Google Maps, social media, ongoing SEO, and building and running a LINE Official Account — is not included in the ¥8,980 monthly fee. We quote it separately based on what you need." },
            { q: "Will the site belong to us?", a: "After one year or more on contract, the site can be transferred to you. We explain how before you sign." },
            { q: "We're not a school. Can we still apply?", a: "Yes. Schools and studios are our focus, but shops and other businesses are welcome to ask. Tell us about your business in the hearing sheet." },
            { q: "Why can you do this for free?", a: "AI-powered production has dramatically lowered the cost of building a single homepage. We put those savings into letting you see the real thing first. We believe handing you something concrete before you sign means fewer regrets for everyone." },
        ],
    },
    apply: {
        title: <>Want to see your homepage first?</>,
        lead: <>Add our official LINE below and the hearing sheet (about 1 minute) arrives right away. Answer it and you&rsquo;re done. Not ready yet? Questions are welcome too &mdash; just message us on LINE.</>,
        formButton: "Apply on LINE",
        formButtonNote: (<>Add us and the hearing sheet (about 1 min) arrives right away · the preview is ¥0 · delivered within 3 business days · nothing is charged at this point</>) as React.ReactNode,
        psAlt: "Shun Kurahayashi, Founder",
        psLabel: "P.S. FROM THE FOUNDER",
        psText: (
            <>
                &ldquo;It&rsquo;s probably expensive.&rdquo; &ldquo;I&rsquo;m not sure it&rsquo;ll actually work.&rdquo; Those are the two reasons most people hesitate on a website. So we decided to show you the real thing first. Skip the sales pitch &mdash; look at the design. And if you don&rsquo;t like it, just say no.
            </>
        ),
        psSign: "NEXT VALLEY Founder ",
        psName: "Shun Kurahayashi",
    },
    footer: {
        tagline: <>NEXT VALLEY / Founder: Shun Kurahayashi / A team that puts AI to work for your sales and operations</>,
        links: [
            ["/", "Home"],
            ["/company", "About"],
            ["/tokusho", "Legal notice (JP)"],
            ["/privacy", "Privacy policy (JP)"],
        ],
    },
    sticky: "Get your free preview (1 min)",
};

export const previewCopy: Record<Lang, typeof ja> = { ja, en };
export type PreviewCopy = typeof ja;

/* ───────────────────────── metadata ───────────────────────── */

const metaJa: Metadata = {
    title: "無料プレビュー制作｜トップページのデザイン案を契約前に無料でお作りします（毎月10社限定）",
    description:
        "埼玉の小さな会社・店舗・教室へ。契約の前に、トップページのデザイン案（PC・スマホ）を無料でお作りします。店舗・その他の業種もご相談ください。ヒアリングシートに答えるだけ、3営業日以内にお届け。正式制作は初期制作費0円・月額8,980円（税込）・最低契約期間1年間で、料金がかかり始めるのは正式契約日からです。毎月10社限定。",
    alternates: { canonical: "https://www.nextvalley-jpn.com/preview" },
    openGraph: {
        title: "先に、見せます。契約前に、あなたのトップページ案を無料で。｜NEXT VALLEY",
        description: "トップページのデザイン案を無料で。3営業日以内にPC・スマホのデザイン案が届きます。プレビューは費用0円・契約不要。正式制作は初期0円・月額8,980円（税込）。毎月10社限定。",
        url: "https://www.nextvalley-jpn.com/preview",
        siteName: "NEXT VALLEY",
        locale: "ja_JP",
        type: "website",
        images: [{ url: "/og-preview.png", width: 1200, height: 630, alt: "先に、見せます。あなたのトップページを、無料で。" }],
    },
    twitter: { card: "summary_large_image", title: "先に、見せます。契約前に、あなたのトップページ案を無料で。｜NEXT VALLEY", images: ["/og-preview.png"] },
};

const metaEn: Metadata = {
    title: "Free Website Preview | See your school's homepage design before you sign (10 businesses a month)",
    description:
        "Planning a new website? Before any contract, we design your school's or studio's homepage — desktop and mobile — for free. Full production is ¥0 setup plus ¥8,980 a month (incl. tax), on a one-year minimum term, billed from the contract date. Sole proprietors welcome. Fill in one short hearing sheet and receive it within 3 business days. Don't like it? That's the end. No fees, no sales calls. Limited to 10 businesses a month.",
    alternates: { canonical: "https://www.nextvalley-jpn.com/en/preview" },
    openGraph: {
        title: "See it first. Your homepage design, free, before you sign. | NEXT VALLEY",
        description: "One short hearing sheet. Desktop and mobile designs within 3 business days. ¥0, no contract, 10 businesses a month.",
        url: "https://www.nextvalley-jpn.com/en/preview",
        siteName: "NEXT VALLEY",
        locale: "en_US",
        type: "website",
        images: [{ url: "/og-preview.png", width: 1200, height: 630, alt: "See it first. Your homepage, free." }],
    },
    twitter: { card: "summary_large_image", title: "See it first. Your homepage design, free, before you sign. | NEXT VALLEY", images: ["/og-preview.png"] },
};

export function previewMetadata(lang: Lang): Metadata {
    return lang === "en" ? metaEn : metaJa;
}
