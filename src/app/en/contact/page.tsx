import type { Metadata } from "next";
import { ContactPage, contactMetadata } from "@/app/contact/ContactPage";
import { alternatesFor } from "@/i18n";
import { LangHtml } from "@/i18n/LangHtml";

export const metadata: Metadata = { ...contactMetadata("en"), alternates: alternatesFor("/contact", "en") };

export default function Page() {
    return (
        <>
            <LangHtml lang="en" />
            <ContactPage lang="en" />
        </>
    );
}
