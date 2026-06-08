import { Hono } from "hono";
import catDatabase from "../cats.json";
import limiter from "../rateLimiter";

const catInfoRouter = new Hono();

catInfoRouter.get('/get-a-cat-info/:name', limiter(10), async (c) => {
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

export default catInfoRouter;
