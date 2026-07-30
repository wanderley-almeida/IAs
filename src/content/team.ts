import type { TeamMember } from "@/types/content";
import { PENDING } from "@/types/content";
import { site } from "./site";

/**
 * Equipe da serventia. Nomes e cargos devem ser confirmados pelo cartório;
 * demais integrantes estão pendentes de preenchimento.
 */
export const team: TeamMember[] = [
  {
    name: site.titular.name,
    role: site.titular.role,
    description:
      "Responsável pela serventia, delegatária aprovada na forma do art. 236 da Constituição Federal, respondendo pela prática dos atos notariais e de protesto com fé pública.",
  },
  {
    name: site.substitute.name,
    role: site.substitute.role,
    description:
      "Substitui a tabeliã em seus impedimentos e afastamentos, praticando os atos próprios da serventia.",
  },
  {
    name: PENDING,
    role: "Escreventes e auxiliares",
    description:
      "Relação completa da equipe pendente de preenchimento pelo cartório.",
  },
];
