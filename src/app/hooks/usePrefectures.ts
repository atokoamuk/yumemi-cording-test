import { useQuery } from '@tanstack/react-query'

import { getPrefectures } from '../actions'

export const usePrefectures = () => {
  const prefectureQuery = useQuery({
    queryKey: ['prefectures'],
    queryFn: getPrefectures,
  })

  const prefectures = prefectureQuery.data || []

  return { prefectures }
}
