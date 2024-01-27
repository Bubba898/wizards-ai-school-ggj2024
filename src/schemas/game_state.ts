import {z} from "zod";

export const card_type = z.enum(["character", "component", "merged"])

export const card = z.object({
  name: z.string(),
  description: z.string(),
  type: card_type,
  cost: z.number(),
  url: z.string().optional(),
})


export const merged_card = z.object({
  name: z.string(),
  description: z.string(),
  image_url: z.string(),
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
})

export const game_state = z.object({
  player_0: player_state,
  player_1: player_state,
}).optional()
