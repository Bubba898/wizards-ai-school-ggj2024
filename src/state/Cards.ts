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


export const CARDS: Cards = [
  {
    "Type": 0,
    "Name": "Cat",
    "Action": ""
  },
  {
    "Type": 0,
    "Name": "Dinosaur",
    "Action": ""
  },
  {
    "Type": 0,
    "Name": "Gorilla",
    "Action": ""
  },
  {
    "Type": 0,
    "Name": "Knight",
    "Action": ""
  },
  {
    "Type": 0,
    "Name": "Pirate",
    "Action": ""
  },
  {
    "Type": 0,
    "Name": "Wizard",
    "Action": ""
  },
  {
    "Type": 1,
    "Name": "Bionic_Arm",
    "Action": "wearing a "
  },
  {
    "Type": 1,
    "Name": "Force_Field_Shield",
    "Action": "holding a "
  },
  {
    "Type": 1,
    "Name": "Frying_Pan",
    "Action": "holding a "
  },
  {
    "Type": 1,
    "Name": "Jetpack",
    "Action": "wearing a "
  },
  {
    "Type": 1,
    "Name": "Laser_Glasses",
    "Action": "wearing "
  },
  {
    "Type": 1,
    "Name": "Magnetic_Glove",
    "Action": "wearing a "
  }
]
