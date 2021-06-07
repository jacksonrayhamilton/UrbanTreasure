import { Game, Clue, Address } from './types'
import { randomNumber, randomValue } from './util'
import { database } from './db'
import { streetNames, streetSuffixes, wordAssociations } from './data'

export default async function createGame() {
  const game: Game = { id: '', clues: [], addresses: [] }
  game.id = generateGameId()
  game.addresses = generateAddresses()
  game.clues = generateClues(game.addresses)
  const gamesCollection = (await database).collection('games')
  await gamesCollection.insertOne(game)
  return game
}

function generateGameId() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let id = ''
  for (let i = 0; i < 4; i++) id += randomValue(chars)
  return id
}

function generateAddresses() {
  const addresses = []
  for (let i = 0; i < 10; i++) {
    let generated: Address
    let alreadyGenerated: boolean
    do {
      generated = generateAddress()
      alreadyGenerated = !!addresses.find((existing) => {
        existing.address === generated.address
      })
    } while (alreadyGenerated)
    addresses.push(generated)
  }
  randomValue(addresses).treasure = true
  return addresses
}

function generateAddress(): Address {
  const streetNumber = randomNumber(1, 9999)
  const streetName = randomValue(streetNames)
  const streetSuffix = randomValue(streetSuffixes)
  return {
    address: `${streetNumber} ${streetName} ${streetSuffix}`,
    streetNumber, streetName, streetSuffix
  }
}

function generateClues(addresses: Address[]) {
  const clues = []
  let cluesToAdd = Math.min(addresses.length, 5)
  let nextAddress = addresses.find((address) => address.treasure) as Address
  for (;;) {
    const clue = generateClue(nextAddress)
    clues.unshift(clue)
    cluesToAdd--
    if (!cluesToAdd) break
    do {
      nextAddress = randomValue(addresses)
    } while (nextAddress.clue)
    nextAddress.clue = clue.clue
    clue.origin = nextAddress.address
  }
  return clues
}

function generateClue(address: Address): Clue {
  const associations = wordAssociations[address.streetName]
  const clue = randomValue(Array.prototype.concat.call(
    associations.noun,
    associations.adjective,
    associations.verb,
    associations.adverb
  ))
  return { origin: null, clue }
}
