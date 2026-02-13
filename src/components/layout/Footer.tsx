import React from "react";
import Link from "next/link";

import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-[#111111] border-t border-white/10 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <a href="#" className="flex items-center gap-2 group">
                    <Image
                        src="/logo-new.png"
                        alt="NEXT VALLEY"
                        width={150}
                        height={34}
                        className="h-9 w-auto object-contain opacity-90 transition-opacity hover:opacity-100"
                    />
                </a>

                <p className="text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} NEXT VALLEY. All rules reversed.
                </p>

                <div className="flex gap-6 flex-wrap justify-center md:justify-end">
                    <Link href="/company" className="text-slate-500 hover:text-white text-sm transition-colors">
                        事業情報
                    </Link>
                    <Link href="/privacy" className="text-slate-500 hover:text-white text-sm transition-colors">
                        プライバシーポリシー
                    </Link>
                    <Link href="/terms" className="text-slate-500 hover:text-white text-sm transition-colors">
                        利用規約
                    </Link>
                    <Link href="/tokusho" className="text-slate-500 hover:text-white text-sm transition-colors">
                        特商法表記
                    </Link>
                    <Link href="/contact" className="text-slate-500 hover:text-white text-sm transition-colors">
                        お問い合わせ
                    </Link>
                    <Link href="/blog" className="text-slate-500 hover:text-white text-sm transition-colors">
                        お役立ちコラム
                    </Link>
                </div>
            </div>
        </footer>
    );
}
