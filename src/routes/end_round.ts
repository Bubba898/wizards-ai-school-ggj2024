import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {z} from "zod";
import {game_state} from "../schemas/game_state";
import {game_state_request} from "../schemas/lobby";
import {
  get_lobby,
  get_player_state,
  resetBoard,
} from "../state/state";


export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/game_state/:lobby_id/:player_id/ready",
    {
      schema: {
        params: game_state_request,
        response: {
          200: game_state,
          404: z.object({error: z.string()})
        },
        tags: ["Game"],
        description: "Ends the round"
      }
    },
    async(request, reply) => {
      const { player_id, lobby_id } = request.params;
      const cards = request.body

      const lobby = get_lobby(lobby_id)
      if (!lobby) {
        reply.code(404).send({error: "Lobby not found"})
        return
      }

      const player_state = get_player_state(lobby_id, player_id)

      player_state.ready = true;

      if (lobby.player_0.ready && lobby.player_1.ready){
        await resetBoard(lobby)
      }
    }
  )
}
