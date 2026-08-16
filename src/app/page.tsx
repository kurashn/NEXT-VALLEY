import type { Metadata } from "next";
import { HomePage } from "./HomePage";
import { alternatesFor } from "@/i18n";

export const metadata: Metadata = { alternates: alternatesFor("/") };

export default function Home() {
  return <HomePage lang="ja" />;
}
