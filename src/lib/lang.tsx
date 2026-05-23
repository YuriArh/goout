import { createContext, useContext, useState } from 'react'

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
	return useContext(LangContext)
}
