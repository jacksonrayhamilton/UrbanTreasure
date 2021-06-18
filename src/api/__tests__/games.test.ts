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
    await gamesCollection.insertOne({ id: 'G200', clues: [], addresses: [] })
  })

  it('responds with 404 when the game doesn\'t exist', async () => {
    const response = await request(app.callback()).get('/api/games/G404')
    expect(response.status).toBe(404)
  })

  it('responds with the game that exists', async () => {
    const response = await request(app.callback()).get('/api/games/G200')
    expect(response.status).toBe(200)
  })

  beforeAll(async () => {
    await gamesCollection.insertOne({
      id: 'CLUE',
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

  it('returns only the first clue', async () => {
    const response = await request(app.callback()).get('/api/games/CLUE')
    expect(response.body).toMatchObject({ data: { game: {} } })
    expect(Array.isArray(response.body.data.game.clues)).toBe(true)
    expect(response.body.data.game.clues).toHaveLength(1)
    expect(response.body.data.game.clues[0]).toBe('Blue')
  })

  it('returns additional clues for addresses', async () => {
    const response =
      await request(app.callback())
        .get('/api/games/CLUE' +
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
        .get('/api/games/CLUE' +
          `?clue=${encodeURIComponent('2222 Greenish Lane')}`)
    expect(response.body).toMatchObject({ data: { game: {} } })
    expect(Array.isArray(response.body.data.game.clues)).toBe(true)
    expect(response.body.data.game.clues).toHaveLength(3)
    expect(response.body.data.game.clues[0]).toBe('Blue')
    expect(response.body.data.game.clues[1]).toBe(null)
    expect(response.body.data.game.clues[2]).toBe('Red')
  })

  beforeAll(async () => {
    await gamesCollection.insertOne({
      id: 'PAGE',
      clues: [],
      addresses: [
        ...Array(12).fill(0).map((_, index) => ({
          address: `${1000 + (index * 2)} Abbey Road`
        })),
        ...Array(12).fill(0).map((_, index) => ({
          address: `${2000 + ((index + 12) * 2)} Candycane Lane`
        }))
      ]
    })
  })

  it('returns the default page of results', async () => {
    const response = await request(app.callback()).get('/api/games/PAGE')
    expect(response.body).toMatchObject({ data: { game: {
      addresses: {
        addresses: [
          '1000 Abbey Road',
          '1002 Abbey Road',
          '1004 Abbey Road',
          '1006 Abbey Road',
          '1008 Abbey Road',
          '1010 Abbey Road',
          '1012 Abbey Road',
          '1014 Abbey Road',
          '1016 Abbey Road',
          '1018 Abbey Road'
        ],
        page: 1,
        pages: 3
      }
    } } })
  })

  it('returns page 1 of results', async () => {
    const response =
      await request(app.callback()).get('/api/games/PAGE?page=1')
    expect(response.body).toMatchObject({ data: { game: {
      addresses: {
        addresses: [
          '1000 Abbey Road',
          '1002 Abbey Road',
          '1004 Abbey Road',
          '1006 Abbey Road',
          '1008 Abbey Road',
          '1010 Abbey Road',
          '1012 Abbey Road',
          '1014 Abbey Road',
          '1016 Abbey Road',
          '1018 Abbey Road'
        ],
        page: 1,
        pages: 3
      }
    } } })
  })

  it('returns page 2 of results', async () => {
    const response =
      await request(app.callback()).get('/api/games/PAGE?page=2')
    expect(response.body).toMatchObject({ data: { game: {
      addresses: {
        addresses: [
          '1020 Abbey Road',
          '1022 Abbey Road',
          '2024 Candycane Lane',
          '2026 Candycane Lane',
          '2028 Candycane Lane',
          '2030 Candycane Lane',
          '2032 Candycane Lane',
          '2034 Candycane Lane',
          '2036 Candycane Lane',
          '2038 Candycane Lane'
        ],
        page: 2,
        pages: 3
      }
    } } })
  })

  it('returns the last page of results', async () => {
    const response =
      await request(app.callback()).get('/api/games/PAGE?page=3')
    expect(response.body).toMatchObject({ data: { game: {
      addresses: {
        addresses: [
          '2040 Candycane Lane',
          '2042 Candycane Lane',
          '2044 Candycane Lane',
          '2046 Candycane Lane'
        ],
        page: 3,
        pages: 3
      }
    } } })
  })

  it('will not return anything before the first page of results', async () => {
    const response =
      await request(app.callback()).get('/api/games/PAGE?page=0')
    expect(response.body).toMatchObject({ data: { game: {
      addresses: {
        addresses: [],
        page: 0,
        pages: 3
      }
    } } })
  })

  it('will not return anything beyond the last page of results', async () => {
    const response =
      await request(app.callback()).get('/api/games/PAGE?page=4')
    expect(response.body).toMatchObject({ data: { game: {
      addresses: {
        addresses: [],
        page: 4,
        pages: 3
      }
    } } })
  })

  it('returns filtered results', async () => {
    const response =
      await request(app.callback()).get('/api/games/PAGE?term=100')
    expect(response.body).toMatchObject({ data: { game: {
      addresses: {
        addresses: [
          '1000 Abbey Road',
          '1002 Abbey Road',
          '1004 Abbey Road',
          '1006 Abbey Road',
          '1008 Abbey Road'
        ],
        page: 1,
        pages: 1
      }
    } } })
  })

  it('returns page 1/2 of filtered results', async () => {
    const response =
      await request(app.callback()).get('/api/games/PAGE?term=Abbey&page=1')
    expect(response.body).toMatchObject({ data: { game: {
      addresses: {
        addresses: [
          '1000 Abbey Road',
          '1002 Abbey Road',
          '1004 Abbey Road',
          '1006 Abbey Road',
          '1008 Abbey Road',
          '1010 Abbey Road',
          '1012 Abbey Road',
          '1014 Abbey Road',
          '1016 Abbey Road',
          '1018 Abbey Road'
        ],
        page: 1,
        pages: 2
      }
    } } })
  })

  it('returns page 2/2 of filtered results', async () => {
    const response =
      await request(app.callback()).get('/api/games/PAGE?term=Abbey&page=2')
    expect(response.body).toMatchObject({ data: { game: {
      addresses: {
        addresses: [
          '1020 Abbey Road',
          '1022 Abbey Road'
        ],
        page: 2,
        pages: 2
      }
    } } })
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
