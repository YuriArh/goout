export type Visibility = 'public' | 'private'

export type EventAuthor = {
	name: string
	handle?: string
	verified: boolean
	avatar: string
}

export type EventData = {
	id: string
	title: { ru: string; en: string }
	cat: string
	venue: { ru: string; en: string }
	district: { ru: string; en: string }
	date: string
	time: string
	priceFrom: number
	currency: string
	age: number
	rating: number
	attendees: number
	capacity?: number
	format: 'offline' | 'online' | 'hybrid'
	tag: { ru: string; en: string } | null
	visibility: Visibility
	author: EventAuthor
	img: string
	blurb: { ru: string; en: string }
}

export type Category = {
	id: string
	ru: string
	en: string
	icon: string
}

export const CATEGORIES: Category[] = [
	{ id: 'all', ru: 'Все', en: 'All', icon: '✦' },
	{ id: 'music', ru: 'Концерты', en: 'Concerts', icon: '♪' },
	{ id: 'art', ru: 'Выставки', en: 'Art', icon: '◐' },
	{ id: 'theatre', ru: 'Театр', en: 'Theatre', icon: '◇' },
	{ id: 'cinema', ru: 'Кино', en: 'Cinema', icon: '▶' },
	{ id: 'sport', ru: 'Спорт', en: 'Sport', icon: '◉' },
	{ id: 'food', ru: 'Еда', en: 'Food', icon: '◍' },
	{ id: 'talks', ru: 'Лекции', en: 'Talks', icon: '❝' },
	{ id: 'party', ru: 'Вечеринки', en: 'Parties', icon: '✺' },
	{ id: 'kids', ru: 'Детям', en: 'Kids', icon: '☻' },
]

export const EVENTS: EventData[] = [
	{
		id: 'e1',
		title: { ru: 'Kedr Livanskiy — live', en: 'Kedr Livanskiy — live' },
		cat: 'music',
		venue: { ru: 'Mutabor', en: 'Mutabor' },
		district: { ru: 'Южнопортовый', en: 'Yuzhnoportovy' },
		date: '2026-05-14',
		time: '22:00',
		priceFrom: 2500,
		currency: '₽',
		age: 18,
		rating: 4.8,
		attendees: 412,
		format: 'offline',
		tag: { ru: 'хит недели', en: 'pick of the week' },
		visibility: 'public',
		author: { name: 'Mutabor', handle: '@mutabor', verified: true, avatar: '#ff5f6d' },
		img: 'linear-gradient(135deg,#ff5f6d 0%,#ffc371 100%)',
		blurb: {
			ru: 'Электронная поэтесса с новым материалом. Живые синты, плёночные бас-секвенции и поздний свет.',
			en: 'Electronic songwriter on tour. Live synths, tape-driven basslines and late-night light.',
		},
	},
	{
		id: 'e2',
		title: { ru: 'Импрессионисты: близко', en: 'Impressionists: up close' },
		cat: 'art',
		venue: { ru: 'ГЭС-2', en: 'GES-2' },
		district: { ru: 'Якиманка', en: 'Yakimanka' },
		date: '2026-05-09',
		time: '11:00',
		priceFrom: 800,
		currency: '₽',
		age: 0,
		rating: 4.6,
		attendees: 1240,
		format: 'offline',
		tag: { ru: 'последние дни', en: 'closing soon' },
		visibility: 'public',
		author: { name: 'ГЭС-2', verified: true, avatar: '#a1c4fd' },
		img: 'linear-gradient(135deg,#a1c4fd 0%,#c2e9fb 100%)',
		blurb: {
			ru: '72 работы из частных коллекций, собранные вместе впервые. Аудиогид включён в билет.',
			en: '72 works from private collections, together for the first time. Audio guide included.',
		},
	},
	{
		id: 'e3',
		title: { ru: 'Чайка. Новая редакция', en: 'The Seagull. Restaged' },
		cat: 'theatre',
		venue: { ru: 'Мастерская Брусникина', en: 'Brusnikin Workshop' },
		district: { ru: 'Хамовники', en: 'Khamovniki' },
		date: '2026-05-11',
		time: '19:30',
		priceFrom: 1800,
		currency: '₽',
		age: 16,
		rating: 4.9,
		attendees: 187,
		format: 'offline',
		tag: null,
		visibility: 'public',
		author: { name: 'Brusnikin', verified: true, avatar: '#434343' },
		img: 'linear-gradient(135deg,#434343 0%,#000000 100%)',
		blurb: {
			ru: 'Чехов как разговор о выгорании. 2 часа без антракта.',
			en: 'Chekhov read as a conversation about burnout. 2 hours, no interval.',
		},
	},
	{
		id: 'e4',
		title: { ru: 'Ночь короткометражек', en: 'Short Film Night' },
		cat: 'cinema',
		venue: { ru: 'Каро 11 Октябрь', en: 'Karo 11 Oktyabr' },
		district: { ru: 'Арбат', en: 'Arbat' },
		date: '2026-05-16',
		time: '23:00',
		priceFrom: 600,
		currency: '₽',
		age: 16,
		rating: 4.4,
		attendees: 320,
		format: 'offline',
		tag: { ru: 'лейт-найт', en: 'late night' },
		visibility: 'public',
		author: { name: 'Каро.Арт', verified: true, avatar: '#ee9ca7' },
		img: 'linear-gradient(135deg,#ee9ca7 0%,#ffdde1 100%)',
		blurb: {
			ru: '14 фильмов из Канн, Локарно и студенческих фестивалей. Дискуссия после сеанса.',
			en: '14 shorts from Cannes, Locarno and student festivals. Q&A afterwards.',
		},
	},
	{
		id: 'e5',
		title: { ru: 'Парк Раннер — 10 км', en: 'Park Runner — 10k' },
		cat: 'sport',
		venue: { ru: 'Измайловский парк', en: 'Izmailovsky Park' },
		district: { ru: 'Измайлово', en: 'Izmailovo' },
		date: '2026-05-10',
		time: '08:00',
		priceFrom: 0,
		currency: '₽',
		age: 12,
		rating: 4.7,
		attendees: 860,
		format: 'offline',
		tag: { ru: 'бесплатно', en: 'free' },
		visibility: 'public',
		author: { name: 'ParkRun RU', verified: true, avatar: '#96e6a1' },
		img: 'linear-gradient(135deg,#96e6a1 0%,#d4fc79 100%)',
		blurb: {
			ru: 'Утренний воскресный забег по тенистым аллеям. Стартовый пакет и чай на финише.',
			en: 'Sunday morning run through shaded alleys. Starter pack and tea at the finish.',
		},
	},
	{
		id: 'e_neighbor1',
		title: { ru: 'Кофе во дворе · Пресня', en: 'Courtyard Coffee · Presnya' },
		cat: 'food',
		venue: { ru: 'Двор, Большая Грузинская, 20', en: 'Courtyard, Bolshaya Gruzinskaya 20' },
		district: { ru: 'Пресненский', en: 'Presnensky' },
		date: '2026-05-11',
		time: '10:00',
		priceFrom: 0,
		currency: '₽',
		age: 0,
		rating: 0,
		attendees: 14,
		capacity: 30,
		format: 'offline',
		tag: null,
		visibility: 'public',
		author: { name: 'Аня С.', handle: '@anya_s', verified: false, avatar: '#a6c1ee' },
		img: 'linear-gradient(135deg,#fddb92 0%,#d1fdff 100%)',
		blurb: {
			ru: 'Привет! Собираемся утром во дворе, приношу термос на 12 чашек и кекс. Приходите как есть.',
			en: 'Hi! Meeting in the courtyard in the morning — I bring a 12-cup thermos and cake. Come as you are.',
		},
	},
	{
		id: 'e_neighbor2',
		title: { ru: 'Гараж-сейл на Чистых', en: 'Garage sale on Chistye' },
		cat: 'food',
		venue: { ru: 'Подъезд 3, Покровка 18', en: 'Entrance 3, Pokrovka 18' },
		district: { ru: 'Басманный', en: 'Basmanny' },
		date: '2026-05-12',
		time: '14:00',
		priceFrom: 0,
		currency: '₽',
		age: 0,
		rating: 0,
		attendees: 6,
		capacity: 20,
		format: 'offline',
		tag: { ru: 'закрытое', en: 'private' },
		visibility: 'private',
		author: { name: 'Миша К.', handle: '@misha_k', verified: false, avatar: '#c6ff4a' },
		img: 'linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)',
		blurb: {
			ru: 'Разбираем подвал — вещи, книги, виниловые пластинки. Только для соседей по дому.',
			en: 'Clearing out the basement — stuff, books, vinyl. Building residents only.',
		},
	},
	{
		id: 'e6',
		title: { ru: 'Супы мира — маркет', en: 'Soups of the world — market' },
		cat: 'food',
		venue: { ru: 'Депо. Лесная', en: 'Depo. Lesnaya' },
		district: { ru: 'Тверской', en: 'Tverskoy' },
		date: '2026-05-12',
		time: '12:00',
		priceFrom: 0,
		currency: '₽',
		age: 0,
		rating: 4.3,
		attendees: 2100,
		format: 'offline',
		tag: { ru: 'вход свободный', en: 'free entry' },
		visibility: 'public',
		author: { name: 'Депо', verified: true, avatar: '#fddb92' },
		img: 'linear-gradient(135deg,#fddb92 0%,#d1fdff 100%)',
		blurb: {
			ru: 'Рамен, фо-бо, борщ и харчо от 24 шефов. Дегустационная карта — 990₽.',
			en: 'Ramen, pho, borscht and kharcho from 24 chefs. Tasting pass — 990 ₽.',
		},
	},
	{
		id: 'e7',
		title: { ru: 'AI в продуктовой разработке', en: 'AI in product design' },
		cat: 'talks',
		venue: { ru: 'Yandex HQ', en: 'Yandex HQ' },
		district: { ru: 'Хамовники', en: 'Khamovniki' },
		date: '2026-05-13',
		time: '19:00',
		priceFrom: 0,
		currency: '₽',
		age: 0,
		rating: 4.5,
		attendees: 340,
		format: 'hybrid',
		tag: { ru: 'гибрид', en: 'hybrid' },
		visibility: 'public',
		author: { name: 'Yandex', verified: true, avatar: '#8ec5fc' },
		img: 'linear-gradient(135deg,#e0c3fc 0%,#8ec5fc 100%)',
		blurb: {
			ru: '3 доклада, панель и разбор пет-проектов. После — пицца и нетворкинг.',
			en: '3 talks, a panel and a live critique. Pizza and networking to follow.',
		},
	},
	{
		id: 'e8',
		title: { ru: 'Boiler Room — открытая запись', en: 'Boiler Room — open taping' },
		cat: 'party',
		venue: { ru: 'НИИ Механики', en: 'NII Mekhaniki' },
		district: { ru: 'Воробьёвы горы', en: 'Vorobyovy Gory' },
		date: '2026-05-15',
		time: '23:30',
		priceFrom: 1500,
		currency: '₽',
		age: 18,
		rating: 4.9,
		attendees: 980,
		format: 'offline',
		tag: { ru: '18+', en: '18+' },
		visibility: 'public',
		author: { name: 'Boiler Room', verified: true, avatar: '#302b63' },
		img: 'linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)',
		blurb: {
			ru: 'Четыре сета, 6 часов, без телефонов на танцполе.',
			en: 'Four sets, six hours, no phones on the floor.',
		},
	},
	{
		id: 'e9',
		title: { ru: 'Театр теней для детей', en: 'Shadow theatre for kids' },
		cat: 'kids',
		venue: { ru: 'ЗИЛ', en: 'ZIL Centre' },
		district: { ru: 'Даниловский', en: 'Danilovsky' },
		date: '2026-05-10',
		time: '14:00',
		priceFrom: 500,
		currency: '₽',
		age: 5,
		rating: 4.8,
		attendees: 95,
		format: 'offline',
		tag: { ru: '5+', en: '5+' },
		visibility: 'public',
		author: { name: 'ЗИЛ', verified: true, avatar: '#fbc2eb' },
		img: 'linear-gradient(135deg,#fbc2eb 0%,#a6c1ee 100%)',
		blurb: {
			ru: 'Интерактивная сказка с тенями и живой музыкой. 45 минут.',
			en: 'Interactive shadow tale with live music. 45 minutes.',
		},
	},
	{
		id: 'e10',
		title: { ru: 'Джаз на крыше', en: 'Rooftop Jazz' },
		cat: 'music',
		venue: { ru: 'Рихтер', en: 'Richter' },
		district: { ru: 'Пятницкая', en: 'Pyatnitskaya' },
		date: '2026-05-14',
		time: '20:00',
		priceFrom: 1200,
		currency: '₽',
		age: 16,
		rating: 4.6,
		attendees: 140,
		format: 'offline',
		tag: null,
		visibility: 'public',
		author: { name: 'Рихтер', verified: true, avatar: '#f6d365' },
		img: 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
		blurb: {
			ru: 'Квартет, закат и коктейльная карта с лимонной настойкой.',
			en: 'A quartet, sunset and a cocktail menu with house limoncello.',
		},
	},
	{
		id: 'e11',
		title: { ru: 'Book Club: Уэльбек', en: 'Book Club: Houellebecq' },
		cat: 'talks',
		venue: { ru: 'Книжный Гиперион', en: 'Hyperion Books' },
		district: { ru: 'Таганский', en: 'Tagansky' },
		date: '2026-05-11',
		time: '18:00',
		priceFrom: 0,
		currency: '₽',
		age: 18,
		rating: 4.2,
		attendees: 28,
		format: 'offline',
		tag: { ru: 'свободно', en: 'free' },
		visibility: 'public',
		author: { name: 'Книжный клуб', verified: false, avatar: '#d299c2' },
		img: 'linear-gradient(135deg,#d299c2 0%,#fef9d7 100%)',
		blurb: {
			ru: 'Обсуждаем «Серотонин». Модерирует Анна Наринская.',
			en: 'Discussing Serotonin. Moderated by Anna Narinskaya.',
		},
	},
	{
		id: 'e12',
		title: { ru: 'Стрит-арт тур', en: 'Street-art tour' },
		cat: 'art',
		venue: { ru: 'Винзавод', en: 'Winzavod' },
		district: { ru: 'Басманный', en: 'Basmanny' },
		date: '2026-05-17',
		time: '16:00',
		priceFrom: 900,
		currency: '₽',
		age: 0,
		rating: 4.7,
		attendees: 210,
		format: 'offline',
		tag: null,
		visibility: 'public',
		author: { name: 'Винзавод', verified: true, avatar: '#ff9a9e' },
		img: 'linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)',
		blurb: {
			ru: '2 часа, 14 объектов, от классики 2000-х до новых муралов 2026 года.',
			en: '2 hours, 14 works — from early-2000s classics to new 2026 murals.',
		},
	},
]

export const MAP_POSITIONS: Record<string, { x: number; y: number }> = {
	e1: { x: 62, y: 72 },
	e2: { x: 44, y: 58 },
	e3: { x: 38, y: 50 },
	e4: { x: 48, y: 44 },
	e5: { x: 78, y: 40 },
	e6: { x: 52, y: 30 },
	e7: { x: 36, y: 60 },
	e8: { x: 30, y: 68 },
	e9: { x: 58, y: 66 },
	e10: { x: 50, y: 54 },
	e11: { x: 66, y: 52 },
	e12: { x: 60, y: 40 },
	e_neighbor1: { x: 40, y: 34 },
	e_neighbor2: { x: 72, y: 58 },
}

export function byId(id: string): EventData | undefined {
	return EVENTS.find((e) => e.id === id)
}

export function formatDate(iso: string, lang: 'ru' | 'en'): string {
	const d = new Date(iso)
	const mru = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
	const men = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	if (lang === 'ru') return `${d.getDate()} ${mru[d.getMonth()]}`
	return `${men[d.getMonth()]} ${d.getDate()}`
}

export function catLabel(catId: string, lang: 'ru' | 'en'): string {
	const c = CATEGORIES.find((x) => x.id === catId)
	return c ? c[lang] : catId
}

export function formatPrice(price: number, currency: string, lang: 'ru' | 'en'): string {
	if (price === 0) return lang === 'ru' ? 'Бесплатно' : 'Free'
	return `от ${price.toLocaleString()} ${currency}`
}
