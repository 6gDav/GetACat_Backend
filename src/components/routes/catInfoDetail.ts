import { Hono } from "hono";
import catDatabase from "../cats.json";
import limiter from "../rateLimiter";

const catInfoDetailRouter = new Hono();

catInfoDetailRouter.get('/get-a-cat-info-datail/get-all-names/', limiter(3), async (c) => {
  const catNames = catDatabase.filter((cat) => cat.name).map((cat) => cat.name);

  return c.json(catNames);
});

catInfoDetailRouter.get('/get-a-cat-info-datail/get-all-properties/', limiter(3), async (c) => {
  const catNames = Object.keys(catDatabase[0]);

  return c.json(catNames);
});

catInfoDetailRouter.get('/get-a-cat-info-datail/:name/:datail',limiter(3), async (c) => {
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
  console.log(catInfoDetail);

  return c.json(catInfoDetail);
});

export default catInfoDetailRouter;
