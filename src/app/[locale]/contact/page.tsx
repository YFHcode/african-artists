import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Blocks';
import { ContactForm } from '@/components/ContactForm';
import { dictionary } from '@/i18n';
import { localePath, toLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
    const locale = toLocale((await params).locale) ?? notFound();
    const t = dictionary(locale);
    return pageMetadata({ locale, path: '/contact', title: t.contact.title, description: t.contact.description, ogAlt: t.meta.ogAlt });
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
    const locale = toLocale((await params).locale) ?? notFound();
    const t = dictionary(locale);

    return (
        <>
            <Breadcrumbs
                locale={locale}
                label={t.nav.breadcrumb}
                trail={[
                    { name: t.nav.home, path: '/' },
                    { name: t.footer.contact, path: '/contact' },
                ]}
            />

            <section className="mx-auto max-w-3xl px-4">
                <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{t.contact.heading}</h1>
                <p className="mt-5 text-xl leading-relaxed text-ink/85">{t.contact.lead}</p>
            </section>

            <section id="form" aria-label={t.contact.heading} className="mx-auto mt-10 max-w-3xl scroll-mt-6 px-4">
                <div className="rounded-2xl border border-line bg-sand p-6 sm:p-10">
                    <p className="text-muted">{t.contact.formIntro}</p>
                    <div className="mt-6">
                        <ContactForm
                            locale={locale}
                            strings={t.form}
                            thanksPath={localePath(locale, '/contact/thanks')}
                            privacyPath={localePath(locale, '/privacy')}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
