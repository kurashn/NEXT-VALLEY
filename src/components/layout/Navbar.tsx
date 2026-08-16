"use client";

// sample/fv-sankou.png のナビ再現: 深い紺地・白リンク・コーラルの角丸ボタン

import React from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo-new.png";

const navLinks = [
  { name: "サービス", href: "/#service" },
  { name: "3分セルフ診断", href: "/shindan" },
  { name: "無料プレビュー", href: "/preview" },
  { name: "制作実績", href: "/#works" },
  { name: "私たちの強み", href: "/#reason" },
  { name: "お役立ちコラム", href: "/blog" },
  { name: "お問い合わせ", href: "/contact" },
];

export default function Navbar() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);

      if (element) {
        e.preventDefault();
        const offset = 88;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });

        window.history.pushState(null, "", href);
        return;
      }
    }
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-navy-deep">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-20 items-center justify-between gap-6">
          {/* ロゴ */}
          <Link href="/" className="flex min-h-11 shrink-0 items-center">
            <Image
              src={logo}
              alt="NEXT VALLEY"
              width={180}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* デスクトップナビ */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="whitespace-nowrap text-sm font-medium text-white transition-colors hover:text-coral"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA（コーラルの角丸ボタン） */}
          <a
            href="https://lin.ee/N4QXdJL"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-12 shrink-0 items-center gap-3 whitespace-nowrap rounded-lg bg-coral-deep px-6 text-sm font-bold text-white transition-opacity hover:opacity-90 lg:inline-flex"
          >
            LINEで無料診断
            <ArrowRight className="h-4 w-4" />
          </a>

          {/* モバイルナビ */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="メニューを開く"
                  className="flex h-11 w-11 items-center justify-center text-white"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-l border-navy-line bg-navy-deep sm:max-w-xs"
                showCloseButton={false}
              >
                <SheetClose className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-white">
                  <X className="h-6 w-6" />
                  <span className="sr-only">閉じる</span>
                </SheetClose>
                <div className="mt-14 flex flex-col gap-8 px-8">
                  <div className="flex flex-col">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => link.href.startsWith("/#") && handleScroll(e, link.href)}
                        className="border-b border-navy-line py-4 text-base font-medium text-white transition-colors hover:text-coral"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                  <a
                    href="https://lin.ee/N4QXdJL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-coral-deep text-base font-bold text-white"
                  >
                    LINEで無料診断
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
