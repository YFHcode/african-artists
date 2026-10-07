// Tell Bing, Yandex, Naver, Seznam and Yep (IndexNow) which pages changed.
// Google does not take part; for Google the sitemap's lastmod is the signal.
//
//   npm run indexnow -- /artists/el-anatsui /fr/artists/el-anatsui   changed pages
//   npm run indexnow -- --all                                        every URL in the live sitemap (first launch only)
//
// Run it after the deploy is live, never before: an engine that crawls on the
// ping must see the new page. Submit only what changed; re-submitting the
// whole site on a schedule is the pattern IndexNow's abuse handling exists
// to stop. 200 and 202 both mean accepted (202: the key is still being checked).
//
// The key is public by design; it is served at /e191ccf29f6aee60fe4dc82e209f9fca.txt from public/.
const SITE = (process.env.SITE || 'https://africanartists.com').replace(/\/+$/, '');
const KEY = 'e191ccf29f6aee60fe4dc82e209f9fca';

let urls = process.argv.slice(2);
if (urls.includes('--all')) {
    const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
} else {
    urls = urls.map((p) => new URL(p, SITE).href);
}
if (urls.length === 0) {
    console.error('pass changed paths, or --all on first launch');
    process.exit(2);
}

const keyCheck = await fetch(`${SITE}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
    console.error(`${SITE}/${KEY}.txt is not serving the key yet — deploy first`);
    process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
console.log(`${res.status} ${res.statusText} — ${urls.length} URL(s)`);
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
