import {z} from "zod";


export const lobby_id = z.string().min(5).max(5)

export const PlayerId = z.enum(["0", "1"])

export const game_state_request = z.object({
  player_id: PlayerId,
  lobby_id: lobby_id
})
