// 言語まわりの共通ユーティリティ。
// 公開しているのは日本語（/）のみ。英語ページ（/en）は2026年9月に廃止した。
// 各コンポーネントの copy = { ja, en } の en は将来の再開用に残しているだけで、ページからは使わない。

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

/** metadata.alternates 用（日本語のみ。英語ページ廃止に伴い hreflang は出さない） */
export function alternatesFor(path: string, _lang: Lang = "ja") {
    return { canonical: path } as const;
}

/** ページ内の言語属性（英語ページでは <main lang="en"> を付け、CSS と支援技術に伝える） */
export const langAttr = (lang: Lang) => (lang === "en" ? { lang: "en" } : {});
