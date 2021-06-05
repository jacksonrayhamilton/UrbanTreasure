import Koa from 'koa'
const app = new Koa

const hostname = '0.0.0.0'
const port = 3000

import games from './games'

app.use(games.routes())

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
