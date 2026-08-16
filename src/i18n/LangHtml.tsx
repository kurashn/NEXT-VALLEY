"use client";

// ルートレイアウトの <html lang="ja"> を、英語ページでは "en" に切り替える（クライアント側）。
import { useEffect } from "react";
import type { Lang } from "./index";

export function LangHtml({ lang }: { lang: Lang }) {
    useEffect(() => {
        const prev = document.documentElement.lang;
        document.documentElement.lang = lang;
        return () => {
            document.documentElement.lang = prev || "ja";
        };
    }, [lang]);
    return null;
}
