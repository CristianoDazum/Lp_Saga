import type { Metadata, Viewport } from "next";
import { prompt } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pronúncia em Inglês com Leonardo Hermes | Saga Eloquência",
  description:
    "Já estudou inglês e ainda tem dúvidas de pronúncia? Conheça 6 pontos que confundem brasileiros em uma aula gravada de aproximadamente 30 minutos. R$ 47,90, pagamento único.",
  applicationName: "Saga Eloquência",
  robots: { index: false, follow: false },
  // Homologação local: habilitar indexação e definir canonical após confirmar o domínio.
  // Adicionar Open Graph com a imagem final e URL absoluta após aprovação da identidade.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#073a49",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Ponto de integração futuro de analytics/pixel via next/script, apenas com IDs aprovados.
  return (
    <html lang="pt-BR" className={prompt.variable}>
      <body>{children}</body>
    </html>
  );
}
