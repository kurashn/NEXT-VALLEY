import type { Metadata } from "next";
import { CompanyPage, companyMetadata } from "@/app/company/CompanyPage";
import { alternatesFor } from "@/i18n";
import { LangHtml } from "@/i18n/LangHtml";

export const metadata: Metadata = { ...companyMetadata("en"), alternates: alternatesFor("/company", "en") };

export default function Page() {
    return (
        <>
            <LangHtml lang="en" />
            <CompanyPage lang="en" />
        </>
    );
}
