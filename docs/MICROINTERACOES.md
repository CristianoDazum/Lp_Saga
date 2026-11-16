# Homologação — microinterações

Data: 16/11/2026. Preview local: http://127.0.0.1:3000.

## Comportamento implementado

| Elemento | Interação de mouse | Duração |
| --- | --- | --- |
| Fotografia do Leonardo | Zoom 1,035 no elemento de imagem e sombra discreta no contêiner | 400ms |
| Capa do curso | Elevação de 6px, perspectiva de 1000px, inclinação de 2° no eixo Y e sombra suave | 400ms |
| Quatro CTAs de compra | Elevação de 2px, amarelo `#F7C43D` e seta avançando 4px | 200ms |
| Link “O curso” | Sublinhado de 1px crescendo da esquerda para a direita, também disponível no foco do teclado | 200ms |

As imagens continuam decorativas/informativas, sem link, botão ou cursor de clique. A foto conserva `object-fit: cover`, o foco em `100% 50%`, cantos de 6px e `overflow: hidden`. O zoom central suave mantém o rosto e as duas mãos dentro do enquadramento. Não foram aplicados filtros.

A capa ganhou somente um wrapper estável, sem alteração das dimensões. O wrapper recebe o hover e a superfície interna se movimenta, evitando oscilações da área de interação nas bordas. O selo de duração permanece dentro da composição e não é cortado pelo contêiner da capa.

## Nitidez, performance e acessibilidade

- Implementação em CSS, sem biblioteca, dependência ou JavaScript novo.
- Geometria animada com `transform`; cor e sombras discretas complementam a interação. Não são animadas largura, altura, margem ou posicionamento de layout.
- Perspectiva, elevação e zoom aparecem somente durante o hover. Ao sair, os elementos retornam a `transform: none`; não há `will-change` ou contexto 3D permanente em contêineres de texto.
- Os efeitos de mouse são restritos a `(hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion: reduce` desativa zoom, elevação, inclinação e transições. Cores, sombra e sublinhado podem indicar o estado instantaneamente, sem deslocamento.
- Animações do hero e reveal mantidas. O hover dos seis tópicos da rodada anterior foi preservado.
- Focos visíveis mantidos; o sublinhado da navegação também funciona com teclado. Textos, preços e URLs de checkout não foram alterados.

## Evidências de verificação

Build de produção, lint e TypeScript aprovados. A suíte de navegador verifica as quatro larguras (320, 375, 768 e 1440px), as microinterações, o retorno ao repouso, o foco, o toque, o movimento reduzido, links, FAQ, carregamento das imagens, fontes e acessibilidade automática.

Os novos cenários leem a matriz de transformação para confirmar os valores de escala, elevação, inclinação e deslocamento da seta. Também comparam as dimensões de layout antes/depois do hover, verificam ausência de links nas imagens e exercitam os estados de toque e movimento reduzido.

A espera pela fotografia lazy nos testes passou de 5s para 20s após um timeout de carregamento inicial no Chromium local. As condições de sucesso foram mantidas, assim como zero retentativas automáticas.

**Resultado final: 32 testes aprovados, sem retentativas, em aproximadamente 1,7 minuto.** Build, lint e TypeScript também aprovados. Não houve erros de console nos cenários funcionais nem violações na auditoria automática axe WCAG A/AA em apresentação estável.

| Viewport | Altura do documento | Alteração nesta rodada | Rolagem horizontal |
| --- | --- | --- | --- |
| 320 × 800 | 4.100px | Nenhuma | Ausente |
| 375 × 812 | 4.149px | Nenhuma | Ausente |
| 768 × 1024 | 2.664px | Nenhuma | Ausente |
| 1440 × 768 | 2.797px | Nenhuma | Ausente |

O desktop mantém **3,64 dobras**, com CTA no primeiro viewport. As dimensões também foram comparadas antes e depois das interações, sem mudança de layout. Capturas do hover da foto e da capa foram revisadas visualmente para conferir rosto, mãos, legibilidade e selo de duração.

O primeiro carregamento no Chromium local continua sujeito aos atrasos intermitentes já registrados na rodada anterior; na execução final os dois primeiros cenários demoraram aproximadamente 54–57s, e os demais ficaram entre 0,5 e 8,5s. Esses tempos são da automação local, sem equivaler a métricas de produção. Não foi executado Lighthouse ou teste em aparelhos físicos. O teste de checkout usa interceptação, sem realizar compra.

## Arquivos desta rodada

- `src/app/globals.css`: efeitos, transições, foco, proteção para toque e movimento reduzido.
- `src/app/page.tsx`: wrapper estável da capa; conteúdo comercial preservado.
- `tests/landing.spec.ts`: regressões de microinterações e espera explícita pelo carregamento da foto.
- `README.md`, este relatório e capturas de homologação.

## Capturas

- [Fotografia durante o hover](micro-hover-foto.png)
- [Capa durante o hover](micro-hover-capa.png)

As capturas são estáticas; o preview local permite avaliar a suavidade das transições.

Pendência desta rodada: homologação visual das microinterações pelo cliente. Não há arquivos de conteúdo ou imagem faltando para estes ajustes.

Nenhum deploy, push ou alteração de repositório remoto foi realizado.
