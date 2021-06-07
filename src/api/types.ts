export interface Game {
  id: string
  clues: Clue[]
  addresses: Address[]
}

export interface Clue {
  origin: string | null
  clue: string
}

export interface Address {
  address: string
  streetNumber: number
  streetName: string
  streetSuffix: string
  clue?: string
  treasure?: boolean
}
