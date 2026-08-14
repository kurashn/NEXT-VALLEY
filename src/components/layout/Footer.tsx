import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import logo from "@/images/logo-new.png";

const siteLinks = [
    { name: "サービス", href: "/#service" },
    { name: "制作実績", href: "/#works" },
    { name: "私たちの強み", href: "/#reason" },
    { name: "料金", href: "/#price" },
    { name: "ご依頼の流れ", href: "/#flow" },
];

const contentLinks = [
    { name: "無料セルフ診断", href: "/shindan" },
    { name: "お役立ちコラム", href: "/blog" },
    { name: "SiteChat", href: "https://sitechat.jp/", external: true },
    { name: "事業情報", href: "/company" },
    { name: "お問い合わせ", href: "/contact" },
];

const legalLinks = [
    { name: "プライバシーポリシー", href: "/privacy" },
    { name: "利用規約", href: "/terms" },
    { name: "特商法表記", href: "/tokusho" },
];

export function Footer() {
    return (
        <footer className="relative bg-navy-deep px-4 pb-10 pt-16 md:px-6">
            {/* 上辺のコーラルライン */}
            <span aria-hidden className="absolute left-0 top-0 h-1 w-full bg-coral" />

            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-12 md:flex-row md:justify-between">
                    {/* ブランド */}
                    <div className="max-w-sm">
                        <Link href="/" className="inline-flex min-h-11 items-center">
                            <Image
                                src={logo}
                                alt="NEXT VALLEY"
                                width={180}
                                height={40}
                                className="h-9 w-auto object-contain"
                            />
                        </Link>
                        <p className="mt-5 text-sm leading-[2] text-navy-sub">
                            AI活用で売上と業務を支援する<span className="nowrap">プロチーム</span>。
                            <br />
                            診断・提案・見積もりは無料です。
                        </p>
                        <a
                            href="https://lin.ee/N4QXdJL"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-coral-deep px-7 text-sm font-bold text-white transition-opacity hover:opacity-90"
                        >
                            <MessageCircle className="h-4 w-4" aria-hidden />
                            LINEで無料診断を受ける
                        </a>
                    </div>

                    {/* リンク列 */}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-14">
                        <div>
                            <p className="mb-4 text-xs font-bold tracking-[0.25em] text-coral">MENU</p>
                            <ul className="space-y-1">
                                {siteLinks.map((l) => (
                                    <li key={l.name}>
                                        <Link
                                            href={l.href}
                                            className="inline-flex min-h-11 min-w-11 items-center text-sm text-navy-sub transition-colors hover:text-white"
                                        >
                                            {l.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="mb-4 text-xs font-bold tracking-[0.25em] text-coral">CONTENTS</p>
                            <ul className="space-y-1">
                                {contentLinks.map((l) =>
                                    l.external ? (
                                        <li key={l.name}>
                                            <a
                                                href={l.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex min-h-11 min-w-11 items-center text-sm text-navy-sub transition-colors hover:text-white"
                                            >
                                                {l.name}
                                            </a>
                                        </li>
                                    ) : (
                                        <li key={l.name}>
                                            <Link
                                                href={l.href}
                                                className="inline-flex min-h-11 min-w-11 items-center text-sm text-navy-sub transition-colors hover:text-white"
                                            >
                                                {l.name}
                                            </Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <p className="mb-4 text-xs font-bold tracking-[0.25em] text-coral">LEGAL</p>
                            <ul className="space-y-1">
                                {legalLinks.map((l) => (
                                    <li key={l.name}>
                                        <Link
                                            href={l.href}
                                            className="inline-flex min-h-11 min-w-11 items-center text-sm text-navy-sub transition-colors hover:text-white"
                                        >
                                            {l.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ボトムバー */}
                <div className="mt-12 flex flex-col gap-2 border-t border-navy-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-navy-sub">&copy; {new Date().getFullYear()} NEXT VALLEY</p>
                    <p className="text-sm text-navy-sub">
                        代表 倉林 駿 ／{" "}
                        <a
                            href="mailto:info@nextvalley-jpn.com"
                            className="underline transition-colors hover:text-white"
                        >
                            info@nextvalley-jpn.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
