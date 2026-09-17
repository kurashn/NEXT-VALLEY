import type { Metadata } from "next";
import { ClassroomPage } from "@/app/classroom/ClassroomPage";
import { alternatesFor } from "@/i18n";

export const metadata: Metadata = {
    title: "Websites for Schools & Studios | No setup fee, ¥8,980/month",
    description:
        "Websites for English, dance, ballet and music schools that show what the school is like and turn visits into trial bookings. No setup fee, ¥8,980 a month including tax. Free design proposal. Online, anywhere in Japan.",
    alternates: alternatesFor("/classroom", "en"),
    openGraph: {
        title: "Websites for Schools & Studios | NEXT VALLEY",
        description:
            "A website that shows what your school is like and turns visits into trial bookings. No setup fee, ¥8,980 a month. Free design proposal first.",
        url: "https://www.nextvalley-jpn.com/en/classroom",
        siteName: "NEXT VALLEY",
        locale: "en_US",
        type: "website",
    },
};

export default function Page() {
    return <ClassroomPage lang="en" />;
}
