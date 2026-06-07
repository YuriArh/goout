import { useEffect } from "react";
import { useAuth } from "@workos/authkit-tanstack-react-start/client";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

type UserOrNull = ReturnType<typeof useAuth>["user"];

export const useUser = (): UserOrNull => {
	const { user, loading } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const storeUser = useMutation(api.users.storeUser);

	useEffect(() => {
		if (!loading && !user) {
			navigate({ to: "/auth", search: { returnTo: location.pathname } });
		}
	}, [loading, user]);

	useEffect(() => {
		if (!loading && user) {
			storeUser();
		}
	}, [loading, user]);

	return user;
};
