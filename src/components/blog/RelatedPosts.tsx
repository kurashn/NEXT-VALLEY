// Server Component — 関連記事（同カテゴリ・同タグを優先して3本。全記事を自動で内部リンクでつなぐ）

import Link from "next/link";
import Image from "next/image";
import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";

const reader = createReader(process.cwd(), config);

export async function RelatedPosts({ currentSlug }: { currentSlug: string }) {
    const all = await reader.collections.posts.all();
    const current = all.find((p) => p.slug === currentSlug);
    if (!current) return null;

    const curCats = new Set(current.entry.categories ?? []);
    const curTags = new Set(current.entry.tags ?? []);

    const scored = all
        .filter((p) => p.slug !== currentSlug)
        .map((p) => {
            const cats = (p.entry.categories ?? []).filter((c) => curCats.has(c)).length;
            const tags = (p.entry.tags ?? []).filter((t) => curTags.has(t)).length;
            return { post: p, score: cats * 2 + tags };
        })
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return new Date(b.post.entry.publishedDate ?? 0).getTime() - new Date(a.post.entry.publishedDate ?? 0).getTime();
        })
        .slice(0, 3)
        .map((s) => s.post);

    if (scored.length === 0) return null;

    return (
        <section aria-labelledby="related-heading" className="mt-16">
            <p className="text-[11px] font-bold tracking-[0.25em] text-coral-deep">RELATED</p>
            <h2 id="related-heading" className="mt-1 text-xl font-bold text-navy md:text-2xl">
                あわせて読みたい記事
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {scored.map((p) => (
                    <Link
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="group overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(31,26,20,0.08)]"
                    >
                        <div className="relative aspect-video overflow-hidden bg-cream">
                            {p.entry.coverImage && (
                                <Image
                                    src={p.entry.coverImage}
                                    alt=""
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, 33vw"
                                />
                            )}
                        </div>
                        <div className="p-4">
                            <p className="mb-1 text-xs text-ink-sub">{p.entry.publishedDate}</p>
                            <p className="line-clamp-2 text-sm font-bold leading-snug text-navy transition-colors group-hover:text-coral-deep">
                                {p.entry.title}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
