import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useLang } from "#/lib/lang";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import { AppShell } from "#/components/AppShell";
import { cn } from "#/lib/utils";
import { CATEGORIES as ALL_CATEGORIES } from "#/data/events";
import type { TranslationKey } from "#/lib/translations";

export const Route = createFileRoute("/create")({ component: CreatePage });

const MAIN_CATS = ALL_CATEGORIES.filter((c) => c.id !== "all").slice(0, 5);
const ALL_CATS = ALL_CATEGORIES.filter((c) => c.id !== "all");

const VISIBILITY_OPTIONS = [
	{
		id: "public",
		icon: "◎",
		labelKey: "visibility.public" as TranslationKey,
		subKey: "visibility.public.sub" as TranslationKey,
		activeClass: "bg-vis-pub border-violet text-violet",
		inactiveClass: "bg-white border-rule text-ink",
	},
	{
		id: "private",
		icon: "✦",
		labelKey: "visibility.private" as TranslationKey,
		subKey: "visibility.private.sub" as TranslationKey,
		activeClass: "bg-vis-prv border-coral text-coral",
		inactiveClass: "bg-white border-rule text-ink",
	},
];

const STEP_TITLES: Record<number, TranslationKey> = {
	1: "step.1",
	2: "step.2",
	3: "step.3",
	4: "step.4",
	5: "step.5",
};

const OPTIONS: {
	id: "confirm" | "plus1" | "public_list";
	labelKey: TranslationKey;
	subKey: TranslationKey;
}[] = [
	{ id: "confirm", labelKey: "option.confirm", subKey: "option.confirm.sub" },
	{ id: "plus1", labelKey: "option.plus1", subKey: "option.plus1.sub" },
	{
		id: "public_list",
		labelKey: "option.public_list",
		subKey: "option.public_list.sub",
	},
];

const REPEAT_KEYS: TranslationKey[] = [
	"repeat.once",
	"repeat.weekly",
	"repeat.biweekly",
];

type FormState = {
	title: string;
	activeCat: string;
	description: string;
	visibility: string;
	selectedDate: string;
	startTime: string;
	endTime: string;
	venue: string;
	capacity: string;
	coverPreview: string | null;
	opts: { confirm: boolean; plus1: boolean; public_list: boolean };
};

// ─── Label ─────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
	return (
		<div className="text-[10px] tracking-[0.14em] uppercase text-dim font-bold mb-2">
			{children}
		</div>
	);
}

// ─── Input components ──────────────────────────────────────────

const inputCls =
	"w-full px-[14px] py-3 rounded-[10px] bg-white border border-rule outline-none focus:border-violet transition-colors font-medium text-[14px] tracking-[-0.005em] text-ink placeholder:text-dim font-sans";

function InputField({
	value,
	onChange,
	placeholder,
	big,
	serif,
}: {
	value: string;
	onChange: (v: string) => void;
	placeholder: string;
	big?: boolean;
	serif?: boolean;
}) {
	return (
		<input
			type="text"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className={cn(
				inputCls,
				big ? "text-[18px] tracking-[-0.02em]" : "",
				serif ? "font-serif" : "",
			)}
		/>
	);
}

function TextareaField({
	value,
	onChange,
	placeholder,
	maxLength,
}: {
	value: string;
	onChange: (v: string) => void;
	placeholder: string;
	maxLength?: number;
}) {
	const ref = useRef<HTMLTextAreaElement>(null);
	useEffect(() => {
		if (ref.current) {
			ref.current.style.height = "auto";
			ref.current.style.height = `${ref.current.scrollHeight}px`;
		}
	}, [value]);
	return (
		<textarea
			ref={ref}
			value={value}
			onChange={(e) => onChange(e.target.value.slice(0, maxLength ?? 500))}
			placeholder={placeholder}
			rows={4}
			className={cn(inputCls, "resize-none leading-[1.5] min-h-[90px]")}
		/>
	);
}

function TimeInput({
	value,
	onChange,
	placeholder,
}: {
	value: string;
	onChange: (v: string) => void;
	placeholder: string;
}) {
	return (
		<input
			type="time"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className={cn(inputCls, "leading-[1.4]")}
		/>
	);
}

function NumberInput({
	value,
	onChange,
	placeholder,
}: {
	value: string;
	onChange: (v: string) => void;
	placeholder: string;
}) {
	return (
		<input
			type="number"
			min="1"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className={inputCls}
		/>
	);
}

// ─── MiniCalendar ──────────────────────────────────────────────

function MiniCalendar({
	value,
	onChange,
}: {
	value: string;
	onChange: (date: string) => void;
}) {
	const { t } = useLang();
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const seed = value ? new Date(value + "T00:00:00") : today;
	const [viewDate, setViewDate] = useState(
		() => new Date(seed.getFullYear(), seed.getMonth(), 1),
	);

	const year = viewDate.getFullYear();
	const month = viewDate.getMonth();
	const monthLabel = `${t(`month.${month + 1}` as TranslationKey)} ${year}`;

	const firstDay = new Date(year, month, 1);
	const startOffset = (firstDay.getDay() + 6) % 7;
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	const cells: (number | null)[] = [];
	for (let i = 0; i < startOffset; i++) cells.push(null);
	for (let d = 1; d <= daysInMonth; d++) cells.push(d);
	while (cells.length % 7 !== 0) cells.push(null);

	const toISO = (d: number) =>
		`${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

	const dayHeaders = [1, 2, 3, 4, 5, 6, 7].map((i) =>
		t(`day.${i}` as TranslationKey),
	);

	return (
		<div className="bg-white border border-rule rounded-[10px] p-3">
			<div className="flex items-center justify-between mb-3">
				<button
					type="button"
					onClick={() => setViewDate(new Date(year, month - 1, 1))}
					className="w-7 h-7 flex items-center justify-center text-dim hover:text-ink cursor-pointer bg-transparent border-none text-[16px]"
				>
					‹
				</button>
				<div className="text-[13px] font-semibold text-ink">{monthLabel}</div>
				<button
					type="button"
					onClick={() => setViewDate(new Date(year, month + 1, 1))}
					className="w-7 h-7 flex items-center justify-center text-dim hover:text-ink cursor-pointer bg-transparent border-none text-[16px]"
				>
					›
				</button>
			</div>
			<div className="grid grid-cols-7 mb-1">
				{dayHeaders.map((d) => (
					<div
						key={d}
						className="text-center text-[10px] uppercase tracking-[0.06em] text-dim font-semibold py-1"
					>
						{d}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-y-1">
				{cells.map((d, i) => {
					if (!d) return <div key={i} />;
					const iso = toISO(d);
					const date = new Date(iso + "T00:00:00");
					const isPast = date < today;
					const isToday = date.getTime() === today.getTime();
					const isSelected = iso === value;
					return (
						<button
							key={i}
							type="button"
							disabled={isPast}
							onClick={() => onChange(iso)}
							className={cn(
								"mx-auto w-8 h-8 flex items-center justify-center rounded-full text-[13px] font-medium transition-colors border-none",
								isPast
									? "text-dim opacity-40 cursor-not-allowed bg-transparent"
									: "cursor-pointer hover:bg-[rgba(77,58,239,0.08)]",
								isSelected ? "bg-ink text-paper hover:bg-ink" : "",
								isToday && !isSelected
									? "border border-violet text-violet"
									: "",
								!isSelected && !isToday && !isPast ? "text-ink" : "",
							)}
						>
							{d}
						</button>
					);
				})}
			</div>
		</div>
	);
}

// ─── AddressAutocomplete ───────────────────────────────────────

type NominatimResult = { display_name: string; place_id: number };

function AddressAutocomplete({
	value,
	onChange,
	placeholder,
	lang,
}: {
	value: string;
	onChange: (v: string) => void;
	placeholder: string;
	lang: "ru" | "en";
}) {
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [open, setOpen] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const wrapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const handleChange = (q: string) => {
		onChange(q);
		setSuggestions([]);
		setOpen(false);
		clearTimeout(timerRef.current);
		if (q.length < 3) return;
		timerRef.current = setTimeout(async () => {
			try {
				const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=0&accept-language=${lang}`;
				const res = await fetch(url, {
					headers: { "User-Agent": "goout-app/1.0" },
				});
				const data: NominatimResult[] = await res.json();
				if (data.length > 0) {
					setSuggestions(data.map((d) => d.display_name));
					setOpen(true);
				}
			} catch {
				// ignore fetch errors silently
			}
		}, 400);
	};

	const select = (s: string) => {
		onChange(s);
		setSuggestions([]);
		setOpen(false);
	};

	return (
		<div ref={wrapRef} className="relative">
			<input
				type="text"
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				placeholder={placeholder}
				className={inputCls}
			/>
			{open && suggestions.length > 0 && (
				<div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-[10px] border border-rule bg-white shadow-[0_8px_24px_rgba(21,20,26,0.12)] overflow-hidden">
					{suggestions.map((s) => (
						<button
							key={s}
							type="button"
							onMouseDown={(e) => {
								e.preventDefault();
								select(s);
							}}
							className="w-full text-left px-[14px] py-[10px] text-[13px] text-ink hover:bg-[rgba(21,20,26,0.04)] border-none bg-transparent cursor-pointer border-b border-rule last:border-b-0 leading-[1.4] font-sans"
						>
							{s}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

// ─── CoverUpload ───────────────────────────────────────────────

function CoverUpload({
	preview,
	onChange,
	height,
}: {
	preview: string | null;
	onChange: (url: string | null) => void;
	height?: number;
}) {
	const { t } = useLang();
	const fileRef = useRef<HTMLInputElement>(null);
	const h = height ?? 140;

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (ev) => onChange(ev.target?.result as string);
		reader.readAsDataURL(file);
		e.target.value = "";
	};

	return (
		<div className="relative mb-[18px] group">
			<input
				ref={fileRef}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={handleFile}
			/>
			<div
				onClick={() => fileRef.current?.click()}
				style={{ height: h }}
				className={cn(
					"rounded-xl overflow-hidden relative flex flex-col items-center justify-center gap-[6px] cursor-pointer",
					preview
						? ""
						: "border border-dashed border-[rgba(21,20,26,0.25)] hover:border-violet hover:text-violet transition-colors bg-[linear-gradient(135deg,#fbc2eb_0%,#a6c1ee_100%)] text-[rgba(21,20,26,0.55)]",
				)}
			>
				{preview ? (
					<img
						src={preview}
						alt="cover"
						className="w-full h-full object-cover"
					/>
				) : (
					<>
						<div className="text-[28px] opacity-60 group-hover:opacity-80 transition-opacity">
							☰
						</div>
						<div className="text-[12px] font-semibold opacity-75 group-hover:opacity-100">
							{t("create.cover.add")}
						</div>
						<div className="text-[10px] opacity-55 text-center px-4">
							{t("create.cover.hint")}
						</div>
					</>
				)}
			</div>
			{preview && (
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onChange(null);
					}}
					className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[rgba(21,20,26,0.6)] text-white flex items-center justify-center text-[14px] border-none cursor-pointer hover:bg-[rgba(21,20,26,0.8)] leading-none"
				>
					×
				</button>
			)}
		</div>
	);
}

// ─── CategoryPicker ────────────────────────────────────────────

function CategoryPicker({
	value,
	onChange,
	lang,
}: {
	value: string;
	onChange: (id: string) => void;
	lang: "ru" | "en";
}) {
	const { t } = useLang();
	const [showModal, setShowModal] = useState(false);
	const isExtended = !MAIN_CATS.find((c) => c.id === value) && !!value;

	return (
		<>
			<div className="flex gap-[6px] flex-wrap mb-[14px]">
				{MAIN_CATS.map((c) => {
					const active = value === c.id;
					return (
						<button
							key={c.id}
							type="button"
							onClick={() => onChange(c.id)}
							className={cn(
								"inline-flex items-center gap-[5px] px-3 py-[7px] rounded-full text-xs font-medium border cursor-pointer transition-colors",
								active
									? "bg-ink text-paper border-ink"
									: "bg-transparent text-ink border-rule",
							)}
						>
							<span className="text-[11px]">{c.icon}</span>
							{lang === "ru" ? c.ru : c.en}
						</button>
					);
				})}
				<button
					type="button"
					onClick={() => setShowModal(true)}
					className={cn(
						"inline-flex items-center gap-[5px] px-3 py-[7px] rounded-full text-xs font-medium border cursor-pointer transition-colors",
						isExtended
							? "bg-ink text-paper border-ink"
							: "bg-transparent text-dim border-rule hover:border-ink hover:text-ink",
					)}
				>
					<span className="text-[11px]">+</span>
					{isExtended
						? (() => {
								const cat = ALL_CATS.find((c) => c.id === value);
								return cat
									? lang === "ru"
										? cat.ru
										: cat.en
									: t("create.field.category.more");
							})()
						: t("create.field.category.more")}
				</button>
			</div>

			{showModal && (
				<div
					className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[rgba(21,20,26,0.5)]"
					onClick={() => setShowModal(false)}
				>
					<div
						className="bg-paper rounded-t-2xl sm:rounded-2xl w-full max-w-[400px] p-5 pb-8 shadow-[0_-12px_40px_rgba(21,20,26,0.15)]"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="text-[10px] tracking-[0.14em] uppercase text-dim font-bold mb-4">
							{t("create.field.category")}
						</div>
						<div className="flex gap-[6px] flex-wrap">
							{ALL_CATS.map((c) => {
								const active = value === c.id;
								return (
									<button
										key={c.id}
										type="button"
										onClick={() => {
											onChange(c.id);
											setShowModal(false);
										}}
										className={cn(
											"inline-flex items-center gap-[6px] px-3 py-[8px] rounded-full text-xs font-medium border cursor-pointer transition-colors",
											active
												? "bg-ink text-paper border-ink"
												: "bg-transparent text-ink border-rule",
										)}
									>
										<span className="text-[11px]">{c.icon}</span>
										{lang === "ru" ? c.ru : c.en}
									</button>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

// ─── Live preview card ─────────────────────────────────────────

function PreviewCard({ form, lang }: { form: FormState; lang: "ru" | "en" }) {
	const { t } = useLang();
	const visColors: Record<string, { bg: string; badge: string; icon: string }> =
		{
			public: {
				bg: "bg-vis-pub border-[rgba(77,58,239,0.15)]",
				badge: "text-violet",
				icon: "◎",
			},
			private: {
				bg: "bg-vis-prv border-[rgba(255,109,90,0.15)]",
				badge: "text-coral",
				icon: "✦",
			},
		};
	const vc = visColors[form.visibility] ?? visColors.public;

	const visBadge: Record<string, { ru: string; en: string }> = {
		public: { ru: "открытое", en: "public" },
		private: { ru: "закрытое", en: "private" },
	};

	const dateLabel = form.selectedDate
		? (() => {
				const d = new Date(form.selectedDate + "T00:00:00");
				const m = d.getMonth() + 1;
				const shortMonth = t(`month.short.${m}` as TranslationKey);
				return lang === "ru"
					? `${d.getDate()} ${shortMonth}`
					: `${shortMonth} ${d.getDate()}`;
			})()
		: "";

	return (
		<div className={cn("rounded-xl px-[14px] py-3 border", vc.bg)}>
			<div
				className={cn(
					"text-[10px] tracking-[0.14em] uppercase font-bold mb-[6px]",
					vc.badge,
				)}
			>
				{vc.icon} {visBadge[form.visibility]?.[lang] ?? ""}
			</div>
			{form.coverPreview && (
				<div className="h-20 rounded-lg overflow-hidden mb-2">
					<img
						src={form.coverPreview}
						alt="cover"
						className="w-full h-full object-cover"
					/>
				</div>
			)}
			<div className="font-serif italic text-[20px] font-medium leading-[1.1] mb-2 text-ink">
				{form.title || t("create.preview.title.ph")}
			</div>
			<div className="text-xs text-ink leading-[1.4] mb-[10px] line-clamp-3">
				{form.description || t("create.preview.desc.ph")}
			</div>
			<div className="flex items-center gap-[6px] text-[11px]">
				<div className="w-5 h-5 rounded-full bg-[#a6c1ee] flex items-center justify-center text-white text-[9px] font-bold">
					А
				</div>
				<span className="text-ink">{t("create.preview.author")}</span>
				<span className="text-dim">·</span>
				<span className="text-dim">
					{dateLabel}
					{dateLabel && form.startTime ? " · " : ""}
					{form.startTime}
				</span>
				<span className="ml-auto font-bold text-mint">→</span>
			</div>
		</div>
	);
}

// ─── Checklist ─────────────────────────────────────────────────

function Checklist({ form }: { form: FormState }) {
	const { t } = useLang();
	const items: { ok: boolean; key: TranslationKey }[] = [
		{ ok: !!form.title, key: "checklist.title" },
		{ ok: !!form.selectedDate, key: "checklist.date" },
		{ ok: !!form.venue, key: "checklist.venue" },
		{ ok: !!form.coverPreview, key: "checklist.cover" },
	];
	return (
		<div>
			{items.map((item) => (
				<div
					key={item.key}
					className="flex items-center gap-[10px] py-[7px] border-b border-[rgba(21,20,26,0.06)]"
				>
					<span
						className={cn("text-[13px]", item.ok ? "text-mint" : "text-coral")}
					>
						{item.ok ? "✓" : "○"}
					</span>
					<span
						className={cn("text-[12px]", item.ok ? "text-ink" : "text-dim")}
					>
						{t(item.key)}
					</span>
				</div>
			))}
		</div>
	);
}

// ═══════════════════════════════════════════════════════════════
// MOBILE wizard
// ═══════════════════════════════════════════════════════════════

function ProgressBar({ step, total }: { step: number; total: number }) {
	return (
		<div className="h-[3px] bg-rule relative shrink-0">
			<div
				className="absolute inset-y-0 left-0 bg-violet transition-[width] duration-300 ease-out"
				style={{ width: `${(step / total) * 100}%` }}
			/>
		</div>
	);
}

function StepHeader({
	step,
	total,
	title,
	onBack,
}: {
	step: number;
	total: number;
	title: string;
	onBack: () => void;
}) {
	const { t } = useLang();
	return (
		<div className="px-[18px] pt-[14px] pb-[10px] flex items-center gap-[10px] border-b border-rule shrink-0 bg-paper">
			<button
				type="button"
				onClick={onBack}
				className="text-[20px] font-medium bg-transparent border-none cursor-pointer text-ink w-6 p-0 shrink-0 leading-none"
			>
				‹
			</button>
			<div className="flex-1">
				<div className="font-mono text-[10px] tracking-[0.14em] uppercase text-dim font-semibold mb-0.5">
					{t("create.step.label", { step, total })}
				</div>
				<div className="font-serif italic text-[17px] font-medium tracking-[-0.01em]">
					{title}
				</div>
			</div>
			<div className="text-[11px] text-dim font-medium">
				{t("create.draft")}
			</div>
		</div>
	);
}

function MobileFooter({
	primary,
	secondary,
	onNext,
	onSecondary,
}: {
	primary: string;
	secondary?: string;
	onNext: () => void;
	onSecondary?: () => void;
}) {
	return (
		<div className="px-[18px] pt-3 pb-[18px] border-t border-rule bg-paper flex gap-2 shrink-0">
			{secondary && (
				<button
					type="button"
					onClick={onSecondary}
					className="px-4 py-3 rounded-xl bg-white border border-rule text-[13px] font-semibold cursor-pointer text-ink"
				>
					{secondary}
				</button>
			)}
			<button
				type="button"
				onClick={onNext}
				className="flex-1 px-[18px] py-3 rounded-xl bg-ink text-paper font-bold text-[13px] tracking-[0.02em] border-none cursor-pointer flex items-center justify-between"
			>
				<span>{primary}</span>
				<span>→</span>
			</button>
		</div>
	);
}

function MobileStep1({
	lang,
	form,
	setForm,
	onNext,
}: {
	lang: "ru" | "en";
	form: FormState;
	setForm: (f: FormState) => void;
	onNext: () => void;
}) {
	const { t } = useLang();
	return (
		<>
			<div className="flex-1 overflow-y-auto px-[18px] pt-4 pb-[10px] scrollbar-hide">
				<CoverUpload
					preview={form.coverPreview}
					onChange={(url) => setForm({ ...form, coverPreview: url })}
				/>

				<Label>{t("create.field.title")}</Label>
				<InputField
					big
					serif
					value={form.title}
					onChange={(v) => setForm({ ...form, title: v })}
					placeholder={t("create.field.title.ph")}
				/>
				<div className="h-[14px]" />

				<Label>{t("create.field.category")}</Label>
				<CategoryPicker
					value={form.activeCat}
					onChange={(id) => setForm({ ...form, activeCat: id })}
					lang={lang}
				/>

				<Label>{t("create.field.description")}</Label>
				<TextareaField
					value={form.description}
					onChange={(v) => setForm({ ...form, description: v })}
					placeholder={t("create.field.description.ph")}
					maxLength={500}
				/>
				<div className="text-[10px] text-dim mt-1 text-right">
					{form.description.length} / 500
				</div>
			</div>
			<MobileFooter primary={t("step.1.next")} onNext={onNext} />
		</>
	);
}

function MobileStep2({
	form,
	setForm,
	onNext,
	onBack,
}: {
	form: FormState;
	setForm: (f: FormState) => void;
	onNext: () => void;
	onBack: () => void;
}) {
	const { t } = useLang();
	return (
		<>
			<div className="flex-1 overflow-y-auto px-[18px] pt-4 pb-[10px] scrollbar-hide">
				<div className="grid grid-cols-2 gap-[6px] mb-[14px]">
					{VISIBILITY_OPTIONS.map((opt) => {
						const on = form.visibility === opt.id;
						return (
							<button
								key={opt.id}
								type="button"
								onClick={() => setForm({ ...form, visibility: opt.id })}
								className={cn(
									"px-2 py-3 rounded-[10px] text-center border-[1.5px] cursor-pointer transition-all font-[inherit]",
									on ? opt.activeClass : opt.inactiveClass,
								)}
							>
								<div className="text-[18px] mb-1">{opt.icon}</div>
								<div
									className={cn("text-xs", on ? "font-bold" : "font-medium")}
								>
									{t(opt.labelKey)}
								</div>
								<div className="text-[9px] mt-0.5 opacity-70">
									{t(opt.subKey)}
								</div>
							</button>
						);
					})}
				</div>
				{form.visibility === "private" && (
					<div className="p-[14px] pb-4 rounded-xl bg-vis-prv border border-[rgba(255,109,90,0.2)]">
						<div className="flex items-center gap-2 mb-2">
							<div className="text-[14px] text-coral">✦</div>
							<div className="text-[13px] font-bold text-coral">
								{t("vis.private.label")}
							</div>
						</div>
						<div className="text-xs text-coral leading-[1.5]">
							{t("vis.private.desc")}
						</div>
					</div>
				)}
				{form.visibility === "public" && (
					<div className="p-[14px] pb-4 rounded-xl bg-vis-pub border border-[rgba(77,58,239,0.2)]">
						<div className="flex items-center gap-2 mb-2">
							<div className="text-[14px] text-violet">◎</div>
							<div className="text-[13px] font-bold text-violet">
								{t("vis.public.label")}
							</div>
						</div>
						<div className="text-xs text-violet leading-[1.5]">
							{t("vis.public.desc")}
						</div>
					</div>
				)}
			</div>
			<MobileFooter
				primary={t("step.2.next")}
				secondary="‹"
				onNext={onNext}
				onSecondary={onBack}
			/>
		</>
	);
}

function MobileStep3({
	lang,
	form,
	setForm,
	onNext,
	onBack,
}: {
	lang: "ru" | "en";
	form: FormState;
	setForm: (f: FormState) => void;
	onNext: () => void;
	onBack: () => void;
}) {
	const { t } = useLang();
	return (
		<>
			<div className="flex-1 overflow-y-auto px-[18px] pt-4 pb-[10px] scrollbar-hide">
				<Label>{t("create.field.date")}</Label>
				<div className="mb-[14px]">
					<MiniCalendar
						value={form.selectedDate}
						onChange={(date) => setForm({ ...form, selectedDate: date })}
					/>
				</div>

				<div className="grid grid-cols-2 gap-2 mb-[14px]">
					<div>
						<Label>{t("create.field.start")}</Label>
						<TimeInput
							value={form.startTime}
							onChange={(v) => setForm({ ...form, startTime: v })}
							placeholder="10:00"
						/>
					</div>
					<div>
						<Label>{t("create.field.end")}</Label>
						<TimeInput
							value={form.endTime}
							onChange={(v) => setForm({ ...form, endTime: v })}
							placeholder="12:00"
						/>
					</div>
				</div>

				<Label>{t("create.field.venue")}</Label>
				<div className="mb-[14px]">
					<AddressAutocomplete
						value={form.venue}
						onChange={(v) => setForm({ ...form, venue: v })}
						placeholder={t("create.field.venue.ph")}
						lang={lang}
					/>
				</div>

				<Label>{t("create.field.repeat")}</Label>
				<div className="flex gap-[6px] flex-wrap">
					{REPEAT_KEYS.map((key, idx) => (
						<div
							key={key}
							className={cn(
								"px-3 py-[7px] rounded-full text-xs font-medium border",
								idx === 0
									? "bg-ink text-paper border-ink"
									: "bg-transparent text-ink border-rule",
							)}
						>
							{t(key)}
						</div>
					))}
				</div>
			</div>
			<MobileFooter
				primary={t("step.3.next")}
				secondary="‹"
				onNext={onNext}
				onSecondary={onBack}
			/>
		</>
	);
}

function MobileStep4({
	form,
	setForm,
	onNext,
	onBack,
}: {
	form: FormState;
	setForm: (f: FormState) => void;
	onNext: () => void;
	onBack: () => void;
}) {
	const { t } = useLang();
	return (
		<>
			<div className="flex-1 overflow-y-auto px-[18px] pt-4 pb-[10px] scrollbar-hide">
				<Label>{t("create.field.capacity")}</Label>
				<div className="mb-[14px]">
					<NumberInput
						value={form.capacity}
						onChange={(v) => setForm({ ...form, capacity: v })}
						placeholder="—"
					/>
				</div>
				<Label>{t("create.field.options")}</Label>
				{OPTIONS.map((opt) => (
					<button
						key={opt.id}
						type="button"
						onClick={() =>
							setForm({
								...form,
								opts: { ...form.opts, [opt.id]: !form.opts[opt.id] },
							})
						}
						className="w-full px-[14px] py-3 rounded-[10px] bg-white border border-rule mb-2 flex gap-3 items-start text-left cursor-pointer"
					>
						<div
							className={cn(
								"w-5 h-5 rounded-[6px] border-[1.5px] flex items-center justify-center shrink-0 mt-px transition-colors",
								form.opts[opt.id]
									? "bg-violet border-violet"
									: "bg-transparent border-[rgba(21,20,26,0.2)]",
							)}
						>
							{form.opts[opt.id] && (
								<span className="text-white text-[11px]">✓</span>
							)}
						</div>
						<div>
							<div className="text-[13px] font-semibold mb-0.5 text-ink">
								{t(opt.labelKey)}
							</div>
							<div className="text-[11px] text-dim">{t(opt.subKey)}</div>
						</div>
					</button>
				))}
			</div>
			<MobileFooter
				primary={t("step.4.next")}
				secondary="‹"
				onNext={onNext}
				onSecondary={onBack}
			/>
		</>
	);
}

function MobileStep5({
	lang,
	form,
	onBack,
}: {
	lang: "ru" | "en";
	form: FormState;
	onBack: () => void;
}) {
	const { t } = useLang();
	return (
		<>
			<div className="flex-1 overflow-y-auto px-[18px] pt-4 pb-[10px] scrollbar-hide">
				<div className="text-[11px] text-dim tracking-[0.08em] uppercase font-semibold mb-3">
					{t("create.preview.feed")}
				</div>
				<PreviewCard form={form} lang={lang} />
				<div className="mt-5 text-[11px] text-dim tracking-[0.08em] uppercase font-semibold mb-[10px]">
					{t("create.checklist")}
				</div>
				<Checklist form={form} />
			</div>
			<div className="px-[18px] pt-3 pb-[18px] border-t border-rule bg-paper flex flex-col gap-2 shrink-0">
				<button
					type="button"
					className="w-full px-[18px] py-[15px] rounded-xl bg-violet text-white font-bold text-[14px] tracking-[0.02em] border-none cursor-pointer flex items-center justify-between shadow-[0_8px_22px_rgba(77,58,239,0.35)]"
				>
					<span>{t("create.publish.event")}</span>
					<span>◎</span>
				</button>
				<button
					type="button"
					onClick={onBack}
					className="py-[11px] text-center text-xs text-dim font-medium bg-transparent border-none cursor-pointer"
				>
					{t("create.back.settings")}
				</button>
			</div>
		</>
	);
}

function MobileCreate({
	lang,
	form,
	setForm,
}: {
	lang: "ru" | "en";
	form: FormState;
	setForm: (f: FormState) => void;
}) {
	const { t } = useLang();
	const [step, setStep] = useState(1);
	const TOTAL = 5;

	const next = () => setStep((s) => Math.min(s + 1, TOTAL));
	const back = () => setStep((s) => Math.max(s - 1, 1));

	return (
		<>
			<StepHeader
				step={step}
				total={TOTAL}
				title={t(STEP_TITLES[step])}
				onBack={back}
			/>
			<ProgressBar step={step} total={TOTAL} />
			<div className="flex-1 flex flex-col overflow-hidden">
				{step === 1 && (
					<MobileStep1
						lang={lang}
						form={form}
						setForm={setForm}
						onNext={next}
					/>
				)}
				{step === 2 && (
					<MobileStep2
						form={form}
						setForm={setForm}
						onNext={next}
						onBack={back}
					/>
				)}
				{step === 3 && (
					<MobileStep3
						lang={lang}
						form={form}
						setForm={setForm}
						onNext={next}
						onBack={back}
					/>
				)}
				{step === 4 && (
					<MobileStep4
						form={form}
						setForm={setForm}
						onNext={next}
						onBack={back}
					/>
				)}
				{step === 5 && <MobileStep5 lang={lang} form={form} onBack={back} />}
			</div>
		</>
	);
}

// ═══════════════════════════════════════════════════════════════
// DESKTOP layout
// ═══════════════════════════════════════════════════════════════

function SectionDivider({ label, icon }: { label: string; icon: string }) {
	return (
		<div className="flex items-center gap-3 mb-4 mt-2">
			<span className="text-dim text-sm">{icon}</span>
			<div className="font-serif italic text-[18px] font-medium">{label}</div>
			<div className="flex-1 h-px bg-rule" />
		</div>
	);
}

function DesktopCreateInner({
	lang,
	form,
	setForm,
}: {
	lang: "ru" | "en";
	form: FormState;
	setForm: (f: FormState) => void;
}) {
	const { t } = useLang();

	return (
		<div className="flex h-full overflow-hidden">
			{/* Center — scrollable form */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Top bar */}
				<div className="px-8 pt-[18px] pb-[14px] border-b border-rule flex items-center justify-between bg-paper shrink-0">
					<div>
						<div className="font-serif text-[22px] font-medium tracking-[-0.02em] leading-tight">
							{t("create.header")}
						</div>
						<div className="text-xs text-dim mt-0.5">
							{t("create.header.sub")}
						</div>
					</div>
					<button
						type="button"
						className="px-5 py-[10px] rounded-xl bg-violet text-white font-bold text-[13px] border-none cursor-pointer flex items-center gap-2 shadow-[0_6px_16px_rgba(77,58,239,0.3)]"
					>
						<span>◎</span>
						{t("create.publish")}
					</button>
				</div>

				<div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-hide">
					<CoverUpload
						preview={form.coverPreview}
						onChange={(url) => setForm({ ...form, coverPreview: url })}
						height={160}
					/>

					<SectionDivider label={t("create.section.about")} icon="✦" />
					<div className="mb-4">
						<Label>{t("create.field.title")}</Label>
						<InputField
							big
							serif
							value={form.title}
							onChange={(v) => setForm({ ...form, title: v })}
							placeholder={t("create.field.title.ph")}
						/>
					</div>
					<div className="mb-4">
						<Label>{t("create.field.category")}</Label>
						<CategoryPicker
							value={form.activeCat}
							onChange={(id) => setForm({ ...form, activeCat: id })}
							lang={lang}
						/>
					</div>
					<div className="mb-6">
						<Label>{t("create.field.description")}</Label>
						<TextareaField
							value={form.description}
							onChange={(v) => setForm({ ...form, description: v })}
							placeholder={t("create.field.description.ph")}
							maxLength={500}
						/>
						<div className="text-[10px] text-dim mt-1 text-right">
							{form.description.length} / 500
						</div>
					</div>

					<SectionDivider label={t("create.section.audience")} icon="◉" />
					<div className="grid grid-cols-2 gap-3 mb-4">
						{VISIBILITY_OPTIONS.map((opt) => {
							const on = form.visibility === opt.id;
							return (
								<button
									key={opt.id}
									type="button"
									onClick={() => setForm({ ...form, visibility: opt.id })}
									className={cn(
										"px-3 py-[14px] rounded-[10px] text-center border-[1.5px] cursor-pointer transition-all font-[inherit]",
										on ? opt.activeClass : opt.inactiveClass,
									)}
								>
									<div className="text-[22px] mb-1.5">{opt.icon}</div>
									<div
										className={cn(
											"text-[13px]",
											on ? "font-bold" : "font-medium",
										)}
									>
										{t(opt.labelKey)}
									</div>
									<div className="text-[10px] mt-1 opacity-70">
										{t(opt.subKey)}
									</div>
								</button>
							);
						})}
					</div>
					{form.visibility === "private" && (
						<div className="p-4 rounded-xl bg-vis-prv border border-[rgba(255,109,90,0.2)] mb-6">
							<div className="flex items-center gap-2 mb-2">
								<div className="text-[14px] text-coral">✦</div>
								<div className="text-[13px] font-bold text-coral">
									{t("vis.private.label")}
								</div>
							</div>
							<div className="text-xs text-coral leading-[1.5]">
								{t("vis.private.desc")}
							</div>
						</div>
					)}
					{form.visibility === "public" && <div className="mb-6" />}

					<SectionDivider label={t("create.section.when")} icon="◇" />
					<div className="mb-4">
						<Label>{t("create.field.date")}</Label>
						<MiniCalendar
							value={form.selectedDate}
							onChange={(date) => setForm({ ...form, selectedDate: date })}
						/>
					</div>
					<div className="grid grid-cols-2 gap-3 mb-4">
						<div>
							<Label>{t("create.field.start")}</Label>
							<TimeInput
								value={form.startTime}
								onChange={(v) => setForm({ ...form, startTime: v })}
								placeholder="10:00"
							/>
						</div>
						<div>
							<Label>{t("create.field.end")}</Label>
							<TimeInput
								value={form.endTime}
								onChange={(v) => setForm({ ...form, endTime: v })}
								placeholder="12:00"
							/>
						</div>
					</div>
					<div className="mb-6">
						<Label>{t("create.field.venue")}</Label>
						<AddressAutocomplete
							value={form.venue}
							onChange={(v) => setForm({ ...form, venue: v })}
							placeholder={t("create.field.venue.ph")}
							lang={lang}
						/>
					</div>

					<SectionDivider label={t("create.section.settings")} icon="⚙" />
					<div className="mb-4">
						<Label>{t("create.field.capacity")}</Label>
						<div className="w-[200px]">
							<NumberInput
								value={form.capacity}
								onChange={(v) => setForm({ ...form, capacity: v })}
								placeholder="—"
							/>
						</div>
					</div>
					<div className="mb-8">
						{OPTIONS.map((opt) => (
							<button
								key={opt.id}
								type="button"
								onClick={() =>
									setForm({
										...form,
										opts: { ...form.opts, [opt.id]: !form.opts[opt.id] },
									})
								}
								className="w-full px-[14px] py-3 rounded-[10px] bg-white border border-rule mb-2 flex gap-3 items-start text-left cursor-pointer hover:border-violet/30 transition-colors"
							>
								<div
									className={cn(
										"w-5 h-5 rounded-[6px] border-[1.5px] flex items-center justify-center shrink-0 mt-px transition-colors",
										form.opts[opt.id]
											? "bg-violet border-violet"
											: "bg-transparent border-[rgba(21,20,26,0.2)]",
									)}
								>
									{form.opts[opt.id] && (
										<span className="text-white text-[11px]">✓</span>
									)}
								</div>
								<div>
									<div className="text-[13px] font-semibold mb-0.5 text-ink">
										{t(opt.labelKey)}
									</div>
									<div className="text-[11px] text-dim">{t(opt.subKey)}</div>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Right sidebar */}
			<div className="w-[280px] shrink-0 border-l border-rule bg-paper2 flex flex-col px-4 py-[22px] overflow-y-auto">
				<div className="text-[10px] tracking-[0.14em] uppercase text-dim font-bold mb-3">
					{t("create.sidebar.preview")}
				</div>
				<PreviewCard form={form} lang={lang} />
				<div className="mt-5 mb-2 text-[10px] tracking-[0.14em] uppercase text-dim font-bold">
					{t("create.sidebar.checklist")}
				</div>
				<Checklist form={form} />
				<div className="mt-auto pt-5">
					<button
						type="button"
						className="w-full px-5 py-[13px] rounded-xl bg-violet text-white font-bold text-[13px] border-none cursor-pointer flex items-center justify-between shadow-[0_6px_16px_rgba(77,58,239,0.3)]"
					>
						<span>{t("create.publish")}</span>
						<span>◎</span>
					</button>
					<button
						type="button"
						className="w-full mt-2 py-[10px] text-center text-xs text-dim font-medium bg-transparent border-none cursor-pointer"
					>
						{t("create.save.draft")}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Root ──────────────────────────────────────────────────────

function CreatePage() {
	const { lang } = useLang();
	const isDesktop = useMediaQuery("(min-width: 900px)");

	const today = new Date();
	const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

	const [form, setForm] = useState<FormState>({
		title: "",
		activeCat: "food",
		description: "",
		visibility: "public",
		selectedDate: todayISO,
		startTime: "10:00",
		endTime: "12:00",
		venue: "",
		capacity: "",
		coverPreview: null,
		opts: { confirm: false, plus1: false, public_list: false },
	});

	if (isDesktop) {
		return (
			<AppShell hideTabBar>
				<DesktopCreateInner lang={lang} form={form} setForm={setForm} />
			</AppShell>
		);
	}

	return (
		<AppShell>
			<MobileCreate lang={lang} form={form} setForm={setForm} />
		</AppShell>
	);
}
