// The offer form's server-side validation. Run: npm test
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { MIN_FILL_MS, offerEmail, parseAmount, validateOffer } from '../src/lib/offer.ts';

test('amounts are read the way buyers in five languages type them', () => {
    const cases = {
        '50000': 50000,
        '50,000': 50000,
        '50.000': 50000, // French/Spanish/Portuguese thousands separator
        '50 000': 50000,
        '50 000': 50000,
        '1,250,000.50': 1250000.5,
        '1.250.000,50': 1250000.5,
        '1,5': 1.5,
        '1.5': 1.5,
        '$25,000': 25000,
        '25 000 €': 25000,
    };
    for (const [input, expected] of Object.entries(cases)) assert.equal(parseAmount(input), expected, input);
    for (const bad of ['', 'abc', '-5', '0', '1e9999', '12abc']) assert.equal(parseAmount(bad), null, bad);
});

const valid = { name: 'Ada Obi', email: 'ada@example.com', amount: '75,000', currency: 'EUR', locale: 'fr' };

test('a complete offer is accepted', () => {
    const result = validateOffer(valid);
    assert.equal(result.kind, 'ok');
    assert.equal(result.offer.amount, 75000);
    assert.equal(result.offer.currency, 'EUR');
});

test('an enquiry without an amount is accepted, a mistyped amount is not', () => {
    const enquiry = validateOffer({ ...valid, amount: '' });
    assert.equal(enquiry.kind, 'ok');
    assert.equal(enquiry.offer.amount, null);
    assert.match(offerEmail(enquiry.offer).subject, /^Enquiry/);
    assert.deepEqual(validateOffer({ ...valid, amount: 'lots' }), { kind: 'invalid', fields: ['amount'] });
});

test('missing name and bad email are reported by field', () => {
    assert.deepEqual(validateOffer({ ...valid, name: ' ', email: 'not-an-email' }), { kind: 'invalid', fields: ['name', 'email'] });
});

test('bots are recognised: honeypot and impossible typing speed', () => {
    assert.equal(validateOffer({ ...valid, website: 'http://spam.example' }).kind, 'spam');
    const now = 1_000_000;
    assert.equal(validateOffer({ ...valid, started: String(now - 500) }, now).kind, 'spam');
    assert.equal(validateOffer({ ...valid, started: String(now - MIN_FILL_MS - 1) }, now).kind, 'ok');
});

test('a name cannot inject lines into the email', () => {
    const result = validateOffer({ ...valid, name: 'Ada\r\nBcc: victim@example.com' });
    assert.equal(result.kind, 'ok');
    assert.ok(!/[\r\n]/.test(offerEmail(result.offer).subject));
});

test('unknown currency and locale fall back safely', () => {
    const result = validateOffer({ ...valid, currency: 'BTC', locale: 'xx' });
    assert.equal(result.offer.currency, 'USD');
    assert.equal(result.offer.locale, 'en');
});
