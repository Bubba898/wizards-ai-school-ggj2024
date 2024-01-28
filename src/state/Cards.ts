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
  Astronaut: {
    type: 'character',
    name: "Astronaut",
    action: "",
    cost: 1,
    amount: 1
  },
  Bee: {
    type: 'character',
    name: "Bee",
    action: "",
    cost: 1,
    amount: 1
  },
  Cat: {
    type: 'character',
    name: "Cat",
    action: "",
    cost: 1,
    amount: 1
  },
  Caveman: {
    type: 'character',
    name: "Caveman",
    action: "",
    cost: 1,
    amount: 1
  },
  Chicken: {
    type: 'character',
    name: "Chicken",
    action: "",
    cost: 1,
    amount: 1
  },
  Clown: {
    type: 'character',
    name: "Clown",
    action: "",
    cost: 1,
    amount: 1
  },
  Cowboy: {
    type: 'character',
    name: "Cowboy",
    action: "",
    cost: 1,
    amount: 1
  },
  Dinosaur: {
    type: 'character',
    name: "Dinosaur",
    action: "",
    cost: 1,
    amount: 1
  },
  Ghost: {
    type: 'character',
    name: "Ghost",
    action: "",
    cost: 1,
    amount: 1
  },
  Gorilla: {
    type: 'character',
    name: "Gorilla",
    action: "",
    cost: 1,
    amount: 1
  },
  Kangaroo: {
    type: 'character',
    name: "Kangaroo",
    action: "",
    cost: 1,
    amount: 1
  },
  Knight: {
    type: 'character',
    name: "Knight",
    action: "",
    cost: 1,
    amount: 1
  },
  Mermaid: {
    type: 'character',
    name: "Mermaid",
    action: "",
    cost: 1,
    amount: 1
  },
  Ninja: {
    type: 'character',
    name: "Ninja",
    action: "",
    cost: 1,
    amount: 1
  },
  Octopus: {
    type: 'character',
    name: "Octopus",
    action: "",
    cost: 1,
    amount: 1
  },
  Penguin: {
    type: 'character',
    name: "Penguin",
    action: "",
    cost: 1,
    amount: 1
  },
  Pirate: {
    type: 'character',
    name: "Pirate",
    action: "",
    cost: 1,
    amount: 1
  },
  Vampire: {
    type: 'character',
    name: "Vampire",
    action: "",
    cost: 1,
    amount: 1
  },
  Wizard: {
    type: 'character',
    name: "Wizard",
    action: "",
    cost: 1,
    amount: 1
  },
  Zombie: {
    type: 'character',
    name: "Zombie",
    action: "",
    cost: 1,
    amount: 1
  },
  "Banana peel": {
    type: 'component',
    name: "Banana peel",
    action: "throwing a ",
    cost: 1,
    amount: 1
  },
  Bionic_Arm: {
    type: 'component',
    name: "Bionic_Arm",
    action: "wearing a ",
    cost: 1,
    amount: 1
  },
  Carnival: {
    type: 'component',
    name: "Carnival mask",
    action: "wearing a ",
    cost: 1,
    amount: 1
  },
  "Cowboy boots": {
    type: 'component',
    name: "Cowboy boots",
    action: "wearing a pair of ",
    cost: 1,
    amount: 1
  },
  "Crazy face": {
    type: 'component',
    name: "Crazy face",
    action: "making a ",
    cost: 1,
    amount: 1
  },
  "Fart spray": {
    type: 'component',
    name: "Fart spray",
    action: "using ",
    cost: 1,
    amount: 1
  },
  "Flying boots": {
    type: 'component',
    name: "Flying boots",
    action: "wearing a pair of ",
    cost: 1,
    amount: 1
  },
  Force_Field_Shield: {
    type: 'component',
    name: "Force_Field_Shield",
    action: "holding a ",
    cost: 1,
    amount: 1
  },
  Frying_Pan: {
    type: 'component',
    name: "Frying_Pan",
    action: "holding a ",
    cost: 1,
    amount: 1
  },
  Guitar: {
    type: 'component',
    name: "Guitar",
    action: "playing a ",
    cost: 1,
    amount: 1
  },
  "Health potion": {
    type: 'component',
    name: "Health potion",
    action: "drinking a ",
    cost: 1,
    amount: 1
  },
  Jetpack: {
    type: 'component',
    name: "Jetpack",
    action: "wearing a ",
    cost: 1,
    amount: 1
  },
  Laser_Glasses: {
    type: 'component',
    name: "Laser_Glasses",
    action: "wearing ",
    cost: 1,
    amount: 1
  },
  "Love grenade": {
    type: 'component',
    name: "Love grenade",
    action: "throwing a ",
    cost: 1,
    amount: 1
  },
  "Magic wand": {
    type: 'component',
    name: "Magic wand",
    action: "holding a ",
    cost: 1,
    amount: 1
  },
  Magnetic_Glove: {
    type: 'component',
    name: "Magnetic_Glove",
    action: "wearing a ",
    cost: 1,
    amount: 1
  },
  "Meme horse mask": {
    type: 'component',
    name: "Meme horse mask",
    action: "wearing a ",
    cost: 1,
    amount: 1
  },
  "Old pizza man": {
    type: 'component',
    name: "Old pizza man",
    action: "summoning an ",
    cost: 1,
    amount: 1
  },
  "Old pizza": {
    type: 'component',
    name: "Old pizza",
    action: "throwing an ",
    cost: 1,
    amount: 1
  },
  Pasta: {
    type: 'component',
    name: "Pasta",
    action: "making ",
    cost: 1,
    amount: 1
  },
  Pizza: {
    type: 'component',
    name: "Pizza",
    action: "eating a ",
    cost: 1,
    amount: 1
  },
  "Poker face": {
    type: 'component',
    name: "Poker face",
    action: "making a ",
    cost: 1,
    amount: 1
  },
  "Popcorn grenade": {
    type: 'component',
    name: "Popcorn grenade",
    action: "throwing a ",
    cost: 1,
    amount: 1
  },
  "Rubber chicken noises": {
    type: 'component',
    name: "Rubber chicken noises",
    action: "making ",
    cost: 1,
    amount: 1
  },
  "Rubber duck noises": {
    type: 'component',
    name: "Rubber duck noises",
    action: "making ",
    cost: 1,
    amount: 1
  },
  "Smelly feet": {
    type: 'component',
    name: "Smelly feet",
    action: "having ",
    cost: 1,
    amount: 1
  },
  "Sugar cane": {
    type: 'component',
    name: "Sugar cane",
    action: "holding a ",
    cost: 1,
    amount: 1
  },
  "Surfboard": {
    type: 'component',
    name: "Surfboard",
    action: "surfing on a ",
    cost: 1,
    amount: 1
  },
  Yoyo: {
    type: 'component',
    name: "Yoyo",
    action: "holding a ",
    cost: 1,
    amount: 1
  }
}
