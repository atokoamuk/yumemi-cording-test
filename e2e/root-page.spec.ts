import { test, expect } from '@playwright/test'

const SELECT_PREFECTURES = ['北海道', '東京都', '大阪府', '愛知県', '福岡県']

test('複数の都道府県を選択してグラフを表示する', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  expect(page.getByRole('heading', { name: '都道府県を選択してください' })).toBeVisible()

  const labels = page.locator('label')
  const labelElements = await labels.all()

  for (const label of labelElements) {
    await label.waitFor({ state: 'visible' })
  }

  for (const prefecture of SELECT_PREFECTURES) {
    await page.getByRole('checkbox', { name: prefecture }).click()
    await expect(page.getByRole('list').getByText(prefecture)).toBeVisible()
    await expect(page.locator(`path[name="${prefecture}"]`)).toBeVisible()
  }
})

test('選択した都道府県の状態をクリアする', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  const labels = page.locator('label')
  const labelElements = await labels.all()

  for (const label of labelElements) {
    await label.waitFor({ state: 'visible' })
  }

  for (const prefecture of SELECT_PREFECTURES) {
    await page.getByRole('checkbox', { name: prefecture }).click()
  }
  await page.getByRole('button', { name: '選択状態をクリア' }).click()

  await expect(page.getByRole('heading', { name: '都道府県を選択してください' })).toBeVisible()
})

test('グラフのラベルを変更する', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const labels = page.locator('label')
  const labelElements = await labels.all()

  for (const label of labelElements) {
    await label.waitFor({ state: 'visible' })
  }

  for (const prefecture of SELECT_PREFECTURES) {
    await page.getByRole('checkbox', { name: prefecture }).click()
  }

  await page.getByRole('button', { name: '年少人口' }).click()

  await expect(page.getByRole('heading', { name: '年少人口推移' })).toBeVisible()
})
