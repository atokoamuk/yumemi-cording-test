'use server'

import { PopulationResponse, PrefecturesResponse } from './type'

const yumemiBaseUrl = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1'
const yumemiApiKey = process.env.YUMEMI_API_KEY

export async function getPrefectures() {
  const url = new URL(`${yumemiBaseUrl}/prefectures`)

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': yumemiApiKey || '',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch prefectures')
  }
  const data: PrefecturesResponse = await res.json()

  return data.result
}

export async function getPopulation(prefCode: number) {
  const url = new URL(`${yumemiBaseUrl}/population/composition/perYear`)
  url.searchParams.append('prefCode', `${prefCode}`)

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.YUMEMI_API_KEY || '',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch population')
  }
  const data: PopulationResponse = await res.json()
  return { prefCode, result: data.result }
}
