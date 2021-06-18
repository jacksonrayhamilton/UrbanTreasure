export interface Game {
  id: string
  clues: (string | null)[]
  addresses: Addresses
}

interface Addresses {
  addresses: string[]
  page: number
  pages: number
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
