'use server'
import { PopulationResponse } from '@/type'

import { fetchYumemiApi } from './actions-helper'

export async function getPopulation(prefCode: number) {
  const params = new URLSearchParams({ prefCode: `${prefCode}` })
  const data: PopulationResponse = await fetchYumemiApi('population/composition/perYear', params)
  return { prefCode, result: data.result }
}
