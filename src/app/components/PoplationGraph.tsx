import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid, Tooltip } from 'recharts'
import { Payload } from 'recharts/types/component/DefaultLegendContent'

import { Prefecture } from '../type'

type Props = {
  data: { year: number; [key: string]: number }[]
  prefectures: Prefecture[]
}

export default function PopulationGraph(props: Props) {
  const { data, prefectures } = props

  const [targetDatakey, setTargetDatakey] = useState<string | undefined>()

  function handleLegendMouseEnter(data: Payload) {
    const { dataKey } = data
    if (!dataKey) return
    setTargetDatakey(String(dataKey))
  }

  function handleLegendMouseOut() {
    setTargetDatakey(undefined)
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <Legend
          onMouseEnter={handleLegendMouseEnter}
          onMouseOut={handleLegendMouseOut}
          align="right"
          layout="vertical"
          verticalAlign="top"
          wrapperStyle={{ paddingLeft: '2rem', maxHeight: '100%', overflowY: 'auto' }}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        {prefectures.map((prefecture) => (
          <Line
            strokeWidth={targetDatakey === `${prefecture.prefCode}` ? 4 : 1}
            key={`line-${prefecture.prefCode}`}
            name={`${prefecture.prefName}`}
            type="monotone"
            dataKey={`${prefecture.prefCode}`}
            stroke={`hsl(${(prefecture.prefCode * 360) / 47}, 75%, 60%)`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
