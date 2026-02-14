import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/keystatic/', // Exclude CMS admin area
        },
        sitemap: 'https://nextvalley-jpn.com/sitemap.xml',
    };
}
