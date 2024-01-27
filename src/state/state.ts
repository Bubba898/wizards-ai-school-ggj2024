import {card_type, game_state, player_state} from "../schemas/game_state";
import {z} from "zod";


type lobby = {
  player_0: z.infer<typeof player_state>
  player_1: z.infer<typeof player_state>
  all_joined: boolean
  pool: any[]
}

export const lobbies: {[key: string]: lobby} = {}


export function make_lobby(lobby_id: string) {
  lobbies[lobby_id] = {
    player_0: create_initial_player_state(),
    player_1: create_initial_player_state(),
    all_joined: false,
    pool: []
  }
  console.log(lobbies)
}

export function get_lobby(lobby_id: string) {
  console.log(lobbies)
  return lobbies[lobby_id]
}

export function get_lobby_game_state(lobby_id: string, player_id: number): z.infer<typeof game_state> {
  return lobbies[lobby_id]
}

function create_initial_player_state() {
  return {
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
