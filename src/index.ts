import { Hono } from 'hono'
import getCatPictures from './components/catImageFinder'


const app = new Hono()

app.get('/', async (c) => {
  const catImageList = await getCatPictures();
  return c.text('catImageList ' + catImageList)
})

export default {
  fetch: app.fetch,
  port: 3001
}
