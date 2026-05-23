import { cn } from "#/lib/utils";

type Props = {
  label: string;
  icon?: string;
  active?: boolean;
  onClick?: () => void;
};

export function MagChip({ label, icon, active, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer border whitespace-nowrap transition-colors",
        active
          ? "bg-ink text-paper border-ink"
          : "bg-transparent text-ink border-rule",
      )}
    >
      {icon && <span className="text-[11px]">{icon}</span>}
      {label}
    </button>
  );
}
