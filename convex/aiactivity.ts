import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { paginationOptsValidator } from "convex/server";

export const get = query({
  args: {
    userId: v.string(),
    paginationOpts: paginationOptsValidator,
  },

  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId as Id<"users">);
    // console.log(user);

    if (!user) {
      throw new Error("Unauthorized");
    }

    const activities = await ctx.db
      .query("aiactivity")
      .withIndex("userId", (q) => q.eq("userId", args.userId as Id<"users">))
      .order("desc")
      .paginate(args.paginationOpts);
    // .collect();

    return activities;
  },
});

export const create = internalMutation({
  args: {
    userId: v.id("users"),
    snippetId: v.id("snippets"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .insert("aiactivity", {
        userId: args.userId,
        snippetId: args.snippetId,
        ai_answer: args.content,
        // role: "User",
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  },
});
