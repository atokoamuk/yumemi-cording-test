'use client'

import { useCallback, useMemo, useState } from 'react'

import LoadingOverlay from '@/components/LoadingOverlay'
import Skeleton from '@/components/Skelton'

import LabelTab from './components/LabelTab'
import PopulationGraph from './components/PoplationGraph'
import PrefectureCheckbox from './components/PrefecturesCheckbox'
import { usePopulation } from './hooks/usePoplations'
import { usePrefectures } from './hooks/usePrefectures'
import { PopulationLabel } from './type'

export default function Root() {
  const [selectedPrefcode, setSelectedPrefcode] = useState<number[]>([])
  const [selectedLabel, setSelectedLabel] = useState<PopulationLabel>('総人口')

  const { prefectures } = usePrefectures()
  const { populations, isLoading } = usePopulation(selectedPrefcode, selectedLabel)

  const handleChangeSelectedPrefcode = useCallback(
    (prefcode: number) => {
      setSelectedPrefcode((prev) =>
        prev.includes(prefcode) ? prev.filter((code) => code !== prefcode) : [...prev, prefcode],
      )
    },
    [setSelectedPrefcode],
  )

  const handleLabelChange = useCallback(
    (label: PopulationLabel) => {
      setSelectedLabel(label)
    },
    [setSelectedLabel],
  )

  const selectedPrefectures = useMemo(
    () => prefectures.filter((prefecture) => selectedPrefcode.includes(prefecture.prefCode)),
    [prefectures, selectedPrefcode],
  )

  return (
    <div className="flex flex-col h-svh px-16 py-8 gap-4">
      <div className="flex items-center gap-4">
        <h1 className="font-bold">都道府県</h1>
      </div>

      <div className="h-[30%] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {prefectures.length > 0 ? (
          <PrefectureCheckbox
            prefectures={prefectures}
            selectedPrefcodes={selectedPrefcode}
            onChange={handleChangeSelectedPrefcode}
          />
        ) : (
          [...Array(47)].map((_, index) => (
            <div data-testid={`prefecture-skeleton-${index}`} key={`prefecture-skeleton-${index}`} className="h-[1em]">
              <Skeleton key={index} />
            </div>
          ))
        )}
      </div>

      <LabelTab selectedLabel={selectedLabel} onChange={handleLabelChange} />

      <div className="w-full bg-white flex-1 relative">
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
