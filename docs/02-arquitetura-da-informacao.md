# Fase 2 — Arquitetura da Informação

## Princípio norteador

**Organização orientada a tarefas do usuário**, não à estrutura interna do cartório.
Toda página de serviço responde, nesta ordem: *o que é → para que serve → o que levar →
quanto custa → quanto tempo leva → como começar (CTA)*.

## Mapa do site (rotas)

```
/                               Home
/sobre                          Sobre o cartório (hub)
/sobre/historia                 História (desde 1920)
/sobre/tabelia                  A Tabeliã
/sobre/equipe                   Equipe
/servicos                       Hub de serviços (todos, com busca/filtro)
/servicos/notas                 Hub — Serviços de Notas
/servicos/notas/escrituras
/servicos/notas/procuracoes
/servicos/notas/testamentos
/servicos/notas/atas-notariais
/servicos/notas/reconhecimento-de-firma
/servicos/notas/autenticacao
/servicos/notas/certidoes
/servicos/protesto              Hub — Serviços de Protesto
/servicos/protesto/protesto-de-titulos
/servicos/protesto/emissao-de-boletos
/servicos/protesto/consulta-de-protestos
/servicos/protesto/cancelamento-de-protesto   (adicionado — fluxo essencial ausente do escopo original)
/faq                            Perguntas frequentes (por categoria, com busca)
/noticias                       Notícias e comunicados
/noticias/[slug]                Detalhe da notícia
/transparencia                  Emolumentos, normas, links oficiais
/privacidade                    Política de Privacidade
/lgpd                           LGPD — direitos do titular e canal do encarregado
/contato                        Contato + Localização (mapa, horários, canais)
/busca                          Resultados da busca interna
```

Decisões de rota:

* **`/sobre/tabelia`** (e não "tabeliao"): a titular é mulher; o rótulo segue o cargo real.
* **Localização fundida em `/contato`**: separar endereço de canais de contato cria duas
  páginas fracas; juntas formam uma página forte. "Localização" permanece como âncora
  (`/contato#localizacao`) para atender ao requisito.
* **`cancelamento-de-protesto` adicionado**: é o 2º fluxo mais buscado em protesto
  (depois da consulta); a ausência dele obrigaria o usuário a telefonar.
* URLs em português, minúsculas, sem acentos — legibilidade + SEO.

## Navegação

### Header (desktop)
`Início · Serviços ▾ (mega-menu em 2 colunas: Notas | Protesto) · O Cartório ▾ (Sobre,
História, Tabeliã, Equipe, Transparência) · FAQ · Notícias · Contato` + botão de busca
(⌘K / Ctrl-K) + CTA "Serviços digitais".

### Header (mobile)
Menu hambúrguer full-screen com grupos expansíveis, busca no topo, telefone clicável.

### Rodapé
4 colunas: institucional (nome, CNS, CNPJ, endereço, horário) · Serviços de Notas ·
Serviços de Protesto · Institucional (FAQ, transparência, privacidade, LGPD, contato)
+ barra legal (© ano, "site em conformidade com…", crédito discreto).

### Navegação estrutural
* **Breadcrumbs** em todas as páginas internas (com Schema.org `BreadcrumbList`).
* **Atalhos rápidos na Home** ("Mais procurados"): Reconhecimento de firma, Autenticação,
  Consulta de protestos, Emissão de boletos, Escrituras, Procurações.
* **Dupla entrada na Home**: por categoria (Notas/Protesto) e por necessidade
  ("Vou comprar um imóvel", "Preciso cobrar um cliente", "Recebi um aviso de protesto").

## Modelo de conteúdo (camada tipada)

Todo conteúdo vive em `src/content/` como módulos TypeScript tipados:

* `site.ts` — dados institucionais únicos (single source of truth). Campos não
  confirmados usam o tipo `Pending` que renderiza "Pendente de preenchimento" e é
  rastreável via grep.
* `services.ts` — catálogo de serviços: título, slug, categoria, resumo, descrição,
  documentos necessários, etapas, prazos, base legal, FAQs específicas, palavras-chave
  de busca (sinônimos populares: "firma", "xerox autenticada").
* `faq.ts` — perguntas por categoria.
* `news.ts` — notícias (estrutura pronta para futura migração a CMS).

Benefícios: consistência entre páginas, busca interna alimentada pelo mesmo catálogo,
zero divergência entre menu/sitemap/cards (tudo deriva de `services.ts`).
