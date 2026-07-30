import type { FaqCategory } from "@/types/content";
import { site } from "./site";

/** FAQ geral do site. FAQs específicas de cada serviço vivem em services.ts. */
export const faqCategories: FaqCategory[] = [
  {
    id: "atendimento",
    label: "Atendimento",
    items: [
      {
        question: "Qual o horário de atendimento do cartório?",
        answer: `${site.hours.label}. ${site.hours.note}`,
      },
      {
        question: "Preciso agendar horário para ser atendido?",
        answer:
          "Para serviços de balcão (reconhecimento de firma, autenticação, boletos) não é necessário agendar. Para escrituras, testamentos e atos mais complexos, recomendamos contato prévio por telefone ou e-mail para orientação sobre documentos e agendamento da assinatura.",
      },
      {
        question: "O cartório atende pessoas com dificuldade de locomoção?",
        answer:
          "Sim. Além do atendimento preferencial previsto em lei, o tabelião pode realizar diligências externas (residências e hospitais) para atos como procurações e testamentos, mediante agendamento.",
      },
      {
        question: "Quais formas de pagamento são aceitas?",
        answer:
          "Consulte o cartório sobre as formas de pagamento disponíveis para cada tipo de ato pelo telefone " +
          site.phone +
          ".",
      },
    ],
  },
  {
    id: "notas",
    label: "Serviços de Notas",
    items: [
      {
        question: "O que é preciso para reconhecer firma?",
        answer:
          "Ter firma aberta no cartório (cadastro feito uma única vez, com documento original) e apresentar o documento assinado. No reconhecimento por autenticidade, a assinatura é feita na hora, diante do escrevente.",
      },
      {
        question: "Posso fazer escritura ou procuração sem ir ao cartório?",
        answer:
          "Sim. Pela plataforma e-Notariado, atos notariais podem ser realizados por videoconferência com certificado digital notarizado, emitido gratuitamente pelo próprio cartório.",
      },
      {
        question: "Divórcio e inventário podem mesmo ser feitos em cartório?",
        answer:
          "Sim, desde a Lei nº 11.441/2007, quando houver consenso entre as partes e os demais requisitos legais forem atendidos (por exemplo, ausência de menores ou incapazes com questões pendentes). É necessário advogado.",
      },
    ],
  },
  {
    id: "protesto",
    label: "Protesto",
    items: [
      {
        question: "Recebi uma intimação de protesto. O que devo fazer?",
        answer:
          "Você tem 3 dias úteis para pagar o título no cartório (emitimos o boleto) ou apresentar motivo relevante. Pagando no prazo, o protesto não é lavrado e nada consta em seu nome.",
      },
      {
        question: "Como consulto se há protesto no meu CPF ou CNPJ?",
        answer:
          "A consulta é gratuita na CENPROT (site.cenprotnacional.org.br), central oficial dos cartórios de protesto, que abrange todo o Brasil.",
      },
      {
        question: "Paguei a dívida. Meu nome fica limpo automaticamente?",
        answer:
          "Não. Após a quitação é preciso requerer o cancelamento do protesto no cartório, com a carta de anuência do credor ou o título original quitado.",
      },
      {
        question: "Como me protejo de golpes de falso boleto de cartório?",
        answer:
          "Desconfie de boletos recebidos por e-mail ou WhatsApp com descontos e urgência. Antes de pagar, confirme pelo telefone oficial " +
          site.phone +
          " e verifique se o beneficiário é a própria serventia.",
      },
    ],
  },
  {
    id: "custos",
    label: "Custos e prazos",
    items: [
      {
        question: "Quanto custam os serviços do cartório?",
        answer:
          "Os emolumentos são tabelados por lei estadual (Lei nº 11.331/2002) e idênticos em todos os cartórios de São Paulo — não há cobrança livre. A tabela vigente está na página de Transparência; para um cálculo exato do seu caso, entre em contato.",
      },
      {
        question: "Por que os valores mudam todo ano?",
        answer:
          "A tabela de emolumentos é atualizada anualmente pelo Tribunal de Justiça de São Paulo, conforme critérios da lei estadual.",
      },
    ],
  },
];

export const allFaqItems = faqCategories.flatMap((c) => c.items);
