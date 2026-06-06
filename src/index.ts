import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import getCatPictures from './components/catImageFinder'
import limiter from './components/rateLimiter'
import catDatabase from './components/cats.json'

type Varibles = {
  catImages: string[]
}

export const app = new Hono<{ Variables: Varibles }>()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET'],
}),
)
app.use('*', logger())


app.get('/get-a-cat-image', limiter, async (c) => {
  const images = await getCatPictures();

  if (!images) {
    return c.json(
      {
        success: false,
        message: `Error occured while tring to fetch cat images`
      },
      500
    );
  }

  return c.json(images)
});

app.get('/get-a-cat-info/:name', async (c) => {
  const catName = c.req.param('name');

  const catInfo = catDatabase.find((cat) => cat.name === catName);
  if (!catInfo) {
    return c.json(
      {
        success: false,
        message: `Cat with ID '${catName}' not found.`
      },
      404
    );
  }

  return c.json(catInfo);
});

app.get('/get-a-cat-info-datail/:name/:datail', async (c) => {

  const catName = c.req.param('name');
  const catDetail = c.req.param('datail');

  const catInfo = catDatabase.find((cat) => cat.name === catName);
  const catInfoDetail = catInfo?.[catDetail as keyof typeof catInfo];

  if (!catInfo || !catInfoDetail) {
    return c.json(
      {
        success: false,
        message: `Cat with ID '${catName}' or Datail ${catInfoDetail} not found.`
      },
      404
    );
  }
  console.log(catInfoDetail)

  return c.json(catInfoDetail);
});

app.get('/get-a-cat-info-datail/get-all-names/', limiter, async (c) => {
  const catNames = catDatabase.filter((cat) => cat.name).map((cat) => cat.name);

  return c.json(catNames);
});

export default {
  fetch: app.fetch,
  port: 3001
}
