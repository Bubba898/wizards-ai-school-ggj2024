import {card_type, game_state} from "../schemas/game_state";
import {z} from "zod";
import {PlayerId} from "../schemas/lobby";
import {Card, CARDS} from "./Cards";
import {prompt_image} from "../routes/promp_image";
import {prompt_json} from "../routes/promp_json";

type PlayerState = {
  health: number
  balance: number
  shop: {
    cards: Card[]
  }
  hand: Card[]
  selected_cards?: Card[]
  merged_card?: Card
  has_merged: boolean
  amount_of_cards_in_hand?: number
  ready: boolean
}

type Lobby = {
  player_0: PlayerState
  player_1: PlayerState
  all_joined: boolean
  pool: ShopPool
  fight?: Fight
  open_ai_api_key?: string
  round_counter: number
}

type ShopPool = {
  cards: Card[]
}

type Fight = {
  winner?: "0" | "1"
  reason?: string
}

export const lobbies: {[key: string]: Lobby} = {}


export function make_lobby(lobby_id: string, open_ai_api_key: string) {
  const lobby = lobbies[lobby_id] = {
    player_0: create_initial_player_state(),
    player_1: create_initial_player_state(),
    all_joined: false,
    pool: get_initial_pool(),
    open_ai_api_key: Object.keys(process.env).includes(open_ai_api_key) ? process.env[open_ai_api_key] : open_ai_api_key,
    round_counter: 0
  }

  generate_opening_hand(lobby, "0", 4)
  generate_opening_hand(lobby, "1", 4)

  generate_shop(lobby, "0", 1)
  generate_shop(lobby, "1", 1)
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
        amount_of_cards_in_hand: lobbies[lobby_id].player_1.hand.length,
        merged_card: lobbies[lobby_id].player_1.merged_card,
        ready: lobbies[lobby_id].player_1.ready
      },
      fight: lobbies[lobby_id].fight,
      round_counter: lobbies[lobby_id].round_counter
    }
  }
  return {
    player_0: {
      health: lobbies[lobby_id].player_0.health,
      amount_of_cards_in_hand: lobbies[lobby_id].player_0.hand.length,
      merged_card: lobbies[lobby_id].player_0.merged_card,
      ready: lobbies[lobby_id].player_0.ready
    },
    player_1: lobbies[lobby_id].player_1,
    fight: lobbies[lobby_id].fight,
    round_counter: lobbies[lobby_id].round_counter
  }
}

function create_initial_player_state(): PlayerState {
  return {
    balance: 5,
    health: 3,
    shop: {
      cards: []
    },
    hand: [],
    selected_cards: undefined,
    merged_card: undefined,
    has_merged: false,
    ready: false
  }
}

export function get_player_state(lobby_id: string, player_id: z.infer<typeof PlayerId>) {
  if (player_id == "0") {
    return lobbies[lobby_id].player_0
  }
  return lobbies[lobby_id].player_1
}



function generate_opening_hand(lobby: Lobby, player_id: z.infer<typeof PlayerId>, amount : number) {

  const cards = pull_cards_from_pool(lobby, amount)

  if (player_id == "0") {
    lobby.player_0.hand = cards
  } else {
    lobby.player_1.hand = cards
  }
}

function generate_shop(lobby: Lobby, player_id: z.infer<typeof PlayerId>, amount : number) {

  const cards = pull_cards_from_pool(lobby, amount)

  if (player_id == "0") {
    lobby.player_0.shop = {
      cards: cards
    }
  } else {
    lobby.player_1.shop = {
      cards: cards
    }
  }
}

function pull_cards_from_pool(lobby: Lobby, amount : number) {
  const cards: Card[] = []
  for (let i = 0; i < amount; i++) {
    const random_shop_pool_index = Math.floor(Math.random() * lobby.pool.cards.length)
    cards.push(lobby.pool.cards[random_shop_pool_index])
    lobby.pool.cards[random_shop_pool_index].amount -= 1
    if (lobby.pool.cards[random_shop_pool_index].amount == 0) {
      lobby.pool.cards.splice(random_shop_pool_index, 1)
    }
  }
  // ensure cards has at least on of type character and one of type component
  const has_character = cards.find((card) => {
    return card.type == card_type.enum.character
  })

  if (!has_character) {
    return pull_cards_from_pool(lobby, amount)
  }

  const has_component = cards.find((card) => {
    return card.type == card_type.enum.component
  })

  if (amount >= 3 && !has_component){
    return pull_cards_from_pool(lobby, amount)
  }

  return cards
}

function get_initial_pool(): ShopPool {
  return {cards: Object.values(CARDS)}
}

export function return_cards_to_pool(lobby: Lobby, cards: Card[]) {
  cards.forEach(card => {
    const card_index = lobby.pool.cards.findIndex((hand_card) => {
      return hand_card.name == card.name
    })
    if(card_index === -1) {
      lobby.pool.cards.push(card)
    } else {
      lobby.pool.cards[card_index].amount += 1
    }
  })
}

export function empty_shop(lobby_id: string, player_id: string) {
  if (player_id == "0") {
    lobbies[lobby_id].player_0.shop = {
      cards: []
    }
  } else {
    lobbies[lobby_id].player_1.shop = {
      cards: []
    }
  }
}

export async function merge(cards: Card[], lobby: Lobby): Promise<Card | undefined>{

  if (cards.length === 0)
    return undefined

  if (cards.length === 1)
    return cards[0]

  const characterCards = cards.filter(card => card.type === card_type.enum.character).map(card => card.name)
  const componentCards = cards.filter(card => card.type === card_type.enum.component).map(card => `${card.action} ${card.name}`)

  const prompt = `Create a vibrant and humorous illustration of a character, a fusion of ${characterCards.join(", ")}, engaging in the action of ${componentCards.join(" and ")}, in a consistent, whimsical, and cartoon-ish art style. The illustration should depict the amalgamated character actively interacting with or using the component in the described manner. The character should be a seamless blend of the character elements, while the component with its associated action adds a dynamic and distinctive aspect to the scene. The design should be ideal for a card auto battler game, radiating a playful and entertaining atmosphere. The fusion character should be clearly visible and identifiable, capturing the essence of each character element and dynamically incorporating the component with the verb, contributing to the overall humorous and lighthearted theme of the game. Use bright and engaging colors to highlight the unique fusion and the playful essence of the image.`

  const url = await prompt_image(prompt, lobby.open_ai_api_key || "")

  return {
    name: `${characterCards.join("-")} ${componentCards.join(" and ")}`,
    type: card_type.enum.merged,
    cost: 0,
    amount: 1,
    url,
  }
}



export async function fight(lobby: Lobby): Promise<Fight> {


  const player0CharacterCards = lobby.player_0.selected_cards?.filter(card => card.type === card_type.enum.character).map(card => card.name)
  const player0ComponentCards = lobby.player_0.selected_cards?.filter(card => card.type === card_type.enum.component).map(card => `${card.action} ${card.name}`)

  const player1CharacterCards = lobby.player_1.selected_cards?.filter(card => card.type === card_type.enum.character).map(card => card.name)
  const player1ComponentCards = lobby.player_1.selected_cards?.filter(card => card.type === card_type.enum.component).map(card => card.action)


  if (player0CharacterCards === undefined && player1ComponentCards === undefined)
    return {}

  if (player0CharacterCards === undefined)
    return {winner: "1", reason: "Player 0 passed the turn"}

  if (player1CharacterCards === undefined)
    return {winner: "0", reason: "Player 1 passed the turn"}

  const prompt = `Evaluate the ludicrous card combo showdown below, pulled from an avant-garde card game, and declare the round champ. Every card is an amusing mashup of personalities and escapades. With a dollop of mirth, succinctly justify your winner's choice.

  Player 0: fusion of ${player0CharacterCards.join(", ")}${player0ComponentCards ? `, engaging in the action of ${player0ComponentCards.join(" and ")}` : ""}
  Player 1: fusion of ${player1CharacterCards.join(", ")}${player1ComponentCards ? `, engaging in the action of ${player1ComponentCards.join(" and ")}` : ""}
  Try really hard to find a result, draws or being inconclusive is not an option.
  Give me the response in a json with the winning player and the reason`

  const fightResult = await prompt_json(prompt, lobby.open_ai_api_key || "")

  const parsedFight = JSON.parse(fightResult)

  const winnerKey = Object.keys(parsedFight).find((key :string) => key.includes("win"))

  if (winnerKey === undefined)
    return {}

  const winner = parsedFight[winnerKey].includes("0") ? "0" : "1"

  const reason = Object.keys(parsedFight).includes("reason") ? parsedFight.reason : "Because it's better."


  generate_shop(lobby, "0", 5)
  generate_shop(lobby, "1", 5)
  if(winner === "0") {
    lobby.player_1.health -= 1
  } else {
    lobby.player_0.health -= 1
  }

  return {winner, reason}
}

export async function resetBoard(lobby : Lobby){
  lobby.fight = undefined
  lobby.round_counter++

  lobby.player_0.selected_cards = undefined
  lobby.player_1.selected_cards = undefined
  lobby.player_0.has_merged = false
  lobby.player_1.has_merged = false
  lobby.player_0.merged_card = undefined
  lobby.player_1.merged_card = undefined
  lobby.player_0.ready = false
  lobby.player_1.ready = false
}

export function resetMergedCards(lobby : Lobby, player: z.infer<typeof PlayerId>){
  if (player == "0") {
    lobby.player_0.merged_card = undefined
    return
  }
  lobby.player_1.merged_card = undefined
}
