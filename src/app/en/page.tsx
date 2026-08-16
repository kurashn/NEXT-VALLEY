import type { Metadata } from "next";
import { HomePage } from "../HomePage";
import { alternatesFor } from "@/i18n";

export const metadata: Metadata = {
  title: { absolute: "NEXT VALLEY | AI-powered marketing & web team in Japan" },
  description:
    "Not getting enough customers? Buried in busywork? NEXT VALLEY is an AI-powered team in Japan that helps small businesses grow — from marketing strategy to websites and landing pages. Free site check, proposal and quote.",
  alternates: alternatesFor("/", "en"),
  openGraph: {
    title: "NEXT VALLEY | AI-powered marketing & web team in Japan",
    description:
      "An AI-powered team that recommends only what fits your goals — marketing, websites, landing pages — and helps you win more customers with less busywork. Free site check, proposal and quote.",
    url: "https://www.nextvalley-jpn.com/en",
    siteName: "NEXT VALLEY",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NEXT VALLEY - AI-powered marketing & web team in Japan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXT VALLEY | AI-powered marketing & web team in Japan",
    description:
      "Grow your business, powered by AI. Marketing, websites and landing pages — only what fits your goals. Free site check, proposal and quote.",
  },
};

export default function HomeEn() {
  return <HomePage lang="en" />;
}
