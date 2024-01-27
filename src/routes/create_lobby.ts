import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {lobby_id} from "../schemas/lobby";
import {z} from "zod";
import {make_id} from "../utils/id";
import {make_lobby} from "../state/state";

export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/lobby/",
    {
      schema: {
        response: {
          200: z.object({lobby_id: lobby_id}),
        },
        tags: ["Lobby"],
        description: "Returns a lobby lobby_id"
      }
    },
    async(request) => {
      const id = make_id(5)
      make_lobby(id)
      return {lobby_id: id}
    }
  )
}
