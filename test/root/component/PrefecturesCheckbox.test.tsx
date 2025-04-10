import { render, fireEvent } from '@testing-library/react'
import { test, expect, jest } from 'bun:test'
import { describe } from 'bun:test'
import { afterEach } from 'bun:test'

import PrefecturesCheckbox from '@/app/components/PrefecturesCheckbox'

import { mockModule, MockResult } from '../../mock-module'

const selectedPrefcodes = [{ prefCode: 1, prefName: '東京' }]

describe('PrefecturesCheckbox', () => {
  let mocks: MockResult[] = []

  afterEach(() => {
    mocks.forEach((mockResult) => mockResult.clear())
    mocks = []
  })

  test('都道府県データが取得できていない場合の表示', async () => {
    const mockData = {
      prefectures: [],
      isLoading: true,
    }
    mocks.push(
      await mockModule('@/app/hooks/usePrefectures', () => ({
        usePrefectures: jest.fn(() => mockData),
      })),
    )

    const { getAllByTestId } = render(
      <PrefecturesCheckbox selectedPrefecture={selectedPrefcodes} onChange={jest.fn()} />,
    )
    expect(await getAllByTestId(/^prefecture-skeleton-\d+$/).length).toBe(47)
  })

  test('都道府県データに応じた表示と選択状態', async () => {
    const mockData = {
      prefectures: [
        { prefCode: 1, prefName: '東京' },
        { prefCode: 2, prefName: '大阪' },
      ],
      isLoading: false,
    }
    mocks.push(
      await mockModule('@/app/hooks/usePrefectures', () => ({
        usePrefectures: jest.fn(() => mockData),
      })),
    )

    const onChange = jest.fn()
    const { getByRole } = render(<PrefecturesCheckbox selectedPrefecture={selectedPrefcodes} onChange={onChange} />)

    const tokyoCheckbox = getByRole('checkbox', { name: '東京' }) as HTMLInputElement
    const osakaCheckbox = getByRole('checkbox', { name: '大阪' }) as HTMLInputElement

    expect(tokyoCheckbox).toBeInTheDocument()
    expect(osakaCheckbox).toBeInTheDocument()

    expect(tokyoCheckbox.checked).toBe(true)
    expect(osakaCheckbox.checked).toBe(false)
  })

  test('変更イベント発生時の出力', async () => {
    const mockData = {
      prefectures: [
        { prefCode: 1, prefName: '東京' },
        { prefCode: 2, prefName: '大阪' },
      ],
      isLoading: false,
    }
    mocks.push(
      await mockModule('@/app/hooks/usePrefectures', () => ({
        usePrefectures: jest.fn(() => mockData),
      })),
    )

    const onChange = jest.fn()
    const { getByRole } = render(<PrefecturesCheckbox selectedPrefecture={selectedPrefcodes} onChange={onChange} />)

    const tokyoCheckbox = getByRole('checkbox', { name: '東京' }) as HTMLInputElement
    const osakaCheckbox = getByRole('checkbox', { name: '大阪' }) as HTMLInputElement

    fireEvent.click(tokyoCheckbox)
    expect(onChange).toHaveBeenCalledWith({ prefCode: 1, prefName: '東京' })

    fireEvent.click(osakaCheckbox)
    expect(onChange).toHaveBeenCalledWith({ prefCode: 2, prefName: '大阪' })
  })
})
