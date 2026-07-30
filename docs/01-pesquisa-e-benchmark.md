# Fase 1 — Pesquisa e Benchmark

> Projeto: Website institucional do **Cartório de Notas e de Protesto de Potirendaba/SP**
> Data da pesquisa: julho/2026

## 1. Contexto do domínio

### 1.1 Cartórios de Notas (Tabelionatos)

Serventias extrajudiciais delegadas pelo poder público (art. 236 da CF/88, Lei 8.935/94)
responsáveis por formalizar juridicamente a vontade das partes: escrituras públicas,
procurações, testamentos, atas notariais, reconhecimento de firma, autenticação de cópias.
Desde 2020, o **e-Notariado** (Provimento CNJ nº 100/2020) permite atos notariais
eletrônicos por videoconferência — qualquer site moderno de cartório precisa dar destaque
a esses serviços digitais.

### 1.2 Cartórios de Protesto

Regidos pela Lei 9.492/97. Fluxos principais para o cidadão/empresa:

* **Consulta de protestos** (Pesquisa Protesto / CENPROT — https://site.cenprotnacional.org.br)
* **Pagamento de títulos protestados** (boletos emitidos pelo cartório)
* **Apresentação de títulos a protesto** (credores)
* **Cancelamento e anuência eletrônica**

### 1.3 Regulação relevante para o conteúdo do site

* Tabelas de emolumentos fixadas por lei estadual (SP: Lei 11.331/2002) — transparência obrigatória.
* Provimentos da Corregedoria Geral da Justiça de SP (CGJ-SP) e do CNJ.
* LGPD (Lei 13.709/2018) — cartórios são controladores de dados pessoais; página de
  privacidade e canal do encarregado (DPO) são obrigatórios na prática.

## 2. Benchmark principal: extrajudicial.tjsp.jus.br

> **Nota de método:** o portal bloqueou acesso automatizado durante a pesquisa (HTTP 503,
> proteção anti-bot). A análise abaixo baseia-se em conhecimento consolidado da estrutura
> pública do portal. Recomenda-se validação visual manual antes da Fase 8.

### Pontos fortes

* Autoridade e abrangência: diretório oficial de todas as serventias do estado.
* Busca de cartórios por comarca/atribuição.
* Concentra comunicados oficiais e tabelas de custas.

### Pontos fracos

* **Arquitetura orientada à estrutura interna do TJ**, não às tarefas do cidadão
  ("Corregedoria", "Comunicados", "Peticionamento") — o usuário precisa conhecer o
  vocabulário jurídico para navegar.
* Identidade visual datada, densidade alta de texto, hierarquia visual fraca.
* Experiência mobile deficiente; componentes não responsivos.
* Pouca orientação prática ("o que preciso levar?", "quanto custa?", "quanto tempo leva?").
* Acessibilidade limitada (contraste, foco, semântica).

### Oportunidades de melhoria (que este projeto explora)

1. **Arquitetura orientada a tarefas**: cada serviço responde "o que é, para que serve,
   o que levar, quanto custa, quanto tempo leva, como começar".
2. **Busca inteligente por linguagem natural** ("firma", "autenticar documento", "protesto").
3. **Design premium e sóbrio** que transmite confiança sem parecer burocrático.
4. **Acessibilidade WCAG 2.2 AA** como requisito, não como acessório.
5. **Performance**: site estático, Core Web Vitals no verde.

## 3. Benchmark secundário: melhores sites de cartórios brasileiros

### 26º Tabelionato de Notas de São Paulo (26notas.com.br) — melhor referência nacional

* **Forte:** serviços agrupados por *momento de vida* (Família, Herança, Propriedade,
  Resolução de Conflitos) além do agrupamento técnico; skip-links e marcos de leitor de
  tela; destaque para atos por videoconferência; autoatendimento online.
* **Fraco:** menus densos; pouca diferenciação visual entre categorias; quase nenhuma
  imagem ou diagrama de processo.
* **Ideia absorvida:** dupla navegação — por categoria técnica (Notas/Protesto) *e* por
  necessidade ("Vou comprar um imóvel", "Preciso cobrar um cliente").

### Padrões observados no setor (síntese)

| Padrão recorrente | Problema | Nossa resposta |
|---|---|---|
| Lista textual de serviços | Não orienta o leigo | Cards + página de detalhe padronizada por serviço |
| Telefone/endereço escondidos | Fricção no contato | Contato persistente no header/footer + página dedicada |
| "Tabela de custas" em PDF | Inacessível e ilegível no mobile | Página de transparência em HTML com link para tabela oficial |
| Nenhum estado de pendência de dados | Dados desatualizados silenciosamente | Camada de conteúdo tipada com pendências explícitas |

## 4. Dados institucionais coletados (fontes públicas de diretório)

> ⚠️ Coletados de diretórios públicos (cartorio.net.br, gazetadopovo, cartorio.info) em
> jul/2026. **Devem ser confirmados pelo cartório antes da publicação.** O que não foi
> encontrado em fonte confiável está marcado como *Pendente de preenchimento* no site.

| Campo | Valor encontrado | Status |
|---|---|---|
| Nome | Cartório de Notas e de Protesto de Potirendaba/SP (Tabelião de Notas e de Protesto de Letras e Títulos) | OK (confirmar denominação oficial) |
| CNS | 12.519-5 | OK (confirmar) |
| CNPJ | — (valor de diretório com formato inválido; descartado) | **Pendente de preenchimento** |
| Endereço | Rua Tiradentes, 1169, Centro, Potirendaba/SP, CEP 15105-000 | OK (confirmar) |
| Telefone | (17) 3249-1499 | OK (confirmar) |
| E-mail | cartoriopotirendaba@gmail.com | OK (confirmar; recomenda-se e-mail em domínio próprio) |
| Titular | Caroline Figueiredo Soares de Almeida | OK (confirmar) |
| Substituto | Valter Cleber Moretti | OK (confirmar) |
| Horário | Segunda a sexta, 9h às 17h | OK (confirmar) |
| Logotipo | — | **Pendente de preenchimento** (logotipo provisório em SVG criado em código) |

## 5. Pesquisa de UX, design e tecnologia (síntese aplicada)

* **UX para serviços jurídicos:** linguagem simples (plain language) reduz abandono;
  usuários chegam com uma *tarefa* ("reconhecer firma"), não com um *conceito jurídico*.
  FAQ orientado por perguntas reais. Confiança se constrói com: dados oficiais visíveis,
  fotos reais (quando houver), tom sóbrio e ausência de dark patterns.
* **Design systems atuais:** tokens semânticos (cores/espaçamento/tipografia como CSS
  variables), componentes acessíveis por padrão, dark mode como progressive enhancement
  (não aplicado aqui — público-alvo e contexto institucional pedem tema claro único).
* **Interfaces institucionais modernas:** minimalismo com muito branco, serifada de
  display para tradição + sans-serif para UI, microinterações discretas, *scroll-reveal*
  sutil (padrão "Apple-like" contido — ver ADR-004 em `04-decisoes-tecnicas.md`).
* **WCAG 2.2 AA:** foco visível ≥ 2px (2.4.11/2.4.13), alvos de toque ≥ 24px (2.5.8),
  contraste 4.5:1, navegação por teclado completa, `prefers-reduced-motion` respeitado.
* **SEO moderno:** dados estruturados Schema.org (`Notary`, `FAQPage`, `BreadcrumbList`),
  metadata por rota, sitemap/robots gerados, URLs semânticas em pt-BR.
* **Performance:** Next.js App Router com Server Components e geração estática (SSG),
  `next/font` (zero layout shift), imagens otimizadas, JS mínimo no cliente
  (somente busca, menu, accordion e reveal são interativos).
