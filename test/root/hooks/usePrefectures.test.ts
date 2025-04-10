import { renderHook } from '@testing-library/react'
import { describe, test, jest, expect } from 'bun:test'
import { afterEach } from 'bun:test'

import { usePrefectures } from '@/app/hooks/usePrefectures'

import { mockModule, MockResult } from '../../mock-module'

const prefefctures = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
]

describe('usePrefectures', () => {
  let mocks: MockResult[] = []

  afterEach(() => {
    mocks.forEach((mockResult) => mockResult.clear())
    mocks = []
  })

  test('都道府県情報の出力', async () => {
    const mockData = {
      data: prefefctures,
      isLoading: false,
      isError: false,
    }

    mocks.push(
      await mockModule('@tanstack/react-query', () => ({
        useQuery: jest.fn(() => mockData),
      })),
    )

    const { result } = renderHook(() => usePrefectures())

    expect(result.current.prefectures).toEqual(prefefctures)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  test('データフェッチ中の状態の出力', async () => {
    const mockData = {
      data: null,
      isLoading: true,
      isError: false,
    }

    mocks.push(
      await mockModule('@tanstack/react-query', () => ({
        useQuery: jest.fn(() => mockData),
      })),
    )

    const { result } = renderHook(() => usePrefectures())

    expect(result.current.prefectures).toEqual([])
    expect(result.current.isLoading).toBe(true)
    expect(result.current.isError).toBe(false)
  })
})
