import { client } from './db'

beforeAll(async () => {
  await client.connect()
})

afterAll(async () => {
  await client.close()
})
