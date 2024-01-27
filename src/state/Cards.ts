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
  Cat: {
    type: "character",
    name: "Cat",
    cost: 1,
    amount: 5
  },
  Dinosaur: {
    type: "character",
    name: "Dinosaur",
    cost: 1,
    amount: 5
  },
  Gorilla: {
    type: "character",
    name: "Gorilla",
    cost: 1,
    amount: 5
  },
  Knight: {
    type: "character",
    name: "Knight",
    cost: 1,
    amount: 5
  },
  Pirate: {
    type: "character",
    name: "Pirate",
    cost: 1,
    amount: 5
  },
  Wizard: {
    type: "character",
    name: "Wizard",
    cost: 1,
    amount: 5
  },
  Bionic_Arm: {
    type: "component",
    name: "Bionic_Arm",
    action: "wearing a ",
    cost: 1,
    amount: 5,
  },
  Force_Field_Shield: {
    type: "component",
    name: "Force_Field_Shield",
    action: "holding a ",
    cost: 1,
    amount: 5,
  },
  Frying_Pan: {
    type: "component",
    name: "Frying_Pan",
    action: "holding a ",
    cost: 1,
    amount: 5,
  },
  Jetpack: {
    type: "component",
    name: "Jetpack",
    action: "wearing a ",
    cost: 1,
    amount: 5,
  },
  Laser_Glasses: {
    type: "component",
    name: "Laser_Glasses",
    action: "wearing ",
    cost: 1,
    amount: 5,
  },
  Magnetic_Glove: {
    type: "component",
    name: "Magnetic_Glove",
    action: "wearing a ",
    cost: 1,
    amount: 5,
  }
}
