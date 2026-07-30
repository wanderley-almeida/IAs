import type { NewsArticle } from "@/types/content";

/**
 * Notícias e orientações. Conteúdo editorial informativo — não substitui
 * consulta ao cartório. Para publicar uma nova notícia, adicione um objeto
 * ao início do array (mais recente primeiro).
 */
export const news: NewsArticle[] = [
  {
    slug: "atos-notariais-por-videoconferencia",
    title: "Escrituras e procurações podem ser feitas por videoconferência",
    excerpt:
      "Com o e-Notariado, plataforma oficial do notariado brasileiro, você realiza atos notariais sem sair de casa, com a mesma segurança jurídica.",
    date: "2026-06-15",
    category: "Serviços digitais",
    body: [
      "Desde o Provimento nº 100/2020 do Conselho Nacional de Justiça, os cartórios de notas de todo o país podem lavrar escrituras, procurações e outros atos por videoconferência, por meio da plataforma e-Notariado.",
      "Para utilizar o serviço, o interessado emite gratuitamente um certificado digital notarizado no próprio cartório — em poucos minutos, com documento de identidade. A videoconferência é conduzida pelo tabelião, que confirma a identidade e a livre manifestação de vontade das partes, exatamente como no atendimento presencial.",
      "O ato assinado eletronicamente tem a mesma validade jurídica do ato em papel e pode ser encaminhado diretamente ao Registro de Imóveis, quando for o caso.",
      "Entre em contato com o cartório para verificar se o seu ato pode ser realizado eletronicamente e agendar a sessão.",
    ],
  },
  {
    slug: "consulta-gratuita-de-protestos",
    title: "Consulta de protestos é gratuita e vale para todo o Brasil",
    excerpt:
      "Pela CENPROT, qualquer pessoa verifica em minutos se um CPF ou CNPJ possui protestos em qualquer cartório do país.",
    date: "2026-05-20",
    category: "Protesto",
    body: [
      "Muita gente ainda paga por consultas que a lei garante de graça. A CENPROT — Central Nacional de Protesto, mantida pelos próprios cartórios — permite consultar gratuitamente a existência de protestos em qualquer CPF ou CNPJ, em todos os cartórios do Brasil.",
      "A consulta simples informa se há protestos e em qual cartório. Para fins oficiais — licitações, financiamentos, cadastros — é necessária a certidão, que pode ser solicitada diretamente ao cartório da comarca ou pela própria central.",
      "Consultar antes de fechar negócio com um novo cliente ou fornecedor é uma prática simples de gestão de risco que evita prejuízos.",
    ],
  },
  {
    slug: "golpe-do-falso-boleto",
    title: "Atenção ao golpe do falso boleto de cartório",
    excerpt:
      "Criminosos enviam falsas intimações e boletos em nome de cartórios de protesto. Saiba como se proteger.",
    date: "2026-04-08",
    category: "Segurança",
    body: [
      "Circulam por e-mail, SMS e WhatsApp mensagens que se passam por cartórios de protesto, com falsas intimações e boletos — muitas vezes oferecendo descontos e impondo urgência para o pagamento.",
      "Proteja-se com três verificações simples: primeiro, desconfie de qualquer contato que pressione pelo pagamento imediato; segundo, confira se o beneficiário do boleto é realmente a serventia; terceiro, antes de pagar, confirme a existência da intimação pelo telefone oficial do cartório.",
      "Intimações verdadeiras identificam o título, o credor e o cartório responsável, e nunca oferecem 'descontos promocionais'. Na dúvida, ligue para o cartório da sua comarca — o telefone oficial deste cartório está na página de contato.",
    ],
  },
];

export function getArticle(slug: string): NewsArticle | undefined {
  return news.find((n) => n.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
