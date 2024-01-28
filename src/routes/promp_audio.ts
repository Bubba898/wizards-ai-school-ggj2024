import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {AudioResponse, PromptBody} from "../schemas/prompt";
import OpenAI from "openai";
import {lobbies} from "../state/state";


export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/promptAudio",
    {
      schema: {
          body: PromptBody,
          response: {
              200: AudioResponse,
          },
          tags: ["Prompt"],
          description: "Uses TTS to generate audio from text"
      }
      },
    async(request) => {
        const { prompt, lobby_id } = request.body

        const timeStart = new Date().getTime()

        const result = await prompt_audio(prompt, lobbies[lobby_id]?.open_ai_api_key ?? "")

        const timeCompletion = new Date().getTime()

        return {
            audioUrl: result,
            executionTimeMs: timeCompletion - timeStart
        }
    }
  )
}

export async function prompt_audio(prompt : string, key: string){
    const audio = await new OpenAI({apiKey: key}).audio.speech.create({
        input: prompt,
        voice: "onyx",
        model: "tts-1-hd"
    })

    return `${audio}`;
}
