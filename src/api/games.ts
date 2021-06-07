import Router from 'koa-router'
import { database } from './db'
import { streetNames, streetSuffixes, wordAssociations } from './data'

const router = new Router({
  prefix: '/api/games'
})

interface Game {
  id: string
  clues: Clue[]
  addresses: Address[]
}

interface Clue {
  origin: string | null
  clue: string
}

interface Address {
  address: string
  streetNumber: number
  streetName: string
  streetSuffix: string
  clue?: string
  treasure?: boolean
}

function serializeGame(game: Game) {
  return {
    id: game.id,
    clues: game.clues.map((clue: Clue) => clue.clue),
    addresses: game.addresses.map((address: Address) => address.address)
  }
}

router.get('/latest', async (ctx) => {
  const gamesCollection = (await database).collection('games')
  const game: Game =
    await gamesCollection.find().sort({ _id: -1 }).next() ||
    await createGame()
  ctx.body = {
    data: {
      game: serializeGame(game)
    }
  }
})

router.get('/:id', async (ctx) => {
  const { id } = ctx.params
  const gamesCollection = (await database).collection('games')
  const game: Game | null = await gamesCollection.findOne({ id })
  if (!game) {
    ctx.response.status = 404
    return
  }
  ctx.body = {
    data: {
      game: serializeGame(game)
    }
  }
})

async function createGame() {
  const game: Game = { id: '', clues: [], addresses: [] }
  game.id = generateGameId()
  game.addresses = generateAddresses()
  game.clues = generateClues(game.addresses)
  const gamesCollection = (await database).collection('games')
  await gamesCollection.insertOne(game)
  return game
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

function randomValue(collection: any[] | string) {
  return collection[randomNumber(0, collection.length - 1)]
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

router.post('/', async (ctx) => {
  const game = await createGame()
  ctx.body = {
    data: {
      game: serializeGame(game)
    }
  }
})

export default router
