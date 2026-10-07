'use client';

import { track } from '@vercel/analytics';
import { useRouter } from 'next/navigation';
import { type FormEvent, useRef, useState, useSyncExternalStore } from 'react';

import type { Dictionary } from '@/i18n';
import { CURRENCIES } from '@/lib/offer';

type FormStrings = Dictionary['form'];
type ErrorKey = keyof FormStrings['errors'];

const noSubscription = () => () => {};

/**
 * The offer form. Works without JavaScript — it is a normal form post to
 * /api/offer, which redirects to the thank-you page — and with JavaScript it
 * submits in place, shows errors next to the fields, and only then moves on.
 *
 * `started` records the first keystroke; the server discards submissions made
 * faster than a person can type. `website` is a honeypot hidden from people.
 */
export function OfferForm({
    locale,
    strings,
    thanksPath,
    privacyPath,
}: {
    locale: string;
    strings: FormStrings;
    thanksPath: string;
    privacyPath: string;
}) {
    const router = useRouter();
    const started = useRef<HTMLInputElement>(null);
    const [sending, setSending] = useState(false);
    const [invalid, setInvalid] = useState<Set<string>>(new Set());
    const [submitError, setError] = useState<ErrorKey | null>(null);

    // A form post without JavaScript comes back as /buy?error=code. Read from
    // the URL rather than copied into state, so the server render (no URL
    // query on a static page) and the first client render agree.
    const search = useSyncExternalStore(noSubscription, () => window.location.search, () => '');
    const urlCode = new URLSearchParams(search).get('error');
    const urlError = (['rate', 'unavailable', 'failed', 'invalid'] as const).find((c) => c === urlCode) ?? null;
    const error = submitError ?? (sending ? null : urlError);

    function markStarted() {
        if (started.current && !started.current.value) started.current.value = String(Date.now());
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSending(true);
        setError(null);
        setInvalid(new Set());

        const body = Object.fromEntries(new FormData(event.currentTarget).entries());
        try {
            const response = await fetch('/api/offer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const result = await response.json().catch(() => ({}));
            if (response.ok && result.ok) {
                track('offer_sent', { currency: String(body.currency ?? '') });
                router.push(thanksPath);
                return;
            }
            if (result.error === 'invalid' && Array.isArray(result.fields)) {
                setInvalid(new Set(result.fields));
            } else if (result.error === 'rate' || result.error === 'unavailable') {
                setError(result.error);
            } else {
                setError('failed');
            }
        } catch {
            setError('failed');
        }
        setSending(false);
    }

    const fieldClass =
        'mt-1 block w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-ink placeholder:text-muted/70 focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/30 aria-[invalid=true]:border-clay';

    const fieldError = (field: 'name' | 'email' | 'amount' | 'message') =>
        invalid.has(field) ? (
            <p id={`${field}-error`} className="mt-1 text-sm text-clay">
                {strings.errors[field]}
            </p>
        ) : null;

    return (
        <form method="post" action="/api/offer" onSubmit={onSubmit} onInput={markStarted} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="started" ref={started} defaultValue="" />
            <div aria-hidden="true" className="absolute -start-[10000px] h-px w-px overflow-hidden">
                <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="offer-name" className="text-sm font-medium">
                        {strings.name} *
                    </label>
                    <input
                        id="offer-name"
                        name="name"
                        required
                        maxLength={120}
                        autoComplete="name"
                        className={fieldClass}
                        aria-invalid={invalid.has('name')}
                        aria-describedby={invalid.has('name') ? 'name-error' : undefined}
                    />
                    {fieldError('name')}
                </div>
                <div>
                    <label htmlFor="offer-email" className="text-sm font-medium">
                        {strings.email} *
                    </label>
                    <input
                        id="offer-email"
                        name="email"
                        type="email"
                        required
                        maxLength={254}
                        autoComplete="email"
                        dir="ltr"
                        className={fieldClass}
                        aria-invalid={invalid.has('email')}
                        aria-describedby={invalid.has('email') ? 'email-error' : undefined}
                    />
                    {fieldError('email')}
                </div>
            </div>

            <div>
                <label htmlFor="offer-company" className="text-sm font-medium">
                    {strings.company}
                </label>
                <input id="offer-company" name="company" maxLength={160} autoComplete="organization" className={fieldClass} />
            </div>

            <div className="grid gap-5 sm:grid-cols-[1fr_8rem]">
                <div>
                    <label htmlFor="offer-amount" className="text-sm font-medium">
                        {strings.amount}
                    </label>
                    <input
                        id="offer-amount"
                        name="amount"
                        inputMode="decimal"
                        pattern="[0-9][0-9.,’' ]*"
                        dir="ltr"
                        className={fieldClass}
                        aria-invalid={invalid.has('amount')}
                        aria-describedby={invalid.has('amount') ? 'amount-hint amount-error' : 'amount-hint'}
                    />
                    <p id="amount-hint" className="mt-1 text-sm text-muted">
                        {strings.amountHint}
                    </p>
                    {fieldError('amount')}
                </div>
                <div>
                    <label htmlFor="offer-currency" className="text-sm font-medium">
                        {strings.currency}
                    </label>
                    <select id="offer-currency" name="currency" defaultValue="USD" className={fieldClass}>
                        {CURRENCIES.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="offer-message" className="text-sm font-medium">
                    {strings.message}
                </label>
                <textarea
                    id="offer-message"
                    name="message"
                    rows={5}
                    maxLength={2000}
                    className={fieldClass}
                    aria-describedby="message-hint"
                    aria-invalid={invalid.has('message')}
                />
                <p id="message-hint" className="mt-1 text-sm text-muted">
                    {strings.messageHint}
                </p>
                {fieldError('message')}
            </div>

            <div aria-live="polite">
                {error && <p className="rounded-lg bg-clay-soft px-4 py-3 text-sm text-ink">{strings.errors[error]}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <button
                    type="submit"
                    disabled={sending}
                    className="rounded-full bg-clay px-7 py-3 font-semibold text-white hover:bg-ink disabled:opacity-60"
                >
                    {sending ? strings.sending : strings.submit}
                </button>
                <p className="text-sm text-muted">
                    {strings.privacy}{' '}
                    <a href={privacyPath} className="underline underline-offset-4">
                        {strings.privacyLink}
                    </a>
                </p>
            </div>
        </form>
    );
}
