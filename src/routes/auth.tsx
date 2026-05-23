import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@workos-inc/authkit-react'
import { useEffect } from 'react'
import { VisibilityBadge } from '#/components/VisibilityBadge'
import { useLang } from '#/lib/lang'

export const Route = createFileRoute('/auth')({ component: AuthPage })

const CARDS = [
	{ top: 18, left: 14, rot: -5, v: 'public' as const },
	{ top: 96, left: 44, rot: 3, v: 'neighbors' as const },
	{ top: 172, left: 18, rot: -2, v: 'private' as const },
]

function AuthPage() {
	const { user, isLoading, signIn } = useAuth()
	const { lang, toggle } = useLang()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isLoading && user) navigate({ to: '/' })
	}, [isLoading, user, navigate])

	const cards = [
		{
			...CARDS[0],
			title: lang === 'ru' ? 'Boiler Room · Воробьёвы горы' : 'Boiler Room · Vorobyovy',
			sub: lang === 'ru' ? '980 идут · 23:30' : '980 going · 23:30',
		},
		{
			...CARDS[1],
			title: lang === 'ru' ? 'Кофе во дворе' : 'Courtyard coffee',
			sub: lang === 'ru' ? '14/30 · Пресня · 380 м' : '14/30 · Presnya · 380m',
		},
		{
			...CARDS[2],
			title: lang === 'ru' ? 'Гараж-сейл для дома' : 'Building garage sale',
			sub: lang === 'ru' ? 'по приглашению · 6 идут' : 'invite only · 6 going',
		},
	]

	return (
		<div className="min-h-dvh bg-paper flex flex-col max-w-[420px] mx-auto">
			{/* Top bar */}
			<div className="px-5 py-4 flex justify-between items-center shrink-0">
				<div className="text-[18px] font-bold tracking-[-0.02em] leading-none">
					<span className="font-serif italic">go</span>
					out
					<span className="text-violet">·</span>
				</div>
				<button
					type="button"
					onClick={toggle}
					className="px-3 py-1 rounded-full bg-ink text-paper text-[10px] tracking-[0.08em] font-bold border-none cursor-pointer"
				>
					{lang.toUpperCase()}
				</button>
			</div>

			{/* Main content */}
			<div className="flex-1 px-5 pt-2 flex flex-col">
				{/* Illustration */}
				<div className="h-[270px] rounded-[20px] bg-gradient-to-br from-[#e3f0ea] to-[#eae7fb] relative overflow-hidden mb-7 shrink-0">
					{cards.map((c, i) => (
						<div
							key={i}
							className="absolute bg-white rounded-xl px-3 py-[10px] border border-rule flex items-center gap-[10px] shadow-[0_10px_28px_rgba(0,0,0,0.09)]"
							style={{
								top: c.top,
								left: c.left,
								right: 16,
								transform: `rotate(${c.rot}deg)`,
							}}
						>
							<VisibilityBadge v={c.v} lang={lang} />
							<div>
								<div className="text-xs font-semibold leading-[1.25]">{c.title}</div>
								<div className="text-[10px] text-dim mt-px">{c.sub}</div>
							</div>
						</div>
					))}
				</div>

				{/* Headline */}
				<h1 className="font-serif text-[34px] font-medium tracking-[-0.03em] leading-[1.02] mb-3">
					{lang === 'ru' ? (
						<>
							Концерт в клубе
							<br />и{' '}
							<em className="text-violet italic">кофе на лавочке</em> —<br />
							оба здесь.
						</>
					) : (
						<>
							Club nights
							<br />and{' '}
							<em className="text-violet italic">coffee on a bench</em> —<br />
							both live here.
						</>
					)}
				</h1>

				<p className="text-sm text-dim leading-[1.55] max-w-[320px] mb-8">
					{lang === 'ru'
						? 'goout — площадка, где афишу собирают сами горожане. Публикуйте открыто, для соседей, или по приглашению.'
						: 'goout is where the guide is built by people who live here. Post openly, for neighbors, or invite only.'}
				</p>
			</div>

			{/* Footer CTAs */}
			<div className="px-5 pt-[14px] pb-7 border-t border-rule flex flex-col gap-[10px] shrink-0">
				<button
					type="button"
					disabled={isLoading}
					onClick={() => signIn({ state: { returnTo: '/' } })}
					className="w-full px-5 py-[15px] rounded-[14px] bg-ink text-white font-bold text-[15px] tracking-[0.01em] border-none cursor-pointer flex items-center justify-between disabled:opacity-60 font-sans"
				>
					<span>{lang === 'ru' ? 'Войти' : 'Sign in'}</span>
					<span className="text-[18px]">→</span>
				</button>

				<button
					type="button"
					disabled={isLoading}
					onClick={() => signIn({ state: { returnTo: '/onboarding', isNew: true } })}
					className="w-full px-5 py-[15px] rounded-[14px] bg-transparent text-ink font-semibold text-[15px] border-[1.5px] border-[rgba(21,20,26,0.15)] cursor-pointer disabled:opacity-60 font-sans"
				>
					{lang === 'ru' ? 'Зарегистрироваться' : 'Create account'}
				</button>

				<p className="text-center text-[11px] text-dim leading-[1.5] mt-1">
					{lang === 'ru'
						? 'Создавая аккаунт, вы соглашаетесь с условиями использования'
						: 'By creating an account you agree to the terms of use'}
				</p>
			</div>
		</div>
	)
}
