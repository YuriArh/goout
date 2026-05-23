import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useLang } from '#/lib/lang'
import { useMediaQuery } from '#/hooks/useMediaQuery'
import { AppShell } from '#/components/AppShell'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/create')({ component: CreatePage })

const CATEGORIES = [
	{ i: '♪', ru: 'Концерт', en: 'Music' },
	{ i: '◍', ru: 'Еда', en: 'Food', default: true },
	{ i: '◉', ru: 'Спорт', en: 'Sport' },
	{ i: '❝', ru: 'Лекция', en: 'Talk' },
	{ i: '☻', ru: 'Детям', en: 'Kids' },
	{ i: '+', ru: 'ещё', en: 'more' },
]

const VISIBILITY_OPTIONS = [
	{
		id: 'public',
		icon: '◎',
		ru: 'Открытое',
		en: 'Public',
		sub: { ru: 'в общей афише', en: 'in the guide' },
		activeClass: 'bg-vis-pub border-violet text-violet',
		inactiveClass: 'bg-white border-rule text-ink',
	},
	{
		id: 'neighbors',
		icon: '◉',
		ru: 'Соседи',
		en: 'Neighbors',
		sub: { ru: 'в радиусе', en: 'in a radius' },
		activeClass: 'bg-vis-nbr border-mint text-mint',
		inactiveClass: 'bg-white border-rule text-ink',
	},
	{
		id: 'private',
		icon: '✦',
		ru: 'Закрытое',
		en: 'Private',
		sub: { ru: 'по ссылке', en: 'by link' },
		activeClass: 'bg-vis-prv border-coral text-coral',
		inactiveClass: 'bg-white border-rule text-ink',
	},
]

const WEEK_DAYS = [
	{ d: 10, ru: 'вс', en: 'Sun' },
	{ d: 11, ru: 'пн', en: 'Mon' },
	{ d: 12, ru: 'вт', en: 'Tue' },
	{ d: 13, ru: 'ср', en: 'Wed' },
	{ d: 14, ru: 'чт', en: 'Thu' },
	{ d: 15, ru: 'пт', en: 'Fri' },
	{ d: 16, ru: 'сб', en: 'Sat' },
]

// ─── Shared form state ────────────────────────────────────────

type FormState = {
	title: string
	activeCat: string
	description: string
	visibility: string
	selectedDay: number
	startTime: string
	endTime: string
	venue: string
	capacity: string
	opts: { confirm: boolean; plus1: boolean; public_list: boolean }
}

// ─── Label & Field ────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
	return (
		<div className="text-[10px] tracking-[0.14em] uppercase text-dim font-bold mb-2">
			{children}
		</div>
	)
}

function Field({
	value,
	placeholder,
	multi,
	big,
	serif,
}: {
	value?: string
	placeholder: string
	multi?: boolean
	big?: boolean
	serif?: boolean
}) {
	return (
		<div className="px-[14px] py-3 rounded-[10px] bg-white border border-rule">
			<div
				className={cn(
					'font-medium leading-[1.4]',
					big ? 'text-[18px] tracking-[-0.02em]' : 'text-[14px] tracking-[-0.005em]',
					serif ? 'font-serif' : '',
					multi ? 'leading-[1.5] whitespace-pre-wrap' : 'whitespace-nowrap overflow-hidden text-ellipsis',
					value ? 'text-ink' : 'text-dim',
				)}
			>
				{value ?? placeholder}
			</div>
		</div>
	)
}

// ─── Live preview card (used in desktop sidebar) ──────────────

function PreviewCard({ form, lang }: { form: FormState; lang: 'ru' | 'en' }) {
	const visColors: Record<string, { bg: string; badge: string; icon: string }> = {
		neighbors: { bg: 'bg-vis-nbr border-[rgba(47,138,107,0.15)]', badge: 'text-mint', icon: '◉' },
		public: { bg: 'bg-vis-pub border-[rgba(77,58,239,0.15)]', badge: 'text-violet', icon: '◎' },
		private: { bg: 'bg-vis-prv border-[rgba(255,109,90,0.15)]', badge: 'text-coral', icon: '✦' },
	}
	const vc = visColors[form.visibility] ?? visColors.neighbors

	const visBadge: Record<string, { ru: string; en: string }> = {
		neighbors: { ru: 'в 500 м от вас', en: 'within 500m' },
		public: { ru: 'открытое', en: 'public' },
		private: { ru: 'закрытое', en: 'private' },
	}

	return (
		<div className={cn('rounded-xl px-[14px] py-3 border', vc.bg)}>
			<div className={cn('text-[10px] tracking-[0.14em] uppercase font-bold mb-[6px]', vc.badge)}>
				{vc.icon} {visBadge[form.visibility]?.[lang] ?? ''}
			</div>
			<div className="font-serif italic text-[20px] font-medium leading-[1.1] mb-2 text-ink">
				{form.title || (lang === 'ru' ? 'Название события' : 'Event title')}
			</div>
			<div className="text-xs text-ink leading-[1.4] mb-[10px] line-clamp-3">
				{form.description || (lang === 'ru' ? 'Описание появится здесь…' : 'Description will appear here…')}
			</div>
			<div className="flex items-center gap-[6px] text-[11px]">
				<div className="w-5 h-5 rounded-full bg-[#a6c1ee] flex items-center justify-center text-white text-[9px] font-bold">
					А
				</div>
				<span className="text-ink">{lang === 'ru' ? 'Аня С.' : 'Anya S.'}</span>
				<span className="text-dim">·</span>
				<span className="text-dim">
					{form.selectedDay} {lang === 'ru' ? 'мая' : 'May'} · {form.startTime}
				</span>
				<span className="ml-auto font-bold" style={{ color: 'var(--mag-mint)' }}>→</span>
			</div>
		</div>
	)
}

// ─── Checklist ────────────────────────────────────────────────

function Checklist({ form, lang }: { form: FormState; lang: 'ru' | 'en' }) {
	const items = [
		{ ok: !!form.title, ru: 'Название заполнено', en: 'Title filled in' },
		{ ok: !!form.selectedDay, ru: 'Дата выбрана', en: 'Date set' },
		{ ok: !!form.venue, ru: 'Место указано', en: 'Location added' },
		{ ok: false, ru: 'Обложка не добавлена', en: 'No cover image' },
	]
	return (
		<div>
			{items.map((item) => (
				<div key={item.ru} className="flex items-center gap-[10px] py-[7px] border-b border-[rgba(21,20,26,0.06)]">
					<span className={cn('text-[13px]', item.ok ? 'text-mint' : 'text-coral')}>
						{item.ok ? '✓' : '○'}
					</span>
					<span className={cn('text-[12px]', item.ok ? 'text-ink' : 'text-dim')}>
						{lang === 'ru' ? item.ru : item.en}
					</span>
				</div>
			))}
		</div>
	)
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
	)
}

function StepHeader({
	step,
	total,
	title,
	lang,
	onBack,
}: {
	step: number
	total: number
	title: string
	lang: string
	onBack: () => void
}) {
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
					{lang === 'ru' ? `Шаг ${step} из ${total}` : `Step ${step} of ${total}`}
				</div>
				<div className="font-serif italic text-[17px] font-medium tracking-[-0.01em]">
					{title}
				</div>
			</div>
			<div className="text-[11px] text-dim font-medium">
				{lang === 'ru' ? 'Черновик' : 'Draft'}
			</div>
		</div>
	)
}

function MobileFooter({
	primary,
	secondary,
	onNext,
	onSecondary,
}: {
	primary: string
	secondary?: string
	onNext: () => void
	onSecondary?: () => void
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
	)
}

function MobileStep1({ lang, form, setForm, onNext }: { lang: 'ru' | 'en'; form: FormState; setForm: (f: FormState) => void; onNext: () => void }) {
	return (
		<>
			<div className="flex-1 overflow-y-auto px-[18px] pt-4 pb-[10px] scrollbar-hide">
				<div
					className="h-[140px] rounded-xl overflow-hidden relative flex flex-col items-center justify-center gap-[6px] mb-[18px] text-[rgba(21,20,26,0.55)] border border-dashed border-[rgba(21,20,26,0.25)] cursor-pointer group transition-colors hover:border-violet hover:text-violet"
					style={{ background: 'linear-gradient(135deg,#fbc2eb 0%,#a6c1ee 100%)' }}
				>
					<div className="text-[28px] opacity-60 group-hover:opacity-80 transition-opacity">☰</div>
					<div className="text-[12px] font-semibold opacity-75 group-hover:opacity-100">
						{lang === 'ru' ? 'Добавить обложку' : 'Add cover'}
					</div>
					<div className="text-[10px] opacity-55 text-center px-4">
						{lang === 'ru' ? 'с обложкой откликнутся в 3× чаще' : '3× more responses with a cover'}
					</div>
				</div>

				<Label>{lang === 'ru' ? 'Название' : 'Title'}</Label>
				<Field big serif value={form.title || undefined} placeholder={lang === 'ru' ? 'Название события' : 'Event title'} />
				<div className="h-[14px]" />

				<Label>{lang === 'ru' ? 'Категория' : 'Category'}</Label>
				<div className="flex gap-[6px] flex-wrap mb-[14px]">
					{CATEGORIES.map((c) => {
						const active = form.activeCat === c.ru
						return (
							<button
								key={c.ru}
								type="button"
								onClick={() => setForm({ ...form, activeCat: c.ru })}
								className={cn(
									'inline-flex items-center gap-[5px] px-3 py-[7px] rounded-full text-xs font-medium border cursor-pointer transition-colors',
									active ? 'bg-ink text-paper border-ink' : 'bg-transparent text-ink border-rule',
								)}
							>
								<span className="text-[11px]">{c.i}</span>
								{lang === 'ru' ? c.ru : c.en}
							</button>
						)
					})}
				</div>

				<Label>{lang === 'ru' ? 'Описание' : 'Description'}</Label>
				<Field multi value={form.description || undefined} placeholder={lang === 'ru' ? 'Расскажите о событии...' : 'Describe your event...'} />
				<div className="text-[10px] text-dim mt-1 text-right">{form.description.length} / 500</div>
			</div>
			<MobileFooter primary={lang === 'ru' ? 'Дальше · Кто увидит' : 'Next · Who sees it'} onNext={onNext} />
		</>
	)
}

function MobileStep2({ lang, form, setForm, onNext, onBack }: { lang: 'ru' | 'en'; form: FormState; setForm: (f: FormState) => void; onNext: () => void; onBack: () => void }) {
	return (
		<>
			<div className="flex-1 overflow-y-auto px-[18px] pt-4 pb-[10px] scrollbar-hide">
				<div className="grid grid-cols-3 gap-[6px] mb-[14px]">
					{VISIBILITY_OPTIONS.map((opt) => {
						const on = form.visibility === opt.id
						return (
							<button
								key={opt.id}
								type="button"
								onClick={() => setForm({ ...form, visibility: opt.id })}
								className={cn(
									'px-2 py-3 rounded-[10px] text-center border-[1.5px] cursor-pointer transition-all font-[inherit]',
									on ? opt.activeClass : opt.inactiveClass,
								)}
							>
								<div className="text-[18px] mb-1">{opt.icon}</div>
								<div className={cn('text-xs', on ? 'font-bold' : 'font-medium')}>
									{lang === 'ru' ? opt.ru : opt.en}
								</div>
								<div className="text-[9px] mt-0.5 opacity-70">{opt.sub[lang]}</div>
							</button>
						)
					})}
				</div>

				{form.visibility === 'neighbors' && (
					<div className="p-[14px] pb-4 rounded-xl bg-vis-nbr border border-[rgba(47,138,107,0.2)] mb-[14px]">
						<div className="flex justify-between items-baseline mb-[10px]">
							<div className="font-serif text-[16px] italic font-medium text-mint">
								{lang === 'ru' ? 'Радиус видимости' : 'Visibility radius'}
							</div>
							<div className="font-mono text-[15px] font-bold text-mint">500 м</div>
						</div>
						<div className="relative h-6 mb-[6px]">
							<div className="absolute top-[10px] inset-x-0 h-[3px] rounded-sm bg-[rgba(47,138,107,0.25)]" />
							<div className="absolute top-[10px] left-0 w-[22%] h-[3px] rounded-sm bg-mint" />
							<div className="absolute top-1 w-4 h-4 rounded-full bg-white border-[3px] border-mint shadow-[0_2px_6px_rgba(0,0,0,0.15)]" style={{ left: '22%', transform: 'translateX(-50%)' }} />
						</div>
						<div className="flex justify-between text-[10px] text-mint opacity-70 mb-[10px]">
							<span>200 м</span><span>500 м</span><span>1 км</span><span>2 км</span>
						</div>
						<div className="px-[10px] py-2 bg-white rounded-lg text-[11px] text-mint font-medium leading-[1.4] border border-[rgba(47,138,107,0.2)]">
							◉ {lang === 'ru' ? <><strong>~ 240 соседей</strong> в Пресненском. Подпись <strong>анонимна</strong>.</> : <><strong>~240 neighbors</strong> in Presnya. You stay <strong>anonymous</strong>.</>}
						</div>
					</div>
				)}
				{form.visibility === 'private' && (
					<div className="p-[14px] pb-4 rounded-xl bg-vis-prv border border-[rgba(255,109,90,0.2)] mb-[14px]">
						<div className="flex items-center gap-2 mb-2">
							<div className="text-[14px] text-coral">✦</div>
							<div className="text-[13px] font-bold text-coral">{lang === 'ru' ? 'Закрытое событие' : 'Private event'}</div>
						</div>
						<div className="text-xs text-coral leading-[1.5]">
							{lang === 'ru' ? 'Событие не будет в афише и на карте.' : "Event won't show in the guide or map."}
						</div>
					</div>
				)}
				{form.visibility === 'public' && (
					<div className="p-[14px] pb-4 rounded-xl bg-vis-pub border border-[rgba(77,58,239,0.2)] mb-[14px]">
						<div className="flex items-center gap-2 mb-2">
							<div className="text-[14px] text-violet">◎</div>
							<div className="text-[13px] font-bold text-violet">{lang === 'ru' ? 'Открытое событие' : 'Public event'}</div>
						</div>
						<div className="text-xs text-violet leading-[1.5]">
							{lang === 'ru' ? 'Появится в общей афише и на карте.' : 'Will appear in the public guide and map.'}
						</div>
					</div>
				)}
			</div>
			<MobileFooter primary={lang === 'ru' ? 'Дальше · Когда и где' : 'Next · When & where'} secondary="‹" onNext={onNext} onSecondary={onBack} />
		</>
	)
}

function MobileStep3({ lang, form, setForm, onNext, onBack }: { lang: 'ru' | 'en'; form: FormState; setForm: (f: FormState) => void; onNext: () => void; onBack: () => void }) {
	return (
		<>
			<div className="flex-1 overflow-y-auto px-[18px] pt-4 pb-[10px] scrollbar-hide">
				<Label>{lang === 'ru' ? 'Дата' : 'Date'}</Label>
				<div className="flex gap-[6px] mb-[14px]">
					{WEEK_DAYS.map((dy) => {
						const on = form.selectedDay === dy.d
						return (
							<button
								key={dy.d}
								type="button"
								onClick={() => setForm({ ...form, selectedDay: dy.d })}
								className={cn('flex-1 rounded-[10px] py-2 text-center border cursor-pointer transition-colors', on ? 'bg-ink text-paper border-ink' : 'bg-white text-ink border-rule')}
							>
								<div className={cn('text-[9px] uppercase tracking-[0.08em] mb-0.5', on ? 'opacity-60' : 'opacity-70')}>
									{lang === 'ru' ? dy.ru : dy.en}
								</div>
								<div className="font-serif text-[15px] font-semibold leading-none">{dy.d}</div>
							</button>
						)
					})}
				</div>

				<div className="grid grid-cols-2 gap-2 mb-[14px]">
					<div>
						<Label>{lang === 'ru' ? 'Начало' : 'Start'}</Label>
						<Field value={form.startTime} placeholder="10:00" />
					</div>
					<div>
						<Label>{lang === 'ru' ? 'Конец' : 'End'}</Label>
						<Field value={form.endTime} placeholder="12:00" />
					</div>
				</div>

				<Label>{lang === 'ru' ? 'Место' : 'Venue'}</Label>
				<Field value={form.venue || undefined} placeholder={lang === 'ru' ? 'Адрес или название места' : 'Address or venue name'} />
				<div className="h-[14px]" />

				<Label>{lang === 'ru' ? 'Повторение' : 'Repeat'}</Label>
				<div className="flex gap-[6px] flex-wrap">
					{[{ ru: 'Один раз', en: 'Once', on: true }, { ru: 'Еженедельно', en: 'Weekly' }, { ru: 'Каждые 2 недели', en: 'Biweekly' }].map((opt) => (
						<div key={opt.ru} className={cn('px-3 py-[7px] rounded-full text-xs font-medium border', opt.on ? 'bg-ink text-paper border-ink' : 'bg-transparent text-ink border-rule')}>
							{lang === 'ru' ? opt.ru : opt.en}
						</div>
					))}
				</div>
			</div>
			<MobileFooter primary={lang === 'ru' ? 'Дальше · Правила' : 'Next · Settings'} secondary="‹" onNext={onNext} onSecondary={onBack} />
		</>
	)
}

function MobileStep4({ lang, form, setForm, onNext, onBack }: { lang: 'ru' | 'en'; form: FormState; setForm: (f: FormState) => void; onNext: () => void; onBack: () => void }) {
	const OPTIONS = [
		{ id: 'confirm' as const, ru: 'Требовать подтверждение', en: 'Require confirmation', sub: { ru: 'вы принимаете каждого вручную', en: 'you manually accept each participant' } },
		{ id: 'plus1' as const, ru: 'Разрешить +1', en: 'Allow +1', sub: { ru: 'каждый может прийти с кем-то', en: 'each attendee can bring someone' } },
		{ id: 'public_list' as const, ru: 'Публичный список участников', en: 'Public attendee list', sub: { ru: 'все видят, кто идёт', en: "everyone can see who's going" } },
	]
	return (
		<>
			<div className="flex-1 overflow-y-auto px-[18px] pt-4 pb-[10px] scrollbar-hide">
				<Label>{lang === 'ru' ? 'Вместимость' : 'Capacity'}</Label>
				<div className="grid grid-cols-2 gap-2 mb-[14px]">
					<Field value={form.capacity} placeholder="—" />
					<div className="px-[14px] py-3 rounded-[10px] bg-vis-nbr border border-[rgba(47,138,107,0.2)] text-[11px] text-mint leading-[1.4] flex items-center">
						{lang === 'ru' ? '14 уже записались' : '14 already signed up'}
					</div>
				</div>
				<Label>{lang === 'ru' ? 'Опции' : 'Options'}</Label>
				{OPTIONS.map((opt) => (
					<button
						key={opt.id}
						type="button"
						onClick={() => setForm({ ...form, opts: { ...form.opts, [opt.id]: !form.opts[opt.id] } })}
						className="w-full px-[14px] py-3 rounded-[10px] bg-white border border-rule mb-2 flex gap-3 items-start text-left cursor-pointer"
					>
						<div className={cn('w-5 h-5 rounded-[6px] border-[1.5px] flex items-center justify-center shrink-0 mt-px transition-colors', form.opts[opt.id] ? 'bg-violet border-violet' : 'bg-transparent border-[rgba(21,20,26,0.2)]')}>
							{form.opts[opt.id] && <span className="text-white text-[11px]">✓</span>}
						</div>
						<div>
							<div className="text-[13px] font-semibold mb-0.5 text-ink">{lang === 'ru' ? opt.ru : opt.en}</div>
							<div className="text-[11px] text-dim">{lang === 'ru' ? opt.sub.ru : opt.sub.en}</div>
						</div>
					</button>
				))}
			</div>
			<MobileFooter primary={lang === 'ru' ? 'Дальше · Предпросмотр' : 'Next · Preview'} secondary="‹" onNext={onNext} onSecondary={onBack} />
		</>
	)
}

function MobileStep5({ lang, form, onBack }: { lang: 'ru' | 'en'; form: FormState; onBack: () => void }) {
	return (
		<>
			<div className="flex-1 overflow-y-auto px-[18px] pt-4 pb-[10px] scrollbar-hide">
				<div className="text-[11px] text-dim tracking-[0.08em] uppercase font-semibold mb-3">
					{lang === 'ru' ? 'Как это выглядит в ленте' : 'How it looks in the feed'}
				</div>
				<PreviewCard form={form} lang={lang} />
				<div className="mt-5 text-[11px] text-dim tracking-[0.08em] uppercase font-semibold mb-[10px]">
					{lang === 'ru' ? 'Готовность' : 'Checklist'}
				</div>
				<Checklist form={form} lang={lang} />
			</div>
			<div className="px-[18px] pt-3 pb-[18px] border-t border-rule bg-paper flex flex-col gap-2 shrink-0">
				<button type="button" className="w-full px-[18px] py-[15px] rounded-xl bg-mint text-white font-bold text-[14px] tracking-[0.02em] border-none cursor-pointer flex items-center justify-between shadow-[0_8px_22px_rgba(47,138,107,0.35)]">
					<span>{lang === 'ru' ? 'Опубликовать событие' : 'Publish event'}</span>
					<span>◉</span>
				</button>
				<button type="button" onClick={onBack} className="py-[11px] text-center text-xs text-dim font-medium bg-transparent border-none cursor-pointer">
					{lang === 'ru' ? '‹ Назад к правилам' : '‹ Back to settings'}
				</button>
			</div>
		</>
	)
}

// ─── Mobile wizard shell ──────────────────────────────────────

function MobileCreate({ lang, form, setForm }: { lang: 'ru' | 'en'; form: FormState; setForm: (f: FormState) => void }) {
	const [step, setStep] = useState(1)
	const TOTAL = 5

	const STEP_TITLES: Record<number, { ru: string; en: string }> = {
		1: { ru: 'О событии', en: 'About the event' },
		2: { ru: 'Кто увидит', en: 'Who can see it' },
		3: { ru: 'Когда и где', en: 'When & where' },
		4: { ru: 'Правила', en: 'Settings' },
		5: { ru: 'Предпросмотр', en: 'Preview' },
	}

	const next = () => setStep((s) => Math.min(s + 1, TOTAL))
	const back = () => setStep((s) => Math.max(s - 1, 1))

	return (
		<>
			<StepHeader step={step} total={TOTAL} title={STEP_TITLES[step][lang]} lang={lang} onBack={back} />
			<ProgressBar step={step} total={TOTAL} />
			<div className="flex-1 flex flex-col overflow-hidden">
				{step === 1 && <MobileStep1 lang={lang} form={form} setForm={setForm} onNext={next} />}
				{step === 2 && <MobileStep2 lang={lang} form={form} setForm={setForm} onNext={next} onBack={back} />}
				{step === 3 && <MobileStep3 lang={lang} form={form} setForm={setForm} onNext={next} onBack={back} />}
				{step === 4 && <MobileStep4 lang={lang} form={form} setForm={setForm} onNext={next} onBack={back} />}
				{step === 5 && <MobileStep5 lang={lang} form={form} onBack={back} />}
			</div>
		</>
	)
}

// ═══════════════════════════════════════════════════════════════
// DESKTOP layout — form + live preview (AppShell provides sidebar)
// ═══════════════════════════════════════════════════════════════

function DesktopCreateInner({ lang, form, setForm }: { lang: 'ru' | 'en'; form: FormState; setForm: (f: FormState) => void }) {
	const OPTIONS = [
		{ id: 'confirm' as const, ru: 'Требовать подтверждение', en: 'Require confirmation', sub: { ru: 'вы принимаете каждого вручную', en: 'manually accept each participant' } },
		{ id: 'plus1' as const, ru: 'Разрешить +1', en: 'Allow +1', sub: { ru: 'каждый может прийти с кем-то', en: 'attendees can bring someone' } },
		{ id: 'public_list' as const, ru: 'Публичный список', en: 'Public attendee list', sub: { ru: 'все видят, кто идёт', en: "everyone can see who's going" } },
	]

	return (
		<div className="flex h-full overflow-hidden">
			{/* Center — scrollable form */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Top bar */}
				<div className="px-8 pt-[18px] pb-[14px] border-b border-rule flex items-center justify-between bg-paper shrink-0">
					<div>
						<div className="font-serif text-[22px] font-medium tracking-[-0.02em] leading-tight">
							{lang === 'ru' ? 'Новое событие' : 'New event'}
						</div>
						<div className="text-xs text-dim mt-0.5">
							{lang === 'ru' ? 'Заполните все разделы и опубликуйте' : 'Fill in all sections and publish'}
						</div>
					</div>
					<button
						type="button"
						className="px-5 py-[10px] rounded-xl bg-mint text-white font-bold text-[13px] border-none cursor-pointer flex items-center gap-2 shadow-[0_6px_16px_rgba(47,138,107,0.3)]"
					>
						<span>◉</span>
						{lang === 'ru' ? 'Опубликовать' : 'Publish'}
					</button>
				</div>

				<div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-hide">
					{/* Cover */}
					<div
						className="h-[160px] rounded-xl overflow-hidden relative flex flex-col items-center justify-center gap-[6px] mb-6 text-[rgba(21,20,26,0.55)] border border-dashed border-[rgba(21,20,26,0.25)] cursor-pointer group hover:border-violet hover:text-violet transition-colors"
						style={{ background: 'linear-gradient(135deg,#fbc2eb 0%,#a6c1ee 100%)' }}
					>
						<div className="text-[32px] opacity-60 group-hover:opacity-80 transition-opacity">☰</div>
						<div className="text-[13px] font-semibold opacity-75 group-hover:opacity-100">
							{lang === 'ru' ? 'Добавить обложку' : 'Add cover image'}
						</div>
						<div className="text-[11px] opacity-55">
							{lang === 'ru' ? 'с обложкой откликнутся в 3× чаще' : '3× more responses with a cover'}
						</div>
					</div>

					{/* Section: About */}
					<SectionDivider label={lang === 'ru' ? 'О событии' : 'About'} icon="✦" />
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div className="col-span-2">
							<Label>{lang === 'ru' ? 'Название' : 'Title'}</Label>
							<Field big serif value={form.title || undefined} placeholder={lang === 'ru' ? 'Название события' : 'Event title'} />
						</div>
					</div>
					<div className="mb-4">
						<Label>{lang === 'ru' ? 'Категория' : 'Category'}</Label>
						<div className="flex gap-[6px] flex-wrap">
							{CATEGORIES.map((c) => {
								const active = form.activeCat === c.ru
								return (
									<button
										key={c.ru}
										type="button"
										onClick={() => setForm({ ...form, activeCat: c.ru })}
										className={cn('inline-flex items-center gap-[5px] px-3 py-[7px] rounded-full text-xs font-medium border cursor-pointer transition-colors', active ? 'bg-ink text-paper border-ink' : 'bg-transparent text-ink border-rule')}
									>
										<span className="text-[11px]">{c.i}</span>
										{lang === 'ru' ? c.ru : c.en}
									</button>
								)
							})}
						</div>
					</div>
					<div className="mb-6">
						<Label>{lang === 'ru' ? 'Описание' : 'Description'}</Label>
						<Field multi value={form.description || undefined} placeholder={lang === 'ru' ? 'Расскажите о событии...' : 'Describe your event...'} />
						<div className="text-[10px] text-dim mt-1 text-right">{form.description.length} / 500</div>
					</div>

					{/* Section: Audience */}
					<SectionDivider label={lang === 'ru' ? 'Кто увидит' : 'Audience'} icon="◉" />
					<div className="grid grid-cols-3 gap-3 mb-4">
						{VISIBILITY_OPTIONS.map((opt) => {
							const on = form.visibility === opt.id
							return (
								<button
									key={opt.id}
									type="button"
									onClick={() => setForm({ ...form, visibility: opt.id })}
									className={cn('px-3 py-[14px] rounded-[10px] text-center border-[1.5px] cursor-pointer transition-all font-[inherit]', on ? opt.activeClass : opt.inactiveClass)}
								>
									<div className="text-[22px] mb-1.5">{opt.icon}</div>
									<div className={cn('text-[13px]', on ? 'font-bold' : 'font-medium')}>{lang === 'ru' ? opt.ru : opt.en}</div>
									<div className="text-[10px] mt-1 opacity-70">{opt.sub[lang]}</div>
								</button>
							)
						})}
					</div>
					{form.visibility === 'neighbors' && (
						<div className="p-4 rounded-xl bg-vis-nbr border border-[rgba(47,138,107,0.2)] mb-6">
							<div className="flex justify-between items-baseline mb-3">
								<div className="font-serif text-[16px] italic font-medium text-mint">{lang === 'ru' ? 'Радиус видимости' : 'Visibility radius'}</div>
								<div className="font-mono text-[15px] font-bold text-mint">500 м</div>
							</div>
							<div className="relative h-6 mb-2">
								<div className="absolute top-[10px] inset-x-0 h-[3px] rounded-sm bg-[rgba(47,138,107,0.25)]" />
								<div className="absolute top-[10px] left-0 w-[22%] h-[3px] rounded-sm bg-mint" />
								<div className="absolute top-1 w-4 h-4 rounded-full bg-white border-[3px] border-mint shadow-[0_2px_6px_rgba(0,0,0,0.15)]" style={{ left: '22%', transform: 'translateX(-50%)' }} />
							</div>
							<div className="flex justify-between text-[10px] text-mint opacity-70 mb-3">
								<span>200 м</span><span>500 м</span><span>1 км</span><span>2 км</span>
							</div>
							<div className="px-3 py-2 bg-white rounded-lg text-[12px] text-mint font-medium leading-[1.4] border border-[rgba(47,138,107,0.2)]">
								◉ {lang === 'ru' ? <><strong>~ 240 соседей</strong> в Пресненском. Подпись <strong>анонимна</strong>.</> : <><strong>~240 neighbors</strong> in Presnya. You stay <strong>anonymous</strong>.</>}
							</div>
						</div>
					)}
					{(form.visibility === 'public' || form.visibility === 'private') && <div className="mb-6" />}

					{/* Section: When & where */}
					<SectionDivider label={lang === 'ru' ? 'Когда и где' : 'When & where'} icon="◇" />
					<div className="mb-4">
						<Label>{lang === 'ru' ? 'Дата' : 'Date'}</Label>
						<div className="flex gap-2">
							{WEEK_DAYS.map((dy) => {
								const on = form.selectedDay === dy.d
								return (
									<button
										key={dy.d}
										type="button"
										onClick={() => setForm({ ...form, selectedDay: dy.d })}
										className={cn('flex-1 rounded-[10px] py-[10px] text-center border cursor-pointer transition-colors', on ? 'bg-ink text-paper border-ink' : 'bg-white text-ink border-rule')}
									>
										<div className={cn('text-[9px] uppercase tracking-[0.08em] mb-0.5', on ? 'opacity-60' : 'opacity-70')}>{lang === 'ru' ? dy.ru : dy.en}</div>
										<div className="font-serif text-[17px] font-semibold leading-none">{dy.d}</div>
									</button>
								)
							})}
						</div>
					</div>
					<div className="grid grid-cols-3 gap-3 mb-4">
						<div>
							<Label>{lang === 'ru' ? 'Начало' : 'Start'}</Label>
							<Field value={form.startTime} placeholder="10:00" />
						</div>
						<div>
							<Label>{lang === 'ru' ? 'Конец' : 'End'}</Label>
							<Field value={form.endTime} placeholder="12:00" />
						</div>
					</div>
					<div className="mb-6">
						<Label>{lang === 'ru' ? 'Место' : 'Venue'}</Label>
						<Field value={form.venue || undefined} placeholder={lang === 'ru' ? 'Адрес или название места' : 'Address or venue name'} />
					</div>

					{/* Section: Settings */}
					<SectionDivider label={lang === 'ru' ? 'Правила' : 'Settings'} icon="⚙" />
					<div className="grid grid-cols-2 gap-3 mb-4">
						<div>
							<Label>{lang === 'ru' ? 'Вместимость' : 'Capacity'}</Label>
							<Field value={form.capacity} placeholder="—" />
						</div>
						<div className="flex items-end pb-px">
							<div className="px-[14px] py-3 rounded-[10px] bg-vis-nbr border border-[rgba(47,138,107,0.2)] text-[12px] text-mint leading-[1.4] w-full">
								{lang === 'ru' ? '14 уже записались' : '14 already signed up'}
							</div>
						</div>
					</div>
					<div className="mb-8">
						{OPTIONS.map((opt) => (
							<button
								key={opt.id}
								type="button"
								onClick={() => setForm({ ...form, opts: { ...form.opts, [opt.id]: !form.opts[opt.id] } })}
								className="w-full px-[14px] py-3 rounded-[10px] bg-white border border-rule mb-2 flex gap-3 items-start text-left cursor-pointer hover:border-violet/30 transition-colors"
							>
								<div className={cn('w-5 h-5 rounded-[6px] border-[1.5px] flex items-center justify-center shrink-0 mt-px transition-colors', form.opts[opt.id] ? 'bg-violet border-violet' : 'bg-transparent border-[rgba(21,20,26,0.2)]')}>
									{form.opts[opt.id] && <span className="text-white text-[11px]">✓</span>}
								</div>
								<div>
									<div className="text-[13px] font-semibold mb-0.5 text-ink">{lang === 'ru' ? opt.ru : opt.en}</div>
									<div className="text-[11px] text-dim">{lang === 'ru' ? opt.sub.ru : opt.sub.en}</div>
								</div>
							</button>
						))}
						</div>
					</div>
				</div>

			{/* Right sidebar — live preview */}
			<div className="w-[280px] shrink-0 border-l border-rule bg-paper2 flex flex-col px-4 py-[22px] overflow-y-auto">
				<div className="text-[10px] tracking-[0.14em] uppercase text-dim font-bold mb-3">
					{lang === 'ru' ? 'Предпросмотр' : 'Preview'}
				</div>
				<PreviewCard form={form} lang={lang} />

				<div className="mt-5 mb-2 text-[10px] tracking-[0.14em] uppercase text-dim font-bold">
					{lang === 'ru' ? 'Готовность' : 'Checklist'}
				</div>
				<Checklist form={form} lang={lang} />

				<div className="mt-auto pt-5">
					<button
						type="button"
						className="w-full px-5 py-[13px] rounded-xl bg-mint text-white font-bold text-[13px] border-none cursor-pointer flex items-center justify-between shadow-[0_6px_16px_rgba(47,138,107,0.3)]"
					>
						<span>{lang === 'ru' ? 'Опубликовать' : 'Publish event'}</span>
						<span>◉</span>
					</button>
					<button type="button" className="w-full mt-2 py-[10px] text-center text-xs text-dim font-medium bg-transparent border-none cursor-pointer">
						{lang === 'ru' ? 'Сохранить черновик' : 'Save draft'}
					</button>
				</div>
			</div>
		</div>
	)
}

function SectionDivider({ label, icon }: { label: string; icon: string }) {
	return (
		<div className="flex items-center gap-3 mb-4 mt-2">
			<span className="text-dim text-sm">{icon}</span>
			<div className="font-serif italic text-[18px] font-medium">{label}</div>
			<div className="flex-1 h-px bg-rule" />
		</div>
	)
}

// ─── Root ─────────────────────────────────────────────────────

function CreatePage() {
	const { lang } = useLang()
	const isDesktop = useMediaQuery('(min-width: 900px)')

	const [form, setForm] = useState<FormState>({
		title: lang === 'ru' ? 'Кофе во дворе · Пресня' : 'Courtyard Coffee · Presnya',
		activeCat: 'Еда',
		description: lang === 'ru'
			? 'Собираемся утром во дворе. Приношу термос на 12 чашек и кекс — приходите как есть, познакомимся.'
			: "Meeting in the courtyard. I bring a 12-cup thermos and cake — come as you are, let's meet.",
		visibility: 'neighbors',
		selectedDay: 11,
		startTime: '10:00',
		endTime: '12:00',
		venue: lang === 'ru' ? 'Двор, Большая Грузинская, 20' : 'Courtyard, Bolshaya Gruzinskaya 20',
		capacity: '30',
		opts: { confirm: true, plus1: false, public_list: false },
	})

	if (isDesktop) {
		return (
			<AppShell hideTabBar>
				<DesktopCreateInner lang={lang} form={form} setForm={setForm} />
			</AppShell>
		)
	}

	return (
		<AppShell>
			<MobileCreate lang={lang} form={form} setForm={setForm} />
		</AppShell>
	)
}
