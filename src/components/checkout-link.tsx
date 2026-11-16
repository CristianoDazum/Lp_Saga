import { course } from "@/lib/content";
import { Icon } from "@/components/icon";

export function CheckoutLink({
  children,
  compact = false,
  className = "",
}: {
  children: React.ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <a
      href={course.checkout}
      target="_blank"
      rel="noopener noreferrer"
      data-checkout
      className={`button ${compact ? "button-compact" : ""} ${className}`}
    >
      <span>{children}</span>
      <Icon name="arrow" />
      <span className="sr-only"> (abre o checkout da Kiwify em nova aba)</span>
    </a>
  );
}
