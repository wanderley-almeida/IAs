import { services, getServicePath, categoryLabels } from "@/content/services";
import { faqCategories } from "@/content/faq";
import { news } from "@/content/news";
import { normalize } from "./utils";

/**
 * Busca interna client-side (ADR-005): índice estático derivado do conteúdo,
 * scoring simples com pesos por campo e normalização de acentos.
 */

export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  group: string;
  /** Campos concatenados com pesos distintos no scoring. */
  haystackTitle: string;
  haystackKeywords: string;
  haystackBody: string;
}

export interface SearchResult {
  entry: SearchEntry;
  score: number;
}

function entry(
  title: string,
  description: string,
  href: string,
  group: string,
  keywords: string[] = [],
  body = "",
): SearchEntry {
  return {
    title,
    description,
    href,
    group,
    haystackTitle: normalize(title),
    haystackKeywords: normalize(keywords.join(" ")),
    haystackBody: normalize(`${description} ${body}`),
  };
}

const staticPages: SearchEntry[] = [
  entry(
    "Sobre o cartório",
    "Quem somos, nossa história e nossos valores.",
    "/sobre",
    "Institucional",
    ["cartorio", "historia", "quem somos", "institucional"],
  ),
  entry(
    "História",
    "Mais de um século servindo Potirendaba, desde 1920.",
    "/sobre/historia",
    "Institucional",
    ["historia", "fundacao", "1920"],
  ),
  entry(
    "A Tabeliã",
    "Conheça a titular responsável pela serventia.",
    "/sobre/tabelia",
    "Institucional",
    ["tabelia", "tabeliao", "titular", "responsavel"],
  ),
  entry(
    "Equipe",
    "A equipe que atende você no cartório.",
    "/sobre/equipe",
    "Institucional",
    ["equipe", "escreventes", "funcionarios"],
  ),
  entry(
    "Perguntas frequentes",
    "Respostas para as dúvidas mais comuns sobre nossos serviços.",
    "/faq",
    "Ajuda",
    ["faq", "duvidas", "perguntas"],
  ),
  entry(
    "Transparência",
    "Emolumentos, normas e informações oficiais da serventia.",
    "/transparencia",
    "Institucional",
    ["emolumentos", "custas", "tabela", "valores", "precos", "transparencia"],
  ),
  entry(
    "Contato e localização",
    "Endereço, telefone, e-mail, horário de atendimento e mapa.",
    "/contato",
    "Atendimento",
    ["contato", "telefone", "endereco", "mapa", "horario", "localizacao"],
  ),
  entry(
    "Política de Privacidade",
    "Como tratamos seus dados pessoais.",
    "/privacidade",
    "Institucional",
    ["privacidade", "dados"],
  ),
  entry(
    "LGPD",
    "Seus direitos como titular de dados e o canal do encarregado.",
    "/lgpd",
    "Institucional",
    ["lgpd", "dados pessoais", "encarregado", "dpo"],
  ),
  entry(
    "Notícias",
    "Comunicados e orientações do cartório.",
    "/noticias",
    "Notícias",
    ["noticias", "comunicados", "avisos"],
  ),
];

function buildIndex(): SearchEntry[] {
  const serviceEntries = services.map((s) =>
    entry(
      s.title,
      s.summary,
      getServicePath(s),
      categoryLabels[s.category],
      s.keywords,
      `${s.whatIs.join(" ")} ${s.useCases.join(" ")}`,
    ),
  );

  const faqEntries = faqCategories.flatMap((cat) =>
    cat.items.map((item) =>
      entry(item.question, item.answer, `/faq#${cat.id}`, "Perguntas frequentes"),
    ),
  );

  const newsEntries = news.map((n) =>
    entry(n.title, n.excerpt, `/noticias/${n.slug}`, "Notícias"),
  );

  return [...serviceEntries, ...staticPages, ...faqEntries, ...newsEntries];
}

const index = buildIndex();

export function search(rawQuery: string, limit = 8): SearchResult[] {
  const query = normalize(rawQuery.trim());
  if (query.length < 2) return [];

  const terms = query.split(/\s+/).filter((t) => t.length >= 2);
  if (terms.length === 0) return [];

  const results: SearchResult[] = [];

  for (const e of index) {
    let score = 0;
    let matchedTerms = 0;

    for (const term of terms) {
      let termScore = 0;
      if (e.haystackTitle.includes(term)) termScore += 10;
      if (e.haystackTitle.startsWith(term)) termScore += 4;
      if (e.haystackKeywords.includes(term)) termScore += 8;
      if (e.haystackBody.includes(term)) termScore += 2;
      if (termScore > 0) matchedTerms += 1;
      score += termScore;
    }

    // Exige que todos os termos apareçam em algum campo.
    if (matchedTerms === terms.length && score > 0) {
      results.push({ entry: e, score });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
