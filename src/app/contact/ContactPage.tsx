// お問い合わせページ（Server Component）— metadata とページ枠。フォーム本体は ContactForm.tsx（Client）
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { langAttr, type Lang } from "@/i18n";
import { ContactForm } from "./ContactForm";

/** ja は従来どおり metadata 無し（layout の既定を継承）。en のみ英語 metadata を返す */
export function contactMetadata(lang: Lang): Metadata {
    if (lang === "ja") return {};
    return {
        title: "Contact",
        description:
            "Get in touch with NEXT VALLEY. Free site check, website and landing page design, marketing, and AI automation for small businesses in Japan. We reply within 2 business days.",
        openGraph: {
            title: "Contact | NEXT VALLEY",
            description: "Takes about 2 minutes. We reply within 2 business days. No pushy sales calls, ever.",
            url: "https://www.nextvalley-jpn.com/en/contact",
            siteName: "NEXT VALLEY",
            locale: "en_US",
            type: "website",
        },
    };
}

export function ContactPage({ lang = "ja" }: { lang?: Lang }) {
    return (
        <main className="min-h-screen bg-base text-ink" {...langAttr(lang)}>
            <Navbar lang={lang} />
            <ContactForm lang={lang} />
            <Footer lang={lang} />
        </main>
    );
}
