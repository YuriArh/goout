import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppShell } from '#/components/AppShell'
import { Avatar } from '#/components/Avatar'
import { VisibilityBadge } from '#/components/VisibilityBadge'
import { useLang } from '#/lib/lang'
import { useMediaQuery } from '#/hooks/useMediaQuery'
import { byId, formatDate, formatPrice, catLabel } from '#/data/events'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/events/$id')({ component: EventDetail })

function EventDetail() {
	const { id } = Route.useParams()
	const { lang } = useLang()
	const navigate = useNavigate()
	const event = byId(id)
	const isDesktop = useMediaQuery('(min-width: 900px)')

	if (!event) {
		return (
			<AppShell>
				<div className="flex-1 flex items-center justify-center text-dim font-serif italic text-lg">
					{lang === 'ru' ? 'Событие не найдено' : 'Event not found'}
				</div>
			</AppShell>
		)
	}

	const isPrivate = event.visibility === 'private'
	const isNeighbor = event.visibility === 'neighbors'

	const accentClass = isPrivate ? 'text-coral' : isNeighbor ? 'text-mint' : 'text-violet'
	const ctaBg = isPrivate
		? 'bg-coral shadow-[0_8px_22px_rgba(255,109,90,0.35)]'
		: isNeighbor
			? 'bg-mint shadow-[0_8px_22px_rgba(47,138,107,0.35)]'
			: 'bg-violet shadow-[0_8px_22px_rgba(77,58,239,0.35)]'

	const ctaLabel = isPrivate
		? lang === 'ru' ? 'Принять приглашение' : 'Accept invitation'
		: isNeighbor
			? lang === 'ru' ? 'Иду!' : "I'm going!"
			: lang === 'ru' ? 'Купить билет' : 'Get tickets'

	const META = [
		{ icon: '◷', label: lang === 'ru' ? 'Дата и время' : 'Date & time', value: `${formatDate(event.date, lang)} · ${event.time}` },
		{ icon: '◎', label: lang === 'ru' ? 'Место' : 'Venue', value: event.venue[lang] },
		{ icon: '◉', label: lang === 'ru' ? 'Район' : 'District', value: event.district[lang] },
		{ icon: '◈', label: lang === 'ru' ? 'Билет' : 'Ticket', value: formatPrice(event.priceFrom, event.currency, lang) },
	]

	const PRIVATE_RULES = lang === 'ru'
		? ['Не публикуется в афише и на карте', 'Адрес скрыт до подтверждения участия', 'Одноразовая ссылка — только для вас']
		: ['Not shown in the guide or map', 'Address hidden until RSVP confirmed', 'Single-use link — for you only']

	return (
		<AppShell>
			{isDesktop ? (
				// ─── Desktop: two-column ───────────────────────────────
				<div className="flex h-full overflow-hidden">
					{/* Left: scrollable content */}
					<div className="flex-1 overflow-y-auto scrollbar-hide">
						{/* Cover */}
						<div className="relative h-[320px] shrink-0" style={{ background: event.img }}>
							<div
								className="absolute inset-0"
								style={{
									background: isPrivate
										? 'repeating-linear-gradient(45deg,rgba(255,109,90,0.12) 0px,rgba(255,109,90,0.12) 6px,transparent 6px,transparent 22px)'
										: 'linear-gradient(180deg,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.55) 100%)',
								}}
							/>
							{/* Back */}
							<button
								type="button"
								onClick={() => navigate({ to: '/' })}
								className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[rgba(250,248,244,0.9)] border-none flex items-center justify-center text-base cursor-pointer backdrop-blur-sm"
							>
								‹
							</button>
							{/* Badges */}
							<div className="absolute top-4 right-4 flex gap-1.5">
								<VisibilityBadge v={event.visibility} lang={lang} size="md" />
								{event.tag && (
									<span className="text-[10px] px-[9px] py-1 rounded-full bg-ink text-paper font-bold tracking-[0.08em] uppercase">
										{event.tag[lang]}
									</span>
								)}
							</div>
							{/* Private invite */}
							{isPrivate && (
								<div className="absolute bottom-[18px] left-4 right-4 bg-[rgba(250,248,244,0.95)] rounded-[10px] px-[14px] py-[10px] flex items-center gap-[10px] border border-[rgba(255,109,90,0.3)]">
									<Avatar author={event.author} size={28} />
									<div>
										<div className="text-[11px] font-bold text-coral">{lang === 'ru' ? 'ЛИЧНОЕ ПРИГЛАШЕНИЕ' : 'PERSONAL INVITE'}</div>
										<div className="text-[11px] text-dim">{lang === 'ru' ? `${event.author.name} пригласил вас` : `${event.author.name} invited you`}</div>
									</div>
								</div>
							)}
							{/* Overlay title on cover */}
							{!isPrivate && (
								<div className="absolute bottom-6 left-8 right-8">
									<div className={cn('text-[10px] tracking-[0.14em] uppercase font-bold mb-1.5 text-white opacity-80')}>
										{catLabel(event.cat, lang)}
									</div>
									<h1 className="font-serif text-[36px] font-medium leading-[1.05] tracking-[-0.02em] text-white m-0">
										{event.title[lang]}
									</h1>
								</div>
							)}
						</div>

						{/* Body */}
						<div className="px-8 py-6 pb-12">
							{isPrivate && (
								<>
									<div className={cn('text-[10px] tracking-[0.14em] uppercase font-bold mb-2', accentClass)}>
										{catLabel(event.cat, lang)}
									</div>
									<h1 className="font-serif text-[32px] font-medium leading-[1.05] tracking-[-0.02em] text-ink m-0 mb-3">
										{event.title[lang]}
									</h1>
								</>
							)}

							{/* Author */}
							<div className="flex items-center gap-2 mb-5">
								<Avatar author={event.author} size={32} />
								<div>
									<div className="text-[14px] font-semibold text-ink">
										{event.author.name}
										{event.author.verified && <span className="text-violet ml-1">✓</span>}
									</div>
									{event.author.handle && <div className="text-[11px] text-dim">{event.author.handle}</div>}
								</div>
								{event.rating > 0 && (
									<div className="ml-auto flex items-center gap-2 text-[12px] text-dim">
										<span>★ {event.rating}</span>
										<span>·</span>
										<span>{event.attendees.toLocaleString()} {lang === 'ru' ? 'идут' : 'going'}</span>
										{event.age > 0 && <><span>·</span><span>{event.age}+</span></>}
									</div>
								)}
							</div>

							{/* Meta grid */}
							<div className="grid grid-cols-4 gap-3 mb-5">
								{META.map((item) => (
									<div key={item.label} className="bg-white rounded-[10px] px-3 py-[10px] border border-rule">
										<div className="text-[10px] text-dim mb-1">{item.icon} {item.label}</div>
										<div className="text-[13px] font-semibold text-ink">{item.value}</div>
									</div>
								))}
							</div>

							{/* Capacity bar */}
							{isNeighbor && event.capacity && (
								<div className="bg-vis-nbr rounded-[10px] px-[14px] py-3 mb-5 border border-[rgba(47,138,107,0.2)]">
									<div className="flex justify-between items-center mb-2">
										<div className="text-[12px] font-semibold text-mint">{event.attendees} / {event.capacity} {lang === 'ru' ? 'участников' : 'participants'}</div>
										<div className="text-[11px] text-mint">{event.capacity - event.attendees} {lang === 'ru' ? 'мест' : 'spots left'}</div>
									</div>
									<div className="h-1 bg-[rgba(47,138,107,0.2)] rounded-full overflow-hidden">
										<div className="h-full bg-mint rounded-full" style={{ width: `${(event.attendees / event.capacity) * 100}%` }} />
									</div>
								</div>
							)}

							{/* Description */}
							<p className="text-[15px] leading-[1.65] text-soft-ink mb-5 m-0">{event.blurb[lang]}</p>

							{/* Private rules */}
							{isPrivate && (
								<div className="bg-vis-prv rounded-xl px-4 py-[14px] mb-5 border border-[rgba(255,109,90,0.2)]">
									<div className="text-[11px] font-bold tracking-[0.1em] uppercase text-coral mb-3">
										✦ {lang === 'ru' ? 'Правила закрытого события' : 'Private event rules'}
									</div>
									{PRIVATE_RULES.map((rule) => (
										<div key={rule} className="flex gap-2 text-[12px] text-coral mb-[6px]">
											<span>·</span><span>{rule}</span>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Right: booking panel */}
					<div className="w-[300px] shrink-0 border-l border-rule bg-paper2 flex flex-col px-5 py-6 overflow-y-auto">
						<div className="text-[10px] tracking-[0.14em] uppercase text-dim font-bold mb-3">
							{lang === 'ru' ? 'Участие' : 'Attend'}
						</div>

						{/* Price highlight */}
						<div className="bg-white rounded-xl border border-rule px-4 py-[14px] mb-4">
							<div className="text-[10px] text-dim mb-1">{lang === 'ru' ? 'Стоимость' : 'Price'}</div>
							<div className="font-serif text-[26px] font-medium tracking-[-0.02em] text-ink leading-none mb-[6px]">
								{formatPrice(event.priceFrom, event.currency, lang)}
							</div>
							{event.format !== 'offline' && (
								<div className="text-[11px] text-dim">{event.format === 'online' ? (lang === 'ru' ? 'Онлайн' : 'Online') : (lang === 'ru' ? 'Гибрид' : 'Hybrid')}</div>
							)}
						</div>

						{/* Quick meta list */}
						<div className="flex flex-col gap-[10px] mb-5">
							{META.map((item) => (
								<div key={item.label} className="flex items-start gap-[10px] text-[13px]">
									<span className="text-dim w-4 shrink-0 mt-px">{item.icon}</span>
									<div>
										<div className="text-[10px] text-dim leading-none mb-0.5">{item.label}</div>
										<div className="font-medium text-ink">{item.value}</div>
									</div>
								</div>
							))}
						</div>

						{/* Capacity */}
						{isNeighbor && event.capacity && (
							<div className="bg-vis-nbr rounded-[10px] px-3 py-[10px] mb-4 border border-[rgba(47,138,107,0.2)]">
								<div className="flex justify-between mb-2 text-[11px] text-mint font-semibold">
									<span>{event.attendees} / {event.capacity}</span>
									<span>{event.capacity - event.attendees} {lang === 'ru' ? 'мест' : 'left'}</span>
								</div>
								<div className="h-1 bg-[rgba(47,138,107,0.2)] rounded-full overflow-hidden">
									<div className="h-full bg-mint rounded-full" style={{ width: `${(event.attendees / event.capacity) * 100}%` }} />
								</div>
							</div>
						)}

						<div className="mt-auto flex flex-col gap-2">
							<button type="button" className={cn('w-full px-5 py-[14px] rounded-xl text-white font-bold text-[14px] border-none cursor-pointer flex items-center justify-between', ctaBg)}>
								<span>{ctaLabel}</span>
								<span>→</span>
							</button>
							<button type="button" className="w-full py-[10px] text-center text-xs text-dim font-medium bg-transparent border-none cursor-pointer">
								{lang === 'ru' ? 'Сохранить в мои' : 'Save to my list'} ♡
							</button>
						</div>
					</div>
				</div>
			) : (
				// ─── Mobile: single column ─────────────────────────────
				<div className="flex-1 flex flex-col overflow-hidden">
					<div className="flex-1 overflow-y-auto scrollbar-hide">
						{/* Cover */}
						<div className="relative h-[260px] shrink-0" style={{ background: event.img }}>
							<div
								className="absolute inset-0"
								style={{
									background: isPrivate
										? 'repeating-linear-gradient(45deg,rgba(255,109,90,0.12) 0px,rgba(255,109,90,0.12) 6px,transparent 6px,transparent 22px)'
										: 'linear-gradient(180deg,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.5) 100%)',
								}}
							/>
							<button
								type="button"
								onClick={() => navigate({ to: '/' })}
								className="absolute top-[14px] left-[14px] w-9 h-9 rounded-full bg-[rgba(250,248,244,0.9)] border-none flex items-center justify-center text-base cursor-pointer backdrop-blur-sm"
							>
								‹
							</button>
							<div className="absolute top-[14px] right-[14px] flex gap-1.5">
								<VisibilityBadge v={event.visibility} lang={lang} size="md" />
								{event.tag && (
									<span className="text-[10px] px-[9px] py-1 rounded-full bg-ink text-paper font-bold tracking-[0.08em] uppercase">
										{event.tag[lang]}
									</span>
								)}
							</div>
							{isPrivate && (
								<div className="absolute bottom-[18px] left-[14px] right-[14px] bg-[rgba(250,248,244,0.95)] rounded-[10px] px-[14px] py-[10px] flex items-center gap-[10px] border border-[rgba(255,109,90,0.3)]">
									<Avatar author={event.author} size={28} />
									<div>
										<div className="text-[11px] font-bold text-coral">{lang === 'ru' ? 'ЛИЧНОЕ ПРИГЛАШЕНИЕ' : 'PERSONAL INVITE'}</div>
										<div className="text-[11px] text-dim">{lang === 'ru' ? `${event.author.name} пригласил вас` : `${event.author.name} invited you`}</div>
									</div>
								</div>
							)}
						</div>

						{/* Content */}
						<div className="px-[18px] pt-5 pb-6">
							<div className={cn('text-[10px] tracking-[0.14em] uppercase font-bold mb-2', accentClass)}>
								{catLabel(event.cat, lang)}
							</div>
							<h1 className="font-serif text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-ink m-0 mb-3">
								{event.title[lang]}
							</h1>

							{/* Author */}
							<div className="flex items-center gap-2 mb-4">
								<Avatar author={event.author} size={28} />
								<div>
									<div className="text-[13px] font-semibold text-ink">
										{event.author.name}
										{event.author.verified && <span className="text-violet ml-1">✓</span>}
									</div>
									{event.author.handle && <div className="text-[11px] text-dim">{event.author.handle}</div>}
								</div>
							</div>

							{/* Meta grid 2-col */}
							<div className="grid grid-cols-2 gap-2 mb-4">
								{META.map((item) => (
									<div key={item.label} className="bg-white rounded-[10px] px-3 py-[10px] border border-rule">
										<div className="text-[10px] text-dim mb-1">{item.icon} {item.label}</div>
										<div className="text-[13px] font-semibold text-ink">{item.value}</div>
									</div>
								))}
							</div>

							{/* Capacity */}
							{isNeighbor && event.capacity && (
								<div className="bg-vis-nbr rounded-[10px] px-[14px] py-3 mb-4 border border-[rgba(47,138,107,0.2)]">
									<div className="flex justify-between items-center mb-2">
										<div className="text-[12px] font-semibold text-mint">{event.attendees} / {event.capacity} {lang === 'ru' ? 'участников' : 'participants'}</div>
										<div className="text-[11px] text-mint">{event.capacity - event.attendees} {lang === 'ru' ? 'мест' : 'spots left'}</div>
									</div>
									<div className="h-1 bg-[rgba(47,138,107,0.2)] rounded-full overflow-hidden">
										<div className="h-full bg-mint rounded-full" style={{ width: `${(event.attendees / event.capacity) * 100}%` }} />
									</div>
								</div>
							)}

							{/* Description */}
							<p className="text-[14px] leading-[1.65] text-soft-ink mb-4 m-0">{event.blurb[lang]}</p>

							{/* Private rules */}
							{isPrivate && (
								<div className="bg-vis-prv rounded-xl px-4 py-[14px] mb-4 border border-[rgba(255,109,90,0.2)]">
									<div className="text-[11px] font-bold tracking-[0.1em] uppercase text-coral mb-[10px]">
										✦ {lang === 'ru' ? 'Правила закрытого события' : 'Private event rules'}
									</div>
									{PRIVATE_RULES.map((rule) => (
										<div key={rule} className="flex gap-2 text-xs text-coral mb-[6px]">
											<span>·</span><span>{rule}</span>
										</div>
									))}
								</div>
							)}

							{/* Rating row */}
							{event.rating > 0 && (
								<div className="flex items-center gap-3 text-xs text-dim mb-2">
									<span>★ {event.rating}</span>
									<span>·</span>
									<span>{event.attendees.toLocaleString()} {lang === 'ru' ? 'идут' : 'going'}</span>
									{event.age > 0 && <><span>·</span><span>{event.age}+</span></>}
								</div>
							)}
						</div>
					</div>

					{/* Sticky CTA above tab bar */}
					<div className="px-[14px] pt-3 pb-4 bg-paper border-t border-rule shrink-0">
						<button
							type="button"
							className={cn('w-full px-5 py-[15px] rounded-[14px] text-white text-[14px] font-bold tracking-[0.02em] border-none cursor-pointer flex items-center justify-between', ctaBg)}
						>
							<span>{ctaLabel}</span>
							<span>→</span>
						</button>
					</div>
				</div>
			)}
		</AppShell>
	)
}
