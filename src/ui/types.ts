export interface Game {
  id: string
  clues: (string | null)[]
  addresses: string[]
}

export interface Address {
  address: string
  clue?: Clue
  treasure?: boolean
}

export interface Clue {
  clue: string
  index: number
}
