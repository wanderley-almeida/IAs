/**
 * Modelo de conteúdo do site (ADR-003).
 * Todo conteúdo editável vive em `src/content/` e obedece a estas interfaces.
 */

/** Valor institucional ainda não confirmado pelo cartório. */
export const PENDING = "Pendente de preenchimento" as const;
export type Pending = typeof PENDING;

export type ServiceCategory = "notas" | "protesto";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceStep {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  category: ServiceCategory;
  /** Nome completo exibido em títulos de página. */
  title: string;
  /** Nome curto para menus, cards e breadcrumbs. */
  shortTitle: string;
  /** Frase única usada em cards e meta description. */
  summary: string;
  /** Sinônimos e termos populares que alimentam a busca interna. */
  keywords: string[];
  /** Marca os serviços exibidos em "Mais procurados" na home. */
  popular?: boolean;
  whatIs: string[];
  useCases: string[];
  documents: { group: string; items: string[] }[];
  steps: ServiceStep[];
  deadline: string;
  costNote: string;
  legalBasis: string[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
  /** Canal digital oficial, quando existir (e-Notariado, CENPROT etc.). */
  digital?: { label: string; url: string; description: string };
}

export interface FaqCategory {
  id: string;
  label: string;
  items: ServiceFaq[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  category: string;
  body: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
}
