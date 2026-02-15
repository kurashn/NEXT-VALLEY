// Server Component

import Link from 'next/link';
import NextImage from 'next/image';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRight } from "lucide-react";

const reader = createReader(process.cwd(), config);

export async function Column() {
    const posts = await reader.collections.posts.all();

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => {
        return new Date(b.entry.publishedDate ?? 0).getTime() - new Date(a.entry.publishedDate ?? 0).getTime();
    });

    // Take top 3
    const recentPosts = sortedPosts.slice(0, 3);

    return (
        <section id="column" className="py-24 px-4 bg-slate-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#002335_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <FadeIn>
                        <span className="text-[#e26c5c] font-bold tracking-wider text-sm bg-[#e26c5c]/10 px-3 py-1 rounded-full border border-[#e26c5c]/20">COLUMN</span>
                        <h2 className="text-2xl md:text-5xl font-bold text-[#002335] mt-6 mb-6">お役立ちコラム</h2>
                        <p className="text-[#002335]/70 text-lg">
                            教室運営のヒントや、集客のコツをお届けします。
                        </p>
                    </FadeIn>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {recentPosts.map((post, idx) => (
                        <FadeIn key={post.slug} delay={idx * 0.1}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full hover:-translate-y-1"
                            >
                                <div className="aspect-video relative bg-slate-200 overflow-hidden">
                                    {post.entry.coverImage && (
                                        <NextImage
                                            src={post.entry.coverImage}
                                            alt={post.entry.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    )}
                                    {!post.entry.coverImage && (
                                        <div className="absolute inset-0 bg-[#002335]/5 flex items-center justify-center text-slate-400">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="text-xs text-[#e26c5c] font-bold mb-3 flex items-center gap-2">
                                        <span className="bg-[#e26c5c]/10 px-2 py-0.5 rounded">
                                            {post.entry.categories?.[0] || 'Column'}
                                        </span>
                                        <span className="text-slate-400 font-normal">
                                            {post.entry.publishedDate}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-[#002335] mb-3 group-hover:text-[#e26c5c] transition-colors line-clamp-2 leading-snug">
                                        {post.entry.title}
                                    </h3>

                                    <p className="text-sm text-slate-600 line-clamp-3 mb-6 flex-1">
                                        {post.entry.excerpt}
                                    </p>

                                    <div className="flex items-center text-[#e26c5c] font-bold text-sm group-hover:gap-2 transition-all">
                                        <span>続きを読む</span>
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/blog">
                        <span className="inline-flex items-center gap-2 text-[#002335] font-bold border-b border-[#002335] pb-1 hover:text-[#e26c5c] hover:border-[#e26c5c] transition-colors">
                            コラム一覧を見る
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
