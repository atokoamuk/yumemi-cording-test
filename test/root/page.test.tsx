import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { describe, expect, test, mock, jest } from 'bun:test'

import { usePopulation } from '@/app/hooks/usePoplations'
import { usePrefectures } from '@/app/hooks/usePrefectures'
import Root from '@/app/page'

mock.module('@/app/hooks/usePrefectures', () => ({
  usePrefectures: jest.fn(),
}))

mock.module('@/app/hooks/usePoplations', () => ({
  usePopulation: jest.fn(),
}))

describe('Root', () => {
  test('ルートページの初期表示', async () => {
    ;(usePrefectures as jest.Mock).mockReturnValue({ prefectures: [], isLoading: true })
    ;(usePopulation as jest.Mock).mockReturnValue({
      population: [],
      isLoading: true,
    })

    const { getByText, getAllByTestId } = render(<Root />)

    expect(getByText('都道府県')).toBeInTheDocument()
    expect(await getAllByTestId(/^prefecture-skeleton-\d+$/).length).toBe(47)
    expect(getByText('都道府県を選択してください')).toBeInTheDocument()
  })
})
