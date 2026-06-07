import { Link, useLocation } from "@tanstack/react-router";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import { useLang } from "#/lib/lang";
import type { TranslationKey } from "#/lib/translations";
import { cn } from "#/lib/utils";
import { Avatar } from "./Avatar";

type TFn = ReturnType<typeof useLang>["t"];

const TABS: {
	id: string;
	labelKey: TranslationKey;
	icon: string;
	to: string;
	primary?: boolean;
}[] = [
	{ id: "home", labelKey: "nav.guide", icon: "◱", to: "/" },
	{ id: "map", labelKey: "nav.map", icon: "◉", to: "/map" },
	{
		id: "create",
		labelKey: "nav.create",
		icon: "＋",
		to: "/create",
		primary: true,
	},
	{ id: "saved", labelKey: "nav.saved", icon: "♡", to: "/saved" },
	{ id: "me", labelKey: "nav.profile", icon: "◐", to: "/me" },
];

const COLLECTIONS = [
	{ ru: "Музыка", en: "Music", dot: "#ff6d5a" },
	{ ru: "Еда", en: "Food", dot: "#c6a24a" },
	{ ru: "Спорт", en: "Sport", dot: "#2f8a6b" },
	{ ru: "Для соседей", en: "Neighbors", dot: "#2f8a6b" },
	{ ru: "Детям", en: "Kids", dot: "#ff9a9e" },
	{ ru: "Театр", en: "Theatre", dot: "#4d3aef" },
];

type Props = {
	children: React.ReactNode;
	hideTabBar?: boolean;
};

function activeTabFor(path: string) {
	if (path === "/") return "home";
	if (path.startsWith("/map")) return "map";
	if (path.startsWith("/create")) return "create";
	if (path.startsWith("/saved")) return "saved";
	if (path.startsWith("/me")) return "me";
	return "home";
}

export function AppShell({ children, hideTabBar }: Props) {
	const { lang, toggle, t } = useLang();
	const location = useLocation();
	const isDesktop = useMediaQuery("(min-width: 900px)");
	const activeTab = activeTabFor(location.pathname);

	if (isDesktop) {
		return (
			<DesktopShell lang={lang} toggle={toggle} t={t} activeTab={activeTab}>
				{children}
			</DesktopShell>
		);
	}

	return (
		<MobileShell
			lang={lang}
			toggle={toggle}
			t={t}
			activeTab={activeTab}
			hideTabBar={hideTabBar}
		>
			{children}
		</MobileShell>
	);
}

// ─── Desktop layout ──────────────────────────────────────────

type ShellProps = {
	children: React.ReactNode;
	lang: "ru" | "en";
	toggle: () => void;
	t: TFn;
	activeTab: string;
	hideTabBar?: boolean;
};

function DesktopShell({ children, lang, toggle, t, activeTab }: ShellProps) {
	return (
		<div className="flex w-full h-dvh bg-paper text-ink overflow-hidden">
			{/* Sidebar */}
			<div className="w-[220px] shrink-0 bg-paper2 px-4 py-[22px] border-r border-rule flex flex-col gap-[22px] overflow-y-auto">
				{/* Logo */}
				<Link to="/" className="no-underline text-inherit">
					<div className="text-[18px] font-bold tracking-[-0.02em]">
						<span className="font-serif italic">go</span>
						out
						<span className="text-violet">·</span>
					</div>
				</Link>

				{/* Create CTA */}
				<Link to="/create" className="no-underline">
					<div className="px-[14px] py-3 rounded-xl bg-ink text-white flex items-center gap-[10px] text-[13px] font-semibold">
						<div className="w-7 h-7 rounded-lg bg-violet flex items-center justify-center text-[18px] shrink-0">
							＋
						</div>
						<div>
							<div>{t("shell.create")}</div>
							<div className="text-[10px] opacity-[0.55] font-normal mt-px">
								{t("shell.create.sub")}
							</div>
						</div>
					</div>
				</Link>

				{/* Nav links */}
				<div className="flex flex-col gap-0.5">
					{TABS.filter((tab) => !tab.primary).map((tab) => {
						const on = tab.id === activeTab;
						return (
							<Link
								key={tab.id}
								to={tab.to}
								className={cn(
									"px-[10px] py-2 rounded-lg text-[13px] flex items-center gap-[10px] no-underline border",
									on
										? "bg-white text-ink font-semibold border-rule"
										: "bg-transparent text-soft-ink font-medium border-transparent",
								)}
							>
								<span className="text-sm w-4 text-center">{tab.icon}</span>
								{t(tab.labelKey)}
							</Link>
						);
					})}
				</div>

				{/* Collections */}
				<div>
					<div className="text-[10px] tracking-[0.14em] uppercase text-dim font-bold mb-2">
						{t("shell.collections")}
					</div>
					{COLLECTIONS.map((c) => (
						<div
							key={c.ru}
							className="px-[10px] py-1.5 text-xs text-ink flex items-center gap-2"
						>
							<span
								className="w-2 h-2 rounded-full shrink-0"
								style={{ background: c.dot }}
							/>
							{c[lang]}
						</div>
					))}
				</div>

				{/* Footer */}
				<div className="mt-auto flex flex-col gap-[10px]">
					<div className="text-[11px] text-dim leading-[1.5]">
						{t("shell.location")}
						<br />
						GPS on
					</div>
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={toggle}
							className="px-[10px] py-1 rounded-full bg-ink text-paper text-[10px] tracking-[0.08em] font-semibold border-none cursor-pointer"
						>
							{lang.toUpperCase()}
						</button>
						<Avatar
							author={{ name: "Я", verified: false, avatar: "#4d3aef" }}
							size={28}
						/>
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 overflow-hidden flex flex-col">{children}</div>
		</div>
	);
}

// ─── Mobile layout ───────────────────────────────────────────

function MobileShell({
	children,
	lang,
	toggle,
	t,
	activeTab,
	hideTabBar,
}: ShellProps) {
	return (
		<div className="flex flex-col h-dvh bg-paper text-ink">
			{/* Top header */}
			<div className="px-[18px] pt-[14px] pb-[10px] border-b border-rule flex justify-between items-center shrink-0 bg-paper">
				<Link to="/" className="no-underline text-inherit">
					<div className="text-sm font-bold tracking-[-0.02em]">
						<span className="font-serif italic">go</span>
						out
						<span className="text-violet">·</span>
					</div>
				</Link>
				<div className="flex gap-2 items-center">
					<button
						type="button"
						onClick={toggle}
						className="px-[10px] py-1 rounded-full bg-ink text-paper text-[10px] tracking-[0.08em] font-semibold border-none cursor-pointer"
					>
						{lang.toUpperCase()}
					</button>
					<Avatar
						author={{ name: "Я", verified: false, avatar: "#4d3aef" }}
						size={26}
					/>
				</div>
			</div>

			{/* Page content */}
			<div className="flex-1 overflow-hidden flex flex-col">{children}</div>

			{/* Tab bar */}
			{!hideTabBar && (
				<div className="flex bg-paper border-t border-rule pt-1.5 pb-[10px] px-[10px] shrink-0">
					{TABS.map((tab) => {
						const on = tab.id === activeTab;
						if (tab.primary) {
							return (
								<Link
									key={tab.id}
									to={tab.to}
									className="flex-1 flex justify-center items-center pt-0.5 no-underline"
								>
									<div
										className={cn(
											"w-11 h-11 rounded-full text-white flex items-center justify-center text-[22px] shadow-[0_6px_16px_rgba(77,58,239,0.35)]",
											on ? "bg-violet" : "bg-ink",
										)}
									>
										＋
									</div>
								</Link>
							);
						}
						return (
							<Link
								key={tab.id}
								to={tab.to}
								className={cn(
									"flex-1 flex flex-col items-center gap-0.5 py-1.5 no-underline",
									on ? "text-ink" : "text-dim",
								)}
							>
								<div className="text-base">{tab.icon}</div>
								<div
									className={cn(
										"text-[10px]",
										on ? "font-bold font-serif italic" : "font-medium",
									)}
								>
									{t(tab.labelKey)}
								</div>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}
