import { memo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid, Tooltip, Label } from 'recharts'
import { Payload } from 'recharts/types/component/DefaultLegendContent'

import { Prefecture } from '../type'

type Props = {
  data: { year: number; [key: string]: number }[]
  prefectures: Prefecture[]
}

function PopulationGraph(props: Props) {
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
    <div className="w-full flex flex-col h-full items-center gap-2 p-2">
      <h3>人口推移</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 32, right: 32, left: 24 }}>
          <XAxis dataKey="year" fontSize={12}>
            <Label value="年度" position="right" offset={16} />
          </XAxis>
          <YAxis fontSize={12}>
            <Label value="人口数" position="top" offset={16} />
          </YAxis>
          <Legend
            onMouseEnter={handleLegendMouseEnter}
            onMouseOut={handleLegendMouseOut}
            align="right"
            layout="vertical"
            verticalAlign="top"
            wrapperStyle={{ paddingLeft: '4rem', overflowY: 'auto' }}
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
    </div>
  )
}

export default memo(PopulationGraph)
