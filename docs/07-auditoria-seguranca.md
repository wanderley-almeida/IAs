# Auditoria de Segurança de Aplicação

> Escopo: website institucional do Cartório de Notas e de Protesto de
> Potirendaba/SP. Data: julho/2026. Referências: OWASP Top 10 (2021), OWASP
> ASVS 4.0 nível 1 (com itens de nível 2 quando aplicáveis).

## 0. Determinação da superfície de ataque

Antes de qualquer conclusão, foi levantado o que o sistema efetivamente
expõe. **Este é um site 100% estático (SSG), sem backend, banco de dados,
autenticação, sessão, API ou upload.** Todo o conteúdo é compilado a partir
de módulos TypeScript; nenhuma entrada de usuário é persistida ou
reapresentada a terceiros.

Consequência metodológica: classes inteiras do OWASP Top 10 não possuem
superfície neste sistema. Elas foram verificadas e estão documentadas como
**não aplicáveis com justificativa**, e não como "aprovadas" - a distinção
importa para uma auditoria futura, porque a aplicabilidade muda no instante
em que o projeto ganhar backend.

| Componente | Existe? | Observação |
|---|---|---|
| Backend / API própria | Não | Nenhuma rota de servidor, Server Action ou route handler |
| Banco de dados | Não | Conteúdo em módulos TypeScript compilados |
| Autenticação / sessão | Não | Nenhuma área restrita |
| Upload / download de arquivo | Não | Nenhum |
| Entrada de usuário processada | Parcial | Busca (client-side) e formulário (mailto) |
| Scripts de terceiros | Não | Fontes self-hosted; mapa só sob consentimento |
| Variáveis de ambiente | Não | Nenhuma em uso |

## 1. Vulnerabilidades encontradas

| # | Achado | Severidade | Impacto | Probabilidade | Situação |
|---|---|---|---|---|---|
| V1 | Ausência total de cabeçalhos de segurança (sem CSP, HSTS, X-Frame-Options, Permissions-Policy) | **Alta** | Clickjacking, ataques de downgrade, exploração ampliada de qualquer XSS futuro, acesso indevido a APIs do navegador | Alta | **Corrigido** |
| V2 | 12 vulnerabilidades altas em dependências transitivas (`postcss` 8.4.31 e `sharp` 0.34.5 embutidos pelo Next) | **Alta** | Path traversal e leitura arbitrária de arquivos em build; CVEs de libvips | Média (cadeia de build) | **Corrigido** |
| V3 | Injeção de cabeçalho de e-mail (CRLF/CWE-93) no formulário de contato | **Média** | Quebra de linha no nome injetaria cabeçalhos no `mailto`, permitindo Bcc oculto em clientes permissivos | Baixa | **Corrigido** |
| V4 | `X-Powered-By` expondo o framework | Baixa | Facilita reconhecimento automatizado e escolha de exploits | Alta | **Corrigido** |
| V5 | Iframe do Google Maps sem sandbox e com envio de referrer | Média | Iframe de terceiro com permissões amplas; vazamento da URL visitada | Média | **Corrigido** |
| V6 | Ausência de fronteira de erro: risco de detalhe técnico chegar ao usuário | Média | Vazamento de informação em falha inesperada | Baixa | **Corrigido** |
| V7 | Escape de JSON-LD cobrindo apenas `<` | Baixa | Sem exploração hoje (dado é constante), mas frágil para fonte dinâmica futura | Baixa | **Corrigido** |
| V8 | Formulário sem proteção contra bots nem limite de tamanho | Baixa | Abuso automatizado, URLs abusivas | Média | **Corrigido** |
| V9 | Carregamento do mapa do Google sem aviso, contradizendo a política de privacidade | Média (conformidade) | Conexão a terceiro sem transparência; inconsistência com a LGPD | Alta | **Corrigido** |
| V10 | Source maps de produção passíveis de publicação | Baixa | Exposição da árvore de código-fonte | Baixa | **Corrigido** |
| V11 | 9 vulnerabilidades altas no ferramental de desenvolvimento (ESLint → `minimatch`/`brace-expansion`) | Baixa | ReDoS/OOM no processo do linter | Baixa | **Risco aceito** (ver §3) |

## 2. Correções implementadas

### 2.1 Cabeçalhos HTTP (V1, V4, V10)

Criado `src/lib/security.ts` (política) e aplicado em `next.config.ts` para
todas as rotas, inclusive assets e páginas de erro. Verificado com `curl` na
resposta real do servidor.

| Cabeçalho | Valor | Por quê |
|---|---|---|
| `Content-Security-Policy` | ver §2.2 | Contenção de XSS, clickjacking e exfiltração |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Elimina downgrade para HTTP; 2 anos com preload |
| `X-Frame-Options` | `DENY` | Anti-clickjacking em navegadores legados |
| `X-Content-Type-Options` | `nosniff` | Impede MIME sniffing (ex.: SVG tratado como HTML) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Não vaza caminho navegado a terceiros |
| `Permissions-Policy` | nega câmera, microfone, geolocalização, pagamento, USB, sensores, `browsing-topics`, `interest-cohort` | Least privilege: o site não usa nenhuma dessas APIs |
| `Cross-Origin-Resource-Policy` | `same-origin` | Impede que terceiros embutam nossos recursos |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isola o contexto; mitiga XS-Leaks e tabnabbing |
| `Cross-Origin-Embedder-Policy` | `credentialless` | Isolamento sem quebrar o iframe do mapa (que não envia CORP) |
| `Origin-Agent-Cluster` | `?1` | Isolamento de agente por origem |
| `X-DNS-Prefetch-Control` | `off` | Evita vazar navegação a resolvedores de terceiros |
| `X-Powered-By` | **removido** | Reduz reconhecimento |

Complemento: `productionBrowserSourceMaps: false` e `Cache-Control:
immutable` apenas para arquivos com hash no nome.

### 2.2 CSP: decisão baseada em medição, não em premissa

A política final é:

```
default-src 'self'; script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;
font-src 'self'; connect-src 'self';
frame-src https://www.google.com https://maps.google.com;
media-src 'none'; object-src 'none'; worker-src 'self' blob:;
manifest-src 'self'; base-uri 'self'; form-action 'self';
frame-ancestors 'none'; upgrade-insecure-requests
```

`'unsafe-inline'` em `script-src` é uma concessão consciente. Três
alternativas mais estritas foram testadas e descartadas **com evidência**:

1. **Hash do nosso script + `'unsafe-inline'`** - inválido por
   especificação: a presença de qualquer hash faz o navegador ignorar
   `'unsafe-inline'`. Medido em navegador real: **35 violações e site sem
   hidratação** (não interativo). Esta foi, inclusive, a primeira versão
   escrita nesta auditoria, detectada e corrigida pelo próprio teste.
2. **Hash de todos os scripts inline** - medido no build: **430 hashes
   distintos, ~23 KB de cabeçalho**, acima do limite prático de 8 KB de
   CDNs. Por rota seria possível, mas qualquer edição de conteúdo alteraria
   os hashes e quebraria o site silenciosamente: controle frágil é pior que
   risco documentado.
3. **Nonce por requisição** - a documentação oficial do Next é explícita:
   exige renderização dinâmica. Eliminaria SSG e cache de CDN, com aumento
   de TTFB, para ganho prático nulo neste contexto.

**Controles compensatórios** que tornam o risco residual aceitável: nenhum
conteúdo de usuário é persistido ou renderizado; todo conteúdo vem de
módulos compilados; nenhum script de terceiros é carregado; e
`object-src 'none'`, `base-uri 'self'`, `form-action 'self'` e
`frame-ancestors 'none'` fecham os vetores clássicos de escalonamento.

**Gatilho de revisão:** adotar nonce via proxy no momento em que o projeto
ganhar backend, área autenticada ou qualquer renderização dinâmica.

### 2.3 Dependências (V2, V11)

O `npm audit fix --force` sugerido pelo npm rebaixaria o Next para a versão
9 - inaceitável. A correção correta foi forçar as versões corrigidas via
`overrides`, mantendo o Next 16.2.12 (última estável; ainda sem release que
corrija as transitivas):

```json
"overrides": { "postcss": "^8.5.25", "sharp": "^0.35.3" }
```

Resultado medido: **`npm audit --omit=dev`: 0 vulnerabilidades** (antes: 12
altas). Também atualizados `react` e `react-dom` para 19.2.8.

### 2.4 Formulário de contato (V3, V8)

* **Anti-CRLF:** campos que compõem o assunto passam por normalização de
  linha única, com remoção de caracteres de controle antes da codificação.
  Fecha a injeção de cabeçalho de e-mail.
* **Honeypot** invisível a humanos e a leitores de tela; se preenchido, o
  envio é descartado.
* **Limites** de comprimento por campo, no HTML e na função de envio.
* **Aviso explícito** para não enviar senhas, dados bancários ou documentos.

### 2.5 Iframe do mapa e privacidade (V5, V9)

`sandbox="allow-scripts allow-same-origin allow-popups
allow-popups-to-escape-sandbox"`, `referrerPolicy="no-referrer"` e aviso
antes do carregamento. Verificado em navegador: **nenhuma requisição a
terceiros ocorre antes do consentimento explícito**.

### 2.6 Tratamento de erros (V6)

Criados `src/app/error.tsx` e `src/app/global-error.tsx`. Nunca exibem
mensagem de exceção, pilha ou detalhe de infraestrutura: apenas um
identificador opaco (`digest`) para correlação com logs do servidor.
Verificado: resposta 404 não contém rastro de pilha ou caminho interno.

### 2.7 JSON-LD (V7)

Escape ampliado para `<`, `>`, `&` e os separadores de linha Unicode
U+2028/U+2029, que quebram o parser JavaScript. Defesa em profundidade para
o caso de o dado estruturado passar a vir de fonte dinâmica.

## 3. Vulnerabilidades remanescentes (risco aceito)

**V11 - Cadeia do ESLint (9 avisos altos, `minimatch`/`brace-expansion`).**
A correção exigiria ESLint 10, que foi testado nesta auditoria e **quebra o
`eslint-plugin-react`** usado pelo `eslint-config-next` (falha de execução
comprovada). Análise de risco: são dependências exclusivas de
desenvolvimento, jamais enviadas ao navegador ou ao servidor de produção; o
vetor é negação de serviço no processo do linter, exigindo padrões glob
maliciosos na configuração - que é versionada e revisada. **Aceito**, com
reavaliação quando `eslint-config-next` suportar ESLint 10.

Nenhuma outra vulnerabilidade permaneceu sem tratamento ou justificativa.

## 4. Checklist OWASP Top 10 (2021)

| Categoria | Situação | Evidência |
|---|---|---|
| A01 Broken Access Control | **N/A** | Não há recurso protegido, sessão ou papel de usuário. Controle equivalente aplicado: `frame-ancestors 'none'`, `base-uri 'self'` |
| A02 Cryptographic Failures | **OK** | Nenhum dado sensível trafega ou é armazenado. HSTS com preload força TLS. `localStorage` guarda apenas tema e tamanho de fonte, validados por lista fechada |
| A03 Injection | **OK** | Sem SQL/NoSQL/comando (não há backend). XSS: React escapa por padrão; único `dangerouslySetInnerHTML` é JSON-LD com escape ampliado. CRLF em `mailto` corrigido |
| A04 Insecure Design | **OK** | Arquitetura estática elimina classes inteiras de risco por design. Mapa com consentimento; dados institucionais não confirmados marcados como pendentes em vez de inventados |
| A05 Security Misconfiguration | **Corrigido** | Era o achado principal (V1/V4/V10): 12 cabeçalhos implementados, banner do framework removido, source maps desativados |
| A06 Vulnerable Components | **Corrigido** | Produção: 0 vulnerabilidades. Dev: 9 aceitas com justificativa (§3) |
| A07 Identification/Authentication Failures | **N/A** | Não há autenticação |
| A08 Software and Data Integrity Failures | **OK** | Sem script de terceiro em runtime (SRI seria inócuo). `package-lock.json` versionado fixa a árvore. `overrides` explícitos |
| A09 Logging and Monitoring Failures | **Parcial** | Sem backend, não há log de aplicação. Fronteiras de erro emitem `digest` correlacionável e nunca registram dados pessoais. Recomendação futura em §6 |
| A10 SSRF | **N/A** | Nenhuma requisição de servidor a URL controlada por usuário |

## 5. Checklist OWASP ASVS 4.0 (itens aplicáveis)

| Requisito | Situação |
|---|---|
| V1 Arquitetura, design e modelagem de ameaças | Superfície documentada (§0); decisões com trade-offs registrados |
| V5.1 Validação de entrada | Formulário com limites, normalização e lista fechada de assuntos |
| V5.2 Sanitização | Anti-CRLF no `mailto`; escape de JSON-LD |
| V5.3 Codificação de saída | React escapa por padrão; nenhuma renderização de HTML de usuário |
| V7.1 Log sem dados sensíveis | Nada de PII é registrado; erros no console apenas em desenvolvimento |
| V7.4 Tratamento de erro | Fronteiras de erro com mensagem genérica e `digest` opaco |
| V8.2 Proteção de dados no cliente | `localStorage` só com preferências não sensíveis, validadas |
| V12 Arquivos e recursos | Sem upload; `nosniff` e sandbox no iframe |
| V13 API | N/A (sem API) |
| V14.4 Cabeçalhos de segurança | 12 cabeçalhos implementados e verificados na resposta real |
| V14.5 Configuração HTTP | Métodos limitados ao servidor estático; sem CORS permissivo |

## 6. Recomendações futuras

Prioridade decrescente, para quando o projeto evoluir:

1. **Ao adicionar backend:** validar toda entrada no servidor (nunca confiar
   no cliente), aplicar rate limiting por IP, CSRF com `SameSite=Strict` +
   token, e migrar a CSP para nonce por requisição.
2. **Logs e monitoramento:** adotar coletor com retenção definida,
   registrando metadados (rota, código, `digest`) e **nunca** conteúdo de
   formulário, documentos ou identificadores pessoais.
3. **HSTS preload:** submeter o domínio definitivo a hstspreload.org depois
   de confirmar que todos os subdomínios servem HTTPS.
4. **Pipeline de CI:** rodar `npm audit --omit=dev`, `lint` e `build` como
   gate obrigatório de merge; adicionar Dependabot ou Renovate.
5. **Pentest externo:** o projeto está preparado para auditoria - a
   superfície reduzida deve manter o custo baixo.
6. **Revisão de `Expires` do `security.txt`:** renovar antes de 31/07/2027.
7. **E-mail em domínio próprio** com SPF, DKIM e DMARC: hoje o contato usa
   Gmail, o que enfraquece a autenticidade das mensagens do cartório e
   facilita falsificação - risco relevante, dado o golpe do falso boleto.

## 7. Impacto em performance

As medidas de segurança foram escolhidas para não degradar Core Web Vitals:

* Cabeçalhos são metadados de resposta: custo de banda desprezível.
* Manter SSG (em vez de nonce dinâmico) **preserva** TTFB e cache de CDN.
* O mapa sob consentimento **melhora** o LCP da página de contato, evitando
  cerca de 1 MB de terceiros no carregamento inicial.
* `Cache-Control: immutable` apenas para assets com hash: melhora repetição
  de visita sem risco de servir versão obsoleta de HTML.
* Bundle de JavaScript do cliente: 788 KB de chunks totais, sem nenhuma
  dependência de runtime além de React/Next.
