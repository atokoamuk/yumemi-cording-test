import { Prefecture } from '../type'

type Props = {
  prefectures: Prefecture[]
  selectedPrefcodes: number[]
  onChange: (prefcodes: number) => void
}

export default function PrefectureCheckbox(props: Props) {
  const { prefectures, selectedPrefcodes, onChange } = props

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value, 10)
    onChange(value)
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
