import { MetadataRoute } from 'next';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.nextvalley-jpn.com';
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
        '/shindan',
        '/preview',
        '/contact',
        '/blog',
        '/company',
        '/privacy',
        '/terms',
        '/tokusho',
        // English
        '/en',
        '/en/preview',
        '/en/shindan',
        '/en/contact',
        '/en/company',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : route === '/en' ? 0.8 : 0.5,
    }));

    return [...routes, ...blogPosts];
}
