'use client'

import { useCallback, useState } from 'react'

import SimpleButton from '@/components/SimpleButton'

import { PopulationLabel, Prefecture } from '../type'

import LabelTab from './components/LabelTab'
import PopulationGraph from './components/PoplationGraph'
import PrefectureCheckbox from './components/PrefecturesCheckbox'

export default function Root() {
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([])
  const [selectedLabel, setSelectedLabel] = useState<PopulationLabel>('総人口')

  const handleChangePrefCheck = useCallback(
    (prefecture: Prefecture) => {
      setSelectedPrefectures((prev) =>
        prev.some((p) => p.prefCode === prefecture.prefCode)
          ? prev.filter((p) => p.prefCode !== prefecture.prefCode)
          : [...prev, prefecture],
      )
    },
    [setSelectedPrefectures],
  )

  const handleClearSelectedPrefcode = useCallback(() => {
    setSelectedPrefectures([])
  }, [setSelectedPrefectures])

  const handleLabelChange = useCallback(
    (label: PopulationLabel) => {
      setSelectedLabel(label)
    },
    [setSelectedLabel],
  )

  return (
    <div className="flex flex-col h-svh p-8 gap-4">
      <div className="md:flex items-center gap-4">
        <h1 className="font-bold">都道府県</h1>
        <SimpleButton className="text-sm" onClick={handleClearSelectedPrefcode}>
          選択状態をクリア
        </SimpleButton>
      </div>
      <div className="max-h-[30%] min-h-8 overflow-y-auto">
        <PrefectureCheckbox selectedPrefecture={selectedPrefectures} onChange={handleChangePrefCheck} />
      </div>
      <LabelTab selectedLabel={selectedLabel} onChange={handleLabelChange} />

      <div className="w-full min-h-[400px] bg-white flex-1 relative">
        {selectedPrefectures.length > 0 ? (
          <PopulationGraph prefectures={selectedPrefectures} label={selectedLabel} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-gray-500 text-2xl">都道府県を選択してください</h1>
          </div>
        )}
      </div>
    </div>
  )
}
