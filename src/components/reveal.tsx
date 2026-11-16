"use client";

import { useEffect, useRef } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  stagger,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || media.matches || !("IntersectionObserver" in window))
      return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!media.matches) {
          const targets =
            stagger === undefined
              ? [element]
              : Array.from(
                  element.querySelectorAll<HTMLElement>("[data-reveal-item]"),
                );
          targets.forEach((target, index) => {
            const animation = target.animate(
              [
                { opacity: 0, transform: "translateY(12px)" },
                { opacity: 1, transform: "none" },
              ],
              {
                duration: 500,
                delay: delay + index * (stagger ?? 0),
                easing: "cubic-bezier(0.2, 0.7, 0.3, 1)",
                fill: "backwards",
              },
            );
            // Retirar o efeito concluído evita manter uma camada de composição no texto.
            animation.addEventListener("finish", () => animation.cancel(), {
              once: true,
            });
            animations.push(animation);
          });
        }
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    const cancelMotion = () => {
      if (media.matches) animations.forEach((animation) => animation.cancel());
    };
    media.addEventListener("change", cancelMotion);
    observer.observe(element);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      media.removeEventListener("change", cancelMotion);
    };
  }, [delay, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
