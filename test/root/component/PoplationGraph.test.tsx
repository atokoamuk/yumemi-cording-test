import { render } from '@testing-library/react'
import { expect } from 'bun:test'
import { test, describe, mock } from 'bun:test'
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

const data = [
  { year: 2000, '01': 100, '02': 200 },
  { year: 2001, '01': 150, '02': 250 },
]

const prefectures = [
  { prefCode: 1, prefName: '東京' },
  { prefCode: 2, prefName: '大阪' },
]

describe('PopulationGraph', () => {
  test('データに応じた表示', async () => {
    const { getByText } = render(<PopulationGraph data={data} prefectures={prefectures} />)

    expect(getByText('人口推移')).toBeInTheDocument()

    data.forEach((d) => {
      expect(
        getByText((content, element) => (!!element ? element.tagName === 'tspan' && content === `${d.year}` : false)),
      ).toBeInTheDocument()
    })

    prefectures.forEach((d) => {
      expect(getByText(d.prefName)).toBeInTheDocument()
    })
  })
})
