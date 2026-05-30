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

  if (!images)
  {
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
