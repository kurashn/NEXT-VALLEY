import type { Metadata } from "next";
import { CompanyPage, companyMetadata } from "./CompanyPage";
import { alternatesFor } from "@/i18n";

export const metadata: Metadata = { ...companyMetadata("ja"), alternates: alternatesFor("/company") };

export default function Page() {
    return <CompanyPage lang="ja" />;
}
