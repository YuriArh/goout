import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { AppShell } from '#/components/AppShell'
import { MapBackground } from '#/components/MapBackground'
import { VisibilityBadge } from '#/components/VisibilityBadge'
import { Avatar } from '#/components/Avatar'
import { useLang } from '#/lib/lang'
import { EVENTS, MAP_POSITIONS, byId, formatDate } from '#/data/events'

export const Route = createFileRoute('/map')({ component: MapPage })

const VIS_COLORS: Record<string, string> = {
	public: '#4d3aef',
	neighbors: '#2f8a6b',
	private: '#ff6d5a',
}

function MapPage() {
	const { lang } = useLang()
	const [selected, setSelected] = useState<string | null>(null)

	const selectedEvent = selected ? byId(selected) : null

	return (
		<AppShell>
			<div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
				{/* Map layer */}
				<div style={{ position: 'absolute', inset: 0 }}>
					<MapBackground theme="paper" />
				</div>

				{/* Pins */}
				{EVENTS.map((e) => {
					const pos = MAP_POSITIONS[e.id]
					if (!pos) return null
					const isSelected = selected === e.id
					const color = VIS_COLORS[e.visibility] ?? '#15141a'

					return (
						<button
							key={e.id}
							type="button"
							onClick={() => setSelected(isSelected ? null : e.id)}
							style={{
								position: 'absolute',
								left: `${pos.x}%`,
								top: `${pos.y}%`,
								transform: 'translate(-50%, -50%)',
								background: 'none',
								border: 'none',
								cursor: 'pointer',
								padding: 0,
								zIndex: isSelected ? 20 : 10,
							}}
						>
							{isSelected ? (
								<div
									style={{
										background: color,
										color: '#fff',
										padding: '5px 10px',
										borderRadius: 999,
										fontSize: 11,
										fontWeight: 600,
										whiteSpace: 'nowrap',
										boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
										maxWidth: 140,
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{e.title[lang]}
								</div>
							) : (
								<div
									style={{
										width: e.visibility === 'neighbors' ? 14 : 12,
										height: e.visibility === 'neighbors' ? 14 : 12,
										borderRadius: '50%',
										background: color,
										border: '2.5px solid #fff',
										boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
									}}
								/>
							)}
						</button>
					)
				})}

				{/* Selected event card */}
				{selectedEvent && (
					<div
						style={{
							position: 'absolute',
							bottom: 16,
							left: 14,
							right: 14,
							background: '#faf8f4',
							borderRadius: 14,
							padding: '14px 16px',
							boxShadow: '0 12px 32px rgba(21,20,26,0.2)',
							border: '1px solid rgba(21,20,26,0.08)',
							zIndex: 30,
						}}
					>
						<div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
							<div
								style={{
									width: 56,
									height: 56,
									borderRadius: 10,
									background: selectedEvent.img,
									flexShrink: 0,
								}}
							/>
							<div style={{ flex: 1, minWidth: 0 }}>
								<div style={{ display: 'flex', gap: 6, marginBottom: 5, flexWrap: 'wrap' }}>
									<VisibilityBadge v={selectedEvent.visibility} lang={lang} />
								</div>
								<div
									style={{
										fontFamily: 'Fraunces, serif',
										fontSize: 17,
										fontWeight: 500,
										lineHeight: 1.15,
										letterSpacing: '-0.01em',
										marginBottom: 5,
										color: '#15141a',
									}}
								>
									{selectedEvent.title[lang]}
								</div>
								<div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11 }}>
									<Avatar author={selectedEvent.author} size={16} />
									<span style={{ color: '#6a6976' }}>
										{selectedEvent.venue[lang]} · {formatDate(selectedEvent.date, lang)}
									</span>
								</div>
							</div>
						</div>
						<Link
							to="/events/$id"
							params={{ id: selectedEvent.id }}
							style={{
								display: 'block',
								marginTop: 12,
								padding: '11px 16px',
								borderRadius: 10,
								background: '#15141a',
								color: '#fff',
								textAlign: 'center',
								fontSize: 13,
								fontWeight: 600,
								textDecoration: 'none',
								letterSpacing: '0.02em',
							}}
						>
							{lang === 'ru' ? 'Подробнее →' : 'View event →'}
						</Link>
					</div>
				)}

				{/* Legend */}
				<div
					style={{
						position: 'absolute',
						top: 14,
						right: 14,
						background: 'rgba(250,248,244,0.92)',
						borderRadius: 10,
						padding: '8px 12px',
						fontSize: 10,
						display: 'flex',
						flexDirection: 'column',
						gap: 5,
						backdropFilter: 'blur(4px)',
						border: '1px solid rgba(21,20,26,0.08)',
						zIndex: 10,
					}}
				>
					{[
						{ color: '#4d3aef', label: lang === 'ru' ? 'Открытое' : 'Public' },
						{ color: '#2f8a6b', label: lang === 'ru' ? 'Соседи' : 'Neighbors' },
						{ color: '#ff6d5a', label: lang === 'ru' ? 'Закрытое' : 'Private' },
					].map((item) => (
						<div
							key={item.label}
							style={{ display: 'flex', alignItems: 'center', gap: 6 }}
						>
							<div
								style={{
									width: 8,
									height: 8,
									borderRadius: '50%',
									background: item.color,
								}}
							/>
							<span style={{ color: '#15141a', fontWeight: 500 }}>{item.label}</span>
						</div>
					))}
				</div>

				{/* Count badge */}
				<div
					style={{
						position: 'absolute',
						top: 14,
						left: 14,
						background: '#15141a',
						color: '#faf8f4',
						padding: '6px 12px',
						borderRadius: 999,
						fontSize: 11,
						fontWeight: 600,
						zIndex: 10,
					}}
				>
					{EVENTS.length} {lang === 'ru' ? 'событий' : 'events'}
				</div>
			</div>
		</AppShell>
	)
}
