'use client'

import { useEffect, useMemo, useState } from 'react'
import { getPopulation, getPrefectures } from './actions'
import { useQueries, useQuery } from '@tanstack/react-query'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts'

export default function Home() {
  const prefectureQuery = useQuery({
    queryKey: ['prefectures'],
    queryFn: getPrefectures,
  })

  const prefectures = prefectureQuery.data || []

  const [selectedPrefcode, setSelectedPrefcode] = useState<number[]>([])

  const selectedPrefectures = useMemo(
    () => prefectures.filter((prefecture) => selectedPrefcode.includes(prefecture.prefCode)),
    [selectedPrefcode],
  )

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value, 10)
    if (event.target.checked) {
      setSelectedPrefcode((prev) => [...prev, value])
    } else {
      setSelectedPrefcode((prev) => prev.filter((prefCode) => prefCode !== value))
    }
  }

  const populationQueries = useQueries({
    queries: selectedPrefcode.map((prefCode) => ({
      queryKey: ['population', prefCode],
      queryFn: () => getPopulation(prefCode),
    })),
  })

  const populationData = populationQueries.map(({ data }) => data).filter((data) => !!data)

  const graphData = useMemo(() => {
    const data: { year: number; [key: string]: number }[] = []
    populationData.forEach(({ result, prefCode }) => {
      const target = result.data.find((item) => item.label === '総人口')
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
  }, [populationData])

  useEffect(() => {
    console.log('graphData', graphData)
  }, [graphData])

  return (
    <div className="flex flex-col min-h-screen p-24">
      <h1 className="text-3xl font-bold">都道府県</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
        {prefectures.map((prefecture) => (
          <label key={prefecture.prefCode} className="flex items-center space-x-2">
            <input type="checkbox" value={prefecture.prefCode} onChange={handleCheckboxChange} />
            <span>{prefecture.prefName}</span>
          </label>
        ))}
      </div>
      <ResponsiveContainer width="100%" height="40%">
        <LineChart data={graphData}>
          <XAxis dataKey="year" />
          <YAxis />
          <Legend />
          {selectedPrefectures.map((prefecture) => (
            <Line
              key={`line-${prefecture.prefCode}`}
              name={`${prefecture.prefName}`}
              type="monotone"
              dataKey={`${prefecture.prefCode}`}
              stroke={`hsl(${(prefecture.prefCode * 137.5) % 360}, 70%, 50%)`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
