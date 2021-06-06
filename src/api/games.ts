import Router from 'koa-router'

const router = new Router({
  prefix: '/api/games'
})

interface GameMap {
  [key: string]: Game
}

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
  num?: number
  fname?: string
  lname?: string
  clue?: string
  treasure?: boolean
}

// Data for testing
const games: GameMap = {
  'AB12': {
    id: 'AB12',
    clues: [
      {
        origin: null,
        clue: 'smelly fig'
      },
      {
        origin: '711 East Park Road',
        clue: 'hop kitty'
      }
    ],
    addresses: [
      {
        address: '711 East Park Road'
      },
      {
        address: '723 East Park Road',
        clue: 'smelly fig'
      },
      {
        address: '32 Mountainview Lane',
        treasure: true
      },
      {
        address: '7120 Grove St'
      }
    ]
  },
  'X25Q': {
    id: 'X25Q',
    clues: [
      {
        origin: null,
        clue: 'rabbit feet'
      },
      {
        origin: '97 Linda St',
        clue: 'pickle salad'
      }
    ],
    addresses: [
      {
        address: '97 Linda St',
        clue: 'pickle salad'
      },
      {
        address: '7553 Indian Spring St'
      },
      {
        address: '13 Roosevelt Drive',
        treasure: true
      }
    ]
  }
}

function serializeGame (game: Game) {
  return {
    id: game.id,
    clues: game.clues.map((clue: Clue) => clue.clue),
    addresses: game.addresses.map((address: Address) => address.address)
  }
}

// TODO: Fetch the latest game dynamically.
router.get('/latest', (ctx, next) => {
  ctx.body = {
    data: {
      game: serializeGame(games['X25Q'])
    }
  }
  next()
})

// TODO: Fetch a game by ID dynamically.
router.get('/:id', (ctx, next) => {
  const { id } = ctx.params
  if (Object.prototype.hasOwnProperty.call(games, id)) {
    ctx.body = {
      data: {
        game: serializeGame(games[id])
      }
    }
  }
  next()
})

async function createGame () {
  const game: Game = { id: '', clues: [], addresses: [] }
  game.id = generateGameId()
  game.addresses = generateAddresses()
  game.clues = generateClues(game.addresses)
  // TODO: Implement this:
  // await database.save(game.id, game)
  return game
}

function randomNumber (min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

function randomValue (collection: any[] | string) {
  return collection[randomNumber(0, collection.length - 1)]
}

function generateGameId () {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let id = ''
  for (let i = 0; i < 4; i++) id += randomValue(chars)
  return id
}

function generateAddresses () {
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

const addressFnames = ["Acorn", "Amber", "Ash"]
const addressLnames = ["Street", "Avenue", "Lane"]

function generateAddress (): Address {
  const num = randomNumber(1, 9999)
  const fname = randomValue(addressFnames)
  const lname = randomValue(addressLnames)
  return {
    address: `${num} ${fname} ${lname}`,
    num, fname, lname
  }
}

interface AssociationsMap {
  [key: string]: Associations
}

interface Associations {
  noun: string[]
  adjective: string[]
}

const fnameAssociations: AssociationsMap = {
  "Acorn": {
    "noun": ["Oak", "Squirrel", "Nut"],
    "adjective": ["Roasted", "Planted", "Wild"]
  },
  "Amber": {
    "noun": ["Resin", "Fossil", "Jewelry"],
    "adjective": ["Tinted", "Colored", "Opaque"]
  },
  "Ash": {
    "noun": ["Oven", "Dust", "Flame"],
    "adjective": ["Volcanic", "Dry", "Burnt"]
  }
}

function generateClues (addresses: Address[]) {
  const clues = []
  let cluesToAdd = Math.min(addresses.length, 5)
  let nextAddress = addresses.find((address) => address.treasure)
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
  const associations = fnameAssociations[address.fname]
  const adjective = randomValue(associations.adjective)
  const noun = randomValue(associations.noun)
  return {
    origin: null,
    clue: `${adjective} ${noun}`
  }
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
