import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Blocks';
import { Motif } from '@/components/Motif';
import { OfferForm } from '@/components/OfferForm';
import { dictionary } from '@/i18n';
import { isLocale, localePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { MARKETPLACE } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[locale]/buy'>): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const t = dictionary(locale);
    return pageMetadata({ locale, path: '/buy', title: t.buy.title, description: t.buy.description, ogAlt: t.meta.ogAlt });
}

export default async function BuyPage({ params }: PageProps<'/[locale]/buy'>) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const t = dictionary(locale);

    return (
        <>
            <Breadcrumbs
                locale={locale}
                label={t.nav.breadcrumb}
                trail={[
                    { name: t.nav.home, path: '/' },
                    { name: t.nav.buy, path: '/buy' },
                ]}
            />

            <section className="mx-auto max-w-6xl px-4">
                <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_20rem]">
                    <div>
                        <p className="inline-block rounded-full bg-clay-soft px-3 py-1 text-sm font-semibold text-clay">{t.buy.status}</p>
                        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                            {t.buy.heading}
                        </h1>
                        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink/85">{t.buy.lead}</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href="#offer" className="rounded-full bg-clay px-6 py-3 font-semibold text-white hover:bg-ink">
                                {t.buy.formTitle}
                            </a>
                            {MARKETPLACE && (
                                <a
                                    href={MARKETPLACE.url}
                                    rel="noopener"
                                    className="rounded-full border-2 border-indigo px-6 py-3 font-semibold text-indigo hover:bg-indigo hover:text-paper"
                                >
                                    {t.buy.marketplace(MARKETPLACE.name)}
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="relative hidden aspect-square overflow-hidden rounded-2xl lg:block">
                        <Motif seed="africanartists-buy" className="absolute inset-0 block h-full w-full" />
                        <p
                            dir="ltr"
                            lang="en"
                            className="absolute inset-x-4 bottom-4 rounded-lg bg-paper/95 px-4 py-3 text-center font-display text-xl font-semibold"
                        >
                            AfricanArtists<span className="text-clay">.com</span>
                        </p>
                    </div>
                </div>
            </section>

            <section aria-labelledby="why" className="mx-auto mt-16 max-w-6xl px-4">
                <h2 id="why" className="font-display text-3xl font-semibold tracking-tight">
                    {t.buy.whyTitle}
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {t.buy.why.map((point) => (
                        <div key={point.title} className="rounded-xl border border-line bg-paper p-6">
                            <h3 className="text-lg font-semibold">{point.title}</h3>
                            <p className="mt-2 text-ink/85">{point.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto mt-16 grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
                <div aria-labelledby="who">
                    <h2 id="who" className="font-display text-3xl font-semibold tracking-tight">
                        {t.buy.whoTitle}
                    </h2>
                    <ul className="mt-6 space-y-3">
                        {t.buy.who.map((item) => (
                            <li key={item} className="flex gap-3">
                                <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ochre" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div aria-labelledby="how">
                    <h2 id="how" className="font-display text-3xl font-semibold tracking-tight">
                        {t.buy.howTitle}
                    </h2>
                    <ol className="mt-6 space-y-5">
                        {t.buy.steps.map((step, i) => (
                            <li key={step.title} className="flex gap-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo text-sm font-semibold text-paper">
                                    {i + 1}
                                </span>
                                <div>
                                    <h3 className="font-semibold">{step.title}</h3>
                                    <p className="mt-1 text-ink/85">{step.text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section id="offer" aria-labelledby="offer-heading" className="mx-auto mt-16 max-w-6xl scroll-mt-6 px-4">
                <div className="rounded-2xl border border-line bg-sand p-6 sm:p-10">
                    <h2 id="offer-heading" className="font-display text-3xl font-semibold tracking-tight">
                        {t.buy.formTitle}
                    </h2>
                    <p className="mt-2 text-muted">{t.buy.formIntro}</p>
                    <div className="mt-8 max-w-3xl">
                        <OfferForm
                            locale={locale}
                            strings={t.form}
                            thanksPath={localePath(locale, '/buy/thanks')}
                            privacyPath={localePath(locale, '/privacy')}
                        />
                    </div>
                    {MARKETPLACE && (
                        <p className="mt-8 border-t border-line pt-6">
                            <a href={MARKETPLACE.url} rel="noopener" className="font-medium text-indigo underline underline-offset-4">
                                {t.buy.marketplace(MARKETPLACE.name)}
                            </a>
                        </p>
                    )}
                </div>
            </section>

            <section aria-labelledby="faq" className="mx-auto mt-16 max-w-3xl px-4">
                <h2 id="faq" className="font-display text-3xl font-semibold tracking-tight">
                    {t.buy.faqTitle}
                </h2>
                <div className="mt-6 divide-y divide-line border-y border-line">
                    {t.buy.faq.map((item) => (
                        <details key={item.q} className="group py-4">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                                {item.q}
                                <span aria-hidden="true" className="text-clay transition-transform group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <p className="mt-3 text-ink/85">{item.a}</p>
                        </details>
                    ))}
                </div>
            </section>
        </>
    );
}
