import {ZodTypeProvider} from "fastify-type-provider-zod";
import fastify, {FastifyInstance} from "fastify";
import {lobby_id} from "../schemas/lobby";
import {z} from "zod";
import {make_id} from "../utils/id";
import {get_lobby, get_lobby_game_state, make_lobby} from "../state/state";
import {game_state} from "../schemas/game_state";

export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/lobby/:lobby_id",
    {
      schema: {
        params: z.object({lobby_id: lobby_id}),
        response: {
          200: game_state,
          404: z.object({error: z.string()})
        },
        tags: ["Lobby"],
        description: "Joins a lobby"
      }
    },
    async(request, reply) => {
      const lobby_id = request.params.lobby_id
      const lobby = get_lobby(lobby_id)
      if(!lobby) {
        reply.code(404).send({error: "Lobby not found"})
        return
      }
      lobby.all_joined = true
      return get_lobby_game_state(lobby_id, 1)
    }
  )
}
