export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#inicio">
      <span className="brand-word">
        saga<span className="brand-dot">.</span>
      </span>
      <span className="brand-divider" />
      <span className="brand-descriptor">
        ELOQUÊNCIA<span>com Leonardo Hermes</span>
      </span>
      <span className="sr-only"> — início</span>
    </a>
  );
}
