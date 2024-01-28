import {z} from "zod";

export const PromptBody = z.object({
  prompt: z.string(),
  lobby_id: z.string(),
})

export const PromptResponse = z.object({
  gptResponse: z.string(),
  executionTimeMs: z.number()
})

export const ImageResponse = z.object({
  dalleResponseUrl: z.string(),
  executionTimeMs: z.number()
})

export const AudioResponse = z.object({
  audioUrl: z.string(),
  executionTimeMs: z.number()
})