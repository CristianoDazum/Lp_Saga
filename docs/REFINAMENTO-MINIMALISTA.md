# Refinamento visual da LP Saga Eloquência

Branch: `brandboard`, criada a partir de `main` em `705d983159949d5b2f371f876b6843d8258dd25a`, preservando as alterações locais anteriores da identidade. Não houve alteração do ponteiro de `main`, merge, push ou deploy de produção.

## Evolução visual

- Prompt Bold 700 concentrado na headline principal, com máximo de 55 px em vez de 57 px e entrelinha discretamente mais aberta no desktop.
- Prompt Semibold 600 nos títulos de seção e preços. Prompt Medium 500 nos seis tópicos, passos, botões, FAQ e ênfases menores. Os pesos são arquivos reais da família; nenhum peso ou itálico sintético.
- Títulos dos tópicos ajustados de 18 para 17 px, com entrelinha de 1,5 e respiro refinado. Duas colunas no desktop e uma no mobile, como antes.
- Descrições em Prompt Light 300 e cinza neutro, distinguindo conteúdo de apoio dos títulos azul-petróleo. Prompt Extra Light Italic 200 preservado nos destaques tipográficos.
- CTA final e FAQ sobre o fundo claro existente, com títulos em azul-petróleo, ênfases em verde-petróleo e detalhes azuis. Não há amarelo como texto sobre fundo claro.
- Amarelo reservado aos botões e argumentos comerciais; microinformações e ícones de apoio da primeira dobra usam neutros. Verde institucional preservado no rodapé e no tom suave da seção do Leonardo.
- Capa com borda e fundo discretamente suavizados; logotipos oficiais, fotografias e proporções intactos. Sem novos efeitos, gradientes ou blocos de conteúdo.

## Preservação

Comparação de navegador nas quatro larguras confirma igualdade de todos os textos visíveis, links e atributos de destino, imagens e textos alternativos, ordem e classes das seções. Os cinco links de compra seguem no checkout original.

Os arquivos `page.tsx`, `content.ts`, `reveal.tsx` e `checkout-link.tsx` não receberam alterações nesta rodada. O trecho de CSS das microinterações e de movimento reduzido no fim do arquivo é idêntico ao início do refinamento, incluindo transformações, durações e curvas.

## Validação

- Build, lint e TypeScript aprovados.
- **40 testes aprovados** em 2,2 minutos com um worker: `npm run test:e2e -- --workers=1`, sem retentativas.
- Auditorias axe WCAG A/AA, teclado e foco, abertura dos cinco CTAs, fontes locais, hover, toque, passos sequenciais e movimento reduzido fazem parte da suíte.
- Nenhuma violação axe WCAG A/AA ou erro de console nos cenários funcionais verificados. Validação em Chromium; não foram realizados testes em aparelhos físicos.
- Sem rolagem horizontal em 320, 375, 768 e 1440 px. CTA principal visível dentro da primeira janela em todas as larguras.
- Altura desktop: 2994 px em uma janela de 768 px, aproximadamente 3,90 dobras. Na primeira aplicação da identidade eram 2974 px.

Capturas de antes/depois e relatório de comparação estão nos artefatos locais da sessão, na pasta `saga-refinamento`, fora do repositório. Os arquivos usam os nomes `before-320.png`, `after-320.png` e equivalentes para 375, 768 e 1440 px.

## Publicação manual da branch

O commit local reúne a aplicação oficial da marca e este refinamento, sem alterar a produção. Homologar visualmente antes de enviar a branch:

```powershell
Set-Location C:\Cristiano\LP_Saga
git push -u origin brandboard
git push secondary brandboard
```

Esses comandos enviam somente `brandboard`; não fazem merge com `main`. Nenhum push ou deploy foi executado pelo agente. A revisão desta branch e qualquer publicação em produção são etapas posteriores.
