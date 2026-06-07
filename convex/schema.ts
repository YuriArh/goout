import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const bilingualStr = v.object({ ru: v.string(), en: v.string() });

export default defineSchema({
  users: defineTable({
    workosId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
  }).index("by_workos_id", ["workosId"]),

  events: defineTable({
    // Content
    title: bilingualStr,
    blurb: bilingualStr,
    cat: v.string(), // 'music' | 'art' | 'theatre' | 'cinema' | 'sport' | 'food' | 'talks' | 'party' | 'kids'
    img: v.string(), // CSS linear-gradient string
    tag: v.optional(bilingualStr),

    // Location
    venue: bilingualStr,
    district: bilingualStr,

    // Schedule
    date: v.string(), // ISO 8601: 'YYYY-MM-DD'
    timeStart: v.string(), // 'HH:MM'
    timeEnd: v.optional(v.string()), // 'HH:MM'
    repeat: v.union(
      v.literal("once"),
      v.literal("weekly"),
      v.literal("biweekly"),
    ),

    // Format & access
    format: v.union(
      v.literal("offline"),
      v.literal("online"),
      v.literal("hybrid"),
    ),
    visibility: v.union(
      v.literal("public"),
      v.literal("private"),
    ),

    // Pricing
    priceFrom: v.number(),
    currency: v.string(),
    age: v.number(), // minimum age, 0 = all ages

    // Capacity & attendance
    capacity: v.optional(v.number()),
    attendees: v.number(),

    // Settings
    requireConfirmation: v.boolean(),
    allowPlusOne: v.boolean(),
    publicAttendeeList: v.boolean(),

    // Rating
    rating: v.number(), // 0–5

    // Author
    authorName: v.string(),
    authorHandle: v.optional(v.string()),
    authorVerified: v.boolean(),
    authorAvatar: v.string(), // hex color
    authorUserId: v.optional(v.string()), // Convex user id when auth is added
  })
    .index("by_cat", ["cat"])
    .index("by_visibility", ["visibility"])
    .index("by_date", ["date"]),
});
