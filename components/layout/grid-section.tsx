import { cn } from "@/lib/utils";

interface GridSectionProps {
  children: React.ReactNode;
  className?: string;
  borderBottom?: boolean;
  borderTop?: boolean;
  noPadding?: boolean;
}

export function GridSection({
  children,
  className,
  borderBottom = true,
  borderTop = false,
  noPadding = false,
}: GridSectionProps) {
  return (
    <section className={cn("relative overflow-clip px-4", className)}>
      <div
        className={cn(
          "relative mx-auto max-w-[var(--max-width-grid)] border-x border-grid-border",
          borderBottom && "border-b border-b-grid-border",
          borderTop && "border-t border-t-grid-border",
          !noPadding && "px-0"
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function GridContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-[var(--max-width-grid)] px-4", className)}>
      {children}
    </div>
  );
}
