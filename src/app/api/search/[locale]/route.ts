import { LOCALES, toLocale } from '@/lib/i18n';
import { searchIndex } from '@/lib/search-index';

/**
 * /api/search/<locale>: the site's search index for one edition, a static file
 * written at build time. Under /api/, which robots.txt disallows, so it is not
 * crawled as a page; the search box fetches it on first use.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
    const locale = toLocale((await params).locale);
    if (!locale) return new Response('Not found', { status: 404 });
    return Response.json(searchIndex(locale), { headers: { 'Cache-Control': 'public, max-age=3600' } });
}
