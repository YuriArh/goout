import type { Lang } from "#/lib/lang";
import type { Visibility } from "#/data/events";
import { cn } from "#/lib/utils";

const CONFIG: Record<
  Visibility,
  { ru: string; en: string; icon: string; cls: string }
> = {
  public: {
    ru: "открытое",
    en: "public",
    icon: "◎",
    cls: "bg-vis-pub text-violet",
  },
  neighbors: {
    ru: "для соседей",
    en: "neighbors",
    icon: "◉",
    cls: "bg-vis-nbr text-mint",
  },
  private: {
    ru: "закрытое",
    en: "private",
    icon: "✦",
    cls: "bg-vis-prv text-coral",
  },
};

type Props = {
  v: Visibility;
  lang: Lang;
  size?: "sm" | "md";
};

export function VisibilityBadge({ v, lang, size = "sm" }: Props) {
  const s = CONFIG[v] ?? CONFIG.public;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-[0.08em] whitespace-nowrap",
        size === "sm" ? "text-[9px] px-[7px] py-[3px]" : "text-[10px] px-[9px] py-[4px]",
        s.cls,
      )}
    >
      <span className={size === "sm" ? "text-[10px]" : "text-[11px]"}>
        {s.icon}
      </span>
      {s[lang]}
    </span>
  );
}
