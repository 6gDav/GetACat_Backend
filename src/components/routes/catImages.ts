import { Hono } from "hono";
import getCatPictures from "../catImageFinder";
import limiter from "../rateLimiter";

const catImagesRouter = new Hono();

catImagesRouter.get('/get-a-cat-image', limiter, async (c) => {
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

  return c.json(images);
});

export default catImagesRouter;