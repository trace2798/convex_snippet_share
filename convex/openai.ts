"use node";
import OpenAI from "openai";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// Initialize the OpenAI client with the given API key
const apiKey = process.env.OPENAI_API_KEY!;
const baseURL = process.env.ANYSCALE_API_BASE_URL!;

const openai = new OpenAI({ apiKey, baseURL: baseURL });

export const chat = action({
  args: {
    content: v.string(),
    snippetId: v.string(),
  },

  handler: async (ctx, args) => {
    const response = await openai.chat.completions.create({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        {
          // Provide a 'system' message to give GPT context about how to respond
          role: "system",
          content:
            "add documentation to this code. It should be in this format:\n//in-line comment\n<Content>",
        },
        {
          // Pass on the chat user's message to GPT
          role: "user",
          content: args.content,
        },
      ],
    });

    // Pull the message content out of the response
    const messageContent = response.choices[0].message?.content;
    console.log("MESSAGE CONTENT", messageContent);
    await ctx.runMutation(api.snippet.updateContent, {
      id: args.snippetId as Id<"snippets">,
      content: messageContent ?? "",
    });
    return messageContent;
  },
});
