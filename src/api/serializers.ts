import { Game, GameClue, Address } from './types'

interface SerializeGameOptions {
  clueAddresses?: string[]
  page?: number
}

export function serializeGame(game: Game, options: SerializeGameOptions = {}) {
  const { clueAddresses = [], page = 1 } = options
  return {
    id: game.id,
    clues: serializeClues(game.clues, clueAddresses),
    addresses: serializeAddresses(game.addresses, page)
  }
}

function serializeClues(clues: GameClue[], clueAddresses: string[]) {
  const returnClues = clues.slice(0, 1)
  clueAddresses.forEach((clueAddress) => {
    for (let i = 0; i < clues.length; i++) {
      if (clues[i].origin !== clueAddress) continue
      returnClues[i] = clues[i]
      break
    }
  })
  return returnClues.map((clue) => clue.clue)
}

function serializeAddresses(addresses: Address[], page: number) {
  const slice = addresses.slice((page - 1) * 10, page * 10)
  const pages = Math.ceil(addresses.length / 10)
  return {
    addresses: slice.map((address) => address.address),
    page,
    pages
  }
}
