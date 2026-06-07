import { createContext, useContext, useState } from 'react'
import { t as translate, type TranslationKey } from '#/lib/translations'

export type Lang = 'ru' | 'en'

type LangCtx = {
	lang: Lang
	toggle: () => void
}

const LangContext = createContext<LangCtx>({ lang: 'ru', toggle: () => {} })

export function LangProvider({ children }: { children: React.ReactNode }) {
	const [lang, setLang] = useState<Lang>('ru')
	const toggle = () => setLang((l) => (l === 'ru' ? 'en' : 'ru'))
	return <LangContext value={{ lang, toggle }}>{children}</LangContext>
}

export function useLang() {
	const { lang, toggle } = useContext(LangContext)
	const t = (key: TranslationKey, vars?: Record<string, string | number>) =>
		translate(key, lang, vars)
	return { lang, toggle, t }
}
