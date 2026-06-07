import { ConvexProviderWithAuth } from "convex/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import {
	useAuth,
	useAccessToken,
} from "@workos/authkit-tanstack-react-start/client";
import { useCallback } from "react";

const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL;
if (!CONVEX_URL) {
	console.error("missing envar VITE_CONVEX_URL");
}
const convexQueryClient = new ConvexQueryClient(CONVEX_URL);

function useAuthFromWorkOS() {
	const { user, loading } = useAuth();
	const { getAccessToken, refresh } = useAccessToken();

	const fetchAccessToken = useCallback(
		async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
			if (!user) return null;
			try {
				return (await (forceRefreshToken ? refresh() : getAccessToken())) ?? null;
			} catch {
				return null;
			}
		},
		[user, getAccessToken, refresh],
	);

	return {
		isLoading: loading,
		isAuthenticated: !!user,
		fetchAccessToken,
	};
}

export default function AppConvexProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ConvexProviderWithAuth
			client={convexQueryClient.convexClient}
			useAuth={useAuthFromWorkOS}
		>
			{children}
		</ConvexProviderWithAuth>
	);
}
