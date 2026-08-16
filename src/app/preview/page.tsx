import type { Metadata } from "next";
import { PreviewPage, previewMetadata } from "./PreviewPage";
import { alternatesFor } from "@/i18n";

/**
 * 無料プレビュー制作キャンペーン LP（/preview）— 日本語版
 * 本体は PreviewPage.tsx（英語版 /en/preview は <PreviewPage lang="en" /> を使う）
 */
export const metadata: Metadata = { ...previewMetadata("ja"), alternates: alternatesFor("/preview") };

export default function Page() {
    return <PreviewPage lang="ja" />;
}
