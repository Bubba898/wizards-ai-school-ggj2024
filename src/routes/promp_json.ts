import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {openai} from "../openai/openai";
import {PromptBody, PromptResponse} from "../schemas/prompt";


export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/promptJson",
    {
      schema: {
          body: PromptBody,
          response: {
              200: PromptResponse,
          },
          tags: ["Prompt"],
          description: "Asks Chat GPT using format type Json"
      }
      },
    async(request) => {
        const { prompt } = request.body

        const timeStart = new Date().getTime()

        const json = await prompt_json(prompt)

        const timeCompletion = new Date().getTime()

        return {
            gptResponse: json,
            executionTimeMs: timeCompletion - timeStart
        }
    }
  )
}

export async function prompt_json(prompt : string){
    const completion = await openai.chat.completions.create({
        messages: [{"role": "user", "content": prompt}],
        model: "gpt-4-1106-preview",
        response_format: {type: "json_object"}
    });

    return completion.choices[0]?.message?.content || "null"
}
