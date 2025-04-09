'use server'
import { PrefecturesResponse } from '@/type'

import { fetchYumemiApi } from './actions-helper'

export async function getPrefectures() {
  const data: PrefecturesResponse = await fetchYumemiApi('prefectures')
  return data.result
}
