import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {ImageResponse, PromptBody} from "../schemas/prompt";
import OpenAI from "openai";


export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/promptImage",
    {
      schema: {
          body: PromptBody,
          response: {
              200: ImageResponse,
          },
          tags: ["Prompt"],
          description: "Asks DALL-E to generate an image"
      }
      },
    async(request) => {
        const { prompt } = request.body

        const timeStart = new Date().getTime()

        const result = await prompt_image(prompt, "")

        const timeCompletion = new Date().getTime()

        return {
            dalleResponseUrl: result,
            executionTimeMs: timeCompletion - timeStart
        }
    }
  )
}


export async function prompt_image(prompt : string, key: string){


    const image = await new OpenAI({apiKey: key}).images.generate({
        prompt,
        model: "dall-e-3"
    })

    return image.data[0].url || "null"
}
