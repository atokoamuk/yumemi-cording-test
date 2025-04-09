import { useQueries } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { describe, test, jest, mock, expect } from 'bun:test'

import { usePopulation } from '@/app/hooks/usePoplations'
import { PopulationLabel } from '@/type'

mock.module('@tanstack/react-query', () => ({
  useQueries: jest.fn(),
}))

describe('usePopulation', () => {
  const mockUseQueries = useQueries as jest.Mock

  test('正常処理の確認', () => {
    const mockData = [
      {
        data: {
          result: {
            data: [
              {
                label: '総人口',
                data: [
                  { year: 2000, value: 100 },
                  { year: 2010, value: 120 },
                ],
              },
            ],
          },
          prefCode: 1,
        },
        isLoading: false,
        isError: false,
      },
    ]

    mockUseQueries.mockReturnValue(mockData)

    const { result } = renderHook(() => usePopulation([1], '総人口' as PopulationLabel))

    expect(result.current.isLoading).toBe(false)
    expect(result.current.populations).toEqual([
      { year: 2000, 1: 100 },
      { year: 2010, 1: 120 },
    ])
  })

  test('ローディングのクエリが存在する場合の確認', () => {
    mockUseQueries.mockReturnValue([
      {
        isLoading: true,
        isError: false,
        data: null,
      },
    ])

    const { result } = renderHook(() => usePopulation([1], '総人口' as PopulationLabel))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.populations).toEqual([])
  })
})
