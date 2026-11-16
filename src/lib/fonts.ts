import localFont from "next/font/local";

export const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const lora = localFont({
  src: "../../node_modules/@fontsource/lora/files/lora-latin-400-italic.woff2",
  variable: "--font-lora",
  weight: "400",
  style: "italic",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
