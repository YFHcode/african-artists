/**
 * Validation and formatting for the contact form, shared by the API route and
 * the tests. Free of imports so node can run it directly.
 */

export type ContactField = 'name' | 'email' | 'message';

export interface ContactMessage {
    name: string;
    email: string;
    company: string;
    message: string;
    locale: string;
}

export type Validation =
    | { kind: 'ok'; contact: ContactMessage }
    | { kind: 'invalid'; fields: ContactField[] }
    /** A bot: tell it everything went fine and send nothing. */
    | { kind: 'spam'; reason: 'honeypot' | 'too-fast' };

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

export function validateContact(raw: Record<string, unknown>, now: number = Date.now()): Validation {
    // Honeypot: a field hidden from people. Only form-filling bots complete it.
    if (text(raw.website) !== '') return { kind: 'spam', reason: 'honeypot' };

    const started = Number(text(raw.started));
    if (Number.isFinite(started) && started > 0 && now - started < MIN_FILL_MS) return { kind: 'spam', reason: 'too-fast' };

    const name = line(raw.name);
    const email = line(raw.email);
    const company = line(raw.company).slice(0, LIMITS.company);
    const message = text(raw.message);
    const locale = /^(en|fr|es|pt|ar)$/.test(text(raw.locale)) ? text(raw.locale) : 'en';

    const fields: ContactField[] = [];
    if (name === '' || name.length > LIMITS.name) fields.push('name');
    if (email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) fields.push('email');
    if (message === '' || message.length > LIMITS.message) fields.push('message');

    if (fields.length > 0) return { kind: 'invalid', fields };
    return { kind: 'ok', contact: { name, email, company, message, locale } };
}

/** The email the editors receive. Plain text: it is read once and replied to. */
export function contactEmail(contact: ContactMessage): { subject: string; text: string } {
    const subject = `Message from ${contact.name} via AfricanArtists.com`;
    const text = [
        `New message through the contact form on AfricanArtists.com`,
        ``,
        `Name:         ${contact.name}`,
        `Email:        ${contact.email}`,
        `Organisation: ${contact.company || '—'}`,
        `Language:     ${contact.locale}`,
        ``,
        `Message:`,
        contact.message,
        ``,
        `Reply to this email to answer the sender directly.`,
    ].join('\n');
    return { subject, text };
}
