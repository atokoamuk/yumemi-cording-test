import { describe, expect, test } from 'bun:test'

import { getPopulation } from '@/actions/poplation'

describe('poplation-action', () => {
  test('正常：指定した都道府県コードの人口情報を取得する', async () => {
    const data = await getPopulation(1)
    expect(data).toBeDefined()

    expect(data.prefCode).toBe(1)
    expect(data.result).toBeDefined()
  })
  test('異常：存在しない都道府県コードの人口情報を取得する', async () => {
    await expect(getPopulation(999)).rejects.toThrow('404')
  })
})
