// 制作実績の詳細ページ（詳細の原稿がある案件だけ）
import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { heavy, V4 } from "@/lib/fonts-v4";
import { serif } from "@/components/ui/SerifHeading";
import { DETAILED, findWork } from "@/lib/works";

const LINE = "https://lin.ee/N4QXdJL";
const RULE = "rgba(20,51,90,0.14)";

export function generateStaticParams() {
    return DETAILED.map((w) => ({ slug: w.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const w = findWork(slug);
    if (!w) return {};
    return {
        title: `${w.name}｜制作実績`,
        description: w.summary,
        alternates: { canonical: `https://www.nextvalley-jpn.com/works/${w.slug}` },
        openGraph: { title: `${w.name}｜制作実績 | NEXT VALLEY`, description: w.summary, url: `https://www.nextvalley-jpn.com/works/${w.slug}` },
    };
}

function H2({ en, children }: { en: string; children: React.ReactNode }) {
    return (
        <div className="mb-6">
            <p className="text-[13px] italic" style={{ fontFamily: serif, color: V4.teal }}>{en}</p>
            <h2 className={`${heavy.className} mt-1 text-[22px] leading-[1.4] md:text-[28px]`} style={{ color: V4.navy }}>{children}</h2>
        </div>
    );
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const w = findWork(slug);
    if (!w || !w.detail) notFound();
    const d = w.detail;
    const i = DETAILED.findIndex((x) => x.slug === w.slug);
    const prev = DETAILED[(i - 1 + DETAILED.length) % DETAILED.length];
    const next = DETAILED[(i + 1) % DETAILED.length];

    return (
        <main className="min-h-screen bg-white">
            <Navbar variant="light" />

            <article>
                <header className="px-4 pb-10 pt-32 md:px-6 md:pb-14 md:pt-40" style={{ backgroundColor: "#FDFAF3" }}>
                    <div className="mx-auto max-w-4xl">
                        <nav aria-label="パンくず" className="mb-6 text-[13px]" style={{ color: V4.sub }}>
                            <Link href="/" className="underline underline-offset-4">トップ</Link>
                            <span className="mx-2">/</span>
                            <Link href="/works" className="underline underline-offset-4">制作実績</Link>
                        </nav>
                        <p className="text-[13.5px] font-bold" style={{ color: V4.teal }}>{w.label}</p>
                        <h1 className={`${heavy.className} mt-2 text-[clamp(1.7rem,4.4vw,2.8rem)] leading-[1.35] tracking-[-0.02em]`} style={{ color: V4.navy }}>{w.name}</h1>
                        <p className="mt-4 text-left text-[15.5px] leading-[1.95] md:text-[17px]" style={{ color: V4.navy }}>{w.summary}</p>
                    </div>
                </header>

                <div className="px-4 md:px-6" style={{ background: "linear-gradient(#FDFAF3 0 50%, #fff 50% 100%)" }}>
                    <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border bg-white shadow-[0_24px_60px_rgba(20,51,90,0.12)]" style={{ borderColor: RULE }}>
                        <Image src={w.image} alt={`${w.name}のホームページ`} priority placeholder="blur" sizes="(max-width: 900px) 100vw, 896px" className="h-auto w-full" />
                    </div>
                </div>

                <div className="px-4 py-12 md:px-6 md:py-16">
                    <div className="mx-auto max-w-4xl">
                        <dl className="grid gap-x-10 gap-y-2 rounded-2xl p-6 md:grid-cols-[auto_1fr] md:gap-y-5 md:p-8 [&>dd]:mb-3 md:[&>dd]:mb-0" style={{ backgroundColor: "#F6F9FA" }}>
                            <dt className="text-[13px] font-bold" style={{ color: V4.sub }}>業種</dt>
                            <dd className="text-[15px]" style={{ color: V4.navy }}>{w.label}</dd>
                            <dt className="text-[13px] font-bold" style={{ color: V4.sub }}>担当した範囲</dt>
                            <dd>
                                <ul className="flex flex-wrap gap-2">
                                    {w.scope.map((s) => (
                                        <li key={s} className="rounded-full bg-white px-3 py-1 text-[13px]" style={{ color: V4.navy, border: `1px solid ${RULE}` }}>{s}</li>
                                    ))}
                                </ul>
                            </dd>
                            {w.url && (
                                <>
                                    <dt className="text-[13px] font-bold" style={{ color: V4.sub }}>サイト</dt>
                                    <dd>
                                        <a href={w.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1 break-all text-[15px] font-bold underline underline-offset-4" style={{ color: V4.navy }}>
                                            {w.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                                        </a>
                                    </dd>
                                </>
                            )}
                        </dl>

                        {d.result && (
                            <section className="mt-14">
                                <H2 en="Result">成果</H2>
                                <ul className="grid gap-4 sm:grid-cols-2">
                                    {d.result.map((r) => (
                                        <li key={r.label} className="rounded-2xl border p-6" style={{ borderColor: RULE }}>
                                            <p className="whitespace-nowrap text-left text-[clamp(1.8rem,5vw,2.6rem)] font-bold leading-none" style={{ color: V4.coralDeep }}>
                                                {r.value.split(/([^\x00-\x7F→]+)/).map((seg, k) =>
                                                    /[^\x00-\x7F→]/.test(seg)
                                                        ? <span key={k} className={`${heavy.className} ml-1 text-[0.5em]`}>{seg}</span>
                                                        : <span key={k} className="italic" style={{ fontFamily: serif }}>{seg}</span>
                                                )}
                                            </p>
                                            <p className="mt-3 text-left text-[14px]" style={{ color: V4.sub }}>{r.label}</p>
                                        </li>
                                    ))}
                                </ul>
                                {d.resultNote && <p className="mt-4 text-left text-[13.5px] leading-[1.9]" style={{ color: V4.sub }}>{d.resultNote}</p>}
                            </section>
                        )}

                        {d.before && (
                            <section className="mt-14">
                                <H2 en="Before">ご相談時の状態</H2>
                                <ul className="space-y-3">
                                    {d.before.map((b) => (
                                        <li key={b} className="flex gap-3 text-[15px] leading-[1.9]" style={{ color: V4.navy }}>
                                            <span aria-hidden className="mt-[0.75em] block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: V4.coralDeep }} />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {d.did && (
                            <section className="mt-14">
                                <H2 en="What we did">やったこと</H2>
                                <ol className="border-t" style={{ borderColor: RULE }}>
                                    {d.did.map((x, n) => (
                                        <li key={x.t} className="grid gap-x-6 gap-y-1 border-b py-6 md:grid-cols-[64px_1fr]" style={{ borderColor: RULE }}>
                                            <span className="text-[30px] font-bold italic leading-none md:text-[36px]" style={{ fontFamily: serif, color: n % 2 === 0 ? V4.coralDeep : V4.teal }}>{String(n + 1).padStart(2, "0")}</span>
                                            <div>
                                                <h3 className={`${heavy.className} text-[17px] leading-[1.6] md:text-[19px]`} style={{ color: V4.navy }}>{x.t}</h3>
                                                <p className="mt-2 text-left text-[15px] leading-[1.95]" style={{ color: V4.sub }}>{x.d}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        )}

                        {d.voice && (
                            <section className="mt-14">
                                <H2 en="Voice">お客様の声</H2>
                                <blockquote className="rounded-2xl p-7 md:p-9" style={{ backgroundColor: V4.cream }}>
                                    {d.voice.map((v, n) => (
                                        <p key={n} className={`text-left text-[15.5px] leading-[2.05] ${n ? "mt-4" : ""}`} style={{ color: V4.navy }}>{v}</p>
                                    ))}
                                    <footer className="mt-5 text-[13.5px] font-bold" style={{ color: V4.sub }}>{w.name}</footer>
                                </blockquote>
                            </section>
                        )}

                        {d.article && (
                            <p className="mt-10">
                                <Link href={d.article.href} className="group flex items-center justify-between gap-4 rounded-2xl border p-5 md:p-6" style={{ borderColor: RULE }}>
                                    <span>
                                        <span className="block text-[12.5px] font-bold" style={{ color: V4.teal }}>くわしい経過を、記事で公開しています</span>
                                        <span className={`${heavy.className} mt-1 block text-[15.5px] leading-[1.6] md:text-[17px]`} style={{ color: V4.navy }}>{d.article.label}</span>
                                    </span>
                                    <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" style={{ color: V4.coralDeep }} aria-hidden />
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </article>

            <section className="px-4 py-14 md:px-6 md:py-20" style={{ backgroundColor: V4.mist }}>
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className={`${heavy.className} text-[clamp(1.4rem,3.2vw,2.1rem)] leading-[1.5]`} style={{ color: V4.navy }}>
                        <span className="nowrap">あなたの事業なら、</span><span className="nowrap">どんなホームページになるか。</span>
                    </h2>
                    <p className="mt-3 text-[15px] leading-[1.9]" style={{ color: V4.navy }}>
                        <span className="nowrap">契約の前に、</span><span className="nowrap">トップページのデザイン案を</span><span className="nowrap">無料でお作りします。</span>
                    </p>
                    <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <a href={LINE} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full px-7 text-[16px] font-bold text-white sm:w-auto" style={{ backgroundColor: V4.coralDeep }}>
                            LINEで無料プレビューを申し込む <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </a>
                        <Link href="/contact" className="inline-flex min-h-[56px] w-full items-center justify-center rounded-full border-2 bg-white px-7 text-[15px] font-bold sm:w-auto" style={{ borderColor: V4.navy, color: V4.navy }}>
                            協業・制作のご相談
                        </Link>
                    </div>
                </div>
            </section>

            <nav aria-label="ほかの実績" className="px-4 py-10 md:px-6">
                <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
                    <Link href={`/works/${prev.slug}`} className="flex min-h-[56px] items-center gap-2 text-[14px] font-bold" style={{ color: V4.navy }}><ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />{prev.name}</Link>
                    <Link href="/works" className="flex min-h-[56px] items-center justify-center rounded-full border text-[14px] font-bold" style={{ borderColor: RULE, color: V4.navy }}>実績の一覧へ</Link>
                    <Link href={`/works/${next.slug}`} className="flex min-h-[56px] items-center justify-end gap-2 text-right text-[14px] font-bold" style={{ color: V4.navy }}>{next.name}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden /></Link>
                </div>
            </nav>

            <Footer />
        </main>
    );
}
