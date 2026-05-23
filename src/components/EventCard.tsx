import { Link } from "@tanstack/react-router";
import { cn } from "#/lib/utils";
import type { EventData } from "#/data/events";
import { formatDate, catLabel } from "#/data/events";
import type { Lang } from "#/lib/lang";
import { Avatar } from "./Avatar";
import { VisibilityBadge } from "./VisibilityBadge";

// ─── Mobile: full-width hero (200px tall, gradient bg) ───────
export function HeroCard({ event: e, lang }: { event: EventData; lang: Lang }) {
  return (
    <Link to="/events/$id" params={{ id: e.id }} className="block no-underline">
      <div
        className="h-[200px] rounded-xl overflow-hidden relative text-white mb-[10px]"
        style={{ background: e.img }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_30%,rgba(0,0,0,0.85)_100%)]" />
        <div className="absolute top-[10px] left-[10px] flex gap-1.5">
          {e.tag && (
            <div className="text-[9px] tracking-[0.12em] uppercase px-[7px] py-[3px] bg-violet rounded-[3px] font-bold">
              {e.tag[lang]}
            </div>
          )}
          <VisibilityBadge v={e.visibility} lang={lang} />
        </div>
        <div className="absolute bottom-3 left-[14px] right-[14px]">
          <div className="font-serif text-[22px] font-medium leading-[1.1] tracking-[-0.015em] mb-1.5">
            {e.title[lang]}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] opacity-[0.95]">
            <Avatar author={e.author} size={18} />
            <span>{e.author.name}</span>
            {e.author.verified && <span className="text-[#8ef0ff]">✓</span>}
            <span>·</span>
            <span>
              {formatDate(e.date, lang)} · {e.time}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Desktop: large feature hero (340px, serif 38px title) ───
export function DesktopHeroCard({
  event: e,
  lang,
}: {
  event: EventData;
  lang: Lang;
}) {
  return (
    <Link
      to="/events/$id"
      params={{ id: e.id }}
      className="block no-underline h-full"
    >
      <div
        className="h-full min-h-[340px] rounded-[14px] overflow-hidden relative text-white"
        style={{ background: e.img }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.85)_100%)]" />
        <div className="absolute top-[14px] left-[14px] flex gap-1.5">
          {e.tag && (
            <div className="text-[10px] tracking-[0.12em] uppercase px-[9px] py-1 bg-violet rounded-[3px] font-bold">
              {e.tag[lang]}
            </div>
          )}
          <VisibilityBadge v={e.visibility} lang={lang} />
        </div>
        <div className="absolute bottom-[18px] left-[22px] right-[22px]">
          <div className="text-[10px] tracking-[0.14em] uppercase font-bold mb-2 opacity-[0.85]">
            {catLabel(e.cat, lang)}
          </div>
          <div className="font-serif text-[38px] font-medium leading-[1.05] tracking-[-0.02em] mb-[10px]">
            {e.title[lang]}
          </div>
          <div className="flex items-center gap-[10px] text-[13px] opacity-[0.92]">
            <Avatar author={e.author} size={22} />
            <span>{e.author.name}</span>
            <span>·</span>
            <span>{e.venue[lang]}</span>
            <span>·</span>
            <span>
              {formatDate(e.date, lang)} · {e.time}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Desktop: secondary dark card (used in hero right column) ─
export function SecondaryCard({
  event: e,
  lang,
}: {
  event: EventData;
  lang: Lang;
}) {
  return (
    <Link
      to="/events/$id"
      params={{ id: e.id }}
      className="block no-underline flex-none"
    >
      <div
        className="rounded-[14px] relative text-white overflow-hidden min-h-[130px]"
        style={{ background: e.img }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_20%,rgba(0,0,0,0.85)_100%)]" />
        <div className="absolute bottom-3 left-[14px] right-[14px]">
          <div className="text-[9px] tracking-[0.12em] uppercase font-bold mb-1 opacity-[0.85]">
            {e.age > 0 ? `${e.age}+` : ""} {catLabel(e.cat, lang)}
          </div>
          <div className="font-serif text-[18px] font-medium leading-[1.1] tracking-[-0.01em]">
            {e.title[lang]}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Desktop: 3-column grid card (image + meta below) ────────
export function GridCard({ event: e, lang }: { event: EventData; lang: Lang }) {
  return (
    <Link to="/events/$id" params={{ id: e.id }} className="block no-underline">
      <div className="bg-white rounded-xl overflow-hidden border border-rule h-full flex flex-col">
        <div
          className="h-[160px] relative shrink-0"
          style={{ background: e.img }}
        >
          <div className="absolute top-[10px] left-[10px]">
            <VisibilityBadge v={e.visibility} lang={lang} />
          </div>
        </div>
        <div className="px-[14px] pt-[14px] pb-[16px] flex-1 flex flex-col">
          <div className="text-[10px] tracking-[0.12em] uppercase text-violet font-bold mb-[5px]">
            {catLabel(e.cat, lang)}
          </div>
          <div className="font-serif text-[17px] font-medium leading-[1.2] tracking-[-0.01em] mb-2 text-ink">
            {e.title[lang]}
          </div>
          <div className="text-[11px] text-dim leading-[1.45] mb-[10px] flex-1 line-clamp-2">
            {e.blurb[lang]}
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-dim">
              {formatDate(e.date, lang)} · {e.venue[lang]}
            </span>
            <span className="font-bold text-ink">
              {e.priceFrom === 0 ? "free" : `${e.priceFrom}${e.currency}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Desktop: list table row ──────────────────────────────────
export function ListTableRow({
  event: e,
  lang,
}: {
  event: EventData;
  lang: Lang;
}) {
  return (
    <Link to="/events/$id" params={{ id: e.id }} className="block no-underline">
      <div className="grid grid-cols-[60px_80px_1fr_60px_70px] gap-[14px] py-3 border-t border-rule items-center">
        <div
          className="w-[60px] h-[60px] rounded-lg shrink-0"
          style={{ background: e.img }}
        />
        <div className="font-mono text-[11px] text-dim leading-[1.5]">
          {formatDate(e.date, lang)}
          <br />
          {e.time}
        </div>
        <div>
          <div className="text-sm font-semibold tracking-[-0.01em] text-ink">
            {e.title[lang]}
          </div>
          <div className="text-[11px] text-dim mt-0.5">
            {catLabel(e.cat, lang)} · {e.venue[lang]}
          </div>
        </div>
        <div className="text-[11px] text-dim">↑{e.attendees}</div>
        <div className="text-xs font-bold text-right text-ink">
          {e.priceFrom === 0 ? "free" : `${e.priceFrom}${e.currency}`}
        </div>
      </div>
    </Link>
  );
}

// ─── Mobile: two-column card (image left, text right) ────────
export function WideCard({ event: e, lang }: { event: EventData; lang: Lang }) {
  return (
    <Link to="/events/$id" params={{ id: e.id }} className="block no-underline">
      <div className="grid grid-cols-[100px_1fr] gap-3 bg-white rounded-[10px] overflow-hidden border border-rule mb-[10px]">
        <div className="min-h-[80px]" style={{ background: e.img }} />
        <div className="py-[10px] pr-3">
          <div className="flex gap-1 mb-1">
            <span className="text-[9px] tracking-[0.12em] uppercase font-bold text-violet">
              {catLabel(e.cat, lang)}
            </span>
          </div>
          <div className="font-serif text-[15px] font-medium leading-[1.15] tracking-[-0.01em] mb-1.5 text-ink">
            {e.title[lang]}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-dim">
            <span>{e.venue[lang]}</span>
            <span>·</span>
            <span>{formatDate(e.date, lang)}</span>
          </div>
          {e.priceFrom > 0 && (
            <div className="text-[11px] font-semibold text-ink mt-1">
              от {e.priceFrom.toLocaleString()} {e.currency}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Mobile: compact list row ─────────────────────────────────
export function ListCard({ event: e, lang }: { event: EventData; lang: Lang }) {
  return (
    <Link to="/events/$id" params={{ id: e.id }} className="block no-underline">
      <div className="grid grid-cols-[40px_1fr_auto] gap-[10px] py-[10px] border-t border-rule items-center">
        <div
          className="w-10 h-10 rounded-[6px]"
          style={{ background: e.img }}
        />
        <div>
          <div className="text-[13px] font-semibold tracking-[-0.01em] text-ink">
            {e.title[lang]}
          </div>
          <div className="text-[10px] text-dim">
            {formatDate(e.date, lang)} · {e.venue[lang]}
          </div>
        </div>
        <div className="text-[11px] font-semibold text-ink">
          {e.priceFrom === 0 ? "free" : `${e.priceFrom}${e.currency}`}
        </div>
      </div>
    </Link>
  );
}

// ─── Neighbor card (both) ─────────────────────────────────────
export function NeighborCard({
  event: e,
  lang,
  desktop,
}: {
  event: EventData;
  lang: Lang;
  desktop?: boolean;
}) {
  return (
    <Link
      to="/events/$id"
      params={{ id: e.id }}
      className={cn("no-underline", desktop ? "flex flex-1" : "block")}
    >
      <div
        className={cn(
          "bg-vis-nbr border border-[rgba(47,138,107,0.2)] flex flex-col w-full",
          desktop
            ? "rounded-[14px] px-[18px] py-4"
            : "rounded-xl px-[14px] py-3 mb-[14px]",
        )}
      >
        <div className="flex justify-between items-center mb-1.5">
          <div className="text-[10px] tracking-[0.14em] uppercase text-mint font-bold">
            ◉ {lang === "ru" ? "В 500 м от вас" : "Within 500m"}
          </div>
          {!desktop && (
            <div className="text-[10px] text-mint font-semibold">4 →</div>
          )}
        </div>
        <div
          className={cn(
            "font-serif italic font-medium leading-[1.1] text-ink",
            desktop ? "text-[22px] mb-[10px]" : "text-[20px] mb-1.5",
          )}
        >
          {e.title[lang]}
        </div>
        {desktop && (
          <div className="text-xs text-ink leading-[1.45] mb-[14px]">
            {e.blurb[lang]}
          </div>
        )}
        <div
          className={cn(
            "flex items-center gap-2 text-ink mt-auto",
            desktop ? "text-xs" : "text-[11px]",
          )}
        >
          <Avatar author={e.author} size={desktop ? 22 : 20} />
          <span>{e.author.name}</span>
          <span className="text-dim">·</span>
          <span>
            {e.attendees}/{e.capacity} {lang === "ru" ? "идут" : "going"}
          </span>
          {desktop && <span className="ml-auto text-mint font-bold">→</span>}
        </div>
      </div>
    </Link>
  );
}

// ─── Private event card ───────────────────────────────────────
export function PrivateCard({
  event: e,
  lang,
  desktop,
}: {
  event: EventData;
  lang: Lang;
  desktop?: boolean;
}) {
  return (
    <Link to="/events/$id" params={{ id: e.id }} className="block no-underline">
      {desktop ? (
        <div className="bg-white rounded-[14px] p-4 border border-dashed border-coral flex flex-col">
          <VisibilityBadge v="private" lang={lang} size="md" />
          <div className="font-serif text-[20px] font-medium leading-[1.15] tracking-[-0.02em] my-[10px] text-ink">
            {e.title[lang]}
          </div>
          <div className="text-xs text-dim leading-[1.5] mb-3 flex-1">
            {e.blurb[lang]}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-dim">
            <Avatar author={e.author} size={20} />
            <span>
              {e.author.name} · {formatDate(e.date, lang)}
            </span>
          </div>
          <div className="mt-[14px] px-3 py-[10px] rounded-lg bg-vis-prv text-[11px] text-coral font-medium">
            ✦{" "}
            {lang === "ru"
              ? `Вы получили приглашение от ${e.author.name}`
              : `You were invited by ${e.author.name}`}
          </div>
        </div>
      ) : (
        <div className="rounded-[10px] p-3 mb-2.5 bg-white border border-dashed border-coral grid grid-cols-[60px_1fr] gap-3">
          <div className="h-15 rouсnded-lg" style={{ background: e.img }} />
          <div>
            <div className="flex gap-1.5 mb-1 items-center">
              <VisibilityBadge v="private" lang={lang} />
              <span className="text-[10px] text-dim">
                {lang === "ru" ? "только по приглашению" : "invite only"}
              </span>
            </div>
            <div className="font-serif text-[15px] font-medium leading-[1.15] tracking-[-0.01em] mb-1 text-ink">
              {e.title[lang]}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-dim">
              <Avatar author={e.author} size={14} />
              <span>
                {e.author.name} · {formatDate(e.date, lang)}
              </span>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
