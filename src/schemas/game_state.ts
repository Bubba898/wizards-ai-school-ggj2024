import {z} from "zod";

export const card_type = z.enum(["character", "component", "merged"])

export const card = z.object({
  name: z.string(),
  type: card_type,
  url: z.string().optional(),
  cost: z.number(),
})

export const shop_state = z.object({
  cards: z.array(card),
})


export const player_state = z.object({
  balance: z.number().optional(),
  health: z.number(),
  shop: shop_state.optional(),
  hand: z.array(card).optional(),
  selected_cards: z.array(card).optional(),
  merged_card: card.optional(),
  amount_of_cards_in_hand: z.number().optional(),
  ready: z.boolean(),
})

export const game_state = z.object({
  player_0: player_state,
  player_1: player_state,
  fight: z.object({
    winner: z.enum(["0", "1"]).optional(),
    reason: z.string().optional(),
  }).optional(),
  round_counter: z.number().optional(),
}).optional()
