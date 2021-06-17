export interface Game {
  id: string
  clues: GameClue[]
  addresses: Address[]
}

export interface GameClue {
  origin: string | null
  clue: string
}

export interface Address {
  address: string
  streetNumber: number
  streetName: string
  streetSuffix: string
  clue?: AddressClue
  treasure?: boolean
}

export interface AddressClue {
  clue: string
  index: number
}
