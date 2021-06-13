import request from 'supertest'
import Koa from 'koa'

import games from '../games'
import { gamesCollection } from '../db'

jest.mock('../db')

const app = new Koa
app.use(games.routes())

describe('GET /api/games/:id', () => {
  // TODO: Disable mocks here and use in-memory MongoDB.

  it('responds with 404 when the game doesn\'t exist', async () => {
    const response = await request(app.callback()).post('/api/games/G404')
    expect(response.status).toBe(404)
  })

  it('responds with the game that exists', async () => {
    const response = await request(app.callback()).post('/api/games/G200')
    expect(response.status).toBe(200)
  })
})

describe('POST /api/games/new', () => {
  it('creates a new game', async () => {
    const response = await request(app.callback()).post('/api/games/new')
    expect(gamesCollection.insertOne).toHaveBeenCalled()
    expect(response.status).toBe(201)
  })
})
