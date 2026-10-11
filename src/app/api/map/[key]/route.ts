import { REGIONS } from '@/content/catalog';
import { AFRICA_COUNTRIES, AFRICA_VIEWBOX } from '@/content/africa-map';

/**
 * /api/map/<region-slug> and /api/map/<country code>: a small locator map of
 * Africa with that region or country picked out, as a static SVG file
 * written at build time. Region pages, country lists and artist profiles show
 * it as an <img>, so the map's paths are fetched and cached once instead of
 * being repeated in every page's HTML. Under /api/, which robots.txt
 * disallows: it is decoration, not something to index.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

const DRAWN = AFRICA_COUNTRIES.map((c) => c.code.toLowerCase());

export function generateStaticParams() {
    return [...Object.keys(REGIONS), ...DRAWN].map((key) => ({ key }));
}

const COLORS = { land: '#e8dcc6', near: '#f0c9ad', pick: '#a63d16', edge: '#fbf7f0' };

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
    const { key } = await params;
    const region = key in REGIONS ? key : null;
    const country = region ? null : AFRICA_COUNTRIES.find((c) => c.code.toLowerCase() === key);
    if (!region && !country) return new Response('Not found', { status: 404 });

    const fill = (c: (typeof AFRICA_COUNTRIES)[number]) =>
        region
            ? c.region === region ? COLORS.pick : COLORS.land
            : c.code === country!.code ? COLORS.pick : c.region && c.region === country!.region ? COLORS.near : COLORS.land;
    const paths = AFRICA_COUNTRIES.map((c) => `<path d="${c.d}" fill="${fill(c)}"/>`).join('');
    // A ring around the country, so small ones (the Gambia, Rwanda) can be found at a glance.
    const ring = country ? `<circle cx="${country.at[0]}" cy="${country.at[1]}" r="14" fill="none" stroke="${COLORS.pick}" stroke-width="2.5"/>` : '';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${AFRICA_VIEWBOX}"><g stroke="${COLORS.edge}" stroke-width="1" stroke-linejoin="round">${paths}</g>${ring}</svg>`;
    return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' } });
}
