import { CATALOG, COLLECTIONS, entryPath } from '@/content/catalog';
import { getArticle } from '@/lib/content';
import { absoluteUrl } from '@/lib/site';

/**
 * /llms.txt — a plain summary of the site and its pages for language-model
 * tools. Generated from the catalog at build time, so every URL in it is a
 * page that exists; nothing is a pattern or a placeholder.
 */
export const dynamic = 'force-static';

const HEADINGS: Record<(typeof COLLECTIONS)[number], string> = {
    'art-forms': 'Art forms and traditions',
    artists: 'Artist profiles',
    movements: 'Art movements and schools',
    regions: 'African art by region',
    music: 'Music genres',
    guides: 'Guides',
};

export function GET() {
    const sections = COLLECTIONS.map((collection) => {
        const lines = CATALOG.filter((e) => e.collection === collection).map((entry) => {
            const article = getArticle('en', entry.collection, entry.slug)!;
            return `- [${article.label}](${absoluteUrl(entryPath(entry))}): ${article.description}`;
        });
        return `## ${HEADINGS[collection]}\n\n${lines.join('\n')}`;
    });

    const body = `# AfricanArtists.com

> An independent guide to African art — masks, sculpture, textiles, rock art and photography, modern and contemporary artists, art movements, regions — and the music of Africa, published in English, French, Spanish, Portuguese and Arabic. The domain AfricanArtists.com is for sale.

Every page exists in five editions: English at ${absoluteUrl('/')}, and French, Spanish, Portuguese and Arabic under ${absoluteUrl('/fr')}, ${absoluteUrl('/es')}, ${absoluteUrl('/pt')} and ${absoluteUrl('/ar')} with the same path after the language folder.

- [Buy AfricanArtists.com](${absoluteUrl('/buy')}): the domain is for sale; make an offer.
- [About this guide](${absoluteUrl('/about')}): who publishes it, sources and corrections.

${sections.join('\n\n')}
`;

    return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
