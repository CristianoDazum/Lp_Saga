import localFont from "next/font/local";

export const prompt = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/prompt/files/prompt-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/prompt/files/prompt-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/prompt/files/prompt-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/prompt/files/prompt-latin-300-normal.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/prompt/files/prompt-latin-200-normal.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/prompt/files/prompt-latin-200-italic.woff2",
      weight: "200",
      style: "italic",
    },
  ],
  variable: "--font-prompt",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
