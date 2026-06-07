import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { AuthKitProvider } from "@workos/authkit-tanstack-react-start/client";

import ConvexProvider from "../integrations/convex/provider";
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import { LangProvider } from '../lib/lang'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'theme-color', content: '#faf8f4' },
			{ title: 'goout · афиша города' },
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
		],
	}),
	shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru">
			<head>
				<HeadContent />
			</head>
			<body>
				<ConvexProvider>
					<AuthKitProvider>
						<LangProvider>
							{children}
						</LangProvider>
						<TanStackDevtools
							config={{ position: "bottom-right" }}
							plugins={[
								{ name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> },
								TanStackQueryDevtools,
							]}
						/>
					</AuthKitProvider>
				</ConvexProvider>
				<Scripts />
			</body>
		</html>
	)
}
