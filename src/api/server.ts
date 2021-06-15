import { client } from './db'

client.connect()

import Koa from 'koa'
const app = new Koa

const hostname = '0.0.0.0'
const port = 3000

import games from './games'
import addresses from './addresses'

app.use(games.routes())
app.use(addresses.routes())

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
