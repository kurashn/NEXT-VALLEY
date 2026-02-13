/* eslint-disable @typescript-eslint/no-explicit-any */

export type TocItem = {
    text: string;
    id: string;
    level: number;
};

export function getToc(content: any[]): TocItem[] {
    const toc: TocItem[] = [];

    if (!Array.isArray(content)) {
        return toc;
    }

    content.forEach((node) => {
        if (node.type === 'heading') {
            const level = node.level;
            const text = node.children
                .map((child: any) => child.text)
                .join('');
            const id = text; // Encoding might be needed for Japanese characters in URLs

            toc.push({ text, id, level });
        }
    });

    return toc;
}
