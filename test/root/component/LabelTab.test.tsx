import { render } from '@testing-library/react'
import { describe, expect, test, jest } from 'bun:test'

import LabelTab from '@/app/components/LabelTab'

const labels = ['総人口', '年少人口', '生産年齢人口', '老年人口']

describe('LabelTab', () => {
  test('選択ラベルの表示確認', () => {
    const selectedLabel = '総人口'
    const onChange = jest.fn()
    const { getByText } = render(<LabelTab selectedLabel={selectedLabel} onChange={onChange} />)

    labels.forEach((label) => {
      const labelButton = getByText(label)
      expect(labelButton).toBeInTheDocument()
      if (label === selectedLabel) {
        expect(labelButton.getAttribute('class')).toContain('bg-blue-500')
      } else {
        expect(labelButton.getAttribute('class')).toContain('bg-gray-200')
      }
    })
  })

  test('ラベル押下時の出力確認', () => {
    const selectedLabel = '総人口'
    const onChange = jest.fn()

    const { getByText } = render(<LabelTab selectedLabel={selectedLabel} onChange={onChange} />)

    labels.forEach((label) => {
      const labelButton = getByText(label)
      labelButton.click()
      expect(onChange).toHaveBeenCalledWith(label)
    })
  })
})
