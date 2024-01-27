import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {z} from "zod";
import {card_type, game_state} from "../schemas/game_state";
import {game_state_request, lobby_id} from "../schemas/lobby";
import {get_lobby, get_lobby_game_state} from "../state/state";


export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/game_state/:lobby_id/:player_id",
    {
      schema: {
        params: game_state_request,
        response: {
          200: game_state,
          404: z.object({error: z.string()})
        },
        tags: ["Game"],
        description: "Returns the game state"
      }
    },
    async(request, reply) => {
      const { player_id, lobby_id } = request.params
      const lobby = get_lobby(lobby_id)
      if (!lobby) {
        reply.code(404).send({error: "Lobby not found"})
        return
      }
      if(!lobby.all_joined) {
        return
      }
      return get_lobby_game_state(lobby_id, player_id)
    }
  )
}
