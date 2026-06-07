import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import catImagesRouter from './components/routes/catImages'
import catInfoRouter from './components/routes/catInfo'
import catInfoDetailRouter from './components/routes/catInfoDetail'
import catsRouter from './components/routes/catsRouter'

type Varibles = {
  catImages: string[]
}

const app = new Hono<{ Variables: Varibles }>()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET'],
}))
app.use('*', logger())

app.route('/', catsRouter)
app.route('/', catImagesRouter)
app.route('/', catInfoRouter)
app.route('/', catInfoDetailRouter)

export default {
  fetch: app.fetch,
  port: 3001
}
