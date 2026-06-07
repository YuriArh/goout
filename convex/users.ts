import { mutation, query } from "./_generated/server";

export const storeUser = mutation({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Not authenticated");

		const workosId = identity.subject;
		const existing = await ctx.db
			.query("users")
			.withIndex("by_workos_id", (q) => q.eq("workosId", workosId))
			.unique();

		if (existing) {
			await ctx.db.patch(existing._id, {
				email: identity.email,
				name: identity.name,
			});
			return existing._id;
		}

		return await ctx.db.insert("users", {
			workosId,
			email: identity.email,
			name: identity.name,
		});
	},
});

export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return null;

		return ctx.db
			.query("users")
			.withIndex("by_workos_id", (q) => q.eq("workosId", identity.subject))
			.unique();
	},
});
