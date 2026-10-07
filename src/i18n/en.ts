/**
 * Interface strings for the English edition. The other editions are typed
 * against this object, so a key missing from a translation fails the build.
 */
const en = {
    meta: {
        homeTitle: 'African Artists — A Guide to Art and Music from Africa',
        homeDescription:
            'Profiles of African artists from El Anatsui to Chéri Samba, the movements behind them and the music of the continent — in four languages.',
        ogAlt: 'AfricanArtists.com — artists, movements and music from Africa',
    },
    skip: 'Skip to content',
    nav: {
        artists: 'Artists',
        movements: 'Movements',
        music: 'Music',
        guides: 'Guides',
        buy: 'Buy this domain',
        menu: 'Menu',
        language: 'Language',
        home: 'Home',
        breadcrumb: 'Breadcrumb',
    },
    saleBar: {
        text: 'The domain AfricanArtists.com is for sale.',
        cta: 'Make an offer',
    },
    home: {
        heading: 'African artists, art movements and music',
        lead: 'A four-language guide to the painters, sculptors and photographers of modern Africa, the schools and movements they formed, and the music that carries the continent’s sound around the world.',
        exploreArtists: 'Explore the artists',
        buyDomain: 'This domain is for sale',
        artistsTitle: 'Artists to know',
        artistsMore: 'All artist profiles',
        movementsTitle: 'Movements and schools',
        movementsMore: 'All movements',
        musicTitle: 'Music',
        musicMore: 'All music genres',
        guidesTitle: 'Guides',
        guidesMore: 'All guides',
        saleTitle: 'Own AfricanArtists.com',
        saleText:
            'A two-word .com that names a whole creative category — the artists and musicians of Africa and its diaspora. Ready for a gallery, a label, a marketplace or a foundation.',
        saleCta: 'See the details and make an offer',
    },
    collections: {
        byCountry: 'By country',
    },
    article: {
        facts: 'At a glance',
        related: 'Keep reading',
        published: 'Published',
        updated: 'Updated',
        minutes: (n: number) => `${n} min read`,
        country: 'Country',
        allIn: (collection: string) => `All ${collection.toLowerCase()}`,
    },
    buy: {
        title: 'Buy AfricanArtists.com — Premium Domain for Sale',
        description:
            'AfricanArtists.com is for sale: a two-word .com naming the artists and musicians of a continent. Make an offer; payment and transfer through escrow.',
        heading: 'AfricanArtists.com is for sale',
        lead: 'A short, exact .com for one of culture’s largest categories: the painters, sculptors, photographers, designers and musicians of Africa and its diaspora.',
        status: 'Open to offers',
        whyTitle: 'Why this name',
        why: [
            {
                title: 'It says exactly what it is',
                text: 'Two plain English words that people already use and search for. Nothing to spell out, no hyphen, no number.',
            },
            {
                title: 'It is the .com',
                text: 'The extension most people type by default — which matters for a brand that has to work in many countries at once.',
            },
            {
                title: 'It has room to grow',
                text: '“Artists” covers painting, sculpture, photography, music, film, fashion and design, so the name fits a gallery, a label or a platform without being outgrown.',
            },
            {
                title: 'It already has a site',
                text: 'This four-language guide to African artists and music is live on the domain. The content can be part of the sale by agreement.',
            },
        ],
        whoTitle: 'Who it suits',
        who: [
            'Online art marketplaces and galleries',
            'Auction houses and art advisers',
            'Record labels, distributors and streaming services',
            'Art fairs, festivals and biennales',
            'Foundations, NGOs and cultural institutions',
            'Publishers, media and education platforms',
            'Talent, booking and creative agencies',
        ],
        howTitle: 'How buying works',
        steps: [
            {
                title: 'Send an offer',
                text: 'Use the form on this page. Say who you are and what you have in mind. An offer is not binding until both sides agree terms.',
            },
            {
                title: 'Agree terms',
                text: 'Every genuine offer gets a reply. Price, payment method and timing are agreed in writing.',
            },
            {
                title: 'Pay through escrow',
                text: 'Payment goes through a licensed escrow service such as Escrow.com, or through a marketplace. The seller is paid only after the domain is yours.',
            },
            {
                title: 'Receive the domain',
                text: 'The domain is moved to your registrar account. Most transfers complete within a few days of payment clearing.',
            },
        ],
        faqTitle: 'Questions buyers ask',
        faq: [
            {
                q: 'Is there a fixed price?',
                a: 'No. Every serious offer is considered. If you need a quick answer, include your budget and timing.',
            },
            {
                q: 'How is payment protected?',
                a: 'An independent escrow service holds the funds and releases them to the seller only once the domain has been transferred to you.',
            },
            {
                q: 'How long does the transfer take?',
                a: 'Usually a few days after payment clears. Moving a domain between two registrars can take up to about a week, depending on the registrars involved.',
            },
            {
                q: 'Is the website included?',
                a: 'The sale is for the domain name. The guide published here — its articles in four languages — can be included by agreement; mention it in your offer.',
            },
            {
                q: 'Can I pay in instalments?',
                a: 'Possibly. Escrow services can run payment plans; propose one in your message.',
            },
        ],
        formTitle: 'Make an offer',
        formIntro: 'Offers and questions go straight to the owner. Fields marked * are required.',
        marketplace: (name: string) => `Prefer a marketplace? See the listing on ${name}`,
    },
    form: {
        name: 'Your name',
        email: 'Email',
        company: 'Company or organisation',
        amount: 'Your offer',
        amountHint: 'Optional — leave it blank to ask for the price or send a question.',
        currency: 'Currency',
        message: 'Message',
        messageHint: 'Optional — what you plan to use the domain for helps.',
        submit: 'Send offer',
        sending: 'Sending…',
        privacy: 'Your details are used only to reply to your offer.',
        privacyLink: 'Privacy notice',
        errors: {
            name: 'Please enter your name.',
            email: 'Please enter a valid email address.',
            amount: 'Please enter the offer as a number, or leave it blank.',
            invalid: 'Please check the form: a required field is missing or not valid.',
            message: 'Please keep the message under 2,000 characters.',
            rate: 'Too many attempts. Please wait a few minutes and try again.',
            unavailable:
                'Offers cannot be sent through this form at the moment. Please try again later.',
            failed: 'Something went wrong and your offer was not sent. Please try again.',
        },
    },
    thanks: {
        title: 'Offer received',
        heading: 'Thank you — your offer has been sent',
        text: 'Every genuine offer gets a reply by email. While you wait, the guide is still here.',
        back: 'Back to the guide',
    },
    footer: {
        about: 'About this guide',
        privacy: 'Privacy',
        tagline: 'An independent guide to artists, art movements and music from Africa, in four languages.',
        forSale: 'The domain AfricanArtists.com is available for acquisition.',
        explore: 'Explore',
        site: 'This site',
        languages: 'Languages',
    },
    notFound: {
        title: 'Page not found',
        heading: 'This page does not exist',
        text: 'The address may be mistyped, or the page may have moved. These are good places to start:',
    },
    countries: {
        AO: 'Angola',
        CD: 'DR Congo',
        CG: 'Republic of the Congo',
        CV: 'Cabo Verde',
        DZ: 'Algeria',
        EG: 'Egypt',
        GH: 'Ghana',
        KE: 'Kenya',
        MA: 'Morocco',
        ML: 'Mali',
        MZ: 'Mozambique',
        NG: 'Nigeria',
        SD: 'Sudan',
        SN: 'Senegal',
        ZA: 'South Africa',
    },
};

export default en;
export type Dictionary = typeof en;
