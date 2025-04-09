'use client'

import { memo } from 'react'

import { PopulationLabel } from '../type'

const labels = ['総人口', '年少人口', '生産年齢人口', '老年人口'] as const

type Props = {
  selectedLabel: PopulationLabel
  onChange: (label: PopulationLabel) => void
}

function LabelTab(props: Props) {
  const { selectedLabel, onChange } = props

  function handleLabelChange(label: PopulationLabel) {
    onChange(label)
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {labels.map((label) => (
        <button
          key={label}
          className={`px-4 py-2 rounded-lg ${selectedLabel === label ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handleLabelChange(label)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default memo(LabelTab)
