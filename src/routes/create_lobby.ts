import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {lobby_id} from "../schemas/lobby";
import {z} from "zod";
import {make_id} from "../utils/id";
import {make_lobby} from "../state/state";

export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/lobby",
    {
      schema: {
        body: z.object({open_ai_api_key: z.string()}),
        response: {
          200: z.object({lobby_id: lobby_id}),
        },
        tags: ["Lobby"],
        description: "Returns a lobby id"
      }
    },
    async(request) => {
      const id = make_id(5)
      const open_ai_api_key = request.body.open_ai_api_key
      make_lobby(id, open_ai_api_key)
      return {lobby_id: id}
    }
  )
}
