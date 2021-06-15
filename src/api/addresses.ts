import Router from 'koa-router'
import { Game, Address } from './types'
import { getGamesCollection } from './db'

const router = new Router({
  prefix: '/api/games/:gid/address'
})

function serializeAddress(game: Game, address: Address) {
  return {
    gid: game.id,
    ...address
  }
}

router.get('/:address', async (ctx) => {
  const gamesCollection = getGamesCollection()
  const { gid, address: addressParam } = ctx.params
  const game: Game | null = await gamesCollection.findOne({ id: gid })
  if (!game) {
    ctx.response.status = 404
    return
  }
  const address: Address | undefined =
    game.addresses.find((address) => address.address === addressParam)
  if (!address) {
    ctx.response.status = 404
    return
  }
  ctx.body = {
    data: {
      address: serializeAddress(game, address)
    }
  }
})

export default router
