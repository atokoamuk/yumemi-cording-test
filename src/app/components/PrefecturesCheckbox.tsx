import { memo } from 'react'

import Skeleton from '@/components/Skelton'
import { Prefecture } from '@/type'

import { usePrefectures } from '../hooks/usePrefectures'

type Props = {
  selectedPrefecture: Prefecture[]
  onChange: (prefcodes: Prefecture) => void
}
const Skeletons = [...Array(47)].map((_, index) => (
  <div data-testid={`prefecture-skeleton-${index}`} key={`prefecture-skeleton-${index}`} className="h-[1.5em]">
    <Skeleton key={index} />
  </div>
))

function PrefectureCheckbox(props: Props) {
  const { onChange } = props
  const { prefectures, isLoading } = usePrefectures()

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const prefCode = Number(event.target.value)
    const targetPrefecture = prefectures.find((prefecture) => prefecture.prefCode === prefCode)

    if (targetPrefecture) onChange(targetPrefecture)
  }

  return (
    <div className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {isLoading
        ? Skeletons
        : prefectures.map(({ prefCode, prefName }) => (
            <label key={prefName} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={prefCode}
                checked={props.selectedPrefecture.some((pref) => pref.prefCode === prefCode)}
                onChange={handleCheckboxChange}
              />
              <span>{prefName}</span>
            </label>
          ))}
    </div>
  )
}

export default memo(PrefectureCheckbox)
