import { renderHook } from '@testing-library/react'
import { describe, test, jest, expect } from 'bun:test'
import { afterEach } from 'bun:test'

import { usePopulations } from '@/app/hooks/usePoplations'
import { PopulationLabel } from '@/type'

import { mockModule, MockResult } from '../../mock-module'

describe('usePopulation', () => {
  let mocks: MockResult[] = []

  afterEach(() => {
    mocks.forEach((mockResult) => mockResult.clear())
    mocks = []
  })

  test('正常処理の確認', async () => {
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

    mocks.push(
      await mockModule('@tanstack/react-query', () => ({
        useQueries: jest.fn(() => mockData),
      })),
    )

    const { result } = renderHook(() => usePopulations([1], '総人口' as PopulationLabel))

    expect(result.current.isLoading).toBe(false)
    expect(result.current.populations).toEqual([
      { year: 2000, 1: 100 },
      { year: 2010, 1: 120 },
    ])
  })

  test('ローディングのクエリが存在する場合の確認', async () => {
    const mockData = [
      {
        isLoading: true,
        isError: false,
        data: null,
      },
    ]

    mocks.push(
      await mockModule('@tanstack/react-query', () => ({
        useQueries: jest.fn(() => mockData),
      })),
    )

    const { result } = renderHook(() => usePopulations([1], '総人口' as PopulationLabel))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.populations).toEqual([])
  })
})
