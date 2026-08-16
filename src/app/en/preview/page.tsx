import type { Metadata } from "next";
import { PreviewPage, previewMetadata } from "@/app/preview/PreviewPage";
import { alternatesFor } from "@/i18n";
import { LangHtml } from "@/i18n/LangHtml";

export const metadata: Metadata = { ...previewMetadata("en"), alternates: alternatesFor("/preview", "en") };

export default function Page() {
    return (
        <>
            <LangHtml lang="en" />
            <PreviewPage lang="en" />
        </>
    );
}
