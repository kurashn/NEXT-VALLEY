import { MetadataRoute } from 'next';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://nextvalley-jpn.com';
    const reader = createReader(process.cwd(), config);

    // Get all posts
    const posts = await reader.collections.posts.all();

    // Dynamic blog posts
    const blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.entry.publishedDate ? new Date(post.entry.publishedDate) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Static routes
    const routes = [
        '',
        '/contact',
        '/blog',
        '/service', // Anchor link on page.tsx but might be good to have if it becomes a page or just root
        '/token-economy', // Wait, looking at Navbar, links are sections on home page except blog/contact
        // Navbar links: /#problem, /#solution, /#strategy, /#service, /blog, /contact
        // Additional pages found in file list: /privacy, /terms, /tokusho
        '/privacy',
        '/terms',
        '/tokusho',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.5,
    }));

    return [...routes, ...blogPosts];
}
