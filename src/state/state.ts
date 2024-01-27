import {card_type, game_state, player_state} from "../schemas/game_state";
import {z} from "zod";
import {PlayerId} from "../schemas/lobby";
import {Card, CARDS} from "./Cards";

type PlayerState = {
  health: number
  balance: number
  shop: {
    cards: Card[]
  }
  hand: Card[]
  selected_cards: Card[]
}

type Lobby = {
  player_0: PlayerState
  player_1: PlayerState
  all_joined: boolean
  pool: ShopPool
}

type ShopPool = {
  cards: {
    name: string
    description: string
    amount: number
    type: z.infer<typeof card_type>
    cost: number
  }[]
}

export const lobbies: {[key: string]: Lobby} = {}


export function make_lobby(lobby_id: string) {
  lobbies[lobby_id] = {
    player_0: create_initial_player_state(),
    player_1: create_initial_player_state(),
    all_joined: false,
    pool: get_initial_pool()
  }
  generate_shop(lobby_id, "0")
  generate_shop(lobby_id, "1")
  console.log(lobbies)
}

export function get_lobby(lobby_id: string) {
  console.log(lobbies)
  return lobbies[lobby_id]
}

export function get_lobby_game_state(lobby_id: string, player_id: z.infer<typeof PlayerId>): z.infer<typeof game_state> {
  if (player_id == "0") {
    return {
      player_0: lobbies[lobby_id].player_0,
      player_1: {
        health: lobbies[lobby_id].player_1.health,
      }
    }
  }
  return {
    player_0: {
      health: lobbies[lobby_id].player_0.health,
    },
    player_1: lobbies[lobby_id].player_0
  }
}

function create_initial_player_state() {
  return {
    balance: 100,
    health: 100,
    shop: {
      cards: []
    },
    hand: [],
    selected_cards: []
  }
}

export function get_player_state(lobby_id: string, player_id: z.infer<typeof PlayerId>) {
  if (player_id == "0") {
    return lobbies[lobby_id].player_0
  }
  return lobbies[lobby_id].player_1
}



function generate_shop(lobby_id: string, player_id: z.infer<typeof PlayerId>) {
  const amount = 5
  const cards: Card[] = []
  for (let i = 0; i < amount; i++) {
    const random_shop_pool_index = Math.floor(Math.random() * lobbies[lobby_id].pool.cards.length)
    cards.push(lobbies[lobby_id].pool.cards[random_shop_pool_index])
    lobbies[lobby_id].pool.cards[random_shop_pool_index].amount -= 1
    if (lobbies[lobby_id].pool.cards[random_shop_pool_index].amount == 0) {
      lobbies[lobby_id].pool.cards.splice(random_shop_pool_index, 1)
    }
  }
  // ensure cards has at least on of type character and one of type component
  const has_character = cards.find((card) => {
    return card.type == card_type.enum.character
  })
  const has_component = cards.find((card) => {
    return card.type == card_type.enum.component
  })
  if (!has_character || !has_component) {
    generate_shop(lobby_id, player_id)
  }
  if (player_id == "0") {
    lobbies[lobby_id].player_0.shop = {
      cards: cards
    }
  } else {
    lobbies[lobby_id].player_1.shop = {
      cards: cards
    }
  }
}

function get_initial_pool(): ShopPool {
  return {cards: Object.values(CARDS)}
}

export function return_cards_to_pool(lobby_id: string, player_id: z.infer<typeof PlayerId>, cards: Card[]) {
  cards.forEach(card => {
    const card_index = lobbies[lobby_id].pool.cards.findIndex((hand_card) => {
      return hand_card.name == card.name
    })
    if(card_index === -1) {
      lobbies[lobby_id].pool.cards.push(card)
    } else {
      lobbies[lobby_id].pool.cards[card_index].amount += 1
    }
  })
}

export function next_round(lobby_id: string) {
  generate_shop(lobby_id, "0")
  generate_shop(lobby_id, "1")
  lobbies[lobby_id].player_0.selected_cards = []
  lobbies[lobby_id].player_1.selected_cards = []
}

export function fight(lobby_id: string) {
  console.log("fight")
}
