# Homologação local — Saga Eloquência

> Relatório histórico da primeira entrega. Consulte [as melhorias visuais e verificações atuais](ALTERACOES-VISUAIS.md) para a versão com fotografia real, novas fontes e hover dos tópicos. As capturas desta pasta foram atualizadas para a versão atual.

Data: 16/11/2026. Projeto em `C:\Cristiano\LP_Saga`.

**Preview local:** http://127.0.0.1:3000. O servidor foi iniciado com `npm run start`, usando o build de produção. Para reabrir depois: `npm run build` e `npm run start`.

## Resultado

Landing page implementada com Next.js 16.4.6, React, TypeScript e Tailwind CSS. Quatro seções comerciais: hero, conteúdo, instrutor/funcionamento e fechamento/FAQ, seguidas de rodapé. Todos os quatro CTAs de compra apontam para o checkout indicado no briefing. Os três contatos oficiais estão no rodapé.

Página pré-renderizada estaticamente, com componentes de servidor e um componente de cliente pequeno para reveal. A capa local WebP tem 62.462 bytes, com versões responsivas entregues por `next/image`. Sem biblioteca de animação, downloads de fontes, scripts de marketing, formulários de pagamento ou API da Kiwify.

## Verificações concluídas

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Aprovado; página `/` pré-renderizada estaticamente |
| `npm run lint` | Aprovado, zero erros e avisos |
| `npm run typecheck` | Aprovado |
| `npm run test:e2e` | 16 testes aprovados em 43,5 segundos |
| Auditoria npm após atualização/correção das dependências | Zero vulnerabilidades reportadas |
| HTTP da página | 200 nos testes de navegador |
| Console e erros de JavaScript | Nenhum erro nos cenários verificados |
| axe: WCAG 2 A/AA e 2.1 A/AA | Zero violações automáticas nas quatro larguras |
| Teclado | Link de pular conteúdo, foco no conteúdo e FAQ com Enter verificados |
| Movimento reduzido | Animação e scroll suave desativados conforme preferência |
| JavaScript desativado | Conteúdo, tópicos e FAQ continuam disponíveis |
| CTAs | Quatro links com URL exata, nova aba e `noopener noreferrer` |
| Clique de compra | Nova aba com destino exato e `window.opener === null` |
| Contatos | Instagram, WhatsApp e e-mail conferidos com o briefing |
| SEO de homologação | Título, descrição, `lang=pt-BR`, viewport e favicon; `noindex, nofollow` |

## Responsividade

Medidas do documento com FAQ fechado. O limite de até quatro dobras aplica-se ao desktop, como solicitado.

| Viewport | Altura do documento | Rolagem horizontal | Observação |
| --- | --- | --- | --- |
| 320 × 800 | 3.968px | Ausente | Conteúdo empilhado e CTA visível no hero |
| 375 × 812 | 3.905px | Ausente | Conteúdo empilhado e contatos com alvos de toque |
| 768 × 1024 | 2.500px | Ausente | Layout com duas colunas |
| 1440 × 768 | 2.746px | Ausente | 3,58 dobras; CTA principal dentro do primeiro viewport |

Capturas revisadas visualmente, com o segundo item do FAQ aberto:

- [Desktop, 1440px](preview-desktop-1440.png)
- [Tablet, 768px](preview-tablet-768.png)
- [Mobile, 375px](preview-mobile-375.png)
- [Mobile, 320px](preview-mobile-320.png)

As verificações foram realizadas em Chromium. Não foi executado Lighthouse nem teste em aparelhos físicos, Safari ou Firefox. A auditoria automática de acessibilidade complementa a revisão visual e de teclado, sem constituir certificação.

O clique do checkout foi interceptado nos testes para verificar o destino sem depender do serviço externo e sem iniciar uma compra. A disponibilidade do checkout e a entrega real da Kiwify após pagamento não foram testadas. Nenhuma mensagem foi enviada aos contatos.

## Ajustes realizados durante a validação

- Corrigidos contraste de legenda e nome acessível da marca após achados do axe.
- Reduzida a capa de 1.457.019 para 62.462 bytes, preservando 1374 × 1145px.
- Next.js atualizado para a versão corrigida 16.4.6. Corrigida também uma dependência transitiva do linter por override documentado no README.
- O primeiro build foi bloqueado pela criação de subprocessos no ambiente restrito; o build final foi executado com a permissão apropriada e aprovado.
- Uma rodada intermediária registrou timeout no primeiro carregamento de assets locais. A rodada final, com o WebP e o servidor local iniciado separadamente, aprovou os 16 cenários.

## Pendências para aprovação/publicação futura

1. Aprovar paleta, composição e capa utilizada. A identidade visual é provisória.
2. Receber logo oficial de alta qualidade. Atualmente há marca textual e favicon tipográfico temporários.
3. Receber foto original do Leonardo caso seja desejado substituir o painel tipográfico LH. Nenhum retrato de baixa resolução foi ampliado.
4. Disponibilizar as pastas de referências visuais e os seis arquivos de animação mencionados no briefing. Eles não foram localizados junto ao Markdown nem nos ZIPs examinados em Downloads/attachments. Os movimentos atuais seguem o texto do briefing.
5. Confirmar domínio para canonical, metadataBase e Open Graph, e habilitar indexação somente na publicação aprovada.
6. Validar política de reembolso antes de incluir prazos. Nenhuma garantia ou política foi inventada.

**Não houve deploy, criação/alteração de repositório remoto, push, configuração de conta Vercel ou instalação de rastreadores.**
