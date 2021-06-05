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

export default router
