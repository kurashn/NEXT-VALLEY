'use client';

import { useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';

export const CATEGORY_LABELS: Record<string, string> = {
    shukyaku: '集客のコツ',
    seisaku: 'ホームページ制作',
    meo: 'Googleマップ・MEO',
    'line-sns': 'LINE・SNS活用',
    ai: 'AI活用',
    jirei: '事例・実績',
};

const TABS = ['all', 'shukyaku', 'seisaku', 'meo', 'line-sns', 'ai', 'jirei'] as const;

export type BlogListPost = {
    slug: string;
    title: string;
    excerpt: string;
    publishedDate: string;
    coverImage: string;
    categories: string[];
};

export function BlogList({ posts }: { posts: BlogListPost[] }) {
    const [active, setActive] = useState<string>('all');
    const filtered = active === 'all' ? posts : posts.filter((p) => p.categories.includes(active));

    return (
        <>
            <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="カテゴリーで絞り込み">
                {TABS.map((tab) => {
                    const isActive = active === tab;
                    const label = tab === 'all' ? 'すべて' : CATEGORY_LABELS[tab];
                    const count = tab === 'all' ? posts.length : posts.filter((p) => p.categories.includes(tab)).length;
                    return (
                        <button
                            key={tab}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActive(tab)}
                            className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                                isActive
                                    ? 'border-[#e26c5c] bg-[#e26c5c] text-white'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-[#e26c5c] hover:text-[#e26c5c]'
                            }`}
                        >
                            {label}
                            <span className={`ml-1.5 text-xs ${isActive ? 'text-white/80' : 'text-slate-400'}`}>{count}</span>
                        </button>
                    );
                })}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post) => (
                    <Link
                        href={`/blog/${post.slug}`}
                        key={post.slug}
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100"
                    >
                        <div className="aspect-video relative bg-slate-200 overflow-hidden">
                            <NextImage
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="whitespace-nowrap text-xs text-slate-500">{post.publishedDate}</span>
                                {post.categories[0] && CATEGORY_LABELS[post.categories[0]] && (
                                    <span className="whitespace-nowrap rounded-full bg-[#f6ece9] px-2.5 py-0.5 text-[11px] font-bold text-[#b0432f]">
                                        {CATEGORY_LABELS[post.categories[0]]}
                                    </span>
                                )}
                            </div>
                            <h2 className="text-lg font-bold text-[#002335] mb-2 group-hover:text-[#e26c5c] transition-colors line-clamp-2">
                                {post.title}
                            </h2>
                            <p className="text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
