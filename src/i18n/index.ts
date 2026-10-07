import type { Locale } from '@/lib/i18n';

import ar from './ar';
import en, { type Dictionary } from './en';
import fr from './fr';
import pt from './pt';

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr, pt, ar };

/** The interface strings for one edition. Server-side only: never pass the whole object to a client component. */
export function dictionary(locale: Locale): Dictionary {
    return DICTIONARIES[locale];
}

export type { Dictionary };
