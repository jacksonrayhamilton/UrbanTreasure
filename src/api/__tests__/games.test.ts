import request from 'supertest'
import Koa from 'koa'

import games from '../games'
import { gamesCollection } from '../db'

jest.mock('../db')

const app = new Koa
app.use(games.routes())

describe('POST /api/games/new', () => {
  it('creates a new game', async () => {
    const response = await request(app.callback()).post('/api/games/new')
    expect(gamesCollection.insertOne).toHaveBeenCalled()
    expect(response.status).toBe(201)
  })
})
