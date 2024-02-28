import { v } from "convex/values";

import { internalMutation, mutation } from "./_generated/server";
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
    // // console.log("IDENTITY",identity)
    const user = await ctx.db.get(args.userId as Id<"users">);
    // console.log(user);

    if (!user) {
      throw new Error("Unauthorized. User Id is required.");
    }

    const snippet = await ctx.db.insert("snippets", {
      title: args.title,
      userId: user?._id,
      notes: "",
      content: "",
      backgroundColor: "#f43f5e",
      isPublic: true,
      language: "typescript",
      padding: "40px",
      textSize: "16px",
      viewCount: 0,
    });

    return snippet;
  },
});

export const updateContent = mutation({
  args: { id: v.id("snippets"), content: v.string(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const existingSnippet = await ctx.db.get(args.id);

    if (!existingSnippet) {
      return null;
    }
    const user = await ctx.db.get(args.userId as Id<"users">);

    if (!user) {
      throw new Error("Unauthorized. User Id is required.");
    }
    if (existingSnippet?.userId !== user._id) {
      throw new Error("Unauthorized");
    }
    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      content: args.content,
    });

    return snippet;
  },
});

export const updateBackgroundColor = mutation({
  args: {
    id: v.id("snippets"),
    backgroundColor: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const existingSnippet = await ctx.db.get(args.id);
    //// console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    const user = await ctx.db.get(args.userId as Id<"users">);

    if (!user) {
      throw new Error("Unauthorized. User Id is required.");
    }
    if (existingSnippet?.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      backgroundColor: args.backgroundColor,
    });

    return snippet;
  },
});

export const updateLanguage = mutation({
  args: { id: v.id("snippets"), language: v.string(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const existingSnippet = await ctx.db.get(args.id);
    //// console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    //// console.log(author);
    const user = await ctx.db.get(args.userId as Id<"users">);

    if (!user) {
      throw new Error("Unauthorized. User Id is required.");
    }
    if (existingSnippet?.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      language: args.language,
    });

    return snippet;
  },
});

export const updateTextSize = mutation({
  args: { id: v.id("snippets"), textSize: v.string(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const existingSnippet = await ctx.db.get(args.id);
    //// console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    const user = await ctx.db.get(args.userId as Id<"users">);

    if (!user) {
      throw new Error("Unauthorized. User Id is required.");
    }
    if (existingSnippet?.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      textSize: args.textSize,
    });

    return snippet;
  },
});

export const updatePadding = mutation({
  args: { id: v.id("snippets"), padding: v.string(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const existingSnippet = await ctx.db.get(args.id);
    //// console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    const user = await ctx.db.get(args.userId as Id<"users">);

    if (!user) {
      throw new Error("Unauthorized. User Id is required.");
    }
    if (existingSnippet?.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      padding: args.padding,
    });

    return snippet;
  },
});

export const updateTitle = mutation({
  args: { id: v.id("snippets"), title: v.string(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const existingSnippet = await ctx.db.get(args.id);
    //// console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    const user = await ctx.db.get(args.userId as Id<"users">);

    if (!user) {
      throw new Error("Unauthorized. User Id is required.");
    }
    if (existingSnippet?.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      title: args.title,
    });

    return snippet;
  },
});

export const updateVisibility = mutation({
  args: { id: v.id("snippets"), isPublic: v.boolean(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const existingSnippet = await ctx.db.get(args.id);
    //// console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    const user = await ctx.db.get(args.userId as Id<"users">);

    if (!user) {
      throw new Error("Unauthorized. User Id is required.");
    }
    if (existingSnippet?.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      isPublic: args.isPublic,
    });

    return snippet;
  },
});

export const deleteSnippet = mutation({
  args: { id: v.id("snippets"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const existingSnippet = await ctx.db.get(args.id);

    if (!existingSnippet) {
      return null;
    }
    const user = await ctx.db.get(args.userId as Id<"users">);

    if (!user) {
      throw new Error("Unauthorized. User Id is required.");
    }
    if (existingSnippet?.userId !== user._id) {
      throw new Error("Unauthorized");
    }
    const snippet = await ctx.db.delete(args.id as Id<"snippets">);

    return snippet;
  },
});

export const updateNote = mutation({
  args: { id: v.id("snippets"), notes: v.string(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const existingSnippet = await ctx.db.get(args.id);

    if (!existingSnippet) {
      return null;
    }
    const user = await ctx.db.get(args.userId as Id<"users">);

    if (!user) {
      throw new Error("Unauthorized. User Id is required.");
    }
    if (existingSnippet?.userId !== user._id) {
      throw new Error("Unauthorized");
    }
    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      notes: args.notes,
    });

    return snippet;
  },
});

export const incrementCount = mutation({
  args: { id: v.id("snippets") },
  handler: async (ctx, args) => {
    const existingSnippet = await ctx.db.get(args.id);
    if (!existingSnippet || existingSnippet.viewCount === undefined) {
      return null;
    }
    const updatedViewCount = existingSnippet?.viewCount + 1;
    await ctx.db.patch(args.id, { viewCount: updatedViewCount });
  },
});
