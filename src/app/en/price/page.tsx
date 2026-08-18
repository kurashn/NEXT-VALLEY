import type { Metadata } from "next";
import { PricePage, priceMetadata } from "@/app/price/PricePage";
import { LangHtml } from "@/i18n/LangHtml";

export const metadata: Metadata = priceMetadata("en");

export default function Page() {
    return (
        <>
            <LangHtml lang="en" />
            <PricePage lang="en" />
        </>
    );
}
