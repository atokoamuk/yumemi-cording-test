import { memo } from 'react'

import { Prefecture } from '../type'

type Props = {
  prefectures: Prefecture[]
  selectedPrefcodes: number[]
  onChange: (prefcodes: number) => void
}

function PrefectureCheckbox(props: Props) {
  const { prefectures, selectedPrefcodes, onChange } = props

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const prefCode = Number(event.target.value)
    onChange(prefCode)
  }

  return (
    <>
      {prefectures.map(({ prefCode, prefName }) => (
        <label key={prefName} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedPrefcodes.includes(prefCode)}
            value={prefCode}
            onChange={handleCheckboxChange}
          />
          <span>{prefName}</span>
        </label>
      ))}
    </>
  )
}

export default memo(PrefectureCheckbox)
