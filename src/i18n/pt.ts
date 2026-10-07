import type { Dictionary } from './en';

// European Portuguese norms (the standard in Angola, Mozambique and Cabo Verde), with AO1990 spelling.
const pt: Dictionary = {
    meta: {
        homeTitle: 'Artistas Africanos — Guia da Arte e da Música de África',
        homeDescription:
            'Perfis de artistas africanos, de El Anatsui a Chéri Samba, os movimentos que os formaram e a música do continente — em português, inglês, francês e árabe.',
        ogAlt: 'AfricanArtists.com — artistas, movimentos e música de África',
    },
    skip: 'Saltar para o conteúdo',
    nav: {
        artists: 'Artistas',
        movements: 'Movimentos',
        music: 'Música',
        guides: 'Guias',
        buy: 'Comprar este domínio',
        menu: 'Menu',
        language: 'Idioma',
        home: 'Início',
        breadcrumb: 'Navegação estrutural',
    },
    saleBar: {
        text: 'O domínio AfricanArtists.com está à venda.',
        cta: 'Fazer uma oferta',
    },
    home: {
        heading: 'Artistas africanos, movimentos artísticos e música',
        lead: 'Um guia em quatro línguas dedicado aos pintores, escultores e fotógrafos da África moderna, às escolas e movimentos que fundaram e à música que leva o som do continente a todo o mundo.',
        exploreArtists: 'Conhecer os artistas',
        buyDomain: 'Este domínio está à venda',
        artistsTitle: 'Artistas a conhecer',
        artistsMore: 'Todos os perfis de artistas',
        movementsTitle: 'Movimentos e escolas',
        movementsMore: 'Todos os movimentos',
        musicTitle: 'Música',
        musicMore: 'Todos os géneros musicais',
        guidesTitle: 'Guias',
        guidesMore: 'Todos os guias',
        saleTitle: 'Seja o dono de AfricanArtists.com',
        saleText:
            'Um .com de duas palavras que nomeia toda uma categoria criativa — os artistas e músicos de África e da sua diáspora. Pronto para uma galeria, uma editora discográfica, um marketplace ou uma fundação.',
        saleCta: 'Ver os detalhes e fazer uma oferta',
    },
    collections: {
        byCountry: 'Por país',
    },
    article: {
        facts: 'Em resumo',
        related: 'Continue a ler',
        published: 'Publicado a',
        updated: 'Atualizado a',
        minutes: (n: number) => `${n} min de leitura`,
        country: 'País',
        allIn: (collection: string) => `Ver tudo: ${collection.toLowerCase()}`,
    },
    buy: {
        title: 'Comprar AfricanArtists.com — domínio premium à venda',
        description:
            'AfricanArtists.com está à venda: um .com de duas palavras que nomeia os artistas e músicos de um continente. Faça uma oferta; pagamento e transferência via escrow.',
        heading: 'AfricanArtists.com está à venda',
        lead: 'Um .com curto e exato para uma das maiores categorias da cultura: os pintores, escultores, fotógrafos, designers e músicos de África e da sua diáspora.',
        status: 'Aberto a ofertas',
        whyTitle: 'Porquê este nome',
        why: [
            {
                title: 'Diz exatamente o que é',
                text: 'Duas palavras inglesas simples que o mundo inteiro já usa e pesquisa. Nada para soletrar, sem hífen, sem números.',
            },
            {
                title: 'É o .com',
                text: 'A extensão que a maioria das pessoas escreve por defeito — essencial para uma marca que tem de funcionar em muitos países ao mesmo tempo.',
            },
            {
                title: 'Tem espaço para crescer',
                text: '«Artists» abrange pintura, escultura, fotografia, música, cinema, moda e design, por isso o nome serve uma galeria, uma editora ou uma plataforma sem nunca ficar pequeno.',
            },
            {
                title: 'Já tem um site',
                text: 'Este guia em quatro línguas sobre artistas e música de África está publicado no domínio. O conteúdo pode fazer parte da venda, mediante acordo.',
            },
        ],
        whoTitle: 'Para quem',
        who: [
            'Marketplaces de arte online e galerias',
            'Leiloeiras e consultores de arte',
            'Editoras discográficas, distribuidoras e serviços de streaming',
            'Feiras de arte, festivais e bienais',
            'Fundações, ONG e instituições culturais',
            'Editoras, media e plataformas de educação',
            'Agências de talentos, de booking e criativas',
        ],
        howTitle: 'Como funciona a compra',
        steps: [
            {
                title: 'Envie uma oferta',
                text: 'Use o formulário desta página. Diga quem é e o que tem em mente. Uma oferta não é vinculativa até ambas as partes acordarem os termos.',
            },
            {
                title: 'Acordem os termos',
                text: 'Todas as ofertas sérias recebem resposta. O preço, o método de pagamento e os prazos são acordados por escrito.',
            },
            {
                title: 'Pague através de escrow',
                text: 'O pagamento é feito através de um serviço de escrow licenciado, como o Escrow.com, ou de um marketplace. O vendedor só recebe depois de o domínio ser seu.',
            },
            {
                title: 'Receba o domínio',
                text: 'O domínio é transferido para a sua conta no seu registador. A maioria das transferências fica concluída poucos dias depois de o pagamento ser compensado.',
            },
        ],
        faqTitle: 'Perguntas frequentes dos compradores',
        faq: [
            {
                q: 'O preço é fixo?',
                a: 'Não. Todas as ofertas sérias são consideradas. Se precisar de uma resposta rápida, indique o seu orçamento e prazos.',
            },
            {
                q: 'Como é protegido o pagamento?',
                a: 'Um serviço de escrow independente guarda os fundos e só os entrega ao vendedor depois de o domínio ter sido transferido para si.',
            },
            {
                q: 'Quanto tempo demora a transferência?',
                a: 'Normalmente alguns dias depois de o pagamento ser compensado. Transferir um domínio entre dois registadores pode demorar até cerca de uma semana, consoante os registadores.',
            },
            {
                q: 'O site está incluído?',
                a: 'A venda é do nome de domínio. O guia aqui publicado — os seus artigos em quatro línguas — pode ser incluído mediante acordo; refira-o na sua oferta.',
            },
            {
                q: 'Posso pagar em prestações?',
                a: 'Possivelmente. Os serviços de escrow podem gerir pagamentos faseados; proponha um plano na sua mensagem.',
            },
        ],
        formTitle: 'Fazer uma oferta',
        formIntro: 'As ofertas e perguntas chegam diretamente ao proprietário. Os campos assinalados com * são obrigatórios.',
        marketplace: (name: string) => `Prefere um marketplace? Veja o anúncio em ${name}`,
    },
    form: {
        name: 'O seu nome',
        email: 'E-mail',
        company: 'Empresa ou organização',
        amount: 'A sua oferta',
        amountHint: 'Opcional — deixe em branco para pedir o preço ou enviar uma pergunta.',
        currency: 'Moeda',
        message: 'Mensagem',
        messageHint: 'Opcional — saber para que pretende usar o domínio ajuda.',
        submit: 'Enviar oferta',
        sending: 'A enviar…',
        privacy: 'Os seus dados são usados apenas para responder à sua oferta.',
        privacyLink: 'Privacidade',
        errors: {
            name: 'Indique o seu nome.',
            email: 'Introduza um endereço de e-mail válido.',
            amount: 'Indique a oferta em números, ou deixe o campo em branco.',
            invalid: 'Verifique o formulário: falta um campo obrigatório ou não é válido.',
            message: 'A mensagem deve ter menos de 2000 caracteres.',
            rate: 'Demasiadas tentativas. Aguarde alguns minutos e tente novamente.',
            unavailable: 'De momento não é possível enviar ofertas por este formulário. Tente novamente mais tarde.',
            failed: 'Ocorreu um problema e a sua oferta não foi enviada. Tente novamente.',
        },
    },
    thanks: {
        title: 'Oferta recebida',
        heading: 'Obrigado — a sua oferta foi enviada',
        text: 'Todas as ofertas sérias recebem resposta por e-mail. Entretanto, o guia continua aqui.',
        back: 'Voltar ao guia',
    },
    footer: {
        about: 'Sobre o guia',
        privacy: 'Privacidade',
        tagline: 'Um guia independente de artistas, movimentos artísticos e música de África, em quatro línguas.',
        forSale: 'O domínio AfricanArtists.com está disponível para aquisição.',
        explore: 'Explorar',
        site: 'Este site',
        languages: 'Idiomas',
    },
    notFound: {
        title: 'Página não encontrada',
        heading: 'Esta página não existe',
        text: 'O endereço pode estar errado, ou a página pode ter mudado de lugar. Estes são bons pontos de partida:',
    },
    countries: {
        AO: 'Angola',
        CD: 'RD Congo',
        CG: 'República do Congo',
        CV: 'Cabo Verde',
        DZ: 'Argélia',
        EG: 'Egito',
        GH: 'Gana',
        KE: 'Quénia',
        MA: 'Marrocos',
        ML: 'Mali',
        MZ: 'Moçambique',
        NG: 'Nigéria',
        SD: 'Sudão',
        SN: 'Senegal',
        ZA: 'África do Sul',
    },
};

export default pt;
