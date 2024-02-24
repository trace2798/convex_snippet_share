import { v } from "convex/values";

import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();

    //     if (!identity) {
    //       throw new Error("Unauthorized");
    //     }
    // console.log("IDENTITY",identity)
    const user = await ctx.db.get(args.userId as Id<"users">);
    console.log(user);

    if (!user) {
      throw new Error("Unauthorized");
    }

    const snippet = await ctx.db.insert("snippets", {
      title: args.title,
      userId: user?._id,
      notes: "",
      content: "",
      backgroundColor: "#f43f5e",
      isPublic: true,
      language: "typescript",
      padding: "p-10",
      textSize: "text-base",
    });

    return snippet;
  },
});
