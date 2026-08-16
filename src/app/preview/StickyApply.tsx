"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Lang } from "@/i18n";

const copy: Record<Lang, string> = {
    ja: "無料プレビューを申し込む（2分）",
    en: "Get your free preview (2 min)",
};

/** モバイル下部の追従ボタン。申込フォーム（#apply）が見えている間は隠す */
export function StickyApply({ lang = "ja" }: { lang?: Lang }) {
    const [hidden, setHidden] = useState(false);
    useEffect(() => {
        const el = document.getElementById("apply");
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.05 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return (
        <div
            className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy-deep/90 p-3 backdrop-blur-md transition-transform duration-300 md:hidden ${hidden ? "translate-y-full" : "translate-y-0"}`}
            style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
            aria-hidden={hidden}
        >
            <a href="#apply" className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-coral-deep text-[17px] font-bold text-white shadow-cta" tabIndex={hidden ? -1 : 0}>
                {copy[lang]}
                <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
        </div>
    );
}
