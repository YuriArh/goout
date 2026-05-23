import { createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/AppShell'
import { Avatar } from '#/components/Avatar'
import { useLang } from '#/lib/lang'

export const Route = createFileRoute('/me')({ component: MePage })

function MePage() {
	const { lang } = useLang()
	return (
		<AppShell>
			<div className="flex-1 overflow-y-auto px-[18px] py-6 scrollbar-hide">
				{/* Profile header */}
				<div className="flex flex-col items-center gap-3 mb-7">
					<Avatar author={{ name: 'Я', verified: false, avatar: '#4d3aef' }} size={72} />
					<div>
						<div className="font-serif text-[22px] font-medium text-center tracking-[-0.02em]">
							{lang === 'ru' ? 'Профиль' : 'Profile'}
						</div>
						<div className="text-xs text-dim text-center mt-1">
							{lang === 'ru' ? 'Пресненский · Москва' : 'Presnensky · Moscow'}
						</div>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-3 gap-2 mb-6">
					{[
						{ n: '0', label: lang === 'ru' ? 'событий' : 'events' },
						{ n: '0', label: lang === 'ru' ? 'соседей' : 'neighbors' },
						{ n: '0', label: lang === 'ru' ? 'отзывов' : 'reviews' },
					].map((stat) => (
						<div
							key={stat.label}
							className="bg-white rounded-xl px-[10px] py-[14px] text-center border border-[rgba(21,20,26,0.08)]"
						>
							<div className="font-serif text-[26px] font-bold tracking-[-0.02em]">{stat.n}</div>
							<div className="text-[11px] text-dim mt-0.5">{stat.label}</div>
						</div>
					))}
				</div>

				{/* Menu items */}
				{[
					{ icon: '◱', label: lang === 'ru' ? 'Мои события' : 'My events' },
					{ icon: '♡', label: lang === 'ru' ? 'Избранное' : 'Saved' },
					{ icon: '◉', label: lang === 'ru' ? 'Настройки района' : 'Neighborhood settings' },
					{ icon: '◐', label: lang === 'ru' ? 'Настройки' : 'Settings' },
				].map((item) => (
					<div
						key={item.label}
						className="flex items-center gap-[14px] py-[14px] border-b border-[rgba(21,20,26,0.07)]"
					>
						<span className="text-[18px] w-6 text-center">{item.icon}</span>
						<span className="text-sm font-medium">{item.label}</span>
						<span className="ml-auto text-dim">›</span>
					</div>
				))}
			</div>
		</AppShell>
	)
}
