import { createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/AppShell'
import { useLang } from '#/lib/lang'

export const Route = createFileRoute('/saved')({ component: SavedPage })

function SavedPage() {
	const { lang } = useLang()
	return (
		<AppShell>
			<div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
				<div className="text-[40px]">♡</div>
				<div className="font-serif italic text-2xl font-medium text-center">
					{lang === 'ru' ? 'Избранное пусто' : 'Nothing saved yet'}
				</div>
				<div className="text-[13px] text-dim text-center leading-[1.5]">
					{lang === 'ru'
						? 'Нажмите ♡ на событии, чтобы добавить в избранное'
						: 'Tap ♡ on an event to save it'}
				</div>
			</div>
		</AppShell>
	)
}
