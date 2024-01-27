import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {TestParam, TestResponse} from "../schemas";
import {openai} from "../openai/openai";


export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/prompt/:promp",
    {
      schema: {
        params: TestParam,
        response: {
          200: TestResponse,
        },
        tags: ["Prompt"],
        description: "Asks Chat GPT"
      }
    },
    async(request) => {
      const completion = await openai.chat.completions.create({
      messages: [{"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Who won the world series in 2020?"},
          {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
          {"role": "user", "content": "Where was it played?"}],
      model: "gpt-3.5-turbo",
    });
      const { ping } = request.params
      return {pong: ping}
    }
  )
}
