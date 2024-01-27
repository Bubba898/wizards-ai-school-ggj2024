import OpenAI from "openai";

const KEY = process.env.OPENAI_API_KEY || "";

export const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY || ""});
