import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/keystatic/', '/demo/'], // CMS管理画面と、デザイン確認用プレビュー
        },
        sitemap: 'https://www.nextvalley-jpn.com/sitemap.xml',
    };
}
