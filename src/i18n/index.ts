// 多言語（日本語 / 英語）の共通ユーティリティ。
// 日本語は従来どおりルート直下（/）、英語は /en 配下。各コンポーネントは lang を受け取り、
// ファイル内の copy = { ja, en } から文言を引く（辞書はコンポーネントごとに持つ）。

export type Lang = "ja" | "en";
export const LANGS: readonly Lang[] = ["ja", "en"] as const;

/** 英語版が存在するパス（これ以外は言語切替で /en トップへ誘導） */
export const EN_PATHS = ["/", "/preview", "/shindan", "/contact", "/company"] as const;

/** 内部リンクに言語プレフィックスを付ける。外部・mailto・#アンカーはそのまま */
export function withLang(lang: Lang, href: string): string {
    if (lang === "ja") return href;
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
    if (href === "/") return "/en";
    if (href.startsWith("/#")) return "/en" + href; // "/#service" → "/en/#service"
    if (href.startsWith("/en")) return href;
    return "/en" + href;
}

/** 現在のパスから言語を判定 */
export function langFromPath(pathname: string): Lang {
    return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ja";
}

/** 言語切替先のパス。英語版が無いページからは英語トップへ */
export function switchLangPath(pathname: string, to: Lang): string {
    const clean = pathname.replace(/\/$/, "") || "/";
    const base = clean === "/en" ? "/" : clean.startsWith("/en/") ? clean.slice(3) : clean;
    if (to === "ja") return base;
    const supported = (EN_PATHS as readonly string[]).includes(base);
    return supported ? withLang("en", base) : "/en";
}

/** metadata.alternates 用（hreflang） */
export function alternatesFor(path: string, lang: Lang = "ja") {
    const ja = path;
    const en = withLang("en", path);
    return {
        canonical: lang === "en" ? en : ja,
        languages: { ja, en, "x-default": ja },
    } as const;
}

/** ページ内の言語属性（英語ページでは <main lang="en"> を付け、CSS と支援技術に伝える） */
export const langAttr = (lang: Lang) => (lang === "en" ? { lang: "en" } : {});
