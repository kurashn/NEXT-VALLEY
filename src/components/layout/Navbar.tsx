"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, Zap, X } from "lucide-react";

import Image from "next/image";

const navLinks = [
  { name: "お悩み", href: "/#problem" },
  { name: "私たちの強み", href: "/#solution" },
  { name: "選ばれる理由", href: "/#strategy" },
  { name: "料金", href: "/#service" },
  { name: "お役立ちコラム", href: "/blog" },
  { name: "お問い合わせ", href: "/contact" },
];

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  // const { scrollY } = useScroll();
  const pathname = usePathname();
  // const router = useRouter(); // router is not used
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  // React useEffect for scroll handling to remove framer-motion dependency for critical path
  React.useEffect(() => {
    const handleScrollChange = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScrollChange);
    return () => window.removeEventListener("scroll", handleScrollChange);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);

      if (element) {
        e.preventDefault();
        const offset = 80;
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome
        ? "bg-[#002335]/90 backdrop-blur-xl border-b border-white/10 shadow-sm"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative">
            <Image
              src="/logo-new.png"
              alt="NEXT VALLEY"
              width={180}
              height={40}
              className="h-10 w-auto object-contain transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-sm font-medium text-white/90 transition-colors relative group hover:text-[#e26c5c]"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e26c5c] transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
            <a href="https://lin.ee/N4QXdJL" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 rounded-full px-6 cursor-pointer">
                <Zap className="w-4 h-4 mr-2" />
                無料相談はこちら
              </Button>
            </a>
          </div>

          {/* Mobile Nav */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#002335]/95 backdrop-blur-xl border-l border-white/10 sm:max-w-xs" showCloseButton={false}>
                <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary text-white">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </SheetClose>
                <div className="flex flex-col gap-8 mt-10 px-8">
                  <div className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => link.href.startsWith("/#") && handleScroll(e, link.href)}
                        className="text-lg font-medium text-white hover:text-[#e26c5c] transition-colors py-2 border-b border-white/10"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                  <a href="https://lin.ee/N4QXdJL" target="_blank" rel="noopener noreferrer" className="mt-4">
                    <Button className="w-full bg-[#e26c5c] hover:bg-[#d05a4b] text-white font-bold shadow-lg rounded-full py-6 text-lg">
                      <Zap className="w-5 h-5 mr-2" />
                      無料相談はこちら
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav >
  );
}
