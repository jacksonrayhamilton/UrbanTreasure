import Router from 'koa-router'
import { ensureArray } from '../js/util'
import { Game } from './types'
import { getGamesCollection } from './db'
import createGame from './createGame'
import { serializeGame } from './serializers'

const router = new Router({
  prefix: '/api/games'
})

async function createAndSaveGame() {
  const gamesCollection = getGamesCollection()
  const game = createGame()
  await gamesCollection.insertOne(game)
  return game
}

router.get('/latest', async (ctx) => {
  const gamesCollection = getGamesCollection()
  const game: Game =
    await gamesCollection.find().sort({ _id: -1 }).next() ||
    await createAndSaveGame()
  const { id } = game
  ctx.body = {
    data: {
      game: { id }
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
  const page =
    typeof ctx.query.page === 'string'
    ? Number(ctx.query.page)
    : undefined
  ctx.body = {
    data: {
      game: serializeGame(game, { clueAddresses, page })
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
