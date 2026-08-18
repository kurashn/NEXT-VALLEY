import type { Metadata } from "next";
import { PricePage, priceMetadata } from "./PricePage";

export const metadata: Metadata = priceMetadata("ja");

export default function Page() {
    return <PricePage lang="ja" />;
}
