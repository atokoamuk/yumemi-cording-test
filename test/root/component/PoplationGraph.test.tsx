import { render } from '@testing-library/react'
import { expect } from 'bun:test'
import { test, describe, mock, jest, afterEach } from 'bun:test'
import recharts from 'recharts'

import PopulationGraph from '@/app/components/PoplationGraph'

import { mockModule, MockResult } from '../../mock-module'

mock.module('recharts', async () => {
  return {
    ...recharts,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <recharts.ResponsiveContainer width={800} height={800}>
        {children as React.ReactElement}
      </recharts.ResponsiveContainer>
    ),
  }
})

const prefectures = [
  { prefCode: 1, prefName: '東京' },
  { prefCode: 2, prefName: '大阪' },
]

describe('PopulationGraph', () => {
  let mocks: MockResult[] = []

  afterEach(() => {
    mocks.forEach((mockResult) => mockResult.clear())
    mocks = []
  })

  test('都道府県とラベルに応じたグラフ表示', async () => {
    mocks.push(
      await mockModule('@/app/hooks/usePoplations', () => ({
        usePopulations: jest.fn(() => ({
          data: [
            { year: 2000, value: 1000 },
            { year: 2005, value: 1200 },
            { year: 2010, value: 1400 },
          ],
          isLoading: false,
        })),
      })),
    )

    const { getByText } = render(<PopulationGraph prefectures={prefectures} label="総人口" />)

    expect(getByText('総人口推移')).toBeInTheDocument()

    prefectures.forEach((d) => {
      expect(getByText(d.prefName)).toBeInTheDocument()
    })
  })
})
