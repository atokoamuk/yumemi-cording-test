'use client'

import { useMemo, useState } from 'react'
import PopulationGraph from './components/PoplationGraph'
import { PopulationLabel } from './type'
import LabelTab from './components/LabelTab'
import PrefectureCheckbox from './components/PrefecturesCheckbox'
import Skeleton from '@/components/Skelton'
import { usePrefectures } from './hooks/usePrefectures'
import { usePopulation } from './hooks/usePoplations'
import LoadingOverlay from '@/components/LoadingOverlay'

export default function Home() {
  const { prefectures } = usePrefectures()

  const [selectedPrefcode, setSelectedPrefcode] = useState<number[]>([])

  const selectedPrefectures = useMemo(
    () => prefectures.filter((prefecture) => selectedPrefcode.includes(prefecture.prefCode)),
    [prefectures, selectedPrefcode],
  )
  const [selectedLabel, setSelectedLabel] = useState<PopulationLabel>('総人口')

  const { populations, isLoading } = usePopulation(selectedPrefcode, selectedLabel)

  function handleSelectedPrefcodeChange(prefcode: number) {
    setSelectedPrefcode((prev) =>
      prev.includes(prefcode) ? prev.filter((code) => code !== prefcode) : [...prev, prefcode],
    )
  }

  return (
    <div className="flex flex-col h-svh p-24 gap-8">
      <h1 className="text-3xl font-bold">都道府県</h1>
      <div className="h-[30%] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {prefectures.length > 0 ? (
          <PrefectureCheckbox
            prefectures={prefectures}
            selectedPrefcodes={selectedPrefcode}
            onChange={handleSelectedPrefcodeChange}
          />
        ) : (
          [...Array(47)].map((_, index) => (
            <div key={`prefecture-skeleton-${index}`} className="h-[1em]">
              <Skeleton key={index} />
            </div>
          ))
        )}
      </div>
      <LabelTab selectedLabel={selectedLabel} onChange={(s) => setSelectedLabel(s)} />
      <div className="w-full bg-white flex-1 p-8 relative">
        {selectedPrefectures.length > 0 ? (
          <>
            <LoadingOverlay show={isLoading} />
            <PopulationGraph data={populations} prefectures={selectedPrefectures} />
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-gray-500 text-2xl">都道府県を選択してください</h1>
          </div>
        )}
      </div>
    </div>
  )
}
