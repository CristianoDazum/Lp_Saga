# Identidade SAGA English - homologação local

Aplicação do feedback da Mari na branch `brandboard`, sobre o commit `ea3a392464132ae9244a2266889c238b332fee9b`. As alterações desta rodada não foram commitadas nem enviadas aos remotos. A `main` permanece em `705d983159949d5b2f371f876b6843d8258dd25a`; produção, domínio, DNS e Kiwify não foram alterados.

## Aplicação visual

- Azul `#0069A7` como fundo da primeira dobra e cor dos títulos de seção, navegação, detalhes e contatos.
- Branco nos fundos do cabeçalho, seções claras e rodapé, garantindo a leitura do logo azul/amarelo sem acrescentar painéis ou redesenhar a página.
- Amarelo `#FFB71B` nos cinco CTAs e na expressão grande “com segurança?”.
- Azul-petróleo `#062A30` em textos que precisam de alto contraste e nos estados de hover/foco dos links do rodapé. Verde `#025157` permanece em acentos secundários discretos.
- Textos pequenos sobre azul em branco. A palavra “like” usa branco com sublinhado amarelo: o amarelo como texto pequeno sobre esse azul não atinge o contraste mínimo de 4,5:1.
- Prompt, pesos, tamanhos, organização, espaçamentos refinados, fotografia e capa permanecem preservados.

## Marca oficial

Fonte: `409.3_-_marca_saga-12_1.png`, fornecido pela Mari. PNG transparente de 1214 × 578 px e 18.687 bytes.

O arquivo foi copiado integralmente para `public/images/brand/saga-english.png`, sem alterar pixels, cores, proporções ou margens. `Brand` utiliza `next/image`, dimensões explícitas, entrega responsiva e texto alternativo “SAGA English”. O nome acessível do link de início continua “Saga Eloquência com Leonardo Hermes — início”, preservando a identificação textual existente.

O favicon textual provisório em `src/app/icon.svg` foi removido. `src/app/icon.png` reutiliza exatamente o mesmo PNG oficial; não foi criada uma marca ou ícone alternativo. A cor visual do navegador foi alinhada a `#0069A7` em `viewport.themeColor`, sem alterar textos de metadata, indexação ou integrações.

Os antigos PNGs genéricos ficam preservados no histórico do projeto e não são mais utilizados pela LP. A capa antiga continua em uso conforme solicitado e aguarda a nova arte da Mari.

## Contraste e preservação

| Combinação | Contraste |
| --- | --- |
| Branco sobre azul `#0069A7` | 5,87:1 |
| Azul `#0069A7` sobre branco | 5,87:1 |
| Amarelo sobre azul, apenas headline grande | 3,36:1 |
| Azul-petróleo sobre os CTAs amarelos | 8,72:1 |

Comparação de navegador nas quatro larguras confirma igualdade dos textos visíveis, ordem das seções, imagens comerciais e atributos dos links. As declarações CSS de animação, atraso, transição, transformações e opacidade são idênticas às da versão anterior; somente as cores de alguns estados interativos foram adaptadas aos fundos claros.

## Responsividade

| Largura | Altura anterior | Altura atual | Rolagem horizontal |
| --- | --- | --- | --- |
| 320 px | 4635 px | 4654 px | Ausente |
| 375 px | 4531 px | 4550 px | Ausente |
| 768 px | 3013 px | 3021 px | Ausente |
| 1440 px | 2994 px | 2995 px | Ausente |

CTA principal dentro da primeira janela nos quatro tamanhos. Desktop de 1440 × 768 px: aproximadamente 3,90 dobras.

## Testes

- Build, lint e TypeScript aprovados.
- **40 testes Playwright aprovados**, sem retentativas, em 2,2 minutos com `npm run test:e2e -- --workers=1`.
- Nenhuma violação axe WCAG A/AA nos quatro tamanhos e nenhum erro de console nos cenários funcionais.
- Cinco CTAs com destino Kiwify preservado, abertura em nova aba e isolamento de `window.opener`, validados com interceptação local do destino; nenhuma compra foi realizada.
- Proporções e arquivo do logo, fontes Prompt e pesos, hover, efeitos das imagens, passos sequenciais, toque, teclado/foco e movimento reduzido aprovados.
- Conferência realizada em Chromium; testes em aparelhos físicos não foram realizados.

Capturas completas, primeira dobra, cabeçalho e rodapé de antes/depois foram salvos nos artefatos locais da sessão, na pasta `saga-english`, fora do repositório. Os nomes incluem `before-hero-1440.png`, `after-hero-1440.png`, `before-footer-1440.png` e `after-footer-1440.png`, com equivalentes para 320, 375 e 768 px.

## Arquivos desta rodada

- `src/app/globals.css`: cores, fundos, estados de foco/hover e aplicação responsiva dos logos. O cabeçalho branco ocupa toda a largura, mantendo o conteúdo alinhado ao hero.
- `src/components/brand.tsx`: arquivo, dimensões e texto alternativo do logo oficial. `src/app/page.tsx` recebeu somente a remoção da antiga opção `light` nas duas chamadas de `Brand`, sem mudar textos ou estrutura.
- `public/images/brand/saga-english.png` e `src/app/icon.png`: cópias integrais do PNG fornecido. `src/app/icon.svg`: removido por conter a identidade textual provisória.
- `src/app/layout.tsx`: apenas a cor visual do navegador (`themeColor`).
- `tests/landing.spec.ts`: cores acessíveis, PNG oficial, proporções e alinhamento do cabeçalho, preservando a suíte de 40 testes e a auditoria de contraste.
- `README.md` e este relatório: documentação atualizada. Fontes, dependências, conteúdo comercial e lógica de checkout não foram modificados.

Preview: http://127.0.0.1:3000/. Aguardar homologação visual antes de autorizar qualquer commit, push ou deploy.
