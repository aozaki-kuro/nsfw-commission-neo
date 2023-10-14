// #data/types.ts

// Define a new interface for individual commission items
export interface Commission {
  fileName: string
  Links: string[]
}

// Define a new interface for each character's commissions
export interface CharacterCommissions {
  Character: string
  Commissions: Commission[]
}

// Adjust the Props interface to be an array of CharacterCommissions
export type Props = CharacterCommissions[]
