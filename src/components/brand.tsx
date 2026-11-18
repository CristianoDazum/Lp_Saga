import Image from "next/image";

export function Brand() {
  return (
    <a
      className="brand"
      href="#inicio"
      aria-label="Saga Eloquência com Leonardo Hermes — início"
    >
      <Image
        src="/images/brand/saga-english.png"
        alt="SAGA English"
        width={1214}
        height={578}
        sizes="(max-width: 600px) 176px, 190px"
        className="brand-logo"
      />
    </a>
  );
}
