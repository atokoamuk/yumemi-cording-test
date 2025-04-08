import { test, expect, describe } from 'bun:test'

import { getPrefectures, getPopulation } from '../../src/app/actions'

describe('actions', () => {
  test('正常：都道府県情報を取得する', async () => {
    const data = await getPrefectures()

    expect(data).toBeDefined()

    expect(data.length).toBeGreaterThan(0)

    expect(data[0]).toHaveProperty('prefCode')
    expect(data[0]).toHaveProperty('prefName')
  })

  test('正常：指定した都道府県の人口情報を取得する', async () => {
    const data = await getPopulation(1)
    expect(data).toBeDefined()

    expect(data.prefCode).toBe(1)
    expect(data.result).toBeDefined()
  })
})
