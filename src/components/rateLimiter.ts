import { rateLimiter } from 'hono-rate-limiter'

const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000, 
  limit: 5, 
  standardHeaders: 'draft-6',
  keyGenerator: (c) => {
    const ip = 
      c.req.header('x-forwarded-for') || 
      c.req.header('cf-connecting-ip') || 
      'anonymous'
    return ip.split(',')[0].trim()
  },
  handler: (c) => {
    return c.text('Túl sok kérés, próbáld újra később!', 429)
  }
})

export default limiter