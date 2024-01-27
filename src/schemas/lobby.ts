import {z} from "zod";


export const lobby_id = z.string().min(5).max(5)

export const player_id = z.number().min(0).max(1)

export const game_state_request = z.object({
  player_id: player_id,
  lobby_id: lobby_id
})
