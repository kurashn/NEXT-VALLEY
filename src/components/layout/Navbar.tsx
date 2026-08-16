"use client";

// sample/fv-sankou.png のナビ再現: 深い紺地・白リンク・コーラルの角丸ボタン

import React from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo-new.png";
import { withLang, type Lang } from "@/i18n";
import { LangSwitch } from "@/i18n/LangSwitch";

const copy = {
  ja: {
    links: [
      { name: "サービス", href: "/#service" },
      { name: "3分セルフ診断", href: "/shindan" },
      { name: "無料プレビュー", href: "/preview" },
      { name: "制作実績", href: "/#works" },
      { name: "私たちの強み", href: "/#reason" },
      { name: "お役立ちコラム", href: "/blog" },
      { name: "お問い合わせ", href: "/contact" },
    ],
    cta: "LINEで無料診断",
    openMenu: "メニューを開く",
    close: "閉じる",
  },
  en: {
    links: [
      { name: "Services", href: "/#service" },
      { name: "3-Min Self-Check", href: "/shindan" },
      { name: "Free Preview", href: "/preview" },
      { name: "Our Work", href: "/#works" },
      { name: "Why Us", href: "/#reason" },
      { name: "About", href: "/company" },
      { name: "Contact", href: "/contact" },
    ],
    cta: "Free Site Check on LINE",
    openMenu: "Open menu",
    close: "Close",
  },
} as const;

export default function Navbar({ lang = "ja" }: { lang?: Lang }) {
  const t = copy[lang];
  // PCナビは xl(1280px) から（lg 幅ではリンク＋CTA＋言語切替が収まらないため、それ未満はハンバーガー）
  const deskNav = "hidden items-center gap-5 xl:flex 2xl:gap-7";
  const deskCta = "xl:inline-flex";
  const deskSwitch = "hidden shrink-0 xl:block";
  const mobileWrap = "flex shrink-0 items-center gap-2 xl:hidden";
  const navLinks = t.links.map((l) => ({ ...l, href: withLang(lang, l.href) }));
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    const m = href.match(/^(?:\/en)?\/#(.+)$/);
    if (m) {
      const targetId = m[1];
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
        <div className="flex h-20 items-center justify-between gap-4 xl:gap-6">
          {/* ロゴ */}
          <Link href={withLang(lang, "/")} className="flex min-h-11 shrink-0 items-center">
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
          <div className={deskNav}>
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
            className={`hidden h-12 shrink-0 items-center gap-3 whitespace-nowrap rounded-lg bg-coral-deep px-6 text-sm font-bold text-white transition-opacity hover:opacity-90 ${deskCta}`}
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </a>

          {/* 言語切替（PC） */}
          <div className={deskSwitch}>
            <LangSwitch />
          </div>

          {/* モバイルナビ */}
          <div className={mobileWrap}>
            <LangSwitch />
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label={t.openMenu}
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
                  <span className="sr-only">{t.close}</span>
                </SheetClose>
                <div className="mt-14 flex flex-col gap-8 px-8">
                  <div className="flex flex-col">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => /^(?:\/en)?\/#/.test(link.href) && handleScroll(e, link.href)}
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
                    {t.cta}
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
