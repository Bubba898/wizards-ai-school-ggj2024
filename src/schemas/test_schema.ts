import {z} from "zod";

export const TestParam = z.object({
  ping: z.string()
})


export const TestResponse = z.object({
  pong: z.string()
})
