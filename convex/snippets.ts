import { v } from "convex/values";

import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: {
    userId: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId as Id<"users">);
    console.log(user);
   
    if (!user) {
      throw new Error("Unauthorized");
    }

    const snippets = await ctx.db
      .query("snippets")
      .withIndex("userId", (q) => q.eq("userId", args.userId as Id<"users">))
      .order("desc")
      .collect();

    return snippets;
  },
});

export const getById = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();
    // console.log("IDENTITY ===>", identity);
    const snippet = await ctx.db.get(args.snippetId);

    if (!snippet) {
      throw new Error("Not found");
    }

    //   if (snippet.isPublished && !snippet.isArchived) {
    //     return snippet;
    //   }

    if (snippet.isPublic) {
      return snippet;
    }

    // if (!identity) {
    //   throw new Error("Not authenticated");
    // }

    //   if (snippet.isPublic) {
    //     return snippet;
    //   }

    //   const userId = identity.subject;

    //   if (snippet.userId !== userId) {
    //     throw new Error("Unauthorized");
    //   }

    // const presence = await ctx.db
    //   .query("presence")
    //   .withIndex("by_user", (q) => q.eq("userId", userId))
    //   .unique();
    // console.log(presence);
    // if (presence) {
    //   await ctx.db.patch(presence._id, {
    //     lastActive: Date.now(),
    //     location: snippet._id,
    //   });
    // }

    return snippet;
  },
});
