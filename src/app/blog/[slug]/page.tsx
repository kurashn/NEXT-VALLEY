import { createReader } from '@keystatic/core/reader';
import NextImage from 'next/image';
import config from '../../../../keystatic.config';
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import { DocumentRenderer } from '@keystatic/core/renderer';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToc } from '@/lib/getToc';
import TableOfContents from '@/components/blog/TableOfContents';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { Metadata } from 'next';

const reader = createReader(process.cwd(), config);

export async function generateStaticParams() {
    const posts = await reader.collections.posts.list();
    return posts.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await reader.collections.posts.read(slug);

    if (!post) {
        return {};
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.publishedDate ?? undefined,
            images: post.coverImage ? [post.coverImage] : [],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await reader.collections.posts.read(slug);

    if (!post) {
        notFound();
    }

    const content = await post.content();
    const toc = getToc(content);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <article className="pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <header className="mb-12 text-center">
                        <Badge className="bg-[#e26c5c] hover:bg-[#e26c5c] text-white border-none px-4 py-1.5 text-sm mb-6 tracking-wider">
                            COLUMN
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#002335] mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="text-slate-500 mb-8">
                            {post.publishedDate}
                        </div>
                        {post.coverImage && (
                            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-md">
                                <NextImage
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </header>

                    <div className="mb-12">
                        <TableOfContents toc={toc} />
                    </div>

                    <div className="prose prose-lg max-w-none text-slate-700 prose-headings:text-[#002335] prose-a:text-[#e26c5c] prose-strong:text-[#002335] mb-16">
                        <DocumentRenderer
                            document={content}
                            renderers={{
                                block: {
                                    heading: ({ level, children, textAlign }) => {
                                        const childrenArray = Array.isArray(children) ? children : [children];
                                        const text = childrenArray
                                            .map((child: any) => (typeof child === 'string' ? child : child?.text || ''))
                                            .join('');
                                        const id = text; // Matches getToc logic

                                        if (level === 2) {
                                            return (
                                                <h2 id={id} className="prose-h2-custom" style={{ textAlign }}>
                                                    {children}
                                                </h2>
                                            );
                                        }
                                        if (level === 3) {
                                            return (
                                                <h3 id={id} className="prose-h3-custom" style={{ textAlign }}>
                                                    {children}
                                                </h3>
                                            );
                                        }
                                        // Fallback for other levels
                                        const Tag = `h${level}` as React.ElementType;
                                        return <Tag style={{ textAlign }}>{children}</Tag>;
                                    },
                                },
                            }}
                        />
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 border-t pt-16">
                        <BlogCTA />
                    </div>
                </div>
            </article>
            <Footer />
        </main>
    );
}
