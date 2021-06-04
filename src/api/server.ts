import Koa from 'koa'
const app = new Koa

const hostname = '0.0.0.0'
const port = 3000

app.use(ctx => {
  ctx.body = 'Hello Koa\n'
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
