export interface Game {
  id: string
  clues: string[]
  addresses: string[]
}

export interface Address {
  address: string
  clue?: string
  treasure?: boolean
}
