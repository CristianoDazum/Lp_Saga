import Image from "next/image";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className="brand"
      href="#inicio"
      aria-label="Saga Eloquência com Leonardo Hermes — início"
    >
      <Image
        src={`/images/brand/saga-lateral-${light ? "negativo" : "positivo"}.png`}
        alt="SAGA"
        width={1523}
        height={996}
        sizes="(max-width: 600px) 88px, 110px"
        className="brand-logo"
      />
    </a>
  );
}
