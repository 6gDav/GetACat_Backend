import { Hono } from "hono";
import getCatPictures from "../images/catImageFinder";
import getCatPictures2 from "../images/catImageFinder2"
import limiter from "../rateLimiter";

const catImagesRouter = new Hono();

catImagesRouter.get('/get-a-cat-image', limiter(6), async (c) => {
  let images = await getCatPictures();

  if (!images || images.length === 0) {
    images = await getCatPictures2();
  }
  if (!images || images.length === 0) {
    return c.json(
      {
        success: false,
        message: `Error occured while tring to fetch cat images`
      },
      500
    );
  }
  return c.json(images);
});

export default catImagesRouter;