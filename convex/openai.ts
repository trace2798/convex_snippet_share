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
    language: v.string(),
  },

  handler: async (ctx, args) => {
    const response = await openai.chat.completions.create({
      model: "codellama/CodeLlama-34b-Instruct-hf",
      stream: true,
      messages: [
        {
          // Provide a 'system' message to give GPT context about how to respond
          role: "system",
          content: `Provide a brief explanation of what this code is doing. The code is written in ${args.language}. Generate the answer in a readable format with multiple paragraphs. `,
        },
        {
          // Pass on the chat user's message to GPT
          role: "user",
          content: args.content,
        },
      ],
    });
    let messageContent = "";
    for await (const part of response) {
      if (part.choices[0].delta?.content) {
        messageContent += part.choices[0].delta.content;
        // Alternatively you could wait for complete words / sentences.
        // Here we send an update on every stream message.
        await ctx.runMutation(api.snippet.updateNote, {
          id: args.snippetId as Id<"snippets">,
          notes: messageContent ?? "",
        });
      }
    }
    // Pull the message content out of the response
    // const messageContent = response.choices[0].message?.content;
    // console.log("MESSAGE CONTENT", messageContent);
    // await ctx.runMutation(api.snippet.updateNote, {
    //   id: args.snippetId as Id<"snippets">,
    //   notes: messageContent ?? "",
    // });
    // return messageContent;
  },
});
