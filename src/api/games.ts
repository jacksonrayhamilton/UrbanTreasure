import Router from 'koa-router'
import { ensureArray } from './util'
import { Game, Clue, Address } from './types'
import { getGamesCollection } from './db'
import createGame from './createGame'

const router = new Router({
  prefix: '/api/games'
})

async function createAndSaveGame() {
  const gamesCollection = getGamesCollection()
  const game = createGame()
  await gamesCollection.insertOne(game)
  return game
}

interface SerializeGameOptions {
  clueAddresses?: string[]
}

function serializeGame(game: Game, options: SerializeGameOptions = {}) {
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

router.get('/latest', async (ctx) => {
  const gamesCollection = getGamesCollection()
  const game: Game =
    await gamesCollection.find().sort({ _id: -1 }).next() ||
    await createAndSaveGame()
  ctx.body = {
    data: {
      game: serializeGame(game)
    }
  }
})

router.get('/:id', async (ctx) => {
  const gamesCollection = getGamesCollection()
  const { id } = ctx.params
  const game: Game | null = await gamesCollection.findOne({ id })
  if (!game) {
    ctx.response.status = 404
    return
  }
  const clueAddresses: string[] = ensureArray(ctx.query.clue)
  ctx.body = {
    data: {
      game: serializeGame(game, { clueAddresses })
    }
  }
})

router.post('/new', async (ctx) => {
  const game = await createAndSaveGame()
  ctx.body = {
    data: {
      game: serializeGame(game)
    }
  }
  ctx.response.status = 201
})

export default router
