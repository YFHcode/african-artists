import { track } from '@vercel/analytics/server';
import { NextResponse } from 'next/server';

import { type ContactMessage, contactEmail, validateContact } from '@/lib/contact';
import { DEFAULT_LOCALE, localePath, toLocale } from '@/lib/i18n';

/**
 * Receives messages from the form on /contact and emails them to the editors.
 *
 * Accepts JSON (the form with JavaScript) and a plain form post (without it).
 * A form post gets a 303 to the thank-you page, or back to the form with an
 * error code; JSON gets a status and a code the form turns into a message.
 *
 * Analytics events are recorded here, on the server, not in the browser: a
 * submission the spam checks discard still gets a success reply (so a bot
 * learns nothing), and counting it in the browser made blocked bots look
 * like sent messages. `contact_sent` now means an email was handed to
 * Resend; `contact_blocked` counts what the honeypot and the typing-speed
 * check stopped.
 *
 * Delivery is through Resend's HTTP API. RESEND_API_KEY and CONTACT_TO_EMAIL
 * must be set (OFFER_TO_EMAIL, the name used before November 2026, still
 * works); without them the route answers 503 rather than pretending a message
 * was received.
 */

export const dynamic = 'force-dynamic';

type ErrorCode = 'invalid' | 'rate' | 'unavailable' | 'failed';

// Best effort only: each serverless instance keeps its own window. It stops a
// single client hammering the form, which is all a contact form needs.
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

async function deliver(contact: ContactMessage): Promise<'sent' | 'unavailable' | 'failed'> {
    const key = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || process.env.OFFER_TO_EMAIL;
    if (!key || !to) {
        console.error('contact: RESEND_API_KEY or CONTACT_TO_EMAIL is not set; message not delivered');
        return 'unavailable';
    }

    const { subject, text } = contactEmail(contact);
    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: process.env.CONTACT_FROM_EMAIL || process.env.OFFER_FROM_EMAIL || 'AfricanArtists.com <onboarding@resend.dev>',
                to: [to],
                reply_to: contact.email,
                subject,
                text,
            }),
            signal: AbortSignal.timeout(10_000),
        });
        if (!response.ok) {
            console.error(`contact: Resend answered ${response.status}: ${(await response.text()).slice(0, 300)}`);
            return 'failed';
        }
        return 'sent';
    } catch (error) {
        console.error('contact: delivery failed', error);
        return 'failed';
    }
}

/** Records an analytics event without ever failing or delaying the reply much. */
async function record(request: Request, name: string, properties: Record<string, string>) {
    try {
        await track(name, properties, { request });
    } catch (error) {
        console.error(`contact: could not record ${name}`, error);
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

    const locale = toLocale(raw.locale) ?? DEFAULT_LOCALE;
    const origin = new URL(request.url).origin;

    const reply = (status: number, code?: ErrorCode, fields?: string[]) => {
        if (isJson) return NextResponse.json(code ? { ok: false, error: code, fields } : { ok: true }, { status });
        const target = code ? `${localePath(locale, '/contact')}?error=${code}#form` : localePath(locale, '/contact/thanks');
        return NextResponse.redirect(new URL(target, origin), 303);
    };

    const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
    if (rateLimited(ip, Date.now())) return reply(429, 'rate');

    const result = validateContact(raw);
    if (result.kind === 'spam') {
        await record(request, 'contact_blocked', { reason: result.reason, locale });
        return reply(200);
    }
    if (result.kind === 'invalid') return reply(400, 'invalid', result.fields);

    const outcome = await deliver(result.contact);
    if (outcome === 'unavailable') return reply(503, 'unavailable');
    if (outcome === 'failed') return reply(502, 'failed');
    await record(request, 'contact_sent', { locale });
    return reply(200);
}
