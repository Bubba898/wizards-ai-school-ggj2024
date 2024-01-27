import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {z} from "zod";
import {game_state} from "../schemas/game_state";
import {game_state_request} from "../schemas/lobby";
import {get_lobby, get_lobby_game_state, get_player_state, return_cards_to_pool} from "../state/state";
import {CARDS} from "../state/Cards";


export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/game_state/:lobby_id/:player_id/buy_cards",
    {
      schema: {
        params: game_state_request,
        body: z.array(z.string()),
        response: {
          200: game_state,
          404: z.object({error: z.string()})
        },
        tags: ["Game"],
        description: "Buys cards"
      }
    },
    async(request, reply) => {
      const { player_id, lobby_id } = request.params
      const cards = request.body
      const player_state = get_player_state(lobby_id, player_id)

      const lobby = get_lobby(lobby_id)
      if (!lobby) {
        reply.code(404).send({error: "Lobby not found"})
        return
      }

      if(!player_state.hand) {
        player_state.hand = []
      }

      cards.forEach(card => {
        if(!player_state.shop.cards.map((card) => card.name).includes(card)) {
          reply.code(400).send({error: "You don't have that card in the shop."})
          return
        }
      })

      const combined_cost = cards.map((card) => {
        return CARDS[card].cost
      }).reduce((acc: number, cost) => {
        return acc + cost
      })

      if(player_state.balance < combined_cost) {
        reply.code(400).send({error: "Not enough money"})
        return
      }

      cards.forEach(card => {
        player_state.hand.push(CARDS[card])
        player_state.shop.cards = player_state.shop.cards.filter((shop_card) => {
          return shop_card.name !== card
        })
      })

      return_cards_to_pool(lobby, player_state.shop.cards)
      return get_lobby_game_state(lobby_id, player_id)
    }
  )
}
