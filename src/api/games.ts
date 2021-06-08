import Router from 'koa-router'
import { Game, Clue, Address } from './types'
import { database } from './db'
import createGame from './createGame'

const router = new Router({
  prefix: '/api/games'
})

async function createAndSaveGame() {
  const game = createGame()
  const gamesCollection = database.collection('games')
  await gamesCollection.insertOne(game)
  return game
}

function serializeGame(game: Game) {
  return {
    id: game.id,
    clues: game.clues.map((clue: Clue) => clue.clue),
    addresses: game.addresses.map((address: Address) => address.address)
  }
}

router.get('/latest', async (ctx) => {
  const gamesCollection = database.collection('games')
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
  const { id } = ctx.params
  const gamesCollection = database.collection('games')
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

router.post('/new', async (ctx) => {
  const game = await createAndSaveGame()
  ctx.body = {
    data: {
      game: serializeGame(game)
    }
  }
})

export default router
