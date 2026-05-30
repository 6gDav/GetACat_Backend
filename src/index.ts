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

app.get('/get-a-cat-info-datail/:id/:datail', limiter, async (c) => {

  const catId = c.req.param('id');
  const catDetail = c.req.param('datail'); 

  const catInfo = catDatabase.find((cat) => cat.id === catId);
  const catInfoDetail = catInfo?.[catDetail as keyof typeof catInfo];

  if (!catInfo || !catInfoDetail) {
    return c.json(
      {
        success: false,
        message: `Cat with ID '${catId}' or Datail ${catInfoDetail} not found.`
      },
      404
    );
  }
  console.log(catInfoDetail)

  return c.json(catInfoDetail);
});

export default {
  fetch: app.fetch,
  port: 3001
}
