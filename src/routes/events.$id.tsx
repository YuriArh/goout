import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppShell } from '#/components/AppShell'
import { Avatar } from '#/components/Avatar'
import { VisibilityBadge } from '#/components/VisibilityBadge'
import { useLang } from '#/lib/lang'
import { byId, formatDate, formatPrice, catLabel } from '#/data/events'

export const Route = createFileRoute('/events/$id')({ component: EventDetail })

function EventDetail() {
	const { id } = Route.useParams()
	const { lang } = useLang()
	const navigate = useNavigate()
	const event = byId(id)

	if (!event) {
		return (
			<AppShell>
				<div style={{ padding: 32, textAlign: 'center', color: '#6a6976' }}>
					{lang === 'ru' ? 'Событие не найдено' : 'Event not found'}
				</div>
			</AppShell>
		)
	}

	const isPrivate = event.visibility === 'private'
	const isNeighbor = event.visibility === 'neighbors'

	return (
		<AppShell>
			<div style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
				{/* Cover */}
				<div
					style={{
						height: 260,
						background: event.img,
						position: 'relative',
						flexShrink: 0,
					}}
				>
					<div
						style={{
							position: 'absolute',
							inset: 0,
							background: isPrivate
								? 'repeating-linear-gradient(45deg,rgba(255,109,90,0.12) 0px,rgba(255,109,90,0.12) 6px,transparent 6px,transparent 22px)'
								: 'linear-gradient(180deg,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.5) 100%)',
						}}
					/>

					{/* Back button */}
					<button
						type="button"
						onClick={() => navigate({ to: '/' })}
						style={{
							position: 'absolute',
							top: 14,
							left: 14,
							background: 'rgba(250,248,244,0.9)',
							border: 'none',
							borderRadius: 999,
							width: 36,
							height: 36,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 16,
							cursor: 'pointer',
							backdropFilter: 'blur(4px)',
						}}
					>
						‹
					</button>

					{/* Badges */}
					<div
						style={{
							position: 'absolute',
							top: 14,
							right: 14,
							display: 'flex',
							gap: 6,
						}}
					>
						<VisibilityBadge v={event.visibility} lang={lang} size="md" />
						{event.tag && (
							<span
								style={{
									fontSize: 10,
									padding: '4px 9px',
									borderRadius: 999,
									background: '#15141a',
									color: '#faf8f4',
									fontWeight: 700,
									letterSpacing: '0.08em',
									textTransform: 'uppercase',
								}}
							>
								{event.tag[lang]}
							</span>
						)}
					</div>

					{/* Private invitation badge */}
					{isPrivate && (
						<div
							style={{
								position: 'absolute',
								bottom: 18,
								left: 14,
								right: 14,
								background: 'rgba(250,248,244,0.95)',
								borderRadius: 10,
								padding: '10px 14px',
								display: 'flex',
								alignItems: 'center',
								gap: 10,
								border: '1px solid rgba(255,109,90,0.3)',
							}}
						>
							<Avatar author={event.author} size={28} />
							<div>
								<div style={{ fontSize: 11, fontWeight: 700, color: '#ff6d5a' }}>
									{lang === 'ru' ? 'ЛИЧНОЕ ПРИГЛАШЕНИЕ' : 'PERSONAL INVITE'}
								</div>
								<div style={{ fontSize: 11, color: '#6a6976' }}>
									{lang === 'ru' ? `${event.author.name} пригласил вас` : `${event.author.name} invited you`}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Content */}
				<div style={{ padding: '20px 18px 100px' }}>
					{/* Category kicker */}
					<div
						style={{
							fontSize: 10,
							letterSpacing: '0.14em',
							textTransform: 'uppercase',
							fontWeight: 700,
							color: isPrivate ? '#ff6d5a' : isNeighbor ? '#2f8a6b' : '#6a6976',
							marginBottom: 8,
						}}
					>
						{catLabel(event.cat, lang)}
					</div>

					{/* Title */}
					<h1
						style={{
							fontFamily: 'Fraunces, serif',
							fontSize: 28,
							fontWeight: 500,
							lineHeight: 1.1,
							letterSpacing: '-0.02em',
							color: '#15141a',
							margin: '0 0 12px',
						}}
					>
						{event.title[lang]}
					</h1>

					{/* Author row */}
					<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
						<Avatar author={event.author} size={28} />
						<div>
							<div style={{ fontSize: 13, fontWeight: 600, color: '#15141a' }}>
								{event.author.name}
								{event.author.verified && (
									<span style={{ color: '#4d3aef', marginLeft: 4 }}>✓</span>
								)}
							</div>
							{event.author.handle && (
								<div style={{ fontSize: 11, color: '#6a6976' }}>{event.author.handle}</div>
							)}
						</div>
					</div>

					{/* Meta info grid */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: 8,
							marginBottom: 18,
						}}
					>
						{[
							{
								icon: '◷',
								label: lang === 'ru' ? 'Дата и время' : 'Date & time',
								value: `${formatDate(event.date, lang)} · ${event.time}`,
							},
							{
								icon: '◎',
								label: lang === 'ru' ? 'Место' : 'Venue',
								value: event.venue[lang],
							},
							{
								icon: '◉',
								label: lang === 'ru' ? 'Район' : 'District',
								value: event.district[lang],
							},
							{
								icon: '◈',
								label: lang === 'ru' ? 'Билет' : 'Ticket',
								value: formatPrice(event.priceFrom, event.currency, lang),
							},
						].map((item) => (
							<div
								key={item.label}
								style={{
									background: '#fff',
									borderRadius: 10,
									padding: '10px 12px',
									border: '1px solid rgba(21,20,26,0.08)',
								}}
							>
								<div style={{ fontSize: 11, color: '#6a6976', marginBottom: 2 }}>
									{item.icon} {item.label}
								</div>
								<div style={{ fontSize: 13, fontWeight: 600, color: '#15141a' }}>
									{item.value}
								</div>
							</div>
						))}
					</div>

					{/* Capacity for neighbor events */}
					{isNeighbor && event.capacity && (
						<div
							style={{
								background: '#e3f0ea',
								borderRadius: 10,
								padding: '12px 14px',
								marginBottom: 16,
								border: '1px solid rgba(47,138,107,0.2)',
							}}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: 8,
								}}
							>
								<div style={{ fontSize: 12, fontWeight: 600, color: '#2f8a6b' }}>
									{event.attendees} / {event.capacity}{' '}
									{lang === 'ru' ? 'участников' : 'participants'}
								</div>
								<div style={{ fontSize: 11, color: '#2f8a6b' }}>
									{event.capacity - event.attendees} {lang === 'ru' ? 'мест' : 'spots left'}
								</div>
							</div>
							<div
								style={{
									height: 4,
									background: 'rgba(47,138,107,0.2)',
									borderRadius: 2,
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										height: '100%',
										width: `${(event.attendees / event.capacity) * 100}%`,
										background: '#2f8a6b',
										borderRadius: 2,
									}}
								/>
							</div>
						</div>
					)}

					{/* Description */}
					<div
						style={{
							fontSize: 14,
							lineHeight: 1.6,
							color: 'rgba(21,20,26,0.75)',
							marginBottom: 20,
						}}
					>
						{event.blurb[lang]}
					</div>

					{/* Private event rules */}
					{isPrivate && (
						<div
							style={{
								background: '#fde8e4',
								borderRadius: 12,
								padding: '14px 16px',
								marginBottom: 20,
								border: '1px solid rgba(255,109,90,0.2)',
							}}
						>
							<div
								style={{
									fontSize: 11,
									fontWeight: 700,
									letterSpacing: '0.1em',
									textTransform: 'uppercase',
									color: '#ff6d5a',
									marginBottom: 10,
								}}
							>
								✦ {lang === 'ru' ? 'Правила закрытого события' : 'Private event rules'}
							</div>
							{[
								lang === 'ru'
									? 'Не публикуется в афише и на карте'
									: 'Not shown in the guide or map',
								lang === 'ru'
									? 'Адрес скрыт до подтверждения участия'
									: 'Address hidden until RSVP confirmed',
								lang === 'ru'
									? 'Одноразовая ссылка — только для вас'
									: 'Single-use link — for you only',
							].map((rule) => (
								<div
									key={rule}
									style={{
										display: 'flex',
										gap: 8,
										fontSize: 12,
										color: '#ff6d5a',
										marginBottom: 6,
									}}
								>
									<span>·</span>
									<span>{rule}</span>
								</div>
							))}
						</div>
					)}

					{/* Attendees */}
					{event.rating > 0 && (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								fontSize: 12,
								color: '#6a6976',
								marginBottom: 20,
							}}
						>
							<span>★ {event.rating}</span>
							<span>·</span>
							<span>
								{event.attendees.toLocaleString()}{' '}
								{lang === 'ru' ? 'идут' : 'going'}
							</span>
							{event.age > 0 && (
								<>
									<span>·</span>
									<span>{event.age}+</span>
								</>
							)}
						</div>
					)}
				</div>
			</div>

			{/* CTA button */}
			<div
				style={{
					position: 'absolute',
					bottom: 80,
					left: 14,
					right: 14,
					zIndex: 20,
				}}
			>
				<button
					type="button"
					style={{
						width: '100%',
						padding: '15px 20px',
						borderRadius: 14,
						background: isPrivate ? '#ff6d5a' : isNeighbor ? '#2f8a6b' : '#4d3aef',
						color: '#fff',
						fontSize: 14,
						fontWeight: 700,
						letterSpacing: '0.02em',
						border: 'none',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						fontFamily: 'inherit',
						boxShadow: '0 8px 22px rgba(0,0,0,0.2)',
					}}
				>
					<span>
						{isPrivate
							? lang === 'ru'
								? 'Принять приглашение'
								: 'Accept invitation'
							: isNeighbor
								? lang === 'ru'
									? 'Иду!'
									: "I'm going!"
								: lang === 'ru'
									? 'Купить билет'
									: 'Get tickets'}
					</span>
					<span>→</span>
				</button>
			</div>
		</AppShell>
	)
}
