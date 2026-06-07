import { Hono } from "hono"

type Varibles = {
  catImages: string[]
}

const catsRouter = new Hono<{ Variables: Varibles }>()

export default catsRouter