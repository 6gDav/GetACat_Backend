import { Hono } from 'hono'
import { cors } from 'hono/cors'
import getCatPictures from './components/catImageFinder'
import limiter from './components/rateLimiter'

type Varibles = {
  catImages: string[]
}

const app = new Hono<{ Variables: Varibles }>()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET'],
}))

app.use('*', async (c, next) => {
  const images = await getCatPictures();
  c.set('catImages', images);
  await next();
});


app.get('/get-a-cat-image', limiter, async (c) => {
  const images = c.get('catImages');
  return c.json(images)
});

export default {
  fetch: app.fetch,
  port: 3001
}
