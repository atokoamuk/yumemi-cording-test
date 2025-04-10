import { describe, test, expect } from 'bun:test'

import { getPrefectures } from '@/actions/prefecture'

describe('poplation-action', () => {
  test('正常：都道府県情報を取得する', async () => {
    const data = await getPrefectures()

    expect(data).toBeDefined()

    expect(data.length).toBeGreaterThan(0)

    expect(data[0]).toHaveProperty('prefCode')
    expect(data[0]).toHaveProperty('prefName')
  })
})
