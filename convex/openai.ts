"use node";
import OpenAI from "openai";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// Initialize the OpenAI client with the given API key
const apiKey = process.env.OPENAI_API_KEY!;
const baseURL = process.env.ANYSCALE_API_BASE_URL!;

const openai = new OpenAI({ apiKey, baseURL: baseURL });

export const chat = action({
  args: {
    content: v.string(),
    snippetId: v.string(),
    language: v.string(),
    userId: v.id("users"),
  },

  handler: async (ctx, args) => {
    // const snippet = await ctx.db.get(args.snippetId as Id<"snippets">);

    const response = await openai.chat.completions.create({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      // stream: true,
      messages: [
        {
          // Provide a 'system' message to give GPT context about how to respond
          role: "system",
          content: `Provide a brief explanation of what this code is doing. The code is written in ${args.language}. Generate the answer in markdown format. `,
        },
        {
          // Pass on the chat user's message to GPT
          role: "user",
          content: args.content,
        },
      ],
    });
    // let messageContent = "";
    // try {
    //   for await (const part of response) {
    //     if (part.choices[0].delta?.content) {
    //       messageContent += part.choices[0].delta.content;
    //       // console.log("MESSAGE CONTENT", messageContent);
    //       // Alternatively you could wait for complete words / sentences.
    //       // Here we send an update on every stream message.
    //       await ctx.runMutation(api.snippet.updateNote, {
    //         id: args.snippetId as Id<"snippets">,
    //         notes: messageContent ?? "",
    //       });
    //     }
    //   }
    //   await ctx.runMutation(internal.users.increaseUserAICount, {
    //     userId: args.userId as Id<"users">,
    //   });
    //   await ctx.runMutation(internal.aiactivity.create, {
    //     userId: args.userId as Id<"users">,
    //     snippetId: args.snippetId as Id<"snippets">,
    //     content: messageContent,
    //   });
    // } catch (error) {
    //   // console.log(error);
    // }

    // Pull the message content out of the response
    try {
      const messageContent = response.choices[0].message?.content;
      // console.log("MESSAGE CONTENT", messageContent);
      await ctx.runMutation(api.snippet.updateNote, {
        id: args.snippetId as Id<"snippets">,
        notes: messageContent ?? "",
        userId: args.userId as Id<"users">,
      });
      await ctx.runMutation(internal.users.increaseUserAICount, {
        userId: args.userId as Id<"users">,
      });
      await ctx.runMutation(internal.aiactivity.create, {
        userId: args.userId as Id<"users">,
        snippetId: args.snippetId as Id<"snippets">,
        content: messageContent || "",
      });
      // return messageContent;
    } catch (error) {
      // console.log(error);
    }
  },
});
