import type { Metadata } from "next";
import { ShindanPage, shindanMetadata } from "@/app/shindan/ShindanPage";
import { alternatesFor } from "@/i18n";
import { LangHtml } from "@/i18n/LangHtml";

export const metadata: Metadata = { ...shindanMetadata("en"), alternates: alternatesFor("/shindan", "en") };

export default function Page() {
    return (
        <>
            <LangHtml lang="en" />
            <ShindanPage lang="en" />
        </>
    );
}
