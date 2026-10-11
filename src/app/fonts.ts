import { Fraunces, Inter } from 'next/font/google';

/*
 * The site's Latin fonts, defined once: the site layout and the 404 page
 * (global-not-found.tsx) share them. Each defined its own before, and Next.js
 * preloaded both copies of Fraunces on every page.
 *
 * Only the 'latin' subset is preloaded. The others (latin-ext for names such
 * as Ọlọ́wẹ̀ or Łódź, Vietnamese, Cyrillic, Greek) are still declared and load
 * only on a page that uses one of their characters.
 *
 * The Arabic font is self-hosted (public/fonts/, @font-face in globals.css) so
 * the Arabic edition alone can preload it: see the layout.
 */
export const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap', axes: ['opsz'] });
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
