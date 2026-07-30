# Cartório de Notas e de Protesto de Potirendaba/SP — Website institucional

Website institucional profissional, moderno e acessível, construído com
**Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**,
100% estático (SSG) — hospedável em qualquer CDN.

## Como rodar

```bash
npm install
npm run dev    # desenvolvimento — http://localhost:3000
npm run build  # build de produção (34 rotas estáticas)
npm start      # serve o build
npm run lint   # ESLint
```

## Documentação do projeto

| Documento | Conteúdo |
|---|---|
| [`docs/01-pesquisa-e-benchmark.md`](docs/01-pesquisa-e-benchmark.md) | Pesquisa de domínio, benchmark (extrajudicial.tjsp.jus.br, 26notas), dados institucionais coletados |
| [`docs/02-arquitetura-da-informacao.md`](docs/02-arquitetura-da-informacao.md) | Mapa do site, navegação, modelo de conteúdo |
| [`docs/03-design-system.md`](docs/03-design-system.md) | Tokens, tipografia, movimento, inventário de componentes, wireframes |
| [`docs/04-decisoes-tecnicas.md`](docs/04-decisoes-tecnicas.md) | ADRs — cada decisão de arquitetura com alternativas e trade-offs |
| [`docs/05-manutencao.md`](docs/05-manutencao.md) | Guia de manutenção: como editar conteúdo, publicar notícia, checklist de pendências |

## Estrutura

```
src/
├── app/            Rotas (App Router) — todas estáticas
├── components/
│   ├── ui/         Primitivas: Button, Icon, FaqItem, SectionHeading, ScrollReveal…
│   ├── layout/     Header (mega-menu + busca ⌘K), Footer, Breadcrumbs, Logo
│   └── sections/   Seções de página (hero, cards, mapa, formulário…)
├── content/        ★ Todo o conteúdo editável (site.ts, services.ts, faq.ts, news.ts, team.ts)
├── lib/            Busca interna, SEO, JSON-LD, utilitários
└── types/          Interfaces do modelo de conteúdo
```

**Para editar conteúdo, altere apenas `src/content/`** — menus, cards, busca,
sitemap e páginas derivam automaticamente dali. Guia completo em
[`docs/05-manutencao.md`](docs/05-manutencao.md).

## Dados institucionais pendentes

Campos marcados como **"Pendente de preenchimento"** no site (rastreáveis com
`grep -r PENDING src/`): CNPJ, logotipo oficial, equipe completa, encarregado
LGPD, minicurrículo da tabeliã. Os demais dados (endereço, telefone, e-mail,
titular, horário) foram coletados de diretórios públicos e **devem ser
confirmados pelo cartório** antes da publicação — ver
[`docs/01-pesquisa-e-benchmark.md`](docs/01-pesquisa-e-benchmark.md), seção 4.

Antes de publicar, ajustar também o domínio de produção em
`src/content/site.ts` (campo `url`).
