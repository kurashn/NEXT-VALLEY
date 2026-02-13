import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        posts: collection({
            label: 'Posts',
            slugField: 'slug',
            path: 'src/content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Title' }),
                slug: fields.text({
                    label: 'Slug',
                    validation: { length: { min: 1 } },
                }),
                publishedDate: fields.date({ label: 'Published Date' }),
                coverImage: fields.image({
                    label: 'Cover Image',
                    directory: 'public/images/posts',
                    publicPath: '/images/posts/',
                }),
                excerpt: fields.text({
                    label: 'Excerpt',
                    multiline: true,
                }),
                categories: fields.multiselect({
                    label: 'Categories',
                    options: [
                        { label: '集客・マーケティング', value: 'marketing' },
                        { label: 'Web戦略・デザイン', value: 'web-design' },
                        { label: 'AI活用・業務効率化', value: 'ai-efficiency' },
                        { label: '事例・マインド', value: 'case-study' },
                    ],
                    defaultValue: ['marketing'],
                }),
                tags: fields.array(
                    fields.text({ label: 'Tag' }),
                    {
                        label: 'Tags',
                        itemLabel: (props) => props.value,
                    }
                ),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: {
                        directory: 'public/images/posts/content',
                        publicPath: '/images/posts/content/',
                    },
                }),
            },
        }),
    },
});
