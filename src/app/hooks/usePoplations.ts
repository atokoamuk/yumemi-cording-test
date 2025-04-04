// usePopulationData.ts
import { useQueries } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getPopulation } from '../actions'
import { PopulationLabel } from '../type'

export function usePopulation(prefcodes: number[], label: PopulationLabel) {
  const populationQueries = useQueries({
    queries: prefcodes.map((prefCode) => ({
      queryKey: ['population', prefCode],
      queryFn: () => getPopulation(prefCode),
    })),
  })

  const populations = useMemo(() => {
    const datas = populationQueries.map(({ data }) => data).filter((data) => !!data)
    const data: { year: number; [key: string]: number }[] = []
    datas.forEach(({ result, prefCode }) => {
      const target = result.data.find((item) => item.label === label)
      if (target) {
        target.data.forEach(({ year, value }) => {
          const existIndex = data.findIndex((d) => d.year === year)
          if (existIndex !== -1) {
            data[existIndex][prefCode] = value
          } else {
            data.push({ year, [prefCode]: value })
          }
        })
      }
    })
    return data
  }, [populationQueries, label])

  const isLoading = populationQueries.some((query) => query.isLoading)

  return { isLoading, populations }
}
