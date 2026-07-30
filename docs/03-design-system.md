# Fase 3 — Design System

> **Adendo v2 (jul/2026):** após feedback do cliente e foto da fachada, o
> design system evoluiu: display passou de Lora para **Fraunces**; entrou o
> **azul da fachada `#2E6FB5`** como cor de ação (botões/links/brilhos);
> superfícies escuras ganharam **aurora + grain + dotgrid** e vidro
> (glassmorphism); cards em bento com filete dourado; botões em pill;
> **tema escuro** automático (segue o sistema) com alternância manual,
> tamanho de fonte ajustável e **VLibras** sob demanda no menu de
> acessibilidade. Tokens completos em `src/app/globals.css`. Estudo de
> identidade/logotipo em `docs/06-identidade-visual.md`.

## Conceito: "Sobriedade premium"

O site deve parecer um **escritório de alto padrão**, não um órgão burocrático nem uma
startup. Referências de tom: sites de private banking e de escritórios de advocacia
premium — muito branco, serifada elegante nos títulos, azul profundo, dourado usado
como *fio* (detalhes finos), nunca como área de cor.

## Tokens (CSS variables em `globals.css`)

### Cor

| Token | Valor | Uso |
|---|---|---|
| `--color-navy-950` | `#0B1D33` | Fundos escuros (hero, footer) |
| `--color-navy-900` | `#102A47` | Títulos sobre claro, superfícies escuras |
| `--color-navy-800` | `#16385E` | Hover de superfícies escuras |
| `--color-navy-700` | `#1E4976` | Primária de ação (botões, links) |
| `--color-navy-600` | `#2A5C90` | Hover de ação |
| `--color-gold-500` | `#B08C3E` | Detalhes: filetes, ícones de destaque, marcadores |
| `--color-gold-400` | `#C9A55C` | Dourado sobre fundo escuro |
| `--color-ink-900/700/500` | `#1A2332 / #3F4C5E / #64748B` | Texto: títulos / corpo / apoio |
| `--color-surface-0/1/2` | `#FFFFFF / #F8FAFC / #EEF2F7` | Fundos claros |
| `--color-line` | `#E2E8F0` | Bordas e divisores |
| Feedback | verde `#1B7A4B`, âmbar `#9A6B14`, vermelho `#B3362B` | Sucesso/aviso/erro (contraste AA sobre branco) |

Regras de contraste: corpo `ink-700` sobre branco = 9.9:1; links `navy-700` = 8.2:1;
dourado **nunca** é usado para texto pequeno sobre branco (3.2:1 — reprova AA);
sobre navy usa-se `gold-400`.

### Tipografia

* **Display/títulos:** `Lora` (serifada contemporânea, via `next/font`, subset latin,
  `display: swap`) — transmite tradição e autoridade.
* **UI/corpo:** `Inter` — legibilidade máxima em telas.
* Escala (rem): 12.5 / 14 / 16 (base) / 18 / 20 / 24 / 30 / 38 / 48 / 60.
  Corpo com `line-height: 1.7`; títulos `1.15`–`1.25`; `text-wrap: balance` em headings.

### Espaçamento e forma

* Grid de 4px; seções com respiro generoso (`py-20`/`py-28` desktop).
* Container máx. 1200px (`max-w-7xl`) com gutter fluido.
* Raio: 8px (inputs/botões), 16px (cards), 999px (pills).
* Sombras muito suaves, 1 nível apenas (`shadow-sm` + borda) — aparência "impressa".

### Iconografia

Ícones em SVG inline (traço 1.5px, estilo outline, 24×24) desenhados no próprio código —
sem dependência externa, com `aria-hidden` e rótulos textuais adjacentes.

## Movimento (microinterações)

| Padrão | Especificação |
|---|---|
| Scroll-reveal | fade + translateY(16px), 500–700ms, `cubic-bezier(0.22,1,0.36,1)`, dispara 1× via IntersectionObserver |
| Stagger | irmãos com atraso incremental de 60–90ms |
| Hover de card | elevação sutil + deslocamento do ícone/seta, 200ms |
| Accordion | grid-template-rows 0fr→1fr, 300ms |
| Contadores | animação numérica 1× na entrada (estatísticas da home) |
| **Acessibilidade** | `prefers-reduced-motion: reduce` desativa tudo (conteúdo visível de imediato, sem translação) |

Proibido: parallax pesado, scroll-jacking, autoplay de carrossel, animações em loop.
Justificativa completa no ADR-004 (`04-decisoes-tecnicas.md`).

## Componentes (inventário)

**Primitivas (`src/components/ui/`)**: Button (3 variantes × 3 tamanhos), Card,
Badge/Pill, Accordion (nativo `<details>` aprimorado), Input/Textarea/Select com label
flutuante não — label fixa acima (melhor para acessibilidade), Reveal (scroll),
Icon set, SectionHeading (eyebrow dourado + título serifado + lede).

**Layout (`src/components/layout/`)**: Header (mega-menu), MobileMenu, SearchDialog
(⌘K), Breadcrumbs, Footer, SkipLink.

**Seções (`src/components/sections/`)**: Hero, QuickAccess (mais procurados),
ServicePillars (Notas × Protesto), NeedsGrid ("por necessidade"), Stats, NewsPreview,
FaqPreview, ContactStrip, CtaDigital, MapEmbed (lazy, com facade), ServiceDetail
(template completo de serviço).

## Wireframes (Fase 4 — descrição estrutural)

### Home
1. Hero navy: eyebrow "Serventia oficial · desde 1920" · H1 serifado · sub · 2 CTAs
   (Ver serviços / Falar com o cartório) · barra de busca proeminente · faixa de dados
   (endereço, horário, telefone) ancorada na base.
2. "Mais procurados" — 6 atalhos em pills/cards compactos.
3. Pilares — 2 cards grandes (Notas / Protesto) com lista dos serviços.
4. "Como podemos ajudar" — grid por necessidade (6 cenários narrativos).
5. Passo a passo de atendimento (3 passos) + stats (anos de história, atos, prazo).
6. CTA serviços digitais (e-Notariado / consulta CENPROT) em faixa navy.
7. FAQ preview (4 itens) + Notícias (3 cards) + faixa de contato com mapa.

### Página de serviço (template)
Breadcrumb → H1 + resumo em 1 frase → grid 2 colunas: conteúdo (o que é, quando usar,
documentos em checklist, etapas numeradas, prazo/custo com aviso de emolumentos) +
aside pegajoso (card de contato, horário, serviços relacionados) → FAQ do serviço →
CTA final.

### Hubs (Notas/Protesto), Sobre, FAQ, Notícias, Transparência, Contato
Seguem o mesmo esqueleto: PageHero compacto (navy, breadcrumb, H1, lede) + seções em
superfície clara alternada, sempre com `Reveal` sutil.
