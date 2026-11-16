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
    sound: "T · D · P · K",
    title: "O final da palavra faz diferença.",
    description: "Entenda a pronúncia das consoantes finais T, D, P e K.",
  },
  {
    sound: "L · M · N",
    title: "Letras conhecidas. Outros sons.",
    description: "Conheça os sons de L, M e N na pronúncia em inglês.",
  },
  {
    sound: "like / type",
    title: "E esse E no final?",
    description:
      "Veja como pronunciar palavras que terminam em consoante + E, como like e type.",
  },
  {
    sound: "TH",
    title: "Um som que merece atenção.",
    description: "Entenda o som de TH, uma dúvida comum entre brasileiros.",
  },
  {
    sound: "R",
    title: "Comece com o som certo.",
    description: "Explore a pronúncia do R no início das palavras.",
  },
  {
    sound: "I · EE · EA",
    title: "Parecidos na escrita. E na fala?",
    description: "Perceba as diferenças de pronúncia entre I, EE e EA.",
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
