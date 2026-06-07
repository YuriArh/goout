import type { Lang } from "#/lib/lang";

export const TRANSLATIONS = {
	// nav
	"nav.guide": { ru: "Афиша", en: "Guide" },
	"nav.map": { ru: "Карта", en: "Map" },
	"nav.create": { ru: "Создать", en: "Create" },
	"nav.saved": { ru: "Мои", en: "Saved" },
	"nav.profile": { ru: "Профиль", en: "Me" },

	// visibility options (selector buttons)
	"visibility.public": { ru: "Открытое", en: "Public" },
	"visibility.public.sub": { ru: "в общей афише", en: "in the guide" },
	"visibility.private": { ru: "Закрытое", en: "Private" },
	"visibility.private.sub": { ru: "по ссылке", en: "by link" },

	// visibility info boxes
	"vis.public.label": { ru: "Открытое событие", en: "Public event" },
	"vis.public.desc": {
		ru: "Появится в общей афише и на карте.",
		en: "Will appear in the public guide and map.",
	},
	"vis.private.label": { ru: "Закрытое событие", en: "Private event" },
	"vis.private.desc": {
		ru: "Событие не будет в афише и на карте.",
		en: "Event won't show in the guide or map.",
	},

	// create page — header
	"create.header": { ru: "Новое событие", en: "New event" },
	"create.header.sub": {
		ru: "Заполните все разделы и опубликуйте",
		en: "Fill in all sections and publish",
	},
	"create.publish": { ru: "Опубликовать", en: "Publish" },
	"create.publish.event": { ru: "Опубликовать событие", en: "Publish event" },
	"create.save.draft": { ru: "Сохранить черновик", en: "Save draft" },
	"create.draft": { ru: "Черновик", en: "Draft" },

	// create page — step header
	"create.step.label": {
		ru: "Шаг {step} из {total}",
		en: "Step {step} of {total}",
	},

	// create page — sections
	"create.section.about": { ru: "О событии", en: "About" },
	"create.section.audience": { ru: "Кто увидит", en: "Audience" },
	"create.section.when": { ru: "Когда и где", en: "When & where" },
	"create.section.settings": { ru: "Правила", en: "Settings" },

	// create page — sidebar
	"create.sidebar.preview": { ru: "Предпросмотр", en: "Preview" },
	"create.sidebar.checklist": { ru: "Готовность", en: "Checklist" },

	// create page — cover
	"create.cover.add": { ru: "Добавить обложку", en: "Add cover" },
	"create.cover.hint": {
		ru: "с обложкой откликнутся в 3× чаще",
		en: "3× more responses with a cover",
	},

	// create page — fields
	"create.field.title": { ru: "Название", en: "Title" },
	"create.field.title.ph": { ru: "Название события", en: "Event title" },
	"create.field.category": { ru: "Категория", en: "Category" },
	"create.field.category.more": { ru: "ещё", en: "more" },
	"create.field.description": { ru: "Описание", en: "Description" },
	"create.field.description.ph": {
		ru: "Расскажите о событии...",
		en: "Describe your event...",
	},
	"create.field.date": { ru: "Дата", en: "Date" },
	"create.field.start": { ru: "Начало", en: "Start" },
	"create.field.end": { ru: "Конец", en: "End" },
	"create.field.venue": { ru: "Место", en: "Venue" },
	"create.field.venue.ph": {
		ru: "Адрес или название места",
		en: "Address or venue name",
	},
	"create.field.repeat": { ru: "Повторение", en: "Repeat" },
	"create.field.capacity": { ru: "Вместимость", en: "Capacity" },
	"create.field.options": { ru: "Опции", en: "Options" },

	// create page — preview card
	"create.preview.feed": {
		ru: "Как это выглядит в ленте",
		en: "How it looks in the feed",
	},
	"create.preview.title.ph": { ru: "Название события", en: "Event title" },
	"create.preview.desc.ph": {
		ru: "Описание появится здесь…",
		en: "Description will appear here…",
	},
	"create.preview.author": { ru: "Аня С.", en: "Anya S." },

	// create page — checklist & nav
	"create.checklist": { ru: "Готовность", en: "Checklist" },
	"create.back.settings": {
		ru: "‹ Назад к правилам",
		en: "‹ Back to settings",
	},

	// wizard step titles
	"step.1": { ru: "О событии", en: "About the event" },
	"step.2": { ru: "Кто увидит", en: "Who can see it" },
	"step.3": { ru: "Когда и где", en: "When & where" },
	"step.4": { ru: "Правила", en: "Settings" },
	"step.5": { ru: "Предпросмотр", en: "Preview" },

	// wizard next buttons
	"step.1.next": { ru: "Дальше · Кто увидит", en: "Next · Who sees it" },
	"step.2.next": { ru: "Дальше · Когда и где", en: "Next · When & where" },
	"step.3.next": { ru: "Дальше · Правила", en: "Next · Settings" },
	"step.4.next": { ru: "Дальше · Предпросмотр", en: "Next · Preview" },

	// repeat options
	"repeat.once": { ru: "Один раз", en: "Once" },
	"repeat.weekly": { ru: "Еженедельно", en: "Weekly" },
	"repeat.biweekly": { ru: "Каждые 2 недели", en: "Biweekly" },

	// event options (checkboxes)
	"option.confirm": {
		ru: "Требовать подтверждение",
		en: "Require confirmation",
	},
	"option.confirm.sub": {
		ru: "вы принимаете каждого вручную",
		en: "manually accept each participant",
	},
	"option.plus1": { ru: "Разрешить +1", en: "Allow +1" },
	"option.plus1.sub": {
		ru: "каждый может прийти с кем-то",
		en: "attendees can bring someone",
	},
	"option.public_list": { ru: "Публичный список", en: "Public attendee list" },
	"option.public_list.sub": {
		ru: "все видят, кто идёт",
		en: "everyone can see who's going",
	},

	// checklist items
	"checklist.title": { ru: "Название заполнено", en: "Title filled in" },
	"checklist.date": { ru: "Дата выбрана", en: "Date set" },
	"checklist.venue": { ru: "Место указано", en: "Location added" },
	"checklist.cover": { ru: "Обложка добавлена", en: "Cover image added" },

	// calendar — months
	"month.1": { ru: "Январь", en: "January" },
	"month.2": { ru: "Февраль", en: "February" },
	"month.3": { ru: "Март", en: "March" },
	"month.4": { ru: "Апрель", en: "April" },
	"month.5": { ru: "Май", en: "May" },
	"month.6": { ru: "Июнь", en: "June" },
	"month.7": { ru: "Июль", en: "July" },
	"month.8": { ru: "Август", en: "August" },
	"month.9": { ru: "Сентябрь", en: "September" },
	"month.10": { ru: "Октябрь", en: "October" },
	"month.11": { ru: "Ноябрь", en: "November" },
	"month.12": { ru: "Декабрь", en: "December" },

	// calendar — month abbreviations (preview card)
	"month.short.1": { ru: "янв", en: "Jan" },
	"month.short.2": { ru: "фев", en: "Feb" },
	"month.short.3": { ru: "мар", en: "Mar" },
	"month.short.4": { ru: "апр", en: "Apr" },
	"month.short.5": { ru: "май", en: "May" },
	"month.short.6": { ru: "июн", en: "Jun" },
	"month.short.7": { ru: "июл", en: "Jul" },
	"month.short.8": { ru: "авг", en: "Aug" },
	"month.short.9": { ru: "сен", en: "Sep" },
	"month.short.10": { ru: "окт", en: "Oct" },
	"month.short.11": { ru: "ноя", en: "Nov" },
	"month.short.12": { ru: "дек", en: "Dec" },

	// calendar — weekday abbreviations
	"day.1": { ru: "Пн", en: "Mo" },
	"day.2": { ru: "Вт", en: "Tu" },
	"day.3": { ru: "Ср", en: "We" },
	"day.4": { ru: "Чт", en: "Th" },
	"day.5": { ru: "Пт", en: "Fr" },
	"day.6": { ru: "Сб", en: "Sa" },
	"day.7": { ru: "Вс", en: "Su" },

	// home page
	"home.title": { ru: "Эта неделя в Москве", en: "This week in Moscow" },
	"home.subtitle": {
		ru: "№19 · 124 события · обновлено 2 мин. назад",
		en: "№19 · 124 events · updated 2 min ago",
	},
	"home.search.ph": {
		ru: "Поиск события, района, тега",
		en: "Search event, area, tag",
	},
	"home.filters": { ru: "Фильтры · 3", en: "Filters · 3" },
	"home.empty": { ru: "Пока пусто", en: "Nothing here yet" },
	"home.picks": { ru: "Рекомендации редакции", en: "Editor's picks" },
	"home.picks.count": { ru: "показано 6 из 46 ›", en: "showing 6 of 46 ›" },
	"home.quick": { ru: "Быстро", en: "At a glance" },
	"home.mobile.title": { ru: "Эта неделя", en: "This week" },
	"home.mobile.sub": { ru: "№19 · 124 события", en: "№19 · 124 events" },
	"home.more": { ru: "Ещё идеи", en: "More to do" },
	"home.all": { ru: "Все события", en: "All events" },

	// event detail page
	"event.not_found": { ru: "Событие не найдено", en: "Event not found" },
	"event.cta.private": { ru: "Принять приглашение", en: "Accept invitation" },
	"event.cta.public": { ru: "Купить билет", en: "Get tickets" },
	"event.meta.datetime": { ru: "Дата и время", en: "Date & time" },
	"event.meta.venue": { ru: "Место", en: "Venue" },
	"event.meta.district": { ru: "Район", en: "District" },
	"event.meta.ticket": { ru: "Билет", en: "Ticket" },
	"event.save": { ru: "Сохранить в мои", en: "Save to my list" },
	"event.attend": { ru: "Участие", en: "Attend" },
	"event.price": { ru: "Стоимость", en: "Price" },
	"event.format.online": { ru: "Онлайн", en: "Online" },
	"event.format.hybrid": { ru: "Гибрид", en: "Hybrid" },
	"event.going": { ru: "идут", en: "going" },
	"event.private.invite": { ru: "ЛИЧНОЕ ПРИГЛАШЕНИЕ", en: "PERSONAL INVITE" },
	"event.private.invited": {
		ru: "{author} пригласил вас",
		en: "{author} invited you",
	},
	"event.private.rules": {
		ru: "Правила закрытого события",
		en: "Private event rules",
	},
	"event.private.rule.1": {
		ru: "Не публикуется в афише и на карте",
		en: "Not shown in the guide or map",
	},
	"event.private.rule.2": {
		ru: "Адрес скрыт до подтверждения участия",
		en: "Address hidden until RSVP confirmed",
	},
	"event.private.rule.3": {
		ru: "Одноразовая ссылка — только для вас",
		en: "Single-use link — for you only",
	},
	"event.capacity": { ru: "участников", en: "participants" },
	"event.capacity.left": { ru: "мест", en: "spots left" },

	// map page
	"map.view": { ru: "Подробнее →", en: "View event →" },
	"map.events.count": { ru: "событий", en: "events" },
	"legend.public": { ru: "Открытое", en: "Public" },
	"legend.private": { ru: "Закрытое", en: "Private" },

	// auth page
	"auth.signin": { ru: "Войти", en: "Sign in" },
	"auth.signup": { ru: "Зарегистрироваться", en: "Create account" },
	"auth.terms": {
		ru: "Создавая аккаунт, вы соглашаетесь с условиями использования",
		en: "By creating an account you agree to the terms of use",
	},
	"auth.description": {
		ru: "goout — площадка, где афишу собирают сами горожане. Публикуйте открыто или по приглашению.",
		en: "goout is where the guide is built by people who live here. Post publicly or invite only.",
	},

	// onboarding
	"onboarding.skip": { ru: "Позже", en: "Skip" },
	"onboarding.description": {
		ru: "goout — площадка, где афишу собирают сами горожане. Публикуйте открыто или по приглашению.",
		en: "goout is where the guide is built by people who live here. Post publicly or invite only.",
	},
	"onboarding.start": { ru: "Поехали", en: "Let's go" },

	"onboarding.location.h": { ru: "Где вы живёте?", en: "Where do you live?" },
	"onboarding.location.desc": {
		ru: "Нужно, чтобы показывать события в вашем районе.",
		en: "So we can show events in your area.",
	},
	"onboarding.location.gps": { ru: "По GPS · точно", en: "Use GPS · precise" },
	"onboarding.location.gps.sub": {
		ru: "обновляется, когда открываете приложение",
		en: "updates when you open the app",
	},
	"onboarding.location.gps.badge": { ru: "РЕКОМ.", en: "PICK" },
	"onboarding.location.manual": { ru: "Указать вручную", en: "Set manually" },
	"onboarding.location.manual.sub": {
		ru: "выбрать район на карте",
		en: "pick your neighborhood on the map",
	},
	"onboarding.location.allow": {
		ru: "Разрешить доступ к геолокации",
		en: "Allow location access",
	},

	"onboarding.interests.h": {
		ru: "Что вас интересует?",
		en: "What interests you?",
	},
	"onboarding.interests.desc": {
		ru: "Выберите несколько — подберём события по вкусу.",
		en: "Pick a few — we'll curate events to match.",
	},
	"onboarding.interests.next": {
		ru: "Дальше · {count} выбрано",
		en: "Next · {count} picked",
	},

	"onboarding.notify.h": { ru: "Не пропустите своё", en: "Don't miss yours" },
	"onboarding.notify.desc": {
		ru: "Присылаем только о событиях, которые вам подходят. Не чаще одного раза в день.",
		en: "We only send about events that match you. No more than once a day.",
	},
	"onboarding.notify.enable": {
		ru: "Включить уведомления",
		en: "Enable notifications",
	},
	"onboarding.notify.skip": { ru: "Не сейчас", en: "Not now" },
	"onboarding.notify.neighbor": {
		ru: "Соседские события",
		en: "Neighbor events",
	},
	"onboarding.notify.neighbor.sub": {
		ru: "за час до начала",
		en: "1 hour before start",
	},
	"onboarding.notify.interests": {
		ru: "Новые события по интересам",
		en: "New events by interests",
	},
	"onboarding.notify.interests.sub": {
		ru: "1 раз в день, утром",
		en: "once a day, morning",
	},
	"onboarding.notify.invite": { ru: "Приглашения", en: "Invitations" },
	"onboarding.notify.invite.sub": { ru: "мгновенно", en: "instantly" },

	"onboarding.done.h": {
		ru: "Всё готово. Исследуйте город.",
		en: "You're all set. Explore your city.",
	},
	"onboarding.done.desc": {
		ru: "Видите кофе на лавочке в ленте? Значит, кто-то в 500 метрах уже ждёт.",
		en: "See courtyard coffee in your feed? Someone 500m away is already waiting.",
	},
	"onboarding.done.tip": { ru: "Совет дня", en: "Quick tip" },
	"onboarding.done.tip.text": {
		ru: "Создайте первое событие — хотя бы кофе во дворе...",
		en: "Create your first event — even just courtyard coffee...",
	},
	"onboarding.done.open": { ru: "Открыть афишу", en: "Open the guide" },

	// me / profile
	"me.title": { ru: "Профиль", en: "Profile" },
	"me.location": { ru: "Пресненский · Москва", en: "Presnensky · Moscow" },
	"me.stats.events": { ru: "событий", en: "events" },
	"me.stats.neighbors": { ru: "соседей", en: "neighbors" },
	"me.stats.reviews": { ru: "отзывов", en: "reviews" },
	"me.my_events": { ru: "Мои события", en: "My events" },
	"me.saved": { ru: "Избранное", en: "Saved" },
	"me.neighborhood": { ru: "Настройки района", en: "Neighborhood settings" },
	"me.settings": { ru: "Настройки", en: "Settings" },

	// app shell
	"shell.create": { ru: "Создать", en: "Create event" },
	"shell.create.sub": { ru: "даже для двора", en: "even for your block" },
	"shell.collections": { ru: "Подборки", en: "Collections" },
	"shell.location": { ru: "Пресненский · Москва", en: "Presnya · Moscow" },

	// event cards
	"card.neighbor.label": { ru: "В 500 м от вас", en: "Within 500m" },
	"card.going": { ru: "идут", en: "going" },
	"card.invite_only": { ru: "только по приглашению", en: "invite only" },
	"card.invited": {
		ru: "Вы получили приглашение от {author}",
		en: "You were invited by {author}",
	},
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS;

export function t(
	key: TranslationKey,
	lang: Lang,
	vars?: Record<string, string | number>,
): string {
	let str: string = TRANSLATIONS[key][lang];
	if (vars) {
		for (const [k, v] of Object.entries(vars)) {
			str = str.replaceAll(`{${k}}`, String(v));
		}
	}
	return str;
}
