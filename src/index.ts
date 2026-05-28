import { Hono } from 'hono'
import { cors } from 'hono/cors'
import getCatPictures from './components/catImageFinder'
import limiter from './components/rateLimiter'
import catDatabase from './components/cats.json'

type Varibles = {
  catImages: string[]
}

const app = new Hono<{ Variables: Varibles }>()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET'],
}))


app.get('/get-a-cat-image', limiter, async (c) => {
  const images = await getCatPictures();
  return c.json(images)
});

app.get('/get-a-cat-info/:id', limiter, async (c) => {

  const catId = c.req.param('id');

  const catInfo = catDatabase.find((cat) => cat.id === catId);
  if (!catInfo) {
    return c.json(
      {
        success: false,
        message: `Cat with ID '${catId}' not found.`
      },
      404
    );
  }

  return c.json(catInfo);
});

export default {
  fetch: app.fetch,
  port: 3001
}
