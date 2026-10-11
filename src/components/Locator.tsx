import Image from 'next/image';

import { type CountryCode, REGIONS, regionOf } from '@/content/catalog';
import { AFRICA_COUNTRIES } from '@/content/africa-map';

const DRAWN = new Set(AFRICA_COUNTRIES.map((c) => c.code));

/**
 * Which map a page shows: its region, its one country, or several countries'
 * shared region. Null when the countries span regions or are too small to be
 * drawn (Cape Verde, Mauritius).
 */
export function locatorKey(countries: readonly CountryCode[], regionSlug?: string): string | null {
    if (regionSlug && regionSlug in REGIONS) return regionSlug;
    if (countries.length === 1) return DRAWN.has(countries[0]) ? countries[0].toLowerCase() : null;
    const regions = new Set(countries.map((c) => regionOf(c)));
    return countries.length > 1 && regions.size === 1 ? [...regions][0]! : null;
}

/**
 * A small map of Africa with the page's region or country picked out: a static
 * SVG from /api/map/<key>, cached once and shared by every page that shows it.
 * Decorative (the page already names the place), so the alt text is empty.
 */
export function Locator({ mapKey, className = '' }: { mapKey: string; className?: string }) {
    return (
        <div className={`rounded-xl border border-line bg-paper p-4 ${className}`}>
            <Image src={`/api/map/${mapKey}`} alt="" width={400} height={430} unoptimized loading="lazy" className="mx-auto h-auto w-full max-w-60" />
        </div>
    );
}
