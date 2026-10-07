/**
 * Validation and formatting for the offer form, shared by the API route and
 * the tests. Free of imports so node can run it directly.
 */

export const CURRENCIES = ['USD', 'EUR', 'GBP'] as const;
export type Currency = (typeof CURRENCIES)[number];

export type OfferField = 'name' | 'email' | 'amount' | 'message';

export interface Offer {
    name: string;
    email: string;
    company: string;
    /** Null when the sender is asking a question or for the price rather than offering. */
    amount: number | null;
    currency: Currency;
    message: string;
    locale: string;
}

export type Validation =
    | { kind: 'ok'; offer: Offer }
    | { kind: 'invalid'; fields: OfferField[] }
    /** A bot: tell it everything went fine and send nothing. */
    | { kind: 'spam' };

export const LIMITS = { name: 120, email: 254, company: 160, message: 2000 } as const;

/** Faster than this from first keystroke to submit is not a person typing. */
export const MIN_FILL_MS = 3000;

function text(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
}

/** Single-line fields lose control characters, so a name can never add a header line to the email. */
function line(value: unknown): string {
    return text(value).replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s{2,}/g, ' ');
}

/**
 * Reads an amount the way people type it in four languages: "50000",
 * "50,000", "50.000", "50 000", "50’000", "1,5" and "1.5".
 *
 * A separator followed by exactly three digits, repeated to the end, is a
 * thousands separator — so "50.000" is fifty thousand, as a French or
 * Portuguese buyer means it. Otherwise a single comma is a decimal mark.
 */
export function parseAmount(raw: string): number | null {
    const value = raw.replace(/[\s  ]/g, ' ').trim().replace(/^[$€£]\s*|\s*[$€£]$/g, '');
    if (value === '') return null;

    let normalised: string;
    if (/^\d{1,3}([.,’' ]\d{3})+$/.test(value)) {
        normalised = value.replace(/[.,’' ]/g, '');
    } else if (/^\d{1,3}([,’' ]\d{3})+\.\d+$/.test(value)) {
        normalised = value.replace(/[,’' ]/g, '');
    } else if (/^\d{1,3}([.’' ]\d{3})+,\d+$/.test(value)) {
        normalised = value.replace(/[.’' ]/g, '').replace(',', '.');
    } else if (/^\d+([.,]\d+)?$/.test(value)) {
        normalised = value.replace(',', '.');
    } else {
        return null;
    }

    const amount = Number(normalised);
    return Number.isFinite(amount) && amount > 0 && amount < 1e10 ? amount : null;
}

export function validateOffer(raw: Record<string, unknown>, now: number = Date.now()): Validation {
    // Honeypot: a field hidden from people. Only form-filling bots complete it.
    if (text(raw.website) !== '') return { kind: 'spam' };

    const started = Number(text(raw.started));
    if (Number.isFinite(started) && started > 0 && now - started < MIN_FILL_MS) return { kind: 'spam' };

    const name = line(raw.name);
    const email = line(raw.email);
    const company = line(raw.company).slice(0, LIMITS.company);
    const message = text(raw.message);
    // An empty amount is a question ("what is your price?"), which is welcome;
    // a non-empty amount that cannot be read is a typo, which is not.
    const amountText = text(raw.amount);
    const amount = amountText === '' ? null : parseAmount(amountText);
    const currency = (CURRENCIES as readonly string[]).includes(text(raw.currency)) ? (text(raw.currency) as Currency) : 'USD';
    const locale = /^(en|fr|pt|ar)$/.test(text(raw.locale)) ? text(raw.locale) : 'en';

    const fields: OfferField[] = [];
    if (name === '' || name.length > LIMITS.name) fields.push('name');
    if (email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) fields.push('email');
    if (amountText !== '' && amount === null) fields.push('amount');
    if (message.length > LIMITS.message) fields.push('message');

    if (fields.length > 0) return { kind: 'invalid', fields };
    return { kind: 'ok', offer: { name, email, company, amount, currency, message, locale } };
}

export function formatAmount(offer: Pick<Offer, 'amount' | 'currency'>): string {
    if (offer.amount === null) return 'no amount (enquiry)';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: offer.currency, maximumFractionDigits: 2 }).format(offer.amount);
}

/** The email the owner receives. Plain text: it is read once and replied to. */
export function offerEmail(offer: Offer): { subject: string; text: string } {
    const amount = formatAmount(offer);
    const subject =
        offer.amount === null
            ? `Enquiry about AfricanArtists.com from ${offer.name}`
            : `Offer for AfricanArtists.com: ${amount} from ${offer.name}`;
    const text = [
        offer.amount === null ? `New enquiry about AfricanArtists.com` : `New offer for AfricanArtists.com`,
        ``,
        `Amount:   ${amount}`,
        `Name:     ${offer.name}`,
        `Email:    ${offer.email}`,
        `Company:  ${offer.company || '—'}`,
        `Language: ${offer.locale}`,
        ``,
        `Message:`,
        offer.message || '—',
        ``,
        `Reply to this email to answer the buyer directly.`,
    ].join('\n');
    return { subject, text };
}
