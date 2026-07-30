# Fases 7–10 — Implementação, revisão, otimização e manutenção

## O que foi implementado

* **34 rotas 100% estáticas** (SSG): home, 4 páginas institucionais, hub de
  serviços + 2 hubs de categoria + 11 páginas de serviço, FAQ, notícias (lista
  + 3 artigos), transparência, privacidade, LGPD, contato, busca e 404.
* **5 ilhas de interatividade** (client components): Header/menus, busca (⌘K e
  página `/busca`), scroll-reveal, contadores, mapa facade e formulário.
  Todo o resto é Server Component sem JavaScript no cliente.
* **Busca inteligente** com sinônimos populares ("firma", "xerox", "boleto"),
  normalização de acentos e scoring por campo — dialog global (Ctrl/⌘-K) e
  página dedicada.
* **SEO**: metadata por rota, Open Graph, canonical, Schema.org (`Notary`,
  `Service`, `FAQPage`, `BreadcrumbList`, `NewsArticle`), sitemap.xml,
  robots.txt, URLs semânticas.
* **Acessibilidade WCAG 2.2 AA**: skip-link, foco visível, navegação por
  teclado completa (menus, dialog com focus trap nativo, accordions
  `<details>`), ARIA correta, contraste ≥ 4.5:1 validado nos tokens,
  `prefers-reduced-motion` respeitado em todas as animações, HTML semântico.
* **Performance**: zero dependências de runtime além de React/Next; fontes
  self-hosted via `next/font`; mapa carregado sob demanda; animações
  CSS-driven; bundle de busca só carrega ao abrir o dialog.

## Como editar conteúdo (para a equipe do cartório / mantenedores)

Todo o conteúdo vive em `src/content/` — nenhuma página precisa ser tocada.

| Tarefa | Arquivo | Como |
|---|---|---|
| Corrigir telefone, horário, CNPJ… | `site.ts` | Editar o campo; tudo atualiza (header, footer, contato, transparência, JSON-LD) |
| Publicar notícia | `news.ts` | Adicionar objeto no início do array (slug, título, resumo, data, categoria, parágrafos) |
| Alterar/adicionar serviço | `services.ts` | Editar o objeto do serviço; menus, cards, busca e sitemap derivam dele |
| Editar FAQ | `faq.ts` | Adicionar/editar itens por categoria |
| Atualizar equipe | `team.ts` | Substituir os registros `PENDING` pelos nomes reais |
| Trocar o logotipo | `components/layout/Logo.tsx` + `app/icon.svg` | Substituir o SVG provisório pelo oficial |

Após editar: `npm run build` valida tipos e gera o site. Um campo obrigatório
faltando é erro de compilação — não vai silenciosamente ao ar.

## Checklist antes de ir a produção

1. [ ] Confirmar com o cartório: endereço, telefone, e-mail, horário, titular,
       substituto, CNS (fontes atuais: diretórios públicos, jul/2026).
2. [ ] Preencher CNPJ (`site.ts`) — hoje "Pendente de preenchimento".
3. [ ] Substituir logotipo provisório pelo oficial (ADR-008).
4. [ ] Definir domínio e atualizar `site.url` (afeta canonical/sitemap/JSON-LD).
5. [ ] Nomear encarregado LGPD (página `/lgpd`).
6. [ ] Completar equipe (`team.ts`) e minicurrículo da tabeliã.
7. [ ] Validar conteúdo jurídico das páginas de serviço com a tabeliã.
8. [ ] Rodar Lighthouse no ambiente de produção (meta: ≥95 em todas as categorias).

## Riscos e evolução recomendada

* **Formulário de contato** usa `mailto:` (ADR-007) — integrar um provedor de
  envio (Resend, Formspree ou API própria) quando houver backend/infra.
* **Notícias em arquivo** escalam bem até algumas dezenas; acima disso,
  migrar para CMS headless (as interfaces em `src/types/` viram o schema).
* **E-mail institucional** em domínio próprio (hoje Gmail) fortalece a
  credibilidade e o SPF/DKIM.
* **Fotos reais** do prédio, da equipe e da tabeliã elevariam o nível de
  confiança — os espaços estão previstos no design.
* **Analytics** (ex.: Plausible, cookieless) se desejado — hoje o site não
  rastreia nada, o que simplifica a LGPD.
