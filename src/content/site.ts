import { PENDING } from "@/types/content";

/**
 * Fonte única de verdade dos dados institucionais.
 *
 * ⚠️ Dados coletados de diretórios públicos em jul/2026 - confirmar com o
 * cartório antes da publicação (ver docs/01-pesquisa-e-benchmark.md, seção 4).
 * Campos com `PENDING` são exibidos como "Pendente de preenchimento" no site.
 */
export const site = {
  name: "Cartório de Notas e de Protesto de Potirendaba/SP",
  legalName: "Tabelião de Notas e de Protesto de Letras e Títulos de Potirendaba",
  shortName: "Cartório de Potirendaba",
  foundedYear: 1920,
  cns: "12.519-5",
  cnpj: PENDING,

  address: {
    street: "Rua Tiradentes",
    number: "1169",
    district: "Centro",
    city: "Potirendaba",
    state: "SP",
    zip: "15105-000",
    full: "Rua Tiradentes, 1169 - Centro, Potirendaba/SP, CEP 15105-000",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Tiradentes+1169+Potirendaba+SP",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Rua+Tiradentes,+1169,+Potirendaba+-+SP&output=embed",
  },

  phone: "(17) 3249-1499",
  phoneHref: "tel:+551732491499",
  email: "cartoriopotirendaba@gmail.com",

  hours: {
    label: "Segunda a sexta, das 9h às 17h",
    days: "Segunda a sexta-feira",
    open: "09:00",
    close: "17:00",
    note: "Exceto feriados nacionais, estaduais e municipais.",
  },

  titular: {
    name: "Caroline Figueiredo Soares de Almeida",
    role: "Tabeliã Titular",
  },
  substitute: {
    name: "Valter Cleber Moretti",
    role: "Substituto",
  },

  /** URL de produção - ajustar quando o domínio for contratado. */
  url: "https://cartoriopotirendaba.com.br",

  external: {
    eNotariado: "https://www.e-notariado.org.br",
    cenprot: "https://site.cenprotnacional.org.br",
    cenprotSp: "https://protestosp.com.br",
    tjspExtrajudicial: "https://extrajudicial.tjsp.jus.br",
    // Tabelas oficiais de emolumentos são publicadas no Portal Extrajudicial da CGJ-SP.
    emolumentos: "https://www.extrajudicial.tjsp.jus.br",
  },
} as const;

export type Site = typeof site;
