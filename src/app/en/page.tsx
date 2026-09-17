import type { Metadata } from "next";
import { HomePage } from "../HomePage";
import { alternatesFor } from "@/i18n";

export const metadata: Metadata = {
  title: { absolute: "NEXT VALLEY | A web person you can count on, for small businesses in Saitama" },
  description:
    "Website build, updates and management for small companies, shops and schools: no setup fee, ¥8,980 a month including tax. From northern Saitama, working with clients across Japan online. Free design proposal first.",
  alternates: alternatesFor("/", "en"),
  openGraph: {
    title: "NEXT VALLEY | Web support for small businesses in Saitama",
    description:
      "No setup fee, ¥8,980 a month for a website that is built, updated and managed for you. Marketing support quoted separately. Free design proposal first.",
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
      "A website built, updated and managed for ¥8,980 a month, no setup fee. Free design proposal first.",
  },
};

export default function HomeEn() {
  return <HomePage lang="en" />;
}
