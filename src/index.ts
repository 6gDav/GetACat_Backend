import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import catImagesRouter from './components/routes/catImages'
import catInfoRouter from './components/routes/catInfo'
import catInfoDetailRouter from './components/routes/catInfoDetail'

type Varibles = {
  catImages: string[]
}

const app = new Hono<{ Variables: Varibles }>()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET'],
}))
app.use('*', logger())

app.get('/favicon.ico', (c) => c.body(null, 204))

app.route('/', catImagesRouter) // :: /get-a-cat-image => http://localhost:3001/get-a-cat-image
app.route('/', catInfoRouter) // :: /get-a-cat-info/:name => http://localhost:3001/get-a-cat-info/Ragdoll
app.route('/', catInfoDetailRouter) // :: /get-a-cat-info-datail/get-all-names/ => http://localhost:3001/get-a-cat-info-datail/get-all-names/
                                    // :: //get-a-cat-info-datail/:name/:datail => http://localhost:3001/get-a-cat-info-datail/Ragdoll/lifespan

export default {
  fetch: app.fetch,
  port: 3001
}
