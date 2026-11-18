# Saga Eloquência — landing page

Landing page local para **O Guia Definitivo de Pronúncia Básica em Inglês**, de Leonardo Hermes. Quatro seções comerciais, sem checkout próprio, formulários, integrações pagas ou rastreadores.

Versão em homologação na branch `brandboard`: identidade oficial SAGA com hierarquia tipográfica e composição refinadas. Detalhes em [identidade visual](docs/IDENTIDADE-VISUAL.md) e [refinamento minimalista](docs/REFINAMENTO-MINIMALISTA.md). Mantidos os conteúdos comerciais, créditos da DazumDigital e referência centralizada da capa. Histórico: [capa sem selo e passos com animações](docs/PASSOS-E-CAPA.md), [microinterações de foto, capa, botões e navegação](docs/MICROINTERACOES.md) e [fontes e fotografia](docs/ALTERACOES-VISUAIS.md).

## Validação da rodada de feedback

- Build, lint e TypeScript aprovados; **40 testes Playwright aprovados**, sem retentativas, com um worker (`npm run test:e2e -- --workers=1`).
- Validados os cinco CTAs de compra, incluindo navegação para o destino interceptado, nova aba e isolamento de `window.opener`. Nenhuma compra foi realizada.
- Verificados centralização do CTA, frase da seção preservada, créditos com foco visível e link em nova aba, configuração da capa e ausência de regressões nas microinterações.
- Nenhum erro de console nos cenários funcionais; nenhuma violação axe WCAG A/AA na apresentação estável.
- Sem rolagem horizontal em 320, 375, 768 e 1440px. Alturas da identidade atualizada: 4.635px, 4.531px, 3.013px e 2.994px, respectivamente. Em desktop de 1440 × 768px, são **3,90 dobras** (2.974px na primeira aplicação da identidade).
- A primeira dobra mantém imagem, proporções, preload e hover da capa atual. Nenhuma arte provisória foi criada.
- Validado em Chromium; não foi executado Lighthouse ou teste em aparelhos físicos. A troca pela capa final continua pendente do arquivo da equipe de design.

## Executar

Requer Node.js 20.9 ou superior e npm.

```powershell
npm ci
npm run dev
```

Abra http://127.0.0.1:3000. Para homologar o build de produção localmente:

```powershell
npm run build
npm run start
```

## Verificar

```powershell
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Os testes Playwright iniciam um servidor de produção ou reutilizam a porta 3000. Instale o Chromium do Playwright caso ainda não esteja disponível (`npx playwright install chromium`). É possível usar um Chromium já instalado definindo `SAGA_BROWSER_PATH` com o caminho completo do executável. São verificadas as larguras 320, 375, 768 e 1440px, overflow, CTAs, contatos, FAQ, teclado, movimento reduzido, conteúdo sem JavaScript, erros de console e regras de acessibilidade WCAG AA com axe. A verificação automática complementa a revisão visual; não equivale a certificação de acessibilidade.

## Estrutura

```text
src/
  app/
    page.tsx           # As quatro seções e o rodapé
    layout.tsx         # Idioma, SEO e viewport
    globals.css        # Tailwind, identidade visual e responsividade
    icon.svg           # Favicon tipográfico temporário
  components/
    brand.tsx          # Marca textual temporária
    checkout-link.tsx  # CTA único, reutilizado em toda a página
    icon.tsx           # Ícones SVG locais
    reveal.tsx         # Reveal progressivo e suporte a movimento reduzido
    soundwave.tsx      # Grafismo estático de ondas sonoras
  lib/content.ts       # Oferta, tópicos, FAQ, URLs, capa e fotografia
  lib/fonts.ts         # Prompt Bold, Light e Extra Light via next/font/local
public/images/         # Capa do curso otimizada
tests/                 # Testes de aceitação em navegador
docs/                  # Relatório de homologação
```

## Conteúdo e decisões

- Oferta: uma aula gravada de aproximadamente 30 minutos, R$ 47,90, pagamento único, sem assinatura. Público: quem já estuda ou estudou inglês.
- Todos os cinco CTAs de compra usam exatamente `https://pay.kiwify.com.br/9AVIr7g`, em nova aba com `noopener noreferrer`. O CTA abaixo dos seis tópicos reutiliza `CheckoutLink`, centralizado e com largura adaptada ao mobile, mantendo a frase de encerramento da seção. Instagram, WhatsApp e e-mail são os do briefing, centralizados em `src/lib/content.ts`.
- O rodapé inclui “Feito por DazumDigital”, com link para `https://www.dazumdigital.com.br/`, em nova aba, `noopener noreferrer`, foco visível e hover discreto.
- A capa utilizada veio de `Capa Guia Definitivo de Pronúncia.png`, encontrada junto ao briefing em Downloads, com 1374 × 1145px. O antigo painel LH foi removido e substituído pela foto original `leo_apresentando.png`, fornecida pelo cliente e copiada para `public/images/leo-apresentando.png`, sem filtros ou alterações na aparência. O `next/image` otimiza a entrega e carrega a foto abaixo da dobra sob demanda.
- A capa foi convertida para WebP, preservando as dimensões: 62.462 bytes, contra 1.457.019 bytes do PNG original (redução de aproximadamente 95,7%). O `next/image` também entrega versões responsivas.
- Marca oficial SAGA em PNG transparente no cabeçalho e rodapé, sem redesenho ou assinatura adicionada ao logotipo. Paleta oficial com os neutros de apoio. O favicon existente foi preservado nesta rodada.
- Animação do hero em CSS e reveal com IntersectionObserver/Web Animations, sem Framer Motion. O conteúdo nasce visível e permanece utilizável sem JavaScript. Movimento reduzido é respeitado, inclusive se a preferência mudar durante a sessão.
- Página estática por padrão, sem chamadas à API da Kiwify. Imagem com `next/image`; scripts de terceiros ausentes. Prompt Bold (700) na headline, Semibold (600) nos títulos principais, Medium (500) nos títulos menores e botões, Light (300) nos textos e Extra Light (200, normal e itálico verdadeiro) nos destaques são servidas pelo próprio projeto via `next/font/local`, a partir de `@fontsource/prompt`, sem requisições ao Google Fonts. Seis arquivos WOFF2 latinos são usados (108.960 bytes no total). A licença OFL acompanha a dependência e está reproduzida em `docs/Prompt-OFL.txt`.
- Os tópicos são artigos informativos, sem setas ou falsa semântica de botão. Em mouse com hover real, elevam 4px em 200ms com sombra, fundo e borda discretos; em dispositivos de toque não dependem de hover. Movimento reduzido desativa a elevação.
- As animações de entrada liberam suas transformações ao terminar. Não há blur, text-shadow, escala ou font-smoothing imposto nos textos. As rotações da capa e do selo foram removidas para melhorar a nitidez de suas letras. A suavização final continua dependendo do navegador, sistema e monitor.
- Next.js atualizado para 16.4.6 após auditoria. A dependência de desenvolvimento `@typescript-eslint/typescript-estree` usa um override de `minimatch` para a versão corrigida 11.0.1 ou superior. O lint valida a compatibilidade desse ajuste. ESLint 9 foi mantido por compatibilidade com os plugins do `eslint-config-next`; o npm informa que essa linha saiu de suporte, portanto atualizar o conjunto do linter quando os plugins suportarem ESLint 10.

## Substituir a capa do curso

A capa atual permanece ativa. A referência única está no objeto `courseCover` de `src/lib/content.ts`: caminho público, largura, altura e texto alternativo. O hero usa esses valores com `next/image`; os estilos e o hover não dependem do nome do arquivo.

Quando a arte final chegar:

1. Conferir a dimensão de origem **1200 × 1000px**, proporção **6:5** (a mesma proporção da capa atual), e exportar um WebP otimizado.
2. Salvar em **`public/images/capa-curso-final.webp`**. Esse caminho está reservado por convenção; nenhum arquivo vazio, imagem provisória ou placeholder foi criado.
3. Somente depois de salvar o arquivo, atualizar o objeto em `src/lib/content.ts`:

```ts
export const courseCover = {
  src: "/images/capa-curso-final.webp",
  width: 1200,
  height: 1000,
  alt: "Capa de O Guia Definitivo de Pronúncia Básica em Inglês, com Leonardo Hermes",
} as const;
```

4. Executar `npm run build`, `npm run lint`, `npm run typecheck` e `npm run test:e2e`.
5. Conferir a primeira dobra em 320, 375, 768 e 1440px, incluindo nitidez, carregamento e hover. Os testes usam a configuração centralizada, por isso a troca não exige editar seletores ou caminhos de imagem nos testes.

Não é necessário alterar o JSX, proporções ou CSS da primeira dobra. Até a entrega da nova arte, manter `src: "/images/capa-curso.webp"` e as dimensões atuais de 1374 × 1145px. A troca de arquivo e configuração é um ajuste futuro e requer nova validação antes de publicar.

## Antes da publicação

1. Homologar a composição, a capa, os textos e a paleta com o cliente.
2. Logos oficiais recebidos em PNG transparente e integrados via `Brand`. A foto original do Leonardo já foi integrada: fica à esquerda no desktop e acima do texto no mobile, com `object-fit: cover`, `object-position: 100% 50%`, proporção de 1,15 e cantos de 6px. O enquadramento preserva o rosto, ambas as mãos e parte do palco. A origem e o foco ficam centralizados em `instructorPhoto` em `src/lib/content.ts`.
3. Receber as pastas `referencias_visuais/` e `referencias_animacoes/`: não estavam junto ao Markdown nem nos ZIPs encontrados em Downloads/attachments. Os seis arquivos de animação não puderam ser revisados; foram implementados os movimentos especificados no próprio briefing.
4. Confirmar domínio de produção e adicionar canonical, metadataBase e Open Graph com imagem final aprovada em `src/app/layout.tsx`.
5. Alterar `robots` para permitir indexação quando a publicação de produção for aprovada. A homologação está intencionalmente com `noindex, nofollow`.
6. Validar a política de reembolso antes de acrescentar afirmações sobre prazos. Nenhuma promessa foi incluída.
7. Se forem fornecidos IDs de analytics, pixel ou GTM, o ponto de integração é `src/app/layout.tsx`, com carregamento apropriado via `next/script` e revisão dos requisitos de privacidade aplicáveis. Atualmente não há rastreamento nem cookies próprios.

## Vercel (publicação futura)

O projeto usa Next.js App Router e o build padrão reconhecido pela Vercel: instalação `npm ci`, build `npm run build`, saída automática do Next.js. Não requer variáveis de ambiente. Não é necessário adicionar `vercel.json` para este caso.

**Esta rodada fica isolada e versionada localmente na branch `brandboard`. A `main` e a versão em produção permanecem preservadas. Push manual somente após homologação; nenhum push ou deploy é executado automaticamente.** O repositório oficial é `DazumDigital/Lp_Saga` (`origin`) e o secundário é `CristianoDazum/Lp_Saga` (`secondary`).
