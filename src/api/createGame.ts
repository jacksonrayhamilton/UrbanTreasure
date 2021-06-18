import { Game, GameClue, Address } from './types'
import { randomNumber, randomValue } from '../js/util'
import { streetNames, streetSuffixes, wordAssociations } from './data'

export default function createGame(): Game {
  const id = generateGameId()
  const addresses = generateAddresses()
  const clues = generateClues(addresses)
  return { id, addresses, clues }
}

function generateGameId() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let id = ''
  for (let i = 0; i < 4; i++) id += randomValue(chars)
  return id
}

function generateAddresses() {
  const addresses = []
  for (let i = 0; i < 25; i++) {
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
  const streetNumber = randomNumber(1, 10000)
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
    } while (nextAddress.clue || nextAddress.treasure)
    nextAddress.clue = {
      clue: clue.clue,
      index: cluesToAdd
    }
    clue.origin = nextAddress.address
  }
  return clues
}

function generateClue(address: Address): GameClue {
  const clue = Math.random() < .5
    ? wordClue(address)
    : mathClue(address)
  return { origin: null, clue }
}

function wordClue(address: Address) {
  const associations = wordAssociations[address.streetName]
  return randomValue(associations)
}

function mathClue(address: Address) {
  const n = address.streetNumber
  const roll = Math.random()
  if (isPrime(n)) {
    return roll < .33
      ? additionClue(n) : roll < .66
      ? subtractionClue(n)
      : divisionClue(n)
  }
  return roll < .25
    ? additionClue(n) : roll < .5
    ? subtractionClue(n) : roll < .75
    ? multiplicationClue(n)
    : divisionClue(n)
}

function additionClue(n: number) {
  const r = randomNumber(1, n)
  const addend = n - r
  return `${r}+${addend}=`
}

function subtractionClue(n: number) {
  const r = randomNumber(1, 10000)
  const minuend = n + r
  return `${minuend}-${r}=`
}

function multiplicationClue(n: number) {
  const factors = getFactors(n)
  if (!factors.length) return 'Prime number'
  const r = randomValue(factors)
  const factor = Math.round(n / r)
  return `${r}×${factor}=`
}

function divisionClue(n: number) {
  const r = randomValue([2, 3, 4, 5, 10])
  const dividend = n * r
  return `${dividend}÷${r}=`
}

function isPrime(n: number) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false
  }
  return true
}

function getFactors(n: number) {
  const factors = []
  for (let i = 2; i < n; i++) {
    if (n % i !== 0) continue
    factors.push(i)
    if (factors.length >= 5) break
  }
  return factors
}
