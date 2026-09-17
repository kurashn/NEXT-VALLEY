import type { Metadata } from "next";
import { ClassroomPage } from "./ClassroomPage";
import { alternatesFor } from "@/i18n";

export const metadata: Metadata = {
    title: "教室・スクールのホームページ制作・管理｜初期費用0円・月額8,980円",
    description:
        "英語・ダンス・バレエ・音楽などの教室・スクール向け。教室の魅力が伝わり、体験申込につながるホームページを、初期費用0円・月額8,980円（税込）で制作・管理します。デザイン案は無料。全国オンライン対応。",
    alternates: alternatesFor("/classroom"),
    openGraph: {
        title: "教室・スクールのホームページ制作・管理 | NEXT VALLEY",
        description:
            "教室の魅力が伝わり、体験申込につながるホームページを、初期費用0円・月額8,980円（税込）で。デザイン案は無料でご確認いただけます。",
        url: "https://www.nextvalley-jpn.com/classroom",
        siteName: "NEXT VALLEY",
        locale: "ja_JP",
        type: "website",
    },
};

export default function Page() {
    return <ClassroomPage lang="ja" />;
}
