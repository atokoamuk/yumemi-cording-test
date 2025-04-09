import { render } from '@testing-library/react'
import { expect } from 'bun:test'
import { test, describe, mock, jest } from 'bun:test'
import recharts from 'recharts'

import PopulationGraph from '@/app/components/PoplationGraph'

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

mock.module('@/app/hooks/usePoplations', () => ({
  usePopulation: jest.fn(() => ({
    data: [
      { year: 2000, value: 1000 },
      { year: 2005, value: 1200 },
      { year: 2010, value: 1400 },
    ],
    isLoading: false,
  })),
}))

const prefectures = [
  { prefCode: 1, prefName: '東京' },
  { prefCode: 2, prefName: '大阪' },
]

describe('PopulationGraph', () => {
  test('データに応じたグラフ表示の確認', async () => {
    const { getByText } = render(<PopulationGraph prefectures={prefectures} label="総人口" />)

    expect(getByText('総人口推移')).toBeInTheDocument()

    prefectures.forEach((d) => {
      expect(getByText(d.prefName)).toBeInTheDocument()
    })
  })
})
