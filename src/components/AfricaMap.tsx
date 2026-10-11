import Link from 'next/link';

import { AFRICA_COUNTRIES, AFRICA_VIEWBOX } from '@/content/africa-map';

/**
 * The continent coloured by the site's five regions, each a link to its
 * region page. Used on the home page beside the list of regions, which is the
 * accessible version of the same links: the map itself is hidden from
 * assistive technology and out of the tab order, so nothing is announced or
 * focused twice. Hovering a region here or its name in the list highlights
 * both (CSS :has(), see globals.css).
 */
export function AfricaMap({ regions, className = '' }: { regions: { slug: string; label: string; href: string }[]; className?: string }) {
    return (
        <svg viewBox={AFRICA_VIEWBOX} aria-hidden="true" focusable="false" className={`africa-map ${className}`}>
            {AFRICA_COUNTRIES.filter((c) => !c.region).map((c) => (
                <path key={c.code} d={c.d} className="africa-map__none" />
            ))}
            {regions.map((region) => (
                <Link prefetch={false} key={region.slug} href={region.href} tabIndex={-1} data-map-region={region.slug} className="africa-map__region">
                    <title>{region.label}</title>
                    {AFRICA_COUNTRIES.filter((c) => c.region === region.slug).map((c) => (
                        <path key={c.code} d={c.d} />
                    ))}
                </Link>
            ))}
        </svg>
    );
}
