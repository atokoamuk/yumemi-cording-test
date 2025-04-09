import { memo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid, Tooltip, Label } from 'recharts'
import { Payload } from 'recharts/types/component/DefaultLegendContent'

import LoadingOverlay from '@/components/LoadingOverlay'
import { PopulationLabel, Prefecture } from '@/type'

import { usePopulation } from '../hooks/usePoplations'

type Props = {
  prefectures: Prefecture[]
  label: PopulationLabel
}

const PopulationGraph = (props: Props) => {
  const { prefectures, label } = props

  const { populations, isLoading } = usePopulation(
    prefectures.map((p) => p.prefCode),
    label,
  )

  const [targetDatakey, setTargetDatakey] = useState<string | undefined>()

  function handleLegendMouseEnter(data: Payload) {
    const { dataKey } = data
    if (!dataKey) return
    setTargetDatakey(String(dataKey))
  }

  function handleLegendMouseLeave() {
    setTargetDatakey(undefined)
  }

  return (
    <div className="w-full flex flex-col h-full items-center gap-2 p-2">
      <LoadingOverlay show={isLoading} />
      <h3>{label}推移</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={populations} margin={{ top: 32 }}>
          <XAxis dataKey="year" fontSize={'0.75em'}>
            <Label value="年度" position="right" offset={16} />
          </XAxis>
          <YAxis fontSize={'0.75em'}>
            <Label value="人口数" position="top" offset={16} />
          </YAxis>
          <Legend
            onMouseEnter={handleLegendMouseEnter}
            onMouseLeave={handleLegendMouseLeave}
            align="right"
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={{ paddingLeft: '2em', overflowY: 'auto', height: 'calc(100% - 4em)' }}
            fontSize={'0.75em'}
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
