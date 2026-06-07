import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "#/components/AppShell";
import { Avatar } from "#/components/Avatar";
import { MapBackground } from "#/components/MapBackground";
import { VisibilityBadge } from "#/components/VisibilityBadge";
import { byId, EVENTS, formatDate, MAP_POSITIONS } from "#/data/events";
import { useLang } from "#/lib/lang";
import type { TranslationKey } from "#/lib/translations";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/map")({ component: MapPage });

const VIS_COLORS: Record<string, string> = {
	public: "#4d3aef",
	private: "#ff6d5a",
};

const LEGEND: { color: string; key: TranslationKey }[] = [
	{ color: "#4d3aef", key: "legend.public" },
	{ color: "#ff6d5a", key: "legend.private" },
];

function MapPage() {
	const { lang, t } = useLang();
	const [selected, setSelected] = useState<string | null>(null);

	const selectedEvent = selected ? byId(selected) : null;

	return (
		<AppShell>
			<div className="flex-1 relative overflow-hidden">
				{/* Map layer */}
				<div className="absolute inset-0">
					<MapBackground theme="paper" />
				</div>

				{/* Pins */}
				{EVENTS.map((e) => {
					const pos = MAP_POSITIONS[e.id];
					if (!pos) return null;
					const isSelected = selected === e.id;
					const color = VIS_COLORS[e.visibility] ?? "#15141a";

					return (
						<button
							key={e.id}
							type="button"
							onClick={() => setSelected(isSelected ? null : e.id)}
							className={cn(
								"absolute -translate-x-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0",
								isSelected ? "z-20" : "z-10",
							)}
							style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
						>
							{isSelected ? (
								<div
									className="text-white px-[10px] py-[5px] rounded-full text-[11px] font-semibold whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.25)] max-w-[140px] overflow-hidden text-ellipsis"
									style={{ background: color }}
								>
									{e.title[lang]}
								</div>
							) : (
								<div
									className="rounded-full border-[2.5px] border-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] w-3 h-3"
									style={{ background: color }}
								/>
							)}
						</button>
					);
				})}

				{/* Selected event card */}
				{selectedEvent && (
					<div className="absolute bottom-4 left-[14px] right-[14px] bg-paper rounded-[14px] px-4 py-[14px] shadow-[0_12px_32px_rgba(21,20,26,0.2)] border border-[rgba(21,20,26,0.08)] z-30">
						<div className="flex gap-3 items-start">
							<div
								className="w-14 h-14 rounded-[10px] shrink-0"
								style={{ background: selectedEvent.img }}
							/>
							<div className="flex-1 min-w-0">
								<div className="flex gap-[6px] mb-[5px] flex-wrap">
									<VisibilityBadge v={selectedEvent.visibility} lang={lang} />
								</div>
								<div className="font-serif text-[17px] font-medium leading-[1.15] tracking-[-0.01em] mb-[5px] text-ink">
									{selectedEvent.title[lang]}
								</div>
								<div className="flex gap-[6px] items-center text-[11px]">
									<Avatar author={selectedEvent.author} size={16} />
									<span className="text-dim">
										{selectedEvent.venue[lang]} ·{" "}
										{formatDate(selectedEvent.date, lang)}
									</span>
								</div>
							</div>
						</div>
						<Link
							to="/events/$id"
							params={{ id: selectedEvent.id }}
							className="block mt-3 px-4 py-[11px] rounded-[10px] bg-ink text-paper text-center text-[13px] font-semibold no-underline tracking-[0.02em]"
						>
							{t("map.view")}
						</Link>
					</div>
				)}

				{/* Legend */}
				<div className="absolute top-[14px] right-[14px] bg-[rgba(250,248,244,0.92)] rounded-[10px] px-3 py-2 flex flex-col gap-[5px] backdrop-blur-sm border border-[rgba(21,20,26,0.08)] z-10">
					{LEGEND.map((item) => (
						<div
							key={item.key}
							className="flex items-center gap-[6px] text-[10px]"
						>
							<div
								className="w-2 h-2 rounded-full shrink-0"
								style={{ background: item.color }}
							/>
							<span className="text-ink font-medium">{t(item.key)}</span>
						</div>
					))}
				</div>

				{/* Count badge */}
				<div className="absolute top-[14px] left-[14px] bg-ink text-paper px-3 py-[6px] rounded-full text-[11px] font-semibold z-10">
					{EVENTS.length} {t("map.events.count")}
				</div>
			</div>
		</AppShell>
	);
}
