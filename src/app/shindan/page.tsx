import type { Metadata } from "next";
import { ShindanPage, shindanMetadata } from "./ShindanPage";
import { alternatesFor } from "@/i18n";

export const metadata: Metadata = { ...shindanMetadata("ja"), alternates: alternatesFor("/shindan") };

export default function Page() {
    return <ShindanPage lang="ja" />;
}
