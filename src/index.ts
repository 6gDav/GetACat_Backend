import { Hono } from 'hono'
import getCatPictures from './components/catImageFinder'
import { html } from 'hono/html'

type Varibles = {
  catImages: string[]
}

const app = new Hono<{ Variables: Varibles }>()

app.use('*', async (c, next) => {
  const images = await getCatPictures();
  c.set('catImages', images);
  await next();
});


app.get('/get-a-cat-image', async (c) => {
  const images = c.get('catImages');

  return c.json(images)
});

export default {
  fetch: app.fetch,
  port: 3001
}
