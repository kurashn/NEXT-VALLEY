'use client';

import { useEffect, useState } from 'react';
import { TocItem } from '@/lib/getToc';

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -66%' }
        );

        toc.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [toc]);

    if (toc.length === 0) return null;

    return (
        <div className="bg-slate-50 p-6 rounded-2xl mb-12 border border-slate-100">
            <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#e26c5c] rounded-full"></span>
                目次
            </h4>
            <ul className="space-y-2">
                {toc.map((item) => (
                    <li
                        key={item.id}
                        className={`${item.level === 3 ? 'ml-4' : ''
                            }`}
                    >
                        <a
                            href={`#${item.id}`}
                            className={`toc-link block text-sm py-1 transition-colors ${activeId === item.id
                                    ? 'text-[#e26c5c] font-bold'
                                    : 'text-slate-600 hover:text-[#e26c5c]'
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(item.id)?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                });
                            }}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
