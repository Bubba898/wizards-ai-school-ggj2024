import {z} from "zod";

export const PromptBody = z.object({
  prompt: z.string()
})

export const PromptResponse = z.object({
  gptResponse: z.string(),
  executionTimeMs: z.number()
})