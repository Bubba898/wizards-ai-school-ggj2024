import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {z} from "zod";
import {card_type, game_state} from "../schemas/game_state";


export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/shop",
    {
      schema: {
        params: z.object({
            player_id: z.string()
          }),
        response: {
          200: game_state,
        },
        tags: ["Ping"],
        description: "Returns a Pong"
      }
    },
    async(request) => {
      const { player_id } = request.params
      return {
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
        },
        player_2: {
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
