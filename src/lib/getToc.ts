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
            const text = extractText(node.children);
            const id = encodeURIComponent(text);

            toc.push({ text, id, level });
        }
    });

    return toc;
}

function extractText(children: any[]): string {
    if (!children) return '';
    return children.reduce((acc, child) => {
        if (child.text) return acc + child.text;
        if (child.children) return acc + extractText(child.children);
        return acc;
    }, '');
}
