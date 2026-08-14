// Server Component — セクション末の文脈CTA（読み終わった瞬間に押せる導線）

import React from "react";
import { ArrowRight } from "lucide-react";

export function InlineCTA({ message, button }: { message: React.ReactNode; button: string }) {
    return (
        <div className="mt-12 flex flex-col items-center gap-4 text-center md:mt-14">
            <p className="text-[15px] font-bold leading-[1.9] text-ink">{message}</p>
            <a
                href="https://lin.ee/N4QXdJL"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-coral-deep px-9 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
            >
                {button}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
        </div>
    );
}
