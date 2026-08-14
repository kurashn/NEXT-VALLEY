import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SerifHeading } from "@/components/ui/SerifHeading";
import { ShindanTool } from "@/components/ShindanTool";

export const metadata: Metadata = {
    title: "Web集客セルフ診断（無料・3分）",
    description:
        "15の質問に答えるだけで、あなたの会社のWeb集客の弱点が分かる無料セルフ診断。検索で見つからない、問い合わせが来ない、何から手を付ければいいか分からない。その原因をその場で特定します。",
};

export default function ShindanPage() {
    return (
        <main className="min-h-screen bg-base text-ink">
            <Navbar />
            <section className="px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-36">
                <div className="mx-auto max-w-3xl">
                    <h1 className="sr-only">Web集客セルフ診断（無料・3分）</h1>
                    <SerifHeading en="Check" jp="Web集客セルフ診断" />
                    <ShindanTool />
                </div>
            </section>
            <Footer />
        </main>
    );
}
