import type { Metadata } from "next";
import { ContactPage, contactMetadata } from "./ContactPage";
import { alternatesFor } from "@/i18n";

export const metadata: Metadata = { ...contactMetadata("ja"), alternates: alternatesFor("/contact") };

export default function Page() {
    return <ContactPage lang="ja" />;
}
