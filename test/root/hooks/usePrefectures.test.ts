import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { describe, test, jest, mock, expect } from 'bun:test'

import { usePrefectures } from '@/app/hooks/usePrefectures'

mock.module('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}))

describe('usePrefectures', () => {
  const mockUseQuery = useQuery as jest.Mock

  test('正常処理の確認', () => {
    const mockData = [
      { prefCode: 1, prefName: '北海道' },
      { prefCode: 2, prefName: '青森県' },
    ]

    mockUseQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    })

    const { result } = renderHook(() => usePrefectures())

    expect(result.current.prefectures).toEqual(mockData)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  test('データ取得中の確認', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    })

    const { result } = renderHook(() => usePrefectures())

    expect(result.current.prefectures).toEqual([])
    expect(result.current.isLoading).toBe(true)
    expect(result.current.isError).toBe(false)
  })

  test('異常発生時の確認', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    })

    const { result } = renderHook(() => usePrefectures())

    expect(result.current.prefectures).toEqual([])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(true)
  })
})
