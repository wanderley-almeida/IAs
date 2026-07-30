import {
  notasServices,
  protestoServices,
  getServicePath,
} from "@/content/services";

/** Estrutura de navegação - derivada do catálogo de serviços (fonte única). */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  links: NavLink[];
}

export const servicesNav: { notas: NavGroup; protesto: NavGroup } = {
  notas: {
    label: "Serviços de Notas",
    href: "/servicos/notas",
    links: notasServices.map((s) => ({
      label: s.shortTitle,
      href: getServicePath(s),
      description: s.summary,
    })),
  },
  protesto: {
    label: "Serviços de Protesto",
    href: "/servicos/protesto",
    links: protestoServices.map((s) => ({
      label: s.shortTitle,
      href: getServicePath(s),
      description: s.summary,
    })),
  },
};

export const aboutNav: NavGroup = {
  label: "O Cartório",
  href: "/sobre",
  links: [
    { label: "Sobre o cartório", href: "/sobre" },
    { label: "História", href: "/sobre/historia" },
    { label: "A Tabeliã", href: "/sobre/tabelia" },
    { label: "Equipe", href: "/sobre/equipe" },
    { label: "Transparência", href: "/transparencia" },
  ],
};

export const primaryLinks: NavLink[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Contato", href: "/contato" },
];
