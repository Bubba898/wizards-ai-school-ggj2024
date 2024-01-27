import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {openai} from "../openai/openai";
import {ImageResponse, PromptBody} from "../schemas/prompt";


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

        const result = await prompt_image(prompt)

        const timeCompletion = new Date().getTime()

        return {
            dalleResponseUrl: result,
            executionTimeMs: timeCompletion - timeStart
        }
    }
  )
}


export async function prompt_image(prompt : string) {


    const image = await openai.images.generate({
        prompt,
        model: "dall-e-3"
    })

    return image.data[0].url || "null"
}
