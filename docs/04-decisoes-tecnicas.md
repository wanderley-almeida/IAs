# Fase 6 (prévia) — Decisões técnicas (ADRs)

Formato: contexto → alternativas → decisão → consequências.

## ADR-001 — Next.js App Router com geração estática total (SSG)

**Contexto:** site institucional, conteúdo muda raramente, requisitos fortes de
performance/SEO. **Alternativas:** (a) SPA React pura — descartada: SEO fraco, JS pesado;
(b) site estático com Astro — excelente, mas o requisito pede Next/React e a equipe do
projeto padroniza Next; (c) Next.js SSR — servidor desnecessário para conteúdo estático.
**Decisão:** Next.js 16 App Router, todas as rotas estáticas (`output` padrão, sem
`dynamic`), Server Components por padrão; client components apenas em 5 ilhas de
interatividade (menu, busca, accordion*, reveal, formulário). \*Accordion usa `<details>`
nativo — client só para animação. **Consequências:** hospedagem barata (qualquer CDN),
TTFB mínimo, Core Web Vitals altos; conteúdo editável via arquivos tipados (ADR-003).

## ADR-002 — Tailwind CSS v4 + tokens em CSS variables

**Alternativas:** CSS Modules (verboso para design system), styled-components (runtime
CSS-in-JS penaliza performance e briga com Server Components). **Decisão:** Tailwind v4
com `@theme` mapeando os tokens do design system; classes utilitárias nos componentes;
nenhum CSS-in-JS. **Consequências:** bundle CSS pequeno, tokens auditáveis num único
arquivo, dark mode possível no futuro trocando variables.

## ADR-003 — Conteúdo como módulos TypeScript tipados (sem CMS nesta fase)

**Contexto:** o cartório precisa editar dados (horário, equipe, notícias) sem quebrar o
site; ainda não há CMS contratado. **Alternativas:** (a) CMS headless (Sanity/Strapi) —
custo/infra prematuros; (b) Markdown + frontmatter — sem checagem de tipos nos campos
estruturados (documentos, etapas). **Decisão:** `src/content/*.ts` com interfaces em
`src/types/`; campo institucional ausente recebe a constante `PENDING`
("Pendente de preenchimento"), visível na UI e rastreável por grep. **Consequências:**
zero infra; migração futura a CMS é trivial (mesmas interfaces viram schema); notícia
nova = 1 objeto novo em `news.ts`.

## ADR-004 — Animações: scroll-reveal sutil, sem scroll-jacking (resposta ao pedido "estilo Apple")

**Contexto:** o requisito pede "ar de inovação" citando o padrão Apple de animações ao
rolar. **Análise:** o efeito Apple tem dois ingredientes distintos: (1) *revelação
progressiva* de conteúdo ao entrar no viewport — barata, elegante, acessível; (2)
*scroll-driven storytelling* (vídeo/3D preso ao scroll, scroll-jacking) — caro em
performance, hostil a leitores de tela, e **inadequado ao contexto**: quem acessa um
cartório quer concluir uma tarefa em segundos, não assistir a uma narrativa. Sites
jurídicos que adotam (2) parecem exatamente o que o projeto quer evitar: forma sobre
função. **Decisão:** adotar (1) com rigor — fade/slide de 16px com easing refinado,
stagger em grids, contadores animados, microinterações de hover — e rejeitar (2).
Implementação com IntersectionObserver próprio (~40 linhas) em vez de framer-motion
(~35 kB): menos JS, mesmas animações CSS-driven, `prefers-reduced-motion` respeitado.
**Consequências:** sensação "viva" e contemporânea sem custo de LCP/INP; usuários com
vestibulopatias ou leitores de tela têm experiência íntegra.

## ADR-005 — Busca interna client-side sobre índice estático

**Contexto:** "localizar qualquer serviço em poucos segundos". **Alternativas:** Algolia
(custo/infra), API route com busca no servidor (exige servidor, quebra SSG).
**Decisão:** índice gerado do catálogo `services.ts` + FAQ + páginas institucionais;
scoring próprio (título > sinônimos > resumo) com normalização de acentos; dialog
acessível (⌘K/Ctrl-K, focus trap, `role="dialog"`). ~2 kB de código, zero dependências.
**Consequências:** busca instantânea offline-friendly; sinônimos populares ("firma",
"xerox") mapeiam para os serviços corretos porque vivem no próprio catálogo.

## ADR-006 — Mapa com facade (sem iframe no carregamento)

Google Maps iframe custa ~1 MB e degrada LCP. **Decisão:** imagem estática leve/placeholder
com botão "Ver no mapa" que injeta o iframe sob demanda (padrão *facade*) + links diretos
Google Maps/Waze. **Consequências:** contato pesa quilobytes, não megabytes.

## ADR-007 — Formulário de contato sem backend nesta fase

Sem servidor não há como receber POST. **Decisão:** formulário com validação client-side
e envio via `mailto:` estruturado + canais diretos em destaque (telefone/WhatsApp/e-mail),
claramente sinalizado no código (`// TODO: integrar provedor`) para futura integração
(Resend/Formspree/API própria). **Consequências:** nenhuma promessa falsa ao usuário;
caminho de evolução documentado.

## ADR-008 — Logotipo provisório em SVG código

Sem logotipo oficial (pendência), um emblema tipográfico sóbrio (monograma "CP" com
filete dourado) foi desenhado em SVG inline, marcado como provisório na documentação.
Trocar o logo = substituir 1 componente (`Logo.tsx`).
