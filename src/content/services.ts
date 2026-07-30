import type { Service } from "@/types/content";
import { site } from "./site";

/**
 * Catálogo de serviços - fonte única para menus, cards, páginas de detalhe,
 * busca interna e sitemap. Conteúdo orientado a tarefas (docs/02).
 *
 * Nota jurídica: valores de emolumentos não são publicados aqui de propósito -
 * mudam anualmente por lei estadual. Cada serviço aponta para a tabela oficial.
 */

const costNoteDefault =
  "Os emolumentos são fixados pela Lei Estadual nº 11.331/2002 e atualizados anualmente. Consulte a tabela oficial vigente ou entre em contato para um cálculo exato do seu caso.";

export const services: Service[] = [
  // ───────────────────────────── NOTAS ─────────────────────────────
  {
    slug: "escrituras",
    category: "notas",
    title: "Escrituras Públicas",
    shortTitle: "Escrituras",
    summary:
      "Formalize com segurança jurídica a compra e venda de imóveis, doações, divórcios, inventários e outros atos.",
    keywords: [
      "escritura",
      "compra e venda",
      "imóvel",
      "doação",
      "divórcio extrajudicial",
      "inventário extrajudicial",
      "união estável",
      "partilha",
      "pacto antenupcial",
    ],
    popular: true,
    whatIs: [
      "A escritura pública é o documento lavrado pelo tabelião que formaliza juridicamente a vontade das partes, com fé pública e validade em todo o território nacional.",
      "É obrigatória, por exemplo, na transmissão de imóveis com valor superior a 30 salários mínimos (art. 108 do Código Civil) e é o instrumento que permite realizar divórcios e inventários diretamente em cartório, sem processo judicial, quando preenchidos os requisitos legais.",
    ],
    useCases: [
      "Compra e venda, doação ou permuta de imóveis",
      "Divórcio e dissolução de união estável consensuais (sem filhos menores ou incapazes)",
      "Inventário e partilha extrajudiciais (herdeiros maiores, capazes e de acordo)",
      "Declaração e dissolução de união estável",
      "Pacto antenupcial",
      "Instituição de usufruto, servidão ou alienação fiduciária",
    ],
    documents: [
      {
        group: "Das partes (pessoa física)",
        items: [
          "Documento de identidade oficial com foto (RG ou CNH) e CPF",
          "Certidão de casamento atualizada (se casado, com averbações)",
          "Comprovante de endereço",
        ],
      },
      {
        group: "Do imóvel (quando houver)",
        items: [
          "Matrícula atualizada (certidão de inteiro teor emitida há menos de 30 dias)",
          "Certidões negativas de débitos municipais (IPTU)",
          "Valor venal e/ou valor de referência do imóvel",
        ],
      },
      {
        group: "Pessoa jurídica (quando parte no ato)",
        items: [
          "Contrato social consolidado e última alteração",
          "Cartão CNPJ e certidão simplificada da Junta Comercial",
          "Documentos pessoais dos representantes legais",
        ],
      },
    ],
    steps: [
      {
        title: "Contato inicial",
        description:
          "Entre em contato por telefone, e-mail ou presencialmente para descrever o ato desejado. A equipe indica a lista exata de documentos para o seu caso.",
      },
      {
        title: "Análise e minuta",
        description:
          "Com os documentos recebidos, o cartório analisa a viabilidade do ato, calcula os emolumentos e impostos incidentes e prepara a minuta da escritura.",
      },
      {
        title: "Agendamento e assinatura",
        description:
          "As partes comparecem na data agendada (ou por videoconferência, via e-Notariado) para leitura, conferência e assinatura do ato.",
      },
      {
        title: "Traslado e registro",
        description:
          "Você recebe o traslado da escritura. Em atos imobiliários, o documento deve ser levado ao Registro de Imóveis competente para transferência efetiva da propriedade.",
      },
    ],
    deadline:
      "A lavratura é agendada conforme a complexidade do ato e a entrega da documentação completa - em geral, poucos dias úteis.",
    costNote: costNoteDefault,
    legalBasis: [
      "Código Civil, arts. 104 a 109 e 215",
      "Lei nº 8.935/1994 (Lei dos Cartórios)",
      "Lei nº 11.441/2007 (divórcio e inventário extrajudiciais)",
      "Resolução CNJ nº 35/2007",
    ],
    faqs: [
      {
        question: "Posso fazer divórcio em cartório?",
        answer:
          "Sim, desde que seja consensual e não haja filhos menores ou incapazes (ou que as questões deles já estejam resolvidas judicialmente). É necessária a assistência de advogado, que pode ser comum às duas partes.",
      },
      {
        question: "A escritura já transfere o imóvel para o meu nome?",
        answer:
          "Não. A escritura formaliza o negócio; a propriedade só se transfere com o registro da escritura na matrícula do imóvel, no Cartório de Registro de Imóveis competente.",
      },
      {
        question: "Posso assinar a escritura sem ir ao cartório?",
        answer:
          "Sim. Pela plataforma e-Notariado, atos notariais podem ser realizados por videoconferência, com certificado digital notarizado gratuito emitido pelo próprio cartório.",
      },
    ],
    relatedSlugs: ["procuracoes", "certidoes", "atas-notariais"],
    digital: {
      label: "e-Notariado",
      url: site.external.eNotariado,
      description:
        "Escrituras podem ser lavradas por videoconferência, com assinatura digital, pela plataforma oficial do notariado brasileiro.",
    },
  },
  {
    slug: "procuracoes",
    category: "notas",
    title: "Procurações Públicas",
    shortTitle: "Procurações",
    summary:
      "Autorize alguém de confiança a agir em seu nome em negócios, bancos, órgãos públicos ou atos específicos.",
    keywords: [
      "procuração",
      "procuração pública",
      "representação",
      "outorga de poderes",
      "revogação de procuração",
      "substabelecimento",
    ],
    popular: true,
    whatIs: [
      "A procuração pública é o instrumento pelo qual você (outorgante) concede a outra pessoa (procurador) poderes para agir em seu nome, com a segurança da fé pública notarial.",
      "É exigida em situações de maior relevância jurídica, como venda de imóveis, movimentação bancária relevante, e representação em atos que exigem instrumento público.",
    ],
    useCases: [
      "Representação na compra ou venda de imóveis",
      "Movimentação de contas bancárias e recebimento de benefícios do INSS",
      "Representação perante órgãos públicos (Detran, Receita Federal, INSS)",
      "Administração de bens de pessoa idosa ou residente no exterior",
      "Representação em assembleias e atos societários",
      "Revogação de procuração anteriormente concedida",
    ],
    documents: [
      {
        group: "Do outorgante (quem concede os poderes)",
        items: [
          "Documento de identidade oficial com foto (RG ou CNH) e CPF - original",
          "Certidão de casamento (quando o estado civil for relevante ao ato)",
          "Comprovante de endereço",
        ],
      },
      {
        group: "Do procurador (quem recebe os poderes)",
        items: [
          "Nome completo, nacionalidade, estado civil, profissão, RG, CPF e endereço (cópia simples dos documentos é suficiente)",
        ],
      },
      {
        group: "Conforme os poderes outorgados",
        items: [
          "Dados do imóvel (matrícula) para poderes de venda",
          "Dados bancários para poderes de movimentação financeira",
        ],
      },
    ],
    steps: [
      {
        title: "Informe a finalidade",
        description:
          "Diga ao cartório para que a procuração será usada. Os poderes são redigidos sob medida - nem mais amplos, nem mais restritos do que você precisa.",
      },
      {
        title: "Compareça com seus documentos",
        description:
          "Apenas o outorgante precisa comparecer, com documento original. O procurador não precisa estar presente.",
      },
      {
        title: "Leitura e assinatura",
        description:
          "O tabelião lê o ato, confirma a compreensão e colhe a assinatura. O traslado é entregue na hora, na maioria dos casos.",
      },
    ],
    deadline:
      "Procurações simples costumam ser lavradas no mesmo dia, por ordem de chegada ou agendamento.",
    costNote: costNoteDefault,
    legalBasis: ["Código Civil, arts. 653 a 692", "Lei nº 8.935/1994"],
    faqs: [
      {
        question: "Procuração pública tem prazo de validade?",
        answer:
          "Por padrão, não - vale até ser revogada, até o falecimento do outorgante ou até cumprir sua finalidade. É possível, porém, fixar prazo de validade no próprio texto do ato.",
      },
      {
        question: "Como cancelo uma procuração que fiz?",
        answer:
          "Por meio de uma escritura de revogação, lavrada em qualquer tabelionato. Recomenda-se comunicar o procurador e os terceiros interessados (banco, por exemplo).",
      },
      {
        question: "Pessoa acamada pode outorgar procuração?",
        answer:
          "Sim. O tabelião pode realizar diligência externa, atendendo em residência ou hospital, desde que a pessoa esteja lúcida e manifeste sua vontade livremente. Consulte o cartório para agendar.",
      },
    ],
    relatedSlugs: ["escrituras", "reconhecimento-de-firma", "certidoes"],
    digital: {
      label: "e-Notariado",
      url: site.external.eNotariado,
      description:
        "Procurações também podem ser feitas por videoconferência com certificado digital notarizado.",
    },
  },
  {
    slug: "testamentos",
    category: "notas",
    title: "Testamentos Públicos",
    shortTitle: "Testamentos",
    summary:
      "Planeje a destinação do seu patrimônio com segurança, sigilo e plena validade jurídica.",
    keywords: [
      "testamento",
      "testamento público",
      "herança",
      "sucessão",
      "planejamento sucessório",
      "deixar bens",
    ],
    whatIs: [
      "O testamento público é lavrado pelo tabelião conforme a vontade declarada do testador, na presença de duas testemunhas, e fica arquivado com sigilo no livro de notas.",
      "É a forma mais segura de testamento prevista em lei: dificilmente é invalidado, pois o tabelião atesta a capacidade e a livre manifestação do testador no momento do ato.",
    ],
    useCases: [
      "Destinar a parte disponível do patrimônio (até 50%) a quem desejar",
      "Beneficiar companheiro(a), amigos, sobrinhos ou instituições",
      "Reconhecer filhos",
      "Nomear tutor para filhos menores",
      "Estabelecer cláusulas de incomunicabilidade, impenhorabilidade e inalienabilidade",
      "Deixar diretrizes sobre negócios de família",
    ],
    documents: [
      {
        group: "Do testador",
        items: [
          "Documento de identidade oficial com foto e CPF - original",
          "Certidão de casamento ou nascimento",
          "Relação dos bens (descrição básica; não é necessário apresentar todos os títulos)",
          "Dados completos dos beneficiários (nome, CPF quando possível, parentesco)",
        ],
      },
      {
        group: "Testemunhas",
        items: [
          "Duas testemunhas maiores e capazes, com documento de identidade, que não sejam beneficiárias do testamento nem parentes próximos do testador ou dos beneficiários",
        ],
      },
    ],
    steps: [
      {
        title: "Conversa reservada",
        description:
          "O testador conversa reservadamente com o tabelião sobre sua vontade. Todo o processo é protegido por sigilo.",
      },
      {
        title: "Redação do ato",
        description:
          "O tabelião redige o testamento em conformidade com a lei, garantindo que a legítima dos herdeiros necessários seja respeitada.",
      },
      {
        title: "Leitura e assinatura solene",
        description:
          "O testamento é lido em voz alta na presença do testador e das duas testemunhas, e assinado por todos.",
      },
    ],
    deadline:
      "Agendamento prévio recomendado. O ato costuma ser concluído em uma única sessão.",
    costNote: costNoteDefault,
    legalBasis: ["Código Civil, arts. 1.857 a 1.880 e 1.864 a 1.867"],
    faqs: [
      {
        question: "Posso mudar meu testamento depois?",
        answer:
          "Sim, a qualquer tempo. Um novo testamento revoga o anterior naquilo que for incompatível. Também é possível revogá-lo expressamente.",
      },
      {
        question: "Alguém fica sabendo do conteúdo?",
        answer:
          "Não. O testamento fica arquivado sob sigilo no cartório e é comunicado ao registro central apenas a existência do ato - não o conteúdo. Ele só se torna acessível após o falecimento.",
      },
      {
        question: "Preciso deixar tudo para os meus filhos?",
        answer:
          "Herdeiros necessários (descendentes, ascendentes e cônjuge) têm direito à legítima: 50% do patrimônio. A outra metade, chamada parte disponível, pode ser destinada livremente.",
      },
    ],
    relatedSlugs: ["escrituras", "atas-notariais", "certidoes"],
  },
  {
    slug: "atas-notariais",
    category: "notas",
    title: "Atas Notariais",
    shortTitle: "Atas Notariais",
    summary:
      "Constitua prova com fé pública de fatos que você presenciou: conversas, sites, mensagens, estado de imóveis e muito mais.",
    keywords: [
      "ata notarial",
      "prova",
      "print",
      "whatsapp",
      "usucapião",
      "constatação",
      "conteúdo de site",
      "prova digital",
    ],
    whatIs: [
      "A ata notarial é o instrumento pelo qual o tabelião narra, com fé pública, fatos que verificou pessoalmente - transformando-os em prova documental robusta, expressamente admitida pelo art. 384 do Código de Processo Civil.",
      "É cada vez mais usada para preservar provas digitais (conversas de WhatsApp, publicações em redes sociais, conteúdo de sites) antes que sejam apagadas.",
    ],
    useCases: [
      "Registro de conversas de WhatsApp, e-mails e publicações em redes sociais",
      "Constatação do conteúdo de um site em determinada data",
      "Verificação do estado de um imóvel (entrega de chaves, vistoria, abandono)",
      "Presença ou ausência de pessoas em reuniões e assembleias",
      "Usucapião extrajudicial (ata de constatação exigida pelo Provimento CNJ nº 65/2017)",
      "Ocorrências que possam embasar ações judiciais futuras",
    ],
    documents: [
      {
        group: "Do solicitante",
        items: [
          "Documento de identidade oficial com foto e CPF",
          "Acesso ao conteúdo a ser constatado (aparelho celular desbloqueado, link do site, endereço do imóvel etc.)",
        ],
      },
    ],
    steps: [
      {
        title: "Descreva o fato",
        description:
          "Explique ao cartório o que precisa ser constatado e com qual finalidade - isso orienta o formato e o alcance da ata.",
      },
      {
        title: "Verificação pelo tabelião",
        description:
          "O tabelião (ou preposto autorizado) examina diretamente o fato: navega no site, lê as mensagens no aparelho, visita o local.",
      },
      {
        title: "Lavratura e entrega",
        description:
          "A narrativa fiel do que foi verificado é lavrada no livro de notas, com imagens anexadas quando cabível, e o traslado é entregue a você.",
      },
    ],
    deadline:
      "Depende da extensão do conteúdo a constatar. Atas simples podem ser concluídas em um a dois dias úteis.",
    costNote: costNoteDefault,
    legalBasis: [
      "Código de Processo Civil, art. 384",
      "Lei nº 8.935/1994, art. 7º, III",
      "Provimento CNJ nº 65/2017 (usucapião extrajudicial)",
    ],
    faqs: [
      {
        question: "Print de conversa não basta como prova?",
        answer:
          "Capturas de tela podem ser contestadas por serem facilmente editáveis. A ata notarial atesta que o conteúdo existia naquele aparelho ou endereço naquele momento, com fé pública - um peso probatório muito superior.",
      },
      {
        question: "O tabelião pode ir até o local do fato?",
        answer:
          "Sim, dentro do município de Potirendaba o tabelião pode realizar diligências externas para constatar fatos. Agende previamente.",
      },
    ],
    relatedSlugs: ["escrituras", "reconhecimento-de-firma", "certidoes"],
  },
  {
    slug: "reconhecimento-de-firma",
    category: "notas",
    title: "Reconhecimento de Firma",
    shortTitle: "Reconhecimento de Firma",
    summary:
      "Ateste a autenticidade da sua assinatura em contratos, autorizações e documentos que a exigem.",
    keywords: [
      "firma",
      "reconhecer firma",
      "assinatura",
      "abertura de firma",
      "cartão de assinatura",
      "autenticidade",
      "semelhança",
      "transferência de veículo",
    ],
    popular: true,
    whatIs: [
      "Reconhecer firma é o ato pelo qual o tabelião atesta que a assinatura em um documento pertence a determinada pessoa, conferindo-a com o padrão arquivado no cartão de firma.",
      "Há duas modalidades: por semelhança (comparação com o padrão arquivado) e por autenticidade (assinatura feita na presença do tabelião - exigida, por exemplo, na transferência de veículos).",
    ],
    useCases: [
      "Contratos particulares (locação, compra e venda de veículos)",
      "Autorização de viagem de menores",
      "Transferência de veículos (ATPV-e exige reconhecimento por autenticidade quando em papel)",
      "Declarações e requerimentos dirigidos a órgãos públicos",
      "Documentos que serão utilizados no exterior (com posterior apostilamento)",
    ],
    documents: [
      {
        group: "Para abrir firma (primeira vez)",
        items: [
          "Documento de identidade oficial com foto - original (RG, CNH ou passaporte) e CPF",
          "Comparecimento pessoal para preencher o cartão de assinatura",
        ],
      },
      {
        group: "Para reconhecer firma",
        items: [
          "Documento com a assinatura a reconhecer (sem rasuras, sem campos em branco)",
          "Firma previamente aberta no cartório (para semelhança) ou comparecimento pessoal com documento original (para autenticidade)",
        ],
      },
    ],
    steps: [
      {
        title: "Abra sua firma (uma única vez)",
        description:
          "O cadastro da assinatura é feito uma única vez e vale para todos os reconhecimentos futuros por semelhança neste cartório.",
      },
      {
        title: "Apresente o documento",
        description:
          "Traga o documento assinado (semelhança) ou assine na presença do escrevente (autenticidade).",
      },
      {
        title: "Receba na hora",
        description: "O reconhecimento é feito no balcão, em poucos minutos.",
      },
    ],
    deadline: "Atendimento imediato no balcão, por ordem de chegada.",
    costNote: costNoteDefault,
    legalBasis: ["Lei nº 8.935/1994, art. 7º, IV", "Normas da CGJ-SP"],
    faqs: [
      {
        question: "Qual a diferença entre semelhança e autenticidade?",
        answer:
          "Na semelhança, o escrevente compara a assinatura do documento com o padrão arquivado - você não precisa estar presente. Na autenticidade, você assina o documento na frente do escrevente, com documento de identidade original - modalidade exigida em atos como a transferência de veículos.",
      },
      {
        question: "Minha firma aberta em outro cartório vale aqui?",
        answer:
          "Não. O cartão de firma é arquivo próprio de cada serventia. Para reconhecimento por semelhança neste cartório, é preciso abrir firma aqui - o procedimento leva poucos minutos.",
      },
    ],
    relatedSlugs: ["autenticacao", "procuracoes", "certidoes"],
  },
  {
    slug: "autenticacao",
    category: "notas",
    title: "Autenticação de Cópias",
    shortTitle: "Autenticação",
    summary:
      "Obtenha cópias com o mesmo valor jurídico do documento original, aceitas em todo o país.",
    keywords: [
      "autenticação",
      "cópia autenticada",
      "xerox autenticada",
      "autenticar documento",
      "cópia fiel",
    ],
    popular: true,
    whatIs: [
      "A autenticação é a declaração do tabelião de que a cópia confere fielmente com o documento original apresentado, dando a ela o mesmo valor probatório do original (art. 425, II, do CPC).",
    ],
    useCases: [
      "Documentos para concursos públicos e matrículas",
      "Processos administrativos e judiciais",
      "Contratações, licitações e cadastros bancários",
      "Guarda segura: usar cópias autenticadas e preservar o original",
    ],
    documents: [
      {
        group: "Necessário",
        items: [
          "Documento original (físico) a ser copiado - não se autentica cópia de cópia simples nem documento plastificado ilegível ou com rasuras",
        ],
      },
    ],
    steps: [
      {
        title: "Traga o original",
        description: "A cópia é feita e conferida no próprio cartório.",
      },
      {
        title: "Receba na hora",
        description:
          "A autenticação sai no balcão, em minutos, com selo digital que permite verificação online.",
      },
    ],
    deadline: "Atendimento imediato no balcão.",
    costNote: costNoteDefault,
    legalBasis: [
      "Lei nº 8.935/1994, art. 7º, V",
      "Código de Processo Civil, art. 425, II",
    ],
    faqs: [
      {
        question: "Documento digital pode ser autenticado?",
        answer:
          "Documentos natos digitais com assinatura eletrônica válida têm verificação própria online. Já a materialização de documento eletrônico (imprimir com valor de original) é feita conforme as normas vigentes - consulte o cartório sobre o seu caso.",
      },
    ],
    relatedSlugs: ["reconhecimento-de-firma", "certidoes"],
  },
  {
    slug: "certidoes",
    category: "notas",
    title: "Certidões e Segundas Vias",
    shortTitle: "Certidões",
    summary:
      "Solicite certidões e traslados de escrituras, procurações e demais atos lavrados neste cartório.",
    keywords: [
      "certidão",
      "segunda via",
      "traslado",
      "certidão de escritura",
      "certidão de procuração",
      "busca de ato",
    ],
    whatIs: [
      "Todo ato lavrado no cartório fica arquivado para sempre em seus livros. A certidão é a reprodução fiel e atualizada desse ato, que pode ser solicitada a qualquer tempo por quem tiver legítimo interesse.",
    ],
    useCases: [
      "Segunda via de escritura ou procuração lavrada neste cartório",
      "Certidão de procuração vigente ou revogada (exigida em negócios imobiliários)",
      "Busca de atos por nome, quando não se sabe a data exata",
      "Certidões para instruir inventários e processos",
    ],
    documents: [
      {
        group: "Para solicitar",
        items: [
          "Documento de identidade do solicitante",
          "Informações que ajudem a localizar o ato: nomes das partes, natureza do ato e data aproximada (livro e folha, se souber)",
        ],
      },
    ],
    steps: [
      {
        title: "Solicite",
        description:
          "Presencialmente, por telefone ou e-mail, informando os dados do ato.",
      },
      {
        title: "Localização e emissão",
        description:
          "O cartório localiza o ato nos livros e emite a certidão, em papel de segurança ou meio eletrônico, conforme o caso.",
      },
      {
        title: "Retirada ou envio",
        description:
          "Retire no balcão ou receba por meio eletrônico/postal, conforme combinado.",
      },
    ],
    deadline:
      "Em regra, até 5 dias úteis - certidões simples costumam sair no mesmo dia.",
    costNote: costNoteDefault,
    legalBasis: ["Lei nº 8.935/1994, arts. 6º e 7º", "Lei nº 6.015/1973"],
    faqs: [
      {
        question: "Qualquer pessoa pode pedir certidão de um ato?",
        answer:
          "As certidões notariais são, em regra, acessíveis a quem demonstre interesse - com exceções legais, como o testamento, que permanece sigiloso enquanto o testador estiver vivo.",
      },
      {
        question: "O ato foi feito em outro cartório. Vocês emitem a certidão?",
        answer:
          "A certidão é emitida pela serventia que lavrou o ato. Podemos orientar você a localizar o cartório correto - a plataforma CENSEC ajuda a encontrar escrituras, procurações e testamentos em todo o país.",
      },
    ],
    relatedSlugs: ["escrituras", "procuracoes", "testamentos"],
  },

  // ─────────────────────────── PROTESTO ───────────────────────────
  {
    slug: "protesto-de-titulos",
    category: "protesto",
    title: "Protesto de Títulos e Documentos de Dívida",
    shortTitle: "Protesto de Títulos",
    summary:
      "Recupere créditos com eficiência: o protesto é o meio legal mais rápido e barato de cobrança formal.",
    keywords: [
      "protesto",
      "protestar título",
      "cobrança",
      "duplicata",
      "cheque",
      "nota promissória",
      "recuperação de crédito",
      "apresentação de título",
      "inadimplência",
    ],
    whatIs: [
      "O protesto é o ato público e formal pelo qual se prova a inadimplência e o descumprimento de obrigação constante de títulos e outros documentos de dívida (Lei nº 9.492/1997).",
      "Para o credor, é um instrumento de recuperação de crédito de alta eficácia: grande parte das dívidas protestadas é regularizada nos primeiros dias, sem necessidade de ação judicial.",
    ],
    useCases: [
      "Duplicatas mercantis e de serviço não pagas",
      "Cheques devolvidos por falta de fundos",
      "Notas promissórias e letras de câmbio vencidas",
      "Contratos, confissões de dívida e outros documentos de dívida",
      "Certidões de dívida ativa (União, Estados e Municípios)",
      "Interrupção da prescrição da dívida (art. 202, III, do Código Civil)",
    ],
    documents: [
      {
        group: "Do credor (apresentante)",
        items: [
          "Título ou documento de dívida original (ou indicação/duplicata por meio eletrônico, conforme o caso)",
          "Documento de identidade e CPF/CNPJ do apresentante",
          "Dados completos do devedor: nome, CPF/CNPJ e endereço",
        ],
      },
    ],
    steps: [
      {
        title: "Apresentação do título",
        description:
          "O credor apresenta o título no cartório (presencialmente ou por meio eletrônico, no caso de convênios e CRA).",
      },
      {
        title: "Intimação do devedor",
        description:
          "O cartório intima o devedor no endereço indicado, concedendo o prazo legal de 3 dias úteis para pagamento ou apresentação de motivo relevante.",
      },
      {
        title: "Pagamento ou lavratura",
        description:
          "Se o devedor paga no prazo, o valor é repassado ao credor e o protesto não se lavra. Caso contrário, o protesto é lavrado e passa a constar dos cadastros públicos.",
      },
    ],
    deadline:
      "O prazo legal de intimação é de 3 dias úteis a partir da protocolização do título.",
    costNote:
      "Em regra, os emolumentos do protesto são pagos ao final pelo devedor. Consulte o cartório sobre as hipóteses de depósito prévio e a tabela vigente.",
    legalBasis: [
      "Lei nº 9.492/1997",
      "Lei Estadual nº 11.331/2002 (emolumentos)",
      "Código Civil, art. 202, III",
    ],
    faqs: [
      {
        question: "Protestar é caro para o credor?",
        answer:
          "Em regra, não há custo inicial para o credor em São Paulo: os emolumentos são pagos pelo devedor no momento do pagamento ou do cancelamento. É um dos meios de cobrança mais econômicos que existem.",
      },
      {
        question: "Qual a diferença entre protesto e negativação (SPC/Serasa)?",
        answer:
          "O protesto é ato público oficial, com fé pública, que prova formalmente a inadimplência, interrompe a prescrição e serve de base para execução judicial. A negativação é registro privado de inadimplência. Os efeitos práticos sobre o crédito do devedor são cumulativos.",
      },
    ],
    relatedSlugs: [
      "consulta-de-protestos",
      "emissao-de-boletos",
      "cancelamento-de-protesto",
    ],
    digital: {
      label: "CENPROT - Central Nacional de Protesto",
      url: site.external.cenprot,
      description:
        "Credores podem apresentar títulos eletronicamente e acompanhar protestos pela central oficial dos cartórios de protesto do Brasil.",
    },
  },
  {
    slug: "emissao-de-boletos",
    category: "protesto",
    title: "Emissão de Boletos para Pagamento",
    shortTitle: "Emissão de Boletos",
    summary:
      "Recebeu uma intimação de protesto? Emita o boleto e regularize seu título com rapidez e segurança.",
    keywords: [
      "boleto",
      "pagar protesto",
      "pagar título",
      "intimação",
      "quitar dívida protestada",
      "regularizar protesto",
    ],
    popular: true,
    whatIs: [
      "Quem recebe uma intimação de protesto pode pagar o título diretamente no cartório, dentro do prazo legal de 3 dias úteis, evitando a lavratura do protesto.",
      "O pagamento é feito por boleto bancário emitido pelo cartório, garantindo quitação segura, repasse correto ao credor e baixa automática do apontamento.",
    ],
    useCases: [
      "Pagamento de título apontado, dentro do prazo da intimação (evita o protesto)",
      "Pagamento de título já protestado (permite o posterior cancelamento)",
      "Emissão de segunda via de boleto",
    ],
    documents: [
      {
        group: "Tenha em mãos",
        items: [
          "A intimação recebida (ou o número do protocolo/apontamento)",
          "CPF ou CNPJ do devedor",
        ],
      },
    ],
    steps: [
      {
        title: "Solicite o boleto",
        description:
          "Entre em contato por telefone ou e-mail informando o número do protocolo da intimação, ou compareça ao balcão.",
      },
      {
        title: "Pague dentro do prazo",
        description:
          "Pagando nos 3 dias úteis da intimação, o protesto não é lavrado e nada constará em seu nome.",
      },
      {
        title: "Quitação e baixa",
        description:
          "Compensado o pagamento, o cartório dá baixa no apontamento e repassa o valor ao credor. Guarde o comprovante.",
      },
    ],
    deadline:
      "O boleto respeita o prazo legal da intimação (3 dias úteis). Após o protesto, o pagamento continua possível, seguido do procedimento de cancelamento.",
    costNote:
      "O valor do boleto inclui o título e os emolumentos legais devidos. Confira sempre os dados do beneficiário - boletos legítimos são emitidos pelo próprio cartório.",
    legalBasis: ["Lei nº 9.492/1997, arts. 12 e 19"],
    faqs: [
      {
        question: "Recebi um boleto por e-mail. Como sei que não é golpe?",
        answer:
          "Confirme sempre pelo telefone oficial do cartório - (17) 3249-1499 - antes de pagar. Verifique se o beneficiário do boleto é a serventia e desconfie de descontos generosos ou pressa excessiva: golpes de falso boleto de cartório são comuns.",
      },
      {
        question: "Paguei o boleto. Meu nome já está limpo?",
        answer:
          "Se o pagamento ocorreu dentro do prazo da intimação, o protesto não chega a ser lavrado. Se o título já estava protestado, após a quitação é preciso solicitar o cancelamento do protesto - veja o serviço correspondente.",
      },
    ],
    relatedSlugs: [
      "cancelamento-de-protesto",
      "consulta-de-protestos",
      "protesto-de-titulos",
    ],
  },
  {
    slug: "consulta-de-protestos",
    category: "protesto",
    title: "Consulta de Protestos e Certidões",
    shortTitle: "Consulta de Protestos",
    summary:
      "Verifique gratuitamente se há protestos em um CPF ou CNPJ e solicite certidões oficiais.",
    keywords: [
      "consulta protesto",
      "certidão de protesto",
      "certidão negativa",
      "nome protestado",
      "consultar cpf",
      "consultar cnpj",
      "cenprot",
    ],
    popular: true,
    whatIs: [
      "Qualquer pessoa pode consultar a existência de protestos em um CPF ou CNPJ - a consulta simples é gratuita pela CENPROT, central nacional oficial dos cartórios de protesto.",
      "Para fins oficiais (licitações, financiamentos, cadastros), emite-se a certidão de protesto - negativa, quando nada consta, ou positiva, detalhando os protestos existentes no período pesquisado (em regra, 5 anos).",
    ],
    useCases: [
      "Verificar se seu nome ou empresa possui protestos",
      "Análise de risco antes de negociar com um cliente ou fornecedor",
      "Certidão negativa para licitações, financiamentos e cadastros",
      "Certidão detalhada de um protesto específico (para cancelamento ou discussão judicial)",
    ],
    documents: [
      {
        group: "Para consultar/solicitar",
        items: [
          "CPF ou CNPJ a ser pesquisado (e nome completo/razão social)",
          "Documento de identidade do solicitante, para certidões presenciais",
        ],
      },
    ],
    steps: [
      {
        title: "Consulta gratuita online",
        description:
          "Acesse a CENPROT (site.cenprotnacional.org.br) e consulte gratuitamente qualquer CPF/CNPJ em todos os cartórios do Brasil.",
      },
      {
        title: "Certidão oficial",
        description:
          "Solicite a certidão da comarca de Potirendaba diretamente ao cartório (balcão, telefone ou e-mail) ou certidões de outras comarcas pela própria CENPROT.",
      },
      {
        title: "Retirada",
        description:
          "A certidão é emitida no prazo legal e entregue no balcão ou por meio eletrônico.",
      },
    ],
    deadline: "Certidões da comarca são emitidas em até 5 dias úteis - em geral, no mesmo dia.",
    costNote:
      "A consulta simples pela CENPROT é gratuita. Certidões oficiais têm emolumentos conforme a tabela vigente.",
    legalBasis: ["Lei nº 9.492/1997, arts. 27 a 31"],
    faqs: [
      {
        question: "Descobri um protesto no meu nome. O que faço?",
        answer:
          "Solicite a certidão detalhada para identificar o credor e o título. Quite a dívida diretamente com o credor (ou pelo cartório, quando cabível), obtenha a carta de anuência e peça o cancelamento - veja o serviço Cancelamento de Protesto.",
      },
      {
        question: "A certidão negativa vale para todo o Brasil?",
        answer:
          "A certidão emitida por este cartório abrange a comarca de Potirendaba. Para abrangência nacional, utilize a CENPROT, que consolida os registros de todos os cartórios de protesto do país.",
      },
    ],
    relatedSlugs: [
      "cancelamento-de-protesto",
      "emissao-de-boletos",
      "protesto-de-titulos",
    ],
    digital: {
      label: "CENPROT - consulta gratuita",
      url: site.external.cenprot,
      description:
        "Consulta nacional gratuita de protestos por CPF/CNPJ, direto na central oficial dos cartórios.",
    },
  },
  {
    slug: "cancelamento-de-protesto",
    category: "protesto",
    title: "Cancelamento de Protesto",
    shortTitle: "Cancelamento de Protesto",
    summary:
      "Pagou a dívida? Cancele o protesto e regularize definitivamente seu nome.",
    keywords: [
      "cancelar protesto",
      "cancelamento",
      "carta de anuência",
      "limpar nome",
      "baixa de protesto",
      "anuência eletrônica",
    ],
    whatIs: [
      "Quitada a dívida, o protesto não desaparece automaticamente: é preciso requerer o cancelamento ao cartório que o lavrou, apresentando o título original ou a carta de anuência do credor.",
      "Com o cancelamento, o protesto deixa de constar das certidões e dos cadastros consultados por bancos e empresas.",
    ],
    useCases: [
      "Cancelamento após pagamento direto ao credor (com carta de anuência)",
      "Cancelamento com apresentação do título original quitado",
      "Cancelamento por determinação judicial",
    ],
    documents: [
      {
        group: "Apresente um destes",
        items: [
          "Carta de anuência do credor, com firma reconhecida (ou anuência eletrônica via CENPROT)",
          "Título ou documento de dívida original protestado",
          "Mandado ou ofício judicial determinando o cancelamento",
        ],
      },
      {
        group: "Do solicitante",
        items: ["Documento de identidade oficial com foto e CPF"],
      },
    ],
    steps: [
      {
        title: "Obtenha a anuência do credor",
        description:
          "Ao quitar a dívida, peça ao credor a carta de anuência com firma reconhecida - ou a anuência eletrônica pela CENPROT, ainda mais prática.",
      },
      {
        title: "Protocole o pedido",
        description:
          "Apresente o documento no cartório e pague os emolumentos do cancelamento.",
      },
      {
        title: "Baixa definitiva",
        description:
          "O cancelamento é averbado e o protesto deixa de constar das certidões e consultas.",
      },
    ],
    deadline: "O cancelamento é averbado em até 3 dias úteis após o protocolo.",
    costNote:
      "Os emolumentos do cancelamento (que em regra incluem os do protesto originário) constam da tabela vigente e são informados no protocolo.",
    legalBasis: ["Lei nº 9.492/1997, art. 26"],
    faqs: [
      {
        question: "Paguei a dívida há anos e o protesto ainda aparece. É normal?",
        answer:
          "Sim - o protesto permanece até que o cancelamento seja formalmente requerido. Obtenha a carta de anuência do credor (ou o título quitado) e protocole o pedido; a baixa sai em poucos dias.",
      },
      {
        question: "O credor sumiu e não consigo a anuência. E agora?",
        answer:
          "Nesses casos, o cancelamento pode ser buscado judicialmente. O cartório pode emitir a certidão detalhada do protesto para instruir a ação.",
      },
    ],
    relatedSlugs: [
      "consulta-de-protestos",
      "emissao-de-boletos",
      "protesto-de-titulos",
    ],
    digital: {
      label: "Anuência eletrônica - CENPROT",
      url: site.external.cenprot,
      description:
        "Credores podem conceder anuência eletrônica pela central nacional, dispensando a carta física.",
    },
  },
];

export const notasServices = services.filter((s) => s.category === "notas");
export const protestoServices = services.filter(
  (s) => s.category === "protesto",
);
export const popularServices = services.filter((s) => s.popular);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicePath(service: Service): string {
  return `/servicos/${service.category}/${service.slug}`;
}

export const categoryLabels: Record<string, string> = {
  notas: "Serviços de Notas",
  protesto: "Serviços de Protesto",
};
