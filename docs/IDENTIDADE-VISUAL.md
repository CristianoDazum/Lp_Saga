# Identidade oficial SAGA - homologação local

Referências fornecidas: `403.3 - SAGA - BRANDBOARD.pdf` e `SAGA_Logos_Transparentes_PNG.zip`.

## Paleta

- `--yellow`: `#FFB71B`, para CTAs e destaques sobre fundos escuros.
- `--petrol`: `#062A30`, para o fundo principal e títulos em seções claras.
- `--green` / `--deep`: `#025157`, para acentos institucionais e fundo do rodapé. O fechamento e o FAQ usam fundo claro; seus detalhes recebem verde e azul.
- `--muted`: cinza neutro `#536166`, para suavizar os textos de apoio sem reduzir a legibilidade.
- `--blue`: `#0069A7`, para numeração, pequenos detalhes e foco sobre fundos claros.
- Mantidos os neutros claros. O fundo da biografia deriva de uma mistura suave do verde oficial com o neutro; bordas e estados de hover usam variações da própria paleta.

Não há texto amarelo sobre fundo claro. A palavra “pronúncia” segue em azul-petróleo, sem fundo.

## Tipografia

Família Prompt via `@fontsource/prompt`, carregada por `next/font/local` em `src/lib/fonts.ts`:

- Headline principal: Bold 700, com proporção discretamente refinada.
- Títulos de seção e preços: Semibold 600.
- Títulos dos tópicos, passos, FAQ, botões e pequenas ênfases: Medium 500.
- Parágrafos, descrições e informações de apoio: Light 300.
- Chamadas de seção: Extra Light 200, com espaçamento de 0,5 em na apresentação principal e adaptações de espaçamento nos breakpoints existentes.
- Ênfases anteriormente em Lora: Prompt Extra Light Italic 200, um arquivo itálico verdadeiro da família, preservando a intenção visual aprovada.

Sem pesos ou itálicos sintéticos (`font-synthesis: none`). A estrutura foi preservada. A headline, os títulos menores e seus espaçamentos receberam refinamentos pontuais; as quebras naturais podem variar com as métricas dos novos pesos.

Fontes servidas pelo próprio site, sem chamadas de fontes a terceiros. Os seis WOFF2 latinos totalizam 108.960 bytes, incluindo os pesos intermediários reais 500 e 600. Fonte de distribuição: https://fontsource.org/fonts/prompt. Origem da família: https://github.com/google/fonts/tree/main/ofl/prompt. Licença: [Prompt-OFL.txt](Prompt-OFL.txt).

## Marca

O componente `Brand` utiliza `next/image` com as versões laterais oficiais positiva e negativa em `public/images/brand/`. Os PNGs foram copiados integralmente do ZIP, sem recortes, filtros, recoloração ou reconstrução. Cabeçalho e rodapé usam a versão negativa.

Não foi criada uma assinatura “Saga Eloquência” adicional ao desenho. O nome completo e Leonardo Hermes permanecem no nome acessível do link de início e nas identificações textuais existentes. O espaço do cabeçalho e a proporção original dos PNGs foram preservados.

## Preservação e validação

Mantidos a ordem das seções, textos comerciais, seis conteúdos, biografia, preço, fotografia, capa e configuração para sua futura troca, cinco links Kiwify, contatos, FAQ e crédito DazumDigital. Nenhuma alteração de metadata, domínio, DNS ou Vercel.

As transições, durações, movimentos de hover, entradas sequenciais e suporte a movimento reduzido/toque continuam nas implementações existentes. As asserções de cores e famílias tipográficas dos testes foram atualizadas para a identidade aprovada, preservando os testes funcionais e a auditoria WCAG A/AA.

Build, lint e TypeScript aprovados. Suíte completa: **40 testes aprovados**, sem retentativas, com `npm run test:e2e -- --workers=1`. Nenhuma violação axe WCAG A/AA nos quatro tamanhos, nenhum erro de console nos cenários funcionais e cinco CTAs verificados com navegação interceptada para o checkout original. Nenhuma compra foi realizada.

| Largura | Primeira aplicação da identidade | Refinamento | Rolagem horizontal |
| --- | --- | --- | --- |
| 320 px | 4618 px | 4635 px | Ausente |
| 375 px | 4514 px | 4531 px | Ausente |
| 768 px | 2982 px | 3013 px | Ausente |
| 1440 px | 2974 px | 2994 px | Ausente |

O CTA principal permanece dentro da primeira janela nas quatro larguras. Em 1440 × 768 px, a LP totaliza cerca de 3,90 dobras. Verificação realizada com Chromium; sem testes em aparelhos físicos.

As capturas completas de antes/depois foram salvas fora do repositório, nas pastas de artefatos `saga-brandboard` (primeira aplicação) e `saga-refinamento` (refinamento) da sessão, para não incluir arquivos temporários na futura publicação.

## Arquivos desta atualização

- `src/app/globals.css`: paleta, Prompt, aplicação da marca e remoção dos estilos da antiga marca em texto.
- `src/lib/fonts.ts` e `src/app/layout.tsx`: carregamento local da Prompt, sem alterar metadata ou viewport.
- `src/components/brand.tsx`: logo oficial em `next/image`, com nome acessível Saga Eloquência.
- `public/images/brand/saga-lateral-negativo.png` e `saga-lateral-positivo.png`: originais do ZIP.
- `package.json` e `package-lock.json`: Prompt substitui as dependências de Manrope, Inter e Lora; outras dependências inalteradas.
- `tests/landing.spec.ts`: cores e tipografia oficiais, com validação dos pesos reais e itálico.
- `README.md`, este documento e `docs/Prompt-OFL.txt`: documentação e licença.

Preview: http://127.0.0.1:3000/. Trabalho isolado na branch `brandboard`, com commit local autorizado após as validações; homologar visualmente antes do push manual e de qualquer publicação. A capa atual permanece até a entrega da arte final pela Mari.
