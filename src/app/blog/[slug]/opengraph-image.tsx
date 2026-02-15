import { ImageResponse } from 'next/og';
/* import { createReader } from '@keystatic/core/reader'; */
/* import config from '../../../../keystatic.config'; */
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export const alt = 'Blog Post Thumbnail';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Use the static image from public/images/blog/{slug}.png
    const imageUrl = `${baseUrl}/images/blog/${slug}.png`;

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imageUrl}
                    alt="Blog Post Thumbnail"
                    width="1200"
                    height="630"
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
