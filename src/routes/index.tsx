import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AppShell } from '#/components/AppShell'
import { MagChip } from '#/components/MagChip'
import {
	HeroCard,
	DesktopHeroCard,
	SecondaryCard,
	GridCard,
	ListTableRow,
	WideCard,
	ListCard,
	PrivateCard,
	NeighborCard,
} from '#/components/EventCard'
import { useLang } from '#/lib/lang'
import { useMediaQuery } from '#/hooks/useMediaQuery'
import { CATEGORIES, EVENTS, byId } from '#/data/events'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
	const { lang } = useLang()
	const [activeCat, setActiveCat] = useState('all')
	const isDesktop = useMediaQuery('(min-width: 900px)')

	const feat = byId('e1')!
	const featMobile = byId('e8')!
	const secondary = byId('e8')!
	const neighbor = EVENTS.find((e) => e.id === 'e_neighbor1')!
	const priv = EVENTS.find((e) => e.id === 'e_neighbor2')!
	const wide = byId('e3')!
	const gridEvents = [byId('e2')!, byId('e3')!, byId('e4')!, byId('e6')!, byId('e10')!, byId('e12')!]
	const listItems = [byId('e5')!, byId('e7')!, byId('e9')!, byId('e11')!]
	const listMobile = [byId('e5')!, byId('e7')!, byId('e10')!]

	const filtered =
		activeCat === 'all'
			? EVENTS.filter((e) => !['e_neighbor1', 'e_neighbor2'].includes(e.id))
			: EVENTS.filter((e) => e.cat === activeCat && !['e_neighbor1', 'e_neighbor2'].includes(e.id))

	return (
		<AppShell>
			{isDesktop ? (
				<DesktopHome
					lang={lang}
					activeCat={activeCat}
					onCatChange={setActiveCat}
					feat={feat}
					secondary={secondary}
					neighbor={neighbor}
					priv={priv}
					gridEvents={gridEvents}
					listItems={listItems}
					filtered={filtered}
				/>
			) : (
				<MobileHome
					lang={lang}
					activeCat={activeCat}
					onCatChange={setActiveCat}
					featMobile={featMobile}
					neighbor={neighbor}
					priv={priv}
					wide={wide}
					listMobile={listMobile}
					filtered={filtered}
				/>
			)}
		</AppShell>
	)
}

// ─── Section divider ──────────────────────────────────────────

function SectionHead({ label, count, lang }: { label: string; count?: string; lang: 'ru' | 'en' }) {
	return (
		<div className="flex items-baseline gap-3 my-2 mb-[14px]">
			<div className="font-serif italic text-[22px] font-medium">{label}</div>
			<div className="flex-1 h-px bg-rule" />
			{count && (
				<div className="text-xs text-dim">{count}</div>
			)}
		</div>
	)
}

// ─── Desktop layout ──────────────────────────────────────────

type DesktopHomeProps = {
	lang: 'ru' | 'en'
	activeCat: string
	onCatChange: (id: string) => void
	feat: ReturnType<typeof byId>
	secondary: ReturnType<typeof byId>
	neighbor: NonNullable<ReturnType<typeof byId>>
	priv: NonNullable<ReturnType<typeof byId>>
	gridEvents: NonNullable<ReturnType<typeof byId>>[]
	listItems: NonNullable<ReturnType<typeof byId>>[]
	filtered: typeof EVENTS
}

function DesktopHome({
	lang,
	activeCat,
	onCatChange,
	feat,
	secondary,
	neighbor,
	priv,
	gridEvents,
	listItems,
	filtered,
}: DesktopHomeProps) {
	return (
		<div className="flex flex-col h-full overflow-hidden">
			{/* Top bar */}
			<div className="px-8 pt-[18px] pb-[14px] border-b border-rule flex items-center justify-between bg-paper shrink-0">
				<div>
					<div className="font-serif text-[28px] font-medium tracking-[-0.02em] leading-[1.05]">
						{lang === 'ru' ? 'Эта неделя в Москве' : 'This week in Moscow'}
					</div>
					<div className="text-xs text-dim mt-1">
						{lang === 'ru'
							? '№19 · 124 события · 47 от соседей · обновлено 2 мин. назад'
							: '№19 · 124 events · 47 from neighbors · updated 2 min ago'}
					</div>
				</div>
				<div className="min-w-[260px] bg-white rounded-[10px] px-[14px] py-[9px] text-[13px] text-dim border border-rule flex items-center gap-2">
					<span>⌕</span>
					{lang === 'ru' ? 'Поиск события, района, тега' : 'Search event, area, tag'}
				</div>
			</div>

			{/* Scrollable content */}
			<div className="flex-1 overflow-y-auto px-8 pt-5 pb-10 scrollbar-hide">
				{/* Category chips */}
				<div className="flex gap-[6px] mb-[22px] flex-wrap items-center">
					{CATEGORIES.map((c) => (
						<MagChip
							key={c.id}
							label={c[lang]}
							icon={c.icon}
							active={activeCat === c.id}
							onClick={() => onCatChange(c.id)}
						/>
					))}
					<div className="px-[14px] py-[6px] rounded-full text-xs font-medium text-dim flex items-center gap-1 ml-1">
						<span>⚙</span>
						{lang === 'ru' ? 'Фильтры · 3' : 'Filters · 3'}
					</div>
				</div>

				{activeCat !== 'all' ? (
					<>
						{filtered.length === 0 ? (
							<div className="text-center py-20 text-dim font-serif italic text-[20px]">
								{lang === 'ru' ? 'Пока пусто' : 'Nothing here yet'}
							</div>
						) : (
							<div className="grid grid-cols-3 gap-4">
								{filtered.map((e) => (
									<GridCard key={e.id} event={e} lang={lang} />
								))}
							</div>
						)}
					</>
				) : (
					<>
						{/* Hero split */}
						<div className="grid grid-cols-[1.6fr_1fr] gap-[18px] mb-6 h-[340px]">
							<DesktopHeroCard event={feat!} lang={lang} />
							<div className="flex flex-col gap-3 h-full">
								<NeighborCard event={neighbor} lang={lang} desktop />
								<SecondaryCard event={secondary!} lang={lang} />
							</div>
						</div>

						{/* Editor's picks */}
						<SectionHead
							label={lang === 'ru' ? 'Рекомендации редакции' : "Editor's picks"}
							count={lang === 'ru' ? 'показано 6 из 46 ›' : 'showing 6 of 46 ›'}
							lang={lang}
						/>

						<div className="grid grid-cols-3 gap-4 mb-7">
							{gridEvents.map((e) => (
								<GridCard key={e.id} event={e} lang={lang} />
							))}
						</div>

						{/* Private + list split */}
						<div className="grid grid-cols-[1fr_1.6fr] gap-[18px]">
							<PrivateCard event={priv} lang={lang} desktop />
							<div>
								<div className="font-serif italic text-[18px] font-medium mb-1">
									{lang === 'ru' ? 'Быстро' : 'At a glance'}
								</div>
								{listItems.map((e) => (
									<ListTableRow key={e.id} event={e} lang={lang} />
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

// ─── Mobile layout ───────────────────────────────────────────

type MobileHomeProps = {
	lang: 'ru' | 'en'
	activeCat: string
	onCatChange: (id: string) => void
	featMobile: NonNullable<ReturnType<typeof byId>>
	neighbor: NonNullable<ReturnType<typeof byId>>
	priv: NonNullable<ReturnType<typeof byId>>
	wide: NonNullable<ReturnType<typeof byId>>
	listMobile: NonNullable<ReturnType<typeof byId>>[]
	filtered: typeof EVENTS
}

function MobileHome({
	lang,
	activeCat,
	onCatChange,
	featMobile,
	neighbor,
	priv,
	wide,
	listMobile,
	filtered,
}: MobileHomeProps) {
	return (
		<div className="flex-1 overflow-y-auto px-[14px] pt-[14px] pb-[18px] scrollbar-hide">
			{/* Category chips */}
			<div className="flex gap-[6px] overflow-x-auto pb-[6px] mb-3 scrollbar-hide">
				{CATEGORIES.map((c) => (
					<MagChip
						key={c.id}
						label={c[lang]}
						icon={c.icon}
						active={activeCat === c.id}
						onClick={() => onCatChange(c.id)}
					/>
				))}
			</div>

			{/* Section header */}
			<div className="mb-3">
				<div className="font-serif italic text-[30px] font-medium tracking-[-0.02em] leading-none">
					{lang === 'ru' ? 'Эта неделя' : 'This week'}
				</div>
				<div className="text-[11px] text-dim mt-[3px]">
					{lang === 'ru'
						? '№19 · 124 события · 47 от соседей'
						: '№19 · 124 events · 47 from neighbors'}
				</div>
			</div>

			{activeCat !== 'all' ? (
				<>
					{filtered.length === 0 ? (
						<div className="text-center py-[60px] text-dim font-serif italic text-[18px]">
							{lang === 'ru' ? 'Пока пусто' : 'Nothing here yet'}
						</div>
					) : (
						filtered.map((e) => <WideCard key={e.id} event={e} lang={lang} />)
					)}
				</>
			) : (
				<>
					<NeighborCard event={neighbor} lang={lang} />
					<HeroCard event={featMobile} lang={lang} />
					<PrivateCard event={priv} lang={lang} />
					<WideCard event={wide} lang={lang} />

					{/* List section */}
					<div className="flex items-center gap-[10px] mt-[14px] mb-1">
						<div className="font-serif italic text-[18px] font-medium">
							{lang === 'ru' ? 'Ещё идеи' : 'More to do'}
						</div>
						<div className="flex-1 h-px bg-rule" />
					</div>
					{listMobile.map((e) => (
						<ListCard key={e.id} event={e} lang={lang} />
					))}

					{/* All events section */}
					<div className="flex items-center gap-[10px] mt-[18px] mb-[10px]">
						<div className="font-serif italic text-[18px] font-medium">
							{lang === 'ru' ? 'Все события' : 'All events'}
						</div>
						<div className="flex-1 h-px bg-rule" />
						<div className="text-[11px] text-dim">все →</div>
					</div>
					{EVENTS.filter((e) => !['e_neighbor1', 'e_neighbor2'].includes(e.id))
						.slice(0, 6)
						.map((e) => (
							<WideCard key={e.id} event={e} lang={lang} />
						))}
				</>
			)}

			<div className="h-6" />
		</div>
	)
}
