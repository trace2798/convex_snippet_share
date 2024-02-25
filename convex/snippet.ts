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
      padding: "40px",
      textSize: "16px",
    });

    return snippet;
  },
});

export const updateContent = mutation({
  args: { id: v.id("snippets"), content: v.string() },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();

    // if (!identity) {
    //   throw new Error("Unauthorized");
    // }

    const existingSnippet = await ctx.db.get(args.id);
    //console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    //console.log(author);
    // if (!author) {
    //   return null;
    // }
    // if (existingSnippet?.authorId !== author._id) {
    //   throw new Error("Unauthorized");
    // }
    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      content: args.content,
    });

    return snippet;
  },
});

export const updateBackgroundColor = mutation({
  args: { id: v.id("snippets"), backgroundColor: v.string() },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();

    // if (!identity) {
    //   throw new Error("Unauthorized");
    // }

    // const author = await ctx.db
    //   .query("users")
    //   .withIndex("tokenIdentifier", (q) =>
    //     q.eq("tokenIdentifier", identity.tokenIdentifier)
    //   )
    //   .unique();

    const existingSnippet = await ctx.db.get(args.id);
    //console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    //console.log(author);
    // if (!author) {
    //   return null;
    // }
    // if (existingSnippet?.authorId !== author._id) {
    //   throw new Error("Unauthorized");
    // }

    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      backgroundColor: args.backgroundColor,
    });

    return snippet;
  },
});

export const updateLanguage = mutation({
  args: { id: v.id("snippets"), language: v.string() },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();

    // if (!identity) {
    //   throw new Error("Unauthorized");
    // }
    // const author = await ctx.db
    //   .query("users")
    //   .withIndex("tokenIdentifier", (q) =>
    //     q.eq("tokenIdentifier", identity.tokenIdentifier)
    //   )
    //   .unique();

    const existingSnippet = await ctx.db.get(args.id);
    //console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    //console.log(author);
    // if (!author) {
    //   return null;
    // }
    // if (existingSnippet?.authorId !== author._id) {
    //   throw new Error("Unauthorized");
    // }

    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      language: args.language,
    });

    return snippet;
  },
});

export const updateTextSize = mutation({
  args: { id: v.id("snippets"), textSize: v.string() },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();

    // if (!identity) {
    //   throw new Error("Unauthorized");
    // }

    // const author = await ctx.db
    //   .query("users")
    //   .withIndex("tokenIdentifier", (q) =>
    //     q.eq("tokenIdentifier", identity.tokenIdentifier)
    //   )
    //   .unique();

    const existingSnippet = await ctx.db.get(args.id);
    //console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    //console.log(author);
    // if (!author) {
    //   return null;
    // }
    // if (existingSnippet?.authorId !== author._id) {
    //   throw new Error("Unauthorized");
    // }

    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      textSize: args.textSize,
    });

    return snippet;
  },
});

export const updatePadding = mutation({
  args: { id: v.id("snippets"), padding: v.string() },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();

    // if (!identity) {
    //   throw new Error("Unauthorized");
    // }

    // const author = await ctx.db
    //   .query("users")
    //   .withIndex("tokenIdentifier", (q) =>
    //     q.eq("tokenIdentifier", identity.tokenIdentifier)
    //   )
    //   .unique();

    const existingSnippet = await ctx.db.get(args.id);
    //console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    //console.log(author);
    // if (!author) {
    //   return null;
    // }
    // if (existingSnippet?.authorId !== author._id) {
    //   throw new Error("Unauthorized");
    // }

    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      padding: args.padding,
    });

    return snippet;
  },
});

export const updateTitle = mutation({
  args: { id: v.id("snippets"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    // const author = await ctx.db
    //   .query("users")
    //   .withIndex("tokenIdentifier", (q) =>
    //     q.eq("tokenIdentifier", identity.tokenIdentifier)
    //   )
    //   .unique();

    const existingSnippet = await ctx.db.get(args.id);
    //console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    //console.log(author);
    // if (!author) {
    //   return null;
    // }
    // if (existingSnippet?.authorId !== author._id) {
    //   throw new Error("Unauthorized");
    // }

    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      title: args.title,
    });

    return snippet;
  },
});

export const updateVisibility = mutation({
  args: { id: v.id("snippets"), isPublic: v.boolean() },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();

    // if (!identity) {
    //   throw new Error("Unauthorized");
    // }

    // const author = await ctx.db
    //   .query("users")
    //   .withIndex("tokenIdentifier", (q) =>
    //     q.eq("tokenIdentifier", identity.tokenIdentifier)
    //   )
    //   .unique();

    const existingSnippet = await ctx.db.get(args.id);
    //console.log("EXTENTING SNIPPET", existingSnippet);
    if (!existingSnippet) {
      return null;
    }
    //console.log(author);
    // if (!author) {
    //   return null;
    // }
    // if (existingSnippet?.authorId !== author._id) {
    //   throw new Error("Unauthorized");
    // }

    const snippet = await ctx.db.patch(args.id as Id<"snippets">, {
      isPublic: args.isPublic,
    });

    return snippet;
  },
});
