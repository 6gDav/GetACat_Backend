import { describe, it, expect, vi } from 'vitest'
import { app } from '../../index'

vi.mock('./catImageFinder.ts', () => {
  return {
    default: vi.fn().mockResolvedValue([
      'https://i.imgur.com/fake_cat1.jpg',
      'https://i.imgur.com/fake_cat2.png'
    ])
  }
})

vi.mock('./catImageFinder2.ts', () => {
  return {
    default: vi.fn().mockResolvedValue([
      'https://i.imgur.com/fake_cat1.jpg',
      'https://i.imgur.com/fake_cat2.png'
    ])
  }
})

describe('GET /get-a-cat-image', () => {
  it('Sucessfully returnd cat images', async () => {
    const res = await app.request('/get-a-cat-image')
    
    expect(res.status).toBe(200)
    
    const body = await res.json()
    expect(body).toEqual([
      'https://i.imgur.com/fake_cat1.jpg',
      'https://i.imgur.com/fake_cat2.png'
    ])
  })
})