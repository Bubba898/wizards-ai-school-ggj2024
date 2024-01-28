import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {z} from "zod";
import {game_state} from "../schemas/game_state";
import {game_state_request} from "../schemas/lobby";
import {
  empty_shop,
  fight,
  get_lobby,
  get_lobby_game_state,
  get_player_state,
  merge, resetBoard, resetMergedCards,
  return_cards_to_pool
} from "../state/state";
import {Card, CARDS} from "../state/Cards";


export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/game_state/:lobby_id/:player_id/select_cards",
    {
      schema: {
        params: game_state_request,
        body:z.array(z.string()),
        response: {
          200: game_state,
          404: z.object({error: z.string()})
        },
        tags: ["Game"],
        description: "Selects cards"
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

      if(!player_state.hand) {
        player_state.hand = []
      }

      cards.forEach(card => {
        if(!player_state.hand.map((card) => card.name).includes(card)) {
          reply.code(400).send({error: "You don't have that card in your hand."})
          return
        }
      })

      const selected_cards: Card[] = []

      cards.forEach(card => {
        selected_cards.push(CARDS[card])
        player_state.hand = player_state.hand.filter((hand_card) => {
          return hand_card.name != card
        })
      })

      player_state.selected_cards = selected_cards

      return_cards_to_pool(lobby, selected_cards)
      empty_shop(lobby_id, player_id)

      resetMergedCards(lobby, player_id)
      player_state.merged_card = await merge(selected_cards, lobby)
      player_state.has_merged = true

      const game_state = get_lobby_game_state(lobby_id, player_id)
      reply.code(200).send(game_state)

      if (lobby.player_0.has_merged && lobby.player_1.has_merged) {
        fight(lobby).then(async(fight) => {
          lobby.fights.push(fight)
          await resetBoard(lobby)
        })
      }
    }
  )
}
