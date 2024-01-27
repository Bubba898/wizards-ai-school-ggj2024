import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {z} from "zod";
import {card_type, game_state} from "../schemas/game_state";
import {game_state_request, lobby_id} from "../schemas/lobby";
import {get_lobby} from "../state/state";


export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/game_state",
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
      return {
        player_0: {
          balance: 100,
          health: 100,
          shop: {
            cards: ["card_1", "card_2", "card_3"]
          },
          hand: [
            {
              type: card_type.enum.character,
              name: "character_1"
            },
            {
              type: card_type.enum.component,
              name: "component_1"
            }
          ]
        },
        player_1: {
          balance: 100,
          health: 100,
          shop: {
            cards: ["card_1", "card_2", "card_3"]
          },
          hand: [
            {
              type: card_type.enum.character,
              name: "character_1"
            },
            {
              type: card_type.enum.component,
              name: "component_1"
            }
          ]
        }
      }
    }
  )
}
