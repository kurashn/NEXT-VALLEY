"use client";

// LINEのボタン。パソコンで押されたら、lin.ee のQRコード画面に飛ばさず、その場でQRコードを出す
// （8〜9月はパソコンでLINEボタンを押した10人が29回押して、友だち追加まで進んだのは全体で4人だった）
// スマホ・タブレットは今までどおり LINE を開く。計測の line_click は layout.tsx のクリック監視がそのまま送る

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const DESKTOP = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function LineQrLink({ href, children, onClick, ...rest }: Props) {
    const [open, setOpen] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || !window.matchMedia(DESKTOP).matches) return;
        e.preventDefault();
        setOpen(true);
        const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
        g?.("event", "line_qr_open", { event_category: "cta", page_path: location.pathname });
    };

    return (
        <>
            <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick} {...rest}>
                {children}
            </a>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F2540]/55 p-4" onClick={() => setOpen(false)}>
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="line-qr-title"
                        className="relative w-full max-w-[400px] rounded-2xl bg-white px-8 pb-8 pt-9 text-center text-[#0F2540] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/5" aria-label="閉じる">
                            <X className="h-5 w-5" aria-hidden />
                        </button>
                        <p id="line-qr-title" className="text-[20px] font-bold">スマホで読み取ってください</p>
                        <p className="mt-2 text-[14px] leading-[1.8] text-[#3B4457]">スマホのカメラで読み取ると、<br />LINEの友だち追加の画面が開きます。</p>
                        <Image src="/images/line-qr.png" alt="NEXT VALLEY 公式LINEのQRコード" width={232} height={232} className="mx-auto mt-5 h-[232px] w-[232px]" />
                        <a href={href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center text-[14px] font-bold underline underline-offset-4">
                            このパソコンのLINEで開く
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
