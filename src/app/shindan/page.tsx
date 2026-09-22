import type { Metadata } from "next";
import { ShindanPage } from "./ShindanPage";

/**
 * 今あるホームページの無料診断（/shindan）
 * LINEを追加する前に「何がもらえるか・何を送るか・お金はかからないか」を1画面で伝えるページ。本体は ShindanPage.tsx
 */
export const metadata: Metadata = {
    title: "ホームページの無料診断｜問い合わせが来ない原因と、直す順番をお返しします",
    description:
        "今のホームページのURLをLINEで送るだけ。改善点3〜5個と取り組む順番を、3営業日以内に無料でお返しします。スマホの最初の画面、検索とGoogleマップでの見え方、問い合わせまでの導線を確認。契約・請求なし、追いかける連絡もしません。Wix・Jimdo・ペライチのサイトも診断します。",
    alternates: { canonical: "https://www.nextvalley-jpn.com/shindan" },
    openGraph: {
        title: "問い合わせが来ない原因を、無料でお答えします。｜NEXT VALLEY",
        description: "今のホームページのURLをLINEで送るだけ。改善点と直す順番を3営業日以内にお返しします。診断0円・契約なし。",
        url: "https://www.nextvalley-jpn.com/shindan",
        siteName: "NEXT VALLEY",
        locale: "ja_JP",
        type: "website",
        images: [{ url: "/og-shindan.png", width: 1200, height: 630, alt: "問い合わせが来ない原因を、無料でお答えします。" }],
    },
    twitter: { card: "summary_large_image", title: "問い合わせが来ない原因を、無料でお答えします。｜NEXT VALLEY", images: ["/og-shindan.png"] },
};

export default function Page() {
    return <ShindanPage />;
}
