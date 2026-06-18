import { describe, it, expect } from 'vitest'
import { app } from './index'

describe('Cat Info Route Points', () => {
  describe('GET /get-a-cat-info/:name', () => {
    it('Sucessfully return the datailf of the cat breed', async () => {
      const res = await app.request('/get-a-cat-info/Siamese')
      
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body).toHaveProperty('name', 'Siamese')
    })
  })

  describe('GET /get-a-cat-info-datail/:name/:datail', () => {
    it('Sucessfully return the datil of the cat', async () => {
      const res = await app.request('/get-a-cat-info-datail/Siamese/lifespan')
      
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body).toBeDefined() 
    })
  })

  describe('GET /get-a-cat-info-datail/get-all-names/', () => {
    it('Sucessfully returnd all of the names', async () => {
      const res = await app.request('/get-a-cat-info-datail/get-all-names/')
      
      expect(res.status).toBe(200)
      const body = await res.json()
    
      expect(Array.isArray(body)).toBe(true)
      expect(body.length).toBeGreaterThan(0)
      expect(typeof body[0]).toBe('string')
    })
  })

    describe('GET /get-a-cat-info-datail/get-all-properties/', () => {
    it('Sucessfully returnd all of the properties', async () => {
      const res = await app.request('/get-a-cat-info-datail/get-all-properties/')
      
      expect(res.status).toBe(200)
      const body = await res.json()
    
      expect(Array.isArray(body)).toBe(true)
      expect(body.length).toBeGreaterThan(0)
      expect(typeof body[0]).toBe('string')
    })
  })
})