import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { BlogList, type BlogListPost } from '@/components/blog/BlogList';

const reader = createReader(process.cwd(), config);

export default async function BlogPage() {
    const posts = await reader.collections.posts.all();

    const sortedPosts: BlogListPost[] = posts
        .sort((a, b) => new Date(b.entry.publishedDate ?? 0).getTime() - new Date(a.entry.publishedDate ?? 0).getTime())
        .map((post) => ({
            slug: post.slug,
            title: post.entry.title,
            excerpt: post.entry.excerpt ?? '',
            publishedDate: post.entry.publishedDate ?? '',
            coverImage: post.entry.coverImage || `/blog/${post.slug}/opengraph-image`,
            categories: [...(post.entry.categories ?? [])],
        }));

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <Badge className="bg-coral-deep hover:bg-coral-deep text-white border-none px-4 py-1.5 text-sm mb-4 tracking-wider">
                            COLUMN
                        </Badge>
                        <h1 className="text-3xl md:text-5xl font-bold text-[#002335] mb-6">
                            お役立ちコラム
                        </h1>
                        <p className="text-slate-600">
                            Web制作やマーケティングに関する最新情報をお届けします。
                        </p>
                    </div>
                    <BlogList posts={sortedPosts} />
                </div>
            </section>
            <Footer />
        </main>
    );
}
