// The contact form's server-side validation. Run: npm test
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { MIN_FILL_MS, contactEmail, validateContact } from '../src/lib/contact.ts';

const valid = { name: 'Ada Obi', email: 'ada@example.com', message: 'The date on the kente page looks wrong.', locale: 'es' };

test('a complete message is accepted, in any of the five editions', () => {
    const result = validateContact(valid);
    assert.equal(result.kind, 'ok');
    assert.equal(result.contact.locale, 'es');
    assert.match(contactEmail(result.contact).subject, /^Message from Ada Obi/);
});

test('missing name, bad email and empty message are reported by field', () => {
    assert.deepEqual(validateContact({ ...valid, name: ' ', email: 'not-an-email', message: '  ' }), {
        kind: 'invalid',
        fields: ['name', 'email', 'message'],
    });
    assert.deepEqual(validateContact({ ...valid, message: 'x'.repeat(2001) }), { kind: 'invalid', fields: ['message'] });
});

test('bots are recognised: honeypot and impossible typing speed', () => {
    assert.equal(validateContact({ ...valid, website: 'http://spam.example' }).kind, 'spam');
    const now = 1_000_000;
    assert.equal(validateContact({ ...valid, started: String(now - 500) }, now).kind, 'spam');
    assert.equal(validateContact({ ...valid, started: String(now - MIN_FILL_MS - 1) }, now).kind, 'ok');
});

test('a name cannot inject lines into the email', () => {
    const result = validateContact({ ...valid, name: 'Ada\r\nBcc: victim@example.com' });
    assert.equal(result.kind, 'ok');
    assert.ok(!/[\r\n]/.test(contactEmail(result.contact).subject));
});

test('an unknown locale falls back to English', () => {
    assert.equal(validateContact({ ...valid, locale: 'xx' }).contact.locale, 'en');
});
