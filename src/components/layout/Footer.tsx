import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo-new.png";

const footerLinks = [
    { name: "事業情報", href: "/company" },
    { name: "プライバシーポリシー", href: "/privacy" },
    { name: "利用規約", href: "/terms" },
    { name: "特商法表記", href: "/tokusho" },
    { name: "お問い合わせ", href: "/contact" },
    { name: "お役立ちコラム", href: "/blog" },
];

export function Footer() {
    return (
        <footer className="border-t border-navy-line bg-navy-deep px-4 pb-10 pt-14 md:px-6">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    <div>
                        <Link href="/" className="inline-flex min-h-11 items-center">
                            <Image
                                src={logo}
                                alt="NEXT VALLEY"
                                width={180}
                                height={40}
                                className="h-9 w-auto object-contain"
                            />
                        </Link>
                        <p className="mt-4 text-sm text-navy-sub">
                            AI活用で売上と業務を支援する<span className="nowrap">プロチーム</span>
                        </p>
                        <p className="mt-2 text-sm leading-[1.9] text-navy-sub">
                            代表 倉林 駿 ／{" "}
                            <a
                                href="mailto:info@nextvalley-jpn.com"
                                className="underline transition-colors hover:text-white"
                            >
                                info@nextvalley-jpn.com
                            </a>
                        </p>
                    </div>

                    <div className="flex max-w-md flex-wrap gap-x-6 gap-y-1">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="inline-flex min-h-11 items-center text-sm text-navy-sub transition-colors hover:text-white"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <p className="mt-10 border-t border-navy-line pt-6 text-sm text-navy-sub">
                    &copy; {new Date().getFullYear()} NEXT VALLEY
                </p>
            </div>
        </footer>
    );
}
