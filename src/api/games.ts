import Router from 'koa-router'
import { Game, Clue, Address } from './types'
import { database } from './db'
import createGame from './createGame'

const router = new Router({
  prefix: '/api/games'
})

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

router.post('/', async (ctx) => {
  const game = await createGame()
  ctx.body = {
    data: {
      game: serializeGame(game)
    }
  }
})

export default router
