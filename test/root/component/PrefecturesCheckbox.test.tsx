import { render, fireEvent } from '@testing-library/react'
import { test, expect, jest } from 'bun:test'
import { describe } from 'bun:test'

import PrefecturesCheckbox from '@/app/components/PrefecturesCheckbox'

const prefectures = [
  { prefCode: 1, prefName: '東京' },
  { prefCode: 2, prefName: '大阪' },
]

const selectedPrefcodes = [1]

describe('PrefecturesCheckbox', () => {
  const onChange = jest.fn()

  const { getByRole } = render(
    <PrefecturesCheckbox prefectures={prefectures} selectedPrefcodes={selectedPrefcodes} onChange={onChange} />,
  )

  const tokyoCheckbox = getByRole('checkbox', { name: '東京' }) as HTMLInputElement
  const osakaCheckbox = getByRole('checkbox', { name: '大阪' }) as HTMLInputElement

  test('都道府県データに応じた表示と選択状態の確認', () => {
    expect(tokyoCheckbox).toBeInTheDocument()
    expect(osakaCheckbox).toBeInTheDocument()

    expect(tokyoCheckbox.checked).toBe(true)
    expect(osakaCheckbox.checked).toBe(false)
  })

  test('変更イベント発生時の出力確認', () => {
    function onChange(prefcode: number) {
      return expect(prefcode).toBe(2)
    }

    fireEvent.click(tokyoCheckbox)
    expect(onChange).toHaveBeenCalledTimes(1)

    fireEvent.click(osakaCheckbox)
    expect(onChange).toHaveBeenCalledTimes(2)
  })
})
