import {z} from "zod";

export const merged_card = z.object({
  name: z.string(),
  description: z.string(),
  image_url: z.string(),
})

export const card_type = z.enum(["character", "component"])

export const card = z.object({
  type: card_type,
  name: z.string(),
})


export const shop_state = z.object({
  cards: z.array(z.string()),
})


export const player_state = z.object({
  balance: z.number(),
  health: z.number(),
  shop: shop_state.optional(),
  hand: z.array(card),
  merged_card: merged_card.optional(),
})

export const game_state = z.object({
  player_0: player_state,
  player_1: player_state,
}).optional()
