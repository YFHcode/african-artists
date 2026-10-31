import fs from 'node:fs';
import path from 'node:path';

import { ImageResponse } from 'next/og';
import sharp from 'sharp';

import { type Picture, isPublicDomain } from '@/lib/artist-images';
import { type Locale, toLocale } from '@/lib/i18n';
import { type ShareCard, shareCard, shareCardPages } from '@/lib/share-card';

/**
 * /share/<locale>/<page path>.png: the 1200×630 image a link to an article or
 * hub shows when shared, and the Article schema's image (lib/share-card.ts).
 * Written at build time, one per page and edition.
 *
 * An artist's portrait is shown whole, never cropped, with the credit its
 * licence asks for. The layout renderer (next/og) reads PNG, not the stored
 * WebP, so sharp converts the portrait. It also lays text out left to right
 * and without Arabic shaping, so Arabic lines are set by sharp's text engine
 * (Pango with HarfBuzz) and placed as pictures.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
    return shareCardPages().map(({ locale, path: p }) => ({ locale, path: `${p.slice(1)}.png`.split('/') }));
}

const W = 1200;
const H = 630;
const BAND = 22;
const PAD = 64;
const COLORS = { paper: '#fbf7f0', ink: '#1d1915', clay: '#a63d16', gold: '#e0a83a', indigo: '#1f2a5c', muted: '#6b6158', sand: '#efe6d6' };

const FONT_DIR = path.join(process.cwd(), 'src', 'app', 'share', 'fonts');
const font = (file: string) => fs.readFileSync(path.join(FONT_DIR, file));

type Fonts = NonNullable<NonNullable<ConstructorParameters<typeof ImageResponse>[1]>['fonts']>;
let fonts: Fonts | undefined;
function loadFonts(): Fonts {
    fonts ??= [
        { name: 'Fraunces', data: font('fraunces-600-latin.woff'), weight: 600, style: 'normal' },
        { name: 'Fraunces', data: font('fraunces-600-latin-ext.woff'), weight: 600, style: 'normal' },
        { name: 'Inter', data: font('inter-400-latin.woff'), weight: 400, style: 'normal' },
        { name: 'Inter', data: font('inter-400-latin-ext.woff'), weight: 400, style: 'normal' },
        { name: 'Inter', data: font('inter-600-latin.woff'), weight: 600, style: 'normal' },
        { name: 'Inter', data: font('inter-600-latin-ext.woff'), weight: 600, style: 'normal' },
    ];
    return fonts;
}

const LOGO = `data:image/svg+xml;base64,${Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="#1d1915"/><path d="M8 38 L24 10 L40 38 Z" fill="#a63d16"/><path d="M17 38 L24 26 L31 38 Z" fill="#e0a83a"/></svg>'
).toString('base64')}`;

/** The site's striped border, as on the site card in public/og/. */
function Band() {
    const colors = [COLORS.clay, COLORS.gold, COLORS.indigo, COLORS.ink];
    return (
        <div style={{ display: 'flex', width: W, height: BAND }}>
            {Array.from({ length: W / 24 }, (_, i) => (
                <div key={i} style={{ width: 24, height: BAND, background: colors[i % 4] }} />
            ))}
        </div>
    );
}

interface Raster {
    src: string;
    w: number;
    h: number;
}

const ARABIC = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]/;

/**
 * Pango finds fonts through fontconfig; sharp adds a `fontfile` to it for the
 * rest of the process. Each file is registered once, with a throwaway render,
 * so any line can then fall back from one family to another (an Arabic
 * heading with a Latin name in it, a Latin credit with an Arabic one).
 */
const PANGO_FONTS = ['plexar-400-arabic.ttf', 'plexar-600-arabic.ttf', 'inter-400-latin.ttf'].map((f) => path.join(FONT_DIR, f));
let registered: Promise<unknown> | undefined;
function registerFonts() {
    registered ??= Promise.all(PANGO_FONTS.map((fontfile) => sharp({ text: { text: '.', fontfile, font: 'sans 8' } }).png().toBuffer()));
    return registered;
}

const escapeMarkup = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** A paragraph set by Pango, wrapped to `width`, as a transparent PNG. */
async function pangoText(
    text: string,
    o: { families: string; size: number; color: string; width: number; align: 'left' | 'right'; lineHeight?: number }
): Promise<Raster> {
    await registerFonts();
    const png = await sharp({
        text: {
            text: `<span foreground="${o.color}">${escapeMarkup(text)}</span>`,
            font: `${o.families}, ${o.size}`,
            width: o.width,
            align: o.align,
            rgba: true,
            dpi: 72,
            spacing: Math.round(o.size * ((o.lineHeight ?? 1.2) - 1)),
        },
    })
        .png()
        .toBuffer({ resolveWithObject: true });
    return { src: `data:image/png;base64,${png.data.toString('base64')}`, w: png.info.width, h: png.info.height };
}

const AR_BOLD = 'IBM Plex Sans Arabic SemiBold, Inter';
const AR_REGULAR = 'IBM Plex Sans Arabic, Inter';
const arabicText = (text: string, o: { size: number; bold: boolean; color: string; width: number; lineHeight?: number }) =>
    pangoText(text, { ...o, families: o.bold ? AR_BOLD : AR_REGULAR, align: 'right' });

const PORTRAIT: Record<Locale, string> = { en: 'Portrait', fr: 'Portrait', es: 'Retrato', pt: 'Retrato', ar: 'صورة' };

function credit(picture: Picture): string {
    if (isPublicDomain(picture.license)) return picture.author ? `${picture.author} · ${picture.license}` : picture.license;
    return [picture.author, picture.license].filter(Boolean).join(' · ');
}

/** The portrait as a PNG data URL, fitted inside the box without cropping. */
async function portrait(picture: Picture, box: { w: number; h: number }): Promise<Raster> {
    const file = path.join(process.cwd(), 'public', picture.src.replace(/^\//, ''));
    const scale = Math.min(box.w / picture.width, box.h / picture.height);
    const w = Math.round(picture.width * scale);
    const h = Math.round(picture.height * scale);
    const png = await sharp(file).resize(w, h).png().toBuffer();
    return { src: `data:image/png;base64,${png.toString('base64')}`, w, h };
}

function headingSize(heading: string, withPicture: boolean): number {
    const n = [...heading].length;
    const wide = withPicture ? 1 : 1.15;
    if (n <= 18) return Math.round(80 * wide);
    if (n <= 32) return Math.round(66 * wide);
    if (n <= 50) return Math.round(56 * wide);
    return Math.round(48 * wide);
}

/* eslint-disable @next/next/no-img-element -- the elements below are rendered to a PNG, not served as a page */
const Img = ({ r }: { r: Raster }) => <img src={r.src} width={r.w} height={r.h} alt="" />;

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string; path: string[] }> }) {
    const { locale: raw, path: segments } = await params;
    const locale = toLocale(raw);
    const last = segments.at(-1) ?? '';
    if (!locale || !last.endsWith('.png')) return new Response('Not found', { status: 404 });
    const card = shareCard(locale, `/${[...segments.slice(0, -1), last.slice(0, -4)].join('/')}`);
    if (!card) return new Response('Not found', { status: 404 });
    try {
        // Rendered to a buffer here, so a failure is caught rather than breaking the build.
        const png = await (await renderCard(locale, card)).arrayBuffer();
        return new Response(png, { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' } });
    } catch (error) {
        // A card that cannot be drawn (a missing font on the build machine, say) falls back
        // to the edition's site card, so a page always has an image and the build goes on.
        console.warn(`share card ${locale}${segments.join('/')}: ${(error as Error).message}; using the site card`);
        const fallback = fs.readFileSync(path.join(process.cwd(), 'public', 'og', `${locale}.png`));
        return new Response(fallback, { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' } });
    }
}

async function renderCard(locale: Locale, card: ShareCard): Promise<ImageResponse> {
    const rtl = locale === 'ar';
    const box = { w: 430, h: H - 2 * BAND - 80 };
    const pic = card.picture ? await portrait(card.picture, box) : null;
    const textWidth = W - 2 * PAD - (pic ? box.w + 80 : 0);
    const size = headingSize(card.heading, !!pic);

    const kickerStyle = { fontFamily: 'Inter', fontWeight: 600, fontSize: 26, color: COLORS.clay, textTransform: 'uppercase', letterSpacing: 1.5 } as const;
    const headingStyle = { fontFamily: 'Fraunces', fontWeight: 600, fontSize: size, lineHeight: 1.08, color: COLORS.ink, marginTop: 14 } as const;
    const taglineStyle = { fontFamily: 'Inter', fontWeight: 400, fontSize: 30, lineHeight: 1.3, color: COLORS.muted, marginTop: 18 } as const;

    // Arabic lines, set by Pango; the Latin editions use the layout renderer's own text.
    const ar = rtl
        ? {
              kicker: await arabicText(card.kicker, { size: 28, bold: true, color: COLORS.clay, width: textWidth }),
              heading: await arabicText(card.heading, { size: Math.round(size * 0.92), bold: true, color: COLORS.ink, width: textWidth, lineHeight: 1.25 }),
              tagline: card.tagline ? await arabicText(card.tagline, { size: 30, bold: false, color: COLORS.muted, width: textWidth, lineHeight: 1.35 }) : null,
              label: card.picture ? await arabicText(PORTRAIT.ar, { size: 17, bold: false, color: COLORS.muted, width: 200 }) : null,
          }
        : null;
    // A credit with an Arabic name in it (a Commons user, a newspaper) is set by Pango too.
    const creditText = card.picture ? credit(card.picture) : '';
    const creditImage = ARABIC.test(creditText)
        ? await pangoText(creditText, { families: 'Inter, IBM Plex Sans Arabic', size: 16, color: COLORS.muted, width: 600, align: rtl ? 'right' : 'left' })
        : null;

    const text = (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: `44px ${PAD}px`, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: rtl ? 'row-reverse' : 'row' }}>
                <img src={LOGO} width={52} height={52} alt="" />
                <div style={{ display: 'flex', fontFamily: 'Fraunces', fontSize: 30, color: COLORS.ink, margin: rtl ? '0 16px 0 0' : '0 0 0 16px' }}>
                    AfricanArtists<span style={{ color: COLORS.clay }}>.com</span>
                </div>
            </div>
            {ar ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Img r={ar.kicker} />
                    <div style={{ display: 'flex', marginTop: 14 }}>
                        <Img r={ar.heading} />
                    </div>
                    {ar.tagline && (
                        <div style={{ display: 'flex', marginTop: 18 }}>
                            <Img r={ar.tagline} />
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', ...kickerStyle }}>{card.kicker}</div>
                    <div style={{ display: 'flex', ...headingStyle }}>{card.heading}</div>
                    {card.tagline && <div style={{ display: 'flex', ...taglineStyle }}>{card.tagline}</div>}
                </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter', fontSize: 16, color: COLORS.muted, flexDirection: rtl ? 'row-reverse' : 'row' }}>
                {card.picture && (ar?.label ? <Img r={ar.label} /> : <span>{`${PORTRAIT[locale]}:`}</span>)}
                {card.picture && (creditImage ? <Img r={creditImage} /> : <span>{creditText}</span>)}
            </div>
        </div>
    );

    return new ImageResponse(
        (
            <div style={{ display: 'flex', flexDirection: 'column', width: W, height: H, background: COLORS.paper }}>
                <Band />
                <div style={{ display: 'flex', flex: 1, flexDirection: rtl ? 'row-reverse' : 'row' }}>
                    {text}
                    {pic && (
                        <div style={{ display: 'flex', width: box.w + 80, alignItems: 'center', justifyContent: 'center', background: COLORS.sand }}>
                            <Img r={pic} />
                        </div>
                    )}
                </div>
                <Band />
            </div>
        ),
        { width: W, height: H, fonts: loadFonts() }
    );
}
/* eslint-enable @next/next/no-img-element */
