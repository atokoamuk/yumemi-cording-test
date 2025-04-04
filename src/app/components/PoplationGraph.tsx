import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid, Tooltip } from 'recharts'
import { Prefecture } from '../type'

type Props = {
  data: { year: number; [key: string]: number }[]
  prefectures: Prefecture[]
}

export default function PopulationGraph(props: Props) {
  const { data, prefectures } = props

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <Legend
          align="right"
          layout="vertical"
          verticalAlign="top"
          wrapperStyle={{ paddingLeft: '2rem', maxHeight: '100%', overflowY: 'auto' }}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        {prefectures.map((prefecture) => (
          <Line
            key={`line-${prefecture.prefCode}`}
            name={`${prefecture.prefName}`}
            type="monotone"
            dataKey={`${prefecture.prefCode}`}
            stroke={`hsl(${(prefecture.prefCode * 100) % 360}, 70%, 50%)`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
