# Homologação — capa sem selo e passos animados

Preview local: http://127.0.0.1:3000.

## Modificações

- Removido o selo circular de duração do JSX e todos os seletores exclusivos `.time-stamp`, incluindo suas variações responsivas.
- Capa, proporções, posição e hover preservados. A informação de aproximadamente 30 minutos permanece no hero, na faixa informativa, nos passos e na oferta final.
- Passos 01, 02 e 03 continuam como itens de lista informativos, sem links, botões, cursor de clique ou foco artificial.
- Hover com elevação de 3px, círculo azul-petróleo e número branco, fundo de apenas 4% de opacidade e transições de 250ms. Sem sombra.
- Entrada com fade-in e deslocamento vertical de 12px durante 500ms. Os três itens começam com atrasos de 0, 100 e 200ms, quando o grupo aparece durante a rolagem.
- O observador é desconectado após a primeira entrada. Rolar para fora e voltar não repete a animação.
- A entrada atua no `li`; o hover atua no conteúdo interno `.step`, evitando conflito entre transformações. Ao terminar, os efeitos de entrada são cancelados e as transformações deixam de atuar no texto.
- Hover limitado a mouse com ponteiro preciso. Movimento reduzido desativa a entrada e a elevação; em toque, os efeitos de hover ficam inativos. Sem JavaScript, todo o conteúdo permanece visível.

O componente `Reveal` existente foi estendido para aceitar `stagger`, sem nova dependência. A área de texto do instrutor foi dividida em grupos de entrada para evitar aplicar dois fades simultâneos sobre os passos.

## Resultados dos testes

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Aprovado; página pré-renderizada estaticamente |
| `npm run lint` | Aprovado, sem avisos |
| `npm run typecheck` | Aprovado |
| `npm run test:e2e` | **36 testes aprovados em 58,1s**, sem retentativas |
| Selo | Ausente do HTML; estilos exclusivos removidos |
| Entrada dos passos | Três animações com atrasos 0/100/200ms, executadas uma vez |
| Hover dos passos | Elevação de 3px, cores e fundo verificados nos três itens |
| Layout | Dimensões antes/depois do hover idênticas |
| Toque e movimento reduzido | Sem elevação; entrada desativada com movimento reduzido |
| Sem JavaScript | Conteúdo e FAQ disponíveis |
| Acessibilidade automática | Nenhuma violação axe WCAG A/AA na apresentação estável |
| Links e oferta | Quatro CTAs mantêm a URL exata da Kiwify; contatos preservados |
| Console | Sem erros nos cenários funcionais verificados |

O teste de entrada registra as animações reais do navegador e confirma os intervalos. Também rola para fora da seção e retorna, verificando que não surgem novas animações. Cada item é testado com hover e retorno ao repouso, incluindo a estabilidade das dimensões da lista e da página.

## Responsividade

| Viewport | Altura do documento | Diferença para a rodada anterior | Rolagem horizontal |
| --- | --- | --- | --- |
| 320 × 800 | 4.100px | 0px | Ausente |
| 375 × 812 | 4.149px | 0px | Ausente |
| 768 × 1024 | 2.664px | 0px | Ausente |
| 1440 × 768 | 2.797px | 0px | Ausente |

O desktop mantém aproximadamente **3,64 dobras**, com CTA no primeiro viewport. As capturas de desktop e mobile foram revisadas visualmente.

## Capturas

- [Capa sem selo, durante o hover](passos-capa-sem-selo.png)
- [Passo 02 durante o hover](passos-hover.png)
- [Versão mobile de 375px](passos-mobile-375.png)

## Arquivos alterados

- `src/app/page.tsx`: remoção do selo, itens de passo e grupos de entrada.
- `src/app/globals.css`: remoção dos estilos do selo e novos estados dos passos.
- `src/components/reveal.tsx`: suporte a entrada sequencial e cancelamento dos efeitos concluídos.
- `tests/landing.spec.ts`: verificações do selo removido, sequência única, hover, toque e movimento reduzido.
- `README.md`, este relatório e capturas de homologação.

Validação realizada em Chromium. A auditoria automática complementa a revisão visual, sem constituir certificação de acessibilidade. Não houve teste em aparelhos físicos, Safari, Firefox ou Lighthouse. O checkout é interceptado no teste de clique, sem realizar uma compra.

Pendente apenas a homologação visual desta rodada. **Nenhum deploy, push ou alteração de repositório remoto foi realizado.**
