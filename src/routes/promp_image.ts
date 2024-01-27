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

        const image = await openai.images.generate({
            prompt,
            model: "dall-e-3"
        })

        const timeCompletion = new Date().getTime()

        return {
            dalleResponseUrl: image.data[0].url || "null",
            executionTimeMs: timeCompletion - timeStart
        }
    }
  )
}
