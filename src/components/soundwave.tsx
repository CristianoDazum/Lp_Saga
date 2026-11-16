const heights = [
  8, 14, 22, 12, 32, 48, 28, 58, 78, 46, 32, 64, 90, 52, 28, 16, 42, 64, 36, 20,
  12, 6,
];

export function Soundwave({ className = "" }: { className?: string }) {
  return (
    <div className={`soundwave ${className}`} aria-hidden="true">
      {heights.map((height, index) => (
        <span key={index} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}
