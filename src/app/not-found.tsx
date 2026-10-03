// ページが見つからないとき（404）。ネクバレ君がお昼寝中
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mascot } from "@/components/Mascot";

export const metadata: Metadata = {
    title: "ページが見つかりません",
    robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar variant="light" />
            <section className="px-4 pb-24 pt-32 md:px-6 md:pt-40">
                <div className="mx-auto max-w-2xl text-center">
                    <Mascot pose="sleep" sizes="260px" className="mx-auto w-[200px] md:w-[240px]" />
                    <h1 className="mt-6 text-[clamp(1.5rem,3.6vw,2.2rem)] font-bold leading-[1.4] text-navy">ページが見つかりませんでした</h1>
                    <p className="mt-4 text-[15px] leading-[2] text-ink-sub md:text-[16px]">
                        <span className="nowrap">ページが移動したか、</span><span className="nowrap">URLが変わった可能性があります。</span>
                    </p>
                    <ul className="mt-8 flex flex-wrap justify-center gap-3 text-[15px] font-bold">
                        {[
                            ["/", "トップページへ"],
                            ["/blog", "お役立ちコラム"],
                            ["/preview", "無料でデザイン案を見る"],
                            ["/contact", "お問い合わせ"],
                        ].map(([href, label]) => (
                            <li key={href}>
                                <Link href={href} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 text-navy transition-colors hover:border-coral hover:text-coral-deep">{label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <Footer />
        </main>
    );
}
