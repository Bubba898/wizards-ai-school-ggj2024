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
    amount: 1
  },
  Dinosaur: {
    type: "character",
    name: "Dinosaur",
    cost: 1,
    amount: 1
  },
  Gorilla: {
    type: "character",
    name: "Gorilla",
    cost: 1,
    amount: 1
  },
  Knight: {
    type: "character",
    name: "Knight",
    cost: 1,
    amount: 1
  },
  Pirate: {
    type: "character",
    name: "Pirate",
    cost: 1,
    amount: 1
  },
  Wizard: {
    type: "character",
    name: "Wizard",
    cost: 1,
    amount: 1
  },
  Bionic_Arm: {
    type: "component",
    name: "Bionic_Arm",
    action: "wearing a ",
    cost: 1,
    amount: 1,
  },
  Force_Field_Shield: {
    type: "component",
    name: "Force_Field_Shield",
    action: "holding a ",
    cost: 1,
    amount: 1,
  },
  Frying_Pan: {
    type: "component",
    name: "Frying_Pan",
    action: "holding a ",
    cost: 1,
    amount: 1,
  },
  Jetpack: {
    type: "component",
    name: "Jetpack",
    action: "wearing a ",
    cost: 1,
    amount: 1,
  },
  Laser_Glasses: {
    type: "component",
    name: "Laser_Glasses",
    action: "wearing ",
    cost: 1,
    amount: 1,
  },
  Magnetic_Glove: {
    type: "component",
    name: "Magnetic_Glove",
    action: "wearing a ",
    cost: 1,
    amount: 1,
  }
}
