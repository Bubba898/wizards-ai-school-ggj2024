import {card_type} from "../schemas/game_state";
import {z} from "zod";

export type Card = {
    name: string
    action?: string
    type: z.infer<typeof card_type>
    cost: number
    amount: number
  url?: string
  }
  type Cards = Record<string, Card>


export const CARDS: Cards = {
  card_0: {
    name: "card_0",
    action: "card_0",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_1: {
    name: "card_1",
    action: "card_1",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_2: {
    name: "card_2",
    action: "card_2",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_3: {
    name: "card_3",
    action: "card_3",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_4: {
    name: "card_4",
    action: "card_4",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_5: {
    name: "card_5",
    action: "card_5",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_6: {
    name: "card_6",
    action: "card_6",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_7: {
    name: "card_7",
    action: "card_7",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_8: {
    name: "card_8",
    action: "card_8",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_9: {
    name: "card_9",
    action: "card_9",
    type: "component",
    cost: 1,
    amount: 5
  },
  card_10: {
    name: "card_10",
    action: "card_10",
    type: "component",
    cost: 1,
    amount: 5
  },
  card_11: {
    name: "card_11",
    action: "card_11",
    type: "component",
    cost: 1,
    amount: 5
  },
  card_12: {
    name: "card_12",
    action: "card_12",
    type: "component",
    cost: 1,
    amount: 5
  },
  card_13: {
    name: "card_13",
    action: "card_13",
    type: "component",
    cost: 1,
    amount: 5
  },
  card_14: {
    name: "card_14",
    action: "card_14",
    type: "component",
    cost: 1,
    amount: 5
  },
  card_15: {
    name: "card_15",
    action: "card_15",
    type: "component",
    cost: 1,
    amount: 5
  }
}
