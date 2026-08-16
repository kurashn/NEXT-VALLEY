"use client";

// ヘッダー用の JP / EN 切替。現在のページに英語版があればその英語版へ、無ければ英語トップへ。
import Link from "next/link";
import { usePathname } from "next/navigation";
import { langFromPath, switchLangPath } from "./index";

export function LangSwitch({ className = "" }: { className?: string }) {
    const pathname = usePathname() || "/";
    const current = langFromPath(pathname);
    const items = [
        { lang: "ja" as const, label: "JP", title: "日本語" },
        { lang: "en" as const, label: "EN", title: "English" },
    ];
    return (
        <div
            className={`inline-flex h-9 shrink-0 items-center overflow-hidden rounded-md border border-white/25 text-xs font-bold tracking-wider ${className}`}
            aria-label={current === "ja" ? "言語切替" : "Language"}
        >
            {items.map((it) => {
                const active = it.lang === current;
                return (
                    <Link
                        key={it.lang}
                        href={switchLangPath(pathname, it.lang)}
                        hrefLang={it.lang}
                        lang={it.lang}
                        title={it.title}
                        aria-current={active ? "page" : undefined}
                        className={`flex h-full min-w-10 items-center justify-center px-2.5 transition-colors ${
                            active ? "bg-white text-navy-deep" : "text-white/85 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        {it.label}
                    </Link>
                );
            })}
        </div>
    );
}
