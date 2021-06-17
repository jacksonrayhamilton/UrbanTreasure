import { Game, Clue, Address } from './types'

interface SerializeGameOptions {
  clueAddresses?: string[]
}

export function serializeGame(game: Game, options: SerializeGameOptions = {}) {
  const { clueAddresses = [] } = options
  return {
    id: game.id,
    clues: serializeClues(game.clues, clueAddresses),
    addresses: game.addresses.map((address: Address) => address.address)
  }
}

function serializeClues(clues: Clue[], clueAddresses: string[]) {
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
