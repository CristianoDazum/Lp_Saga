export const course = {
  name: "O Guia Definitivo de Pronúncia Básica em Inglês",
  instructor: "Leonardo Hermes",
  price: "R$ 47,90",
  checkout: "https://pay.kiwify.com.br/9AVIr7g",
  instagram: "https://www.instagram.com/teacherleohermes/",
  whatsapp:
    "https://api.whatsapp.com/send/?phone=5547988315587&text&type=phone_number&app_absent=0",
  email: "mailto:leonardo@sagaeloquencia.com",
} as const;

// Proposta para homologação local: exemplo pendente da validação final de Leonardo.
export const pronunciationExample = {
  title: "Pare de falar 'lai-ki' quando quiser dizer 'like'.",
  description:
    "Pequenos detalhes na pronúncia fazem diferença. Aprenda a identificar e corrigir esses sons.",
} as const;

// Substituição da arte: atualizar este objeto após salvar o WebP final em public/images/.
export const courseCover = {
  src: "/images/capa-curso.webp",
  width: 1374,
  height: 1145,
  alt: "Capa de O Guia Definitivo de Pronúncia Básica em Inglês, com Leonardo Hermes",
} as const;

// Foto original fornecida pelo cliente; o foco à direita preserva rosto e mãos.
export const instructorPhoto = {
  src: "/images/leo-apresentando.png",
  objectPosition: "100% 50%",
} as const;

export const topics = [
  {
    id: "consoantes-finais",
    title: "Termine as palavras com mais clareza.",
    description:
      "Entenda como pronunciar o final de palavras com T, D, P e K, sem depender apenas da leitura.",
  },
  {
    id: "sons-lmn",
    title: "Dê atenção aos sons que parecem familiares.",
    description:
      "Conheça os sons de L, M e N em inglês e observe o que muda na hora de falar.",
  },
  {
    id: "consoante-e",
    title: "Não deixe a escrita confundir sua fala.",
    description:
      "Descubra como o E final influencia a pronúncia de palavras como like e type.",
  },
  {
    id: "som-th",
    title: "Entenda um som que costuma gerar dúvida.",
    description:
      "Conheça o som de TH e saiba no que prestar atenção ao pronunciá-lo.",
  },
  {
    id: "r-inicial",
    title: "Comece as palavras com mais segurança.",
    description:
      "Veja como pronunciar o R no início das palavras em inglês, uma dúvida comum entre brasileiros.",
  },
  {
    id: "i-ee-ea",
    title: "Perceba diferenças que passam despercebidas.",
    description:
      "Aprenda a distinguir os sons de I, EE e EA, mesmo quando a escrita parece semelhante.",
  },
] as const;

export const questions = [
  {
    question: "Como é o formato do curso?",
    answer:
      "O curso é online e gravado, organizado em uma aula única de aproximadamente 30 minutos. Leonardo Hermes apresenta os 6 pontos de pronúncia listados nesta página. É voltado a quem já estuda ou estudou inglês e ainda tem dúvidas de pronúncia.",
  },
  {
    question: "Como acesso a aula depois da compra?",
    answer:
      "Após a confirmação da compra, o conteúdo é disponibilizado na área de membros da Kiwify. O valor de R$ 47,90 é um pagamento único, sem assinatura.",
  },
] as const;
