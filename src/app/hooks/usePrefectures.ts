import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getPrefectures } from '@/actions/prefecture'

export const usePrefectures = () => {
  const prefectureQuery = useQuery({
    queryKey: ['prefectures'],
    queryFn: getPrefectures,
    throwOnError: true,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  const prefectures = useMemo(() => prefectureQuery.data || [], [prefectureQuery.data])

  return { prefectures, ...prefectureQuery }
}
