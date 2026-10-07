import { NextResponse } from 'next/server';

import { DEFAULT_LOCALE, isLocale, localePath } from '@/lib/i18n';
import { type Offer, offerEmail, validateOffer } from '@/lib/offer';

/**
 * Receives offers from the form on /buy and emails them to the owner.
 *
 * Accepts JSON (the form with JavaScript) and a plain form post (without it).
 * A form post gets a 303 to the thank-you page, or back to the form with an
 * error code; JSON gets a status and a code the form turns into a message.
 *
 * Delivery is through Resend's HTTP API. RESEND_API_KEY and OFFER_TO_EMAIL
 * must be set; without them the route answers 503 rather than pretending an
 * offer was received.
 */

export const dynamic = 'force-dynamic';

type ErrorCode = 'invalid' | 'rate' | 'unavailable' | 'failed';

// Best effort only: each serverless instance keeps its own window. It stops a
// single client hammering the form, which is all a domain-sale form needs.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function rateLimited(ip: string, now: number): boolean {
    const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    hits.push(now);
    recent.set(ip, hits);
    if (recent.size > 5000) recent.clear();
    return hits.length > MAX_PER_WINDOW;
}

async function deliver(offer: Offer): Promise<'sent' | 'unavailable' | 'failed'> {
    const key = process.env.RESEND_API_KEY;
    const to = process.env.OFFER_TO_EMAIL;
    if (!key || !to) {
        console.error('offer: RESEND_API_KEY or OFFER_TO_EMAIL is not set; offer not delivered');
        return 'unavailable';
    }

    const { subject, text } = offerEmail(offer);
    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: process.env.OFFER_FROM_EMAIL || 'AfricanArtists.com <onboarding@resend.dev>',
                to: [to],
                reply_to: offer.email,
                subject,
                text,
            }),
            signal: AbortSignal.timeout(10_000),
        });
        if (!response.ok) {
            console.error(`offer: Resend answered ${response.status}: ${(await response.text()).slice(0, 300)}`);
            return 'failed';
        }
        return 'sent';
    } catch (error) {
        console.error('offer: delivery failed', error);
        return 'failed';
    }
}

export async function POST(request: Request) {
    const contentType = request.headers.get('content-type') ?? '';
    const isJson = contentType.includes('application/json');

    let raw: Record<string, unknown> = {};
    try {
        raw = isJson ? await request.json() : Object.fromEntries((await request.formData()).entries());
    } catch {
        raw = {};
    }

    const locale = isLocale(raw.locale) ? raw.locale : DEFAULT_LOCALE;
    const origin = new URL(request.url).origin;

    const reply = (status: number, code?: ErrorCode, fields?: string[]) => {
        if (isJson) return NextResponse.json(code ? { ok: false, error: code, fields } : { ok: true }, { status });
        const target = code ? `${localePath(locale, '/buy')}?error=${code}#offer` : localePath(locale, '/buy/thanks');
        return NextResponse.redirect(new URL(target, origin), 303);
    };

    const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
    if (rateLimited(ip, Date.now())) return reply(429, 'rate');

    const result = validateOffer(raw);
    if (result.kind === 'spam') return reply(200);
    if (result.kind === 'invalid') return reply(400, 'invalid', result.fields);

    const outcome = await deliver(result.offer);
    if (outcome === 'unavailable') return reply(503, 'unavailable');
    if (outcome === 'failed') return reply(502, 'failed');
    return reply(200);
}
