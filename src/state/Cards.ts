import {card_type} from "../schemas/game_state";
import {z} from "zod";

export type Card = {
    name: string
    description: string
    type: z.infer<typeof card_type>
    cost: number
    amount: number
  }
  type Cards = Record<string, Card>


export const CARDS: Cards = {
  card_0: {
    name: "card_0",
    description: "card_0",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_1: {
    name: "card_1",
    description: "card_1",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_2: {
    name: "card_2",
    description: "card_2",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_3: {
    name: "card_3",
    description: "card_3",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_4: {
    name: "card_4",
    description: "card_4",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_5: {
    name: "card_5",
    description: "card_5",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_6: {
    name: "card_6",
    description: "card_6",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_7: {
    name: "card_7",
    description: "card_7",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_8: {
    name: "card_8",
    description: "card_8",
    type: "character",
    cost: 1,
    amount: 5
  },
  card_9: {
    name: "card_9",
    description: "card_9",
    type: "component",
    cost: 1,
    amount: 5
  },
  card_10: {
    name: "card_10",
    description: "card_10",
    type: "component",
    cost: 1,
    amount: 5
  },
  card_11: {
    name: "card_11",
    description: "card_11",
    type: "component",
    cost: 1,
    amount: 5
  },
  card_12: {
    name: "card_12",
    description: "card_12",
    type: "component",
    cost: 1,
    amount: 5
  },
  card_13: {
    name: "card_13",
    description: "card_13",
    type: "component",
    cost: 1,
    amount: 5
  },
  card_14: {
    name: "card_14",
    description: "card_14",
    type: "component",
    cost: 1,
    amount: 5
  },
  card_15: {
    name: "card_15",
    description: "card_15",
    type: "component",
    cost: 1,
    amount: 5
  }
}
