import Link from 'next/link';
import NextImage from 'next/image';
import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';

const reader = createReader(process.cwd(), config);

export default async function BlogPage() {
    const posts = await reader.collections.posts.all();

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => {
        return new Date(b.entry.publishedDate ?? 0).getTime() - new Date(a.entry.publishedDate ?? 0).getTime();
    });

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge className="bg-[#e26c5c] hover:bg-[#e26c5c] text-white border-none px-4 py-1.5 text-sm mb-4 tracking-wider">
                            COLUMN
                        </Badge>
                        <h1 className="text-3xl md:text-5xl font-bold text-[#002335] mb-6">
                            お役立ちコラム
                        </h1>
                        <p className="text-slate-600">
                            Web制作やマーケティングに関する最新情報をお届けします。
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {sortedPosts.map((post) => (
                            <Link
                                href={`/blog/${post.slug}`}
                                key={post.slug}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100"
                            >
                                <div className="aspect-video relative bg-slate-200 overflow-hidden">
                                    {post.entry.coverImage && (
                                        <NextImage
                                            src={post.entry.coverImage}
                                            alt={post.entry.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    )}
                                    {!post.entry.coverImage && (
                                        <div className="absolute inset-0 bg-[#002335]/5 group-hover:bg-[#002335]/10 transition-colors" />
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="text-xs text-slate-500 mb-2">
                                        {post.entry.publishedDate}
                                    </div>
                                    <h2 className="text-lg font-bold text-[#002335] mb-2 group-hover:text-[#e26c5c] transition-colors line-clamp-2">
                                        {post.entry.title}
                                    </h2>
                                    <p className="text-sm text-slate-600 line-clamp-3">
                                        {post.entry.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
