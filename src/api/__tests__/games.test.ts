import request from 'supertest'
import Koa from 'koa'
import { Collection } from 'mongodb'

import games from '../games'
import { getGamesCollection } from '../db'

const app = new Koa
app.use(games.routes())

let gamesCollection: Collection

beforeAll(() => {
  gamesCollection = getGamesCollection()
})

describe('GET /api/games/:id', () => {
  beforeAll(async () => {
    await gamesCollection.insertOne({
      id: 'G200',
      clues: [
        { origin: null, clue: 'Blue' },
        { origin: '1111 Bluish Way', clue: 'Green' },
        { origin: '2222 Greenish Lane', clue: 'Red' }
      ],
      addresses: [
        { address: '1111 Bluish Way', clue: 'Green' },
        { address: '2222 Greenish Lane', clue: 'Red' },
        { address: '3333 Reddish Street', treasure: true }
      ]
    })
  })

  it('responds with 404 when the game doesn\'t exist', async () => {
    const response = await request(app.callback()).get('/api/games/G404')
    expect(response.status).toBe(404)
  })

  it('responds with the game that exists', async () => {
    const response = await request(app.callback()).get('/api/games/G200')
    expect(response.status).toBe(200)
  })

  it('returns only the first clue', async () => {
    const response = await request(app.callback()).get('/api/games/G200')
    expect(response.body).toMatchObject({ data: { game: {} } })
    expect(Array.isArray(response.body.data.game.clues)).toBe(true)
    expect(response.body.data.game.clues).toHaveLength(1)
    expect(response.body.data.game.clues[0]).toBe('Blue')
  })

  it('returns additional clues for addresses', async () => {
    const response =
      await request(app.callback())
        .get('/api/games/G200' +
          `?clue=${encodeURIComponent('1111 Bluish Way')}` +
          `&clue=${encodeURIComponent('2222 Greenish Lane')}`)
    expect(response.body).toMatchObject({ data: { game: {} } })
    expect(Array.isArray(response.body.data.game.clues)).toBe(true)
    expect(response.body.data.game.clues).toHaveLength(3)
    expect(response.body.data.game.clues[0]).toBe('Blue')
    expect(response.body.data.game.clues[1]).toBe('Green')
    expect(response.body.data.game.clues[2]).toBe('Red')
  })

  it('omits intermediate unknown clues', async () => {
    const response =
      await request(app.callback())
        .get('/api/games/G200' +
          `?clue=${encodeURIComponent('2222 Greenish Lane')}`)
    expect(response.body).toMatchObject({ data: { game: {} } })
    expect(Array.isArray(response.body.data.game.clues)).toBe(true)
    expect(response.body.data.game.clues).toHaveLength(3)
    expect(response.body.data.game.clues[0]).toBe('Blue')
    expect(response.body.data.game.clues[1]).toBe(null)
    expect(response.body.data.game.clues[2]).toBe('Red')
  })
})

describe('POST /api/games/new', () => {
  it('creates a new game', async () => {
    const response = await request(app.callback()).post('/api/games/new')
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({ data: { game: {} } })
    expect(typeof response.body.data.game.id).toBe('string')
    const { id } = response.body.data.game
    expect(await gamesCollection.findOne({ id })).not.toBe(null)
  })

  it('returns only the first clue', async () => {
    const response = await request(app.callback()).post('/api/games/new')
    expect(response.body).toMatchObject({ data: { game: {} } })
    expect(Array.isArray(response.body.data.game.clues)).toBe(true)
    expect(response.body.data.game.clues).toHaveLength(1)
  })
})
